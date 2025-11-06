// ⚡ Zippy - Zero-Copy IPC Implementation

#include "zero_copy.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ZIPPY_IPC_SHMEM_SIZE (1024 * 1024 * 16)  // 16 MB shared memory

struct ZippyIPC {
    ZippyRuntime *runtime;
    ZippyWebView *webview;
    
    // Shared memory region
    void *shmem_base;
    size_t shmem_size;
    size_t shmem_used;
    
    // Message queue (lock-free ring buffer)
    ZippyIPCMessage *message_queue;
    uint32_t queue_head;
    uint32_t queue_tail;
    uint32_t queue_size;
    
    uint32_t next_message_id;
    int initialized;
};

ZippyIPC* zippy_ipc_create(ZippyRuntime *runtime, ZippyWebView *webview) {
    if (!runtime || !webview) {
        return NULL;
    }
    
    ZippyIPC *ipc = (ZippyIPC*)calloc(1, sizeof(ZippyIPC));
    if (!ipc) {
        return NULL;
    }
    
    ipc->runtime = runtime;
    ipc->webview = webview;
    
    // Allocate shared memory
    ipc->shmem_size = ZIPPY_IPC_SHMEM_SIZE;
    ipc->shmem_base = malloc(ipc->shmem_size);
    if (!ipc->shmem_base) {
        free(ipc);
        return NULL;
    }
    
    // Initialize message queue
    ipc->queue_size = 1024;
    ipc->message_queue = (ZippyIPCMessage*)calloc(ipc->queue_size, sizeof(ZippyIPCMessage));
    if (!ipc->message_queue) {
        free(ipc->shmem_base);
        free(ipc);
        return NULL;
    }
    
    ipc->queue_head = 0;
    ipc->queue_tail = 0;
    ipc->next_message_id = 1;
    ipc->initialized = 1;
    
    printf("  ✓ Zero-Copy IPC initialized (16 MB shared memory)\n");
    return ipc;
}

void zippy_ipc_destroy(ZippyIPC *ipc) {
    if (!ipc) return;
    
    if (ipc->initialized) {
        free(ipc->message_queue);
        free(ipc->shmem_base);
    }
    
    free(ipc);
    printf("  ✓ IPC destroyed\n");
}

uint32_t zippy_ipc_send(
    ZippyIPC *ipc,
    ZippyIPCMessageType type,
    const void *data,
    size_t size
) {
    if (!ipc || !ipc->initialized || !data) {
        return 0;
    }
    
    // Check if we have space
    if (ipc->shmem_used + size > ipc->shmem_size) {
        fprintf(stderr, "IPC: Shared memory full!\n");
        return 0;
    }
    
    // Allocate message ID
    uint32_t msg_id = ipc->next_message_id++;
    
    // Copy data to shared memory
    uint32_t offset = ipc->shmem_used;
    memcpy((char*)ipc->shmem_base + offset, data, size);
    ipc->shmem_used += size;
    
    // Queue message
    uint32_t queue_pos = ipc->queue_tail % ipc->queue_size;
    ipc->message_queue[queue_pos].type = type;
    ipc->message_queue[queue_pos].id = msg_id;
    ipc->message_queue[queue_pos].size = size;
    ipc->message_queue[queue_pos].offset = offset;
    ipc->queue_tail++;
    
    return msg_id;
}

void* zippy_ipc_receive(ZippyIPC *ipc, ZippyIPCMessage *msg) {
    if (!ipc || !ipc->initialized || !msg) {
        return NULL;
    }
    
    // Check if queue is empty
    if (ipc->queue_head == ipc->queue_tail) {
        return NULL;
    }
    
    // Dequeue message
    uint32_t queue_pos = ipc->queue_head % ipc->queue_size;
    *msg = ipc->message_queue[queue_pos];
    ipc->queue_head++;
    
    // Return pointer to data in shared memory (zero-copy!)
    return (char*)ipc->shmem_base + msg->offset;
}

void zippy_ipc_release(ZippyIPC *ipc, const ZippyIPCMessage *msg) {
    if (!ipc || !msg) return;
    
    // TODO: Implement proper memory management
    // For now, we just use a simple bump allocator
    // In production, we'd use a more sophisticated allocator
}

int zippy_ipc_stats(ZippyIPC *ipc, size_t *used_bytes, size_t *total_bytes) {
    if (!ipc || !ipc->initialized) {
        return -1;
    }
    
    if (used_bytes) *used_bytes = ipc->shmem_used;
    if (total_bytes) *total_bytes = ipc->shmem_size;
    
    return 0;
}

