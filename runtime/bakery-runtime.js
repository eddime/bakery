// 🥐 Bakery Runtime for txiki.js
// Provides WebView FFI bindings for production builds

import FFI from 'tjs:ffi';

// Determine WebView library path based on platform
function getWebViewLibPath() {
    const platform = tjs.system.platform;
    const arch = tjs.system.arch;
    
    // Check if we're in production (compiled binary) or development
    // In production, the library should be next to the binary
    // In development, it's in deps/webview-prebuilt/
    const isProduction = !tjs.args[1] || !tjs.args[1].includes('test-');
    
    if (isProduction) {
        // Production: Library next to binary
        if (platform === 'darwin') {
            return './libwebview.dylib';
        } else if (platform === 'linux') {
            return `./libwebview-${arch}.so`;
        } else if (platform === 'windows') {
            return './libwebview.dll';
        }
    } else {
        // Development: Library in deps folder
        if (platform === 'darwin') {
            return './deps/webview-prebuilt/libwebview.dylib';
        } else if (platform === 'linux') {
            return `./deps/webview-prebuilt/libwebview-${arch}.so`;
        } else if (platform === 'windows') {
            return './deps/webview-prebuilt/libwebview.dll';
        }
    }
    
    throw new Error(`Unsupported platform: ${platform}`);
}

// Load WebView library
const webviewLib = new FFI.Lib(getWebViewLibPath());

// Define FFI bindings
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

const webview_terminate = new FFI.CFunction(
    webviewLib.symbol('webview_terminate'),
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

const webview_navigate = new FFI.CFunction(
    webviewLib.symbol('webview_navigate'),
    FFI.types.void,
    [FFI.types.pointer, FFI.types.string]
);

const webview_eval = new FFI.CFunction(
    webviewLib.symbol('webview_eval'),
    FFI.types.void,
    [FFI.types.pointer, FFI.types.string]
);

// Window class
export class Window {
    constructor(options = {}) {
        const {
            title = 'Bakery App',
            width = 800,
            height = 600,
            resizable = true,
            debug = false,
        } = options;

        // Create webview (debug = 1, no debug = 0)
        this.handle = webview_create.call(debug ? 1 : 0, null);
        
        if (this.handle.isNull) {
            throw new Error('Failed to create webview');
        }

        // Set title and size
        webview_set_title.call(this.handle, title);
        
        // Size hints: 0 = none, 1 = min, 2 = max, 3 = fixed
        const hint = resizable ? 0 : 3;
        webview_set_size.call(this.handle, width, height, hint);

        this._running = false;
    }

    setTitle(title) {
        webview_set_title.call(this.handle, title);
    }

    setSize(width, height, hint = 0) {
        webview_set_size.call(this.handle, width, height, hint);
    }

    setHtml(html) {
        webview_set_html.call(this.handle, html);
    }

    navigate(url) {
        webview_navigate.call(this.handle, url);
    }

    eval(js) {
        webview_eval.call(this.handle, js);
    }

    run() {
        this._running = true;
        webview_run.call(this.handle);
        this._running = false;
    }

    terminate() {
        if (this._running) {
            webview_terminate.call(this.handle);
        }
    }

    destroy() {
        if (!this.handle.isNull) {
            webview_destroy.call(this.handle);
            this.handle = null;
        }
    }
}

// App lifecycle
class AppLifecycle {
    constructor() {
        this.handlers = {
            ready: [],
            beforeQuit: [],
        };
        this.isReady = false;
    }

    on(event, handler) {
        if (this.handlers[event]) {
            this.handlers[event].push(handler);
        }
        
        // Call immediately if already ready
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

    quit() {
        this.emit('beforeQuit');
        tjs.exit(0);
    }
}

export const app = new AppLifecycle();

// Auto-start app immediately for compiled binaries
// Use queueMicrotask to allow event handlers to be registered first
queueMicrotask(() => {
    app.start();
});

