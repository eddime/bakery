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
# 3. Build ARM64 launcher binary
# ============================================
echo "🔨 Building ARM64 launcher binary..."

# Try to use pre-built binary from GitHub (with WebKitGTK!)
PREBUILT_ARM64="$FRAMEWORK_DIR/bin/linux-arm64/bakery-launcher"
BUILD_ARM64="$FRAMEWORK_DIR/launcher/build-linux-arm64-embedded"
LAUNCHER_ARM64="$BUILD_ARM64/bakery-launcher-linux"

if [[ -f "$PREBUILT_ARM64" ]]; then
    echo "✅ Using pre-built binary (with WebKitGTK support!)"
    mkdir -p "$BUILD_ARM64"
    cp "$PREBUILT_ARM64" "$LAUNCHER_ARM64"
    chmod +x "$LAUNCHER_ARM64"
    BUILD_ARM64="$BUILD_ARM64"
elif [[ $(uname) == "Linux" ]] && [[ $(uname -m) == "aarch64" ]]; then
    # Native ARM64 Linux build (with WebKitGTK)
    mkdir -p "$BUILD_ARM64"
    cd "$BUILD_ARM64"
    cmake .. -DCMAKE_BUILD_TYPE=Release
    make bakery-launcher-linux -j4
    
    if [ ! -f "bakery-launcher-linux" ]; then
        echo "⚠️  ARM64 build failed! Skipping."
        BUILD_ARM64=""
    else
        echo "✅ ARM64 launcher built"
    fi
else
    # Cross-compile from macOS or x86_64 Linux (fallback, no WebKitGTK)
    echo "⚠️  Cross-compiling ARM64 (no WebKitGTK - will use system browser)"
    if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
        echo "⚠️  aarch64-linux-musl-gcc not found! Skipping ARM64 build."
        echo "💡 Install: brew install FiloSottile/musl-cross/musl-cross"
        BUILD_ARM64=""
    else
        mkdir -p "$BUILD_ARM64"
        cd "$BUILD_ARM64"
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
        STEAM_SO_X64="$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so"
        # Note: Using same .so for ARM64 (should be compatible)
        STEAM_SO_ARM64="$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so"
        
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


