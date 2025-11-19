# Linux Builds (Native glibc, like Neutralino)

## Overview

Like Neutralino, Bakery requires **native Linux builds** for Linux binaries. This ensures compatibility with all Linux distributions (Ubuntu, Debian, Fedora, etc.).

## Why Native Builds?

- **glibc compatibility**: Ubuntu/Debian use glibc, not musl
- **WebKitGTK integration**: Requires system libraries via `pkg-config`
- **Like Neutralino**: Neutralino also requires native Linux builds

## Build Options

### Option 1: Build on Native Linux (Recommended)

```bash
# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    cmake \
    libgtk-3-dev \
    libwebkit2gtk-4.1-dev \
    pkg-config \
    libssl-dev \
    libcurl4-openssl-dev

# Install Bun
curl -fsSL https://bun.sh/install | bash

# Build
./bake linux --dir ./examples/stress-test
```

### Option 2: Use Docker (from macOS/Windows)

```bash
# Build Docker image
docker build -f Dockerfile.linux -t bakery-linux .

# Build Linux binaries
docker run --rm -v $(pwd):/work bakery-linux

# Or use the script
./scripts/build-linux-docker.sh ./examples/stress-test
```

### Option 3: Use GitHub Actions Pre-built Binaries

Pre-built binaries are automatically built on GitHub Actions and available for download:

```bash
# Download from GitHub Releases
curl -L -o bakery-launcher-linux-x64 \
  https://github.com/eddime/bakery/releases/download/latest/bakery-launcher-linux-x64

curl -L -o bakery-universal-launcher-linux-embedded \
  https://github.com/eddime/bakery/releases/download/latest/bakery-universal-launcher-linux-embedded
```

The build script automatically downloads these if available.

## Technical Details

### Compiler Flags (like Neutralino)

```cmake
# Optimization
-Os  # Optimize for size

# Linking
-no-pie  # Position Independent Executable
-Wl,--gc-sections  # Remove unused sections

# Libraries (via pkg-config)
$(pkg-config --cflags --libs gtk+-3.0 glib-2.0 xcb x11 xrandr webkit2gtk-4.1)
```

### Why Not musl Cross-Compilation?

- musl-based binaries use `/lib/ld-musl-x86_64.so.1` interpreter
- Ubuntu/Debian use glibc with `/lib64/ld-linux-x86-64.so.2`
- Even with static linking, the interpreter is musl-specific
- Result: "cannot execute binary file: Exec format error"

### Neutralino Approach

Neutralino uses the same approach:
1. Native Linux builds with glibc
2. `pkg-config` for system libraries
3. `-no-pie` flag for compatibility
4. `-Os` optimization for size

## Troubleshooting

### "cannot execute binary file: Exec format error"

This means the binary was built with musl instead of glibc. Solution:
1. Build on native Linux
2. Use Docker
3. Use GitHub Actions pre-built binaries

### "libwebkit2gtk-4.1.so.0: cannot open shared object file"

Install WebKitGTK:
```bash
sudo apt-get install libwebkit2gtk-4.1-0
```

### Docker not installed

Install Docker:
- macOS: https://docs.docker.com/desktop/install/mac-install/
- Windows: https://docs.docker.com/desktop/install/windows-install/
- Linux: https://docs.docker.com/engine/install/

## References

- [Neutralino Build Process](https://github.com/neutralinojs/neutralinojs)
- [WebKitGTK](https://webkitgtk.org/)
- [glibc vs musl](https://wiki.musl-libc.org/functional-differences-from-glibc.html)

