/**
 * 🎮 Bakery Steamworks Implementation
 * Native Steamworks SDK wrapper implementation
 */

#include "bakery-steamworks.h"

// Include Steam API headers
#include "../deps/steamworks/sdk/public/steam/steam_api.h"

#include <iostream>

// Platform-specific includes for sleep
#ifdef _WIN32
#include <windows.h>
#else
#include <unistd.h>  // for usleep
#endif

#include <fstream>  // for file logging

namespace bakery {
namespace steamworks {

// Static initialization
bool SteamworksManager::s_initialized = false;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Core API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bool SteamworksManager::Init() {
    if (s_initialized) {
        return true; // Already initialized
    }
    
    // Initialize Steam API
    // This will look for steam_appid.txt in the current directory
    // or use the app ID from the Steam client if running through Steam
    if (SteamAPI_Init()) {
        s_initialized = true;
        
        #ifndef NDEBUG
        std::cout << "🎮 Steamworks initialized successfully!" << std::endl;
        std::cout << "   Steam ID: " << GetSteamID() << std::endl;
        std::cout << "   User: " << GetPersonaName() << std::endl;
        std::cout << "   App ID: " << GetAppID() << std::endl;
        #endif
        
        // Request friends list to be downloaded
        ISteamFriends* steamFriends = SteamFriends();
        if (steamFriends) {
            int friendCount = steamFriends->GetFriendCount(k_EFriendFlagAll);
            
            #ifndef NDEBUG
            std::cout << "   Friends: " << friendCount << " total" << std::endl;
            #endif
        }
        
        return true;
    }
    
    #ifndef NDEBUG
    std::cerr << "❌ Failed to initialize Steamworks!" << std::endl;
    std::cerr << "   Make sure Steam is running and steam_appid.txt exists" << std::endl;
    #endif
    
    return false;
}

void SteamworksManager::Shutdown() {
    if (!s_initialized) return;
    
    SteamAPI_Shutdown();
    s_initialized = false;
    
    #ifndef NDEBUG
    std::cout << "🎮 Steamworks shut down" << std::endl;
    #endif
}

void SteamworksManager::RunCallbacks() {
    if (!s_initialized) return;
    SteamAPI_RunCallbacks();
}

bool SteamworksManager::IsInitialized() {
    return s_initialized;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// User Info
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

uint64_t SteamworksManager::GetSteamID() {
    if (!s_initialized) return 0;
    
    ISteamUser* steamUser = SteamUser();
    if (!steamUser) return 0;
    
    CSteamID steamID = steamUser->GetSteamID();
    return steamID.ConvertToUint64();
}

std::string SteamworksManager::GetPersonaName() {
    if (!s_initialized) return "";
    
    ISteamFriends* steamFriends = SteamFriends();
    if (!steamFriends) return "";
    
    return steamFriends->GetPersonaName();
}

uint32_t SteamworksManager::GetAppID() {
    if (!s_initialized) return 0;
    
    ISteamUtils* steamUtils = SteamUtils();
    if (!steamUtils) return 0;
    
    return steamUtils->GetAppID();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Achievements
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bool SteamworksManager::UnlockAchievement(const std::string& achievementId) {
    if (!s_initialized) return false;
    
    ISteamUserStats* steamUserStats = SteamUserStats();
    if (!steamUserStats) return false;
    
    bool success = steamUserStats->SetAchievement(achievementId.c_str());
    
    #ifndef NDEBUG
    if (success) {
        std::cout << "🏆 Achievement unlocked: " << achievementId << std::endl;
    }
    #endif
    
    return success;
}

bool SteamworksManager::GetAchievement(const std::string& achievementId, bool& achieved) {
    if (!s_initialized) return false;
    
    ISteamUserStats* steamUserStats = SteamUserStats();
    if (!steamUserStats) return false;
    
    return steamUserStats->GetAchievement(achievementId.c_str(), &achieved);
}

bool SteamworksManager::ClearAchievement(const std::string& achievementId) {
    if (!s_initialized) return false;
    
    ISteamUserStats* steamUserStats = SteamUserStats();
    if (!steamUserStats) return false;
    
    return steamUserStats->ClearAchievement(achievementId.c_str());
}

bool SteamworksManager::StoreStats() {
    if (!s_initialized) return false;
    
    ISteamUserStats* steamUserStats = SteamUserStats();
    if (!steamUserStats) return false;
    
    return steamUserStats->StoreStats();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Stats
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bool SteamworksManager::SetStatInt(const std::string& statName, int32_t value) {
    if (!s_initialized) return false;
    
    ISteamUserStats* steamUserStats = SteamUserStats();
    if (!steamUserStats) return false;
    
    return steamUserStats->SetStat(statName.c_str(), value);
}

bool SteamworksManager::GetStatInt(const std::string& statName, int32_t& value) {
    if (!s_initialized) return false;
    
    ISteamUserStats* steamUserStats = SteamUserStats();
    if (!steamUserStats) return false;
    
    return steamUserStats->GetStat(statName.c_str(), &value);
}

bool SteamworksManager::SetStatFloat(const std::string& statName, float value) {
    if (!s_initialized) return false;
    
    ISteamUserStats* steamUserStats = SteamUserStats();
    if (!steamUserStats) return false;
    
    return steamUserStats->SetStat(statName.c_str(), value);
}

bool SteamworksManager::GetStatFloat(const std::string& statName, float& value) {
    if (!s_initialized) return false;
    
    ISteamUserStats* steamUserStats = SteamUserStats();
    if (!steamUserStats) return false;
    
    return steamUserStats->GetStat(statName.c_str(), &value);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Cloud Storage
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bool SteamworksManager::FileWrite(const std::string& fileName, const std::vector<uint8_t>& data) {
    if (!s_initialized) return false;
    
    ISteamRemoteStorage* steamRemoteStorage = SteamRemoteStorage();
    if (!steamRemoteStorage) return false;
    
    return steamRemoteStorage->FileWrite(
        fileName.c_str(),
        data.data(),
        static_cast<int32>(data.size())
    );
}

std::vector<uint8_t> SteamworksManager::FileRead(const std::string& fileName) {
    std::vector<uint8_t> result;
    
    if (!s_initialized) return result;
    
    ISteamRemoteStorage* steamRemoteStorage = SteamRemoteStorage();
    if (!steamRemoteStorage) return result;
    
    // Check if file exists
    if (!steamRemoteStorage->FileExists(fileName.c_str())) {
        return result;
    }
    
    // Get file size
    int32 fileSize = steamRemoteStorage->GetFileSize(fileName.c_str());
    if (fileSize <= 0) return result;
    
    // Read file
    result.resize(fileSize);
    int32 bytesRead = steamRemoteStorage->FileRead(
        fileName.c_str(),
        result.data(),
        fileSize
    );
    
    if (bytesRead != fileSize) {
        result.clear();
    }
    
    return result;
}

bool SteamworksManager::FileDelete(const std::string& fileName) {
    if (!s_initialized) return false;
    
    ISteamRemoteStorage* steamRemoteStorage = SteamRemoteStorage();
    if (!steamRemoteStorage) return false;
    
    return steamRemoteStorage->FileDelete(fileName.c_str());
}

bool SteamworksManager::FileExists(const std::string& fileName) {
    if (!s_initialized) return false;
    
    ISteamRemoteStorage* steamRemoteStorage = SteamRemoteStorage();
    if (!steamRemoteStorage) return false;
    
    return steamRemoteStorage->FileExists(fileName.c_str());
}

int32_t SteamworksManager::FileGetSize(const std::string& fileName) {
    if (!s_initialized) return 0;
    
    ISteamRemoteStorage* steamRemoteStorage = SteamRemoteStorage();
    if (!steamRemoteStorage) return 0;
    
    return steamRemoteStorage->GetFileSize(fileName.c_str());
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Rich Presence
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bool SteamworksManager::SetRichPresence(const std::string& key, const std::string& value) {
    if (!s_initialized) return false;
    
    ISteamFriends* steamFriends = SteamFriends();
    if (!steamFriends) return false;
    
    return steamFriends->SetRichPresence(key.c_str(), value.c_str());
}

bool SteamworksManager::ClearRichPresence() {
    if (!s_initialized) return false;
    
    ISteamFriends* steamFriends = SteamFriends();
    if (!steamFriends) return false;
    
    steamFriends->ClearRichPresence();
    return true;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Overlay
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bool SteamworksManager::IsOverlayEnabled() {
    if (!s_initialized) return false;
    
    ISteamUtils* steamUtils = SteamUtils();
    if (!steamUtils) return false;
    
    return steamUtils->IsOverlayEnabled();
}

void SteamworksManager::ActivateOverlay(const std::string& dialog) {
    if (!s_initialized) return;
    
    ISteamFriends* steamFriends = SteamFriends();
    if (!steamFriends) return;
    
    steamFriends->ActivateGameOverlay(dialog.c_str());
}

void SteamworksManager::ActivateOverlayToWebPage(const std::string& url) {
    if (!s_initialized) return;
    
    ISteamFriends* steamFriends = SteamFriends();
    if (!steamFriends) return;
    
    steamFriends->ActivateGameOverlayToWebPage(url.c_str());
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DLC (Downloadable Content)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bool SteamworksManager::IsDlcInstalled(uint32_t appId) {
    if (!s_initialized) return false;
    
    ISteamApps* steamApps = SteamApps();
    if (!steamApps) return false;
    
    return steamApps->BIsDlcInstalled(appId);
}

int32_t SteamworksManager::GetDLCCount() {
    if (!s_initialized) return 0;
    
    ISteamApps* steamApps = SteamApps();
    if (!steamApps) return 0;
    
    return steamApps->GetDLCCount();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Friends
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

int32_t SteamworksManager::GetFriendCount() {
    if (!s_initialized) return 0;
    
    ISteamFriends* steamFriends = SteamFriends();
    if (!steamFriends) return 0;
    
    // Use k_EFriendFlagAll to get all friends, not just immediate/recent
    return steamFriends->GetFriendCount(k_EFriendFlagAll);
}

std::string SteamworksManager::GetFriendPersonaName(int32_t friendIndex) {
    // Log to file for debugging
    std::ofstream logFile("/tmp/steam_friends_debug.log", std::ios::app);
    logFile << "[STEAM] GetFriendPersonaName(" << friendIndex << ") called" << std::endl;
    
    if (!s_initialized) {
        std::cerr << "[STEAM] GetFriendPersonaName: Not initialized" << std::endl;
        logFile << "[STEAM]   ERROR: Not initialized!" << std::endl;
        logFile.close();
        return "";
    }
    
    ISteamFriends* steamFriends = SteamFriends();
    if (!steamFriends) {
        std::cerr << "[STEAM] GetFriendPersonaName: SteamFriends is null" << std::endl;
        logFile << "[STEAM]   ERROR: SteamFriends is null!" << std::endl;
        logFile.close();
        return "";
    }
    
    // Use k_EFriendFlagAll to match GetFriendCount()
    CSteamID friendID = steamFriends->GetFriendByIndex(friendIndex, k_EFriendFlagAll);
    
    std::cout << "[STEAM] GetFriendPersonaName(" << friendIndex << "): friendID valid = " << friendID.IsValid() << std::endl;
    logFile << "[STEAM]   friendID valid = " << friendID.IsValid() << std::endl;
    if (friendID.IsValid()) {
        std::cout << "[STEAM]   friendID = " << friendID.ConvertToUint64() << std::endl;
        logFile << "[STEAM]   friendID = " << friendID.ConvertToUint64() << std::endl;
    }
    
    if (!friendID.IsValid()) {
        std::cerr << "[STEAM]   ERROR: Invalid friend ID!" << std::endl;
        logFile << "[STEAM]   ERROR: Invalid friend ID!" << std::endl;
        logFile.close();
        return "";
    }
    
    // Get friend name (may be empty if not yet loaded by Steam)
    const char* name = steamFriends->GetFriendPersonaName(friendID);
    logFile << "[STEAM]   Name = " << (name ? name : "NULL") << std::endl;
    
    // If name is empty, request it (but don't wait - let the background thread handle it)
    if (!name || strlen(name) == 0) {
        // Request user information (background thread will process the callback)
        steamFriends->RequestUserInformation(friendID, false);
        logFile << "[STEAM]   Requested user information (will be available on next call)" << std::endl;
    }
    
    std::cout << "[STEAM]   Final name = " << (name ? name : "NULL") << std::endl;
    logFile << "[STEAM]   Final name = " << (name ? name : "NULL") << std::endl;
    if (!name || strlen(name) == 0) {
        std::cerr << "[STEAM]   ⚠️  WARNING: Name is still empty or NULL!" << std::endl;
        logFile << "[STEAM]   ⚠️  WARNING: Name is still empty or NULL!" << std::endl;
    }
    
    logFile.close();
    return name ? name : "";
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Screenshots
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

void SteamworksManager::TriggerScreenshot() {
    if (!s_initialized) return;
    
    ISteamScreenshots* steamScreenshots = SteamScreenshots();
    if (!steamScreenshots) return;
    
    steamScreenshots->TriggerScreenshot();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// App Info
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

std::string SteamworksManager::GetCurrentGameLanguage() {
    if (!s_initialized) return "english";
    
    ISteamApps* steamApps = SteamApps();
    if (!steamApps) return "english";
    
    return steamApps->GetCurrentGameLanguage();
}

std::string SteamworksManager::GetAvailableGameLanguages() {
    if (!s_initialized) return "";
    
    ISteamApps* steamApps = SteamApps();
    if (!steamApps) return "";
    
    return steamApps->GetAvailableGameLanguages();
}

bool SteamworksManager::IsSteamInBigPictureMode() {
    if (!s_initialized) return false;
    
    ISteamUtils* steamUtils = SteamUtils();
    if (!steamUtils) return false;
    
    return steamUtils->IsSteamInBigPictureMode();
}

bool SteamworksManager::IsSteamDeck() {
    if (!s_initialized) return false;
    
    ISteamUtils* steamUtils = SteamUtils();
    if (!steamUtils) return false;
    
    return steamUtils->IsSteamRunningOnSteamDeck();
}

} // namespace steamworks
} // namespace bakery



