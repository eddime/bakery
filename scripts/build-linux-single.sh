#!/bin/bash
# Build Linux single-file executables for x86_64 and aarch64

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT_DIR="$PROJECT_DIR/dist/linux"
mkdir -p "$OUTPUT_DIR"

cd "$FRAMEWORK_DIR"

# ============================================
# 1. Create encrypted shared assets file
# ============================================
echo "📦 Creating ENCRYPTED shared assets file..."
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" launcher/bakery-assets

CONFIG_PATH="$PROJECT_DIR/bakery.config.json"
if [ ! -f "$CONFIG_PATH" ]; then
    echo "❌ bakery.config.json not found in project!"
    exit 1
fi

# Helper to build a specific architecture and pack into single binary
build_arch() {
    local ARCH="$1"
    local BUILD_DIR="$FRAMEWORK_DIR/launcher/build-linux-$ARCH"
    local COMPILER_C="$2"
    local COMPILER_CXX="$3"
    local TARGET_NAME="$4"

    echo ""
    echo "🔨 Building $ARCH binary..."

    mkdir -p "$BUILD_DIR"
    cd "$BUILD_DIR"

    if [ "$ARCH" = "x86_64" ] && [ "$(uname -m)" = "x86_64" ] && [ "$(uname)" = "Linux" ]; then
        cmake .. -DCMAKE_BUILD_TYPE=Release -DBAKERY_EMBEDDED_ASSETS=ON
    else
        if ! command -v "$COMPILER_C" >/dev/null 2>&1; then
            echo "⚠️  $COMPILER_C not found, skipping $ARCH" >&2
            cd "$FRAMEWORK_DIR"
            return
        fi
        cmake .. \
            -DCMAKE_C_COMPILER="$COMPILER_C" \
            -DCMAKE_CXX_COMPILER="$COMPILER_CXX" \
            -DCMAKE_SYSTEM_NAME=Linux \
            -DCMAKE_SYSTEM_PROCESSOR="$TARGET_NAME" \
            -DCMAKE_BUILD_TYPE=Release \
            -DBAKERY_EMBEDDED_ASSETS=ON
    fi

    cmake --build . --target bakery-launcher-linux -j4

    local BINARY_PATH="$BUILD_DIR/bakery-launcher-linux"
    if [ ! -f "$BINARY_PATH" ]; then
        echo "⚠️  Failed to build $ARCH launcher" >&2
        cd "$FRAMEWORK_DIR"
        return
    fi

    # Strip if available
    if command -v "$COMPILER_C" >/dev/null 2>&1; then
        "$COMPILER_C" -s "$BINARY_PATH" 2>/dev/null || true
    elif command -v strip >/dev/null 2>&1; then
        strip "$BINARY_PATH" 2>/dev/null || true
    fi

    cd "$FRAMEWORK_DIR"

    local OUTPUT_FILE="$OUTPUT_DIR/${APP_NAME}-linux-$ARCH"
    bun scripts/pack-linux-single.ts "$BINARY_PATH" launcher/bakery-assets "$CONFIG_PATH" "$OUTPUT_FILE"
    chmod +x "$OUTPUT_FILE"

    local SIZE=$(du -h "$OUTPUT_FILE" | awk '{print $1}')
    echo "✅ ${ARCH} single binary: $OUTPUT_FILE ($SIZE)"
}

build_arch "x86_64" "x86_64-linux-musl-gcc" "x86_64-linux-musl-g++" "x86_64"
build_arch "arm64" "aarch64-linux-musl-gcc" "aarch64-linux-musl-g++" "aarch64"

echo ""
echo "✅ Linux single binaries ready!"
ls -lh "$OUTPUT_DIR" | tail -n +2
