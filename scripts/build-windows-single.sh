#!/bin/bash
# Build Windows Single Executable (x64) with embedded assets/config

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT_DIR="$PROJECT_DIR/dist/windows"
mkdir -p "$OUTPUT_DIR"

cd "$FRAMEWORK_DIR"

# ============================================
# 1. Create encrypted shared assets file
# ============================================
echo "📦 Creating ENCRYPTED shared assets file..."
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" launcher/bakery-assets

# ============================================
# 2. Build x64 launcher with MinGW
# ============================================
echo ""
echo "🔨 Building x64 launcher (MinGW)..."

if ! command -v x86_64-w64-mingw32-gcc >/dev/null 2>&1; then
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
cmake --build . --target bakery-launcher-win -j4

if [ ! -f "bakery-launcher-win.exe" ]; then
    echo "❌ Failed to build bakery-launcher-win.exe"
    exit 1
fi

cd "$FRAMEWORK_DIR"

# ============================================
# 3. Build embedded launcher stub
# ============================================
echo ""
echo "🔨 Building embedded launcher stub..."

mkdir -p launcher/build-windows-embedded
cd launcher/build-windows-embedded

export CROSS_COMPILE=1
cmake .. \
    -DCMAKE_C_COMPILER=x86_64-w64-mingw32-gcc \
    -DCMAKE_CXX_COMPILER=x86_64-w64-mingw32-g++ \
    -DCMAKE_SYSTEM_NAME=Windows \
    -DCMAKE_RC_COMPILER=x86_64-w64-mingw32-windres \
    -DCMAKE_BUILD_TYPE=Release
cmake --build . --target bakery-universal-launcher-windows-embedded -j4

if [ ! -f "bakery-universal-launcher-windows-embedded.exe" ]; then
    echo "❌ Failed to build embedded launcher stub"
    exit 1
fi

cd "$FRAMEWORK_DIR"

# ============================================
# 4. Pack into single EXE
# ============================================
echo ""
echo "📦 Packing into single EXE..."

PACKED_OUTPUT="$OUTPUT_DIR/${APP_NAME}.exe"
bun scripts/pack-windows-single-exe.ts \
    launcher/build-windows-embedded/bakery-universal-launcher-windows-embedded.exe \
    launcher/build-windows-x64/bakery-launcher-win.exe \
    launcher/bakery-assets \
    "$PROJECT_DIR/bakery.config.json" \
    "$PACKED_OUTPUT"

# ============================================
# 5. Done
# ============================================
SIZE=$(du -h "$PACKED_OUTPUT" | awk '{print $1}')

echo ""
echo "✅ Windows single EXE ready!"
echo "   → $PACKED_OUTPUT ($SIZE)"
echo "   → Assets + config embedded"
