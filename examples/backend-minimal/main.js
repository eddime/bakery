// 🥐 Bakery Minimal Backend Example
// Shows backend logic working without Node.js!

import { app, Window } from '../../runtime/bakery-runtime.js';

console.log('🥐 Starting Bakery Backend Minimal Demo...\n');

// 🔧 Backend: Simple data storage (like a mini-database)
const database = {
    users: ['Alice', 'Bob', 'Charlie'],
    counter: 0
};

console.log('✅ Backend initialized:');
console.log('   Platform: ' + tjs.system.platform);
console.log('   Arch: ' + tjs.system.arch);
console.log('   Users: ' + database.users.join(', '));
console.log('');

// 🎨 Frontend: WebView Window
app.on('ready', () => {
    console.log('✅ App ready!\n');

    const win = new Window({
        title: '🥐 Bakery Backend Demo',
        width: 900,
        height: 700,
        resizable: true,
        debug: true,
    });

    console.log('✅ Window created!\n');

    // Build HTML step by step to avoid template string issues
    const userItems = database.users.map(name => '<li class="user-item">' + name + '</li>').join('');
    
    const html = '<!DOCTYPE html>' +
'<html>' +
'<head>' +
'    <meta charset="UTF-8">' +
'    <title>Bakery Backend Demo</title>' +
'    <style>' +
'        * { margin: 0; padding: 0; box-sizing: border-box; }' +
'        body {' +
'            font-family: -apple-system, BlinkMacSystemFont, sans-serif;' +
'            display: flex;' +
'            justify-content: center;' +
'            align-items: center;' +
'            min-height: 100vh;' +
'            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);' +
'            color: white;' +
'            padding: 2rem;' +
'        }' +
'        .container {' +
'            background: rgba(255,255,255,0.1);' +
'            backdrop-filter: blur(10px);' +
'            border-radius: 20px;' +
'            padding: 3rem;' +
'            max-width: 700px;' +
'            width: 100%;' +
'            box-shadow: 0 8px 32px rgba(0,0,0,0.3);' +
'        }' +
'        h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }' +
'        .subtitle { font-size: 1.2rem; opacity: 0.9; margin-bottom: 2rem; }' +
'        .badge {' +
'            display: inline-block;' +
'            padding: 0.4rem 0.8rem;' +
'            background: rgba(255,255,255,0.2);' +
'            border-radius: 15px;' +
'            font-size: 0.85rem;' +
'            margin: 0.3rem;' +
'        }' +
'        .section {' +
'            margin-top: 2rem;' +
'            padding: 1.5rem;' +
'            background: rgba(0,0,0,0.2);' +
'            border-radius: 10px;' +
'        }' +
'        h2 { font-size: 1.5rem; margin-bottom: 1rem; }' +
'        .info-item { padding: 0.5rem 0; }' +
'        .info-label { font-weight: 600; opacity: 0.8; }' +
'        .info-value {' +
'            font-family: Monaco, monospace;' +
'            background: rgba(0,0,0,0.2);' +
'            padding: 0.2rem 0.5rem;' +
'            border-radius: 5px;' +
'            margin-left: 0.5rem;' +
'        }' +
'        .user-list { list-style: none; }' +
'        .user-item {' +
'            padding: 0.8rem;' +
'            background: rgba(0,0,0,0.2);' +
'            border-radius: 8px;' +
'            margin-bottom: 0.5rem;' +
'        }' +
'        .highlight { color: #FFD700; font-weight: 700; }' +
'        .check { color: #00ff88; }' +
'    </style>' +
'</head>' +
'<body>' +
'    <div class="container">' +
'        <h1>🥐 Bakery Backend Demo</h1>' +
'        <div class="subtitle">Backend läuft in txiki.js - <span class="highlight">KEIN Node.js!</span></div>' +
'        <div>' +
'            <span class="badge">✨ No Node.js</span>' +
'            <span class="badge">🚀 txiki.js</span>' +
'            <span class="badge">📦 3.9 MB</span>' +
'            <span class="badge">🔧 Backend Included</span>' +
'        </div>' +
'        <div class="section">' +
'            <h2>📊 Backend Data</h2>' +
'            <div class="info-item">' +
'                <span class="info-label">Platform:</span>' +
'                <span class="info-value">' + tjs.system.platform + '</span>' +
'            </div>' +
'            <div class="info-item">' +
'                <span class="info-label">Architecture:</span>' +
'                <span class="info-value">' + tjs.system.arch + '</span>' +
'            </div>' +
'            <div class="info-item">' +
'                <span class="info-label">Users Count:</span>' +
'                <span class="info-value">' + database.users.length + '</span>' +
'            </div>' +
'        </div>' +
'        <div class="section">' +
'            <h2>👥 Users (from Backend)</h2>' +
'            <ul class="user-list">' +
                userItems +
'            </ul>' +
'        </div>' +
'        <div class="section" style="background: rgba(0,255,136,0.1);">' +
'            <h2>🎯 Was bedeutet das?</h2>' +
'            <p style="margin-top: 1rem; line-height: 1.6;">' +
'                <span class="check">✓</span> Backend-Code läuft in <span class="highlight">txiki.js</span><br>' +
'                <span class="check">✓</span> User braucht <span class="highlight">KEIN Node.js</span><br>' +
'                <span class="check">✓</span> Alles <span class="highlight">embedded im Binary</span> (3.9 MB)<br>' +
'                <span class="check">✓</span> Full-Stack Desktop App ohne Dependencies!' +
'            </p>' +
'        </div>' +
'    </div>' +
'</body>' +
'</html>';

    console.log('✅ HTML prepared\n');

    win.setHtml(html);
    
    console.log('✅ HTML loaded!\n');
    console.log('🚀 App running!\n');

    win.run();

    console.log('\n👋 App closed.');
    win.destroy();
});
