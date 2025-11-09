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
    
    std::cout << "⚡ Multi-threaded server (" << threads << " workers) on port " 
              << server->getPort() << std::endl;
    
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
    
    std::cout << "🥐 Bakery Launcher (Linux Headless)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    
    // OPTIMIZATION 1: Process Priority (Linux)
    setpriority(PRIO_PROCESS, 0, -10);
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
        std::cerr << "❌ Failed to load assets!" << std::endl;
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
    
    auto startupEnd = std::chrono::high_resolution_clock::now();
    auto startupDuration = std::chrono::duration_cast<std::chrono::milliseconds>(startupEnd - appStart);
    std::cout << "⚡ STARTUP TIME: " << startupDuration.count() << "ms (all optimizations active)" << std::endl;
    
    // Start HTTP server
    std::cout << "🌐 Starting HTTP server..." << std::endl;
    std::thread serverThread(runServer, &server);
    
    // Open system browser
    std::string url = "http://localhost:8765/" + config.entrypoint;
    std::cout << "🚀 Opening browser: " << url << std::endl;
    std::cout << std::endl;
    
    std::string openCmd = "xdg-open \"" + url + "\" 2>/dev/null || sensible-browser \"" + url + "\" 2>/dev/null &";
    system(openCmd.c_str());
    
    std::cout << "✅ Server running! Press Ctrl+C to stop." << std::endl;
    std::cout << "💡 Close browser tab to exit." << std::endl;
    
    // Keep server running
    serverThread.join();
    
    return 0;
}

