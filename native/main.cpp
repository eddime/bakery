// 🥐 Bakery Native Runtime
// Single-binary desktop app runtime with embedded assets

#include "webview.h"
#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <thread>
#include <cstdint>
#include <cstring>

// Tiny HTTP server for serving embedded assets
#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")
#else
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <arpa/inet.h>
#endif

class EmbeddedAssets {
private:
    std::map<std::string, std::string> assets;
    
public:
    // Load assets from the end of the binary
    bool loadFromSelf(const char* argv0) {
        std::ifstream self(argv0, std::ios::binary | std::ios::ate);
        if (!self.is_open()) {
            std::cerr << "Failed to open self binary" << std::endl;
            return false;
        }
        
        // Read size from last 8 bytes
        self.seekg(-8, std::ios::end);
        uint64_t assetsSize;
        self.read(reinterpret_cast<char*>(&assetsSize), 8);
        
        if (assetsSize == 0 || assetsSize > 100 * 1024 * 1024) { // Max 100MB
            std::cerr << "Invalid assets size: " << assetsSize << std::endl;
            return false;
        }
        
        // Seek to assets start (skip markers)
        self.seekg(-8 - assetsSize - 19, std::ios::end); // 19 = "BAKERY_ASSETS_END"
        
        // Read assets JSON
        std::string json(assetsSize, '\0');
        self.read(&json[0], assetsSize);
        
        // Parse JSON (simple parser for demo)
        parseAssetsJSON(json);
        
        std::cout << "✅ Loaded " << assets.size() << " embedded assets" << std::endl;
        return true;
    }
    
    std::string get(const std::string& path) const {
        auto it = assets.find(path);
        if (it != assets.end()) {
            return decodeDataUrl(it->second);
        }
        return "";
    }
    
    bool has(const std::string& path) const {
        return assets.find(path) != assets.end();
    }
    
private:
    // Simple JSON parser for assets
    void parseAssetsJSON(const std::string& json) {
        // Simple key-value extraction (not a full JSON parser)
        size_t pos = 0;
        while ((pos = json.find("\"", pos)) != std::string::npos) {
            size_t keyStart = pos + 1;
            size_t keyEnd = json.find("\"", keyStart);
            if (keyEnd == std::string::npos) break;
            
            std::string key = json.substr(keyStart, keyEnd - keyStart);
            
            pos = json.find("\"", keyEnd + 1);
            if (pos == std::string::npos) break;
            
            size_t valStart = pos + 1;
            size_t valEnd = json.find("\"", valStart);
            if (valEnd == std::string::npos) break;
            
            std::string value = json.substr(valStart, valEnd - valStart);
            assets[key] = value;
            
            pos = valEnd;
        }
    }
    
    // Decode base64 data URL
    std::string decodeDataUrl(const std::string& dataUrl) const {
        // Format: data:mime;base64,BASE64DATA
        size_t commaPos = dataUrl.find(',');
        if (commaPos == std::string::npos) {
            return dataUrl; // Not a data URL, return as-is
        }
        
        std::string base64 = dataUrl.substr(commaPos + 1);
        return decodeBase64(base64);
    }
    
    // Simple Base64 decoder
    std::string decodeBase64(const std::string& encoded) const {
        static const std::string base64_chars = 
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        
        std::string decoded;
        std::vector<int> T(256, -1);
        for (int i = 0; i < 64; i++) T[base64_chars[i]] = i;
        
        int val = 0, valb = -8;
        for (unsigned char c : encoded) {
            if (T[c] == -1) break;
            val = (val << 6) + T[c];
            valb += 6;
            if (valb >= 0) {
                decoded.push_back(char((val >> valb) & 0xFF));
                valb -= 8;
            }
        }
        return decoded;
    }
};

// Tiny HTTP Server
class HttpServer {
private:
    int port;
    int serverSocket;
    bool running;
    EmbeddedAssets* assets;
    
public:
    HttpServer(int p, EmbeddedAssets* a) : port(p), serverSocket(-1), running(false), assets(a) {}
    
    bool start() {
#ifdef _WIN32
        WSADATA wsaData;
        WSAStartup(MAKEWORD(2, 2), &wsaData);
#endif
        
        serverSocket = socket(AF_INET, SOCK_STREAM, 0);
        if (serverSocket < 0) {
            std::cerr << "Failed to create socket" << std::endl;
            return false;
        }
        
        int opt = 1;
        setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR, (const char*)&opt, sizeof(opt));
        
        struct sockaddr_in address;
        address.sin_family = AF_INET;
        address.sin_addr.s_addr = INADDR_ANY;
        address.sin_port = htons(port);
        
        if (bind(serverSocket, (struct sockaddr*)&address, sizeof(address)) < 0) {
            std::cerr << "Bind failed" << std::endl;
            return false;
        }
        
        if (listen(serverSocket, 3) < 0) {
            std::cerr << "Listen failed" << std::endl;
            return false;
        }
        
        running = true;
        std::cout << "🌐 HTTP Server started on http://localhost:" << port << std::endl;
        return true;
    }
    
    void run() {
        while (running) {
            struct sockaddr_in clientAddr;
            socklen_t clientLen = sizeof(clientAddr);
            
#ifdef _WIN32
            SOCKET clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientLen);
#else
            int clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientLen);
#endif
            
            if (clientSocket < 0) continue;
            
            handleRequest(clientSocket);
            
#ifdef _WIN32
            closesocket(clientSocket);
#else
            close(clientSocket);
#endif
        }
    }
    
    void stop() {
        running = false;
#ifdef _WIN32
        closesocket(serverSocket);
        WSACleanup();
#else
        close(serverSocket);
#endif
    }
    
private:
    void handleRequest(int clientSocket) {
        char buffer[4096];
        int bytesRead = recv(clientSocket, buffer, sizeof(buffer) - 1, 0);
        if (bytesRead <= 0) return;
        
        buffer[bytesRead] = '\0';
        
        // Parse request path
        std::string request(buffer);
        size_t pathStart = request.find(' ') + 1;
        size_t pathEnd = request.find(' ', pathStart);
        std::string path = request.substr(pathStart, pathEnd - pathStart);
        
        if (path == "/") path = "/index.html";
        
        // Get asset
        std::string content = assets->get(path);
        
        if (content.empty()) {
            sendResponse(clientSocket, 404, "text/plain", "404 Not Found");
        } else {
            std::string contentType = getContentType(path);
            sendResponse(clientSocket, 200, contentType, content);
        }
    }
    
    void sendResponse(int clientSocket, int statusCode, const std::string& contentType, const std::string& body) {
        std::string statusText = (statusCode == 200) ? "OK" : "Not Found";
        std::string response = 
            "HTTP/1.1 " + std::to_string(statusCode) + " " + statusText + "\r\n"
            "Content-Type: " + contentType + "\r\n"
            "Content-Length: " + std::to_string(body.length()) + "\r\n"
            "Connection: close\r\n"
            "\r\n" + body;
        
        send(clientSocket, response.c_str(), response.length(), 0);
    }
    
    std::string getContentType(const std::string& path) {
        if (path.ends_with(".html")) return "text/html";
        if (path.ends_with(".css")) return "text/css";
        if (path.ends_with(".js")) return "application/javascript";
        if (path.ends_with(".json")) return "application/json";
        if (path.ends_with(".png")) return "image/png";
        if (path.ends_with(".jpg") || path.ends_with(".jpeg")) return "image/jpeg";
        if (path.ends_with(".svg")) return "image/svg+xml";
        return "application/octet-stream";
    }
};

int main(int argc, char* argv[]) {
    std::cout << "🥐 Bakery Runtime v1.0.0" << std::endl;
    
    // Load embedded assets
    EmbeddedAssets assets;
    if (!assets.loadFromSelf(argv[0])) {
        std::cerr << "❌ Failed to load embedded assets" << std::endl;
        std::cerr << "💡 Make sure this binary was built with 'bake mac/win/linux'" << std::endl;
        return 1;
    }
    
    // Start HTTP server on random port
    int port = 8765; // TODO: Use random free port
    HttpServer server(port, &assets);
    
    if (!server.start()) {
        std::cerr << "❌ Failed to start HTTP server" << std::endl;
        return 1;
    }
    
    // Start server in background thread
    std::thread serverThread([&server]() {
        server.run();
    });
    
    // Create WebView
    webview::webview w(true, nullptr);
    w.set_title("Bakery App");
    w.set_size(800, 600, WEBVIEW_HINT_NONE);
    w.navigate("http://localhost:" + std::to_string(port));
    w.run();
    
    // Cleanup
    server.stop();
    serverThread.join();
    
    return 0;
}

