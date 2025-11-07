/**
 * 🥐 Bakery - Minimal WebView FFI
 * Direct FFI bindings to webview library WITHOUT bun-webview dependency
 */

import { dlopen, FFIType, suffix } from "bun:ffi";
import { getWebViewLibraryPath } from "./embedded-webview";

// Extract and get library path BEFORE loading FFI
const libPath = getWebViewLibraryPath();

// Load WebView library
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
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  webview_set_size: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  webview_navigate: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  webview_set_html: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  webview_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  webview_eval: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  webview_bind: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
});

// Size hints
export enum SizeHint {
  NONE = 0,
  MIN = 1,
  MAX = 2,
  FIXED = 3,
}

// Helper to convert string to C string pointer
function toCString(str: string): Buffer {
  return Buffer.from(str + "\0", "utf-8");
}

/**
 * Minimal WebView class
 */
export class WebView {
  private handle: number;
  private bindings: Map<string, (args: string) => string> = new Map();

  constructor(debug: boolean = false) {
    this.handle = lib.symbols.webview_create(debug ? 1 : 0, null) as number;
    if (!this.handle) {
      throw new Error("Failed to create WebView");
    }
  }

  setTitle(title: string): void {
    lib.symbols.webview_set_title(this.handle, toCString(title));
  }

  setSize(width: number, height: number, hint: SizeHint = SizeHint.NONE): void {
    lib.symbols.webview_set_size(this.handle, width, height, hint);
  }

  navigate(url: string): void {
    lib.symbols.webview_navigate(this.handle, toCString(url));
  }

  setHTML(html: string): void {
    lib.symbols.webview_set_html(this.handle, toCString(html));
  }

  init(js: string): void {
    lib.symbols.webview_init(this.handle, toCString(js));
  }

  eval(js: string): void {
    lib.symbols.webview_eval(this.handle, toCString(js));
  }

  /**
   * Bind a function to be callable from the WebView (SIMPLIFIED - NO IPC YET)
   * @param name Function name (will be available as window.<name>)
   * @param callback Function that takes JSON args and returns JSON result
   */
  bind(name: string, callback: (args: string) => string | Promise<string>): void {
    // TODO: Implement IPC in v2
    console.warn(`⚠️  WebView.bind() not yet implemented. Use HTTP server or data: URLs for now.`);
  }

  run(): void {
    // This blocks until window is closed
    lib.symbols.webview_run(this.handle);
  }

  terminate(): void {
    lib.symbols.webview_terminate(this.handle);
  }

  destroy(): void {
    lib.symbols.webview_destroy(this.handle);
  }
}

export { WebView as default };

