#  Steamworks Integration

Gemcore includes **native Steamworks integration** for all platforms (macOS, Windows, Linux) with zero Node.js dependencies.

## Features

-  **User Info**: Steam ID, Persona Name, App ID
-  **Achievements**: Unlock and check achievement status
-  **Stats**: Set and get integer stats
-  **Cloud Storage**: Save/load files to Steam Cloud
-  **Rich Presence**: Update player status
-  **Overlay**: Check and activate Steam Overlay
-  **DLC Management**: Check if user owns DLC
-  **Friends**: Get friend count and names
-  **Screenshots**: Trigger Steam screenshot
-  **Localization**: Get game language
-  **Steam Deck**: Detect Steam Deck and Big Picture mode
-  **Cross-Platform**: Same API for macOS, Windows, and Linux
-  **Automatic Error Logging**: All errors logged to console

## Configuration

Enable Steamworks in your `gemcore.config.js`:

```javascript
export default {
  app: {
    name: "mygame",
    version: "1.0.0",
    entrypoint: "index.html",
    debug: false  // Enable for right-click menu, DevTools
  },
  window: {
    title: "My Game",
    width: 1280,
    height: 720
  },
  steamworks: {
    enabled: true,
    appId: 480  // Your Steam App ID (480 = Spacewar test app)
  }
}
```

## Error Handling

All Steamworks API calls are automatically wrapped with error logging:

```javascript
// Errors are automatically logged to console
try {
  await window.Steam.unlockAchievement('ACH_WIN_ONE_GAME');
} catch (error) {
  // Error is already logged: [Gemcore Steam] unlockAchievement failed: ...
  // You can add custom error handling here
}
```

**Console Output Examples:**
- ` [Gemcore Steam] Steamworks is not available. Make sure Steam is running...`
- ` [Gemcore Steam] unlockAchievement failed: Error: ...`
- ` [Gemcore Steam] fileRead failed: File not found`

**No try/catch required** - errors are automatically logged for debugging!

## JavaScript API

All Steamworks functions are available via `window.Steam`:

### User Info

```javascript
// Get Steam ID
const steamId = await window.Gemcore.Steam.getSteamID();
console.log("Steam ID:", steamId);

// Get persona name
const name = await window.Gemcore.Steam.getPersonaName();
console.log("Player name:", name);

// Get App ID
const appId = await window.Gemcore.Steam.getAppID();
console.log("App ID:", appId);
```

### Achievements

```javascript
// Unlock an achievement
const success = await window.Gemcore.Steam.unlockAchievement("ACH_WIN_ONE_GAME");
if (success) {
  console.log("Achievement unlocked!");
}

// Check if achievement is unlocked
const unlocked = await window.Gemcore.Steam.getAchievement("ACH_WIN_ONE_GAME");
console.log("Achievement status:", unlocked);

// Store stats (required after unlocking achievements)
await window.Gemcore.Steam.storeStats();
```

### Stats

```javascript
// Set a stat
await window.Gemcore.Steam.setStatInt("NumGames", 10);

// Get a stat
const numGames = await window.Gemcore.Steam.getStatInt("NumGames");
console.log("Games played:", numGames);

// Store stats
await window.Gemcore.Steam.storeStats();
```

### Cloud Storage

```javascript
// Write to cloud
const data = JSON.stringify({ level: 5, score: 1000 });
await window.Gemcore.Steam.fileWrite("savegame.json", data);

// Read from cloud
const savedData = await window.Gemcore.Steam.fileRead("savegame.json");
const save = JSON.parse(savedData);

// Check if file exists
const exists = await window.Gemcore.Steam.fileExists("savegame.json");
```

### Rich Presence

```javascript
// Set rich presence
await window.Gemcore.Steam.setRichPresence("status", "In Main Menu");
await window.Gemcore.Steam.setRichPresence("steam_display", "#Status");
```

### Overlay

```javascript
// Check if overlay is enabled
const enabled = await window.Gemcore.Steam.isOverlayEnabled();
console.log("Overlay enabled:", enabled);

// Activate overlay
await window.Gemcore.Steam.activateOverlay("Friends");
// Options: "Friends", "Community", "Players", "Settings", "OfficialGameGroup", "Stats", "Achievements"
```

### DLC Management

```javascript
// Check if user owns a DLC
const hasDLC = await window.Gemcore.Steam.isDlcInstalled(12345); // DLC App ID
if (hasDLC) {
  console.log("User owns the DLC!");
}

// Get total number of DLCs
const dlcCount = await window.Gemcore.Steam.getDLCCount();
console.log("Total DLCs:", dlcCount);
```

### Friends

```javascript
// Get friend count
const friendCount = await window.Gemcore.Steam.getFriendCount();
console.log("Friends:", friendCount);

// Get friend names
for (let i = 0; i < friendCount; i++) {
  const friendName = await window.Gemcore.Steam.getFriendPersonaName(i);
  console.log(`Friend ${i}:`, friendName);
}
```

### Screenshots

```javascript
// Trigger Steam screenshot (F12 key equivalent)
await window.Gemcore.Steam.triggerScreenshot();
```

### Localization

```javascript
// Get current game language
const language = await window.Gemcore.Steam.getCurrentGameLanguage();
console.log("Language:", language); // e.g. "english", "german", "french"

// Get all available languages
const languages = await window.Gemcore.Steam.getAvailableGameLanguages();
console.log("Available:", languages); // e.g. "english,german,french"
```

### Steam Deck Detection

```javascript
// Check if running on Steam Deck
const isDeck = await window.Gemcore.Steam.isSteamDeck();
if (isDeck) {
  console.log("Running on Steam Deck!");
  // Adjust UI for smaller screen, enable gamepad controls, etc.
}

// Check if in Big Picture mode
const isBigPicture = await window.Gemcore.Steam.isSteamInBigPictureMode();
if (isBigPicture) {
  console.log("Big Picture mode active!");
  // Optimize UI for TV/controller
}
```

## Architecture

### Cross-Platform Bindings

All Steamworks bindings are centralized in **`gemcore-steamworks-bindings.h`**, which is included by all launchers:

```
launcher/
 gemcore-steamworks-bindings.h    #  Cross-platform Steamworks bindings
 gemcore-steamworks.h             # Steamworks API wrapper
 gemcore-steamworks.cpp           # Steamworks implementation
 gemcore-launcher-mac.cpp         # macOS launcher (uses bindings.h)
 gemcore-launcher-win.cpp         # Windows launcher (uses bindings.h)
 gemcore-launcher-linux.cpp       # Linux launcher (uses bindings.h)
```

### Helper Functions

The bindings header provides three main helper functions:

1. **`initSteamworks(config)`**: Initialize Steamworks based on config
2. **`bindSteamworksToWebview(w, steamEnabled)`**: Bind all functions to JavaScript
3. **`shutdownSteamworks()`**: Clean shutdown

### Example Usage in Launcher

```cpp
#include "gemcore-steamworks-bindings.h"

// Initialize Steamworks
bool steamEnabled = gemcore::steamworks::initSteamworks(config);

// Bind to WebView
gemcore::steamworks::bindSteamworksToWebview(w, steamEnabled);

// Run callbacks in background thread
std::thread steamThread;
if (steamEnabled) {
    steamThread = std::thread([]() {
        while (g_running) {
            gemcore::steamworks::SteamworksManager::RunCallbacks();
            std::this_thread::sleep_for(std::chrono::milliseconds(16));
        }
    });
}

// ... run app ...

// Cleanup
if (steamEnabled) {
    if (steamThread.joinable()) {
        steamThread.join();
    }
    gemcore::steamworks::shutdownSteamworks();
}
```

## Testing

Use **Spacewar (App ID 480)** for testing without a real Steam App ID:

1. Make sure Steam is running
2. Set `appId: 480` in your config
3. The launcher will automatically create `steam_appid.txt`
4. Launch your app

## Deployment

When distributing your app:

1. **Include the Steamworks library**:
   - macOS: `libsteam_api.dylib` (in `Contents/MacOS/`)
   - Windows: `steam_api64.dll` (next to `.exe`)
   - Linux: `libsteam_api.so` (next to binary)

2. **Set your real App ID** in `gemcore.config.js`

3. **Remove `steam_appid.txt`** from your distribution (it's auto-generated)

## Troubleshooting

### "Steamworks is DISABLED"

- Make sure Steam is running
- Check that `steamworks.enabled: true` in config
- Verify `steamworks.appId` is set correctly

### "Overlay not working"

- Overlay requires the app to be launched through Steam
- For testing, use `steam://run/480` to launch Spacewar
- In production, users will launch via Steam library

### "Functions return false"

- Check Steam is running
- Verify App ID is correct
- Make sure `storeStats()` is called after setting stats/achievements

## Example App

See `examples/steamdemo/` for a complete working example with UI for all Steamworks features.

## License

Steamworks SDK is property of Valve Corporation. See `deps/steamworks/sdk/` for license information.



