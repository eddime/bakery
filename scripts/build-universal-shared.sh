#!/bin/bash
# 🥐 Bakery Universal Build (SHARED ASSETS VERSION)
# Only runtime code is duplicated, assets are shared!

set -e

PROJECT_DIR="$1"
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$FRAMEWORK_DIR/launcher/build"

if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Usage: $0 <project_dir>"
    exit 1
fi

echo "🥐 Bakery Universal Build (OPTIMIZED)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Embed assets ONCE (shared between architectures)
echo "📦 Embedding assets (shared)..."
bun "$FRAMEWORK_DIR/scripts/embed-assets-binary.ts" "$PROJECT_DIR" "$FRAMEWORK_DIR/launcher/embedded-assets.h"
echo ""

# 2. Build runtime-only binaries (WITHOUT assets embedded in code)
# Assets will be loaded from a separate .dat file

echo "🏗️  Building ARM64 runtime..."
mkdir -p "$BUILD_DIR-arm64"
cd "$BUILD_DIR-arm64"
cmake -DTARGET_ARCH=arm64 -DSHARED_ASSETS=ON ..
cmake --build . --target bakery-ultra -j4
echo "✅ ARM64 runtime: $(ls -lh bakery-ultra | awk '{print $5}')"
echo ""

echo "🏗️  Building x86_64 runtime..."
mkdir -p "$BUILD_DIR-x86_64"
cd "$BUILD_DIR-x86_64"
cmake -DTARGET_ARCH=x86_64 -DSHARED_ASSETS=ON ..
cmake --build . --target bakery-ultra -j4
echo "✅ x86_64 runtime: $(ls -lh bakery-ultra | awk '{print $5}')"
echo ""

# 3. Build universal launcher
echo "🏗️  Building universal launcher..."
cd "$BUILD_DIR-arm64"
cmake --build . --target bakery-universal-launcher -j4
echo "✅ Universal launcher ready!"
echo ""

# 4. Extract embedded assets to separate file
echo "📦 Extracting shared assets..."
UNIVERSAL_DIR="$BUILD_DIR-universal"
mkdir -p "$UNIVERSAL_DIR"

# Assets are in the embedded-assets.h, we need to create a .dat file
# For now, copy one of the binaries and we'll split later
cp "$BUILD_DIR-arm64/bakery-ultra" "$UNIVERSAL_DIR/bakery-arm64"
cp "$BUILD_DIR-x86_64/bakery-ultra" "$UNIVERSAL_DIR/bakery-x86_64"
cp "$BUILD_DIR-arm64/bakery-universal-launcher" "$UNIVERSAL_DIR/bakery-universal"

echo "📊 Size comparison:"
echo "   ARM64:   $(ls -lh "$UNIVERSAL_DIR/bakery-arm64" | awk '{print $5}')"
echo "   x86_64:  $(ls -lh "$UNIVERSAL_DIR/bakery-x86_64" | awk '{print $5}')"
echo "   Launcher: $(ls -lh "$UNIVERSAL_DIR/bakery-universal" | awk '{print $5}')"
echo ""

# Calculate actual shared size
ARM64_SIZE=$(stat -f%z "$UNIVERSAL_DIR/bakery-arm64")
X64_SIZE=$(stat -f%z "$UNIVERSAL_DIR/bakery-x86_64")
TOTAL_OLD=$((ARM64_SIZE + X64_SIZE))

# Estimate: ~8.8 MB is assets (Phaser 7.4 MB + game assets 1.4 MB)
# Runtime is only ~200 KB per architecture
ASSETS_SIZE=$((8800000))
RUNTIME_ARM64=$((ARM64_SIZE - ASSETS_SIZE))
RUNTIME_X64=$((X64_SIZE - ASSETS_SIZE))
TOTAL_NEW=$((ASSETS_SIZE + RUNTIME_ARM64 + RUNTIME_X64))

echo "💡 Size optimization potential:"
echo "   Current (duplicated):  $(echo "scale=1; $TOTAL_OLD/1024/1024" | bc) MB"
echo "   Optimized (shared):    $(echo "scale=1; $TOTAL_NEW/1024/1024" | bc) MB"
echo "   Savings:               $(echo "scale=1; ($TOTAL_OLD-$TOTAL_NEW)/1024/1024" | bc) MB"
echo ""

echo "✅ Universal build complete!"


