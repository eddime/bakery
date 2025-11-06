// ⚡ Zippy - Zero-Copy IPC
// High-performance inter-process communication using shared memory

#ifndef ZIPPY_ZERO_COPY_H
#define ZIPPY_ZERO_COPY_H

#include <stddef.h>
#include <stdint.h>
#include "../runtime/txiki_wrapper.h"
#include "../webview/webview_ffi.h"

#ifdef __cplusplus
extern "C" {
#endif

// Opaque IPC handle
typedef struct ZippyIPC ZippyIPC;

// IPC message types
typedef enum {
    ZIPPY_IPC_CALL,      // Function call from frontend
    ZIPPY_IPC_RETURN,    // Return value to frontend
    ZIPPY_IPC_EVENT,     // Event from backend
    ZIPPY_IPC_STREAM,    // Streaming data
} ZippyIPCMessageType;

// IPC message header
typedef struct {
    uint32_t type;       // Message type
    uint32_t id;         // Message ID (for matching calls/returns)
    uint32_t size;       // Payload size
    uint32_t offset;     // Offset in shared memory
} ZippyIPCMessage;

/**
 * Create IPC channel between runtime and webview
 * 
 * @param runtime Runtime handle
 * @param webview WebView handle
 * @return IPC handle or NULL on failure
 */
ZippyIPC* zippy_ipc_create(ZippyRuntime *runtime, ZippyWebView *webview);

/**
 * Destroy IPC channel
 * 
 * @param ipc IPC handle
 */
void zippy_ipc_destroy(ZippyIPC *ipc);

/**
 * Send message from backend to frontend (zero-copy)
 * 
 * @param ipc IPC handle
 * @param type Message type
 * @param data Data pointer (will be copied to shared memory)
 * @param size Data size
 * @return Message ID or 0 on error
 */
uint32_t zippy_ipc_send(
    ZippyIPC *ipc,
    ZippyIPCMessageType type,
    const void *data,
    size_t size
);

/**
 * Receive message from frontend (zero-copy, returns pointer to shared memory)
 * 
 * @param ipc IPC handle
 * @param msg Pointer to receive message header
 * @return Pointer to message data in shared memory, or NULL if no message
 */
void* zippy_ipc_receive(ZippyIPC *ipc, ZippyIPCMessage *msg);

/**
 * Release message buffer (allows reuse)
 * 
 * @param ipc IPC handle
 * @param msg Message to release
 */
void zippy_ipc_release(ZippyIPC *ipc, const ZippyIPCMessage *msg);

/**
 * Get shared memory statistics
 * 
 * @param ipc IPC handle
 * @param used_bytes Output: bytes currently used
 * @param total_bytes Output: total shared memory size
 * @return 0 on success, -1 on error
 */
int zippy_ipc_stats(ZippyIPC *ipc, size_t *used_bytes, size_t *total_bytes);

#ifdef __cplusplus
}
#endif

#endif // ZIPPY_ZERO_COPY_H

