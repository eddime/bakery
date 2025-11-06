/*
 * MIT License
 *
 * Copyright (c) 2017 Serge Zaitsev
 * Copyright (c) 2022 Steffen André Langnes
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

#ifndef WEBVIEW_C_API_IMPL_HH
#define WEBVIEW_C_API_IMPL_HH

#if defined(__cplusplus) && !defined(WEBVIEW_HEADER)

#include "backends.hh"
#include "errors.h"
#include "errors.hh"
#include "json_deprecated.hh"
#include "macros.h"
#include "types.h"
#include "version.h"

namespace webview {
namespace detail {

// The library's version information.
constexpr const webview_version_info_t library_version_info{
    {WEBVIEW_VERSION_MAJOR, WEBVIEW_VERSION_MINOR, WEBVIEW_VERSION_PATCH},
    WEBVIEW_VERSION_NUMBER,
    WEBVIEW_VERSION_PRE_RELEASE,
    WEBVIEW_VERSION_BUILD_METADATA};

template <typename WorkFn, typename ResultFn>
webview_error_t api_filter(WorkFn &&do_work, ResultFn &&put_result) noexcept {
  try {
    auto result = do_work();
    if (result.ok()) {
      put_result(result.value());
      return WEBVIEW_ERROR_OK;
    }
    return result.error().code();
  } catch (const exception &e) {
    return e.error().code();
  } catch (...) {
    return WEBVIEW_ERROR_UNSPECIFIED;
  }
}

template <typename WorkFn>
webview_error_t api_filter(WorkFn &&do_work) noexcept {
  try {
    auto result = do_work();
    if (result.ok()) {
      return WEBVIEW_ERROR_OK;
    }
    return result.error().code();
  } catch (const exception &e) {
    return e.error().code();
  } catch (...) {
    return WEBVIEW_ERROR_UNSPECIFIED;
  }
}

inline webview *cast_to_webview(void *w) {
  if (!w) {
    throw exception{WEBVIEW_ERROR_INVALID_ARGUMENT,
                    "Cannot cast null pointer to webview instance"};
  }
  return static_cast<webview *>(w);
}

} // namespace detail
} // namespace webview

WEBVIEW_API webview_t webview_create(int debug, void *wnd) {
  using namespace webview::detail;
  webview::webview *w{};
  auto err = api_filter(
      [=]() -> webview::result<webview::webview *> {
        return new webview::webview{static_cast<bool>(debug), wnd};
      },
      [&](webview::webview *w_) { w = w_; });
  if (err == WEBVIEW_ERROR_OK) {
    return w;
  }
  return nullptr;
}

WEBVIEW_API webview_error_t webview_destroy(webview_t w) {
  using namespace webview::detail;
  return api_filter([=]() -> webview::noresult {
    delete cast_to_webview(w);
    return {};
  });
}

WEBVIEW_API webview_error_t webview_run(webview_t w) {
  using namespace webview::detail;
  return api_filter([=] { return cast_to_webview(w)->run(); });
}

WEBVIEW_API webview_error_t webview_terminate(webview_t w) {
  using namespace webview::detail;
  return api_filter([=] { return cast_to_webview(w)->terminate(); });
}

WEBVIEW_API webview_error_t webview_dispatch(webview_t w,
                                             void (*fn)(webview_t, void *),
                                             void *arg) {
  using namespace webview::detail;
  if (!fn) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter(
      [=] { return cast_to_webview(w)->dispatch([=]() { fn(w, arg); }); });
}

WEBVIEW_API void *webview_get_window(webview_t w) {
  using namespace webview::detail;
  void *window = nullptr;
  auto err = api_filter([=] { return cast_to_webview(w)->window(); },
                        [&](void *value) { window = value; });
  if (err == WEBVIEW_ERROR_OK) {
    return window;
  }
  return nullptr;
}

WEBVIEW_API void *webview_get_native_handle(webview_t w,
                                            webview_native_handle_kind_t kind) {
  using namespace webview::detail;
  void *handle{};
  auto err = api_filter(
      [=]() -> webview::result<void *> {
        auto *w_ = cast_to_webview(w);
        switch (kind) {
        case WEBVIEW_NATIVE_HANDLE_KIND_UI_WINDOW:
          return w_->window();
        case WEBVIEW_NATIVE_HANDLE_KIND_UI_WIDGET:
          return w_->widget();
        case WEBVIEW_NATIVE_HANDLE_KIND_BROWSER_CONTROLLER:
          return w_->browser_controller();
        default:
          return webview::error_info{WEBVIEW_ERROR_INVALID_ARGUMENT};
        }
      },
      [&](void *handle_) { handle = handle_; });
  if (err == WEBVIEW_ERROR_OK) {
    return handle;
  }
  return nullptr;
}

WEBVIEW_API webview_error_t webview_set_title(webview_t w, const char *title) {
  using namespace webview::detail;
  if (!title) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter([=] { return cast_to_webview(w)->set_title(title); });
}

WEBVIEW_API webview_error_t webview_set_size(webview_t w, int width, int height,
                                             webview_hint_t hints) {
  using namespace webview::detail;
  return api_filter(
      [=] { return cast_to_webview(w)->set_size(width, height, hints); });
}

WEBVIEW_API webview_error_t webview_navigate(webview_t w, const char *url) {
  using namespace webview::detail;
  if (!url) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter([=] { return cast_to_webview(w)->navigate(url); });
}

WEBVIEW_API webview_error_t webview_set_html(webview_t w, const char *html) {
  using namespace webview::detail;
  if (!html) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter([=] { return cast_to_webview(w)->set_html(html); });
}

WEBVIEW_API webview_error_t webview_init(webview_t w, const char *js) {
  using namespace webview::detail;
  if (!js) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter([=] { return cast_to_webview(w)->init(js); });
}

WEBVIEW_API webview_error_t webview_eval(webview_t w, const char *js) {
  using namespace webview::detail;
  if (!js) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter([=] { return cast_to_webview(w)->eval(js); });
}

WEBVIEW_API webview_error_t webview_bind(webview_t w, const char *name,
                                         void (*fn)(const char *id,
                                                    const char *req, void *arg),
                                         void *arg) {
  using namespace webview::detail;
  if (!name || !fn) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter([=] {
    return cast_to_webview(w)->bind(
        name,
        [=](const std::string &seq, const std::string &req, void *arg_) {
          fn(seq.c_str(), req.c_str(), arg_);
        },
        arg);
  });
}

WEBVIEW_API webview_error_t webview_unbind(webview_t w, const char *name) {
  using namespace webview::detail;
  if (!name) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter([=] { return cast_to_webview(w)->unbind(name); });
}

WEBVIEW_API webview_error_t webview_return(webview_t w, const char *id,
                                           int status, const char *result) {
  using namespace webview::detail;
  if (!id || !result) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  return api_filter(
      [=] { return cast_to_webview(w)->resolve(id, status, result); });
}

WEBVIEW_API const webview_version_info_t *webview_version(void) {
  return &webview::detail::library_version_info;
}

// 🥐 Bunery Extensions - Cross-platform window control functions

#if defined(_WIN32)
#include <windows.h>
#include <commctrl.h>
#include <dwmapi.h>
#include <map>
#pragma comment(lib, "dwmapi.lib")
#elif defined(__APPLE__)
#include <objc/runtime.h>
#include <objc/message.h>
#endif

#if defined(_WIN32)
// Store min sizes per window (avoid using GWLP_USERDATA which webview uses!)
static std::map<HWND, POINT> g_min_sizes;

// Window procedure for handling WM_GETMINMAXINFO
static LRESULT CALLBACK MinSizeWndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam, UINT_PTR uIdSubclass, DWORD_PTR dwRefData) {
    if (msg == WM_GETMINMAXINFO) {
        auto it = g_min_sizes.find(hwnd);
        if (it != g_min_sizes.end()) {
            MINMAXINFO* mmi = (MINMAXINFO*)lParam;
            mmi->ptMinTrackSize.x = it->second.x;
            mmi->ptMinTrackSize.y = it->second.y;
        }
    } else if (msg == WM_NCDESTROY) {
        g_min_sizes.erase(hwnd);
        RemoveWindowSubclass(hwnd, MinSizeWndProc, 0);
    }
    return DefSubclassProc(hwnd, msg, wParam, lParam);
}
#endif

WEBVIEW_API webview_error_t webview_set_icon(webview_t w, const char *icon_path) {
  using namespace webview::detail;
  if (!icon_path) {
    return WEBVIEW_ERROR_INVALID_ARGUMENT;
  }
  
#if defined(_WIN32)
  return api_filter([=]() -> webview::noresult {
    HWND hwnd = (HWND)webview_get_window(w);
    if (hwnd) {
      HICON hIcon = (HICON)LoadImageA(NULL, icon_path, IMAGE_ICON, 0, 0, LR_LOADFROMFILE | LR_DEFAULTSIZE);
      if (hIcon) {
        SendMessage(hwnd, WM_SETICON, ICON_SMALL, (LPARAM)hIcon);
        SendMessage(hwnd, WM_SETICON, ICON_BIG, (LPARAM)hIcon);
      }
    }
    return {};
  });
#elif defined(__APPLE__)
  // macOS: Set app icon (using Objective-C runtime)
  return api_filter([=]() -> webview::noresult {
    typedef id (*msgSend_t)(id, SEL);
    typedef id (*msgSend_id_t)(id, SEL, const char*);
    typedef id (*msgSend_id_id_t)(id, SEL, id);
    typedef void (*msgSend_void_id_t)(id, SEL, id);
    
    id NSStringClass = (id)objc_getClass("NSString");
    id NSImageClass = (id)objc_getClass("NSImage");
    id NSAppClass = (id)objc_getClass("NSApplication");
    id NSApp = ((msgSend_t)objc_msgSend)(NSAppClass, sel_registerName("sharedApplication"));
    
    id iconPathStr = ((msgSend_id_t)objc_msgSend)(NSStringClass, sel_registerName("stringWithUTF8String:"), icon_path);
    id iconAlloc = ((msgSend_t)objc_msgSend)(NSImageClass, sel_registerName("alloc"));
    id icon = ((msgSend_id_id_t)objc_msgSend)(iconAlloc, sel_registerName("initWithContentsOfFile:"), iconPathStr);
    
    if (icon) {
      ((msgSend_void_id_t)objc_msgSend)(NSApp, sel_registerName("setApplicationIconImage:"), icon);
    }
    return {};
  });
#else
  // Linux/GTK: Icon setting not implemented yet
  return WEBVIEW_ERROR_OK;
#endif
}

WEBVIEW_API webview_error_t webview_set_min_size(webview_t w, int width, int height) {
  using namespace webview::detail;
  
#if defined(_WIN32)
  return api_filter([=]() -> webview::noresult {
    HWND hwnd = (HWND)webview_get_window(w);
    if (hwnd) {
      POINT pt = { width, height };
      g_min_sizes[hwnd] = pt;
      SetWindowSubclass(hwnd, MinSizeWndProc, 0, 0);
    }
    return {};
  });
#elif defined(__APPLE__)
  // macOS: Set minimum window size (using Objective-C runtime)
  return api_filter([=]() -> webview::noresult {
    void* window = webview_get_window(w);
    if (window) {
      typedef void (*setMinSize_t)(id, SEL, CGSize);
      CGSize minSize = CGSizeMake(width, height);
      ((setMinSize_t)objc_msgSend)((id)window, sel_registerName("setMinSize:"), minSize);
    }
    return {};
  });
#else
  // Linux: Min size not implemented yet
  return WEBVIEW_ERROR_OK;
#endif
}

WEBVIEW_API webview_error_t webview_set_frameless(webview_t w, int frameless) {
  using namespace webview::detail;
  
#if defined(_WIN32)
  return api_filter([=]() -> webview::noresult {
    HWND hwnd = (HWND)webview_get_window(w);
    if (hwnd) {
      LONG style = GetWindowLong(hwnd, GWL_STYLE);
      if (frameless) {
        style &= ~(WS_CAPTION | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX | WS_SYSMENU);
      } else {
        style |= (WS_CAPTION | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX | WS_SYSMENU);
      }
      SetWindowLong(hwnd, GWL_STYLE, style);
      SetWindowPos(hwnd, NULL, 0, 0, 0, 0, SWP_FRAMECHANGED | SWP_NOMOVE | SWP_NOSIZE | SWP_NOZORDER);
    }
    return {};
  });
#elif defined(__APPLE__)
  // macOS: Set frameless window (borderless) (using Objective-C runtime)
  return api_filter([=]() -> webview::noresult {
    void* window = webview_get_window(w);
    if (window) {
      typedef void (*setStyleMask_t)(id, SEL, NSUInteger);
      NSUInteger styleMask;
      if (frameless) {
        // Borderless: NSWindowStyleMaskBorderless (0) | NSWindowStyleMaskResizable (8)
        styleMask = 0 | 8;
      } else {
        // Standard: Titled (1) | Closable (2) | Miniaturizable (4) | Resizable (8)
        styleMask = 1 | 2 | 4 | 8;
      }
      ((setStyleMask_t)objc_msgSend)((id)window, sel_registerName("setStyleMask:"), styleMask);
    }
    return {};
  });
#else
  return WEBVIEW_ERROR_OK;
#endif
}

WEBVIEW_API webview_error_t webview_toggle_fullscreen(webview_t w) {
  using namespace webview::detail;
  
#if defined(_WIN32)
  return api_filter([=]() -> webview::noresult {
    static WINDOWPLACEMENT wp = { sizeof(wp) };
    HWND hwnd = (HWND)webview_get_window(w);
    if (hwnd) {
      LONG style = GetWindowLong(hwnd, GWL_STYLE);
      if (style & WS_OVERLAPPEDWINDOW) {
        MONITORINFO mi = { sizeof(mi) };
        if (GetWindowPlacement(hwnd, &wp) && GetMonitorInfo(MonitorFromWindow(hwnd, MONITOR_DEFAULTTOPRIMARY), &mi)) {
          SetWindowLong(hwnd, GWL_STYLE, style & ~WS_OVERLAPPEDWINDOW);
          SetWindowPos(hwnd, HWND_TOP,
            mi.rcMonitor.left, mi.rcMonitor.top,
            mi.rcMonitor.right - mi.rcMonitor.left,
            mi.rcMonitor.bottom - mi.rcMonitor.top,
            SWP_NOOWNERZORDER | SWP_FRAMECHANGED);
        }
      } else {
        SetWindowLong(hwnd, GWL_STYLE, style | WS_OVERLAPPEDWINDOW);
        SetWindowPlacement(hwnd, &wp);
        SetWindowPos(hwnd, NULL, 0, 0, 0, 0,
          SWP_NOMOVE | SWP_NOSIZE | SWP_NOZORDER | SWP_NOOWNERZORDER | SWP_FRAMECHANGED);
      }
    }
    return {};
  });
#elif defined(__APPLE__)
  // macOS: Toggle fullscreen (using Objective-C runtime)
  return api_filter([=]() -> webview::noresult {
    void* window = webview_get_window(w);
    if (window) {
      typedef void (*toggleFullScreen_t)(id, SEL, id);
      ((toggleFullScreen_t)objc_msgSend)((id)window, sel_registerName("toggleFullScreen:"), nil);
    }
    return {};
  });
#else
  return WEBVIEW_ERROR_OK;
#endif
}

WEBVIEW_API webview_error_t webview_set_always_on_top(webview_t w, int always_on_top) {
  using namespace webview::detail;
  
#if defined(_WIN32)
  return api_filter([=]() -> webview::noresult {
    HWND hwnd = (HWND)webview_get_window(w);
    if (hwnd) {
      SetWindowPos(hwnd, always_on_top ? HWND_TOPMOST : HWND_NOTOPMOST,
        0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE);
    }
    return {};
  });
#elif defined(__APPLE__)
  // macOS: Set window level (always on top) (using Objective-C runtime)
  return api_filter([=]() -> webview::noresult {
    void* window = webview_get_window(w);
    if (window) {
      typedef void (*setLevel_t)(id, SEL, NSInteger);
      NSInteger level = always_on_top ? 3 : 0; // NSFloatingWindowLevel=3, NSNormalWindowLevel=0
      ((setLevel_t)objc_msgSend)((id)window, sel_registerName("setLevel:"), level);
    }
    return {};
  });
#else
  return WEBVIEW_ERROR_OK;
#endif
}

WEBVIEW_API webview_error_t webview_set_performance_mode(webview_t w, int enable) {
  using namespace webview::detail;
  
#if defined(_WIN32)
  // 🚀 Windows: Enable hardware acceleration and performance optimizations
  return api_filter([=]() -> webview::noresult {
    HWND hwnd = (HWND)webview_get_window(w);
    if (hwnd && enable) {
      // Enable DWM composition for better performance
      BOOL value = TRUE;
      DwmSetWindowAttribute(hwnd, DWMWA_NCRENDERING_POLICY, &value, sizeof(value));
      
      // Disable visual effects for better performance
      value = FALSE;
      DwmSetWindowAttribute(hwnd, DWMWA_TRANSITIONS_FORCEDISABLED, &value, sizeof(value));
      
      // Enable GPU acceleration hint
      SetWindowLongPtr(hwnd, GWL_EXSTYLE, 
        GetWindowLongPtr(hwnd, GWL_EXSTYLE) | WS_EX_COMPOSITED);
      
      // Set process priority for better responsiveness
      SetPriorityClass(GetCurrentProcess(), HIGH_PRIORITY_CLASS);
    }
    return {};
  });
#elif defined(__APPLE__)
  // 🚀 macOS: Performance optimizations
  return api_filter([=]() -> webview::noresult {
    if (!enable) return {};
    
    // Get native handles
    void* native_widget = webview_get_native_handle(w, WEBVIEW_NATIVE_HANDLE_KIND_UI_WIDGET);
    void* native_window = webview_get_native_handle(w, WEBVIEW_NATIVE_HANDLE_KIND_UI_WINDOW);
    
    if (native_widget && native_window) {
      // Enable layer-backed view for better compositing performance
      // NSView.wantsLayer = YES
      typedef void (*setWantsLayer_t)(id, SEL, BOOL);
      ((setWantsLayer_t)objc_msgSend)((id)native_widget, sel_registerName("setWantsLayer:"), YES);
      
      // Optimize window backing store - use video memory for better performance
      // NSWindow.preferredBackingLocation = NSWindowBackingLocationVideoMemory (1)
      typedef void (*setPreferredBackingLocation_t)(id, SEL, long);
      ((setPreferredBackingLocation_t)objc_msgSend)((id)native_window, sel_registerName("setPreferredBackingLocation:"), 1L);
      
      // Enable asynchronous drawing for the layer
      typedef id (*layer_t)(id, SEL);
      id layer = ((layer_t)objc_msgSend)((id)native_widget, sel_registerName("layer"));
      if (layer) {
        typedef void (*setDrawsAsynchronously_t)(id, SEL, BOOL);
        ((setDrawsAsynchronously_t)objc_msgSend)(layer, sel_registerName("setDrawsAsynchronously:"), YES);
      }
    }
    return {};
  });
#else
  // 🚀 Linux/GTK: Performance optimizations
  return api_filter([=]() -> webview::noresult {
    if (!enable) return {};
    
    // Get GTK widget
    void* gtk_widget = webview_get_window(w);
    if (!gtk_widget) return {};
    
    // Enable hardware acceleration (WebKitGTK)
    // These would need proper GTK/WebKit API calls
    // gtk_widget_set_double_buffered(widget, TRUE);
    // webkit_settings_set_hardware_acceleration_policy(settings, WEBKIT_HARDWARE_ACCELERATION_POLICY_ALWAYS);
    
    return {};
  });
#endif
}

#endif // defined(__cplusplus) && !defined(WEBVIEW_HEADER)
#endif // WEBVIEW_C_API_IMPL_HH
