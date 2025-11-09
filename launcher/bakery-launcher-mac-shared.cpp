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

#include <nlohmann/json.hpp>
#include "webview/webview.h"
#include "webview-ultra-performance.h"

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
    
    for (auto& t : workers) t.join();
    close(fd);
}

int main(int argc, char* argv[]) {
    std::cout << "🥐 Bakery Launcher (macOS Shared Assets)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    
    // Load shared assets from bakery-assets file
    bakery::assets::SharedAssetLoader assetLoader;
    if (!assetLoader.load()) {
        std::cerr << "❌ Failed to load shared assets!" << std::endl;
        return 1;
    }
    
    // Load config
    BakeryConfig config;
    config.window.title = "Bakery App";
    config.window.width = 800;
    config.window.height = 600;
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
    
    std::cout << "🎮 " << config.window.title << std::endl;
    std::cout << "📄 Entrypoint: " << config.entrypoint << std::endl;
    std::cout << std::endl;
    
    // Setup HTTP server with shared code!
    bakery::http::HTTPServer server(8765);
    server.setEntrypoint(config.entrypoint);
    server.setAssetProvider([&assetLoader](const std::string& path) {
        return assetLoader.getAsset(path);
    });
    
    // Pre-cache all responses
    auto start = std::chrono::high_resolution_clock::now();
    server.buildCache(assetLoader.getAllPaths());
    auto end = std::chrono::high_resolution_clock::now();
    auto ms = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
    
    std::cout << "⚡ Pre-cached " << server.getCacheSize() << " responses in " << ms << "μs" << std::endl;
    std::cout << std::endl;
    
    // Start server in background
    std::thread serverThread(runServer, &server);
    serverThread.detach();
    
    // Create WebView
    webview::webview w(false, nullptr);
    w.set_title(config.window.title.c_str());
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // Enable ultra performance optimizations
    bakery::ultra::enableUltraPerformance(w);
    
    w.init(R"JS(
    window.Bakery = {
        version: '1.0.0',
        platform: 'macos',
        mode: 'shared-assets'
    };
    )JS");
    
    std::cout << "🚀 Launching WebView..." << std::endl;
    w.navigate("http://127.0.0.1:8765");
    w.run();
    
    g_running = false;
    return 0;
}

