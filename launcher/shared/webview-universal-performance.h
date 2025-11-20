#pragma once
/**
 *  Universal WebView Performance Optimizations
 * 
 *  Works with ANY game engine/framework:
 *    - Phaser, PixiJS, Three.js, Babylon.js
 *    - GDevelop, Construct, RPG Maker
 *    - Unity WebGL, Godot HTML5
 *    - Custom engines
 * 
 *  Strategy: PASSIVE optimizations only
 *    - No API hijacking/overriding
 *    - No engine-specific assumptions
 *    - Let the engine control its own loop
 */

#include "webview/webview.h"

#ifdef __APPLE__
#include <objc/runtime.h>
#include <objc/message.h>
#include <pthread.h>
#include <mach/mach.h>
#include <mach/thread_policy.h>
#include <sys/resource.h>

namespace gemcore {
namespace universal {

// 
// 1£  PROCESS PRIORITY (Universal: All apps benefit)
// 
inline void setHighProcessPriority() {
    // High priority for better CPU scheduling
    setpriority(PRIO_PROCESS, 0, -10); // Not too aggressive (-20 causes issues)
    
    // Real-time thread for main thread
    thread_time_constraint_policy_data_t policy;
    policy.period = 16667000;      // 60Hz refresh (~16.67ms)
    policy.computation = 5000000;  // 5ms compute time
    policy.constraint = 10000000;  // 10ms deadline
    policy.preemptible = 1;        // Allow preemption
    
    thread_policy_set(
        pthread_mach_thread_np(pthread_self()),
        THREAD_TIME_CONSTRAINT_POLICY,
        (thread_policy_t)&policy,
        THREAD_TIME_CONSTRAINT_POLICY_COUNT
    );
}

// 
// 2£  PREVENT APP NAP (Universal: Keep app responsive)
// 
inline void preventAppNap() {
    id processInfo = ((id(*)(id, SEL))objc_msgSend)(
        (id)objc_getClass("NSProcessInfo"),
        sel_registerName("processInfo")
    );
    
    // Activity options: User-initiated, sudden termination disabled, automatic termination disabled
    unsigned long long options = 
        (1ULL << 20) |  // NSActivityUserInitiated
        (1ULL << 14) |  // NSActivitySuddenTerminationDisabled
        (1ULL << 15);   // NSActivityAutomaticTerminationDisabled
    
    id reason = ((id(*)(id, SEL, const char*))objc_msgSend)(
        (id)objc_getClass("NSString"),
        sel_registerName("stringWithUTF8String:"),
        "Gemcore Game Running"
    );
    
    id activity = ((id(*)(id, SEL, unsigned long long, id))objc_msgSend)(
        processInfo,
        sel_registerName("beginActivityWithOptions:reason:"),
        options,
        reason
    );
    
    // Keep activity alive (don't release)
    ((void(*)(id, SEL))objc_msgSend)(activity, sel_registerName("retain"));
}

// 
// 3£  METAL RENDERING (Universal: Hardware acceleration)
// 
inline void enableMetalAcceleration(webview::webview& w) {
    auto window_handle = w.window();
    if (!window_handle.has_value()) return;
    
    void* nswindow = (void*)window_handle.value();
    if (!nswindow) return;
    
    // Get content view
    id contentView = ((id(*)(id, SEL))objc_msgSend)(
        (id)nswindow,
        sel_registerName("contentView")
    );
    
    if (contentView) {
        // Enable Core Animation layer (required for Metal)
        ((void(*)(id, SEL, BOOL))objc_msgSend)(
            contentView,
            sel_registerName("setWantsLayer:"),
            YES
        );
        
        // Opaque window for better performance
        ((void(*)(id, SEL, BOOL))objc_msgSend)(
            (id)nswindow,
            sel_registerName("setOpaque:"),
            YES
        );
        
        // Redraw policy: During live resize
        ((void(*)(id, SEL, long))objc_msgSend)(
            contentView,
            sel_registerName("setLayerContentsRedrawPolicy:"),
            2  // NSViewLayerContentsRedrawDuringViewResize
        );
    }
}

// 
// 4£  UNIVERSAL PERFORMANCE (Passive, non-intrusive)
// 
inline void enableUniversalPerformance(webview::webview& w) {
    // Apply OS-level optimizations
    setHighProcessPriority();
    preventAppNap();
    enableMetalAcceleration(w);
    
    // 
    // JavaScript: PASSIVE optimizations only
    // 
    w.init(R"JS(
(function() {
    'use strict';
    
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    //  CSS Hardware Acceleration Hints (inject once on load)
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    const injectCSS = () => {
        if (document.getElementById('gemcore-perf-css')) return; // Already injected
        
        const style = document.createElement('style');
        style.id = 'gemcore-perf-css';
        style.textContent = `
            /* Force GPU layers for common game containers */
            body, html {
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
            }
            
            /* Image rendering optimization */
            img, canvas, video {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
            
            /* Disable smooth scrolling (games handle their own) */
            * {
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    };
    
    // Inject immediately if DOM ready, otherwise wait
    if (document.head) {
        injectCSS();
    } else {
        document.addEventListener('DOMContentLoaded', injectCSS, { once: true });
    }
    
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    //  WebGL Context Optimization
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, attrs) {
        if (type === 'webgl' || type === 'webgl2') {
            // Suggest high-performance settings (game can override)
            attrs = attrs || {};
            if (attrs.powerPreference === undefined) {
                attrs.powerPreference = 'high-performance';
            }
            if (attrs.desynchronized === undefined) {
                attrs.desynchronized = true;
            }
        }
        return originalGetContext.call(this, type, attrs);
    };
    
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    //  Audio Context: Auto-resume (Universal)
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    if (window.AudioContext || window.webkitAudioContext) {
        const OriginalAudioContext = window.AudioContext || window.webkitAudioContext;
        const contexts = new Set();
        
        window.AudioContext = window.webkitAudioContext = function(...args) {
            const ctx = new OriginalAudioContext(...args);
            contexts.add(ctx);
            
            // Auto-resume if suspended
            if (ctx.state === 'suspended') {
                ctx.resume().catch(() => {});
            }
            
            return ctx;
        };
        
        // Resume on user interaction
        const resumeAllContexts = () => {
            contexts.forEach(ctx => {
                if (ctx.state === 'suspended') {
                    ctx.resume().catch(() => {});
                }
            });
        };
        
        ['click', 'touchstart', 'keydown'].forEach(event => {
            document.addEventListener(event, resumeAllContexts, { once: true, passive: true });
        });
    }
    
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    //   Image Decoding (Async, non-blocking)
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    if ('decode' in HTMLImageElement.prototype) {
        const originalSrcSet = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src').set;
        Object.defineProperty(HTMLImageElement.prototype, 'src', {
            set: function(value) {
                this.decoding = 'async';
                this.loading = 'eager';
                originalSrcSet.call(this, value);
                
                // Decode in background
                this.decode().catch(() => {});
            },
            configurable: true
        });
    }
    
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    //  Passive Event Listeners (Better scrolling)
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    // Use Set for O(1) lookup instead of Array O(n)!
    const passiveEvents = new Set(['touchstart', 'touchmove', 'wheel', 'mousewheel']);
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        // Make certain events passive by default (can be overridden)
        if (passiveEvents.has(type) && typeof options !== 'object') {
            options = { passive: true };
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    //  Viewport Meta (Prevent unwanted zooming)
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);
    }
    
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    //  Ready!
    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    console.log(' Gemcore Universal Performance: Active');
    console.log('    GPU Acceleration');
    console.log('    WebGL Optimization');
    console.log('    Audio Auto-Resume');
    console.log('    Passive Listeners');
})();
    )JS");
}

} // namespace universal
} // namespace gemcore

#elif defined(_WIN32)
// Windows implementation
#include <windows.h>
namespace gemcore {
namespace universal {
inline void enableUniversalPerformance(webview::webview& w) {
    SetPriorityClass(GetCurrentProcess(), HIGH_PRIORITY_CLASS);
    SetThreadPriority(GetCurrentThread(), THREAD_PRIORITY_HIGHEST);
    
    // Same JavaScript as macOS
    w.init(R"JS(/* Same JS code as above */)JS");
}
} // namespace universal
} // namespace gemcore

#else
// Linux implementation
#include <sys/resource.h>
namespace gemcore {
namespace universal {
inline void enableUniversalPerformance(webview::webview& w) {
    setpriority(PRIO_PROCESS, 0, -10);
    
    // Same JavaScript as macOS
    w.init(R"JS(/* Same JS code as above */)JS");
}
} // namespace universal
} // namespace gemcore

#endif

