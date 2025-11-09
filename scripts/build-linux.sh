#!/bin/bash
# 🐧 Bakery Linux Build (Cross-Compile from macOS)

set -e

PROJECT_DIR="$1"
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Usage: $0 <project_dir>"
    exit 1
fi

echo "🐧 Bakery Linux Build (x64)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if musl-cross is installed
if ! command -v x86_64-linux-musl-gcc &> /dev/null; then
    echo "❌ musl-cross not found!"
    echo "💡 Run: ./scripts/setup-cross-compile.sh"
    exit 1
fi

echo "✅ musl-cross found"
echo ""

# 1. Embed assets
echo "📦 Embedding assets..."
bun "$FRAMEWORK_DIR/scripts/embed-assets-binary.ts" "$PROJECT_DIR" "$FRAMEWORK_DIR/launcher/embedded-assets.h"
echo ""

# 2. Build for Linux x64
echo "🏗️  Building for Linux x64..."
BUILD_DIR="$FRAMEWORK_DIR/launcher/build-linux"
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

cmake -DCMAKE_TOOLCHAIN_FILE="$FRAMEWORK_DIR/cmake/musl-cross.cmake" \
      -DCMAKE_BUILD_TYPE=Release \
      ..

cmake --build . --target bakery-ultra -j4

echo ""
echo "✅ Linux build complete!"
echo ""
echo "📦 Output: $BUILD_DIR/bakery-ultra"
ls -lh "$BUILD_DIR/bakery-ultra"


