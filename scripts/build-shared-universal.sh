#!/bin/bash
# 🥐 Gemcore Shared Assets Universal Build
# Builds 3 tiny launchers + 1 shared assets file = ~9 MB total!

set -e

PROJECT_DIR="$1"
ENABLE_STEAMWORKS="${2:-OFF}"  # Default to OFF if not specified
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$FRAMEWORK_DIR/launcher/build-shared"

if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Usage: $0 <project_dir> [ENABLE_STEAMWORKS=ON/OFF]"
    exit 1
fi

echo "🥐 Gemcore Shared Assets Universal Build"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Strategy: 3 launchers + 1 shared assets file"
echo ""

# 1. Create shared assets file (ALWAYS rebuild to prevent wrong assets!)
ASSETS_PATH="$BUILD_DIR/gemcore-assets"
mkdir -p "$BUILD_DIR"

# Always rebuild assets to ensure correct game is packaged
echo "📦 Creating ENCRYPTED shared assets..."
bun "$FRAMEWORK_DIR/scripts/embed-assets-shared.ts" "$PROJECT_DIR" "$ASSETS_PATH"
if [ $? -ne 0 ]; then echo "❌ Assets build failed!"; exit 1; fi
echo ""

# 2. Build ARM64 launcher
echo "🏗️  Building ARM64 launcher..."
BUILD_ARM64="$BUILD_DIR/build-arm64"
mkdir -p "$BUILD_ARM64"
cd "$BUILD_ARM64"

cmake -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_OSX_ARCHITECTURES=arm64 \
      -DGEMCORE_SHARED_ASSETS=ON \
      -DENABLE_STEAMWORKS=$ENABLE_STEAMWORKS \
      "$FRAMEWORK_DIR/launcher"
cmake --build . --target gemcore-launcher-mac -j4

if [ ! -f "gemcore-launcher-mac" ]; then
    echo "❌ ARM64 launcher build failed!"
    exit 1
fi

mv gemcore-launcher-mac "$BUILD_DIR/gemcore-arm64"
echo "✅ ARM64 launcher: $(du -h "$BUILD_DIR/gemcore-arm64" | awk '{print $1}')"
echo ""

# 3. Build x64 launcher
echo "🏗️  Building x64 launcher..."
BUILD_X64="$BUILD_DIR/build-x64"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

cmake -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_OSX_ARCHITECTURES=x86_64 \
      -DGEMCORE_SHARED_ASSETS=ON \
      -DENABLE_STEAMWORKS=$ENABLE_STEAMWORKS \
      "$FRAMEWORK_DIR/launcher"
cmake --build . --target gemcore-launcher-mac -j4

if [ ! -f "gemcore-launcher-mac" ]; then
    echo "❌ x64 launcher build failed!"
    exit 1
fi

mv gemcore-launcher-mac "$BUILD_DIR/gemcore-x86_64"
echo "✅ x64 launcher: $(du -h "$BUILD_DIR/gemcore-x86_64" | awk '{print $1}')"
echo ""

# 4. Build universal launcher (tiny, just detects architecture)
echo "🏗️  Building universal launcher..."
BUILD_LAUNCHER="$BUILD_DIR/build-launcher"
mkdir -p "$BUILD_LAUNCHER"
cd "$BUILD_LAUNCHER"

cmake -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_OSX_ARCHITECTURES="arm64;x86_64" \
      "$FRAMEWORK_DIR/launcher"
cmake --build . --target gemcore-universal-launcher -j4

if [ ! -f "gemcore-universal-launcher" ]; then
    echo "❌ Universal launcher build failed!"
    exit 1
fi

mv gemcore-universal-launcher "$BUILD_DIR/gemcore-universal"
echo "✅ Universal launcher: $(du -h "$BUILD_DIR/gemcore-universal" | awk '{print $1}')"
echo ""

# 5. Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Build complete!"
echo ""
echo "📦 Output files:"
echo "   Universal Launcher:  $(du -h "$BUILD_DIR/gemcore-universal" | awk '{print $1}') (detects architecture)"
echo "   ARM64 Launcher:      $(du -h "$BUILD_DIR/gemcore-arm64" | awk '{print $1}') (Apple Silicon)"
echo "   x64 Launcher:        $(du -h "$BUILD_DIR/gemcore-x86_64" | awk '{print $1}') (Intel)"
echo "   Shared Assets:       $(du -h "$BUILD_DIR/gemcore-assets" | awk '{print $1}') (used by both) ✅"
echo ""

TOTAL_SIZE=$(du -ch "$BUILD_DIR/gemcore-universal" "$BUILD_DIR/gemcore-arm64" "$BUILD_DIR/gemcore-x86_64" "$BUILD_DIR/gemcore-assets" | tail -1 | awk '{print $1}')
echo "📊 Total size: $TOTAL_SIZE (vs 18 MB before) ✅"
echo ""
echo "💡 Assets are shared = 50% smaller!"
echo ""
echo "🎯 Structure in .app:"
echo "   Contents/MacOS/app-name       → Universal Launcher"
echo "   Contents/MacOS/app-name-arm64 → ARM64 Launcher"
echo "   Contents/MacOS/app-name-x86_64→ x64 Launcher"
echo "   Contents/MacOS/gemcore-assets  → Shared Assets (8.8 MB)"
echo ""


