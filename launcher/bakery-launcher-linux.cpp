/**
 * 🥐 Bakery Launcher - Linux Headless (Shared Assets from bakery-assets file)
 * Opens system browser instead of embedding WebView
 * Clean, shared-code version with zero duplication
 */

#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <atomic>
#include <chrono>
#include <fstream>
#include <cstdlib>
#include <sys/resource.h>  // For setpriority
#include <unistd.h>        // For fork/exec

#ifdef BAKERY_EMBEDDED_ASSETS
#include <limits.h>
#include <sys/stat.h>
#include <cstring>
#include <cstdint>
#endif

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
    
    for (auto& t : workers) t.join();
    close(fd);
}

// Open system default browser
void openBrowser(const std::string& url) {
    // Try xdg-open (most Linux distributions)
    if (fork() == 0) {
        execlp("xdg-open", "xdg-open", url.c_str(), nullptr);
        // If xdg-open fails, try alternatives
        execlp("x-www-browser", "x-www-browser", url.c_str(), nullptr);
        execlp("firefox", "firefox", url.c_str(), nullptr);
        execlp("chromium", "chromium", url.c_str(), nullptr);
        execlp("google-chrome", "google-chrome", url.c_str(), nullptr);
        exit(1);
    }
}

#ifdef BAKERY_EMBEDDED_ASSETS
namespace {
struct EmbeddedData {
    uint64_t x64Offset;
    uint64_t x64Size;
    uint64_t assetsOffset;
    uint64_t assetsSize;
    uint64_t configOffset;
    uint64_t configSize;
};

std::string getExecutablePath() {
    char path[PATH_MAX];
    ssize_t len = readlink("/proc/self/exe", path, sizeof(path) - 1);
    if (len < 0) {
        return {};
    }
    path[len] = '\0';
    return std::string(path);
}

bool readEmbeddedData(const std::string& exePath, EmbeddedData& data) {
    std::ifstream file(exePath, std::ios::binary);
    if (!file) return false;

    constexpr const char magic[] = "BAKERY_EMBEDDED\0";
    constexpr size_t magicLen = sizeof(magic);
    constexpr size_t headerSize = sizeof(EmbeddedData);

    file.seekg(0, std::ios::end);
    const auto fileSize = file.tellg();
    if (fileSize < static_cast<std::streamoff>(magicLen + headerSize)) {
        return false;
    }

    file.seekg(fileSize - static_cast<std::streamoff>(magicLen + headerSize), std::ios::beg);
    char magicBuf[magicLen];
    file.read(magicBuf, magicLen);
    if (std::memcmp(magicBuf, magic, magicLen) != 0) {
        return false;
    }

    file.read(reinterpret_cast<char*>(&data), sizeof(EmbeddedData));
    return true;
}

bool extractFile(const std::string& exePath, uint64_t offset, uint64_t size, const std::string& outPath) {
    std::ifstream in(exePath, std::ios::binary);
    if (!in) return false;

    std::ofstream out(outPath, std::ios::binary);
    if (!out) return false;

    in.seekg(static_cast<std::streamoff>(offset), std::ios::beg);

    const size_t BUFFER_SIZE = 1024 * 1024;
    std::vector<char> buffer(BUFFER_SIZE);
    uint64_t remaining = size;

    while (remaining > 0) {
        size_t toRead = static_cast<size_t>(std::min<uint64_t>(remaining, BUFFER_SIZE));
        in.read(buffer.data(), toRead);
        out.write(buffer.data(), toRead);
        remaining -= toRead;
    }

    return true;
}

bool extractEmbeddedResources(std::string& outputDir) {
    EmbeddedData data{};
    auto exePath = getExecutablePath();
    if (exePath.empty()) return false;
    if (!readEmbeddedData(exePath, data)) return false;

    if (data.assetsSize == 0 && data.configSize == 0) {
        return false;
    }

    char dirTemplate[] = "/tmp/bakeryXXXXXX";
    char* temp = mkdtemp(dirTemplate);
    if (!temp) {
        return false;
    }
    outputDir = temp;

    if (data.assetsSize > 0) {
        if (!extractFile(exePath, data.assetsOffset, data.assetsSize, outputDir + "/bakery-assets")) {
            return false;
        }
    }

    if (data.configSize > 0) {
        if (!extractFile(exePath, data.configOffset, data.configSize, outputDir + "/bakery.config.json")) {
            return false;
        }
    }

    std::cout << "📦 Extracted embedded assets to: " << outputDir << std::endl;
    return true;
}
} // namespace
#endif

int main(int argc, char* argv[]) {
    auto appStart = std::chrono::high_resolution_clock::now();
    
    std::cout << "🥐 Bakery Launcher (Linux Headless)" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
    std::cout << std::endl;
    
    // OPTIMIZATION 1: Process Priority (Linux)
    setpriority(PRIO_PROCESS, 0, -10);
    std::cout << "⚡ Process priority: HIGH" << std::endl;
    
    std::cout << std::endl;
    
#ifdef BAKERY_EMBEDDED_ASSETS
    std::string embeddedAssetDir;
    if (extractEmbeddedResources(embeddedAssetDir)) {
        setenv("BAKERY_ASSET_DIR", embeddedAssetDir.c_str(), 1);
    }
#endif
    
    // OPTIMIZATION 2: Asset Loading (parallel!)
    bakery::assets::SharedAssetLoader assetLoader;
    std::atomic<bool> assetsLoaded{false};
    
    std::thread assetLoadThread([&assetLoader, &assetsLoaded]() {
        assetsLoaded = assetLoader.load();
    });
    
    // OPTIMIZATION 3: Config Loading (while assets load!)
    const char* overrideDir = std::getenv("BAKERY_ASSET_DIR");
    std::string execDir = overrideDir && overrideDir[0] != '\0'
        ? std::string(overrideDir)
        : bakery::assets::getExecutableDir();
    std::string configPath = execDir + "/bakery.config.json";
    
    std::ifstream configFile(configPath);
    if (!configFile) {
        std::cerr << "❌ No bakery.config.json found at: " << configPath << std::endl;
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
    
    // OPTIMIZATION 5: Start HTTP server in background
    std::thread serverThread([&server]() {
        runServer(&server);
    });
    serverThread.detach();
    
    // Small delay to ensure server is ready
    std::this_thread::sleep_for(std::chrono::milliseconds(50));
    
    auto setupEnd = std::chrono::high_resolution_clock::now();
    auto setupDuration = std::chrono::duration_cast<std::chrono::milliseconds>(setupEnd - appStart).count();
    
    std::cout << "⚡ STARTUP TIME: " << setupDuration << "ms (all optimizations active)" << std::endl;
    std::cout << "🌐 Opening system browser..." << std::endl;
    std::cout << std::endl;
    
    // Open browser
    std::string url = "http://localhost:8765/" + config.entrypoint;
    std::cout << "🚀 URL: " << url << std::endl;
    openBrowser(url);
    
    std::cout << std::endl;
    std::cout << "✅ Server running on http://localhost:8765" << std::endl;
    std::cout << "💡 Press Ctrl+C to stop" << std::endl;
    
    // Keep server running
    while (g_running) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    return 0;
}

