// 🥐 Test: txiki.js + WebView
// This tests the production runtime

import { app, Window, resolveAssetPath } from './runtime/bakery-runtime.js';

console.log('🥐 Starting Bakery with txiki.js...\n');

app.on('ready', () => {
    console.log('✅ App ready!\n');

    const win = new Window({
        title: '🥐 Bakery + txiki.js',
        width: 800,
        height: 600,
        resizable: true,
        debug: true,
    });

    console.log('✅ Window created!\n');

    // Set icon (with automatic path resolution for .app bundles)
    const iconPath = resolveAssetPath('assets/icon.png');
    console.log(`🎨 Resolved icon path: ${iconPath}`);
    win.setIcon(iconPath);
    console.log('🎨 Icon set!\n');

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bakery + txiki.js</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                         Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        
        .container {
            padding: 2rem;
        }
        
        h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: fadeIn 1s ease-in;
        }
        
        p {
            font-size: 1.5rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        
        .badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            font-size: 1rem;
            margin: 0.5rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🥐 Bakery</h1>
        <p>Powered by txiki.js</p>
        <div>
            <span class="badge">5-8 MB</span>
            <span class="badge">⚡ Fast</span>
            <span class="badge">🎮 Game-Ready</span>
        </div>
    </div>
</body>
</html>
    `;

    win.setHtml(html);
    console.log('✅ HTML loaded!\n');
    console.log('🚀 Starting event loop...\n');

    win.run();

    console.log('\n👋 App closed.');
    win.destroy();
});

