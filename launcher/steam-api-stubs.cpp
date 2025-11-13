/**
 * Steam API Stubs for Linux Cross-Compilation
 * These weak symbols allow linking without libsteam_api.so
 * At runtime, if the real library is available, it will be used instead
 */

#ifdef __linux__

#include <cstdint>

// Weak symbol stubs - will be overridden by real Steam API if available
extern "C" {
    __attribute__((weak)) bool SteamAPI_Init() { return false; }
    __attribute__((weak)) void SteamAPI_Shutdown() {}
    __attribute__((weak)) void SteamAPI_RunCallbacks() {}
    __attribute__((weak)) int SteamAPI_GetHSteamUser() { return 0; }
    __attribute__((weak)) void* SteamInternal_FindOrCreateUserInterface(int, const char*) { return nullptr; }
    __attribute__((weak)) bool SteamInternal_SteamAPI_Init(const char*, void*) { return false; }
    __attribute__((weak)) void* SteamInternal_ContextInit(void*) { return nullptr; }
}

#endif // __linux__

