/**
 * 🎮 Bakery Steamworks Integration
 * Native Steamworks SDK wrapper for Bakery games
 * 
 * Pattern: Similar to webview-bun FFI bindings
 * - C++ wrapper around Steam API
 * - Exposed via WebView bindings
 * - No Node.js required!
 */

#ifndef BAKERY_STEAMWORKS_H
#define BAKERY_STEAMWORKS_H

#include <string>
#include <vector>
#include <cstdint>

// Forward declare Steam API types
// Note: We include the actual Steam headers in the .cpp file
class CSteamID;
typedef uint32_t AppId_t;

namespace bakery {
namespace steamworks {

/**
 * Steamworks Manager - Singleton wrapper around Steam API
 * Handles initialization, callbacks, and all Steam features
 */
class SteamworksManager {
public:
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Core API
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Initialize Steamworks API
     * Must be called before any other Steam functions
     * Returns: true if successful, false otherwise
     */
    static bool Init();
    
    /**
     * Shutdown Steamworks API
     * Call before app exits
     */
    static void Shutdown();
    
    /**
     * Run Steam callbacks
     * Must be called regularly (e.g. every frame or via timer)
     * This processes achievements, stats updates, etc.
     */
    static void RunCallbacks();
    
    /**
     * Check if Steamworks is initialized
     */
    static bool IsInitialized();
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // User Info
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Get current user's Steam ID
     */
    static uint64_t GetSteamID();
    
    /**
     * Get current user's persona name (display name)
     */
    static std::string GetPersonaName();
    
    /**
     * Get current app ID
     */
    static uint32_t GetAppID();
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Achievements
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Unlock an achievement
     * Returns: true if successful
     */
    static bool UnlockAchievement(const std::string& achievementId);
    
    /**
     * Check if achievement is unlocked
     * Returns: true if unlocked, false otherwise
     */
    static bool GetAchievement(const std::string& achievementId, bool& achieved);
    
    /**
     * Clear (reset) an achievement (for testing)
     * Returns: true if successful
     */
    static bool ClearAchievement(const std::string& achievementId);
    
    /**
     * Store stats and achievements
     * Must be called after setting stats/achievements to persist them
     * Returns: true if successful
     */
    static bool StoreStats();
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Stats
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Set integer stat
     */
    static bool SetStatInt(const std::string& statName, int32_t value);
    
    /**
     * Get integer stat
     */
    static bool GetStatInt(const std::string& statName, int32_t& value);
    
    /**
     * Set float stat
     */
    static bool SetStatFloat(const std::string& statName, float value);
    
    /**
     * Get float stat
     */
    static bool GetStatFloat(const std::string& statName, float& value);
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Cloud Storage (Steam Cloud)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Write file to Steam Cloud
     */
    static bool FileWrite(const std::string& fileName, const std::vector<uint8_t>& data);
    
    /**
     * Read file from Steam Cloud
     */
    static std::vector<uint8_t> FileRead(const std::string& fileName);
    
    /**
     * Delete file from Steam Cloud
     */
    static bool FileDelete(const std::string& fileName);
    
    /**
     * Check if file exists in Steam Cloud
     */
    static bool FileExists(const std::string& fileName);
    
    /**
     * Get file size in Steam Cloud
     */
    static int32_t FileGetSize(const std::string& fileName);
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Rich Presence
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Set rich presence key-value pair
     * Example: SetRichPresence("status", "In Menu")
     */
    static bool SetRichPresence(const std::string& key, const std::string& value);
    
    /**
     * Clear all rich presence data
     */
    static bool ClearRichPresence();
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Overlay
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Check if Steam Overlay is enabled
     */
    static bool IsOverlayEnabled();
    
    /**
     * Activate Steam Overlay to a specific dialog
     * dialog: "Friends", "Community", "Players", "Settings", "OfficialGameGroup", "Stats", "Achievements"
     */
    static void ActivateOverlay(const std::string& dialog);
    
    /**
     * Activate Steam Overlay to a web page
     */
    static void ActivateOverlayToWebPage(const std::string& url);
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DLC (Downloadable Content)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Check if user owns a specific DLC
     * @param appId - DLC App ID
     * @returns true if user owns the DLC
     */
    static bool IsDlcInstalled(uint32_t appId);
    
    /**
     * Get number of DLCs for current app
     */
    static int32_t GetDLCCount();
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Friends
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Get number of friends
     */
    static int32_t GetFriendCount();
    
    /**
     * Get friend's persona name by index
     */
    static std::string GetFriendPersonaName(int32_t friendIndex);
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Screenshots
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Trigger screenshot (opens Steam screenshot dialog)
     */
    static void TriggerScreenshot();
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // App Info
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    /**
     * Get current game language (e.g. "english", "german")
     */
    static std::string GetCurrentGameLanguage();
    
    /**
     * Get available game languages
     */
    static std::string GetAvailableGameLanguages();
    
    /**
     * Check if Steam is running in Big Picture mode
     */
    static bool IsSteamInBigPictureMode();
    
    /**
     * Check if Steam Deck
     */
    static bool IsSteamDeck();

private:
    static bool s_initialized;
};

} // namespace steamworks
} // namespace bakery

#endif // BAKERY_STEAMWORKS_H

