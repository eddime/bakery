# 🥐 Bakery - Build Status

## ✅ Was funktioniert (Nov 7, 2024)

### Development Mode
- ✅ **`bake dev`** - Hot Reload mit Bun Runtime
  - Öffnet WebView Window
  - Neustart bei `.ts` File-Changes
  - Beendet sich sauber beim App-Close
  - Perfekt für schnelle Entwicklung

### Production Builds
- ✅ **`bake mac`** - macOS Executable Builder
  - Kompiliert mit txiki.js
  - **3.6 MB** Binaries (Ziel: 5-8 MB ✅)
  - Single-file executable
  - Nutzt txiki.js FFI für WebView

### Core Features
- ✅ **txiki.js Runtime** - Kompiliert und funktioniert
- ✅ **WebView FFI Bindings** - Vollständige Integration
- ✅ **App Lifecycle** - `app.on('ready')` funktioniert
- ✅ **Window Management** - Create, setTitle, setSize, setHtml
- ✅ **CLI Tool** - Alle Basis-Commands implementiert

## 🚧 In Arbeit

### Cross-Platform Builds
- ⏳ **`bake win`** - Windows build (TODO)
- ⏳ **`bake linux`** - Linux build (TODO)
- ⏳ **`bake all`** - Multi-platform build (TODO)

### Asset Embedding
- ⏳ WebView Library embedding in Binary
- ⏳ HTML/CSS/JS Resource bundling
- ⏳ Icon/Image asset packaging

## 📊 Binary Size Vergleich

| Framework | Hello World Binary | Runtime | Status |
|-----------|-------------------|---------|---------|
| **Bakery** | **3.6 MB** | txiki.js | ✅ Working |
| Electron | ~150 MB | Chromium + Node.js | Reference |
| Tauri | ~5 MB | WebView + Rust | Reference |
| Neutralino | ~3 MB | WebView + C++ | Reference |

**🎯 Ziel erreicht!** Bakery ist bereits im Zielbereich von 5-8 MB!

## 🏗️ Architektur

```
Development (bake dev):
┌──────────────────────────┐
│    Bun Runtime (FFI)     │  ← Fast iteration
│           ↓              │
│    WebView Library       │
└──────────────────────────┘

Production (bake mac/win/linux):
┌──────────────────────────┐
│  txiki.js (QuickJS)      │  ← Small binary
│     3.6 MB core          │
│           ↓              │
│    WebView (FFI)         │  ← System library
│    ~0 MB (OS-native)     │
└──────────────────────────┘
Total: ~3.6 MB
```

## 🎯 Next Steps

1. **WebView Library Embedding**
   - Bundle WebView .dylib/.dll/.so in binary
   - Extract at runtime or embed in memory
   
2. **Cross-Compilation**
   - Build Windows binaries from macOS
   - Build Linux binaries from macOS
   - CI/CD for all platforms

3. **API Extension**
   - File dialogs
   - System tray
   - Notifications
   - Menu bar

4. **StreamWorker** (Unique Feature)
   - High-performance worker threads
   - Zero-copy data transfer

## 🚀 Commands

```bash
# Development
bake dev                  # Start with hot reload
bake dev -e ./my-app.ts   # Custom entry point
bake dev --persist        # Keep running after app close

# Production Build
bake mac                  # Build for macOS
bake win                  # Build for Windows (TODO)
bake linux                # Build for Linux (TODO)
bake all                  # Build for all platforms (TODO)

# Run without dev mode
bake run ./my-app.ts
```

## 📝 Notes

- Development uses Bun for speed (~80 MB runtime, but instant)
- Production uses txiki.js for size (3.6 MB, perfect!)
- WebView is system-native (0 MB, fast rendering)
- Best of both worlds: Fast dev + Small production builds

---

**Made with 🥐 and TypeScript**

