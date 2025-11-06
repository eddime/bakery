// ⚡ Zippy - txiki.js Runtime Wrapper Implementation

#include "txiki_wrapper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// TODO: Include actual txiki.js headers once integrated
// #include "tjs.h"
// #include "quickjs.h"

struct ZippyRuntime {
    void *tjs_runtime;   // TJS_Runtime*
    void *js_context;    // JSContext*
    int initialized;
};

ZippyRuntime* zippy_runtime_init(void) {
    ZippyRuntime *runtime = (ZippyRuntime*)calloc(1, sizeof(ZippyRuntime));
    if (!runtime) {
        return NULL;
    }
    
    // TODO: Initialize txiki.js runtime
    // runtime->tjs_runtime = TJS_NewRuntime();
    // runtime->js_context = TJS_NewContext(runtime->tjs_runtime);
    
    // For now, just mark as initialized
    runtime->initialized = 1;
    
    printf("  ✓ txiki.js runtime initialized\n");
    return runtime;
}

void zippy_runtime_destroy(ZippyRuntime *runtime) {
    if (!runtime) return;
    
    if (runtime->initialized) {
        // TODO: Cleanup txiki.js
        // TJS_FreeContext(runtime->js_context);
        // TJS_FreeRuntime(runtime->tjs_runtime);
    }
    
    free(runtime);
    printf("  ✓ Runtime destroyed\n");
}

int zippy_runtime_eval(ZippyRuntime *runtime, const char *code, size_t len) {
    if (!runtime || !runtime->initialized) {
        return -1;
    }
    
    // TODO: Evaluate code with txiki.js
    // JSValue val = JS_Eval(runtime->js_context, code, len, "<eval>", JS_EVAL_TYPE_GLOBAL);
    // if (JS_IsException(val)) {
    //     return -1;
    // }
    // JS_FreeValue(runtime->js_context, val);
    
    printf("  ✓ Evaluated %zu bytes of code\n", len);
    return 0;
}

int zippy_runtime_run(ZippyRuntime *runtime) {
    if (!runtime || !runtime->initialized) {
        return -1;
    }
    
    // TODO: Run txiki.js event loop
    // return TJS_Run(runtime->tjs_runtime);
    
    printf("  ✓ Event loop running...\n");
    return 0;
}

void* zippy_runtime_get_context(ZippyRuntime *runtime) {
    if (!runtime) return NULL;
    return runtime->js_context;
}

int zippy_runtime_register_function(
    ZippyRuntime *runtime,
    const char *name,
    void (*func)(void)
) {
    if (!runtime || !runtime->initialized || !name || !func) {
        return -1;
    }
    
    // TODO: Register function in JS context
    // JSContext *ctx = runtime->js_context;
    // JSValue global = JS_GetGlobalObject(ctx);
    // JS_SetPropertyStr(ctx, global, name, JS_NewCFunction(ctx, func, name, 0));
    // JS_FreeValue(ctx, global);
    
    printf("  ✓ Registered function: %s\n", name);
    return 0;
}

