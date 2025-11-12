/**
 * 🥐 Bakery Launcher - Linux (Shared Assets from bakery-assets file)
 * Clean, shared-code version with zero duplication
 */

#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <atomic>
#include <chrono>
#include <sys/resource.h>  // For setpriority

#include <nlohmann/json.hpp>

// NEW: Shared HTTP server and asset loader!
#include "bakery-http-server.h"
#include "bakery-asset-loader.h"
#include "bakery-window-helper.h"  // Cross-platform window management

using json = nlohmann::json;

struct BakeryConfig {
    struct {
        std::string title;
        int width;
        int height;
    } window;
    std::string entrypoint;
    std::string appName;  // Used for deterministic port (localStorage persistence)
};

std::atomic<bool> g_running{true};
// ⚡ OPTIMIZATION: Atomic flag for server ready state
std::atomic<bool> g_serverReady{false};

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

// Multi-threaded HTTP server
void runServer(bakery::http::HTTPServer* server) {
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    
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
    
    bind(fd, (struct sockaddr*)&addr, sizeof(addr));
    listen(fd, 512);
    
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
    
    // Keep server running
    for (auto& t : workers) t.join();
    close(fd);
}

int main(int argc, char* argv[]) {
    auto appStart = std::chrono::high_resolution_clock::now();
    
    // ⚡ OPTIMIZATION: Disable console output in production for faster startup
    #ifdef NDEBUG
    std::ios::sync_with_stdio(false);
    #else
    std::cout << "🥐 Bakery Launcher (Linux Headless)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    #endif
    
    // OPTIMIZATION 1: Process Priority (Linux)
    setpriority(PRIO_PROCESS, 0, -10);
    #ifndef NDEBUG
    std::cout << "⚡ Process priority: HIGH" << std::endl;
    #endif
    
    // OPTIMIZATION 2: Parallel Asset Loading
    bakery::assets::SharedAssetLoader assetLoader;
    std::atomic<bool> assetsLoaded{false};
    
    std::thread assetLoadThread([&assetLoader, &assetsLoaded]() {
        assetsLoaded = assetLoader.load();
    });
    
    // OPTIMIZATION 3: Prepare default config
    BakeryConfig config;
    config.window.title = "Bakery App";
    config.window.width = 1280;
    config.window.height = 720;
    config.entrypoint = "index.html";
    config.appName = "bakery-app";  // Default app name
    
    // Wait for assets to load
    assetLoadThread.join();
    
    if (!assetsLoaded) {
        std::cerr << "❌ Failed to load assets!" << std::endl;
        return 1;
    }
    
    // 🔒 Load config from encrypted assets (not accessible to user!)
    auto configAsset = assetLoader.getAsset(".bakery-config.json");
    if (configAsset.data && configAsset.size > 0) {
        try {
            std::string configStr(reinterpret_cast<const char*>(configAsset.data), configAsset.size);
            json j = json::parse(configStr);
            
            // Load window config
            if (j.contains("window")) {
                if (j["window"].contains("title")) {
                    config.window.title = j["window"]["title"].get<std::string>();
                }
                if (j["window"].contains("width")) {
                    config.window.width = j["window"]["width"].get<int>();
                }
                if (j["window"].contains("height")) {
                    config.window.height = j["window"]["height"].get<int>();
                }
            }
            
            // Load app config
            if (j.contains("app")) {
                if (j["app"].contains("name")) {
                    config.appName = j["app"]["name"].get<std::string>();
                    if (config.window.title == "Bakery App") {
                        config.window.title = config.appName;
                    }
                }
                if (j["app"].contains("entrypoint")) {
                    config.entrypoint = j["app"]["entrypoint"].get<std::string>();
                }
            }
            if (j.contains("entrypoint")) {
                config.entrypoint = j["entrypoint"].get<std::string>();
            }
            
            #ifndef NDEBUG
            std::cout << "🔒 Config loaded from encrypted assets" << std::endl;
            #endif
        } catch (const std::exception& e) {
            #ifndef NDEBUG
            std::cerr << "⚠️ Failed to parse config: " << e.what() << std::endl;
            #endif
        }
    }
    
    #ifndef NDEBUG
    std::cout << "🎮 " << config.window.title << std::endl;
    std::cout << "📄 Entrypoint: " << config.entrypoint << std::endl;
    std::cout << std::endl;
    #endif
    
    // OPTIMIZATION 4: Parallel Cache Building
    // 🔒 Use deterministic port based on app.name (NOT window.title!)
    std::hash<std::string> hasher;
    size_t hash = hasher(config.appName);
    int port = 8765 + (hash % 1000);  // Port range: 8765-9765
    
    #ifndef NDEBUG
    std::cout << "🔒 Port: " << port << " (based on app.name: " << config.appName << ")" << std::endl;
    #endif
    bakery::http::HTTPServer server(port);
    server.setEntrypoint(config.entrypoint);
    server.setAssetProvider([&assetLoader](const std::string& path) {
        return assetLoader.getAsset(path);
    });
    
    std::atomic<bool> cacheReady{false};
    std::thread cacheThread([&server, &assetLoader, &cacheReady]() {
        #ifndef NDEBUG
        auto cacheStart = std::chrono::high_resolution_clock::now();
        #endif
        
        server.buildCache(assetLoader.getAllPaths());
        
        #ifndef NDEBUG
        auto cacheEnd = std::chrono::high_resolution_clock::now();
        auto cacheDuration = std::chrono::duration_cast<std::chrono::microseconds>(cacheEnd - cacheStart);
        std::cout << "⚡ Pre-cached " << server.getCacheSize() << " responses in " 
                  << cacheDuration.count() << "μs" << std::endl;
        #endif
        
        cacheReady = true;
    });
    
    cacheThread.join();
    
    // 🚀 HIGH-PERFORMANCE MODE: Set high process priority
    #ifndef NDEBUG
    std::cout << "🚀 Enabling High-Performance Mode..." << std::endl;
    #endif
    
    // Set high priority for better scheduling
    #ifdef __linux__
    setpriority(PRIO_PROCESS, 0, -10);  // Higher priority (requires root or CAP_SYS_NICE)
    #endif
    
    // Start HTTP server
    std::thread serverThread(runServer, &server);
    serverThread.detach();
    
    // ⚡ OPTIMIZATION: Wait for server ready flag instead of sleep (faster!)
    while (!g_serverReady) {
        std::this_thread::yield();  // Cooperative wait, ~1-5ms instead of 50ms
    }
    
    auto startupEnd = std::chrono::high_resolution_clock::now();
    auto startupDuration = std::chrono::duration_cast<std::chrono::milliseconds>(startupEnd - appStart);
    
    #ifndef NDEBUG
    std::cout << "⚡ STARTUP TIME: " << startupDuration.count() << "ms (all optimizations active)" << std::endl;
    std::cout << "🌐 Starting HTTP server..." << std::endl;
    #endif
    
    // Open system browser
    std::string url = "http://localhost:8765";
    
    #ifndef NDEBUG
    std::cout << "🚀 Opening browser: " << url << std::endl;
    std::cout << std::endl;
    #endif
    
    std::string openCmd = "xdg-open \"" + url + "\" 2>/dev/null || sensible-browser \"" + url + "\" 2>/dev/null &";
    system(openCmd.c_str());
    
    #ifndef NDEBUG
    std::cout << "✅ Server running! Press Ctrl+C to stop." << std::endl;
    #endif
    std::cout << "💡 Close browser tab to exit." << std::endl;
    
    // Keep server running
    serverThread.join();
    
    return 0;
}

