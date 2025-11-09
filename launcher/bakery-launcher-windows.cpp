// Bakery Windows Launcher - Native WinSock2 HTTP Server
// Ultra-fast, zero dependencies, lean & mean!

#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#include <string>
#include <unordered_map>
#include <iostream>
#include <thread>
#include <atomic>
#include <cstring>

#pragma comment(lib, "ws2_32.lib")

#include "../deps/webview/core/include/webview/webview.h"
#include "embedded-assets.h"
#include "bakery-config-reader.cpp"
#include "webview-ultra-performance.h"

// Asset map for fast lookup
std::unordered_map<std::string, bakery::embedded::Asset> g_assetsMap;
std::string g_entrypoint = "index.html";

// MIME type helper
const char* getMimeType(const std::string& path) {
    if (path.find(".html") != std::string::npos) return "text/html; charset=utf-8";
    if (path.find(".js") != std::string::npos) return "text/javascript; charset=utf-8";
    if (path.find(".css") != std::string::npos) return "text/css; charset=utf-8";
    if (path.find(".json") != std::string::npos) return "application/json";
    if (path.find(".png") != std::string::npos) return "image/png";
    if (path.find(".jpg") != std::string::npos || path.find(".jpeg") != std::string::npos) return "image/jpeg";
    if (path.find(".gif") != std::string::npos) return "image/gif";
    if (path.find(".svg") != std::string::npos) return "image/svg+xml";
    if (path.find(".woff2") != std::string::npos) return "font/woff2";
    if (path.find(".woff") != std::string::npos) return "font/woff";
    if (path.find(".ttf") != std::string::npos) return "font/ttf";
    if (path.find(".mp3") != std::string::npos) return "audio/mpeg";
    return "application/octet-stream";
}

// Ultra-fast HTTP server using native WinSock2
void httpServer(std::atomic<bool>& running) {
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
    
    SOCKET listenSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (listenSocket == INVALID_SOCKET) {
        std::cerr << "Socket creation failed" << std::endl;
        return;
    }
    
    // Enable TCP_NODELAY for instant send (NO BUFFERING!)
    int flag = 1;
    setsockopt(listenSocket, IPPROTO_TCP, TCP_NODELAY, (char*)&flag, sizeof(flag));
    
    // Enable SO_REUSEADDR for fast restart
    setsockopt(listenSocket, SOL_SOCKET, SO_REUSEADDR, (char*)&flag, sizeof(flag));
    
    // Bind to localhost:8765 (NO FIREWALL!)
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    addr.sin_port = htons(8765);
    
    if (bind(listenSocket, (sockaddr*)&addr, sizeof(addr)) == SOCKET_ERROR) {
        std::cerr << "Bind failed" << std::endl;
        closesocket(listenSocket);
        return;
    }
    
    if (listen(listenSocket, 128) == SOCKET_ERROR) {
        std::cerr << "Listen failed" << std::endl;
        closesocket(listenSocket);
        return;
    }
    
    // Accept loop
    while (running) {
        fd_set readfds;
        FD_ZERO(&readfds);
        FD_SET(listenSocket, &readfds);
        
        timeval timeout = {0, 100000}; // 100ms timeout
        int result = select(0, &readfds, nullptr, nullptr, &timeout);
        
        if (result <= 0) continue;
        
        SOCKET clientSocket = accept(listenSocket, nullptr, nullptr);
        if (clientSocket == INVALID_SOCKET) continue;
        
        // Enable TCP_NODELAY on client socket
        setsockopt(clientSocket, IPPROTO_TCP, TCP_NODELAY, (char*)&flag, sizeof(flag));
        
        // Read HTTP request
        char buffer[4096];
        int bytesRead = recv(clientSocket, buffer, sizeof(buffer) - 1, 0);
        if (bytesRead <= 0) {
            closesocket(clientSocket);
            continue;
        }
        buffer[bytesRead] = '\0';
        
        // Parse request path
        std::string request(buffer);
        size_t getPos = request.find("GET ");
        if (getPos == std::string::npos) {
            closesocket(clientSocket);
            continue;
        }
        
        size_t pathStart = getPos + 4;
        size_t pathEnd = request.find(" HTTP", pathStart);
        std::string path = request.substr(pathStart, pathEnd - pathStart);
        
        // Handle root
        if (path == "/" || path.empty()) {
            path = "/" + g_entrypoint;
        }
        if (path[0] == '/') path = path.substr(1);
        
        // Find asset
        auto it = g_assetsMap.find(path);
        if (it == g_assetsMap.end()) {
            const char* notFound = "HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n";
            send(clientSocket, notFound, strlen(notFound), 0);
            closesocket(clientSocket);
            continue;
        }
        
        // Serve asset
        const auto& file = it->second;
        const char* mime = getMimeType(path);
        
        // Build HTTP header
        char header[512];
        int headerLen = snprintf(header, sizeof(header),
            "HTTP/1.1 200 OK\r\n"
            "Content-Type: %s\r\n"
            "Content-Length: %zu\r\n"
            "Connection: keep-alive\r\n"
            "Cache-Control: public, max-age=31536000\r\n\r\n",
            mime, file.size
        );
        
        // Send header + body in ONE call (FAST!)
        send(clientSocket, header, headerLen, 0);
        send(clientSocket, (const char*)file.data, file.size, 0);
        
        closesocket(clientSocket);
    }
    
    closesocket(listenSocket);
    WSACleanup();
}

int WINAPI WinMain(HINSTANCE, HINSTANCE, LPSTR, int) {
    // Load embedded assets
    for (size_t i = 0; i < bakery::embedded::ASSETS_COUNT; i++) {
        g_assetsMap[bakery::embedded::ASSETS[i].path] = bakery::embedded::ASSETS[i];
    }
    
    // Load config
    BakeryConfig config;
    auto configIt = g_assetsMap.find("bakery.config.json");
    if (configIt != g_assetsMap.end()) {
        std::string configJson(reinterpret_cast<const char*>(configIt->second.data), configIt->second.size);
        config = parseBakeryConfigFromJson(configJson);
        g_entrypoint = config.entrypoint;
    }
    
    // Start HTTP server in background
    std::atomic<bool> running(true);
    std::thread serverThread([&running]() { httpServer(running); });
    
    // WebView2 with ULTRA PERFORMANCE
    _putenv_s("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS",
        "--enable-features=msWebView2EnableWebGL "
        "--enable-webgl "
        "--enable-webgl2 "
        "--ignore-gpu-blocklist "
        "--disable-frame-rate-limit "
        "--disable-gpu-vsync "
        "--enable-gpu-rasterization "
        "--enable-zero-copy");
    
    webview::webview w(false, nullptr);
    w.set_title(config.title.c_str());
    w.set_size(config.width, config.height, WEBVIEW_HINT_NONE);
    
    // Inject performance optimizations
    w.init(R"(
        (function() {
            if (typeof requestIdleCallback !== 'undefined') window.requestIdleCallback = undefined;
            const c = document.createElement('canvas');
            c.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none';
            document.documentElement.appendChild(c);
            const gl = c.getContext('webgl2') || c.getContext('webgl');
            if (gl) {
                function keepGPU() {
                    gl.clearColor(0,0,0,0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                    requestAnimationFrame(keepGPU);
                }
                keepGPU();
            }
            let rafActive = true;
            function rafLoop() {
                if (rafActive) requestAnimationFrame(rafLoop);
            }
            rafLoop();
            document.documentElement.style.cssText = 'will-change:transform;transform:translateZ(0)';
        })();
    )");
    
    w.navigate("http://localhost:8765");
    w.run();
    
    // Cleanup
    running = false;
    serverThread.join();
    
    return 0;
}

