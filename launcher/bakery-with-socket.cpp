/**
 * 🥐 Bakery Native + Socket Runtime Integration
 * Loads app from Socket Runtime HTTP server
 */

#include <nlohmann/json.hpp>
#include "bakery-config-reader.cpp"
#include <iostream>
#include <thread>
#include <chrono>
#include <cstdlib>
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>

pid_t socketRuntimePid = 0;

void cleanupSocketRuntime() {
    if (socketRuntimePid > 0) {
        std::cout << "\n🧹 Stopping Socket Runtime..." << std::endl;
        kill(socketRuntimePid, SIGTERM);
        waitpid(socketRuntimePid, nullptr, 0);
    }
}

int main(int argc, char* argv[]) {
    std::cout << "🥐 Bakery Native + Socket Runtime" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" << std::endl;
    
    // Get project directory
    std::string projectDir = argc > 1 ? argv[1] : ".";
    
    // Make absolute path
    if (projectDir[0] != '/') {
        char cwd[1024];
        getcwd(cwd, sizeof(cwd));
        projectDir = std::string(cwd) + "/" + projectDir;
    }
    
    std::cout << "📁 Project: " << projectDir << std::endl;
    
    // Load config
    BakeryConfig config = loadBakeryConfig(projectDir);
    
    // Find Socket Runtime binary in build
    std::string socketBinary = projectDir + "/build/mac/" + config.appName + "-dev.app/Contents/MacOS/" + config.appName + "-dev";
    
    if (!fs::exists(socketBinary)) {
        std::cerr << "❌ Socket Runtime binary not found: " << socketBinary << std::endl;
        std::cerr << "   Please build first: cd " << projectDir << " && ssc build -o" << std::endl;
        return 1;
    }
    
    std::cout << "✅ Found Socket Runtime: " << socketBinary << std::endl;
    
    // Start Socket Runtime as HTTP server
    std::cout << "\n🚀 Starting Socket Runtime HTTP server..." << std::endl;
    
    socketRuntimePid = fork();
    if (socketRuntimePid == 0) {
        // Child process: run Socket Runtime
        chdir(projectDir.c_str());
        
        // Set environment for Socket Runtime
        setenv("SOCKET_HOME", (projectDir + "/build/mac/" + config.appName + "-dev.app/Contents/Resources").c_str(), 1);
        
        // Run Socket Runtime (it will start HTTP server)
        execl(socketBinary.c_str(), socketBinary.c_str(), nullptr);
        
        // If exec fails
        std::cerr << "❌ Failed to start Socket Runtime" << std::endl;
        exit(1);
    }
    
    // Register cleanup handler
    atexit(cleanupSocketRuntime);
    
    // Wait for Socket Runtime to start
    std::cout << "⏳ Waiting for Socket Runtime to start (5s)..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(5));
    
    // Create WebView
    std::cout << "\n📱 Creating native WebView..." << std::endl;
    webview::webview w(config.debug, nullptr);
    
    // Apply config
    applyConfigToWebView(w, config);
    
    // Bind window control APIs
    w.bind("setTitle", [](std::string seq, std::string req, void* arg) -> std::string {
        auto* wv = static_cast<webview::webview*>(arg);
        wv->set_title(req);
        return "{}";
    }, &w);
    
    w.bind("setSize", [](std::string seq, std::string req, void* arg) -> std::string {
        auto* wv = static_cast<webview::webview*>(arg);
        try {
            auto j = nlohmann::json::parse(req);
            int width = j.at("width").get<int>();
            int height = j.at("height").get<int>();
            wv->set_size(width, height, WEBVIEW_HINT_NONE);
            return "{}";
        } catch (...) {
            return "{\"error\":\"Invalid size\"}";
        }
    }, &w);
    
    // Try to detect Socket Runtime port by reading its output
    // For now, try default port 0 (Socket Runtime assigns random port)
    // We need a better solution here!
    
    std::cout << "\n🌐 Loading app from project src..." << std::endl;
    
    // BETTER SOLUTION: Load HTML directly from file system!
    std::string indexPath = projectDir + "/src/index.html";
    
    if (!fs::exists(indexPath)) {
        std::cerr << "❌ index.html not found: " << indexPath << std::endl;
        cleanupSocketRuntime();
        return 1;
    }
    
    // Read index.html
    std::ifstream indexFile(indexPath);
    std::string htmlContent((std::istreambuf_iterator<char>(indexFile)),
                             std::istreambuf_iterator<char>());
    indexFile.close();
    
    // Inject Socket Runtime's Node.js APIs via file:// protocol
    // Socket Runtime needs to serve assets, so we use file:// URL
    std::string fileUrl = "file://" + indexPath;
    
    std::cout << "✅ Loading: " << fileUrl << std::endl;
    
    // Navigate to file
    w.navigate(fileUrl);
    
    // Run
    std::cout << "✅ WebView ready!\n" << std::endl;
    w.run();
    
    // Cleanup
    cleanupSocketRuntime();
    
    std::cout << "\n✅ Bakery closed!" << std::endl;
    return 0;
}

