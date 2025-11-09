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

#include <winsock2.h>
#include <windows.h>
#include <ws2tcpip.h>
#include <shlwapi.h>
#include <cstdlib>

#include <nlohmann/json.hpp>
#include "webview/webview.h"
#include "webview-universal-performance.h"

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

// Multi-threaded request handler
void worker(SOCKET server_fd, bakery::http::HTTPServer* server) {
    while (g_running) {
        SOCKET client = accept(server_fd, nullptr, nullptr);
        if (client != INVALID_SOCKET) {
            // Enable TCP_NODELAY for instant send
            DWORD nodelay = 1;
            setsockopt(client, IPPROTO_TCP, TCP_NODELAY, (char*)&nodelay, sizeof(nodelay));
            
            server->handleRequest(client);
        }
    }
}

// Multi-threaded HTTP server
void runServer(bakery::http::HTTPServer* server) {
    WSADATA wsa;
    WSAStartup(MAKEWORD(2, 2), &wsa);
    
    SOCKET fd = socket(AF_INET, SOCK_STREAM, 0);
    
    // MAXIMUM PERFORMANCE socket options
    DWORD opt = 1;
    setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, (char*)&opt, sizeof(opt));
    setsockopt(fd, IPPROTO_TCP, TCP_NODELAY, (char*)&opt, sizeof(opt));
    
    // Larger buffers
    int sendbuf = 4 * 1024 * 1024;
    setsockopt(fd, SOL_SOCKET, SO_SNDBUF, (char*)&sendbuf, sizeof(sendbuf));
    
    int recvbuf = 1024 * 1024;
    setsockopt(fd, SOL_SOCKET, SO_RCVBUF, (char*)&recvbuf, sizeof(recvbuf));
    
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

int WINAPI WinMain(HINSTANCE, HINSTANCE, LPSTR, int) {
    auto appStart = std::chrono::high_resolution_clock::now();
    
    std::cout << "🥐 Bakery Launcher (Windows Shared Assets)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    
    // OPTIMIZATION 1: Process Priority (Windows)
    SetPriorityClass(GetCurrentProcess(), HIGH_PRIORITY_CLASS);
    std::cout << "⚡ Process priority: HIGH" << std::endl;
    
    // OPTIMIZATION 2: Asset Loading (parallel!)
    bakery::assets::SharedAssetLoader assetLoader;
    std::atomic<bool> assetsLoaded{false};
    
    std::thread assetLoadThread([&assetLoader, &assetsLoaded]() {
        assetsLoaded = assetLoader.load();
    });
    
    // OPTIMIZATION 3: Config Loading (while assets load!)
    const char* assetOverride = std::getenv("BAKERY_ASSET_DIR");
    std::string execDir = assetOverride && assetOverride[0] != '\0'
        ? std::string(assetOverride)
        : bakery::assets::getExecutableDir();
    std::string configPath = execDir + "/bakery.config.json";
    
    std::ifstream configFile(configPath);
    if (!configFile) {
        std::cerr << "❌ No bakery.config.json found!" << std::endl;
        return 1;
    }
    
    json configJson;
    configFile >> configJson;
    
    BakeryConfig config;
    config.window.title = configJson["window"]["title"].get<std::string>();
    config.window.width = configJson["window"]["width"].get<int>();
    config.window.height = configJson["window"]["height"].get<int>();
    if (configJson.contains("entrypoint")) {
        config.entrypoint = configJson["entrypoint"].get<std::string>();
    } else if (configJson.contains("app") && configJson["app"].contains("entrypoint")) {
        config.entrypoint = configJson["app"]["entrypoint"].get<std::string>();
    } else {
        config.entrypoint = "index.html";
    }
    
    std::cout << "🎮 " << config.window.title << std::endl;
    std::cout << "📄 Entrypoint: " << config.entrypoint << std::endl;
    std::cout << std::endl;
    
    // Wait for assets to finish loading
    assetLoadThread.join();
    
    if (!assetsLoaded) {
        std::cerr << "❌ Failed to load assets!" << std::endl;
        return 1;
    }
    
    // OPTIMIZATION 4: Build HTTP Cache (parallel!)
    bakery::http::HTTPServer server(8765);
    server.setEntrypoint(config.entrypoint);
    server.setAssetProvider([&assetLoader](const std::string& path) {
        return assetLoader.getAsset(path);
    });
    std::atomic<bool> cacheReady{false};
    
    std::thread cacheThread([&server, &assetLoader, &cacheReady]() {
        auto cacheStart = std::chrono::high_resolution_clock::now();
        server.buildCache(assetLoader.getAllPaths());
        auto cacheEnd = std::chrono::high_resolution_clock::now();
        auto cacheDuration = std::chrono::duration_cast<std::chrono::microseconds>(cacheEnd - cacheStart).count();
        std::cout << "⚡ Pre-cached " << server.getCacheSize() << " responses in " << cacheDuration << "μs" << std::endl;
        cacheReady = true;
    });
    
    // Wait for cache to be built
    cacheThread.join();
    
    // OPTIMIZATION 5: Start HTTP server BEFORE WebView!
    std::thread serverThread([&server]() {
        runServer(&server);
    });
    serverThread.detach();
    
    // Small delay to ensure server is ready
    std::this_thread::sleep_for(std::chrono::milliseconds(50));
    
    auto setupEnd = std::chrono::high_resolution_clock::now();
    auto setupDuration = std::chrono::duration_cast<std::chrono::milliseconds>(setupEnd - appStart).count();
    
    std::cout << "⚡ STARTUP TIME: " << setupDuration << "ms (all optimizations active)" << std::endl;
    std::cout << "🚀 Launching WebView..." << std::endl;
    std::cout << std::endl;
    
    // Create WebView
    webview::webview w(true, nullptr);
    w.set_title(config.window.title.c_str());
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // Apply universal performance optimizations
    std::string perfJS = bakery::performance::getUniversalPerformanceJS();
    
    // Expose Bakery API
    w.init(R"(
        window.Bakery = {
            version: '1.0.0',
            platform: 'win',
            mode: 'universal'
        };
    )");
    
    // Inject performance optimizations
    w.init(perfJS.c_str());
    
    // Navigate to app
    std::string url = "http://localhost:8765/" + config.entrypoint;
    w.navigate(url.c_str());
    
    // Start event loop
    w.run();
    
    g_running = false;
    return 0;
}

