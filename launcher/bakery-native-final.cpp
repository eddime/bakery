/**
 * 🥐 Bakery Native Launcher - FINAL VERSION
 * Full bakery.config.js integration + Socket Runtime
 */

#include <nlohmann/json.hpp>
#include "bakery-config-reader.cpp"
#include <iostream>
#include <thread>
#include <chrono>
#include <cstdlib>
#include <unistd.h>

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
    
    // Start Socket Runtime in background
    std::cout << "\n🚀 Starting Socket Runtime..." << std::endl;
    std::string socketAppPath = projectDir + "/build/mac/" + config.appName + "-dev.app";
    
    if (!fs::exists(socketAppPath)) {
        std::cerr << "❌ Socket Runtime app not found: " << socketAppPath << std::endl;
        std::cerr << "   Please build first: cd " << projectDir << " && ssc build -o" << std::endl;
        return 1;
    }
    
    // Launch Socket Runtime app (serves on http://localhost:PORT)
    std::string launchCmd = "open -g \"" + socketAppPath + "\" 2>&1 &";
    system(launchCmd.c_str());
    
    // Wait for Socket Runtime to start
    std::cout << "⏳ Waiting for Socket Runtime to start..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(3));
    
    // Create WebView with debug mode from config
    std::cout << "\n📱 Creating native WebView..." << std::endl;
    webview::webview w(config.debug, nullptr);
    
    // Apply config
    applyConfigToWebView(w, config);
    
    // Bind window control APIs
    w.bind("setTitle", [](std::string seq, std::string req, void* arg) -> std::string {
        auto* wv = static_cast<webview::webview*>(arg);
        std::cout << "✅ setTitle: " << req << std::endl;
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
            std::cout << "✅ setSize: " << width << "x" << height << std::endl;
            return "{}";
        } catch (...) {
            return "{\"error\":\"Invalid size\"}";
        }
    }, &w);
    
    // Note: set_fullscreen not supported in webview.h yet
    // Will be implemented with platform-specific code later
    w.bind("setFullscreen", [](std::string seq, std::string req, void* arg) -> std::string {
        std::cout << "⚠️  setFullscreen not yet implemented" << std::endl;
        return "{\"error\":\"Not implemented\"}";
    }, &w);
    
    // Navigate to Socket Runtime
    // Socket Runtime dev app serves on a random port, we need to find it
    // For now, use a placeholder HTML that will redirect
    std::cout << "\n🌐 Loading frontend..." << std::endl;
    
    // Try common ports
    std::vector<int> ports = {3000, 8000, 8080, 9000};
    std::string url = "http://localhost:3000"; // Default
    
    // For now, use inline HTML that will try to connect
    w.set_html(R"HTML(
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: -apple-system, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                }
                h1 { font-size: 48px; }
                p { font-size: 18px; opacity: 0.9; }
                .spinner {
                    border: 4px solid rgba(255,255,255,0.3);
                    border-top: 4px solid white;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 20px auto;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        </head>
        <body>
            <div>
                <h1>🥐 Bakery</h1>
                <div class="spinner"></div>
                <p>Connecting to Socket Runtime...</p>
                <p id="status" style="font-size: 14px; margin-top: 20px;"></p>
            </div>
            
            <script>
                // Try to find Socket Runtime port
                const ports = [3000, 8000, 8080, 9000];
                let currentPort = 0;
                
                async function tryConnect() {
                    const port = ports[currentPort];
                    document.getElementById('status').textContent = `Trying port ${port}...`;
                    
                    try {
                        const response = await fetch(`http://localhost:${port}/`, {
                            method: 'HEAD',
                            mode: 'no-cors'
                        });
                        
                        // If we get here, port responded
                        document.getElementById('status').textContent = `Found Socket Runtime on port ${port}!`;
                        setTimeout(() => {
                            window.location.href = `http://localhost:${port}/`;
                        }, 500);
                        return;
                    } catch (err) {
                        currentPort++;
                        if (currentPort < ports.length) {
                            setTimeout(tryConnect, 500);
                        } else {
                            document.getElementById('status').textContent = 
                                '❌ Could not connect to Socket Runtime';
                        }
                    }
                }
                
                setTimeout(tryConnect, 1000);
            </script>
        </body>
        </html>
    )HTML");
    
    // Note: Fullscreen will be implemented later with platform-specific code
    if (config.startFullscreen) {
        std::cout << "⚠️  startFullscreen configured but not yet implemented" << std::endl;
    }
    
    // Run
    std::cout << "✅ WebView ready!\n" << std::endl;
    w.run();
    
    std::cout << "\n✅ Bakery closed!" << std::endl;
    return 0;
}

