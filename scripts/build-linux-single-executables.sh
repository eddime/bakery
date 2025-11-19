#!/bin/bash
# Build Linux Single Executable with Embedded Resources
# Embeds launcher + binary + assets + Steam .so into ONE file

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo "🐧 Building Linux Single Executable (x86_64 only)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output to dist/linux (use absolute path)
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

# ============================================
# 0. Create ENCRYPTED shared assets (ALWAYS rebuild!)
# ============================================
echo "📦 Creating ENCRYPTED shared assets..."
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" launcher/bakery-assets
echo ""

# ============================================
# 1. Build Universal Launcher (Embedded)
# ============================================
echo "🔨 Building universal launcher..."
BUILD_EMBEDDED="$FRAMEWORK_DIR/launcher/build-linux-universal-embedded"
mkdir -p "$BUILD_EMBEDDED"
cd "$BUILD_EMBEDDED"

UNIVERSAL_DOWNLOADED=false

# Try to use pre-built universal launcher from bin/ (like Neutralino!)
BIN_UNIVERSAL="$FRAMEWORK_DIR/bin/linux-universal/bakery-universal-launcher-linux-embedded"
if [ -f "$BIN_UNIVERSAL" ]; then
    echo "✅ Using pre-built universal launcher from bin/ (like Neutralino)"
    cp "$BIN_UNIVERSAL" "bakery-universal-launcher-linux-embedded"
    chmod +x "bakery-universal-launcher-linux-embedded"
    UNIVERSAL_DOWNLOADED=true
else
    # Try to download from GitHub Actions
    if [[ $(uname) != "Linux" ]]; then
        echo "📥 Attempting to download pre-built universal launcher from GitHub..."
        UNIVERSAL_URL="https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/bakery-universal-launcher-linux-embedded"
        if curl -L -f -o "bakery-universal-launcher-linux-embedded" "${UNIVERSAL_URL}" 2>/dev/null; then
            chmod +x "bakery-universal-launcher-linux-embedded"
            echo "✅ Downloaded pre-built universal launcher"
            UNIVERSAL_DOWNLOADED=true
        else
            echo "⚠️  Pre-built universal launcher not available"
        fi
    fi
fi

if [ "$UNIVERSAL_DOWNLOADED" = false ]; then
    if [[ $(uname) == "Linux" ]]; then
        # Native Linux build (glibc-based, like Neutralino!)
        cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
        make bakery-universal-launcher-linux-embedded -j4
        
        if [ ! -f "bakery-universal-launcher-linux-embedded" ]; then
            echo "❌ Universal launcher build failed!"
            exit 1
        fi
    else
        # Not on Linux: Can't build without pre-built binaries
        echo "❌ ERROR: Universal launcher not available!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "🔧 Like Neutralino, Linux binaries must be built natively on Linux."
        echo ""
        echo "📥 Options:"
        echo "   1. Wait for GitHub Actions to build and release binaries"
        echo "   2. Build on a native Linux machine"
        echo "   3. Use Docker: docker run --rm -v \$(pwd):/work ubuntu:latest bash -c 'cd /work && ./bake linux --dir ./examples/stress-test'"
        echo ""
        exit 1
    fi
fi

echo "✅ Universal launcher ready"
echo ""

# ============================================
# 2. Build x86_64 launcher binary (with WebKitGTK)
# ============================================
echo "🔨 Building x86_64 launcher binary..."
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

# Try to use pre-built x64 binary from bin/ (like Neutralino!)
GITHUB_REPO="eddime/bakery"
VERSION="latest"
BIN_X64="$FRAMEWORK_DIR/bin/linux-x64/bakery-launcher-linux"
DOWNLOADED=false

if [ -f "$BIN_X64" ]; then
    echo "✅ Using pre-built x64 binary from bin/ (like Neutralino)"
    cp "$BIN_X64" "bakery-launcher-linux"
    chmod +x "bakery-launcher-linux"
    DOWNLOADED=true
else
    # Try to download from GitHub Actions
    if [[ $(uname) != "Linux" ]]; then
        echo "📥 Attempting to download pre-built x64 binary from GitHub..."
        BINARY_URL="https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/bakery-launcher-linux-x64"
        if curl -L -f -o "bakery-launcher-linux" "${BINARY_URL}" 2>/dev/null; then
            chmod +x "bakery-launcher-linux"
            echo "✅ Downloaded pre-built x64 binary"
            DOWNLOADED=true
        else
            echo "⚠️  Pre-built binary not available"
        fi
    fi
fi

if [ "$DOWNLOADED" = false ]; then
    if [[ $(uname) == "Linux" ]]; then
        # Native Linux build with WebKitGTK (like Neutralino!)
        cmake .. -DCMAKE_BUILD_TYPE=Release
        make bakery-launcher-linux -j4
        
        if [ ! -f "bakery-launcher-linux" ]; then
            echo "❌ x86_64 build failed!"
            exit 1
        fi
    else
        # Not on Linux: Can't build without pre-built binaries
        echo "❌ ERROR: x64 launcher not available!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "🔧 Like Neutralino, Linux binaries must be built natively on Linux."
        echo ""
        echo "📥 Options:"
        echo "   1. Wait for GitHub Actions to build and release binaries"
        echo "   2. Build on a native Linux machine"
        echo "   3. Use Docker: docker run --rm -v \$(pwd):/work ubuntu:latest bash -c 'cd /work && ./bake linux --dir ./examples/stress-test'"
        echo ""
        exit 1
    fi
fi

echo "✅ x86_64 launcher ready"
echo ""

# ARM64 builds require native compilation on ARM64 Linux
# Cross-compilation from macOS/x64 is not reliable
# Users on ARM64 should build natively on their system
BUILD_ARM64=""
echo "💡 ARM64: Build natively on ARM64 Linux for best compatibility"
echo ""

cd "$FRAMEWORK_DIR"

# ============================================
# 4. Pack everything into single executables
# ============================================
echo "📦 Packing single executables..."

# Check if Steamworks is enabled
STEAM_SO_X64=""
STEAM_SO_ARM64=""
CONFIG_FILE="$PROJECT_DIR/bakery.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        STEAM_SO_X64="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so"
        # Note: Steam doesn't provide ARM64 Linux binaries yet, but we prepare for it
        STEAM_SO_ARM64="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux_arm64/libsteam_api.so"
        
        if [ -f "$STEAM_SO_X64" ]; then
            echo "🎮 Embedding Steam SDK (x86_64) into executable..."
        else
            echo "⚠️  Steam SDK (x86_64) not found at: $STEAM_SO_X64"
            STEAM_SO_X64=""
        fi
    fi
fi

# Pack x86_64 executable
echo "📦 Packing x86_64 executable..."
bun scripts/pack-linux-single-exe.ts \
    "$BUILD_EMBEDDED/bakery-universal-launcher-linux-embedded" \
    "$BUILD_X64/bakery-launcher-linux" \
    "$OUTPUT_DIR/${APP_NAME}-x86_64" \
    $STEAM_SO_X64

echo "✅ x86_64 executable packed!"
echo ""

# ARM64: Skipped (requires native build on ARM64 Linux)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Linux Single Executable complete!"
echo ""
echo "📦 Output:"
echo "   $OUTPUT_DIR/${APP_NAME}-x86_64"
echo ""
echo "📊 Size:"
du -h "$OUTPUT_DIR/${APP_NAME}-x86_64" | awk '{print "   " $2 ": " $1}'
echo ""
echo "🔐 Everything embedded (launcher + binary + assets + Steam)"
echo ""
echo "🎯 User experience:"
echo "   → Download: ${APP_NAME}-x86_64"
echo "   → chmod +x ${APP_NAME}-x86_64"
echo "   → ./${APP_NAME}-x86_64"
echo "   → Everything embedded, instant launch!"
echo ""
echo "💡 ARM64 Linux: Build natively on your system for best compatibility"
echo ""


