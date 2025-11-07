/**
 * 🥐 Bakery - macOS Platform Extensions
 * Native features not available in webview.h
 */

#ifndef BAKERY_PLATFORM_MACOS_H
#define BAKERY_PLATFORM_MACOS_H

#ifdef __APPLE__

#include <objc/objc-runtime.h>

// Forward declarations
extern "C" id objc_msgSend(id self, SEL op, ...);

namespace bakery {
namespace macos {

/**
 * Toggle fullscreen mode for macOS window
 * Uses native NSWindow API
 */
inline void setFullscreen(void* windowHandle, bool enable) {
    if (!windowHandle) return;
    
    // Get NSWindow from WebView
    // windowHandle is actually the webview's cocoa_wkwebview_engine
    // We need to extract the NSWindow from it
    
    // Cast to id (Objective-C object)
    id webview = (id)windowHandle;
    
    // Get the window: [webview window]
    SEL windowSel = sel_registerName("window");
    id window = objc_msgSend(webview, windowSel);
    
    if (!window) return;
    
    // Check current fullscreen state: [window styleMask]
    SEL styleMaskSel = sel_registerName("styleMask");
    unsigned long styleMask = (unsigned long)objc_msgSend(window, styleMaskSel);
    
    // NSWindowStyleMaskFullScreen = 1 << 14
    const unsigned long NSWindowStyleMaskFullScreen = (1 << 14);
    bool isFullscreen = (styleMask & NSWindowStyleMaskFullScreen) != 0;
    
    // Toggle if needed
    if (enable != isFullscreen) {
        SEL toggleSel = sel_registerName("toggleFullScreen:");
        objc_msgSend(window, toggleSel, (id)nullptr);
    }
}

/**
 * Set window to always on top
 */
inline void setAlwaysOnTop(void* windowHandle, bool enable) {
    if (!windowHandle) return;
    
    id webview = (id)windowHandle;
    SEL windowSel = sel_registerName("window");
    id window = objc_msgSend(webview, windowSel);
    
    if (!window) return;
    
    // Set window level: [window setLevel:]
    // NSFloatingWindowLevel = 3
    SEL setLevelSel = sel_registerName("setLevel:");
    long level = enable ? 3 : 0; // 3 = floating, 0 = normal
    objc_msgSend(window, setLevelSel, level);
}

/**
 * Set window frameless (borderless)
 */
inline void setFrameless(void* windowHandle, bool enable) {
    if (!windowHandle) return;
    
    id webview = (id)windowHandle;
    SEL windowSel = sel_registerName("window");
    id window = objc_msgSend(webview, windowSel);
    
    if (!window) return;
    
    // Get current style mask
    SEL styleMaskSel = sel_registerName("styleMask");
    unsigned long styleMask = (unsigned long)objc_msgSend(webview, styleMaskSel);
    
    // NSWindowStyleMaskBorderless = 0
    // NSWindowStyleMaskTitled = 1
    if (enable) {
        styleMask = 0; // Borderless
    } else {
        styleMask = 15; // Titled + Closable + Miniaturizable + Resizable
    }
    
    // Set style mask: [window setStyleMask:]
    SEL setStyleMaskSel = sel_registerName("setStyleMask:");
    objc_msgSend(window, setStyleMaskSel, styleMask);
}

} // namespace macos
} // namespace bakery

#endif // __APPLE__

#endif // BAKERY_PLATFORM_MACOS_H

