#!/bin/bash
# Build Windows Universal Binary (x64 + ARM64 + x86)

set -e

PROJECT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <project_dir> <output_dir>"
    exit 1
fi

echo "🚀 Building Windows Universal Binary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."

# Embed assets ONCE (shared by all architectures)
echo "📦 Embedding assets..."
bun scripts/embed-assets-binary.ts "$PROJECT_DIR" launcher/embedded-assets.h

# Create build directories
mkdir -p launcher/build-windows-universal/x64
mkdir -p launcher/build-windows-universal/arm64
mkdir -p launcher/build-windows-universal/x86
mkdir -p launcher/build-windows-universal/launcher

# ============================================
# 1. Build x64 binary
# ============================================
echo ""
echo "🔨 Building x64 binary..."
cd launcher/build-windows-universal/x64
cmake ../.. -DCMAKE_TOOLCHAIN_FILE=../../cmake/mingw-w64.cmake
make bakery-launcher-windows -j4
echo "✅ x64 done!"

# ============================================
# 2. Build ARM64 binary (if toolchain available)
# ============================================
cd ../../..
echo ""
echo "🔨 Building ARM64 binary..."
if command -v aarch64-w64-mingw32-gcc &> /dev/null; then
    cd launcher/build-windows-universal/arm64
    cmake ../.. -DCMAKE_TOOLCHAIN_FILE=../../cmake/mingw-w64-arm64.cmake
    make bakery-launcher-windows -j4
    echo "✅ ARM64 done!"
else
    echo "⚠️  ARM64 toolchain not found, skipping..."
    echo "   (Install with: brew install mingw-w64-aarch64)"
fi

# ============================================
# 3. Build x86 binary (32-bit)
# ============================================
cd ../../..
echo ""
echo "🔨 Building x86 binary..."
if command -v i686-w64-mingw32-gcc &> /dev/null; then
    cd launcher/build-windows-universal/x86
    cmake ../.. -DCMAKE_TOOLCHAIN_FILE=../../cmake/mingw-w64-x86.cmake
    make bakery-launcher-windows -j4
    echo "✅ x86 done!"
else
    echo "⚠️  x86 toolchain not found, skipping..."
    echo "   (Install with: brew install mingw-w64-i686)"
fi

# ============================================
# 4. Build Universal Launcher
# ============================================
cd ../../..
echo ""
echo "🔨 Building Universal Launcher..."
cd launcher/build-windows-universal/launcher
cmake ../.. -DCMAKE_TOOLCHAIN_FILE=../../cmake/mingw-w64.cmake
make bakery-universal-launcher-windows -j4
echo "✅ Universal Launcher done!"

cd ../../..

# ============================================
# 5. Copy all binaries to output
# ============================================
echo ""
echo "📦 Packaging..."

# Get project name from config
PROJECT_NAME=$(basename "$PROJECT_DIR")

# Copy binaries
cp launcher/build-windows-universal/x64/bakery-launcher-windows.exe "$OUTPUT_DIR/${PROJECT_NAME}-x64.exe" 2>/dev/null || true
cp launcher/build-windows-universal/arm64/bakery-launcher-windows.exe "$OUTPUT_DIR/${PROJECT_NAME}-arm64.exe" 2>/dev/null || true
cp launcher/build-windows-universal/x86/bakery-launcher-windows.exe "$OUTPUT_DIR/${PROJECT_NAME}-x86.exe" 2>/dev/null || true
cp launcher/build-windows-universal/launcher/bakery-universal-launcher-windows.exe "$OUTPUT_DIR/${PROJECT_NAME}.exe"

echo ""
echo "✅ Windows Universal Binary complete!"
echo ""
echo "📦 Output:"
ls -lh "$OUTPUT_DIR"/*.exe | awk '{print "   "$9" ("$5")"}'
echo ""
echo "🎯 User launches: ${PROJECT_NAME}.exe"
echo "   → Detects CPU and launches correct binary!"
