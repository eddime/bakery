/**
 * 🥐 Bakery Test with bakery.config.js
 * Loads config and applies all settings
 */

#include "bakery-config-reader.cpp"
#include <iostream>

int main(int argc, char* argv[]) {
    std::cout << "🥐 Bakery - Config Test" << std::endl;
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" << std::endl;
    
    // Get project directory
    std::string projectDir = argc > 1 ? argv[1] : "../examples/hello-world-socket";
    std::cout << "📁 Project: " << projectDir << std::endl;
    
    // Load config
    BakeryConfig config = loadBakeryConfig(projectDir);
    
    // Create WebView with debug mode from config
    webview::webview w(config.debug, nullptr);
    
    // Apply config
    applyConfigToWebView(w, config);
    
    // Set inline HTML for testing
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
                .container {
                    max-width: 600px;
                }
                h1 {
                    font-size: 48px;
                    margin: 0 0 20px 0;
                }
                .info {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 20px;
                    border-radius: 12px;
                    margin-top: 30px;
                }
                .info-item {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                    font-size: 14px;
                }
                .label {
                    opacity: 0.7;
                }
                .value {
                    font-weight: 600;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🥐 Bakery Config Test</h1>
                <p>All settings loaded from bakery.config.js!</p>
                
                <div class="info">
                    <div class="info-item">
                        <span class="label">Window Size:</span>
                        <span class="value" id="size"></span>
                    </div>
                    <div class="info-item">
                        <span class="label">User Agent:</span>
                        <span class="value" id="ua"></span>
                    </div>
                </div>
            </div>
            
            <script>
                document.getElementById('size').textContent = 
                    window.innerWidth + 'x' + window.innerHeight;
                document.getElementById('ua').textContent = 
                    navigator.userAgent.split(' ').pop();
                    
                console.log('🥐 Bakery Config Test loaded!');
                console.log('Window size:', window.innerWidth, 'x', window.innerHeight);
            </script>
        </body>
        </html>
    )HTML");
    
    // Run
    std::cout << "\n🚀 Starting WebView with config..." << std::endl;
    w.run();
    
    std::cout << "\n✅ Test complete!" << std::endl;
    return 0;
}

