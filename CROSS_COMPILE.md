# 🌍 Cross-Platform Build System

Build for **macOS**, **Windows**, and **Linux** from a single macOS machine!

---

## 🚀 Quick Start

### 1. Install Cross-Compilation Toolchains

```bash
./scripts/setup-cross-compile.sh
```

This installs:
- **MinGW-w64** (for Windows builds)
- **musl-cross** (for Linux builds)

### 2. Build for All Platforms

```bash
bake all --dir examples/candy-catch
```

**Output:**
```
dist/
├─ mac/
│  └─ candy-catch.app (18 MB, Universal Binary)
├─ windows/
│  └─ candy-catch.exe (9 MB)
└─ linux/
   └─ candy-catch (9 MB)
```

---

## 📦 Platform-Specific Builds

### macOS (Universal Binary)
```bash
bake mac --dir examples/candy-catch
```
- ✅ ARM64 (Apple Silicon)
- ✅ x86_64 (Intel Mac)
- ✅ Automatic architecture detection

### Windows (x64)
```bash
bake win --dir examples/candy-catch
```
- ✅ Static linking (no DLL dependencies)
- ✅ Windows 10+ compatible
- ✅ Built with MinGW-w64

### Linux (x64)
```bash
bake linux --dir examples/candy-catch
```
- ✅ Static linking (no .so dependencies)
- ✅ musl-based (maximum compatibility)
- ✅ Runs on any Linux distro

---

## 🔧 How It Works

### Cross-Compilation Architecture

```
macOS Host
├─ Native Build (macOS)
│  ├─ ARM64 binary (Apple Silicon)
│  └─ x86_64 binary (Intel)
│
├─ Cross-Compile (Windows)
│  └─ MinGW-w64 → .exe
│
└─ Cross-Compile (Linux)
   └─ musl-cross → ELF
```

### Toolchains

#### MinGW-w64 (Windows)
```bash
Compiler: x86_64-w64-mingw32-gcc
Target:   Windows 10+ (x64)
Linking:  Static (no DLLs)
Output:   .exe (single file)
```

#### musl-cross (Linux)
```bash
Compiler: x86_64-linux-musl-gcc
Target:   Linux x64 (any distro)
Linking:  Static (no .so files)
Output:   ELF (single file)
```

---

## ✅ Benefits

### Single Build Machine
```
✅ Build for ALL platforms from macOS
✅ No need for Windows/Linux VMs
✅ Consistent build environment
✅ Fast CI/CD pipelines
```

### True Single Binaries
```
✅ macOS: .app bundle (Universal)
✅ Windows: .exe (no DLLs)
✅ Linux: ELF (no .so files)
✅ All assets embedded
✅ Zero external dependencies
```

### Maximum Compatibility
```
macOS:   10.13+ (Intel + Apple Silicon)
Windows: 10+ (x64)
Linux:   Any distro with glibc 2.17+
```

---

## 🛠️ Manual Setup (if script fails)

### Install MinGW-w64
```bash
brew install mingw-w64
```

### Install musl-cross
```bash
brew install FiloSottile/musl-cross/musl-cross
```

### Verify Installation
```bash
x86_64-w64-mingw32-gcc --version
x86_64-linux-musl-gcc --version
```

---

## 📊 Binary Sizes

```
Platform    Size      Notes
─────────────────────────────────────────
macOS       18 MB     Universal (ARM64 + x64)
Windows     9 MB      Static .exe
Linux       9 MB      Static ELF
```

---

## 🎯 CI/CD Integration

### GitHub Actions Example
```yaml
name: Build All Platforms
on: [push]

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Cross-Compile
        run: ./scripts/setup-cross-compile.sh
      
      - name: Build All
        run: bake all --dir examples/candy-catch
      
      - name: Upload Artifacts
        uses: actions/upload-artifact@v3
        with:
          name: binaries
          path: examples/candy-catch/dist/
```

---

## 🔥 Performance

All binaries include:
- ✅ Ultra Performance System
- ✅ REALTIME OS Priority
- ✅ Zero Throttling
- ✅ <1ms Input Latency
- ✅ 120+ FPS Support

---

## 💡 Tips

### Faster Builds
```bash
# Build only what you need
bake mac --dir myproject   # macOS only
bake win --dir myproject   # Windows only
bake linux --dir myproject # Linux only
```

### Parallel Builds
```bash
# All platforms build in sequence
# (parallel builds coming soon)
bake all --dir myproject
```

### Clean Builds
```bash
# Remove build artifacts
rm -rf launcher/build-*
```

---

## 🐛 Troubleshooting

### MinGW-w64 not found
```bash
brew install mingw-w64
```

### musl-cross not found
```bash
brew tap FiloSottile/musl-cross
brew install musl-cross
```

### Build fails on Windows/Linux
```bash
# Check toolchain
x86_64-w64-mingw32-gcc --version
x86_64-linux-musl-gcc --version

# Re-run setup
./scripts/setup-cross-compile.sh
```

---

**Build once, run everywhere! 🌍**


