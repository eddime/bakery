/**
 * 🥐 Bakery Native - Simple Direct Loading
 * Loads HTML directly from file system (no Socket Runtime needed for now)
 */

#include <nlohmann/json.hpp>
#include "bakery-config-reader.cpp"
#include "webview-extensions.h"
#include <iostream>
#include <fstream>
#include <sstream>

int main(int argc, char* argv[]) {
    std::cout << "🥐 Bakery Native Launcher" << std::endl;
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
    
    // Create WebView
    std::cout << "\n📱 Creating native WebView..." << std::endl;
    webview::webview w(config.debug, nullptr);
    
    // Apply config
    applyConfigToWebView(w, config);
    
    // Apply extended features (frameless, alwaysOnTop, fullscreen)
    if (config.frameless) {
        std::cout << "🪟 Setting frameless mode..." << std::endl;
        bakery::setFrameless(w, true);
    }
    
    if (config.alwaysOnTop) {
        std::cout << "📌 Setting always on top..." << std::endl;
        bakery::setAlwaysOnTop(w, true);
    }
    
    if (config.startFullscreen) {
        std::cout << "🖥️  Starting in fullscreen mode..." << std::endl;
        bakery::toggleFullscreen(w);
    }
    
    // Bind Bakery APIs
    std::cout << "\n🔧 Setting up Bakery APIs..." << std::endl;
    
    w.bind("setTitle", [](std::string seq, std::string req, void* arg) -> std::string {
        auto* wv = static_cast<webview::webview*>(arg);
        wv->set_title(req);
        std::cout << "✅ setTitle: " << req << std::endl;
        return "{}";
    }, &w);
    
    w.bind("setSize", [](std::string seq, std::string req, void* arg) -> std::string {
        auto* wv = static_cast<webview::webview*>(arg);
        try {
            auto j = nlohmann::json::parse(req);
            int width = j.at("width").get<int>();
            int height = j.at("height").get<int>();
            wv->set_size(width, height, WEBVIEW_HINT_NONE);
            std::cout << "✅ setSize: " << width << "x" << height << std::endl;
            return "{}";
        } catch (...) {
            return "{\"error\":\"Invalid size\"}";
        }
    }, &w);
    
    // Read and serve index.html
    std::cout << "\n📄 Loading index.html..." << std::endl;
    std::string indexPath = projectDir + "/src/index.html";
    
    if (!fs::exists(indexPath)) {
        std::cerr << "❌ index.html not found: " << indexPath << std::endl;
        return 1;
    }
    
    // Use file:// URL to load with relative paths working
    std::string fileUrl = "file://" + indexPath;
    std::cout << "✅ Loading: " << fileUrl << std::endl;
    
    w.navigate(fileUrl);
    
    // Run
    std::cout << "\n✅ WebView ready!\n" << std::endl;
    w.run();
    
    std::cout << "\n✅ Bakery closed!" << std::endl;
    return 0;
}

