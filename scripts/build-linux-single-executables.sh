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

echo "🐧 Building Linux Single Executables (x86_64 + ARM64)"
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

if [[ $(uname) == "Linux" ]]; then
    # Native Linux build
    cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
else
    # Cross-compile from macOS
    if ! command -v x86_64-linux-musl-gcc &> /dev/null; then
        echo "❌ x86_64-linux-musl-gcc not found!"
        echo "💡 Install: brew install FiloSottile/musl-cross/musl-cross"
        exit 1
    fi
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
fi

make bakery-universal-launcher-linux-embedded -j4

if [ ! -f "bakery-universal-launcher-linux-embedded" ]; then
    echo "❌ Universal launcher build failed!"
    exit 1
fi

echo "✅ Universal launcher built"
echo ""

# ============================================
# 2. Build x86_64 launcher binary (with WebKitGTK)
# ============================================
echo "🔨 Building x86_64 launcher binary..."
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

# Try to download pre-built binary from GitHub Actions first
GITHUB_REPO="eddime/bakery"
VERSION="latest"
BINARY_URL="https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/bakery-launcher-linux-x64"
DOWNLOADED=false

if [[ $(uname) != "Linux" ]]; then
    echo "📥 Attempting to download pre-built x64 binary (with WebKitGTK) from GitHub Actions..."
    if curl -L -f -o "bakery-launcher-linux" "${BINARY_URL}" 2>/dev/null; then
        chmod +x "bakery-launcher-linux"
        echo "✅ Downloaded pre-built x64 binary (with WebKitGTK)"
        DOWNLOADED=true
    else
        echo "⚠️  Pre-built binary not available, will cross-compile (without WebKitGTK)"
    fi
fi

if [ "$DOWNLOADED" = false ]; then
    if [[ $(uname) == "Linux" ]]; then
        # Native Linux build with WebKitGTK
        cmake .. -DCMAKE_BUILD_TYPE=Release
        make bakery-launcher-linux -j4
    else
        # Cross-compile from macOS (without WebKitGTK - fallback)
        cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
        make bakery-launcher-linux -j4
    fi
    
    if [ ! -f "bakery-launcher-linux" ]; then
        echo "❌ x86_64 build failed!"
        exit 1
    fi
fi

echo "✅ x86_64 launcher ready"
echo ""

# ============================================
# 3. Build ARM64 launcher binary
# ============================================
echo "🔨 Building ARM64 launcher binary..."
BUILD_ARM64="$FRAMEWORK_DIR/launcher/build-linux-arm64-embedded"
mkdir -p "$BUILD_ARM64"
cd "$BUILD_ARM64"

if [[ $(uname) == "Linux" ]] && [[ $(uname -m) == "aarch64" ]]; then
    # Native ARM64 Linux build
    cmake .. -DCMAKE_BUILD_TYPE=Release
else
    # Cross-compile from macOS or x86_64 Linux
    if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
        echo "⚠️  aarch64-linux-musl-gcc not found! Skipping ARM64 build."
        echo "💡 Install: brew install FiloSottile/musl-cross/musl-cross"
        BUILD_ARM64=""
    else
        cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake
        make bakery-launcher-linux -j4
        
        if [ ! -f "bakery-launcher-linux" ]; then
            echo "⚠️  ARM64 build failed! Skipping."
            BUILD_ARM64=""
        else
            echo "✅ ARM64 launcher built"
        fi
    fi
fi

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

# Pack ARM64 executable if built
if [ -n "$BUILD_ARM64" ] && [ -f "$BUILD_ARM64/bakery-launcher-linux" ]; then
    echo "📦 Packing ARM64 executable..."
    
    STEAM_ARG=""
    if [ -f "$STEAM_SO_ARM64" ]; then
        echo "🎮 Embedding Steam SDK (ARM64) into executable..."
        STEAM_ARG="$STEAM_SO_ARM64"
    fi
    
    bun scripts/pack-linux-single-exe.ts \
        "$BUILD_EMBEDDED/bakery-universal-launcher-linux-embedded" \
        "$BUILD_ARM64/bakery-launcher-linux" \
        "$OUTPUT_DIR/${APP_NAME}-arm64" \
        $STEAM_ARG
    
    echo "✅ ARM64 executable packed!"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Linux Single Executables complete!"
echo ""
echo "📦 Output:"
echo "   $OUTPUT_DIR/${APP_NAME}-x86_64"
if [ -n "$BUILD_ARM64" ] && [ -f "$OUTPUT_DIR/${APP_NAME}-arm64" ]; then
    echo "   $OUTPUT_DIR/${APP_NAME}-arm64"
fi
echo ""
echo "📊 Sizes:"
du -h "$OUTPUT_DIR/${APP_NAME}-x86_64" | awk '{print "   " $2 ": " $1}'
if [ -n "$BUILD_ARM64" ] && [ -f "$OUTPUT_DIR/${APP_NAME}-arm64" ]; then
    du -h "$OUTPUT_DIR/${APP_NAME}-arm64" | awk '{print "   " $2 ": " $1}'
fi
echo ""
echo "🔐 Everything embedded (launcher + binary + assets + Steam)"
echo ""
echo "🎯 User experience:"
echo "   → Download: ${APP_NAME}-x86_64 (or -arm64)"
echo "   → chmod +x ${APP_NAME}-x86_64"
echo "   → ./${APP_NAME}-x86_64"
echo "   → Everything embedded, instant launch!"
echo ""


