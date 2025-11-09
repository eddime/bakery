/**
 * 🥐 Bakery Headless Launcher (Linux)
 * HTTP server only - opens system browser (no WebView dependencies!)
 */

#include <iostream>
#include <thread>
#include <string>
#include <cstring>
#include <cstdlib>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netinet/tcp.h>
#include <map>
#include <fstream>
#include <sstream>
#include <sys/uio.h>

// Include embedded assets
#include "embedded-assets.h"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Helper for C++17 compatibility
bool endsWith(const std::string& str, const std::string& suffix) {
    if (suffix.size() > str.size()) return false;
    return str.compare(str.size() - suffix.size(), suffix.size(), suffix) == 0;
}

// Global state
std::map<std::string, const bakery::embedded::Asset*> g_assetsMap;
std::string g_entrypoint = "index.html";
std::string g_windowTitle = "Bakery App";
int g_windowWidth = 800;
int g_windowHeight = 600;

void initCache() {
    for (size_t i = 0; i < bakery::embedded::ASSETS_COUNT; i++) {
        const auto& asset = bakery::embedded::ASSETS[i];
        g_assetsMap[asset.path] = &asset;
        
        if (std::string(asset.path) == "index.html" || 
            std::string(asset.path) == "index-lazy.html" ||
            std::string(asset.path) == "index-bundled.html") {
            g_entrypoint = asset.path;
        }
    }
}

std::string getMimeType(const std::string& path) {
    if (endsWith(path, ".html")) return "text/html; charset=utf-8";
    if (endsWith(path, ".js")) return "text/javascript; charset=utf-8";
    if (endsWith(path, ".css")) return "text/css";
    if (endsWith(path, ".json")) return "application/json";
    if (endsWith(path, ".png")) return "image/png";
    if (endsWith(path, ".jpg") || endsWith(path, ".jpeg")) return "image/jpeg";
    if (endsWith(path, ".gif")) return "image/gif";
    if (endsWith(path, ".svg")) return "image/svg+xml";
    if (endsWith(path, ".mp3")) return "audio/mpeg";
    if (endsWith(path, ".wav")) return "audio/wav";
    return "application/octet-stream";
}

void handleClient(int clientSocket) {
    char buffer[4096];
    ssize_t received = recv(clientSocket, buffer, sizeof(buffer) - 1, 0);
    
    if (received <= 0) {
        close(clientSocket);
        return;
    }
    
    buffer[received] = '\0';
    std::string request(buffer);
    
    // Parse request
    size_t methodEnd = request.find(' ');
    size_t pathEnd = request.find(' ', methodEnd + 1);
    
    if (methodEnd == std::string::npos || pathEnd == std::string::npos) {
        close(clientSocket);
        return;
    }
    
    std::string method = request.substr(0, methodEnd);
    std::string path = request.substr(methodEnd + 1, pathEnd - methodEnd - 1);
    
    // Remove query string
    size_t queryPos = path.find('?');
    if (queryPos != std::string::npos) {
        path = path.substr(0, queryPos);
    }
    
    // Handle root
    if (path == "/") {
        path = "/" + g_entrypoint;
    }
    
    // Remove leading slash
    if (path[0] == '/') {
        path = path.substr(1);
    }
    
    // Find asset
    auto it = g_assetsMap.find(path);
    
    if (it != g_assetsMap.end()) {
        const auto& asset = *it->second;
        std::string mimeType = getMimeType(asset.path);
        
        // Build response header
        std::ostringstream header;
        header << "HTTP/1.1 200 OK\r\n";
        header << "Content-Type: " << mimeType << "\r\n";
        header << "Content-Length: " << asset.size << "\r\n";
        header << "Cache-Control: public, max-age=31536000\r\n";
        header << "Connection: keep-alive\r\n";
        header << "\r\n";
        
        std::string headerStr = header.str();
        
        // Send header + data in one go
        struct iovec iov[2];
        iov[0].iov_base = (void*)headerStr.c_str();
        iov[0].iov_len = headerStr.size();
        iov[1].iov_base = (void*)asset.data;
        iov[1].iov_len = asset.size;
        
        writev(clientSocket, iov, 2);
    } else {
        // 404
        const char* response = "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n";
        send(clientSocket, response, strlen(response), 0);
    }
    
    close(clientSocket);
}

void openBrowser(const std::string& url) {
    std::string command;
    
#ifdef __linux__
    // Try various Linux browsers
    command = "xdg-open '" + url + "' 2>/dev/null || "
              "google-chrome '" + url + "' 2>/dev/null || "
              "firefox '" + url + "' 2>/dev/null || "
              "chromium-browser '" + url + "' 2>/dev/null";
#elif __APPLE__
    command = "open '" + url + "'";
#else
    command = "start '" + url + "'";
#endif
    
    system(command.c_str());
}

int main(int argc, char* argv[]) {
    std::cout << "🥐 Bakery Headless Launcher\n";
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    // Load config (simple JSON parsing)
    std::ifstream configFile("bakery.config.json");
    if (configFile) {
        try {
            json config;
            configFile >> config;
            
            if (config.contains("window")) {
                if (config["window"].contains("title")) g_windowTitle = config["window"]["title"];
                if (config["window"].contains("width")) g_windowWidth = config["window"]["width"];
                if (config["window"].contains("height")) g_windowHeight = config["window"]["height"];
            }
            if (config.contains("entrypoint")) {
                g_entrypoint = config["entrypoint"];
            } else if (config.contains("app") && config["app"].contains("entrypoint")) {
                g_entrypoint = config["app"]["entrypoint"];
            }
        } catch (...) {
            std::cerr << "⚠️  Failed to parse config, using defaults\n";
        }
    }
    
    std::cout << "📦 Loading embedded assets...\n";
    initCache();
    std::cout << "✅ Loaded " << bakery::embedded::ASSETS_COUNT << " assets\n\n";
    
    // Create server
    int serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket < 0) {
        std::cerr << "❌ Failed to create socket\n";
        return 1;
    }
    
    // Enable address reuse
    int opt = 1;
    setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    
    // Enable TCP_NODELAY
    setsockopt(serverSocket, IPPROTO_TCP, TCP_NODELAY, &opt, sizeof(opt));
    
    // Bind to localhost
    struct sockaddr_in serverAddr{};
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    serverAddr.sin_port = htons(8765);
    
    if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0) {
        std::cerr << "❌ Failed to bind socket\n";
        return 1;
    }
    
    if (listen(serverSocket, 10) < 0) {
        std::cerr << "❌ Failed to listen\n";
        return 1;
    }
    
    std::cout << "✅ HTTP server running on http://127.0.0.1:8765\n\n";
    
    // Open browser
    std::cout << "🌐 Opening system browser...\n";
    std::thread([]{
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        openBrowser("http://127.0.0.1:8765");
    }).detach();
    
    std::cout << "✅ Browser opened!\n";
    std::cout << "💡 Press Ctrl+C to stop\n\n";
    
    // Accept connections
    while (true) {
        struct sockaddr_in clientAddr{};
        socklen_t clientLen = sizeof(clientAddr);
        
        int clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientLen);
        if (clientSocket < 0) {
            continue;
        }
        
        // Enable TCP_NODELAY for client
        setsockopt(clientSocket, IPPROTO_TCP, TCP_NODELAY, &opt, sizeof(opt));
        
        // Handle in thread
        std::thread(handleClient, clientSocket).detach();
    }
    
    close(serverSocket);
    return 0;
}

