/**
 *  Gemcore Steamworks API
 * JavaScript facade for Steamworks integration
 * 
 * Usage:
 *   import { Steam } from './gemcore-steamworks-api.js';
 *   
 *   if (Steam.isAvailable()) {
 *     Steam.unlockAchievement('FIRST_WIN');
 *     Steam.setRichPresence('status', 'In Menu');
 *   }
 */

/**
 * Check if Steamworks is available
 */
function isAvailable() {
    return window.Gemcore && window.Gemcore.steam === true;
}

/**
 * Get current user's Steam ID
 * @returns {Promise<string>} Steam ID as string
 */
async function getSteamID() {
    if (!isAvailable()) return '0';
    
    return new Promise((resolve) => {
        window.steamGetSteamID().then(resolve);
    });
}

/**
 * Get current user's persona name (display name)
 * @returns {Promise<string>} Persona name
 */
async function getPersonaName() {
    if (!isAvailable()) return '';
    
    return new Promise((resolve) => {
        window.steamGetPersonaName().then(resolve);
    });
}

/**
 * Get current app ID
 * @returns {Promise<number>} App ID
 */
async function getAppID() {
    if (!isAvailable()) return 0;
    
    return new Promise((resolve) => {
        window.steamGetAppID().then((id) => resolve(parseInt(id)));
    });
}

// 
// Achievements
// 

/**
 * Unlock an achievement
 * @param {string} achievementId - Achievement ID from Steamworks
 * @returns {Promise<boolean>} True if successful
 */
async function unlockAchievement(achievementId) {
    if (!isAvailable()) return false;
    
    return new Promise((resolve) => {
        window.steamUnlockAchievement(achievementId).then((result) => {
            resolve(result === 'true');
        });
    });
}

/**
 * Check if achievement is unlocked
 * @param {string} achievementId - Achievement ID from Steamworks
 * @returns {Promise<boolean>} True if unlocked
 */
async function getAchievement(achievementId) {
    if (!isAvailable()) return false;
    
    return new Promise((resolve) => {
        window.steamGetAchievement(achievementId).then((result) => {
            resolve(result === 'true');
        });
    });
}

/**
 * Store stats and achievements
 * Must be called after setting stats/achievements to persist them
 * @returns {Promise<boolean>} True if successful
 */
async function storeStats() {
    if (!isAvailable()) return false;
    
    return new Promise((resolve) => {
        window.steamStoreStats().then((result) => {
            resolve(result === 'true');
        });
    });
}

// 
// Stats
// 

/**
 * Set integer stat
 * @param {string} statName - Stat name from Steamworks
 * @param {number} value - Integer value
 * @returns {Promise<boolean>} True if successful
 */
async function setStatInt(statName, value) {
    if (!isAvailable()) return false;
    
    return new Promise((resolve) => {
        window.steamSetStatInt(statName, value).then((result) => {
            resolve(result === 'true');
        });
    });
}

/**
 * Get integer stat
 * @param {string} statName - Stat name from Steamworks
 * @returns {Promise<number>} Stat value
 */
async function getStatInt(statName) {
    if (!isAvailable()) return 0;
    
    return new Promise((resolve) => {
        window.steamGetStatInt(statName).then((result) => {
            resolve(parseInt(result));
        });
    });
}

// 
// Cloud Storage
// 

/**
 * Write file to Steam Cloud
 * @param {string} fileName - File name
 * @param {string} data - File data
 * @returns {Promise<boolean>} True if successful
 */
async function fileWrite(fileName, data) {
    if (!isAvailable()) return false;
    
    return new Promise((resolve) => {
        window.steamFileWrite(fileName, data).then((result) => {
            resolve(result === 'true');
        });
    });
}

/**
 * Read file from Steam Cloud
 * @param {string} fileName - File name
 * @returns {Promise<string>} File data
 */
async function fileRead(fileName) {
    if (!isAvailable()) return '';
    
    return new Promise((resolve) => {
        window.steamFileRead(fileName).then(resolve);
    });
}

/**
 * Check if file exists in Steam Cloud
 * @param {string} fileName - File name
 * @returns {Promise<boolean>} True if exists
 */
async function fileExists(fileName) {
    if (!isAvailable()) return false;
    
    return new Promise((resolve) => {
        window.steamFileExists(fileName).then((result) => {
            resolve(result === 'true');
        });
    });
}

// 
// Rich Presence
// 

/**
 * Set rich presence key-value pair
 * @param {string} key - Rich presence key
 * @param {string} value - Rich presence value
 * @returns {Promise<boolean>} True if successful
 * 
 * Example:
 *   Steam.setRichPresence('status', 'In Menu');
 *   Steam.setRichPresence('steam_display', '#StatusWithScore');
 */
async function setRichPresence(key, value) {
    if (!isAvailable()) return false;
    
    return new Promise((resolve) => {
        window.steamSetRichPresence(key, value).then((result) => {
            resolve(result === 'true');
        });
    });
}

// 
// Overlay
// 

/**
 * Check if Steam Overlay is enabled
 * @returns {Promise<boolean>} True if enabled
 */
async function isOverlayEnabled() {
    if (!isAvailable()) return false;
    
    return new Promise((resolve) => {
        window.steamIsOverlayEnabled().then((result) => {
            resolve(result === 'true');
        });
    });
}

/**
 * Activate Steam Overlay to a specific dialog
 * @param {string} dialog - Dialog name: "Friends", "Community", "Players", "Settings", "OfficialGameGroup", "Stats", "Achievements"
 * 
 * Example:
 *   Steam.activateOverlay('Achievements');
 */
async function activateOverlay(dialog) {
    if (!isAvailable()) return;
    
    return new Promise((resolve) => {
        window.steamActivateOverlay(dialog).then(resolve);
    });
}

// 
// Export
// 

export const Steam = {
    // Core
    isAvailable,
    
    // User Info
    getSteamID,
    getPersonaName,
    getAppID,
    
    // Achievements
    unlockAchievement,
    getAchievement,
    storeStats,
    
    // Stats
    setStatInt,
    getStatInt,
    
    // Cloud Storage
    fileWrite,
    fileRead,
    fileExists,
    
    // Rich Presence
    setRichPresence,
    
    // Overlay
    isOverlayEnabled,
    activateOverlay
};

// Also expose globally for convenience
if (typeof window !== 'undefined') {
    window.GemcoreSteam = Steam;
}

