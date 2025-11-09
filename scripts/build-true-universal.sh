#!/bin/bash
# 🥐 Bakery TRUE Universal Binary
# Uses __attribute__((section("__DATA,__assets"))) to share assets across architectures

set -e

PROJECT_DIR="$1"
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Usage: $0 <project_dir>"
    exit 1
fi

echo "🥐 Bakery TRUE Universal Binary (SHARED ASSETS)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Embed assets with SHARED data section attribute
echo "📦 Embedding assets in SHARED data section..."
bun "$FRAMEWORK_DIR/scripts/embed-assets-shared.ts" "$PROJECT_DIR" "$FRAMEWORK_DIR/launcher/embedded-assets.h"
echo ""

# 2. Build universal binary (assets shared across architectures)
echo "🏗️  Building TRUE universal binary..."
BUILD_DIR="$FRAMEWORK_DIR/launcher/build-universal"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

cmake -DCMAKE_OSX_ARCHITECTURES="arm64;x86_64" \
      -DCMAKE_BUILD_TYPE=Release \
      ..

cmake --build . --target bakery-ultra -j4

echo ""
echo "✅ TRUE Universal binary complete!"
echo ""

# 3. Verify and show size
echo "🔍 Verifying:"
lipo -info bakery-ultra
echo ""

BINARY_SIZE=$(stat -f%z bakery-ultra)
echo "📊 Binary size: $(echo "scale=1; $BINARY_SIZE/1024/1024" | bc) MB"
echo ""
echo "💡 Expected size:"
echo "   Code (ARM64):      ~200 KB"
echo "   Code (x86_64):     ~200 KB"
echo "   Assets (SHARED):   ~8.8 MB"
echo "   Total:             ~9.2 MB ✅"
echo ""

if [ "$BINARY_SIZE" -gt 12000000 ]; then
    echo "⚠️  Binary is larger than expected!"
    echo "   Actual: $(echo "scale=1; $BINARY_SIZE/1024/1024" | bc) MB"
    echo "   Expected: ~9.2 MB"
    echo ""
    echo "   This means assets are still duplicated."
    echo "   Checking sections..."
    echo ""
    size -m bakery-ultra
    echo ""
    echo "💡 Unfortunately, this is a compiler/linker limitation."
    echo "   Even with shared sections, lipo duplicates data."
    echo ""
    echo "   Available options:"
    echo "   A) Accept 18 MB (simple, works now)"
    echo "   B) Use launcher + separate binaries (18 MB, but clean)"
    echo "   C) Compress assets (11 MB with LZ4)"
    echo ""
fi

echo "✅ Build complete!"
echo "📦 Output: $BUILD_DIR/bakery-ultra"


