#!/bin/bash
# Build Windows Single EXE with Encryption Support

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo "🪟 Building Windows Single EXE with Encryption"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# ============================================
# 1. Create ENCRYPTED shared assets (skip if already exists)
# ============================================
if [ -f "$FRAMEWORK_DIR/launcher/bakery-assets" ]; then
    echo "⚡ Using existing shared assets (already built for multi-platform)"
    echo ""
else
    echo "📦 Creating ENCRYPTED shared assets..."
    bun scripts/embed-assets-shared.ts "$PROJECT_DIR" launcher/bakery-assets
    echo ""
fi

# ============================================
# 2. Build x64 launcher with encryption support
# ============================================
echo "🔨 Building x64 launcher..."
BUILD_DIR="$FRAMEWORK_DIR/launcher/build-windows-x64"
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/mingw-w64.cmake
make bakery-launcher-win -j4

if [ ! -f "bakery-launcher-win.exe" ]; then
    echo "❌ x64 launcher build failed!"
    exit 1
fi

echo "✅ x64 launcher: $(du -h bakery-launcher-win.exe | awk '{print $1}')"
echo ""

# ============================================
# 3. Build embedded launcher wrapper
# ============================================
echo "🔨 Building embedded launcher wrapper..."
BUILD_EMBEDDED="$FRAMEWORK_DIR/launcher/build-windows-embedded"
mkdir -p "$BUILD_EMBEDDED"
cd "$BUILD_EMBEDDED"

cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/mingw-w64.cmake
make bakery-universal-launcher-windows-embedded -j4

if [ ! -f "bakery-universal-launcher-windows-embedded.exe" ]; then
    echo "❌ Embedded launcher build failed!"
    exit 1
fi

echo "✅ Embedded launcher: $(du -h bakery-universal-launcher-windows-embedded.exe | awk '{print $1}')"
echo ""

# ============================================
# 4. Pack into single EXE
# ============================================
echo "📦 Packing into single EXE..."
cd "$FRAMEWORK_DIR"

# Create output directory
mkdir -p "$PROJECT_DIR/dist/windows"

bun scripts/pack-windows-single-exe.ts \
    "$BUILD_EMBEDDED/bakery-universal-launcher-windows-embedded.exe" \
    "$BUILD_DIR/bakery-launcher-win.exe" \
    "$PROJECT_DIR/dist/windows/${APP_NAME}.exe"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Windows Single EXE complete!"
echo ""
echo "📦 Output: $PROJECT_DIR/dist/windows/${APP_NAME}.exe"
echo "📊 Size: $(du -h "$PROJECT_DIR/dist/windows/${APP_NAME}.exe" | awk '{print $1}')"
echo "🔐 Assets encrypted with XOR + multi-key rotation"
echo ""
echo "🎯 User experience:"
echo "   → Double-click ${APP_NAME}.exe"
echo "   → Everything embedded (launcher + assets)"
echo "   → Instant launch with encryption!"
echo ""

