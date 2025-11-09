/**
 * 🥐 Bakery Shared Assets Launcher
 * Loads assets from bakery-assets file (shared between architectures)
 */

#include <iostream>
#include <string>
#include <unordered_map>
#include <thread>
#include <fstream>
#include <vector>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <libgen.h>

#ifdef __APPLE__
#include <mach-o/dyld.h>
#endif

#include <nlohmann/json.hpp>
#include "webview/webview.h"
#include "webview-ultra-performance.h"

using json = nlohmann::json;

struct Asset {
    std::vector<unsigned char> data;
    std::string mimeType;
};

struct BakeryConfig {
    struct {
        std::string title;
        int width;
        int height;
    } window;
    std::string entrypoint;
};

std::unordered_map<std::string, Asset> g_assets;
std::string g_entrypoint = "index.html";

std::string getExecutableDir() {
    char path[1024];
    uint32_t size = sizeof(path);
    
#ifdef __APPLE__
    if (_NSGetExecutablePath(path, &size) == 0) {
        char* dir = dirname(path);
        return std::string(dir);
    }
#else
    if (readlink("/proc/self/exe", path, size) != -1) {
        char* dir = dirname(path);
        return std::string(dir);
    }
#endif
    
    return ".";
}

bool endsWith(const std::string& str, const std::string& suffix) {
    if (suffix.size() > str.size()) return false;
    return str.compare(str.size() - suffix.size(), suffix.size(), suffix) == 0;
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

bool loadSharedAssets() {
    std::string execDir = getExecutableDir();
    std::string assetsPath = execDir + "/bakery-assets";
    
    std::ifstream file(assetsPath, std::ios::binary);
    if (!file) {
        std::cerr << "❌ Failed to open bakery-assets\n";
        return false;
    }
    
    // Read header
    uint32_t fileCount;
    file.read((char*)&fileCount, 4);
    
    std::cout << "📦 Loading " << fileCount << " assets from bakery-assets\n";
    
    // Read each file
    for (uint32_t i = 0; i < fileCount; i++) {
        // Read path length
        uint32_t pathLen;
        file.read((char*)&pathLen, 4);
        
        if (!file || pathLen == 0 || pathLen > 1024) {
            std::cerr << "⚠️  Invalid path length at asset " << i << ": " << pathLen << "\n";
            break;
        }
        
        // Read path
        std::string path(pathLen, '\0');
        file.read(&path[0], pathLen);
        
        // Read size (uint64 in the file format)
        uint64_t size64;
        file.read((char*)&size64, 8);
        uint32_t size = static_cast<uint32_t>(size64);
        
        if (!file || size > 100*1024*1024) {  // Max 100MB per file
            std::cerr << "⚠️  Invalid size for " << path << ": " << size << "\n";
            break;
        }
        
        // Read data
        Asset asset;
        asset.data.resize(size);
        file.read((char*)asset.data.data(), size);
        asset.mimeType = getMimeType(path);
        
        if (!file) {
            std::cerr << "⚠️  Failed to read data for " << path << "\n";
            break;
        }
        
        g_assets[path] = std::move(asset);
        
        // Check for entrypoint
        if (path == "index.html" || path == "index-lazy.html" || path == "index-bundled.html") {
            g_entrypoint = path;
        }
    }
    
    std::cout << "✅ Loaded " << g_assets.size() << " assets\n";
    return true;
}

void handleRequest(int fd) {
    char buf[2048];
    ssize_t n = recv(fd, buf, sizeof(buf), 0);
    
    if (n <= 14 || buf[0] != 'G' || buf[1] != 'E' || buf[2] != 'T') {
        close(fd);
        return;
    }
    
    // Extract URI
    const char* uri_start = buf + 4;
    const char* uri_end = uri_start;
    while (uri_end < buf + n && *uri_end != ' ' && *uri_end != '?') uri_end++;
    
    std::string uri(uri_start, uri_end - uri_start);
    if (uri[0] == '/') uri = uri.substr(1);
    if (uri.empty() || uri == "/") uri = g_entrypoint;
    
    auto it = g_assets.find(uri);
    if (it != g_assets.end()) {
        const auto& asset = it->second;
        
        std::string headers = 
            "HTTP/1.1 200 OK\r\n"
            "Content-Type: " + asset.mimeType + "\r\n"
            "Content-Length: " + std::to_string(asset.data.size()) + "\r\n"
            "Cache-Control: max-age=86400\r\n"
            "Connection: keep-alive\r\n"
            "\r\n";
        
        send(fd, headers.data(), headers.size(), 0);
        send(fd, asset.data.data(), asset.data.size(), 0);
    } else {
        const char* resp = "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n";
        send(fd, resp, strlen(resp), 0);
    }
    
    close(fd);
}

int main(int argc, char* argv[]) {
    std::cout << "🥐 Bakery Shared Assets Launcher\n";
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    // Load config
    std::string configPath = getExecutableDir() + "/bakery.config.json";
    BakeryConfig config;
    config.window.title = "Bakery App";
    config.window.width = 800;
    config.window.height = 600;
    config.entrypoint = "index.html";
    
    std::ifstream configFile(configPath);
    if (configFile) {
        json j;
        configFile >> j;
        if (j.contains("window")) {
            if (j["window"].contains("title")) config.window.title = j["window"]["title"];
            if (j["window"].contains("width")) config.window.width = j["window"]["width"];
            if (j["window"].contains("height")) config.window.height = j["window"]["height"];
        }
        if (j.contains("entrypoint")) {
            g_entrypoint = j["entrypoint"];
        } else if (j.contains("app") && j["app"].contains("entrypoint")) {
            g_entrypoint = j["app"]["entrypoint"];
        }
    }
    
    // Load shared assets
    if (!loadSharedAssets()) {
        std::cerr << "❌ Failed to load shared assets!\n";
        return 1;
    }
    
    // Create HTTP server
    int serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    setsockopt(serverSocket, IPPROTO_TCP, TCP_NODELAY, &opt, sizeof(opt));
    
    struct sockaddr_in serverAddr{};
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    serverAddr.sin_port = htons(8765);
    
    bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr));
    listen(serverSocket, 10);
    
    std::cout << "✅ HTTP server running on http://127.0.0.1:8765\n\n";
    
    // Create WebView
    webview::webview w(false, nullptr);
    w.set_title(config.window.title.c_str());
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // Enable ultra performance
    bakery::ultra::enableUltraPerformance(w);
    
    w.navigate("http://127.0.0.1:8765");
    
    // Server thread
    std::thread([serverSocket]() {
        while (true) {
            int clientSocket = accept(serverSocket, nullptr, nullptr);
            if (clientSocket >= 0) {
                int opt = 1;
                setsockopt(clientSocket, IPPROTO_TCP, TCP_NODELAY, &opt, sizeof(opt));
                std::thread(handleRequest, clientSocket).detach();
            }
        }
    }).detach();
    
    w.run();
    
    close(serverSocket);
    return 0;
}

