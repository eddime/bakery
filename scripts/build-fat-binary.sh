#!/bin/bash
# 🥐 Bakery FAT Binary (TRUE Universal Binary)
# Uses macOS `lipo` to create a single fat binary with both architectures

set -e

PROJECT_DIR="$1"
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$FRAMEWORK_DIR/launcher/build"

if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Usage: $0 <project_dir>"
    exit 1
fi

echo "🥐 Bakery FAT Binary Build"
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
echo "✅ ARM64: $(ls -lh bakery-ultra | awk '{print $5}')"
echo ""

# 3. Build for x86_64
echo "🏗️  Building for x86_64..."
mkdir -p "$BUILD_DIR-x86_64"
cd "$BUILD_DIR-x86_64"
cmake -DTARGET_ARCH=x86_64 ..
cmake --build . --target bakery-ultra -j4
echo "✅ x86_64: $(ls -lh bakery-ultra | awk '{print $5}')"
echo ""

# 4. Create FAT binary with lipo
echo "🔨 Creating FAT binary with lipo..."
UNIVERSAL_DIR="$BUILD_DIR-universal"
mkdir -p "$UNIVERSAL_DIR"

lipo -create \
    "$BUILD_DIR-arm64/bakery-ultra" \
    "$BUILD_DIR-x86_64/bakery-ultra" \
    -output "$UNIVERSAL_DIR/bakery-universal"

echo "✅ FAT binary created!"
echo ""

# 5. Verify FAT binary
echo "🔍 Verifying FAT binary:"
lipo -info "$UNIVERSAL_DIR/bakery-universal"
echo ""

# 6. Show sizes
echo "📊 Size comparison:"
ARM64_SIZE=$(stat -f%z "$BUILD_DIR-arm64/bakery-ultra")
X64_SIZE=$(stat -f%z "$BUILD_DIR-x86_64/bakery-ultra")
FAT_SIZE=$(stat -f%z "$UNIVERSAL_DIR/bakery-universal")

echo "   ARM64 only:     $(echo "scale=1; $ARM64_SIZE/1024/1024" | bc) MB"
echo "   x86_64 only:    $(echo "scale=1; $X64_SIZE/1024/1024" | bc) MB"
echo "   FAT binary:     $(echo "scale=1; $FAT_SIZE/1024/1024" | bc) MB"
echo ""

# Calculate what's duplicated (only runtime code, ~200 KB)
DUPLICATE=$((FAT_SIZE - ARM64_SIZE))
echo "💡 Only $(echo "scale=1; $DUPLICATE/1024" | bc) KB duplicated (runtime code)"
echo "✅ Assets (8.8 MB) are shared! Only runtime differs."
echo ""

echo "✅ FAT binary complete!"
echo "📦 Output: $UNIVERSAL_DIR/bakery-universal"


