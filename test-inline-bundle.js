// 🥐 Bakery - Inline Bundle Test
// All-in-one file for txiki.js compilation

import FFI from 'tjs:ffi';

// ============================================
// WebView FFI Bindings (inline)
// ============================================

function getWebViewLibPath() {
    const platform = tjs.system.platform;
    const arch = tjs.system.arch;
    
    if (platform === 'darwin') {
        return './libwebview.dylib';
    } else if (platform === 'linux') {
        return `./libwebview-${arch}.so`;
    } else if (platform === 'windows') {
        return './libwebview.dll';
    }
    
    throw new Error(`Unsupported platform: ${platform}`);
}

const webviewLib = new FFI.Lib(getWebViewLibPath());

const webview_create = new FFI.CFunction(
    webviewLib.symbol('webview_create'),
    FFI.types.pointer,
    [FFI.types.sint, FFI.types.pointer]
);

const webview_destroy = new FFI.CFunction(
    webviewLib.symbol('webview_destroy'),
    FFI.types.void,
    [FFI.types.pointer]
);

const webview_run = new FFI.CFunction(
    webviewLib.symbol('webview_run'),
    FFI.types.void,
    [FFI.types.pointer]
);

const webview_set_title = new FFI.CFunction(
    webviewLib.symbol('webview_set_title'),
    FFI.types.void,
    [FFI.types.pointer, FFI.types.string]
);

const webview_set_size = new FFI.CFunction(
    webviewLib.symbol('webview_set_size'),
    FFI.types.void,
    [FFI.types.pointer, FFI.types.sint, FFI.types.sint, FFI.types.sint]
);

const webview_set_html = new FFI.CFunction(
    webviewLib.symbol('webview_set_html'),
    FFI.types.void,
    [FFI.types.pointer, FFI.types.string]
);

// ============================================
// Window Class (inline)
// ============================================

class Window {
    constructor(options = {}) {
        const {
            title = 'Bakery App',
            width = 800,
            height = 600,
            resizable = true,
            debug = false,
        } = options;

        this.handle = webview_create.call(debug ? 1 : 0, null);
        
        if (this.handle.isNull) {
            throw new Error('Failed to create webview');
        }

        webview_set_title.call(this.handle, title);
        const hint = resizable ? 0 : 3;
        webview_set_size.call(this.handle, width, height, hint);

        this._running = false;
    }

    setHtml(html) {
        webview_set_html.call(this.handle, html);
    }

    run() {
        this._running = true;
        webview_run.call(this.handle);
        this._running = false;
    }

    destroy() {
        if (!this.handle.isNull) {
            webview_destroy.call(this.handle);
            this.handle = null;
        }
    }
}

// ============================================
// App (inline)
// ============================================

class AppLifecycle {
    constructor() {
        this.handlers = { ready: [] };
        this.isReady = false;
    }

    on(event, handler) {
        if (this.handlers[event]) {
            this.handlers[event].push(handler);
        }
        if (event === 'ready' && this.isReady) {
            handler();
        }
    }

    emit(event) {
        if (this.handlers[event]) {
            for (const handler of this.handlers[event]) {
                handler();
            }
        }
    }

    start() {
        this.isReady = true;
        this.emit('ready');
    }
}

const app = new AppLifecycle();

// Auto-start
setTimeout(() => app.start(), 0);

// ============================================
// Your App Code
// ============================================

console.log('🥐 Starting Bakery (Inline Bundle)...\n');

app.on('ready', () => {
    console.log('✅ App ready!\n');

    const win = new Window({
        title: '🥐 Bakery - Inline Bundle',
        width: 800,
        height: 600,
        resizable: true,
        debug: true,
    });

    console.log('✅ Window created!\n');

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bakery Inline Bundle</title>
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
        <p>Single-File Production Build!</p>
        <div>
            <span class="badge">3.6 MB</span>
            <span class="badge">⚡ txiki.js</span>
            <span class="badge">🚀 Compiled</span>
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

