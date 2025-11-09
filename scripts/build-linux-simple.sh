#!/bin/bash
# Simple Linux build - creates AppDir structure only
# User can build final binary on Linux system or use CI/CD

set -e

PROJECT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <project_dir> <output_dir>"
    exit 1
fi

echo "🐧 Creating Linux AppDir Templates"
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
# 2. Create AppDir templates
# ============================================
for ARCH in x86_64 aarch64; do
    echo ""
    echo "📦 Creating $ARCH AppDir template..."
    APPDIR="$OUTPUT_DIR/${PROJECT_NAME}-${ARCH}.AppDir"
    rm -rf "$APPDIR"
    mkdir -p "$APPDIR"
    
    # Placeholder for binary (to be built on Linux)
    cat > "$APPDIR/AppRun" << 'EOFSCRIPT'
#!/bin/bash
DIR="$(dirname "$(readlink -f "$0")")"
exec "$DIR/bakery-launcher" "$@"
EOFSCRIPT
    chmod +x "$APPDIR/AppRun"
    
    # Create build script for Linux
    cat > "$APPDIR/build-on-linux.sh" << 'EOFBUILD'
#!/bin/bash
# Run this script ON LINUX to build the binary

set -e

echo "🔨 Building binary on Linux..."

# Install dependencies
sudo apt-get update
sudo apt-get install -y build-essential cmake pkg-config libgtk-3-dev libwebkit2gtk-4.0-dev

# Build
mkdir -p build
cd build
cmake ../../.. -DCMAKE_BUILD_TYPE=Release
make bakery-launcher -j$(nproc)

# Copy binary
cp bakery-launcher ../bakery-launcher
chmod +x ../bakery-launcher

echo "✅ Binary built! Now you can create AppImage:"
echo "   appimagetool $(basename $(dirname $(pwd)))"
EOFBUILD
    chmod +x "$APPDIR/build-on-linux.sh"
    
    # .desktop file
    cat > "$APPDIR/${PROJECT_NAME}.desktop" << EOF
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
        cp "$PROJECT_DIR/icon.png" "$APPDIR/${PROJECT_NAME}.png"
    fi
    
    # Copy source files for building on Linux
    mkdir -p "$APPDIR/src"
    cp -r launcher/*.cpp launcher/*.h "$APPDIR/src/" 2>/dev/null || true
    cp launcher/CMakeLists.txt "$APPDIR/src/" 2>/dev/null || true
    
    echo "✅ $ARCH AppDir template created!"
done

# ============================================
# 3. Summary
# ============================================
echo ""
echo "✅ Linux AppDir templates complete!"
echo ""
echo "📦 Output:"
ls -d "$OUTPUT_DIR"/*.AppDir 2>/dev/null | while read dir; do
    echo "   $(basename "$dir")"
done

echo ""
echo "🎯 To complete the build:"
echo ""
echo "Option A: Build on Linux machine:"
echo "   1. Copy AppDir folder to Linux"
echo "   2. Run: cd $(basename "$OUTPUT_DIR")/${PROJECT_NAME}-x86_64.AppDir && ./build-on-linux.sh"
echo "   3. Create AppImage: appimagetool ${PROJECT_NAME}-x86_64.AppDir"
echo ""
echo "Option B: Use Docker (recommended):"
echo "   bun cli.ts linux --docker"
echo ""
echo "Option C: Use CI/CD (best for production):"
echo "   Push to GitHub → GitHub Actions builds automatically"

