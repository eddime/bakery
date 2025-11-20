/**
 * 🥐 Gemcore Launcher - Linux (WebKitGTK WebView - like Neutralino)
 * Uses system WebKitGTK via pkg-config (no bundling needed)
 */

#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <atomic>
#include <chrono>
#include <sys/resource.h>  // For setpriority
#include <unistd.h>         // For access()

#include <nlohmann/json.hpp>

// WebView support (only if GTK headers are available)
#ifdef WEBVIEW_GTK
#include "webview/webview.h"
#include <gtk/gtk.h>        // For gtk_window_set_icon_from_file
#define USE_WEBVIEW 1
#else
#define USE_WEBVIEW 0
#endif

// NEW: Shared HTTP server and asset loader!
#include "gemcore-http-server.h"
#include "gemcore-asset-loader.h"
#include "gemcore-cache-buster.h"
#include "gemcore-window-helper.h"          // Cross-platform window management
#include "gemcore-steamworks-bindings.h"    // 🎮 Steamworks integration (cross-platform)

using json = nlohmann::json;

struct GemcoreConfig {
    struct {
        std::string title;
        int width;
        int height;
        bool fullscreen = false;
    } window;
    struct {
        std::string name;
        std::string version;
        bool debug = false;
        bool splash = false;
        std::string iconPng;  // Linux icon path
    } app;
    struct {
        bool enabled = false;
        uint32_t appId = 0;
    } steamworks;
    std::string entrypoint;
    std::string appName;  // Used for deterministic port (localStorage persistence)
};

std::atomic<bool> g_running{true};
// ⚡ OPTIMIZATION: Atomic flag for server ready state
std::atomic<bool> g_serverReady{false};

// Multi-threaded request handler
void worker(int server_fd, gemcore::http::HTTPServer* server) {
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
void runServer(gemcore::http::HTTPServer* server) {
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
    std::cout << "🥐 Gemcore Launcher (Linux WebKitGTK)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    #endif
    
    // OPTIMIZATION 1: Process Priority (Linux)
    setpriority(PRIO_PROCESS, 0, -10);
    #ifndef NDEBUG
    std::cout << "⚡ Process priority: HIGH" << std::endl;
    #endif
    
    // OPTIMIZATION 2: Parallel Asset Loading
    gemcore::assets::SharedAssetLoader assetLoader;
    std::atomic<bool> assetsLoaded{false};
    
    std::thread assetLoadThread([&assetLoader, &assetsLoaded]() {
        assetsLoaded = assetLoader.load();
    });
    
    // OPTIMIZATION 3: Prepare default config
    GemcoreConfig config;
    config.window.title = "Gemcore App";
    config.window.width = 1280;
    config.window.height = 720;
    config.entrypoint = "index.html";
    config.appName = "gemcore-app";  // Default app name
    
    // Wait for assets to load
    assetLoadThread.join();
    
    if (!assetsLoaded) {
        std::cerr << "❌ Failed to load assets!" << std::endl;
        return 1;
    }
    
    // 🔒 Load config from encrypted assets (not accessible to user!)
    auto configAsset = assetLoader.getAsset(".gemcore-config.json");
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
                    config.app.name = config.appName;
                    if (config.window.title == "Gemcore App") {
                        config.window.title = config.appName;
                    }
                }
                if (j["app"].contains("version")) {
                    config.app.version = j["app"]["version"].get<std::string>();
                }
                if (j["app"].contains("entrypoint")) {
                    config.entrypoint = j["app"]["entrypoint"].get<std::string>();
                }
                if (j["app"].contains("debug")) {
                    config.app.debug = j["app"]["debug"].get<bool>();
                }
                if (j["app"].contains("splash")) {
                    config.app.splash = j["app"]["splash"].get<bool>();
                }
                if (j["app"].contains("iconPng")) {
                    config.app.iconPng = j["app"]["iconPng"].get<std::string>();
                }
            }
            if (j.contains("entrypoint")) {
                config.entrypoint = j["entrypoint"].get<std::string>();
            }
            
            // Load Steamworks config
            if (j.contains("steamworks")) {
                if (j["steamworks"].contains("enabled")) {
                    config.steamworks.enabled = j["steamworks"]["enabled"].get<bool>();
                }
                if (j["steamworks"].contains("appId")) {
                    config.steamworks.appId = j["steamworks"]["appId"].get<uint32_t>();
                }
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
    gemcore::http::HTTPServer server(port);
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
    
    // 🎮 Initialize Steamworks (cross-platform helper)
    #ifdef ENABLE_STEAMWORKS
    bool steamEnabled = gemcore::steamworks::initSteamworks(config);
    #else
    bool steamEnabled = false;
    #endif
    
    // 🚀 HIGH-PERFORMANCE MODE: Set high process priority
    #ifndef NDEBUG
    std::cout << "🚀 Enabling High-Performance Mode..." << std::endl;
    #endif
    
    // Set high priority for better scheduling
    #ifdef __linux__
    setpriority(PRIO_PROCESS, 0, -10);  // Higher priority (requires root or CAP_SYS_NICE)
    #endif
    
    // Start HTTP server (runs in background)
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
    #endif
    
    // 🔥 CACHE BUSTER: Use timestamp to force reload on every build
    std::string cacheBuster = gemcore::getCacheBuster();
    std::string url = "http://127.0.0.1:" + std::to_string(port) + "/" + config.entrypoint + "?t=" + cacheBuster;
    
    #if USE_WEBVIEW
    // WebView mode (requires WebKitGTK)
    #ifndef NDEBUG
    std::cout << "🚀 Launching WebView..." << std::endl;
    std::cout << std::endl;
    #endif
    
    // 🎨 Extract icon from embedded assets BEFORE creating window
    #ifdef WEBVIEW_GTK
    std::string iconPathForWindow;
    auto iconAsset = assetLoader.getAsset("icon.png");
    if (iconAsset.data && iconAsset.size > 0) {
        std::string tmpIconPath = "/tmp/gemcore_icon_" + config.appName + ".png";
        std::ofstream iconFile(tmpIconPath, std::ios::binary);
        if (iconFile) {
            iconFile.write(reinterpret_cast<const char*>(iconAsset.data), iconAsset.size);
            iconFile.close();
            iconPathForWindow = tmpIconPath;
            // Always log icon extraction (even in release mode)
            std::cout << "🎨 Icon extracted: " << tmpIconPath << " (" << iconAsset.size << " bytes)" << std::endl;
        } else {
            std::cout << "⚠️  Failed to write icon to: " << tmpIconPath << std::endl;
        }
    } else {
        std::cout << "⚠️  Icon not found in assets" << std::endl;
        if (!config.app.iconPng.empty() && access(config.app.iconPng.c_str(), F_OK) == 0) {
            iconPathForWindow = config.app.iconPng;
        }
    }
    #endif
    
    // Create WebView with debug mode from config
    webview::webview w(config.app.debug, nullptr);
    w.set_title(config.window.title.c_str());
    
    // 🎨 Set window icon immediately after window creation (Linux/GTK)
    #ifdef WEBVIEW_GTK
    if (!iconPathForWindow.empty()) {
        auto window_result = w.window();
        if (window_result.has_value()) {
            void* window_ptr = window_result.value();
            if (window_ptr) {
                GtkWindow* gtk_window = GTK_WINDOW(window_ptr);
                GError* error = nullptr;
                gtk_window_set_icon_from_file(gtk_window, iconPathForWindow.c_str(), &error);
                if (!error) {
                    // Always log success (even in release mode)
                    std::cout << "✅ Window icon set: " << iconPathForWindow << std::endl;
                } else {
                    // Always log errors (even in release mode)
                    std::cout << "❌ Failed to set window icon: " << error->message << std::endl;
                    g_error_free(error);
                }
            } else {
                std::cout << "❌ GTK window pointer is null" << std::endl;
            }
        } else {
            std::cout << "❌ Failed to get GTK window" << std::endl;
        }
    } else {
        std::cout << "❌ No icon path available" << std::endl;
    }
    #endif
    
    // Apply window config
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // 🎮 Bind Steamworks to JavaScript (if enabled)
    #ifdef ENABLE_STEAMWORKS
    gemcore::steamworks::bindSteamworksToWebview(w, steamEnabled);
    #endif
    
    // Load Steamworks wrapper from assets (if available)
    std::string steamworksWrapperScript;
    #ifdef ENABLE_STEAMWORKS
    if (steamEnabled) {
        auto steamworksAsset = assetLoader.getAsset("gemcore-steamworks-wrapper.js");
        if (steamworksAsset.data && steamworksAsset.size > 0) {
            steamworksWrapperScript = std::string(reinterpret_cast<const char*>(steamworksAsset.data), steamworksAsset.size);
        }
    }
    #endif
    
    // Build JavaScript init code
    std::string jsInit = R"JS(
    window.Gemcore = {
        version: '1.0.0',
        platform: 'linux',
        mode: 'shared-assets',
        steam: )JS";
    jsInit += steamEnabled ? "true" : "false";
    jsInit += R"JS(
    };
    
    // 🎮 Inject Steamworks wrapper (from separate file, but executed here for correct order)
    )JS";
    if (!steamworksWrapperScript.empty()) {
        jsInit += steamworksWrapperScript;
    }
    jsInit += R"JS(
    )JS";
    
    w.init(jsInit.c_str());
    
    // 🎬 Splash Screen: Show splash.html first, then navigate to game after 2 seconds
    if (config.app.splash) {
        // Pass target URL as query parameter so splash.html knows where to redirect
        std::string splashUrl = "http://127.0.0.1:" + std::to_string(port) + "/splash.html?redirect=" + config.entrypoint + "&t=" + cacheBuster;
        
        #ifndef NDEBUG
        std::cout << "🎬 Splash Screen: ENABLED (splash.html)" << std::endl;
        std::cout << "🌐 Splash URL: " << splashUrl << std::endl;
        #endif
        
        w.navigate(splashUrl.c_str());
        
        // After 2 seconds, navigate to the actual game (backup if splash.html doesn't redirect)
        std::thread([&w, url]() {
            std::this_thread::sleep_for(std::chrono::seconds(2));
            w.eval(("window.location.href = '" + url + "';").c_str());
        }).detach();
    } else {
        #ifndef NDEBUG
        std::cout << "🌐 URL: " << url << std::endl;
        std::cout << "🔄 Cache Buster: t=" << cacheBuster << std::endl;
        #endif
        
        w.navigate(url.c_str());
    }
    
    // 🎮 Start Steamworks callback thread (if enabled)
    #ifdef ENABLE_STEAMWORKS
    std::thread steamThread;
    if (steamEnabled) {
        steamThread = std::thread([]() {
            while (g_running) {
                gemcore::steamworks::SteamworksManager::RunCallbacks();
                std::this_thread::sleep_for(std::chrono::milliseconds(16)); // ~60 FPS
            }
        });
    }
    #endif
    
    // Run WebView event loop (blocks until window is closed)
    w.run();
    
    g_running = false;
    
    // 🎮 Cleanup Steamworks
    #ifdef ENABLE_STEAMWORKS
    if (steamEnabled) {
        if (steamThread.joinable()) {
            steamThread.join();
        }
        gemcore::steamworks::shutdownSteamworks();
    }
    #endif
    #else
    // System browser mode (fallback for cross-compilation)
    #ifndef NDEBUG
    std::cout << "🌐 Opening system browser..." << std::endl;
    std::cout << std::endl;
    #endif
    
    // 🎬 Splash Screen: Show splash.html first (splash.html handles redirect itself)
    std::string finalUrl = url;
    if (config.app.splash) {
        // Pass target URL as query parameter so splash.html knows where to redirect
        finalUrl = "http://127.0.0.1:" + std::to_string(port) + "/splash.html?redirect=" + config.entrypoint + "&t=" + cacheBuster;
        
        #ifndef NDEBUG
        std::cout << "🎬 Splash Screen: ENABLED (splash.html)" << std::endl;
        std::cout << "🌐 Splash URL: " << finalUrl << std::endl;
        std::cout << "💡 splash.html will redirect to game after 2 seconds" << std::endl;
        #endif
    } else {
        #ifndef NDEBUG
        std::cout << "🌐 URL: " << url << std::endl;
        std::cout << "🔄 Cache Buster: t=" << cacheBuster << std::endl;
        #endif
    }
    
    #ifndef NDEBUG
    std::cout << "🚀 Opening browser: " << finalUrl << std::endl;
    std::cout << std::endl;
    #endif
    
    std::string openCmd = "xdg-open \"" + finalUrl + "\" 2>/dev/null || sensible-browser \"" + finalUrl + "\" 2>/dev/null &";
    int result = system(openCmd.c_str());
    (void)result;  // Suppress unused result warning
    
    #ifndef NDEBUG
    std::cout << "✅ Server running! Press Ctrl+C to stop." << std::endl;
    #endif
    std::cout << "💡 Close browser tab to exit." << std::endl;
    
    // 🎮 Run Steamworks callbacks in background thread (if enabled)
    #ifdef ENABLE_STEAMWORKS
    std::thread steamThread;
    if (steamEnabled) {
        steamThread = std::thread([]() {
            while (g_running) {
                gemcore::steamworks::SteamworksManager::RunCallbacks();
                std::this_thread::sleep_for(std::chrono::milliseconds(16)); // ~60 FPS
            }
        });
    }
    #endif
    
    // Keep server running
    serverThread.join();
    
    g_running = false;
    
    // 🎮 Cleanup Steamworks
    #ifdef ENABLE_STEAMWORKS
    if (steamEnabled) {
        if (steamThread.joinable()) {
            steamThread.join();
        }
        gemcore::steamworks::shutdownSteamworks();
    }
    #endif
    #endif
    
    return 0;
}


