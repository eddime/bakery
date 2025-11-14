# 📦 Pre-built Binaries

This directory contains pre-built launcher binaries and Steamworks libraries for all supported platforms.

## 📊 Structure

```
bin/
├── steamworks/              # Shared Steamworks DLLs (~1.3 MB)
│   ├── macos/
│   │   └── libsteam_api.dylib      # Universal (ARM64 + x64)
│   ├── windows/
│   │   ├── steam_api64.dll         # 64-bit
│   │   └── steam_api.dll           # 32-bit
│   └── linux/
│       └── libsteam_api.so         # x64 + ARM64
│
├── mac-arm64/               # macOS ARM64 launcher (~192 KB)
│   └── bakery-launcher
│
├── mac-x64/                 # macOS x64 launcher (~208 KB)
│   └── bakery-launcher
│
├── win-x64/                 # Windows x64 launcher (~1 MB)
│   └── bakery-launcher.exe
│
├── linux-x64/               # Linux x64 launcher (~140 KB)
│   └── bakery-launcher
│
└── linux-arm64/             # Linux ARM64 launcher (~120 KB)
    └── bakery-launcher
```

**Total Size: ~3 MB** (all platforms + Steamworks)

---

## 🎮 Steamworks Integration

The Steamworks DLLs are stored **once** in `steamworks/` and copied to game bundles during build.

### Why Shared?

- **Smaller repo**: 1.3 MB instead of 3.4 MB (saves 60%!)
- **No duplication**: Same DLL used for all architectures
- **Easy updates**: Update once, affects all platforms

### Platform Details

| Platform | File | Size | Architectures |
|----------|------|------|---------------|
| macOS | `libsteam_api.dylib` | 406 KB | Universal (ARM64 + x64) |
| Windows | `steam_api64.dll` | 312 KB | x64 |
| Windows | `steam_api.dll` | 272 KB | x86 (optional) |
| Linux | `libsteam_api.so` | 379 KB | x64 + ARM64 |

---

## 🔄 Updating Binaries

### From GitHub Actions (Automatic)

Pre-built binaries are automatically built and uploaded to GitHub Releases by CI/CD.

Download latest:
```bash
bun scripts/download-binaries.ts
```

### Manual Build (Native)

Build on each platform natively:

**macOS:**
```bash
cd launcher
./build-macos.sh
```

**Windows:**
```bash
cd launcher
build-windows.bat
```

**Linux:**
```bash
cd launcher
./build-linux.sh
```

### Setup Steamworks DLLs

Copy Steamworks DLLs from `deps/` to `bin/steamworks/`:
```bash
bun scripts/setup-bin-structure.ts
```

---

## 📝 Notes

- **Launchers are architecture-specific** (separate binaries for ARM64/x64)
- **Steamworks DLLs are universal** (macOS) or shared (Linux)
- **Windows includes both 32/64-bit** Steam DLLs for compatibility
- All binaries are **stripped** (debug symbols removed) for smaller size

---

## 🚀 Usage in Builds

Build scripts automatically copy binaries from `bin/` to game bundles:

```bash
./bake all --dir ./examples/steamdemo
```

Output:
```
dist/
├── mac/
│   └── steamdemo.app/
│       └── Contents/MacOS/
│           ├── steamdemo              # Launcher
│           └── libsteam_api.dylib    # From bin/steamworks/macos/
│
├── windows/
│   └── steamdemo.exe                 # Launcher + steam_api64.dll embedded
│
└── linux/
    ├── steamdemo-x64                 # Launcher + libsteam_api.so embedded
    └── steamdemo-arm64               # Launcher + libsteam_api.so embedded
```

---

## 🔐 Security

All binaries are:
- ✅ Built from source in GitHub Actions (reproducible)
- ✅ Stripped of debug symbols
- ✅ Signed (macOS only, if configured)
- ✅ Verified by CI/CD checksums

Steamworks DLLs are:
- ✅ Official Valve redistributables
- ✅ From Steamworks SDK v1.59
- ✅ Unmodified (checksums match official release)

