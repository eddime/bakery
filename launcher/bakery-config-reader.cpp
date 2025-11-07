/**
 * 🥐 Bakery Config Reader
 * Reads bakery.config.js and applies settings to WebView
 */

#include "webview/webview.h"
#include <iostream>
#include <fstream>
#include <string>
#include <regex>
#include <filesystem>

namespace fs = std::filesystem;

struct BakeryConfig {
    // Window settings
    std::string title = "Bakery App";
    int width = 1280;
    int height = 720;
    int minWidth = 800;
    int minHeight = 600;
    bool resizable = true;
    bool frameless = false;
    bool startFullscreen = false;
    bool alwaysOnTop = false;
    bool debug = false;
    
    // Icon
    std::string iconPath;
    
    // App metadata
    std::string appName = "bakery-app";
    std::string version = "1.0.0";
};

// Simple JS value extractor (no full parser needed)
std::string extractValue(const std::string& content, const std::string& key) {
    // Find "key: value" pattern
    std::regex pattern(key + R"(\s*:\s*([^,\}]+))");
    std::smatch match;
    
    if (std::regex_search(content, match, pattern)) {
        std::string value = match[1].str();
        
        // Trim whitespace and quotes
        value.erase(0, value.find_first_not_of(" \t\n\r\"'"));
        value.erase(value.find_last_not_of(" \t\n\r\"',") + 1);
        
        return value;
    }
    return "";
}

int extractInt(const std::string& content, const std::string& key, int defaultValue) {
    std::string value = extractValue(content, key);
    if (value.empty()) return defaultValue;
    
    try {
        return std::stoi(value);
    } catch (...) {
        return defaultValue;
    }
}

bool extractBool(const std::string& content, const std::string& key, bool defaultValue) {
    std::string value = extractValue(content, key);
    if (value.empty()) return defaultValue;
    
    return (value == "true");
}

BakeryConfig loadBakeryConfig(const std::string& projectDir) {
    BakeryConfig config;
    
    std::string configPath = projectDir + "/bakery.config.js";
    
    if (!fs::exists(configPath)) {
        std::cout << "⚠️  No bakery.config.js found, using defaults" << std::endl;
        return config;
    }
    
    std::cout << "📖 Reading bakery.config.js..." << std::endl;
    
    // Read file
    std::ifstream file(configPath);
    std::string content((std::istreambuf_iterator<char>(file)),
                         std::istreambuf_iterator<char>());
    file.close();
    
    // Extract window settings
    config.title = extractValue(content, "title");
    config.width = extractInt(content, "width", 1280);
    config.height = extractInt(content, "height", 720);
    config.minWidth = extractInt(content, "minWidth", 800);
    config.minHeight = extractInt(content, "minHeight", 600);
    config.resizable = extractBool(content, "resizable", true);
    config.frameless = extractBool(content, "frameless", false);
    config.startFullscreen = extractBool(content, "startFullscreen", false);
    config.alwaysOnTop = extractBool(content, "alwaysOnTop", false);
    config.debug = extractBool(content, "debug", false);
    
    // Extract icon path (macos)
    std::string iconValue = extractValue(content, "icon");
    if (!iconValue.empty() && iconValue.find(".icns") != std::string::npos) {
        config.iconPath = projectDir + "/" + iconValue;
    }
    
    // Extract app name
    std::string nameValue = extractValue(content, "name");
    if (!nameValue.empty()) {
        config.appName = nameValue;
    }
    
    std::cout << "✅ Config loaded:" << std::endl;
    std::cout << "   Title: " << config.title << std::endl;
    std::cout << "   Size: " << config.width << "x" << config.height << std::endl;
    std::cout << "   MinSize: " << config.minWidth << "x" << config.minHeight << std::endl;
    std::cout << "   Resizable: " << (config.resizable ? "yes" : "no") << std::endl;
    std::cout << "   Frameless: " << (config.frameless ? "yes" : "no") << std::endl;
    std::cout << "   StartFullscreen: " << (config.startFullscreen ? "yes" : "no") << std::endl;
    std::cout << "   AlwaysOnTop: " << (config.alwaysOnTop ? "yes" : "no") << std::endl;
    if (!config.iconPath.empty()) {
        std::cout << "   Icon: " << config.iconPath << std::endl;
    }
    
    return config;
}

void applyConfigToWebView(webview::webview& w, const BakeryConfig& config) {
    std::cout << "⚙️  Applying config to WebView..." << std::endl;
    
    // Set title
    w.set_title(config.title);
    
    // Set size
    w.set_size(config.width, config.height, WEBVIEW_HINT_NONE);
    
    // Set min size
    w.set_size(config.minWidth, config.minHeight, WEBVIEW_HINT_MIN);
    
    // Note: WebView.h doesn't support all features directly
    // frameless, alwaysOnTop, fullscreen need platform-specific code
    
    std::cout << "✅ Config applied!" << std::endl;
}

