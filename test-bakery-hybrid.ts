/**
 * 🥐 Bakery - Hybrid Single Binary Test
 * Tests: Embedded WebView + Embedded Assets + Bun Compile
 */

import { WebView, SizeHint } from "./lib/webview-ffi";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

console.log("🥐 Bakery Hybrid Runtime Starting...");

// Create WebView
const webview = new WebView(true); // debug=true

webview.setTitle("🥐 Bakery - Single Binary Test");
webview.setSize(800, 600, SizeHint.NONE);

// Embed HTML directly as data: URL
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🥐 Bakery</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
    }
    .container {
      text-align: center;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    .subtitle { font-size: 1.2rem; opacity: 0.9; margin-bottom: 2rem; }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
    .feature {
      background: rgba(255, 255, 255, 0.2);
      padding: 1rem;
      border-radius: 10px;
      transition: transform 0.2s;
    }
    .feature:hover {
      transform: scale(1.05);
    }
    .feature-icon { font-size: 2rem; margin-bottom: 0.5rem; }
    .feature-text { font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🥐 Bakery</h1>
    <div class="subtitle">True Single Binary Desktop Framework</div>
    
    <div class="features">
      <div class="feature">
        <div class="feature-icon">📦</div>
        <div class="feature-text">Embedded WebView</div>
      </div>
      <div class="feature">
        <div class="feature-icon">🎨</div>
        <div class="feature-text">Embedded Assets</div>
      </div>
      <div class="feature">
        <div class="feature-icon">⚡</div>
        <div class="feature-text">Bun Compiled</div>
      </div>
      <div class="feature">
        <div class="feature-icon">🚀</div>
        <div class="feature-text">5-8 MB Binary</div>
      </div>
    </div>
    
    <div style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.7;">
      <div>Platform: ${process.platform}</div>
      <div>Arch: ${process.arch}</div>
      <div>Bun: ${Bun.version}</div>
    </div>
  </div>
</body>
</html>
`;

webview.setHTML(html);

console.log("✅ WebView initialized");
console.log("🪟 Opening window...");

// Run (blocks until window closes)
webview.run();

console.log("👋 Window closed");
webview.destroy();

