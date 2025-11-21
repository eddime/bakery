#!/bin/bash
# Build Windows Single EXE with Encryption Support

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo " Building Windows Single EXE with Encryption"
echo ""
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# ============================================
# 1. Create ENCRYPTED shared assets (ALWAYS rebuild!)
# ============================================
echo " Creating ENCRYPTED shared assets..."
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" launcher/gemcore-assets
echo ""

# ============================================
# 2. Build x64 launcher with encryption support
# ============================================
echo " Building x64 launcher..."

# Check if Steamworks is enabled in config
STEAMWORKS_ENABLED="OFF"
CONFIG_FILE="$PROJECT_DIR/gemcore.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        STEAMWORKS_ENABLED="ON"
        echo " Steamworks: ENABLED"
    fi
fi

# Use prebuilt launcher (always with Steamworks)
echo " Using prebuilt Windows launcher (x64 with Steamworks)..."
PREBUILT_LAUNCHER="$FRAMEWORK_DIR/launcher/prebuilt/windows/gemcore-launcher-win-x64.exe"

if [ ! -f "$PREBUILT_LAUNCHER" ]; then
    echo " ERROR: Prebuilt launcher not found: $PREBUILT_LAUNCHER"
    echo " Please rebuild launchers with: cd launcher && ./rebuild-prebuilt.sh"
    exit 1
fi

BUILD_DIR="$FRAMEWORK_DIR/launcher/build-windows-x64"
mkdir -p "$BUILD_DIR"
cp "$PREBUILT_LAUNCHER" "$BUILD_DIR/gemcore-launcher-win.exe"

echo " x64 launcher: $(du -h "$BUILD_DIR/gemcore-launcher-win.exe" | awk '{print $1}') (from prebuilt)"
echo ""

# ============================================
# 3. Build embedded launcher wrapper
# ============================================
echo " Building embedded launcher wrapper..."
BUILD_EMBEDDED="$FRAMEWORK_DIR/launcher/build-windows-embedded"
mkdir -p "$BUILD_EMBEDDED"
cd "$BUILD_EMBEDDED"

cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/mingw-w64.cmake -DENABLE_STEAMWORKS=$STEAMWORKS_ENABLED
make gemcore-universal-launcher-windows-embedded -j4

if [ ! -f "gemcore-universal-launcher-windows-embedded.exe" ]; then
    echo " Embedded launcher build failed!"
    exit 1
fi

echo " Embedded launcher: $(du -h gemcore-universal-launcher-windows-embedded.exe | awk '{print $1}')"
echo ""

# ============================================
# 4. Pack into single EXE (with Steam DLL if enabled)
# ============================================
echo " Packing into single EXE..."
cd "$FRAMEWORK_DIR"

# Create output directory
mkdir -p "$PROJECT_DIR/dist/windows"

# Check if Steamworks is enabled
STEAM_DLL_ARG=""
CONFIG_FILE="$PROJECT_DIR/gemcore.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        STEAM_DLL="$FRAMEWORK_DIR/bin/steamworks/windows/steam_api64.dll"
        if [ -f "$STEAM_DLL" ]; then
            STEAM_DLL_ARG="$STEAM_DLL"
            echo " Embedding Steam SDK into EXE..."
        else
            echo "  Steam SDK not found at: $STEAM_DLL"
        fi
    fi
fi

bun scripts/pack-windows-single-exe.ts \
    "$BUILD_EMBEDDED/gemcore-universal-launcher-windows-embedded.exe" \
    "$BUILD_DIR/gemcore-launcher-win.exe" \
    "$PROJECT_DIR/dist/windows/${APP_NAME}.exe" \
    $STEAM_DLL_ARG

echo ""
echo ""
echo " Windows Single EXE complete!"
echo ""
echo " Output: $PROJECT_DIR/dist/windows/${APP_NAME}.exe"
echo " Size: $(du -h "$PROJECT_DIR/dist/windows/${APP_NAME}.exe" | awk '{print $1}')"
echo " Assets encrypted with XOR + multi-key rotation"
echo ""
echo " User experience:"
echo "   � Double-click ${APP_NAME}.exe"
echo "   � Everything embedded (launcher + assets)"
echo "   � Instant launch with encryption!"
echo ""


