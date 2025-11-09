#!/bin/bash
# Build Windows with Shared Assets (x64 only)

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo "🪟 Building Windows (x64 with Shared Assets)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."

# ============================================
# 1. Create ENCRYPTED shared assets file
# ============================================
echo "📦 Creating ENCRYPTED shared assets file..."
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" launcher/bakery-assets

# ============================================
# 2. Build x64 binary with MinGW
# ============================================
echo ""
echo "🔨 Building x64 binary with MinGW..."

# Check for MinGW
if ! command -v x86_64-w64-mingw32-gcc &> /dev/null; then
    echo "❌ x86_64-w64-mingw32-gcc not found!"
    echo "💡 Install with: brew install mingw-w64"
    exit 1
fi

mkdir -p launcher/build-windows-x64
cd launcher/build-windows-x64

export CROSS_COMPILE=1
cmake .. \
    -DCMAKE_C_COMPILER=x86_64-w64-mingw32-gcc \
    -DCMAKE_CXX_COMPILER=x86_64-w64-mingw32-g++ \
    -DCMAKE_SYSTEM_NAME=Windows \
    -DCMAKE_RC_COMPILER=x86_64-w64-mingw32-windres \
    -DCMAKE_BUILD_TYPE=Release

make bakery-launcher-win -j4

if [ ! -f "bakery-launcher-win.exe" ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Windows x64 done!"

cd ../..

# ============================================
# 3. Package everything
# ============================================
echo ""
echo "📦 Packaging Windows distribution..."

DIST_DIR="$PROJECT_DIR/dist/windows"
mkdir -p "$DIST_DIR"

# Copy launcher
cp launcher/build-windows-x64/bakery-launcher-win.exe "$DIST_DIR/${APP_NAME}.exe"

# Copy assets
cp launcher/bakery-assets "$DIST_DIR/"

# Copy config
cp "$PROJECT_DIR/bakery.config.json" "$DIST_DIR/"

echo ""
echo "✅ Windows build complete!"
echo "📦 Output: $DIST_DIR"
echo "📊 Files:"
ls -lh "$DIST_DIR" | tail -n +2

echo ""
echo "💡 Distribute the entire folder (EXE + bakery-assets + config)"

