// 🥐 Bakery - Main Library
// Runtime wrapper (initially using Bun, later txiki.js)

import { dlopen, FFIType, ptr, type Pointer, CString, JSCallback } from "bun:ffi";
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
  webview_return: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.i32, FFIType.cstring],
    returns: FFIType.void,
  },
  // 🥐 Bakery Extensions
  webview_set_icon: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.i32,
  },
  webview_set_min_size: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
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

  setIcon(iconPath: string) {
    if (!this.handle) throw new Error("Window destroyed");
    const result = lib.symbols.webview_set_icon(this.handle, encodeCString(iconPath));
    if (result !== 0) {
      console.warn(`⚠️  Failed to set icon: ${iconPath}`);
    }
  }

  setMinSize(width: number, height: number) {
    if (!this.handle) throw new Error("Window destroyed");
    const result = lib.symbols.webview_set_min_size(this.handle, width, height);
    if (result !== 0) {
      console.warn(`⚠️  Failed to set min size: ${width}x${height}`);
    }
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

  bind(name: string, callback: (...args: any[]) => any) {
    if (!this.handle) throw new Error("Window destroyed");
    
    // Store callback
    this.callbacks.set(name, callback);
    
    // Create FFI callback using JSCallback
    const ffiCallback = new JSCallback(
      (seqPtr: Pointer, reqPtr: Pointer, _arg: Pointer) => {
        const seq = seqPtr ? new CString(seqPtr) : "";
        const req = reqPtr ? new CString(reqPtr) : "";
        
        try {
          // Parse arguments from JSON array
          const args = JSON.parse(req as string);
          
          // Call user callback
          const result = callback(...args);
          
          // Handle async results
          if (result instanceof Promise) {
            result.then((res) => {
              const jsonResult = JSON.stringify(res);
              lib.symbols.webview_return(
                this.handle,
                encodeCString(seq as string),
                0,
                encodeCString(jsonResult)
              );
            }).catch((err) => {
              const errorResult = JSON.stringify({ error: err.message });
              lib.symbols.webview_return(
                this.handle,
                encodeCString(seq as string),
                1,
                encodeCString(errorResult)
              );
            });
          } else {
            // Sync result
            const jsonResult = JSON.stringify(result);
            lib.symbols.webview_return(
              this.handle,
              encodeCString(seq as string),
              0,
              encodeCString(jsonResult)
            );
          }
        } catch (err: any) {
          const errorResult = JSON.stringify({ error: err.message });
          lib.symbols.webview_return(
            this.handle,
            encodeCString(seq as string),
            1,
            encodeCString(errorResult)
          );
        }
      },
      {
        args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
        returns: FFIType.void,
      }
    );
    
    // Bind to webview
    lib.symbols.webview_bind(
      this.handle,
      encodeCString(name),
      ffiCallback.ptr,
      null
    );
    
    console.log(`✅ Bound function: ${name}`);
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

