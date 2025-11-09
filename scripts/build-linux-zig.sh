#!/bin/bash
# Build Linux using Zig as cross-compiler (works on macOS/Windows/Linux!)

set -e

PROJECT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <project_dir> <output_dir>"
    exit 1
fi

echo "🐧 Building Linux using Zig CC (Universal Cross-Compiler)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Zig is installed
if ! command -v zig &> /dev/null; then
    echo "❌ Zig not found!"
    echo ""
    echo "💡 Install Zig (one-time setup):"
    echo "   brew install zig"
    echo ""
    echo "   Or download from: https://ziglang.org/download/"
    exit 1
fi

echo "✅ Zig found: $(zig version)"
echo ""

cd "$(dirname "$0")/.."
PROJECT_NAME=$(basename "$PROJECT_DIR")

# ============================================
# 1. Embed assets
# ============================================
echo "📦 Embedding assets..."
bun scripts/embed-assets-binary.ts "$PROJECT_DIR" launcher/embedded-assets.h

# ============================================
# 2. Build x86_64 with Zig
# ============================================
echo ""
echo "🔨 Building x86_64 binary with Zig CC..."
mkdir -p launcher/build-linux-zig-x64
cd launcher/build-linux-zig-x64

cmake .. \
    -DCMAKE_C_COMPILER="$(which zig);cc;-target;x86_64-linux-musl" \
    -DCMAKE_CXX_COMPILER="$(which zig);c++;-target;x86_64-linux-musl" \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_SYSTEM_NAME=Linux \
    -DCMAKE_SYSTEM_PROCESSOR=x86_64

make bakery-launcher -j4 || {
    echo "⚠️  x86_64 build failed (probably GTK headers missing)"
    echo "   Zig can compile but WebView needs GTK at compile-time"
    echo "   Falling back to Docker for full build..."
    cd ../..
    exit 1
}

echo "✅ x86_64 binary done!"
cd ../..

# Create AppDir
echo ""
echo "📦 Creating x86_64 AppDir..."
APPDIR_X64="$OUTPUT_DIR/${PROJECT_NAME}-x86_64.AppDir"
rm -rf "$APPDIR_X64"
mkdir -p "$APPDIR_X64"

cp launcher/build-linux-zig-x64/bakery-launcher "$APPDIR_X64/AppRun"
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
# 3. Build aarch64 with Zig
# ============================================
echo ""
echo "🔨 Building aarch64 binary with Zig CC..."
mkdir -p launcher/build-linux-zig-arm64
cd launcher/build-linux-zig-arm64

cmake .. \
    -DCMAKE_C_COMPILER="$(which zig);cc;-target;aarch64-linux-musl" \
    -DCMAKE_CXX_COMPILER="$(which zig);c++;-target;aarch64-linux-musl" \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_SYSTEM_NAME=Linux \
    -DCMAKE_SYSTEM_PROCESSOR=aarch64

make bakery-launcher -j4 || {
    echo "⚠️  aarch64 build failed"
    cd ../..
    echo ""
    echo "✅ x86_64 AppDir available, ARM64 skipped"
    exit 0
}

echo "✅ aarch64 binary done!"
cd ../..

# Create AppDir
echo ""
echo "📦 Creating aarch64 AppDir..."
APPDIR_ARM="$OUTPUT_DIR/${PROJECT_NAME}-aarch64.AppDir"
rm -rf "$APPDIR_ARM"
mkdir -p "$APPDIR_ARM"

cp launcher/build-linux-zig-arm64/bakery-launcher "$APPDIR_ARM/AppRun"
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

# ============================================
# Summary
# ============================================
echo ""
echo "✅ Linux builds complete!"
echo ""
echo "📦 Output:"
ls -d "$OUTPUT_DIR"/*.AppDir 2>/dev/null | while read dir; do
    echo "   $(basename "$dir")"
done

echo ""
echo "🎯 Built with Zig - works on ANY OS!"
echo "   No Docker, no complex toolchains!"

