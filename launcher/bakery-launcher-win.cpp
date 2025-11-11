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
// ⚡ OPTIMIZATION: Atomic flag for server ready state
std::atomic<bool> g_serverReady{false};

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
    closesocket(fd);
    WSACleanup();
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    auto appStart = std::chrono::high_resolution_clock::now();
    
    // ⚡ OPTIMIZATION: Disable console output in production for faster startup
    #ifdef NDEBUG
    std::ios::sync_with_stdio(false);
    #else
    std::cout << "🥐 Bakery Launcher (Windows Shared Assets)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    #endif
    
    // OPTIMIZATION 1: Process Priority (Windows)
    SetPriorityClass(GetCurrentProcess(), HIGH_PRIORITY_CLASS);
    #ifndef NDEBUG
    std::cout << "⚡ Process priority: HIGH" << std::endl;
    #endif
    
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
    
    #ifndef NDEBUG
    std::cout << "🎮 " << config.window.title << std::endl;
    std::cout << "📄 Entrypoint: " << config.entrypoint << std::endl;
    std::cout << std::endl;
    #endif
    
    // OPTIMIZATION 4: Parallel Cache Building
    bakery::http::HTTPServer server(8765);
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
    
    // While cache builds, create WebView (parallel!)
    webview::webview w(false, nullptr);  // false = production mode
    w.set_title(config.window.title);
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // Inject Bakery API + Runtime Optimizations
    w.init(R"(
        window.Bakery = {
            version: '1.0.0',
            platform: 'windows',
            mode: 'universal',
            launcher: 'shared-assets'
        };
        
        // ⚡ RUNTIME OPTIMIZATION 1: Passive Event Listeners
        (function() {
            const passiveEvents = new Set(['scroll', 'wheel', 'touchstart', 'touchmove', 'touchend', 'mousewheel']);
            const originalAddEventListener = EventTarget.prototype.addEventListener;
            
            EventTarget.prototype.addEventListener = function(type, listener, options) {
                if (passiveEvents.has(type) && typeof options !== 'object') {
                    options = { passive: true, capture: false };
                } else if (passiveEvents.has(type) && typeof options === 'object' && options.passive === undefined) {
                    options.passive = true;
                }
                return originalAddEventListener.call(this, type, listener, options);
            };
        })();
        
        // ⚡ RUNTIME OPTIMIZATION 2: Image Decode Hints
        if ('decode' in HTMLImageElement.prototype) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.tagName === 'IMG' && node.src) {
                            node.decode().catch(() => {});
                        }
                    });
                });
            });
            
            document.addEventListener('DOMContentLoaded', () => {
                observer.observe(document.body, { childList: true, subtree: true });
            });
        }
        
        // ⚡ RUNTIME OPTIMIZATION 3: Smart GC
        let gameLoaded = false;
        window.addEventListener('load', () => {
            gameLoaded = true;
            setTimeout(() => {
                if (window.gc) window.gc();
            }, 2000);
            
            if (window.performance && window.performance.memory) {
                const initialMemory = window.performance.memory.usedJSHeapSize;
                setInterval(() => {
                    if (!document.hidden) {
                        const currentMemory = window.performance.memory.usedJSHeapSize;
                        const growth = currentMemory - initialMemory;
                        if (growth > 100 * 1024 * 1024) {
                            requestIdleCallback(() => {
                                if (window.gc) window.gc();
                            });
                        }
                    }
                }, 30000);
            }
        });
        
        // ⚡ RUNTIME OPTIMIZATION 4: Disable unnecessary features
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        document.addEventListener('selectstart', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });
        
        // ⚡ FIX: Disable ALL OS beep sounds
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
        }, true);
        
        // ⚡ RUNTIME OPTIMIZATION 5: Let game engines handle rendering
        // CSS transforms interfere with WebGL/3D pipelines
    )");
    
    // Wait for cache to be ready
    cacheThread.join();
    
    // OPTIMIZATION 5: Start HTTP server BEFORE navigation
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
    std::cout << "🚀 Launching WebView..." << std::endl;
    std::cout << std::endl;
    #endif
    
    // Navigate to entrypoint
    w.navigate("http://127.0.0.1:8765");
    
    // Run event loop
    w.run();
    
    // Cleanup
    g_running = false;
    
    return 0;
}

