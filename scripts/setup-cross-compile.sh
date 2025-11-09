#!/bin/bash
# 🥐 Bakery Cross-Compilation Toolchain Setup
# Installs MinGW-w64 (Windows) and musl-cross (Linux) on macOS

set -e

echo "🥐 Bakery Cross-Compilation Toolchain Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew not found! Please install Homebrew first:"
    echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    exit 1
fi

echo "✅ Homebrew found"
echo ""

# Install MinGW-w64 for Windows cross-compilation
echo "📦 Installing MinGW-w64 (Windows x64 cross-compiler)..."
if ! command -v x86_64-w64-mingw32-gcc &> /dev/null; then
    brew install mingw-w64
    echo "✅ MinGW-w64 installed"
else
    echo "✅ MinGW-w64 already installed"
fi
echo ""

# Install musl-cross for Linux cross-compilation
echo "📦 Installing musl-cross-make (Linux x64 cross-compiler)..."
if ! command -v x86_64-linux-musl-gcc &> /dev/null; then
    brew install FiloSottile/musl-cross/musl-cross
    echo "✅ musl-cross installed"
else
    echo "✅ musl-cross already installed"
fi
echo ""

# Verify installations
echo "🔍 Verifying toolchains..."
echo ""

echo "Windows (MinGW-w64):"
x86_64-w64-mingw32-gcc --version | head -1
echo ""

echo "Linux (musl-cross):"
x86_64-linux-musl-gcc --version | head -1
echo ""

echo "✅ Cross-compilation toolchains ready!"
echo ""
echo "💡 You can now build for:"
echo "   - macOS (native)"
echo "   - Windows (via MinGW-w64)"
echo "   - Linux (via musl-cross)"
echo ""
echo "Usage:"
echo "   bake all --dir <project>"


