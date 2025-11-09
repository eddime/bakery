#!/bin/bash
# 🥐 Bakery Universal Build Script
# Builds x86_64 + ARM64 binaries and combines them

set -e

PROJECT_DIR="$1"
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$FRAMEWORK_DIR/launcher/build"

if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Usage: $0 <project_dir>"
    exit 1
fi

echo "🥐 Bakery Universal Build (macOS)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Embed assets
echo "📦 Embedding assets..."
bun "$FRAMEWORK_DIR/scripts/embed-assets-binary.ts" "$PROJECT_DIR" "$FRAMEWORK_DIR/launcher/embedded-assets.h"
echo ""

# 2. Build for ARM64
echo "🏗️  Building for ARM64..."
mkdir -p "$BUILD_DIR-arm64"
cd "$BUILD_DIR-arm64"
cmake -DTARGET_ARCH=arm64 ..
cmake --build . --target bakery-ultra -j4
echo "✅ ARM64 build complete!"
echo ""

# 3. Build for x86_64
echo "🏗️  Building for x86_64..."
mkdir -p "$BUILD_DIR-x86_64"
cd "$BUILD_DIR-x86_64"
cmake -DTARGET_ARCH=x86_64 ..
cmake --build . --target bakery-ultra -j4
echo "✅ x86_64 build complete!"
echo ""

# 4. Build universal launcher
echo "🏗️  Building universal launcher..."
cd "$BUILD_DIR-arm64"
cmake --build . --target bakery-universal-launcher -j4
echo "✅ Universal launcher ready!"
echo ""

# 5. Create universal directory structure
UNIVERSAL_DIR="$BUILD_DIR-universal"
mkdir -p "$UNIVERSAL_DIR"

# Copy universal launcher as main executable
cp "$BUILD_DIR-arm64/bakery-universal-launcher" "$UNIVERSAL_DIR/bakery-universal"

# Copy architecture-specific binaries
cp "$BUILD_DIR-arm64/bakery-ultra" "$UNIVERSAL_DIR/bakery-arm64"
cp "$BUILD_DIR-x86_64/bakery-ultra" "$UNIVERSAL_DIR/bakery-x86_64"

echo "✅ Universal binary structure created!"
echo ""
echo "📦 Output:"
echo "   Universal Launcher: $UNIVERSAL_DIR/bakery-universal"
echo "   ARM64 Binary:       $UNIVERSAL_DIR/bakery-arm64"
echo "   x86_64 Binary:      $UNIVERSAL_DIR/bakery-x86_64"
echo ""

# Show sizes
echo "📊 Binary sizes:"
ls -lh "$UNIVERSAL_DIR"
echo ""

echo "✅ Universal build complete!"


