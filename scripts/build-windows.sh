#!/bin/bash
# 🪟 Bakery Windows Build (Cross-Compile from macOS)

set -e

PROJECT_DIR="$1"
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Usage: $0 <project_dir>"
    exit 1
fi

echo "🪟 Bakery Windows Build (x64)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if MinGW-w64 is installed
if ! command -v x86_64-w64-mingw32-gcc &> /dev/null; then
    echo "❌ MinGW-w64 not found!"
    echo "💡 Run: ./scripts/setup-cross-compile.sh"
    exit 1
fi

echo "✅ MinGW-w64 found"
echo ""

# 1. Embed assets
echo "📦 Embedding assets..."
bun "$FRAMEWORK_DIR/scripts/embed-assets-binary.ts" "$PROJECT_DIR" "$FRAMEWORK_DIR/launcher/embedded-assets.h"
echo ""

# 2. Build for Windows x64
echo "🏗️  Building for Windows x64..."
BUILD_DIR="$FRAMEWORK_DIR/launcher/build-windows"
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

cmake -DCMAKE_TOOLCHAIN_FILE="$FRAMEWORK_DIR/cmake/mingw-w64.cmake" \
      -DCMAKE_BUILD_TYPE=Release \
      ..

cmake --build . --target bakery-ultra -j4

echo ""
echo "✅ Windows build complete!"
echo ""
echo "📦 Output: $BUILD_DIR/bakery-ultra.exe"
ls -lh "$BUILD_DIR/bakery-ultra.exe"


