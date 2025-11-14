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

# Try to download pre-built binaries first (with WebKitGTK!)
if [[ $(uname) != "Linux" ]]; then
    echo "📥 Checking for pre-built binaries (with WebKitGTK support)..."
    if ! [[ -f "$FRAMEWORK_DIR/bin/linux-x64/bakery-launcher" ]] || ! [[ -f "$FRAMEWORK_DIR/bin/linux-arm64/bakery-launcher" ]]; then
        echo "💡 Downloading pre-built binaries from GitHub..."
        cd "$FRAMEWORK_DIR"
        bun scripts/download-binaries.ts || echo "⚠️  Download failed, will cross-compile as fallback"
    fi
fi

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

# Strip debug symbols to reduce size
echo "🔧 Stripping debug symbols from universal launcher..."
strip --strip-all bakery-universal-launcher-linux-embedded 2>/dev/null || echo "⚠️  strip command not found"

echo "✅ Universal launcher built"
echo ""

# ============================================
# 2. Build x86_64 launcher binary
# ============================================
echo "🔨 Building x86_64 launcher binary..."

# Try to use pre-built binary from GitHub (with WebKitGTK!)
PREBUILT_X64="$FRAMEWORK_DIR/bin/linux-x64/bakery-launcher"
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
LAUNCHER_X64="$BUILD_X64/bakery-launcher-linux"

if [[ -f "$PREBUILT_X64" ]]; then
    echo "✅ Using pre-built binary (with WebKitGTK support!)"
    mkdir -p "$BUILD_X64"
    cp "$PREBUILT_X64" "$LAUNCHER_X64"
    chmod +x "$LAUNCHER_X64"
elif [[ $(uname) == "Linux" ]]; then
    # Native Linux build (with WebKitGTK)
    mkdir -p "$BUILD_X64"
    cd "$BUILD_X64"
    cmake .. -DCMAKE_BUILD_TYPE=Release
    make bakery-launcher-linux -j4
    
    if [ ! -f "bakery-launcher-linux" ]; then
        echo "❌ x86_64 build failed!"
        exit 1
    fi
else
    # Cross-compile from macOS (fallback, no WebKitGTK)
    echo "⚠️  Cross-compiling (no WebKitGTK - will use system browser)"
    mkdir -p "$BUILD_X64"
    cd "$BUILD_X64"
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
    make bakery-launcher-linux -j4
    
    if [ ! -f "bakery-launcher-linux" ]; then
        echo "❌ x86_64 build failed!"
        exit 1
    fi
fi

echo "✅ x86_64 launcher ready"
echo ""

# ============================================
# ARM64 support removed (focus on x64 for gaming)
# 99% of Linux gamers use x64 (Steam Deck, etc.)
# ARM64 can be added back via separate command if needed
# ============================================

cd "$FRAMEWORK_DIR"

# ============================================
# 4. Pack everything into single executables
# ============================================
echo "📦 Packing single executables..."

# Check if Steamworks is enabled
STEAM_SO_X64=""
CONFIG_FILE="$PROJECT_DIR/bakery.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        STEAM_SO_X64="$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so"
        
        if [ -f "$STEAM_SO_X64" ]; then
            echo "🎮 Embedding Steam SDK into executable..."
        else
            echo "⚠️  Steam SDK not found at: $STEAM_SO_X64"
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

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Linux x64 build complete!"
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
echo "💡 Optimized for x64 (99% of Linux gamers, Steam Deck, etc.)"
echo ""


