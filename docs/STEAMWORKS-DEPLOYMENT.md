#  Steamworks Deployment Guide

## Overview

When you enable Steamworks in `gemcore.config.js`, Gemcore automatically handles most of the setup. However, there are platform-specific requirements for deploying Steam DLLs.

## Configuration

```javascript
export default {
  steamworks: {
    enabled: true,  // Enable Steamworks integration
    appId: 480      // Your Steam App ID
  }
}
```

## Automatic Build Integration

When `steamworks.enabled = true`, Gemcore automatically:

 **Creates `steam_appid.txt`** in the app directory (with your App ID)  
 **Copies Steam SDK DLLs** to the correct location  
 **Links Steamworks API** to JavaScript  
 **Initializes Steam** on app startup  

When `steamworks.enabled = false`:

 **No Steam DLLs** are copied  
 **No `steam_appid.txt`** is created  
 **Steamworks API** returns `isAvailable() = false`  
 **No Steam initialization** happens  

## Platform-Specific Deployment

###  macOS

**Build Command:**
```bash
./bake mac --dir examples/steamdemo
```

**Output Structure:**
```
dist/mac/
   steamdemo.app/
       Contents/
           MacOS/
               steamdemo           # Universal launcher
               steamdemo-arm64     # ARM64 binary
               steamdemo-x86_64    # x64 binary
               gemcore-assets       # Encrypted assets
               libsteam_api.dylib  #  Auto-copied if enabled
               steam_appid.txt     #  Auto-created at runtime
```

**Distribution:**
-  Everything is inside the `.app` bundle
-  Steam DLL is automatically copied during build
-  Users just download and run the `.app`

---

###  Windows

**Build Command:**
```bash
./bake win --dir examples/steamdemo
```

**Output Structure:**
```
dist/windows/
   steamdemo.exe        #  Single EXE (launcher + assets + Steam DLL embedded!)
   steam_appid.txt      #  Auto-created at runtime
```

**Distribution:**
-  **Single file!** `steamdemo.exe` (Steam DLL embedded)
-  Steam DLL is automatically embedded during build
-  DLL is extracted to TEMP at runtime
-  Users just download and run `steamdemo.exe`

**How it works:**
1. Build embeds `steam_api64.dll` into the EXE
2. At runtime, DLL is extracted to `%TEMP%\gemcore_<pid>\steam_api64.dll`
3. Steam loads the DLL from TEMP
4. Everything works seamlessly!

---

###  Linux

**Build Command:**
```bash
./bake linux --dir examples/steamdemo
```

**Output Structure:**
```
dist/linux/
   steamdemo-x86_64     #  Single executable (Intel/AMD 64-bit + Steam SDK)
   steamdemo-arm64      #  Single executable (ARM 64-bit)
```

**Distribution:**
-  **Two architecture-specific binaries**
-  `steamdemo-x86_64` for Intel/AMD processors (10 MB, with Steam SDK)
-  `steamdemo-arm64` for ARM processors (9.6 MB, Raspberry Pi, etc.)
-  All assets embedded in both
-  Users just download and run `./steamdemo-x86_64` or `./steamdemo-arm64`
-  **Note**: Steam SDK only available for x86_64 (Valve doesn't provide ARM64 binaries yet)

**Steamworks on Linux:**
-  **Works EXACTLY like Windows!** Steam library is embedded in the binary
-  **Runtime extraction**: Library is extracted to `/tmp/gemcore_<pid>/` at startup
-  **Dynamic loading**: Uses `dlopen()` to load Steam API at runtime
-  **Solution**: Embed † Extract † dlopen() † Works perfectly!
-  **Cross-compile from macOS**:  Fully functional!

---

## Testing Locally

### Development (with Steam running):

```bash
# macOS
./bake mac --dir examples/steamdemo
open examples/steamdemo/dist/mac/steamdemo.app

# Windows (cross-compile from macOS)
./bake win --dir examples/steamdemo
# Copy to Windows and run steamdemo.exe

# Linux (cross-compile from macOS)
./bake linux --dir examples/steamdemo
# Copy to Linux and run ./steamdemo
```

### Without Steam:

If Steam is not running, the app will show:
```
 [Gemcore Steam] Steamworks is not available. 
   Make sure Steam is running and steamworks is enabled in gemcore.config.js
```

All Steam API calls will return default values:
- `getSteamID()` † `'0'`
- `getPersonaName()` † `''`
- `isAvailable()` † `false`

---

## Steam Distribution

### For Steam Release:

1. **Upload to Steam:**
   - macOS: Upload the entire `.app` bundle
   - Windows: Upload `steamdemo.exe` (single file)
   - Linux: Upload `steamdemo` (single file)

2. **Steam will:**
   -  Automatically provide `steam_appid.txt` (you don't need to include it)
   -  Automatically provide Steam DLLs (but include yours as backup)
   -  Handle updates and DRM

3. **Your app will:**
   -  Detect Steam automatically
   -  Initialize Steamworks
   -  Work with achievements, cloud saves, etc.

---

## Troubleshooting

### "Steamworks is not available"

**Causes:**
1. Steam is not running
2. `steam_appid.txt` is missing or invalid
3. Steam DLL is missing
4. App ID doesn't match

**Solution:**
1. Make sure Steam is running
2. Check `steamworks.enabled = true` in config
3. Rebuild the app: `./bake mac --dir <project>`
4. Check console for errors: `[Gemcore Steam] ...`

### "steam_api64.dll not found" (Windows)

**Solution:**
1. Rebuild: `./bake win --dir <project>` (DLL is embedded automatically)
2. Check that Steamworks is enabled in config
3. Make sure the EXE is not corrupted

### "libsteam_api.so not found" (Linux)

**Solution:**
1. Rebuild: `./bake linux --dir <project>` (.so is embedded automatically)
2. Check that Steamworks is enabled in config
3. Make sure the binary is executable: `chmod +x steamdemo`

---

## Summary

| Platform | Single File? | Steam DLL Location | Auto-Embedded? | Cross-Compile? | Architectures |
|----------|--------------|-------------------|----------------|----------------|---------------|
| **macOS** |  Yes (`.app` bundle) | Inside `.app/Contents/MacOS/` |  Yes |  Yes | Universal (x86_64 + ARM64) |
| **Windows** |  Yes (Single EXE) | Embedded, extracted to TEMP |  Yes |  Yes | x86_64 |
| **Linux** |  Yes (2 binaries) | Embedded, dlopen() at runtime |  Yes |  Yes | x86_64 + ARM64 |

**Key Points:**
-  Steam DLLs are **automatically embedded** during build if `steamworks.enabled = true`
-  DLLs are **extracted to TEMP** at runtime
-  `steam_appid.txt` is **automatically created** at runtime
-  **TRUE single-file distribution** - no external DLLs needed!
-  Everything works out of the box - just build and distribute!

---

## What Game Developers Need

###  Everything is Ready!

Game developers have **everything they need**:

1. **User Info** - Steam ID, Name, App ID
2. **Achievements** - Unlock and check status
3. **Stats** - Set and get integer stats
4. **Cloud Storage** - Save/load files to Steam Cloud
5. **Rich Presence** - Update player status
6. **Overlay** - Check and activate Steam Overlay
7. **DLC Management** - Check if user owns DLC
8. **Friends** - Get friend count and names
9. **Screenshots** - Trigger Steam screenshot
10. **Localization** - Get game language
11. **Steam Deck** - Detect Steam Deck and Big Picture mode
12. **Automatic Error Logging** - All errors logged to console
13. **Cross-Platform** - Same API for macOS, Windows, and Linux

###  Simple API:

```javascript
// Check if Steam is available
if (window.Steam.isAvailable()) {
  // Get user info
  const name = await window.Steam.getPersonaName();
  
  // Unlock achievement
  await window.Steam.unlockAchievement('ACH_WIN_ONE_GAME');
  
  // Save to cloud
  await window.Steam.fileWrite('save.dat', gameData);
  
  // Get friends
  const friends = await window.Steam.getFriends();
}
```

###  Documentation:

- `STEAMWORKS.md` - Complete API reference
- `STEAMWORKS-DEPLOYMENT.md` - This file (deployment guide)
- Demo app: `examples/steamdemo/` - Full feature showcase

**Game developers are ready to ship on Steam!** 



