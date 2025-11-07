/**
 * 🥐 Bakery WebView Extensions
 * Additional features not in standard webview.h
 */

#ifndef BAKERY_WEBVIEW_EXTENSIONS_H
#define BAKERY_WEBVIEW_EXTENSIONS_H

#include "webview/webview.h"

#ifdef __APPLE__
#include <objc/objc-runtime.h>

// objc_msgSend and sel_registerName are already declared in objc-runtime.h

namespace bakery {

/**
 * Toggle fullscreen mode (macOS)
 * Uses native NSWindow toggleFullScreen: method
 */
inline void toggleFullscreen(webview::webview& w) {
    // Get window handle from webview
    auto window_result = w.window();
    if (window_result.has_error()) {
        return;
    }
    
    void* window_ptr = window_result.value();
    if (!window_ptr) {
        return;
    }
    
    // Cast to Objective-C id
    id window = (id)window_ptr;
    
    // Call [window toggleFullScreen:nil]
    SEL toggleSel = sel_registerName("toggleFullScreen:");
    ((void (*)(id, SEL, id))objc_msgSend)(window, toggleSel, (id)nullptr);
}

/**
 * Set always on top (macOS)
 */
inline void setAlwaysOnTop(webview::webview& w, bool enable) {
    auto window_result = w.window();
    if (window_result.has_error()) return;
    
    void* window_ptr = window_result.value();
    if (!window_ptr) return;
    
    id window = (id)window_ptr;
    
    // Set window level
    // NSFloatingWindowLevel = 3, NSNormalWindowLevel = 0
    SEL setLevelSel = sel_registerName("setLevel:");
    long level = enable ? 3 : 0;
    ((void (*)(id, SEL, long))objc_msgSend)(window, setLevelSel, level);
}

/**
 * Set frameless mode (macOS)
 */
inline void setFrameless(webview::webview& w, bool enable) {
    auto window_result = w.window();
    if (window_result.has_error()) return;
    
    void* window_ptr = window_result.value();
    if (!window_ptr) return;
    
    id window = (id)window_ptr;
    
    // Get current style mask
    SEL styleMaskSel = sel_registerName("styleMask");
    unsigned long styleMask = ((unsigned long (*)(id, SEL))objc_msgSend)(window, styleMaskSel);
    
    if (enable) {
        // Borderless: remove all decorations
        styleMask = 1 << 15; // NSWindowStyleMaskBorderless
    } else {
        // Normal: titled + closable + miniaturizable + resizable
        styleMask = 15;
    }
    
    // Set new style mask
    SEL setStyleMaskSel = sel_registerName("setStyleMask:");
    ((void (*)(id, SEL, unsigned long))objc_msgSend)(window, setStyleMaskSel, styleMask);
}

/**
 * Set window icon (macOS)
 * Note: macOS uses .app bundle icon from Info.plist, not runtime setIcon
 */
inline void setIcon(webview::webview& w, const std::string& iconPath) {
    // macOS doesn't support runtime icon changes like Windows
    // Icon must be set in .app bundle's Info.plist
    std::cout << "⚠️  setIcon not supported on macOS (use .app bundle icon)" << std::endl;
}

} // namespace bakery

#elif defined(_WIN32)

namespace bakery {

// Windows implementations would go here
inline void toggleFullscreen(webview::webview& w) {
    std::cout << "⚠️  toggleFullscreen not yet implemented for Windows" << std::endl;
}

inline void setAlwaysOnTop(webview::webview& w, bool enable) {
    std::cout << "⚠️  setAlwaysOnTop not yet implemented for Windows" << std::endl;
}

inline void setFrameless(webview::webview& w, bool enable) {
    std::cout << "⚠️  setFrameless not yet implemented for Windows" << std::endl;
}

inline void setIcon(webview::webview& w, const std::string& iconPath) {
    std::cout << "⚠️  setIcon not yet implemented for Windows" << std::endl;
}

} // namespace bakery

#else // Linux

namespace bakery {

// Linux implementations would go here
inline void toggleFullscreen(webview::webview& w) {
    std::cout << "⚠️  toggleFullscreen not yet implemented for Linux" << std::endl;
}

inline void setAlwaysOnTop(webview::webview& w, bool enable) {
    std::cout << "⚠️  setAlwaysOnTop not yet implemented for Linux" << std::endl;
}

inline void setFrameless(webview::webview& w, bool enable) {
    std::cout << "⚠️  setFrameless not yet implemented for Linux" << std::endl;
}

inline void setIcon(webview::webview& w, const std::string& iconPath) {
    std::cout << "⚠️  setIcon not yet implemented for Linux" << std::endl;
}

} // namespace bakery

#endif

#endif // BAKERY_WEBVIEW_EXTENSIONS_H

