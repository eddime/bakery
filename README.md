#  Gemcore

**The fastest way to package HTML5 games as native desktop apps.**

Cross-platform game launcher with WebView - like Neutralino, but optimized for games.

---

##  Features

-  **Fast startup** - Optimized HTTP server & asset loading
-  **Asset encryption** - XOR encryption with unique keys
-  **Single executable** - No dependencies needed
-  **Universal** - Works with any HTML5 game engine
- ¶ **Lightweight** - ~200 KB launcher + your game assets
-  **No compiler needed** - Pre-built binaries for all platforms

---

##  Quick Start

### For Game Developers (End-Users)

```bash
# 1. Clone or add as submodule
git clone https://github.com/eddime/gemcore.git
cd gemcore

# 2. Setup (downloads pre-built binaries once)
bun scripts/setup.ts

# 3. Build your game for all platforms!
cd examples/stress-test
bun bake build --platform=all

# Your game is ready in dist/!
```

**That's it!** No CMake, no compilers, no build tools needed.

After initial setup, Gemcore works **100% offline**!

---

##  Supported Platforms

| Platform | Architecture | Status |
|----------|-------------|--------|
| **macOS** | ARM64 (Apple Silicon) |  |
| **macOS** | x64 (Intel) |  |
| **Linux** | x64 |  |
| **Linux** | ARM64 |  |
| **Windows** | x64 |  CI only |

---

##  How It Works (Like Neutralino)

### For End-Users
Gemcore uses **pre-built binaries** downloaded from GitHub Releases:

```
bake all
  †
Downloads pre-built launchers (if needed)
  †
Packs your game assets
  †
Combines launcher + assets
  †
Done! 
```

**No compiler needed!** Just like Neutralino.

### For Developers
If you want to modify the launcher:

```bash
# Build all launchers from C++ source
bun run build:launchers

# Commit the binaries
git add bin/
git commit -m "Update launcher binaries"
```

---

##  Project Structure

```
gemcore/
 bin/                          † Pre-built binaries (committed!)
    mac-arm64/gemcore-launcher    (173 KB)
    mac-x64/gemcore-launcher      (188 KB)
    linux-x64/gemcore-launcher    (9.7 MB)
    linux-arm64/gemcore-launcher  (10 MB)
    win-x64/                     (built on CI)

 launcher/                     † C++ source (for developers)
    gemcore-launcher-mac.cpp
    gemcore-launcher-win.cpp
    gemcore-launcher-linux.cpp
    gemcore-http-server.h
    gemcore-asset-loader.h

 scripts/
    build-launchers.ts        † Rebuild C++ binaries
    download-binaries.ts      † Download from GitHub
    embed-assets-shared.ts    † Pack & encrypt assets

 .github/workflows/
    build-binaries.yml        † Auto-build on release

 bake                          † CLI entry point
```

---

##  Configuration

Create `gemcore.config.js` in your game directory:

```javascript
export default {
  window: {
    title: "My Awesome Game",
    width: 1280,
    height: 720,
    resizable: true
  },
  app: {
    name: "my-game",
    version: "1.0.0",
    entrypoint: "index.html"
  }
};
```

---

##  Commands

```bash
# Development
bake dev                    # Start dev server + launcher
bake dev --dir ./my-game    # Dev specific directory

# Production
bake mac                    # Build for macOS
bake win                    # Build for Windows
bake linux                  # Build for Linux
bake all                    # Build for all platforms

# Developer Commands
bun run build:launchers     # Rebuild C++ binaries
bun run download:binaries   # Download pre-built binaries
```

---

##  Comparison with Neutralino

| Feature | Gemcore | Neutralino |
|---------|--------|------------|
| **Target** | HTML5 Games | General Apps |
| **Startup** | ~50ms | ~100ms |
| **Size** | ~200 KB | ~3 MB |
| **Asset Encryption** |  Built-in |  Manual |
| **HTTP Server** | Optimized for games | General purpose |
| **Pre-built Binaries** |  |  |
| **No Compiler Needed** |  |  |

---

##  Building from Source

### Prerequisites

**macOS:**
```bash
brew install cmake
```

**Linux:**
```bash
sudo apt install cmake build-essential libgtk-3-dev libwebkit2gtk-4.1-dev
```

**Windows:**
- Visual Studio 2022 with C++ tools
- CMake

### Build All Binaries

```bash
bun run build:launchers
```

This will create binaries in `bin/` for all platforms.

---

##  GitHub Releases

Binaries are automatically built on GitHub Actions when you create a release tag:

```bash
git tag v1.0.0
git push --tags
```

GitHub Actions will:
1. Build binaries for macOS, Windows, Linux
2. Create a GitHub Release
3. Upload binaries as release assets

End-users will automatically download these binaries when they run `bake`.

---

##  Bunery GUI (Coming Soon)

Visual interface for Gemcore - like GemShell but better:

- Drag & drop game creation
- Live preview
- One-click multi-platform builds
- Asset management
- Built with Tauri (native WebView, like Gemcore itself!)

---

##  License

MIT License - See LICENSE file

---

##  Credits

Inspired by:
- **Neutralino** - For the pre-built binaries approach
- **Electron** - For making desktop apps with web tech popular
- **Tauri** - For showing native WebView is the way

---

##  Links

- [Documentation](https://github.com/eddime/gemcore/wiki)
- [Examples](./examples/)
- [Discord Community](https://discord.gg/gemcore)
- [Report Issues](https://github.com/eddime/gemcore/issues)

---

**Made with  for game developers**

