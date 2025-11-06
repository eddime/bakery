// ⚡ Zippy Framework - Main Entry Point
// Small, Fast, Powerful Desktop Apps

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "runtime/txiki_wrapper.h"
#include "webview/webview_ffi.h"
#include "ipc/zero_copy.h"

// Embedded user code (injected during build)
extern const unsigned char __zippy_user_code[];
extern const unsigned int __zippy_user_code_len;
extern const unsigned char __zippy_assets[];
extern const unsigned int __zippy_assets_len;

// Forward declarations
static void print_banner(void);
static int extract_embedded_data(void);

int main(int argc, char **argv) {
    print_banner();
    
    // 1. Extract embedded data (user code + assets)
    if (extract_embedded_data() != 0) {
        fprintf(stderr, "❌ Failed to extract embedded data\n");
        return 1;
    }
    
    // 2. Initialize txiki.js runtime
    printf("⚡ Initializing txiki.js runtime...\n");
    ZippyRuntime *runtime = zippy_runtime_init();
    if (!runtime) {
        fprintf(stderr, "❌ Failed to initialize runtime\n");
        return 1;
    }
    
    // 3. Initialize WebView
    printf("🌐 Initializing WebView...\n");
    ZippyWebView *webview = zippy_webview_create(runtime);
    if (!webview) {
        fprintf(stderr, "❌ Failed to create WebView\n");
        zippy_runtime_destroy(runtime);
        return 1;
    }
    
    // 4. Setup Zero-Copy IPC
    printf("🔗 Setting up Zero-Copy IPC...\n");
    ZippyIPC *ipc = zippy_ipc_create(runtime, webview);
    if (!ipc) {
        fprintf(stderr, "❌ Failed to setup IPC\n");
        zippy_webview_destroy(webview);
        zippy_runtime_destroy(runtime);
        return 1;
    }
    
    // 5. Load user code
    printf("📦 Loading user code...\n");
    if (zippy_runtime_eval(runtime, (const char*)__zippy_user_code, __zippy_user_code_len) != 0) {
        fprintf(stderr, "❌ Failed to execute user code\n");
        zippy_ipc_destroy(ipc);
        zippy_webview_destroy(webview);
        zippy_runtime_destroy(runtime);
        return 1;
    }
    
    // 6. Run event loop
    printf("✅ Zippy is ready! Starting event loop...\n");
    int result = zippy_runtime_run(runtime);
    
    // 7. Cleanup
    zippy_ipc_destroy(ipc);
    zippy_webview_destroy(webview);
    zippy_runtime_destroy(runtime);
    
    return result;
}

static void print_banner(void) {
    printf("\n");
    printf("  ⚡ Zippy Framework v0.1.0\n");
    printf("  Fast · Small · Powerful\n");
    printf("\n");
}

static int extract_embedded_data(void) {
    // In development mode, no embedded data
    if (__zippy_user_code_len == 0) {
        printf("⚠️  Running in development mode (no embedded code)\n");
        return 0;
    }
    
    // TODO: Extract and decompress embedded assets
    printf("📦 Embedded code size: %u bytes\n", __zippy_user_code_len);
    printf("📦 Embedded assets size: %u bytes\n", __zippy_assets_len);
    
    return 0;
}

// Weak symbols for development (no embedded data yet)
__attribute__((weak)) const unsigned char __zippy_user_code[1] = {0};
__attribute__((weak)) const unsigned int __zippy_user_code_len = 0;
__attribute__((weak)) const unsigned char __zippy_assets[1] = {0};
__attribute__((weak)) const unsigned int __zippy_assets_len = 0;

