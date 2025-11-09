#!/bin/bash
# Build Linux as 2 Single Executables (x86_64 + aarch64)
# Each executable contains everything embedded

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo "🐧 Building Linux Single Executables (x86_64 + aarch64)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output to dist/linux (use absolute path)
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

# ============================================
# 1. Create ENCRYPTED shared assets
# ============================================
echo "📦 Creating ENCRYPTED shared assets..."
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" launcher/bakery-assets
echo ""

# ============================================
# 2. Build x86_64 executable
# ============================================
echo "🔨 Building x86_64 executable..."
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

if [[ $(uname) == "Linux" ]]; then
    # Native Linux build
    cmake .. -DCMAKE_BUILD_TYPE=Release
else
    # Cross-compile from macOS
    if ! command -v x86_64-linux-musl-gcc &> /dev/null; then
        echo "❌ x86_64-linux-musl-gcc not found!"
        echo "💡 Install: brew install FiloSottile/musl-cross/musl-cross"
        exit 1
    fi
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
fi

make bakery-launcher-linux -j4

if [ ! -f "bakery-launcher-linux" ]; then
    echo "❌ x86_64 build failed!"
    exit 1
fi

# Pack launcher + bakery-assets into single executable
echo "📦 Packing x86_64 with encrypted assets..."
cp bakery-launcher-linux "$OUTPUT_DIR/${APP_NAME}-x86_64.tmp"
cat "$FRAMEWORK_DIR/launcher/bakery-assets" >> "$OUTPUT_DIR/${APP_NAME}-x86_64.tmp"

# Append offset marker (last 8 bytes = offset where assets start)
LAUNCHER_SIZE=$(stat -f%z bakery-launcher-linux 2>/dev/null || stat -c%s bakery-launcher-linux)
printf "%016x" $LAUNCHER_SIZE | xxd -r -p >> "$OUTPUT_DIR/${APP_NAME}-x86_64.tmp"

mv "$OUTPUT_DIR/${APP_NAME}-x86_64.tmp" "$OUTPUT_DIR/${APP_NAME}-x86_64"
chmod +x "$OUTPUT_DIR/${APP_NAME}-x86_64"

echo "✅ x86_64: $(du -h "$OUTPUT_DIR/${APP_NAME}-x86_64" | awk '{print $1}')"
echo ""

# ============================================
# 3. Build aarch64 executable
# ============================================
echo "🔨 Building aarch64 executable..."
BUILD_ARM64="$FRAMEWORK_DIR/launcher/build-linux-arm64-embedded"
mkdir -p "$BUILD_ARM64"
cd "$BUILD_ARM64"

if [[ $(uname) == "Linux" ]] && [[ $(uname -m) == "aarch64" ]]; then
    # Native ARM64 Linux build
    cmake .. -DCMAKE_BUILD_TYPE=Release
else
    # Cross-compile from macOS or x86_64 Linux
    if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
        echo "❌ aarch64-linux-musl-gcc not found!"
        echo "💡 Install: brew install messense/macos-cross-toolchains/aarch64-unknown-linux-musl"
        exit 1
    fi
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake
fi

make bakery-launcher-linux -j4

if [ ! -f "bakery-launcher-linux" ]; then
    echo "❌ aarch64 build failed!"
    exit 1
fi

# Pack launcher + bakery-assets into single executable
echo "📦 Packing aarch64 with encrypted assets..."
cp bakery-launcher-linux "$OUTPUT_DIR/${APP_NAME}-aarch64.tmp"
cat "$FRAMEWORK_DIR/launcher/bakery-assets" >> "$OUTPUT_DIR/${APP_NAME}-aarch64.tmp"

# Append offset marker (last 8 bytes = offset where assets start)
LAUNCHER_SIZE=$(stat -f%z bakery-launcher-linux 2>/dev/null || stat -c%s bakery-launcher-linux)
printf "%016x" $LAUNCHER_SIZE | xxd -r -p >> "$OUTPUT_DIR/${APP_NAME}-aarch64.tmp"

mv "$OUTPUT_DIR/${APP_NAME}-aarch64.tmp" "$OUTPUT_DIR/${APP_NAME}-aarch64"
chmod +x "$OUTPUT_DIR/${APP_NAME}-aarch64"

echo "✅ aarch64: $(du -h "$OUTPUT_DIR/${APP_NAME}-aarch64" | awk '{print $1}')"
echo ""

cd "$FRAMEWORK_DIR"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Linux Single Executables complete!"
echo ""
echo "📦 Output:"
echo "   x86_64:  $OUTPUT_DIR/${APP_NAME}-x86_64"
echo "   aarch64: $OUTPUT_DIR/${APP_NAME}-aarch64"
echo ""
echo "📊 Sizes:"
ls -lh "$OUTPUT_DIR/${APP_NAME}"-* | awk '{print "   " $9 ": " $5}'
echo ""
echo "🔐 All assets embedded with XOR encryption"
echo ""
echo "🎯 User experience:"
echo "   → Download correct architecture"
echo "   → chmod +x ${APP_NAME}-x86_64"
echo "   → ./${APP_NAME}-x86_64"
echo "   → Everything embedded, instant launch!"
echo ""

