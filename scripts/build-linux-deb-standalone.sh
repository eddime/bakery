#!/bin/bash
# Build standalone .deb package for Linux
# Builds binary + .deb in one step (no AppImage needed)
# x86_64 ONLY - optimized for .deb distribution

set -e

PROJECT_DIR="$1"
APP_NAME="$2"
VERSION="$3"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ] || [ -z "$VERSION" ]; then
    echo "Usage: $0 <project_dir> <app_name> <version>"
    exit 1
fi

echo " Building Linux .deb package (x86_64 only)"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output to dist/linux
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

# ============================================
# 1. Build x86_64 launcher binary (with WebKitGTK)
# ============================================
echo " Building x86_64 launcher binary..."
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

# Check if pre-built binary is cached (like Neutralino!)
PREBUILT_DIR="$FRAMEWORK_DIR/launcher/prebuilt/linux"
PREBUILT_BINARY="$PREBUILT_DIR/gemcore-launcher-linux-x64"

if [ -f "$PREBUILT_BINARY" ]; then
    echo " Using cached pre-built x64 binary (with WebKitGTK)"
    cp "$PREBUILT_BINARY" "gemcore-launcher-linux"
    chmod +x "gemcore-launcher-linux"
else
    echo " Pre-built binary not found - please build on Linux or provide prebuilt binary"
    exit 1
fi

echo " x86_64 launcher ready"
echo ""

cd "$FRAMEWORK_DIR"

# ============================================
# 2. Embed assets
# ============================================
echo " Embedding assets..."
ASSETS_PATH="$BUILD_X64/gemcore-assets"
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" "$ASSETS_PATH"

if [ ! -f "$ASSETS_PATH" ]; then
    echo " Failed to embed assets!"
    exit 1
fi

echo " Assets embedded: $(du -h "$ASSETS_PATH" | awk '{print $1}')"
echo ""

# ============================================
# 3. Pack standalone executable (with embedded assets + Steam)
# ============================================
echo " Packing standalone executable..."

# Check if Steamworks is enabled
STEAM_SO_X64=""
CONFIG_FILE="$PROJECT_DIR/gemcore.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        if [ -f "$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so" ]; then
            STEAM_SO_X64="$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so"
        elif [ -f "$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so" ]; then
            STEAM_SO_X64="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so"
        fi
        
        if [ -n "$STEAM_SO_X64" ] && [ -f "$STEAM_SO_X64" ]; then
            echo " Embedding Steam SDK (x86_64) into executable..."
        fi
    fi
fi

# Create standalone executable
BINARY_OUTPUT="$OUTPUT_DIR/${APP_NAME}-x86_64"
cp "$BUILD_X64/gemcore-launcher-linux" "$BINARY_OUTPUT"
chmod +x "$BINARY_OUTPUT"

# Copy assets alongside binary (launcher will find it)
cp "$ASSETS_PATH" "$OUTPUT_DIR/gemcore-assets"

# Copy Steam SDK if enabled
if [ -n "$STEAM_SO_X64" ] && [ -f "$STEAM_SO_X64" ]; then
    cp "$STEAM_SO_X64" "$OUTPUT_DIR/libsteam_api.so"
    echo " Steam SDK copied"
fi

echo " Standalone executable created: $(du -h "$BINARY_OUTPUT" | awk '{print $1}')"
echo ""

# ============================================
# 4. Build .deb package from standalone binary
# ============================================
echo " Building .deb package..."

# Load config to get app info
CONFIG_PATH="$PROJECT_DIR/gemcore.config.js"
APP_TITLE="$APP_NAME"
ICON_PATH=""

if [ -f "$CONFIG_PATH" ]; then
    APP_TITLE=$(grep -o 'title:[[:space:]]*"[^"]*"' "$CONFIG_PATH" | head -1 | sed 's/title:[[:space:]]*"\(.*\)"/\1/' || echo "$APP_NAME")
    ICON_PATH=$(grep -o 'icon:[[:space:]]*"[^"]*"' "$CONFIG_PATH" | head -1 | sed 's/icon:[[:space:]]*"\(.*\)"/\1/' || echo "")
fi

echo " App Title: $APP_TITLE"
echo " Version: $VERSION"
echo ""

# Find icon
ICON_SOURCE=""
if [ -n "$ICON_PATH" ]; then
    if [ -f "$PROJECT_DIR/$ICON_PATH" ]; then
        ICON_SOURCE="$PROJECT_DIR/$ICON_PATH"
    elif [ -f "$PROJECT_DIR/assets/$ICON_PATH" ]; then
        ICON_SOURCE="$PROJECT_DIR/assets/$ICON_PATH"
    elif [ -f "$PROJECT_DIR/assets/icon.png" ]; then
        ICON_SOURCE="$PROJECT_DIR/assets/icon.png"
    fi
fi

# Use native Bun .deb builder (include binary + assets + Steam)
cd "$FRAMEWORK_DIR"

# Build args: binary, name, version, icon, assets, steam.so
ASSETS_ARG="$OUTPUT_DIR/gemcore-assets"
STEAM_ARG=""
if [ -n "$STEAM_SO_X64" ] && [ -f "$STEAM_SO_X64" ]; then
    STEAM_ARG="$OUTPUT_DIR/libsteam_api.so"
fi

if [ -n "$ICON_SOURCE" ] && [ -f "$ICON_SOURCE" ]; then
    if [ -n "$STEAM_ARG" ]; then
        bun scripts/build-deb-native.ts "$BINARY_OUTPUT" "$APP_NAME" "$VERSION" "$ICON_SOURCE" "$ASSETS_ARG" "$STEAM_ARG"
    else
        bun scripts/build-deb-native.ts "$BINARY_OUTPUT" "$APP_NAME" "$VERSION" "$ICON_SOURCE" "$ASSETS_ARG"
    fi
else
    if [ -n "$STEAM_ARG" ]; then
        bun scripts/build-deb-native.ts "$BINARY_OUTPUT" "$APP_NAME" "$VERSION" "" "$ASSETS_ARG" "$STEAM_ARG"
    else
        bun scripts/build-deb-native.ts "$BINARY_OUTPUT" "$APP_NAME" "$VERSION" "" "$ASSETS_ARG"
    fi
fi

# Move .deb to output directory
DEB_FILE="${APP_NAME}_${VERSION}_amd64.deb"
if [ -f "$FRAMEWORK_DIR/$DEB_FILE" ]; then
    mv "$FRAMEWORK_DIR/$DEB_FILE" "$OUTPUT_DIR/$DEB_FILE"
    
    # Get file size
    FILE_SIZE=$(du -h "$OUTPUT_DIR/$DEB_FILE" | awk '{print $1}')
    
    echo ""
    echo " .deb package created successfully!"
    echo ""
    echo " Output: $OUTPUT_DIR/$DEB_FILE ($FILE_SIZE)"
    echo ""
    echo " Installation:"
    echo "   sudo apt install ./$DEB_FILE"
    echo ""
    echo " Uninstallation:"
    echo "   sudo apt remove ${APP_NAME}"
    echo ""
    echo " After installation:"
    echo "   - Double-click '${APP_TITLE}' in application menu"
    echo "   - Or run from terminal: ${APP_NAME}"
    echo ""
else
    echo " Failed to create .deb package!"
    exit 1
fi

# Cleanup intermediate files
echo " Cleaning up intermediate files..."
rm -f "$BINARY_OUTPUT" 2>/dev/null || true
rm -f "$OUTPUT_DIR/gemcore-assets" 2>/dev/null || true
rm -f "$OUTPUT_DIR/libsteam_api.so" 2>/dev/null || true
echo ""

echo " Build complete! Single .deb file with everything embedded!"
echo ""

