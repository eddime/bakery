#!/bin/bash
# Build Linux binaries natively and commit them to the repository
# This script must be run on a Linux machine (Ubuntu/Debian)

set -e

echo "🔨 Building Linux binaries natively..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're on Linux
if [[ $(uname) != "Linux" ]]; then
    echo "❌ This script must be run on a Linux machine!"
    echo ""
    echo "📥 Options:"
    echo "   1. Run on Ubuntu/Debian VM"
    echo "   2. Use GitHub Codespaces (free for public repos)"
    echo "   3. Use a cloud Linux instance"
    echo ""
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    cmake \
    libgtk-3-dev \
    libwebkit2gtk-4.1-dev \
    pkg-config \
    libssl-dev \
    libcurl4-openssl-dev

# Build universal launcher
echo ""
echo "🔨 Building universal launcher..."
cd launcher
mkdir -p build-linux-universal-embedded
cd build-linux-universal-embedded
cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
make bakery-universal-launcher-linux-embedded -j$(nproc)
strip bakery-universal-launcher-linux-embedded

# Copy to bin/
mkdir -p ../../bin/linux-universal
cp bakery-universal-launcher-linux-embedded ../../bin/linux-universal/
echo "✅ Universal launcher built and copied to bin/"

# Build x64 launcher
echo ""
echo "🔨 Building x64 launcher..."
cd ..
mkdir -p build-linux-x64
cd build-linux-x64
cmake .. -DCMAKE_BUILD_TYPE=Release
make bakery-launcher-linux -j$(nproc)
strip bakery-launcher-linux

# Copy to bin/
mkdir -p ../../bin/linux-x64
cp bakery-launcher-linux ../../bin/linux-x64/
echo "✅ x64 launcher built and copied to bin/"

# Go back to root
cd ../..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Linux binaries built successfully!"
echo ""
echo "📁 Binaries:"
echo "   bin/linux-x64/bakery-launcher-linux"
echo "   bin/linux-universal/bakery-universal-launcher-linux-embedded"
echo ""
echo "📊 Sizes:"
ls -lh bin/linux-x64/bakery-launcher-linux
ls -lh bin/linux-universal/bakery-universal-launcher-linux-embedded
echo ""
echo "💡 Commit these binaries to the repository:"
echo "   git add bin/"
echo "   git commit -m '🐧 Add pre-built Linux binaries (glibc-based)'"
echo "   git push origin main"
echo ""
echo "🎉 Now you can build Linux games from macOS/Windows!"

