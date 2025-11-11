/**
 * 🥐 Bakery Launcher - macOS (Shared Assets from bakery-assets file)
 * Clean, shared-code version with zero duplication
 */

#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <atomic>
#include <chrono>
#include <sys/resource.h>  // For setpriority on macOS/Linux

#ifdef __APPLE__
#include <objc/runtime.h>
#include <objc/message.h>
#endif

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
void worker(int server_fd, bakery::http::HTTPServer* server) {
    while (g_running) {
        int client = accept(server_fd, nullptr, nullptr);
        if (client >= 0) {
            // Enable TCP_NODELAY for instant send
            int nodelay = 1;
            setsockopt(client, IPPROTO_TCP, TCP_NODELAY, &nodelay, sizeof(nodelay));
            
            server->handleRequest(client);
        }
    }
}

// ⚡ OPTIMIZATION: Atomic flag for server ready state
std::atomic<bool> g_serverReady{false};

// Multi-threaded HTTP server
void runServer(bakery::http::HTTPServer* server) {
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    if (fd < 0) {
        std::cerr << "❌ Failed to create socket!" << std::endl;
        return;
    }
    
    // MAXIMUM PERFORMANCE socket options
    int opt = 1;
    setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    setsockopt(fd, IPPROTO_TCP, TCP_NODELAY, &opt, sizeof(opt));
    
    // Larger buffers
    int sendbuf = 4 * 1024 * 1024;
    setsockopt(fd, SOL_SOCKET, SO_SNDBUF, &sendbuf, sizeof(sendbuf));
    
    int recvbuf = 1024 * 1024;
    setsockopt(fd, SOL_SOCKET, SO_RCVBUF, &recvbuf, sizeof(recvbuf));
    
    // Bind and listen
    struct sockaddr_in addr{};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    addr.sin_port = htons(server->getPort());
    
    if (bind(fd, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        std::cerr << "❌ Failed to bind to port " << server->getPort() << "!" << std::endl;
        return;
    }
    
    if (listen(fd, 512) < 0) {
        std::cerr << "❌ Failed to listen on port " << server->getPort() << "!" << std::endl;
        return;
    }
    
    // Launch worker threads
    int threads = std::thread::hardware_concurrency();
    if (threads == 0) threads = 4;
    
    #ifndef NDEBUG
    std::cout << "⚡ Multi-threaded server (" << threads << " workers) on port " 
              << server->getPort() << std::endl;
    #endif
    
    // ⚡ OPTIMIZATION: Signal that server is ready BEFORE launching workers
    g_serverReady = true;
    
    std::vector<std::thread> workers;
    for (int i = 0; i < threads; i++) {
        workers.emplace_back(worker, fd, server);
    }
    
    for (auto& t : workers) t.join();
    close(fd);
}

int main(int argc, char* argv[]) {
    auto appStart = std::chrono::high_resolution_clock::now();
    
    // ⚡ OPTIMIZATION: Disable console output in production for faster startup
    #ifdef NDEBUG
    std::ios::sync_with_stdio(false);
    #else
    std::cout << "🥐 Bakery Launcher (macOS Shared Assets)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    #endif
    
    // OPTIMIZATION 1: Process Priority (macOS)
    #ifdef __APPLE__
    // Set high priority for main process
    setpriority(PRIO_PROCESS, 0, -10);
    #ifndef NDEBUG
    std::cout << "⚡ Process priority: HIGH" << std::endl;
    #endif
    #endif
    
    // OPTIMIZATION 2: Load assets + config in parallel
    bakery::assets::SharedAssetLoader assetLoader;
    BakeryConfig config;
    std::atomic<bool> assetsLoaded{false};
    
    std::thread assetLoadThread([&assetLoader, &assetsLoaded]() {
        assetsLoaded = assetLoader.load();
    });
    
    // While assets load, prepare config (parallel!)
    config.window.title = "Bakery App";
    config.window.width = 1280;
    config.window.height = 720;
    config.entrypoint = "index.html";
    
    std::string configPath = bakery::assets::getExecutableDir() + "/bakery.config.json";
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
            config.entrypoint = j["entrypoint"];
        } else if (j.contains("app") && j["app"].contains("entrypoint")) {
            config.entrypoint = j["app"]["entrypoint"];
        }
    }
    
    // Wait for assets
    assetLoadThread.join();
    if (!assetsLoaded) {
        std::cerr << "❌ Failed to load shared assets!" << std::endl;
        return 1;
    }
    
    #ifndef NDEBUG
    std::cout << "🎮 " << config.window.title << std::endl;
    std::cout << "📄 Entrypoint: " << config.entrypoint << std::endl;
    std::cout << std::endl;
    #endif
    
    // OPTIMIZATION 3: Setup server + Build cache in PARALLEL with WebView creation
    bakery::http::HTTPServer server(8765);
    server.setEntrypoint(config.entrypoint);
    server.setAssetProvider([&assetLoader](const std::string& path) {
        return assetLoader.getAsset(path);
    });
    
    std::atomic<bool> cacheReady{false};
    std::thread cacheThread([&server, &assetLoader, &cacheReady]() {
        #ifndef NDEBUG
    auto start = std::chrono::high_resolution_clock::now();
        #endif
        
    server.buildCache(assetLoader.getAllPaths());
        
        #ifndef NDEBUG
    auto end = std::chrono::high_resolution_clock::now();
    auto ms = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
    std::cout << "⚡ Pre-cached " << server.getCacheSize() << " responses in " << ms << "μs" << std::endl;
        std::cout << "   ↳ Critical assets (entrypoint, main.js) cached FIRST" << std::endl;
        #endif
        
        cacheReady = true;
    });
    
    // Create WebView while cache builds (parallel!)
    webview::webview w(false, nullptr);  // false = production mode (better performance)
    w.set_title(config.window.title.c_str());
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // DISABLED: Performance optimizations causing issues with some games
    // bakery::universal::enableUniversalPerformance(w);
    
    w.init(R"JS(
    window.Bakery = {
        version: '1.0.0',
        platform: 'macos',
        mode: 'shared-assets'
    };
    
    // ⚡ FIX: Disable beep sound ONLY on document level (not on game canvas)
    // This prevents system beep but doesn't interfere with game input
    document.addEventListener('keydown', (e) => {
        // Only prevent default if the event is on document itself
        // Game canvas events will not be affected
        if (e.target === document.body || e.target === document.documentElement) {
            e.preventDefault();
        }
    });
    )JS");
    
    // Wait for cache to be ready before navigation
    cacheThread.join();
    
    // OPTIMIZATION 4: Start HTTP server BEFORE navigation (faster first request)
    std::thread serverThread(runServer, &server);
    serverThread.detach();
    
    // ⚡ OPTIMIZATION: Wait for server ready flag instead of sleep (faster!)
    while (!g_serverReady) {
        std::this_thread::yield();  // Cooperative wait, ~1-5ms instead of 50ms
    }
    
    auto appReady = std::chrono::high_resolution_clock::now();
    auto startupMs = std::chrono::duration_cast<std::chrono::milliseconds>(appReady - appStart).count();
    
    #ifndef NDEBUG
    std::cout << "⚡ STARTUP TIME: " << startupMs << "ms (all optimizations active)" << std::endl;
    std::cout << "🚀 Launching WebView..." << std::endl;
    std::cout << std::endl;
    #endif
    
    w.navigate("http://127.0.0.1:8765");
    w.run();
    
    g_running = false;
    return 0;
}

