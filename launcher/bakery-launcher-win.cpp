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
#include <timeapi.h>  // For timeBeginPeriod

#pragma comment(lib, "ws2_32.lib")
#pragma comment(lib, "shlwapi.lib")
#pragma comment(lib, "winmm.lib")  // For timeBeginPeriod

#include <nlohmann/json.hpp>
#include "webview/webview.h"

// NEW: Shared HTTP server and asset loader!
#include "bakery-http-server.h"
#include "bakery-asset-loader.h"
#include "bakery-window-helper.h"          // Cross-platform window management
#include "bakery-steamworks-bindings.h"    // 🎮 Steamworks integration (cross-platform)

using json = nlohmann::json;

struct BakeryConfig {
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
    int wsaResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (wsaResult != 0) {
        #ifndef NDEBUG
        std::cerr << "❌ WSAStartup failed: " << wsaResult << std::endl;
        #endif
        return;
    }
    
    SOCKET fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (fd == INVALID_SOCKET) {
        #ifndef NDEBUG
        std::cerr << "❌ Socket creation failed: " << WSAGetLastError() << std::endl;
        #endif
        WSACleanup();
        return;
    }
    
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
    
    if (bind(fd, (struct sockaddr*)&addr, sizeof(addr)) == SOCKET_ERROR) {
        #ifndef NDEBUG
        int err = WSAGetLastError();
        std::cerr << "❌ Failed to bind to port " << server->getPort() 
                  << " (error: " << err << ")" << std::endl;
        #endif
        closesocket(fd);
        WSACleanup();
        return;
    }
    
    if (listen(fd, 512) == SOCKET_ERROR) {
        #ifndef NDEBUG
        int err = WSAGetLastError();
        std::cerr << "❌ Failed to listen on port " << server->getPort() 
                  << " (error: " << err << ")" << std::endl;
        #endif
        closesocket(fd);
        WSACleanup();
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
        MessageBoxA(NULL, "Failed to load assets!", "Bakery Error", MB_ICONERROR);
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
                if (j["window"].contains("fullscreen")) {
                    config.window.fullscreen = j["window"]["fullscreen"].get<bool>();
                }
                if (j["window"].contains("startFullscreen")) {
                    config.window.fullscreen = j["window"]["startFullscreen"].get<bool>();
                }
            }
            
            // Load app config
            if (j.contains("app")) {
                if (j["app"].contains("name")) {
                    config.appName = j["app"]["name"].get<std::string>();
                    config.app.name = config.appName;
                    if (config.window.title == "Bakery App") {
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
    
    // 🚀 HIGH-PERFORMANCE MODE: Disable Power Throttling
    #ifndef NDEBUG
    std::cout << "🚀 Enabling High-Performance Mode..." << std::endl;
    #endif
    
    // Disable Windows Power Throttling for maximum FPS
    PROCESS_POWER_THROTTLING_STATE PowerThrottling{};
    PowerThrottling.Version = PROCESS_POWER_THROTTLING_CURRENT_VERSION;
    PowerThrottling.ControlMask = PROCESS_POWER_THROTTLING_EXECUTION_SPEED;
    PowerThrottling.StateMask = 0;  // 0 = disable throttling
    
    SetProcessInformation(
        GetCurrentProcess(),
        ProcessPowerThrottling,
        &PowerThrottling,
        sizeof(PowerThrottling)
    );
    
    // 🎮 Windows Game Mode Optimizations
    // Request high-performance GPU (prefer discrete over integrated)
    SetPriorityClass(GetCurrentProcess(), HIGH_PRIORITY_CLASS);
    
    // Set process priority boost (Windows Game Mode equivalent)
    SetProcessPriorityBoost(GetCurrentProcess(), FALSE);  // Disable priority boost throttling
    
    // Set thread priority for main thread (additional boost)
    SetThreadPriority(GetCurrentThread(), THREAD_PRIORITY_HIGHEST);
    
    // Set time-critical scheduling for lower latency
    timeBeginPeriod(1);  // Request 1ms timer resolution (reduces input latency)
    
    #ifndef NDEBUG
    std::cout << "🎮 Windows Game Mode optimizations enabled:" << std::endl;
    std::cout << "   ✅ HIGH_PRIORITY_CLASS" << std::endl;
    std::cout << "   ✅ Power Throttling disabled" << std::endl;
    std::cout << "   ✅ Priority Boost enabled" << std::endl;
    std::cout << "   ✅ Thread Priority: HIGHEST" << std::endl;
    std::cout << "   ✅ Timer Resolution: 1ms (lower latency)" << std::endl;
    #endif
    
    // 🎮 Initialize Steamworks (cross-platform helper)
    bool steamEnabled = bakery::steamworks::initSteamworks(config);
    
    // While cache builds, create WebView (parallel!)
    // Create WebView with debug mode from config (enables right-click menu, DevTools)
    webview::webview w(config.app.debug, nullptr);
    w.set_title(config.window.title);
    w.set_size(config.window.width, config.window.height, WEBVIEW_HINT_NONE);
    
    // 🖥️ Native Windows Fullscreen mode for maximum performance
    if (config.window.fullscreen) {
        #ifndef NDEBUG
        std::cout << "🖥️  Fullscreen mode: ENABLED (better performance)" << std::endl;
        #endif
        
        // Get window handle and set fullscreen
        auto window_result = w.window();
        if (window_result.has_value()) {
            void* window_ptr = window_result.value();
            if (window_ptr) {
                bakery::window::enableFullscreen(window_ptr);
                
                #ifndef NDEBUG
                std::cout << "   ✅ Native fullscreen activated!" << std::endl;
                #endif
            }
        }
    }
    
    // 🎮 Bind Steamworks to JavaScript (cross-platform helper)
    bakery::steamworks::bindSteamworksToWebview(w, steamEnabled);
    
    // Inject Bakery API + Runtime Optimizations + Steam Wrapper
    std::string bakeryInit = R"JS(
    window.Bakery = {
        version: '1.0.0',
        platform: 'windows',
        mode: 'universal',
        launcher: 'shared-assets',
        steam: )JS";
    bakeryInit += steamEnabled ? "true" : "false";
    bakeryInit += R"JS(
    };
    
    // 🎮 Steam API Wrapper - Clean API for game developers with error logging
    (function() {
        function parse(v) {
            if (v === null || v === undefined) return v;
            if (typeof v !== 'string') return v;
            try { return JSON.parse(v); } catch(e) { return v; }
        }
        
        // Helper to wrap API calls with error logging
        function wrapAPI(name, fn, logSuccess = false) {
            return async (...args) => {
                try {
                    const result = await fn(...args);
                    if (logSuccess && result !== false && result !== 0 && result !== '' && result !== null) {
                        console.log(`[Bakery Steam] ${name}:`, result);
                    }
                    return result;
                } catch (error) {
                    console.error(`[Bakery Steam] ${name} failed:`, error);
                    throw error;
                }
            };
        }
        
        const available = window.Bakery && window.Bakery.steam === true;
        
        if (!available) {
            console.warn('[Bakery Steam] Steamworks is not available. Make sure Steam is running and steamworks is enabled in bakery.config.js');
        }
        
        window.Steam = {
            isAvailable: () => available,
            getSteamID: wrapAPI('getSteamID', async () => available ? parse(await window.steamGetSteamID()) : '0'),
            getPersonaName: wrapAPI('getPersonaName', async () => available ? parse(await window.steamGetPersonaName()) : ''),
            getAppID: wrapAPI('getAppID', async () => available ? parseInt(parse(await window.steamGetAppID())) : 0),
            unlockAchievement: wrapAPI('unlockAchievement', async (id) => available ? parse(await window.steamUnlockAchievement(id)) === true : false),
            getAchievement: wrapAPI('getAchievement', async (id) => available ? parse(await window.steamGetAchievement(id)) === true : false),
            storeStats: wrapAPI('storeStats', async () => available ? parse(await window.steamStoreStats()) === true : false),
            setStatInt: wrapAPI('setStatInt', async (n, v) => available ? parse(await window.steamSetStatInt(n, v)) === true : false),
            getStatInt: wrapAPI('getStatInt', async (n) => available ? parseInt(parse(await window.steamGetStatInt(n))) : 0),
            fileWrite: wrapAPI('fileWrite', async (f, d) => available ? parse(await window.steamFileWrite(f, d)) === true : false),
            fileRead: wrapAPI('fileRead', async (f) => available ? parse(await window.steamFileRead(f)) || '' : ''),
            fileExists: wrapAPI('fileExists', async (f) => available ? parse(await window.steamFileExists(f)) === true : false),
            setRichPresence: wrapAPI('setRichPresence', async (k, v) => available ? parse(await window.steamSetRichPresence(k, v)) === true : false),
            isOverlayEnabled: wrapAPI('isOverlayEnabled', async () => available ? parse(await window.steamIsOverlayEnabled()) === true : false),
            activateOverlay: wrapAPI('activateOverlay', async (d) => available ? parse(await window.steamActivateOverlay(d)) === true : false),
            isDlcInstalled: wrapAPI('isDlcInstalled', async (id) => available ? parse(await window.steamIsDlcInstalled(id)) === true : false),
            getDLCCount: wrapAPI('getDLCCount', async () => available ? parseInt(parse(await window.steamGetDLCCount())) : 0),
            getFriendCount: wrapAPI('getFriendCount', async () => available ? parseInt(parse(await window.steamGetFriendCount())) : 0),
            getFriendPersonaName: wrapAPI('getFriendPersonaName', async (i) => available ? parse(await window.steamGetFriendPersonaName(i)) || '' : ''),
            triggerScreenshot: wrapAPI('triggerScreenshot', async () => available ? parse(await window.steamTriggerScreenshot()) === true : false),
            getCurrentGameLanguage: wrapAPI('getCurrentGameLanguage', async () => available ? parse(await window.steamGetCurrentGameLanguage()) || 'english' : 'english'),
            getAvailableGameLanguages: wrapAPI('getAvailableGameLanguages', async () => available ? parse(await window.steamGetAvailableGameLanguages()) || '' : ''),
            isSteamInBigPictureMode: wrapAPI('isSteamInBigPictureMode', async () => available ? parse(await window.steamIsSteamInBigPictureMode()) === true : false),
            isSteamDeck: wrapAPI('isSteamDeck', async () => available ? parse(await window.steamIsSteamDeck()) === true : false),
            getFriends: wrapAPI('getFriends', async (max = 100) => {
                if (!available) return [];
                const count = parseInt(parse(await window.steamGetFriendCount()));
                const friends = [];
                
                // First pass: get all available names
                for (let i = 0; i < Math.min(count, max); i++) {
                    const name = parse(await window.steamGetFriendPersonaName(i)) || '';
                    if (name) friends.push(name);
                }
                
                // If some names are missing, wait and retry (Steam loads data asynchronously)
                if (friends.length < Math.min(count, max)) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Second pass: retry all friends
                    const retryFriends = [];
                    for (let i = 0; i < Math.min(count, max); i++) {
                        const name = parse(await window.steamGetFriendPersonaName(i)) || '';
                        if (name) retryFriends.push(name);
                    }
                    return retryFriends;
                }
                
                return friends;
            })
        };
        window.Steamworks = window.Steam;
    })();
)JS";
    
    w.init(bakeryInit + R"(
        
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
        
        // ⚡ RUNTIME OPTIMIZATION 4: Disable text selection (less repaints)
        // Note: Context menu (right-click) is left enabled for debugging
        document.addEventListener('selectstart', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });
        
        // ⚡ RUNTIME OPTIMIZATION 5: CSS Hardware Acceleration
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
    std::string url = "http://127.0.0.1:" + std::to_string(port);
    w.navigate(url.c_str());
    
    // 🎮 Run Steamworks callbacks in background thread (if enabled)
    std::thread steamThread;
    if (steamEnabled) {
        steamThread = std::thread([]() {
            while (g_running) {
                bakery::steamworks::SteamworksManager::RunCallbacks();
                std::this_thread::sleep_for(std::chrono::milliseconds(16)); // ~60 FPS
            }
        });
    }
    
    // Run event loop
    w.run();
    
    // Cleanup
    g_running = false;
    
    // 🎮 Cleanup Steamworks
    if (steamEnabled) {
        if (steamThread.joinable()) {
            steamThread.join();
        }
        bakery::steamworks::shutdownSteamworks();
    }
    
    return 0;
}

