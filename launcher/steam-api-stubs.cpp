/**
 * Steam API Runtime Loading for Linux Cross-Compilation
 * Loads libsteam_api.so at runtime using dlopen()
 * This allows cross-compilation from macOS (musl) while still using glibc-based Steam library
 */

#ifdef __linux__

#include <dlfcn.h>
#include <cstdint>
#include <iostream>

// Function pointer types
typedef bool (*SteamAPI_Init_t)();
typedef void (*SteamAPI_Shutdown_t)();
typedef void (*SteamAPI_RunCallbacks_t)();
typedef int (*SteamAPI_GetHSteamUser_t)();
typedef void* (*SteamInternal_FindOrCreateUserInterface_t)(int, const char*);
typedef int (*SteamInternal_SteamAPI_Init_t)(const char*, void*);
typedef void* (*SteamInternal_ContextInit_t)(void*);

// Global library handle
static void* g_steamLib = nullptr;

// Function pointers
static SteamAPI_Init_t SteamAPI_Init_ptr = nullptr;
static SteamAPI_Shutdown_t SteamAPI_Shutdown_ptr = nullptr;
static SteamAPI_RunCallbacks_t SteamAPI_RunCallbacks_ptr = nullptr;
static SteamAPI_GetHSteamUser_t SteamAPI_GetHSteamUser_ptr = nullptr;
static SteamInternal_FindOrCreateUserInterface_t SteamInternal_FindOrCreateUserInterface_ptr = nullptr;
static SteamInternal_SteamAPI_Init_t SteamInternal_SteamAPI_Init_ptr = nullptr;
static SteamInternal_ContextInit_t SteamInternal_ContextInit_ptr = nullptr;

// Load Steam library at startup
__attribute__((constructor))
static void load_steam_library() {
    // Try multiple paths
    const char* paths[] = {
        "libsteam_api.so",           // LD_LIBRARY_PATH (from /tmp extraction)
        "./libsteam_api.so",         // Current directory
        "/tmp/libsteam_api.so"       // Fallback
    };
    
    for (const char* path : paths) {
        g_steamLib = dlopen(path, RTLD_LAZY | RTLD_GLOBAL);
        if (g_steamLib) {
            std::cout << "✅ Loaded Steam library from: " << path << std::endl;
            break;
        }
    }
    
    if (!g_steamLib) {
        std::cerr << "⚠️  Steam library not found. Steamworks disabled." << std::endl;
        std::cerr << "   Error: " << dlerror() << std::endl;
        return;
    }
    
    // Load all function pointers
    SteamAPI_Init_ptr = (SteamAPI_Init_t)dlsym(g_steamLib, "SteamAPI_Init");
    SteamAPI_Shutdown_ptr = (SteamAPI_Shutdown_t)dlsym(g_steamLib, "SteamAPI_Shutdown");
    SteamAPI_RunCallbacks_ptr = (SteamAPI_RunCallbacks_t)dlsym(g_steamLib, "SteamAPI_RunCallbacks");
    SteamAPI_GetHSteamUser_ptr = (SteamAPI_GetHSteamUser_t)dlsym(g_steamLib, "SteamAPI_GetHSteamUser");
    SteamInternal_FindOrCreateUserInterface_ptr = (SteamInternal_FindOrCreateUserInterface_t)dlsym(g_steamLib, "SteamInternal_FindOrCreateUserInterface");
    SteamInternal_SteamAPI_Init_ptr = (SteamInternal_SteamAPI_Init_t)dlsym(g_steamLib, "SteamInternal_SteamAPI_Init");
    SteamInternal_ContextInit_ptr = (SteamInternal_ContextInit_t)dlsym(g_steamLib, "SteamInternal_ContextInit");
    
    if (SteamAPI_Init_ptr && SteamAPI_Shutdown_ptr && SteamAPI_RunCallbacks_ptr) {
        std::cout << "✅ Steam API functions loaded successfully!" << std::endl;
    } else {
        std::cerr << "⚠️  Failed to load Steam API functions" << std::endl;
    }
}

// Wrapper functions that call through function pointers
extern "C" {
    bool SteamAPI_Init() {
        return SteamAPI_Init_ptr ? SteamAPI_Init_ptr() : false;
    }
    
    void SteamAPI_Shutdown() {
        if (SteamAPI_Shutdown_ptr) SteamAPI_Shutdown_ptr();
    }
    
    void SteamAPI_RunCallbacks() {
        if (SteamAPI_RunCallbacks_ptr) SteamAPI_RunCallbacks_ptr();
    }
    
    int SteamAPI_GetHSteamUser() {
        return SteamAPI_GetHSteamUser_ptr ? SteamAPI_GetHSteamUser_ptr() : 0;
    }
    
    void* SteamInternal_FindOrCreateUserInterface(int a, const char* b) {
        return SteamInternal_FindOrCreateUserInterface_ptr ? SteamInternal_FindOrCreateUserInterface_ptr(a, b) : nullptr;
    }
    
    int SteamInternal_SteamAPI_Init(const char* a, void* b) {
        return SteamInternal_SteamAPI_Init_ptr ? SteamInternal_SteamAPI_Init_ptr(a, b) : 0;
    }
    
    void* SteamInternal_ContextInit(void* a) {
        return SteamInternal_ContextInit_ptr ? SteamInternal_ContextInit_ptr(a) : nullptr;
    }
}

#endif // __linux__

