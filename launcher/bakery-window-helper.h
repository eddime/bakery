/**
 * 🪟 Bakery Window Helper
 * Cross-platform window management wrapper
 * Abstracts native OS window APIs (macOS NSWindow, Windows HWND)
 */

#ifndef BAKERY_WINDOW_HELPER_H
#define BAKERY_WINDOW_HELPER_H

#include <string>

namespace bakery {
namespace window {

#ifdef __APPLE__
#include <objc/objc.h>
#include <objc/runtime.h>
#include <objc/message.h>
#include <CoreFoundation/CoreFoundation.h>

/**
 * Enable native macOS fullscreen button (required for Game Mode)
 * Sets NSWindowCollectionBehaviorFullScreenPrimary + FullScreenAuxiliary
 */
inline void enableFullscreenButton(void* window_ptr) {
    if (!window_ptr) return;
    
    id nswindow = (id)window_ptr;
    
    // Enable fullscreen button (green button) - required for Game Mode
    // NSWindowCollectionBehaviorFullScreenPrimary = 1 << 7 = 128 (main display)
    // NSWindowCollectionBehaviorFullScreenAuxiliary = 1 << 8 = 256 (external displays)
    // Combine both for multi-display support (like Godot!)
    SEL setCollectionBehavior = sel_registerName("setCollectionBehavior:");
    NSUInteger behavior = 128 | 256;  // Primary + Auxiliary (works on all displays!)
    ((void (*)(id, SEL, NSUInteger))objc_msgSend)(nswindow, setCollectionBehavior, behavior);
}

/**
 * Toggle native macOS fullscreen
 * Uses NSWindow toggleFullScreen: API
 */
inline void toggleFullscreen(void* window_ptr) {
    if (!window_ptr) return;
    
    id nswindow = (id)window_ptr;
    
    // Toggle fullscreen using native macOS API
    SEL toggleFullScreen = sel_registerName("toggleFullScreen:");
    ((void (*)(id, SEL, id))objc_msgSend)(nswindow, toggleFullScreen, nullptr);
}

/**
 * Enable WebView context menu (right-click) for copy/paste
 * Must be called on the WKWebView instance
 */
inline void enableWebViewContextMenu(void* webview_ptr) {
    if (!webview_ptr) return;
    
    // Get WKWebView from webview::webview
    // The webview_ptr is actually a WKWebView*
    id wkWebView = (id)webview_ptr;
    
    // Enable context menu by setting allowsBackForwardNavigationGestures
    // and ensuring the default context menu is enabled
    SEL getAllowsBackForwardSel = sel_registerName("allowsBackForwardNavigationGestures");
    SEL setAllowsBackForwardSel = sel_registerName("setAllowsBackForwardNavigationGestures:");
    
    // Enable back/forward gestures (this also enables context menu)
    ((void (*)(id, SEL, BOOL))objc_msgSend)(wkWebView, setAllowsBackForwardSel, YES);
}

/**
 * Enable persistent Game Mode via NSProcessInfo Activity
 * Implementation matches Godot Engine's approach for maximum reliability
 * Must be called EARLY in app lifecycle (before window creation!)
 */
inline void enablePersistentGameMode() {
    Class nsProcessInfoClass = objc_getClass("NSProcessInfo");
    if (!nsProcessInfoClass) return;
    
    SEL processInfoSel = sel_registerName("processInfo");
    id processInfo = ((id (*)(Class, SEL))objc_msgSend)(nsProcessInfoClass, processInfoSel);
    
    if (!processInfo) return;
    
    // GODOT APPROACH: Use NSActivityLatencyCritical ONLY
    // NSActivityLatencyCritical = 0xFF00000000ULL
    // Don't combine with UserInitiated - it's not needed and can interfere!
    SEL beginActivitySel = sel_registerName("beginActivityWithOptions:reason:");
    unsigned long long options = 0xFF00000000ULL;  // NSActivityLatencyCritical ONLY
    
    // Create reason string (shown in Activity Monitor)
    Class nsStringClass = objc_getClass("NSString");
    SEL stringWithUTF8Sel = sel_registerName("stringWithUTF8String:");
    id reasonStr = ((id (*)(Class, SEL, const char*))objc_msgSend)(
        nsStringClass, stringWithUTF8Sel, "Bakery Game - Latency Critical"
    );
    
    // Store token as static (kept alive for entire app lifetime)
    // IMPORTANT: We store as static, but ALWAYS create new token on each app start!
    // This ensures Game Mode icon appears every time (like Godot)
    static id activityToken = nullptr;
    
    // CRITICAL: ALWAYS create new token (even if static exists)
    // macOS needs a fresh activity for each process instance
    // This is why Game Mode icon appears on every launch!
    activityToken = ((id (*)(id, SEL, unsigned long long, id))objc_msgSend)(
        processInfo, beginActivitySel, options, reasonStr
    );
    
    // CRITICAL: Explicitly retain token (Godot uses [token retain])
    // beginActivityWithOptions returns an autoreleased object
    if (activityToken) {
        CFRetain((CFTypeRef)activityToken);
    }
}

#elif defined(_WIN32)
#include <windows.h>

/**
 * Enable native Windows fullscreen
 * Uses SetWindowPos with monitor info
 */
inline void enableFullscreen(void* window_ptr) {
    if (!window_ptr) return;
    
    HWND hwnd = (HWND)window_ptr;
    
    // Get monitor info
    HMONITOR hMonitor = MonitorFromWindow(hwnd, MONITOR_DEFAULTTONEAREST);
    MONITORINFO mi;
    mi.cbSize = sizeof(mi);
    GetMonitorInfo(hMonitor, &mi);
    
    // Set window style for fullscreen
    LONG_PTR style = GetWindowLongPtr(hwnd, GWL_STYLE);
    SetWindowLongPtr(hwnd, GWL_STYLE, style & ~(WS_CAPTION | WS_THICKFRAME | WS_SYSMENU));
    
    // Set window position and size to fullscreen
    SetWindowPos(hwnd, HWND_TOP,
        mi.rcMonitor.left, mi.rcMonitor.top,
        mi.rcMonitor.right - mi.rcMonitor.left,
        mi.rcMonitor.bottom - mi.rcMonitor.top,
        SWP_FRAMECHANGED | SWP_NOZORDER);
}

/**
 * Windows doesn't have a separate "enable fullscreen button" function
 * Fullscreen is handled directly via enableFullscreen()
 */
inline void enableFullscreenButton(void* window_ptr) {
    // No-op on Windows (fullscreen handled directly)
    (void)window_ptr;
}

/**
 * Toggle fullscreen (same as enableFullscreen on Windows)
 */
inline void toggleFullscreen(void* window_ptr) {
    enableFullscreen(window_ptr);
}

/**
 * Windows doesn't need persistent Game Mode (handled by system)
 */
inline void enablePersistentGameMode() {
    // No-op on Windows
}

#else
// Linux: No native fullscreen API needed (handled by WebView)
inline void enableFullscreenButton(void* window_ptr) {
    (void)window_ptr;
}

inline void toggleFullscreen(void* window_ptr) {
    (void)window_ptr;
}

inline void enableFullscreen(void* window_ptr) {
    (void)window_ptr;
}

/**
 * Linux doesn't need persistent Game Mode
 */
inline void enablePersistentGameMode() {
    // No-op on Linux
}
#endif

} // namespace window
} // namespace bakery

#endif // BAKERY_WINDOW_HELPER_H


