#!/bin/bash
# Cross-platform Linux build using headless launcher (NO GTK dependencies!)

set -e

PROJECT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <project_dir> <output_dir>"
    exit 1
fi

echo "🐧 Building Linux (Headless - works on ANY OS!)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."
PROJECT_NAME=$(basename "$PROJECT_DIR")

# ============================================
# 1. Embed assets
# ============================================
echo "📦 Embedding assets..."
bun scripts/embed-assets-binary.ts "$PROJECT_DIR" launcher/embedded-assets.h

# ============================================
# 2. Build x86_64 headless
# ============================================
echo ""
echo "🔨 Building x86_64 headless binary..."
mkdir -p launcher/build-linux-headless-x64
cd launcher/build-linux-headless-x64

cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
make bakery-launcher-headless -j4

echo "✅ x86_64 binary done!"
cd ../..

# Create AppDir
APPDIR_X64="$OUTPUT_DIR/${PROJECT_NAME}-x86_64.AppDir"
rm -rf "$APPDIR_X64"
mkdir -p "$APPDIR_X64"

cp launcher/build-linux-headless-x64/bakery-launcher-headless "$APPDIR_X64/AppRun"
chmod +x "$APPDIR_X64/AppRun"

# .desktop file
cat > "$APPDIR_X64/${PROJECT_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${PROJECT_NAME}
Exec=AppRun
Icon=${PROJECT_NAME}
Categories=Game;
Terminal=false
EOF

# Icon
if [ -f "$PROJECT_DIR/icon.png" ]; then
    cp "$PROJECT_DIR/icon.png" "$APPDIR_X64/${PROJECT_NAME}.png"
fi

echo "✅ x86_64 AppDir created!"

# ============================================
# 3. Build aarch64 headless
# ============================================
echo ""
echo "🔨 Building aarch64 headless binary..."

if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
    echo "⚠️  aarch64 toolchain not found, skipping ARM64"
    echo "   Install: brew install FiloSottile/musl-cross/musl-cross"
else
    mkdir -p launcher/build-linux-headless-arm64
    cd launcher/build-linux-headless-arm64

    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake
    make bakery-launcher-headless -j4

    echo "✅ aarch64 binary done!"
    cd ../..

    # Create AppDir
    APPDIR_ARM="$OUTPUT_DIR/${PROJECT_NAME}-aarch64.AppDir"
    rm -rf "$APPDIR_ARM"
    mkdir -p "$APPDIR_ARM"

    cp launcher/build-linux-headless-arm64/bakery-launcher-headless "$APPDIR_ARM/AppRun"
    chmod +x "$APPDIR_ARM/AppRun"

    # .desktop file
    cat > "$APPDIR_ARM/${PROJECT_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${PROJECT_NAME}
Exec=AppRun
Icon=${PROJECT_NAME}
Categories=Game;
Terminal=false
EOF

    # Icon
    if [ -f "$PROJECT_DIR/icon.png" ]; then
        cp "$PROJECT_DIR/icon.png" "$APPDIR_ARM/${PROJECT_NAME}.png"
    elif [ -f "$APPDIR_X64/${PROJECT_NAME}.png" ]; then
        cp "$APPDIR_X64/${PROJECT_NAME}.png" "$APPDIR_ARM/${PROJECT_NAME}.png"
    fi

    echo "✅ aarch64 AppDir created!"
fi

# ============================================
# Summary
# ============================================
echo ""
echo "✅ Linux builds complete!"
echo ""
echo "📦 Output:"
ls -d "$OUTPUT_DIR"/*.AppDir 2>/dev/null | while read dir; do
    size=$(du -sh "$dir" 2>/dev/null | cut -f1)
    echo "   $(basename "$dir") → $size"
done

echo ""
echo "💡 Headless mode:"
echo "   ✓ NO GTK/WebKit dependencies!"
echo "   ✓ Opens system browser (Chrome/Firefox)"
echo "   ✓ Cross-compile from ANY OS!"
echo ""
echo "🎯 To create AppImages:"
echo "   appimagetool ${PROJECT_NAME}-x86_64.AppDir"
echo "   appimagetool ${PROJECT_NAME}-aarch64.AppDir"

