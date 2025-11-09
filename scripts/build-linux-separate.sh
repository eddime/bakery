#!/bin/bash
# Build Linux Separate AppImages (x86_64 + aarch64)

set -e

PROJECT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <project_dir> <output_dir>"
    exit 1
fi

echo "🐧 Building Linux Separate AppImages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."

# Get project name
PROJECT_NAME=$(basename "$PROJECT_DIR")

# ============================================
# 1. Embed assets ONCE (shared by all)
# ============================================
echo "📦 Embedding assets..."
bun scripts/embed-assets-binary.ts "$PROJECT_DIR" launcher/embedded-assets.h

# ============================================
# 2. Build x86_64 AppImage
# ============================================
echo ""
echo "🔨 Building x86_64 binary..."
mkdir -p launcher/build-linux-x86_64
cd launcher/build-linux-x86_64

cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
make bakery-launcher -j4
echo "✅ x86_64 binary done!"

cd ../..

# Create x86_64 AppDir
echo ""
echo "📦 Creating x86_64 AppDir..."
APPDIR_X64="$OUTPUT_DIR/${PROJECT_NAME}-x86_64.AppDir"
rm -rf "$APPDIR_X64"
mkdir -p "$APPDIR_X64"

# Copy binary as AppRun
cp launcher/build-linux-x86_64/bakery-launcher "$APPDIR_X64/AppRun"
chmod +x "$APPDIR_X64/AppRun"

# Create .desktop file
cat > "$APPDIR_X64/${PROJECT_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${PROJECT_NAME}
Exec=AppRun
Icon=${PROJECT_NAME}
Categories=Game;
Terminal=false
EOF

# Create default icon (simple 256x256 PNG)
if [ -f "$PROJECT_DIR/icon.png" ]; then
    cp "$PROJECT_DIR/icon.png" "$APPDIR_X64/${PROJECT_NAME}.png"
else
    # Create placeholder icon (using ImageMagick if available)
    if command -v convert &> /dev/null; then
        convert -size 256x256 xc:blue "$APPDIR_X64/${PROJECT_NAME}.png" 2>/dev/null || echo "⚠️  No icon"
    else
        echo "⚠️  No icon.png found"
    fi
fi

echo "✅ x86_64 AppDir created!"

# ============================================
# 3. Build aarch64 AppImage
# ============================================
echo ""
echo "🔨 Building aarch64 binary..."
mkdir -p launcher/build-linux-aarch64
cd launcher/build-linux-aarch64

if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
    echo "⚠️  aarch64-linux-musl-gcc not found, skipping ARM64 build"
    echo "   Install with: brew install FiloSottile/musl-cross/musl-cross"
    cd ../..
else
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake
    make bakery-launcher -j4
    echo "✅ aarch64 binary done!"

    cd ../..

    # Create aarch64 AppDir
    echo ""
    echo "📦 Creating aarch64 AppDir..."
    APPDIR_ARM="$OUTPUT_DIR/${PROJECT_NAME}-aarch64.AppDir"
    rm -rf "$APPDIR_ARM"
    mkdir -p "$APPDIR_ARM"

    # Copy binary as AppRun
    cp launcher/build-linux-aarch64/bakery-launcher "$APPDIR_ARM/AppRun"
    chmod +x "$APPDIR_ARM/AppRun"

    # Create .desktop file
    cat > "$APPDIR_ARM/${PROJECT_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${PROJECT_NAME}
Exec=AppRun
Icon=${PROJECT_NAME}
Categories=Game;
Terminal=false
EOF

    # Copy icon
    if [ -f "$PROJECT_DIR/icon.png" ]; then
        cp "$PROJECT_DIR/icon.png" "$APPDIR_ARM/${PROJECT_NAME}.png"
    elif [ -f "$APPDIR_X64/${PROJECT_NAME}.png" ]; then
        cp "$APPDIR_X64/${PROJECT_NAME}.png" "$APPDIR_ARM/${PROJECT_NAME}.png"
    fi

    echo "✅ aarch64 AppDir created!"
fi

# ============================================
# 4. Summary
# ============================================
echo ""
echo "✅ Linux AppDirs complete!"
echo ""
echo "📦 Output:"
ls -d "$OUTPUT_DIR"/*.AppDir 2>/dev/null | while read dir; do
    echo "   $(basename "$dir")"
done

echo ""
echo "🎯 To create AppImages, you need appimagetool:"
echo ""
echo "   1. Download appimagetool:"
echo "      wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage"
echo "      chmod +x appimagetool-x86_64.AppImage"
echo ""
echo "   2. Create AppImages:"
if [ -d "$APPDIR_X64" ]; then
    echo "      ARCH=x86_64 ./appimagetool-x86_64.AppImage $APPDIR_X64"
fi
if [ -d "$APPDIR_ARM" ]; then
    echo "      ARCH=aarch64 ./appimagetool-x86_64.AppImage $APPDIR_ARM"
fi
echo ""
echo "💡 Or install: brew install appimagetool"
echo ""
echo "📋 Standard Linux approach - separate AppImages per architecture!"

