// 🥐 Bakery - Main Library
// Runtime wrapper (initially using Bun, later txiki.js)

import { dlopen, FFIType, ptr, type Pointer } from "bun:ffi";
import { join } from "path";

// Load WebView library
const libPath = process.env.WEBVIEW_PATH || join(
  import.meta.dir,
  "../deps/webview-prebuilt",
  process.platform === "darwin" ? "libwebview.dylib" :
  process.platform === "linux" ? `libwebview-${process.arch}.so` :
  "libwebview.dll"
);

const lib = dlopen(libPath, {
  webview_create: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  webview_destroy: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  webview_run: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  webview_terminate: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  webview_set_title: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.void,
  },
  webview_set_size: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  webview_set_html: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.void,
  },
  webview_navigate: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.void,
  },
  webview_eval: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.void,
  },
  webview_bind: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
});

const encoder = new TextEncoder();

function encodeCString(str: string): Pointer {
  return ptr(encoder.encode(str + "\0"));
}

export enum SizeHint {
  NONE = 0,
  MIN = 1,
  MAX = 2,
  FIXED = 3,
}

export interface WindowOptions {
  title?: string;
  width?: number;
  height?: number;
  resizable?: boolean;
  debug?: boolean;
}

export class Window {
  private handle: Pointer | null = null;
  private callbacks = new Map<string, Function>();

  constructor(options: WindowOptions = {}) {
    const {
      title = "Bakery App",
      width = 1200,
      height = 800,
      resizable = true,
      debug = false,
    } = options;

    // Create webview
    this.handle = lib.symbols.webview_create(debug ? 1 : 0, null);
    
    if (!this.handle) {
      throw new Error("Failed to create WebView");
    }

    // Set properties
    lib.symbols.webview_set_title(this.handle, encodeCString(title));
    lib.symbols.webview_set_size(
      this.handle,
      width,
      height,
      resizable ? SizeHint.NONE : SizeHint.FIXED
    );

    console.log(`✅ Window created: ${width}x${height} "${title}"`);
  }

  setHTML(html: string) {
    if (!this.handle) throw new Error("Window destroyed");
    
    // In dev mode, just set the HTML - no hot reload script needed
    // The app will restart when files change
    lib.symbols.webview_set_html(this.handle, encodeCString(html));
  }

  loadFile(path: string) {
    if (!this.handle) throw new Error("Window destroyed");
    const file = Bun.file(path);
    const html = file.text();
    this.setHTML(html as any);
  }

  navigate(url: string) {
    if (!this.handle) throw new Error("Window destroyed");
    lib.symbols.webview_navigate(this.handle, encodeCString(url));
  }

  eval(js: string) {
    if (!this.handle) throw new Error("Window destroyed");
    lib.symbols.webview_eval(this.handle, encodeCString(js));
  }

  setTitle(title: string) {
    if (!this.handle) throw new Error("Window destroyed");
    lib.symbols.webview_set_title(this.handle, encodeCString(title));
  }

  setSize(width: number, height: number, hint: SizeHint = SizeHint.NONE) {
    if (!this.handle) throw new Error("Window destroyed");
    lib.symbols.webview_set_size(this.handle, width, height, hint);
  }

  run() {
    if (!this.handle) throw new Error("Window destroyed");
    console.log("🚀 Starting event loop...");
    lib.symbols.webview_run(this.handle);
  }

  destroy() {
    if (this.handle) {
      lib.symbols.webview_destroy(this.handle);
      this.handle = null;
      console.log("✅ Window destroyed");
    }
  }
}

// Simple app lifecycle API
export const app = {
  _readyCallbacks: [] as Function[],
  _quitCallbacks: [] as Function[],

  on(event: string, callback: Function) {
    if (event === "ready") {
      this._readyCallbacks.push(callback);
      // Execute immediately if we're already ready
      if (this._readyCallbacks.length === 1) {
        setTimeout(() => {
          this._readyCallbacks.forEach(cb => cb());
        }, 0);
      }
    } else if (event === "window-all-closed") {
      this._quitCallbacks.push(callback);
    }
  },

  quit() {
    console.log("👋 Quitting app...");
    this._quitCallbacks.forEach(cb => cb());
    process.exit(0);
  },
};

export { lib };

