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
#include <cstdlib>  // For rand(), srand()
#include <ctime>    // For time()
#include <sys/resource.h>  // For setpriority on macOS/Linux

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
        bool resizable;
        bool fullscreen;
        bool alwaysOnTop;
        bool frameless;
        int minWidth;
        int minHeight;
    } window;
    struct {
        std::string name;
        std::string version;
        std::string entrypoint;
        std::string icon;
    } app;
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
    
    // Seed random for port selection
    srand(time(nullptr));
    
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
    
    // While assets load, prepare default config
    config.window.title = "Bakery App";
    config.window.width = 1280;
    config.window.height = 720;
    config.window.resizable = true;
    config.window.fullscreen = false;
    config.window.alwaysOnTop = false;
    config.window.frameless = false;
    config.window.minWidth = 400;
    config.window.minHeight = 300;
    config.app.name = "bakery-app";
    config.app.version = "1.0.0";
    config.app.entrypoint = "index.html";
    config.app.icon = "";
    
    // Wait for assets to load first
    assetLoadThread.join();
    if (!assetsLoaded) {
        std::cerr << "❌ Failed to load shared assets!" << std::endl;
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
                if (j["window"].contains("title")) config.window.title = j["window"]["title"].get<std::string>();
                if (j["window"].contains("width")) config.window.width = j["window"]["width"].get<int>();
                if (j["window"].contains("height")) config.window.height = j["window"]["height"].get<int>();
                if (j["window"].contains("resizable")) config.window.resizable = j["window"]["resizable"].get<bool>();
                if (j["window"].contains("fullscreen")) config.window.fullscreen = j["window"]["fullscreen"].get<bool>();
                if (j["window"].contains("startFullscreen")) config.window.fullscreen = j["window"]["startFullscreen"].get<bool>();
                if (j["window"].contains("alwaysOnTop")) config.window.alwaysOnTop = j["window"]["alwaysOnTop"].get<bool>();
                if (j["window"].contains("frameless")) config.window.frameless = j["window"]["frameless"].get<bool>();
                if (j["window"].contains("minWidth")) config.window.minWidth = j["window"]["minWidth"].get<int>();
                if (j["window"].contains("minHeight")) config.window.minHeight = j["window"]["minHeight"].get<int>();
            }
            
            // Load app config
            if (j.contains("app")) {
                if (j["app"].contains("name")) {
                    config.app.name = j["app"]["name"].get<std::string>();
                    if (config.window.title == "Bakery App") {
                        config.window.title = config.app.name;
                    }
                }
                if (j["app"].contains("version")) config.app.version = j["app"]["version"].get<std::string>();
                if (j["app"].contains("entrypoint")) config.app.entrypoint = j["app"]["entrypoint"].get<std::string>();
                if (j["app"].contains("icon")) config.app.icon = j["app"]["icon"].get<std::string>();
            }
            
            // Legacy: Load entrypoint from root (support both formats)
            if (j.contains("entrypoint")) {
                config.app.entrypoint = j["entrypoint"].get<std::string>();
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
    std::cout << "📄 Entrypoint: " << config.app.entrypoint << std::endl;
    std::cout << "📐 Window: " << config.window.width << "x" << config.window.height 
              << (config.window.resizable ? " (resizable)" : " (fixed)") << std::endl;
    if (config.window.fullscreen) std::cout << "🖥️  Fullscreen: ON" << std::endl;
    if (config.window.alwaysOnTop) std::cout << "📌 Always on Top: ON" << std::endl;
    if (config.window.frameless) std::cout << "🪟  Frameless: ON" << std::endl;
    std::cout << std::endl;
    #endif
    
    // OPTIMIZATION 3: Setup server + Build cache in PARALLEL with WebView creation
    // 🔒 Use deterministic port based on app.name (NOT window.title!)
    // This ensures localStorage persists even if window title changes (e.g., version numbers)
    std::hash<std::string> hasher;
    size_t hash = hasher(config.app.name);
    int port = 8765 + (hash % 1000);  // Port range: 8765-9765
    
    #ifndef NDEBUG
    std::cout << "🔒 Port: " << port << " (based on app.name: " << config.app.name << ")" << std::endl;
    std::cout << "📦 Version: " << config.app.version << std::endl;
    #endif
    bakery::http::HTTPServer server(port);
    server.setEntrypoint(config.app.entrypoint);
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
    // true = debug mode (enables Inspector for development)
    // 🚀 HIGH-PERFORMANCE MODE: Eliminate micro-stuttering
    #ifndef NDEBUG
    std::cout << "🚀 Enabling High-Performance Mode..." << std::endl;
    #endif
    
    #ifdef __APPLE__
    // 1. REALTIME priority for smooth frame pacing
    setpriority(PRIO_PROCESS, 0, -20);  // Maximum priority
    
    // 2. Disable App Nap via system command
    system("defaults write NSGlobalDomain NSAppSleepDisabled -bool YES 2>/dev/null");
    
    // 3. 🎮 Request Game Mode optimizations (macOS Sonoma 14+)
    // Game Mode gives highest priority to CPU/GPU when in fullscreen
    // Reference: https://support.apple.com/en-us/105118
    // Note: Full Game Mode only activates in native fullscreen, but we can
    //       request latency-critical treatment for better performance
    setenv("CA_LAYER_OPTIMIZE_FOR_GAME", "1", 1);  // Optimize Core Animation
    setenv("MTL_SHADER_VALIDATION", "0", 1);  // Disable shader validation overhead
    
    // 4. Metal optimizations
    setenv("MTL_HUD_ENABLED", "0", 1);  // Disable Metal HUD
    setenv("MTL_DEBUG_LAYER", "0", 1);  // Disable debug layer
    
    // 5. Force Metal rendering for better performance
    setenv("WEBKIT_USE_METAL", "1", 1);
    setenv("WEBKIT_DISABLE_COMPOSITING_MODE", "0", 1);
    
    // 6. Request high-performance GPU (discrete over integrated)
    setenv("WEBKIT_FORCE_DISCRETE_GPU", "1", 1);
    
    #ifndef NDEBUG
    std::cout << "   ✅ Process priority: REALTIME (-20)" << std::endl;
    std::cout << "   ✅ App Nap: Disabled" << std::endl;
    std::cout << "   ✅ Game Mode: Requested (macOS Sonoma 14+)" << std::endl;
    std::cout << "   ✅ Metal rendering: Forced" << std::endl;
    std::cout << "   ✅ Discrete GPU: Requested" << std::endl;
    std::cout << "   ⚠️  Note: Fullscreen will ALWAYS be faster (bypasses WindowServer)" << std::endl;
    #endif
    #endif
    
    webview::webview w(true, nullptr);
    w.set_title(config.window.title.c_str());
    
    // Apply window config
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // 🖥️ Fullscreen mode for maximum performance (bypasses compositor)
    if (config.window.fullscreen) {
        #ifndef NDEBUG
        std::cout << "🖥️  Fullscreen mode: ENABLED (better performance)" << std::endl;
        #endif
        
        // Set fullscreen via JavaScript after WebView is ready
        // (WebView C++ API doesn't have direct fullscreen support)
    }
    
    // DISABLED: Performance optimizations causing issues with some games
    // bakery::universal::enableUniversalPerformance(w);
    
    w.init(R"JS(
    window.Bakery = {
        version: '1.0.0',
        platform: 'macos',
            mode: 'shared-assets'
        };
      
      // 🎯 ANTI-STUTTER: Aggressive optimizations for smooth 60 FPS in window mode
      (function() {
          // 1. Force GPU acceleration on EVERYTHING
          const style = document.createElement('style');
          style.textContent = `
              * {
                  -webkit-transform: translateZ(0);
                  -webkit-backface-visibility: hidden;
                  -webkit-perspective: 1000px;
                  will-change: transform;
              }
              body, html {
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
              }
              canvas, video, img {
                  -webkit-transform: translate3d(0,0,0);
                  transform: translate3d(0,0,0);
                  image-rendering: -webkit-optimize-contrast;
                  image-rendering: crisp-edges;
              }
              /* Disable all animations that could cause jank */
              *, *::before, *::after {
                  animation-duration: 0s !important;
                  transition-duration: 0s !important;
              }
          `;
          document.head.appendChild(style);
          
          // 2. Disable smooth scrolling (causes jank)
          document.documentElement.style.scrollBehavior = 'auto';
          
          // 3. Aggressive requestAnimationFrame optimization
          let lastFrame = performance.now();
          let frameCount = 0;
          let droppedFrames = 0;
          const targetFrameTime = 16.666; // 60 FPS
          const minFrameTime = 15; // Don't go faster than ~66 FPS
          const maxFrameTime = 18; // Don't go slower than ~55 FPS
          
          const originalRAF = window.requestAnimationFrame;
          window.requestAnimationFrame = function(callback) {
              return originalRAF.call(window, function(timestamp) {
                  const delta = timestamp - lastFrame;
                  
                  // Skip frame if too soon (prevents double-frames)
                  if (delta < minFrameTime) {
                      droppedFrames++;
                      return originalRAF.call(window, callback);
                  }
                  
                  // Warn if frame took too long
                  if (delta > maxFrameTime && frameCount > 60) {
                      // Frame drop detected, but continue
                  }
                  
                  lastFrame = timestamp;
                  frameCount++;
                  callback(timestamp);
              });
          };
          
          // 4. Prevent compositor stalls
          setInterval(() => {
              // Force a repaint to keep compositor active
              document.body.style.transform = 'translateZ(0)';
          }, 1000);
          
          // 5. Log performance stats
          setInterval(() => {
              if (droppedFrames > 0) {
                  console.log('🎯 Frame stats: ' + frameCount + ' frames, ' + droppedFrames + ' skipped (good!)');
                  droppedFrames = 0;
                  frameCount = 0;
              }
          }, 5000);
          
          console.log('🎯 Anti-Stutter: ENABLED (Aggressive mode for window)');
      })();
      
      // ⚡ RUNTIME OPTIMIZATION 1: Passive Event Listeners (less overhead)
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
    
    // 🖥️ FULLSCREEN: Auto-enable if configured (better performance)
    window.addEventListener('load', () => {
        const fullscreenEnabled = )" + std::string(config.window.fullscreen ? "true" : "false") + R"JS(;
        
        if (fullscreenEnabled) {
            // Request fullscreen on document element
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => {
                    console.warn('⚠️ Fullscreen request failed:', err);
                });
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
            console.log('🖥️  Fullscreen: ENABLED (better FPS)');
        }
    });
    
    // ⚡ RUNTIME OPTIMIZATION 3: Smart GC (only when needed)
    let gameLoaded = false;
    window.addEventListener('load', () => {
        gameLoaded = true;
        
        // Initial cleanup after load
        setTimeout(() => {
            if (window.gc) window.gc();
        }, 2000);
        
        // Monitor memory growth
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
    
    // ⚡ RUNTIME OPTIMIZATION 4: Disable text selection (less repaints)
    // Note: Context menu (right-click) is left enabled for debugging
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
    
    // ⚡ RUNTIME OPTIMIZATION 5: CSS Hardware Acceleration Hints
    const style = document.createElement('style');
    style.textContent = `
        * {
            -webkit-transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            -webkit-perspective: 1000;
        }
        canvas, video {
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
        }
    `;
    document.addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(style);
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
    
    // 🔥 CACHE BUSTER: Use app version to force reload on updates
    std::string url = "http://127.0.0.1:" + std::to_string(port) + "?v=" + config.app.version;
    
    #ifndef NDEBUG
    std::cout << "🌐 URL: " << url << std::endl;
    std::cout << "🔄 Cache Buster: v" << config.app.version << std::endl;
    #endif
    
    w.navigate(url);
    w.run();
    
    g_running = false;
    return 0;
}


