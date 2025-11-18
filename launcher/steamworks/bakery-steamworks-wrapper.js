/**
 * 🎮 Bakery Steamworks JavaScript Wrapper
 * 
 * This wrapper provides a clean, Promise-based API for Steamworks.
 * Game developers can use this directly without worrying about JSON parsing.
 * 
 * Usage in your game:
 * 
 *   <script src="bakery-steamworks-wrapper.js"></script>
 *   
 *   if (window.Steam.isAvailable()) {
 *     const name = await window.Steam.getPersonaName();
 *     console.log('Hello', name);
 *   }
 */

(function() {
    'use strict';
    
    // Helper to parse Steam API responses
    function parseSteamResponse(value) {
        if (value === null || value === undefined) return value;
        if (typeof value !== 'string') return value;
        
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
    
    // Check if Steamworks is available
    function isAvailable() {
        return window.Bakery && window.Bakery.steam === true;
    }
    
    // Steam API Wrapper
    window.Steam = {
        /**
         * Check if Steamworks is available
         */
        isAvailable: isAvailable,
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // User Info
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Get current user's Steam ID
         * @returns {Promise<string>}
         */
        async getSteamID() {
            if (!isAvailable()) return '0';
            const result = await window.steamGetSteamID();
            return parseSteamResponse(result);
        },
        
        /**
         * Get current user's persona name
         * @returns {Promise<string>}
         */
        async getPersonaName() {
            if (!isAvailable()) return '';
            const result = await window.steamGetPersonaName();
            return parseSteamResponse(result);
        },
        
        /**
         * Get current app ID
         * @returns {Promise<number>}
         */
        async getAppID() {
            if (!isAvailable()) return 0;
            const result = await window.steamGetAppID();
            return parseInt(parseSteamResponse(result));
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Achievements
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Unlock an achievement
         * @param {string} achievementId
         * @returns {Promise<boolean>}
         */
        async unlockAchievement(achievementId) {
            if (!isAvailable()) return false;
            const result = await window.steamUnlockAchievement(achievementId);
            return parseSteamResponse(result) === true;
        },
        
        /**
         * Check if achievement is unlocked
         * @param {string} achievementId
         * @returns {Promise<boolean>}
         */
        async getAchievement(achievementId) {
            if (!isAvailable()) return false;
            const result = await window.steamGetAchievement(achievementId);
            return parseSteamResponse(result) === true;
        },
        
        /**
         * Store stats and achievements
         * @returns {Promise<boolean>}
         */
        async storeStats() {
            if (!isAvailable()) return false;
            const result = await window.steamStoreStats();
            return parseSteamResponse(result) === true;
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Stats
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Set integer stat
         * @param {string} statName
         * @param {number} value
         * @returns {Promise<boolean>}
         */
        async setStatInt(statName, value) {
            if (!isAvailable()) return false;
            const result = await window.steamSetStatInt(statName, value);
            return parseSteamResponse(result) === true;
        },
        
        /**
         * Get integer stat
         * @param {string} statName
         * @returns {Promise<number>}
         */
        async getStatInt(statName) {
            if (!isAvailable()) return 0;
            const result = await window.steamGetStatInt(statName);
            return parseInt(parseSteamResponse(result));
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Cloud Storage
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Write file to Steam Cloud
         * @param {string} fileName
         * @param {string} data
         * @returns {Promise<boolean>}
         */
        async fileWrite(fileName, data) {
            if (!isAvailable()) return false;
            const result = await window.steamFileWrite(fileName, data);
            return parseSteamResponse(result) === true;
        },
        
        /**
         * Read file from Steam Cloud
         * @param {string} fileName
         * @returns {Promise<string>}
         */
        async fileRead(fileName) {
            if (!isAvailable()) return '';
            const result = await window.steamFileRead(fileName);
            return parseSteamResponse(result) || '';
        },
        
        /**
         * Check if file exists in Steam Cloud
         * @param {string} fileName
         * @returns {Promise<boolean>}
         */
        async fileExists(fileName) {
            if (!isAvailable()) return false;
            const result = await window.steamFileExists(fileName);
            return parseSteamResponse(result) === true;
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Rich Presence
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Set rich presence
         * @param {string} key
         * @param {string} value
         * @returns {Promise<boolean>}
         */
        async setRichPresence(key, value) {
            if (!isAvailable()) return false;
            const result = await window.steamSetRichPresence(key, value);
            return parseSteamResponse(result) === true;
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Overlay
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Check if overlay is enabled
         * @returns {Promise<boolean>}
         */
        async isOverlayEnabled() {
            if (!isAvailable()) return false;
            const result = await window.steamIsOverlayEnabled();
            return parseSteamResponse(result) === true;
        },
        
        /**
         * Activate Steam Overlay
         * @param {string} dialog - "Friends", "Community", "Players", "Settings", etc.
         * @returns {Promise<boolean>}
         */
        async activateOverlay(dialog) {
            if (!isAvailable()) return false;
            const result = await window.steamActivateOverlay(dialog);
            return parseSteamResponse(result) === true;
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // DLC
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Check if DLC is installed
         * @param {number} appId
         * @returns {Promise<boolean>}
         */
        async isDlcInstalled(appId) {
            if (!isAvailable()) return false;
            const result = await window.steamIsDlcInstalled(appId);
            return parseSteamResponse(result) === true;
        },
        
        /**
         * Get DLC count
         * @returns {Promise<number>}
         */
        async getDLCCount() {
            if (!isAvailable()) return 0;
            const result = await window.steamGetDLCCount();
            return parseInt(parseSteamResponse(result));
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Friends
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Get friend count
         * @returns {Promise<number>}
         */
        async getFriendCount() {
            if (!isAvailable()) return 0;
            const result = await window.steamGetFriendCount();
            return parseInt(parseSteamResponse(result));
        },
        
        /**
         * Get friend persona name by index
         * @param {number} friendIndex
         * @returns {Promise<string>}
         */
        async getFriendPersonaName(friendIndex) {
            if (!isAvailable()) return '';
            const result = await window.steamGetFriendPersonaName(friendIndex);
            return parseSteamResponse(result) || '';
        },
        
        /**
         * Get all friends (up to max)
         * @param {number} max - Maximum number of friends to return (default: 100)
         * @returns {Promise<string[]>}
         */
        async getFriends(max = 100) {
            if (!isAvailable()) return [];
            
            const count = await this.getFriendCount();
            const friends = [];
            const limit = Math.min(count, max);
            
            for (let i = 0; i < limit; i++) {
                const name = await this.getFriendPersonaName(i);
                if (name) friends.push(name);
            }
            
            return friends;
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Screenshots
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Trigger screenshot
         * @returns {Promise<boolean>}
         */
        async triggerScreenshot() {
            if (!isAvailable()) return false;
            const result = await window.steamTriggerScreenshot();
            return parseSteamResponse(result) === true;
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // App Info
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        
        /**
         * Get current game language
         * @returns {Promise<string>}
         */
        async getCurrentGameLanguage() {
            if (!isAvailable()) return 'english';
            const result = await window.steamGetCurrentGameLanguage();
            return parseSteamResponse(result) || 'english';
        },
        
        /**
         * Get available game languages
         * @returns {Promise<string>}
         */
        async getAvailableGameLanguages() {
            if (!isAvailable()) return '';
            const result = await window.steamGetAvailableGameLanguages();
            return parseSteamResponse(result) || '';
        },
        
        /**
         * Check if Steam is in Big Picture mode
         * @returns {Promise<boolean>}
         */
        async isSteamInBigPictureMode() {
            if (!isAvailable()) return false;
            const result = await window.steamIsSteamInBigPictureMode();
            return parseSteamResponse(result) === true;
        },
        
        /**
         * Check if running on Steam Deck
         * @returns {Promise<boolean>}
         */
        async isSteamDeck() {
            if (!isAvailable()) return false;
            const result = await window.steamIsSteamDeck();
            return parseSteamResponse(result) === true;
        }
    };
    
    // Alias for convenience
    window.Steamworks = window.Steam;
    
})();

