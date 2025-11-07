/**
 * 🥐 Simple Bakery Native Test
 * Just open WebView to localhost:3000
 * (Assumes Socket Runtime is already running)
 */

#include "webview/webview.h"
#include <iostream>

int main() {
    std::cout << "🥐 Bakery Native Test Launcher" << std::endl;
    std::cout << "Connecting to http://localhost:3000..." << std::endl;
    
    // Create WebView
    webview::webview w(true, nullptr);
    
    // Set window properties
    w.set_title("🥐 Bakery - Native Test");
    w.set_size(1200, 800, WEBVIEW_HINT_NONE);
    
    // Inject Bakery API
    w.init(R"(
        window.Bakery = {
            window: {
                setTitle: (title) => {
                    console.log('🥐 setTitle:', title);
                    // TODO: Call native binding
                }
            }
        };
        console.log('🥐 Bakery Native API loaded!');
    )");
    
    // Navigate to Socket Runtime
    w.navigate("http://localhost:3000");
    
    // Run
    std::cout << "🚀 Starting WebView..." << std::endl;
    w.run();
    
    std::cout << "✅ Closed" << std::endl;
    return 0;
}

