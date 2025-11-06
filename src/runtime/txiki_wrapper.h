// ⚡ Zippy - txiki.js Runtime Wrapper
// Provides high-level API for txiki.js integration

#ifndef ZIPPY_TXIKI_WRAPPER_H
#define ZIPPY_TXIKI_WRAPPER_H

#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

// Opaque runtime handle
typedef struct ZippyRuntime ZippyRuntime;

/**
 * Initialize the Zippy runtime (txiki.js + QuickJS)
 * 
 * @return Runtime handle or NULL on failure
 */
ZippyRuntime* zippy_runtime_init(void);

/**
 * Destroy the runtime and free all resources
 * 
 * @param runtime Runtime handle
 */
void zippy_runtime_destroy(ZippyRuntime *runtime);

/**
 * Evaluate JavaScript code
 * 
 * @param runtime Runtime handle
 * @param code JavaScript code to execute
 * @param len Length of code
 * @return 0 on success, -1 on error
 */
int zippy_runtime_eval(ZippyRuntime *runtime, const char *code, size_t len);

/**
 * Run the event loop
 * 
 * @param runtime Runtime handle
 * @return Exit code
 */
int zippy_runtime_run(ZippyRuntime *runtime);

/**
 * Get the QuickJS context (for advanced usage)
 * 
 * @param runtime Runtime handle
 * @return JSContext pointer
 */
void* zippy_runtime_get_context(ZippyRuntime *runtime);

/**
 * Register a native function callable from JavaScript
 * 
 * @param runtime Runtime handle
 * @param name Function name
 * @param func Function pointer
 * @return 0 on success, -1 on error
 */
int zippy_runtime_register_function(
    ZippyRuntime *runtime,
    const char *name,
    void (*func)(void)
);

#ifdef __cplusplus
}
#endif

#endif // ZIPPY_TXIKI_WRAPPER_H

