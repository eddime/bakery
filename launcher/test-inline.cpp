/**
 * 🥐 Bakery Native Test - Inline HTML
 * Test webview with inline HTML (no Socket Runtime needed)
 */

#include "webview/webview.h"
#include <iostream>

int main() {
    std::cout << "🥐 Bakery Native - Inline HTML Test" << std::endl;
    
    // Create WebView
    webview::webview w(true, nullptr);
    
    // Set window properties
    w.set_title("🥐 Bakery Native Test");
    w.set_size(1200, 800, WEBVIEW_HINT_NONE);
    
    // Bind test function
    w.bind("testSetTitle", [](std::string seq, std::string req, void* arg) -> std::string {
        auto* wv = static_cast<webview::webview*>(arg);
        std::cout << "✅ testSetTitle called with: " << req << std::endl;
        wv->set_title("🎉 Title Changed from JavaScript!");
        return "{}";
    }, &w);
    
    // Set HTML with test UI
    w.set_html(R"HTML(
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bakery Test</title>
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
                }
                .container {
                    text-align: center;
                }
                h1 {
                    font-size: 48px;
                    margin: 0 0 20px 0;
                }
                button {
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 12px 24px;
                    font-size: 16px;
                    border-radius: 8px;
                    cursor: pointer;
                    margin: 10px;
                    font-weight: 600;
                }
                button:hover {
                    opacity: 0.9;
                }
                #status {
                    margin-top: 20px;
                    font-size: 14px;
                    opacity: 0.9;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🥐 Bakery Native Test</h1>
                <p>C++ WebView + Native Bindings</p>
                
                <button onclick="testNative()">Test Window Control</button>
                <button onclick="testAlert()">Test Alert</button>
                
                <div id="status"></div>
            </div>
            
            <script>
                function testNative() {
                    document.getElementById('status').textContent = '🔄 Calling native binding...';
                    
                    try {
                        testSetTitle({title: 'Changed!'});
                        document.getElementById('status').textContent = '✅ Native call successful!';
                    } catch (err) {
                        document.getElementById('status').textContent = '❌ Error: ' + err.message;
                    }
                }
                
                function testAlert() {
                    alert('🥐 Bakery Native WebView works!');
                }
                
                console.log('🥐 Bakery Test Page Loaded!');
            </script>
        </body>
        </html>
    )HTML");
    
    // Run
    std::cout << "🚀 Starting WebView..." << std::endl;
    w.run();
    
    std::cout << "✅ Closed" << std::endl;
    return 0;
}

