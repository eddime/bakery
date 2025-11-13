/**
 * 🎮 Bakery Steamworks Bindings
 * Cross-platform Steamworks bindings for all launchers
 * 
 * Usage:
 *   #include "bakery-steamworks-bindings.h"
 *   
 *   bool steamEnabled = bakery::steamworks::initSteamworks(config);
 *   bakery::steamworks::bindSteamworksToWebview(w, steamEnabled);
 */

#ifndef BAKERY_STEAMWORKS_BINDINGS_H
#define BAKERY_STEAMWORKS_BINDINGS_H

#include <string>
#include <fstream>
#include <nlohmann/json.hpp>
#include "bakery-steamworks.h"

#ifdef _WIN32
#include <windows.h>
#include <libloaderapi.h>
#elif __APPLE__
#include <mach-o/dyld.h>
#elif __linux__
#include <unistd.h>
#include <limits.h>
#endif

namespace bakery {
namespace steamworks {

using json = nlohmann::json;

/**
 * Get the directory of the current executable
 */
inline std::string getExecutableDirectory() {
    char exePath[1024];
    
    #ifdef _WIN32
    GetModuleFileNameA(NULL, exePath, sizeof(exePath));
    #elif __APPLE__
    uint32_t size = sizeof(exePath);
    _NSGetExecutablePath(exePath, &size);
    #elif __linux__
    ssize_t len = readlink("/proc/self/exe", exePath, sizeof(exePath) - 1);
    if (len != -1) {
        exePath[len] = '\0';
    }
    #endif
    
    std::string exeDir = std::string(exePath);
    size_t lastSlash = exeDir.find_last_of("/\\");
    if (lastSlash != std::string::npos) {
        exeDir = exeDir.substr(0, lastSlash);
    }
    
    return exeDir;
}

/**
 * Create steam_appid.txt in the executable directory
 */
inline void createSteamAppIdFile(uint32_t appId) {
    std::string exeDir = getExecutableDirectory();
    std::string steamAppIdPath = exeDir + "/steam_appid.txt";
    
    std::ofstream steamAppId(steamAppIdPath);
    if (steamAppId.is_open()) {
        steamAppId << appId;
        steamAppId.close();
        
        #ifndef NDEBUG
        std::cout << "🎮 Created steam_appid.txt at: " << steamAppIdPath << std::endl;
        std::cout << "   App ID: " << appId << std::endl;
        #endif
    }
}

/**
 * Load Steam DLL from TEMP directory (Windows only)
 * The universal launcher extracts the DLL to %TEMP%\bakery_<pid>\steam_api64.dll
 * 
 * Note: The DLL is extracted to disk (like bakery-assets file) because:
 * 1. Windows LoadLibrary requires a file path
 * 2. MemoryLoadLibrary is complex and not needed
 * 3. Steam client provides the runtime dependencies
 * 4. This works exactly like assets: extract to TEMP, load from there
 */
inline bool loadSteamDLL() {
    #ifdef _WIN32
    // On Windows, the DLL is extracted to TEMP by the universal launcher
    // Steam client will provide the runtime dependencies (VCRUNTIME140.dll, etc.)
    // We don't need to explicitly load it - SteamAPI_Init will handle it
    return true;
    #else
    // On macOS/Linux, the DLL/dylib/so is already linked or loaded via dlopen
    return true;
    #endif
}

/**
 * Initialize Steamworks based on config
 * Returns true if Steamworks is enabled and initialized successfully
 */
template<typename ConfigType>
inline bool initSteamworks(const ConfigType& config) {
    // Check if Steamworks is enabled in config
    if (!config.steamworks.enabled) {
        #ifndef NDEBUG
        std::cout << "⚠️  Steamworks: DISABLED (not enabled in config)" << std::endl;
        #endif
        return false;
    }
    
    // On Windows, explicitly load the Steam DLL from TEMP
    // (This may fail if dependencies are missing, but Steam client will provide them)
    loadSteamDLL();
    
    // Create steam_appid.txt if App ID is provided
    if (config.steamworks.appId > 0) {
        createSteamAppIdFile(config.steamworks.appId);
    } else {
        std::cerr << "⚠️  No Steam App ID configured!" << std::endl;
    }
    
    // Initialize Steamworks
    std::cout << "🎮 Initializing Steamworks..." << std::endl;
    bool success = SteamworksManager::Init();
    
    if (success) {
        std::cout << "✅ Steamworks: INITIALIZED" << std::endl;
    } else {
        std::cerr << "❌ Steamworks: FAILED" << std::endl;
        std::cerr << "   → Is Steam client running?" << std::endl;
        std::cerr << "   → Is App ID valid? (" << config.steamworks.appId << ")" << std::endl;
    }
    
    return success;
}

/**
 * Bind all Steamworks functions to the webview
 * This creates JavaScript functions that can be called from the web app
 */
template<typename WebviewType>
inline void bindSteamworksToWebview(WebviewType& w, bool steamEnabled) {
    if (!steamEnabled) return;
    
    // User Info (no parameters)
    // Note: webview expects JSON strings, so we use json::dump()
    w.bind("steamGetSteamID", [](const std::string& req) -> std::string {
        try {
            uint64_t steamID = SteamworksManager::GetSteamID();
            return json(std::to_string(steamID)).dump();
        } catch (...) {
            return json("0").dump();
        }
    });
    
    w.bind("steamGetPersonaName", [](const std::string& req) -> std::string {
        try {
            std::string name = SteamworksManager::GetPersonaName();
            return json(name).dump();
        } catch (...) {
            return json("").dump();
        }
    });
    
    w.bind("steamGetAppID", [](const std::string& req) -> std::string {
        try {
            uint32_t appID = SteamworksManager::GetAppID();
            return json(std::to_string(appID)).dump();
        } catch (...) {
            return json("0").dump();
        }
    });
    
    // Achievements
    w.bind("steamUnlockAchievement", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(false).dump();
            json j = json::parse(req);
            // j[0] is the function name, j[0] is the first actual parameter
            if (!j.is_array() || j.size() < 1) return json(false).dump();
            std::string achievementId = j[0].get<std::string>();
            bool success = SteamworksManager::UnlockAchievement(achievementId);
            return json(success).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    w.bind("steamGetAchievement", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(false).dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 1) return json(false).dump();
            std::string achievementId = j[0].get<std::string>();
            bool achieved = false;
            bool success = SteamworksManager::GetAchievement(achievementId, achieved);
            return json(success && achieved).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    w.bind("steamStoreStats", [](const std::string& req) -> std::string {
        try {
            bool success = SteamworksManager::StoreStats();
            return json(success).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    // Stats
    w.bind("steamSetStatInt", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(false).dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 2) return json(false).dump();
            std::string statName = j[0].get<std::string>();
            int32_t value = j[1].get<int32_t>();
            bool success = SteamworksManager::SetStatInt(statName, value);
            return json(success).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    w.bind("steamGetStatInt", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(0).dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 1) return json(0).dump();
            std::string statName = j[0].get<std::string>();
            int32_t value = 0;
            bool success = SteamworksManager::GetStatInt(statName, value);
            return json(success ? value : 0).dump();
        } catch (...) {
            return json(0).dump();
        }
    });
    
    // Cloud Storage
    w.bind("steamFileWrite", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(false).dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 2) return json(false).dump();
            std::string fileName = j[0].get<std::string>();
            std::string dataStr = j[1].get<std::string>();
            std::vector<uint8_t> data(dataStr.begin(), dataStr.end());
            bool success = SteamworksManager::FileWrite(fileName, data);
            return json(success).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    w.bind("steamFileRead", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json("").dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 1) return json("").dump();
            std::string fileName = j[0].get<std::string>();
            std::vector<uint8_t> data = SteamworksManager::FileRead(fileName);
            std::string result(data.begin(), data.end());
            return json(result).dump();
        } catch (...) {
            return json("").dump();
        }
    });
    
    w.bind("steamFileExists", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(false).dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 1) return json(false).dump();
            std::string fileName = j[0].get<std::string>();
            bool exists = SteamworksManager::FileExists(fileName);
            return json(exists).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    // Rich Presence
    w.bind("steamSetRichPresence", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(false).dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 2) return json(false).dump();
            std::string key = j[0].get<std::string>();
            std::string value = j[1].get<std::string>();
            bool success = SteamworksManager::SetRichPresence(key, value);
            return json(success).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    // Overlay
    w.bind("steamIsOverlayEnabled", [](const std::string& req) -> std::string {
        try {
            bool enabled = SteamworksManager::IsOverlayEnabled();
            return json(enabled).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    w.bind("steamActivateOverlay", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(false).dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 1) return json(false).dump();
            std::string dialog = j[0].get<std::string>();
            SteamworksManager::ActivateOverlay(dialog);
            return json(true).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    // DLC
    w.bind("steamIsDlcInstalled", [](const std::string& req) -> std::string {
        try {
            if (req.empty() || req == "[]") return json(false).dump();
            json j = json::parse(req);
            if (!j.is_array() || j.size() < 1) return json(false).dump();
            uint32_t appId = j[0].get<uint32_t>();
            bool installed = SteamworksManager::IsDlcInstalled(appId);
            return json(installed).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    w.bind("steamGetDLCCount", [](const std::string& req) -> std::string {
        try {
            int32_t count = SteamworksManager::GetDLCCount();
            return json(count).dump();
        } catch (...) {
            return json(0).dump();
        }
    });
    
    // Friends
    w.bind("steamGetFriendCount", [](const std::string& req) -> std::string {
        try {
            int32_t count = SteamworksManager::GetFriendCount();
            return json(count).dump();
        } catch (...) {
            return json(0).dump();
        }
    });
    
    w.bind("steamGetFriendPersonaName", [](const std::string& req) -> std::string {
        // DEBUG: Log to file
        std::ofstream logFile("/tmp/steam_binding_debug.log", std::ios::app);
        logFile << "[BINDING] steamGetFriendPersonaName called with req: " << req << std::endl;
        
        try {
            if (req.empty()) {
                logFile << "[BINDING]   ERROR: req is empty!" << std::endl;
                logFile.close();
                return json("").dump();
            }
            if (req == "[]") {
                logFile << "[BINDING]   ERROR: req is []!" << std::endl;
                logFile.close();
                return json("").dump();
            }
            
            json j = json::parse(req);
            logFile << "[BINDING]   Parsed JSON, size: " << j.size() << std::endl;
            
            if (!j.is_array()) {
                logFile << "[BINDING]   ERROR: Not an array!" << std::endl;
                logFile.close();
                return json("").dump();
            }
            if (j.size() < 1) {
                logFile << "[BINDING]   ERROR: Array size < 1!" << std::endl;
                logFile.close();
                return json("").dump();
            }
            
            // webview sends ONLY the parameters, not the function name!
            // So j[0] is the first parameter (friendIndex), not j[0]!
            int32_t friendIndex = j[0].get<int32_t>();
            logFile << "[BINDING]   Calling GetFriendPersonaName(" << friendIndex << ")" << std::endl;
            logFile.close();
            
            std::string name = SteamworksManager::GetFriendPersonaName(friendIndex);
            return json(name).dump();
        } catch (const std::exception& e) {
            logFile << "[BINDING]   EXCEPTION: " << e.what() << std::endl;
            logFile.close();
            return json("").dump();
        } catch (...) {
            logFile << "[BINDING]   UNKNOWN EXCEPTION!" << std::endl;
            logFile.close();
            return json("").dump();
        }
    });
    
    // Screenshots
    w.bind("steamTriggerScreenshot", [](const std::string& req) -> std::string {
        try {
            SteamworksManager::TriggerScreenshot();
            return json(true).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    // App Info
    w.bind("steamGetCurrentGameLanguage", [](const std::string& req) -> std::string {
        try {
            std::string lang = SteamworksManager::GetCurrentGameLanguage();
            return json(lang).dump();
        } catch (...) {
            return json("english").dump();
        }
    });
    
    w.bind("steamGetAvailableGameLanguages", [](const std::string& req) -> std::string {
        try {
            std::string langs = SteamworksManager::GetAvailableGameLanguages();
            return json(langs).dump();
        } catch (...) {
            return json("").dump();
        }
    });
    
    w.bind("steamIsSteamInBigPictureMode", [](const std::string& req) -> std::string {
        try {
            bool bigPicture = SteamworksManager::IsSteamInBigPictureMode();
            return json(bigPicture).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    w.bind("steamIsSteamDeck", [](const std::string& req) -> std::string {
        try {
            bool isDeck = SteamworksManager::IsSteamDeck();
            return json(isDeck).dump();
        } catch (...) {
            return json(false).dump();
        }
    });
    
    #ifndef NDEBUG
    std::cout << "🎮 Steamworks bindings: READY (accessible via window.Bakery.Steam)" << std::endl;
    #endif
}

/**
 * Run Steamworks callbacks in a background thread
 * Call this after w.run() to keep Steam API updated
 */
inline void runSteamworksCallbacks(std::atomic<bool>& running) {
    while (running) {
        SteamworksManager::RunCallbacks();
        std::this_thread::sleep_for(std::chrono::milliseconds(16)); // ~60 FPS
    }
}

/**
 * Shutdown Steamworks
 * Call this before app exits
 */
inline void shutdownSteamworks() {
    SteamworksManager::Shutdown();
    
    #ifndef NDEBUG
    std::cout << "🎮 Steamworks: Shut down" << std::endl;
    #endif
}

} // namespace steamworks
} // namespace bakery

#endif // BAKERY_STEAMWORKS_BINDINGS_H


