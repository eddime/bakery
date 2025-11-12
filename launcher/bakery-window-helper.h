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
#include <cstdlib>

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

// Shared activity token (must be shared between enable/disable functions)
namespace {
    static id g_activityToken = nullptr;
}

/**
 * Disable Game Mode Activity (cleanup on app exit)
 * CRITICAL: Must be called when app exits to prevent macOS from remembering deactivation
 */
inline void disablePersistentGameMode() {
    if (g_activityToken) {
        Class nsProcessInfoClass = objc_getClass("NSProcessInfo");
        if (nsProcessInfoClass) {
            SEL processInfoSel = sel_registerName("processInfo");
            id processInfo = ((id (*)(Class, SEL))objc_msgSend)(nsProcessInfoClass, processInfoSel);
            
            if (processInfo) {
                // End activity before app exits
                SEL endActivitySel = sel_registerName("endActivity:");
                ((void (*)(id, SEL, id))objc_msgSend)(processInfo, endActivitySel, g_activityToken);
            }
        }
        
        // Release retained token
        CFRelease((CFTypeRef)g_activityToken);
        g_activityToken = nullptr;
    }
}

/**
 * Enable persistent Game Mode via NSProcessInfo Activity
 * This ensures Game Mode activates EVERY time (like Godot!)
 * Must be called early in app lifecycle
 */
inline void enablePersistentGameMode() {
    Class nsProcessInfoClass = objc_getClass("NSProcessInfo");
    if (!nsProcessInfoClass) return;
    
    SEL processInfoSel = sel_registerName("processInfo");
    id processInfo = ((id (*)(Class, SEL))objc_msgSend)(nsProcessInfoClass, processInfoSel);
    
    if (!processInfo) return;
    
    // Start activity assertion to keep Game Mode active
    // NSActivityLatencyCritical = 0xFF00000000ULL (latency-critical)
    // NSActivityUserInitiated = 0x00FFFFFFULL (user-initiated)
    // Combine both for persistent Game Mode
    SEL beginActivitySel = sel_registerName("beginActivityWithOptions:reason:");
    unsigned long long options = 0xFF00FFFFFFULL;  // LatencyCritical | UserInitiated
    
    // Create reason string
    Class nsStringClass = objc_getClass("NSString");
    SEL stringWithUTF8Sel = sel_registerName("stringWithUTF8String:");
    id reasonStr = ((id (*)(Class, SEL, const char*))objc_msgSend)(
        nsStringClass, stringWithUTF8Sel, "Bakery Game - Latency Critical"
    );
    
    // CRITICAL: Always recreate activity (don't check if exists)
    // macOS might have deactivated Game Mode, so we need to reactivate it
    // End previous activity if exists
    if (g_activityToken) {
        SEL endActivitySel = sel_registerName("endActivity:");
        ((void (*)(id, SEL, id))objc_msgSend)(processInfo, endActivitySel, g_activityToken);
        CFRelease((CFTypeRef)g_activityToken);  // Release previous retain
        g_activityToken = nullptr;
    }
    
    // Create new activity EVERY time (ensures Game Mode activates)
    g_activityToken = ((id (*)(id, SEL, unsigned long long, id))objc_msgSend)(
        processInfo, beginActivitySel, options, reasonStr
    );
    
    // CRITICAL: Explicitly retain token to prevent deallocation
    // beginActivityWithOptions returns an autoreleased object
    // We must retain it manually to keep it alive for app lifetime
    if (g_activityToken) {
        CFRetain((CFTypeRef)g_activityToken);
        
        // CRITICAL: Register cleanup function to end activity on app exit
        // This prevents macOS from remembering deactivation
        static bool cleanupRegistered = false;
        if (!cleanupRegistered) {
            std::atexit(disablePersistentGameMode);
            cleanupRegistered = true;
        }
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

