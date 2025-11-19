# Pre-built Linux x64 Launcher

This directory contains the pre-built Linux x64 launcher binary (glibc-based, Ubuntu-compatible).

## Download Pre-built Binary

```bash
# From project root
./scripts/download-linux-binaries.sh
```

Or manually:
```bash
curl -L -o bin/linux-x64/bakery-launcher-linux \
  https://github.com/eddime/bakery/releases/download/latest/bakery-launcher-linux-x64
chmod +x bin/linux-x64/bakery-launcher-linux
```

## Build from Source (on Linux)

```bash
cd launcher
mkdir -p build-linux-x64
cd build-linux-x64
cmake .. -DCMAKE_BUILD_TYPE=Release
make bakery-launcher-linux -j$(nproc)
strip bakery-launcher-linux
cp bakery-launcher-linux ../../bin/linux-x64/
```

## Why Pre-built Binaries?

Like Neutralino, Bakery uses pre-built binaries to enable **cross-platform builds**:
- Build Linux games from macOS/Windows
- No need for Linux VM or Docker
- Consistent, reproducible builds

The binaries are built natively on Linux (GitHub Actions) with glibc for maximum compatibility.

