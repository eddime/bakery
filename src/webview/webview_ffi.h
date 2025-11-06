// ⚡ Zippy - WebView FFI Interface
// Native WebView integration with zero-copy IPC

#ifndef BAKERY_WEBVIEW_FFI_H
#define BAKERY_WEBVIEW_FFI_H

#include <stddef.h>
#include <stdint.h>
#include "../runtime/txiki_wrapper.h"

#ifdef __cplusplus
extern "C" {
#endif

// Opaque WebView handle
typedef struct ZippyWebView ZippyWebView;

// WebView configuration
typedef struct {
    const char *title;
    int width;
    int height;
    int resizable;
    int debug;
} ZippyWebViewConfig;

/**
 * Create a new WebView window
 * 
 * @param runtime Associated runtime
 * @return WebView handle or NULL on failure
 */
ZippyWebView* zippy_webview_create(ZippyRuntime *runtime);

/**
 * Create WebView with custom configuration
 * 
 * @param runtime Associated runtime
 * @param config Configuration
 * @return WebView handle or NULL on failure
 */
ZippyWebView* zippy_webview_create_with_config(
    ZippyRuntime *runtime,
    const ZippyWebViewConfig *config
);

/**
 * Destroy WebView
 * 
 * @param webview WebView handle
 */
void zippy_webview_destroy(ZippyWebView *webview);

/**
 * Set HTML content
 * 
 * @param webview WebView handle
 * @param html HTML string
 * @return 0 on success, -1 on error
 */
int zippy_webview_set_html(ZippyWebView *webview, const char *html);

/**
 * Navigate to URL
 * 
 * @param webview WebView handle
 * @param url URL string
 * @return 0 on success, -1 on error
 */
int zippy_webview_navigate(ZippyWebView *webview, const char *url);

/**
 * Execute JavaScript in the WebView
 * 
 * @param webview WebView handle
 * @param js JavaScript code
 * @return 0 on success, -1 on error
 */
int zippy_webview_eval(ZippyWebView *webview, const char *js);

/**
 * Bind a callback function (for IPC)
 * 
 * @param webview WebView handle
 * @param name Function name
 * @param callback Callback function
 * @param arg User data
 * @return 0 on success, -1 on error
 */
int zippy_webview_bind(
    ZippyWebView *webview,
    const char *name,
    void (*callback)(const char *seq, const char *req, void *arg),
    void *arg
);

/**
 * Return result to JavaScript
 * 
 * @param webview WebView handle
 * @param seq Sequence ID
 * @param status Status (0 = success, non-zero = error)
 * @param result Result JSON string
 * @return 0 on success, -1 on error
 */
int zippy_webview_return(
    ZippyWebView *webview,
    const char *seq,
    int status,
    const char *result
);

/**
 * Set window title
 * 
 * @param webview WebView handle
 * @param title New title
 * @return 0 on success, -1 on error
 */
int zippy_webview_set_title(ZippyWebView *webview, const char *title);

/**
 * Set window size
 * 
 * @param webview WebView handle
 * @param width Width in pixels
 * @param height Height in pixels
 * @return 0 on success, -1 on error
 */
int zippy_webview_set_size(ZippyWebView *webview, int width, int height);

#ifdef __cplusplus
}
#endif

#endif // BAKERY_WEBVIEW_FFI_H

