# Pre-built Linux Universal Launcher

This directory contains the pre-built Linux universal launcher binary (glibc-based, Ubuntu-compatible).

## Download Pre-built Binary

```bash
# From project root
./scripts/download-linux-binaries.sh
```

Or manually:
```bash
curl -L -o bin/linux-universal/bakery-universal-launcher-linux-embedded \
  https://github.com/eddime/bakery/releases/download/latest/bakery-universal-launcher-linux-embedded
chmod +x bin/linux-universal/bakery-universal-launcher-linux-embedded
```

## Build from Source (on Linux)

```bash
cd launcher
mkdir -p build-linux-universal-embedded
cd build-linux-universal-embedded
cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
make bakery-universal-launcher-linux-embedded -j$(nproc)
strip bakery-universal-launcher-linux-embedded
cp bakery-universal-launcher-linux-embedded ../../bin/linux-universal/
```

## Why Pre-built Binaries?

Like Neutralino, Bakery uses pre-built binaries to enable **cross-platform builds**:
- Build Linux games from macOS/Windows
- No need for Linux VM or Docker
- Consistent, reproducible builds

The binaries are built natively on Linux (GitHub Actions) with glibc for maximum compatibility.

