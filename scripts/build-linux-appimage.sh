#!/bin/bash
# Build Linux AppImage with all dependencies bundled
# This allows the game to run on any Linux distribution without WebKitGTK pre-installed

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo " Building Linux AppImage"
echo ""
echo ""
echo "  AppImage requires native Linux build!"
echo " This script should run on Linux (or via GitHub Actions)"
echo ""

# Check if we're on Linux
if [[ $(uname) != "Linux" ]]; then
    echo " AppImage can only be built on Linux!"
    echo " Options:"
    echo "   1. Build on a Linux machine"
    echo "   2. Use GitHub Actions (recommended)"
    echo "   3. Use Docker with Linux container"
    echo ""
    exit 1
fi

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output directory
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

# ============================================
# 1. Build launcher with WebKitGTK
# ============================================
echo " Building launcher with WebKitGTK..."
BUILD_DIR="$FRAMEWORK_DIR/launcher/build-linux-appimage"
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

# Check if WebKitGTK is installed
if ! pkg-config --exists webkit2gtk-4.1 && ! pkg-config --exists webkit2gtk-4.0; then
    echo " WebKitGTK not found!"
    echo " Install: sudo apt-get install libwebkit2gtk-4.1-dev libgtk-3-dev"
    exit 1
fi

cmake .. -DCMAKE_BUILD_TYPE=Release -DENABLE_STEAMWORKS=OFF
make gemcore-launcher-linux -j$(nproc)

if [ ! -f "gemcore-launcher-linux" ]; then
    echo " Launcher build failed!"
    exit 1
fi

echo " Launcher built"
echo ""

# ============================================
# 2. Create AppDir structure
# ============================================
echo " Creating AppDir structure..."
cd "$FRAMEWORK_DIR"

APPDIR="$BUILD_DIR/${APP_NAME}.AppDir"
rm -rf "$APPDIR"
mkdir -p "$APPDIR/usr/bin"
mkdir -p "$APPDIR/usr/lib"
mkdir -p "$APPDIR/usr/share/applications"
mkdir -p "$APPDIR/usr/share/icons/hicolor/256x256/apps"

# Copy launcher
cp "$BUILD_DIR/gemcore-launcher-linux" "$APPDIR/usr/bin/${APP_NAME}"

# Copy assets
echo " Embedding assets..."
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" "$APPDIR/usr/bin/gemcore-assets"

# Copy WebKitGTK and dependencies
echo " Bundling WebKitGTK dependencies..."
# This will be handled by linuxdeploy

# Copy icon if available
ICON_PATH="$PROJECT_DIR/assets/icon.png"
if [ -f "$ICON_PATH" ]; then
    cp "$ICON_PATH" "$APPDIR/usr/share/icons/hicolor/256x256/apps/${APP_NAME}.png"
    cp "$ICON_PATH" "$APPDIR/${APP_NAME}.png"
    echo " Icon copied"
fi

# Create .desktop file
cat > "$APPDIR/usr/share/applications/${APP_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${APP_NAME}
Exec=${APP_NAME}
Icon=${APP_NAME}
Categories=Game;
Terminal=false
EOF

cp "$APPDIR/usr/share/applications/${APP_NAME}.desktop" "$APPDIR/${APP_NAME}.desktop"

# Create AppRun script
cat > "$APPDIR/AppRun" << 'EOF'
#!/bin/bash
SELF=$(readlink -f "$0")
HERE=${SELF%/*}
export PATH="${HERE}/usr/bin:${PATH}"
export LD_LIBRARY_PATH="${HERE}/usr/lib:${LD_LIBRARY_PATH}"
exec "${HERE}/usr/bin/${APP_NAME}" "$@"
EOF

chmod +x "$APPDIR/AppRun"

echo " AppDir created"
echo ""

# ============================================
# 3. Download linuxdeploy and create AppImage
# ============================================
echo " Creating AppImage with linuxdeploy..."

LINUXDEPLOY="$BUILD_DIR/linuxdeploy-x86_64.AppImage"
if [ ! -f "$LINUXDEPLOY" ]; then
    echo "  Downloading linuxdeploy..."
    wget -q "https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/linuxdeploy-x86_64.AppImage" -O "$LINUXDEPLOY"
    chmod +x "$LINUXDEPLOY"
fi

# Create AppImage
cd "$BUILD_DIR"
"$LINUXDEPLOY" --appdir "$APPDIR" --output appimage

# Find generated AppImage
APPIMAGE=$(ls ${APP_NAME}*.AppImage | head -1)

if [ -z "$APPIMAGE" ]; then
    echo " AppImage creation failed!"
    exit 1
fi

# Move to output directory
mv "$APPIMAGE" "$OUTPUT_DIR/${APP_NAME}-x86_64.AppImage"
chmod +x "$OUTPUT_DIR/${APP_NAME}-x86_64.AppImage"

echo ""
echo ""
echo " Linux AppImage complete!"
echo ""
echo " Output: $OUTPUT_DIR/${APP_NAME}-x86_64.AppImage"
echo " Size: $(du -h "$OUTPUT_DIR/${APP_NAME}-x86_64.AppImage" | awk '{print $1}')"
echo ""
echo " User experience:"
echo "   † Download: ${APP_NAME}-x86_64.AppImage"
echo "   † chmod +x ${APP_NAME}-x86_64.AppImage"
echo "   † ./${APP_NAME}-x86_64.AppImage"
echo "   † Works on ANY Linux distribution!"
echo ""
echo " All dependencies bundled (including WebKitGTK)"
echo ""

