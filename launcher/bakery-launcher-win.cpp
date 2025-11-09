/**
 * 🥐 Bakery Launcher - Windows (Shared Assets from bakery-assets file)
 * Clean, shared-code version with zero duplication
 */

#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <atomic>
#include <chrono>

// Windows headers
#include <windows.h>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <shlwapi.h>

#pragma comment(lib, "ws2_32.lib")
#pragma comment(lib, "shlwapi.lib")

#include <nlohmann/json.hpp>
#include "webview/webview.h"

// NEW: Shared HTTP server and asset loader!
#include "bakery-http-server.h"
#include "bakery-asset-loader.h"

using json = nlohmann::json;

struct BakeryConfig {
    struct {
        std::string title;
        int width;
        int height;
    } window;
    std::string entrypoint;
};

std::atomic<bool> g_running{true};

// Multi-threaded request handler (Windows version)
void worker(SOCKET server_fd, bakery::http::HTTPServer* server) {
    while (g_running) {
        SOCKET client = accept(server_fd, nullptr, nullptr);
        if (client != INVALID_SOCKET) {
            // Enable TCP_NODELAY for instant send
            int nodelay = 1;
            setsockopt(client, IPPROTO_TCP, TCP_NODELAY, (const char*)&nodelay, sizeof(nodelay));
            
            server->handleRequest(client);
        }
    }
}

// Multi-threaded HTTP server (Windows version)
void runServer(bakery::http::HTTPServer* server) {
    // Initialize Winsock
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
    
    SOCKET fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    
    // MAXIMUM PERFORMANCE socket options
    int opt = 1;
    setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, (const char*)&opt, sizeof(opt));
    setsockopt(fd, IPPROTO_TCP, TCP_NODELAY, (const char*)&opt, sizeof(opt));
    
    // Larger buffers
    int sendbuf = 4 * 1024 * 1024;
    setsockopt(fd, SOL_SOCKET, SO_SNDBUF, (const char*)&sendbuf, sizeof(sendbuf));
    
    int recvbuf = 1024 * 1024;
    setsockopt(fd, SOL_SOCKET, SO_RCVBUF, (const char*)&recvbuf, sizeof(recvbuf));
    
    // Bind and listen
    struct sockaddr_in addr{};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    addr.sin_port = htons(server->getPort());
    
    bind(fd, (struct sockaddr*)&addr, sizeof(addr));
    listen(fd, 512);
    
    // Launch worker threads
    int threads = std::thread::hardware_concurrency();
    if (threads == 0) threads = 4;
    
    std::cout << "⚡ Multi-threaded server (" << threads << " workers) on port " 
              << server->getPort() << std::endl;
    
    std::vector<std::thread> workers;
    for (int i = 0; i < threads; i++) {
        workers.emplace_back(worker, fd, server);
    }
    
    for (auto& t : workers) t.join();
    closesocket(fd);
    WSACleanup();
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    auto appStart = std::chrono::high_resolution_clock::now();
    
    std::cout << "🥐 Bakery Launcher (Windows Shared Assets)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    
    // OPTIMIZATION 1: Process Priority (Windows)
    SetPriorityClass(GetCurrentProcess(), HIGH_PRIORITY_CLASS);
    std::cout << "⚡ Process priority: HIGH" << std::endl;
    
    // OPTIMIZATION 2: Parallel Asset Loading
    bakery::assets::SharedAssetLoader assetLoader;
    std::atomic<bool> assetsLoaded{false};
    
    std::thread assetLoadThread([&assetLoader, &assetsLoaded]() {
        assetsLoaded = assetLoader.load();
    });
    
    // OPTIMIZATION 3: Load config in parallel while assets load
    std::string execDir = bakery::assets::getExecutableDir();
    std::string configPath = execDir + "/bakery.config.json";
    
    BakeryConfig config;
    config.window.title = "Bakery App";
    config.window.width = 1280;
    config.window.height = 720;
    config.entrypoint = "index.html";
    
    std::ifstream configFile(configPath);
    if (configFile) {
        try {
            json j = json::parse(configFile);
            if (j.contains("window")) {
                if (j["window"].contains("title")) config.window.title = j["window"]["title"];
                if (j["window"].contains("width")) config.window.width = j["window"]["width"];
                if (j["window"].contains("height")) config.window.height = j["window"]["height"];
            }
            if (j.contains("entrypoint")) {
                config.entrypoint = j["entrypoint"];
            }
        } catch (...) {
            std::cerr << "⚠️  Failed to parse config, using defaults" << std::endl;
        }
    }
    
    // Wait for assets to load
    assetLoadThread.join();
    
    if (!assetsLoaded) {
        MessageBoxA(NULL, "Failed to load assets!", "Bakery Error", MB_ICONERROR);
        return 1;
    }
    
    std::cout << "🎮 " << config.window.title << std::endl;
    std::cout << "📄 Entrypoint: " << config.entrypoint << std::endl;
    std::cout << std::endl;
    
    // OPTIMIZATION 4: Parallel Cache Building
    bakery::http::HTTPServer server(8765);
    std::atomic<bool> cacheReady{false};
    
    std::thread cacheThread([&server, &assetLoader, &cacheReady]() {
        auto cacheStart = std::chrono::high_resolution_clock::now();
        server.buildCache(assetLoader.getAllPaths());
        auto cacheEnd = std::chrono::high_resolution_clock::now();
        auto cacheDuration = std::chrono::duration_cast<std::chrono::microseconds>(cacheEnd - cacheStart);
        std::cout << "⚡ Pre-cached " << server.getCacheSize() << " responses in " 
                  << cacheDuration.count() << "μs" << std::endl;
        cacheReady = true;
    });
    
    cacheThread.join();
    
    // OPTIMIZATION 5: Start HTTP server BEFORE WebView
    std::thread serverThread(runServer, &server);
    
    auto startupEnd = std::chrono::high_resolution_clock::now();
    auto startupDuration = std::chrono::duration_cast<std::chrono::milliseconds>(startupEnd - appStart);
    std::cout << "⚡ STARTUP TIME: " << startupDuration.count() << "ms (all optimizations active)" << std::endl;
    
    // Create WebView
    std::cout << "🚀 Launching WebView..." << std::endl;
    std::cout << std::endl;
    
    webview::webview w(true, nullptr);
    w.set_title(config.window.title);
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // Inject Bakery API
    w.init(R"(
        window.Bakery = {
            version: '1.0.0',
            platform: 'windows',
            mode: 'universal',
            launcher: 'shared-assets'
        };
    )");
    
    // Navigate to entrypoint
    std::string url = "http://localhost:8765/" + config.entrypoint;
    w.navigate(url);
    
    // Run event loop
    w.run();
    
    // Cleanup
    g_running = false;
    serverThread.detach();
    
    return 0;
}

