# 🥐 Gemcore Architecture

## 📦 Dual-Mode System

### For End-Users (No Compiler Needed)
```bash
bun install -g gemcore
bake all --dir my-game    # Uses pre-built binaries
```

### For Developers (Full Source Access)
```bash
git clone https://github.com/eddime/gemcore
cd gemcore
bun install
bun run build:launchers   # Rebuilds all binaries with CMake
```

---

## 📁 Project Structure

```
gemcore/
├── bin/                           ← Pre-built launcher binaries (committed)
│   ├── mac-arm64/
│   │   └── gemcore-launcher        (176 KB)
│   ├── mac-x64/
│   │   └── gemcore-launcher        (188 KB)
│   ├── win-x64/
│   │   └── gemcore-launcher.exe    (~200 KB)
│   ├── linux-x64/
│   │   └── gemcore-launcher        (~180 KB)
│   └── linux-arm64/
│       └── gemcore-launcher        (~180 KB)
│
├── launcher/                      ← C++ Source Code (for developers)
│   ├── gemcore-launcher-mac.cpp
│   ├── gemcore-launcher-win.cpp
│   ├── gemcore-launcher-linux.cpp
│   ├── gemcore-http-server.h
│   ├── gemcore-asset-loader.h
│   └── CMakeLists.txt
│
├── scripts/                       ← Build scripts (TypeScript/Bun)
│   ├── build.ts                   ← Main build orchestrator
│   ├── pack-assets.ts             ← Asset encryption & packing
│   ├── concat-binary.ts           ← Binary + Assets concatenation
│   └── build-launchers.ts         ← Rebuild C++ binaries (dev only)
│
├── examples/                      ← Example games
│   ├── stress-test/
│   ├── candy-catch/
│   └── runner/
│
├── bake                           ← CLI entry point
├── package.json
└── README.md
```

---

## 🔄 Build Flow

### End-User Build (No CMake)
```
1. bake all --dir my-game
   ↓
2. scripts/build.ts
   ↓
3. Load pre-built binary from bin/
   ↓
4. Pack & encrypt assets (scripts/pack-assets.ts)
   ↓
5. Concatenate binary + assets (scripts/concat-binary.ts)
   ↓
6. Output to dist/ ✅
```

### Developer Build (With CMake)
```
1. bun run build:launchers
   ↓
2. scripts/build-launchers.ts
   ↓
3. CMake + Compiler (Clang/GCC/MinGW)
   ↓
4. Build all platform binaries
   ↓
5. Copy to bin/ directory
   ↓
6. Commit updated binaries ✅
```

---

## 🎯 Key Benefits

✅ **End-Users**: No compiler toolchain needed
✅ **Developers**: Full source access for improvements
✅ **Fast Builds**: Only asset packing (< 1 second)
✅ **Cross-Platform**: Build for all OS from any OS
✅ **Small Binaries**: ~1 MB total (all platforms)
✅ **Open Source**: Full transparency & customization

---

## 🔐 Security

- Binaries are **signed & verified** (SHA256 checksums)
- Assets are **XOR encrypted** with unique per-project keys
- Source code is **auditable** by anyone
- No telemetry or tracking

---

## 🚀 Future: Bunery GUI

Visual interface for Gemcore:
- Drag & drop game creation
- Live preview
- One-click multi-platform builds
- Asset management
- Built with Tauri (native WebView, like Gemcore itself!)

