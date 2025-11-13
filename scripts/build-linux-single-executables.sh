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

echo "🐧 Building Linux Single Executable (x86_64)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output to dist/linux (use absolute path)
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

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
# 2. Build x86_64 launcher binary
# ============================================
echo "🔨 Building x86_64 launcher binary..."
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

if [[ $(uname) == "Linux" ]]; then
    # Native Linux build
    cmake .. -DCMAKE_BUILD_TYPE=Release
else
    # Cross-compile from macOS
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
fi

make bakery-launcher-linux -j4

if [ ! -f "bakery-launcher-linux" ]; then
    echo "❌ x86_64 build failed!"
    exit 1
fi

echo "✅ x86_64 launcher built"
echo ""

cd "$FRAMEWORK_DIR"

# ============================================
# 3. Pack everything into single executable
# ============================================
echo "📦 Packing single executable..."

# Check if Steamworks is enabled
STEAM_SO_ARG=""
CONFIG_FILE="$PROJECT_DIR/bakery.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        STEAM_SO="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so"
        if [ -f "$STEAM_SO" ]; then
            STEAM_SO_ARG="$STEAM_SO"
            echo "🎮 Embedding Steam SDK into executable..."
        else
            echo "⚠️  Steam SDK not found at: $STEAM_SO"
        fi
    fi
fi

bun scripts/pack-linux-single-exe.ts \
    "$BUILD_EMBEDDED/bakery-universal-launcher-linux-embedded" \
    "$BUILD_X64/bakery-launcher-linux" \
    "$OUTPUT_DIR/${APP_NAME}" \
    $STEAM_SO_ARG

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Linux Single Executable complete!"
echo ""
echo "📦 Output:"
echo "   $OUTPUT_DIR/${APP_NAME}"
echo ""
echo "📊 Size:"
du -h "$OUTPUT_DIR/${APP_NAME}" | awk '{print "   " $2 ": " $1}'
echo ""
echo "🔐 Everything embedded (launcher + binary + assets + Steam)"
echo ""
echo "🎯 User experience:"
echo "   → Download: ${APP_NAME}"
echo "   → chmod +x ${APP_NAME}"
echo "   → ./${APP_NAME}"
echo "   → Everything embedded, instant launch!"
echo ""

