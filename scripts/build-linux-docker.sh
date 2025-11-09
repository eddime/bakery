#!/bin/bash
# Build Linux AppImages using Docker (easiest way!)

set -e

PROJECT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <project_dir> <output_dir>"
    exit 1
fi

echo "🐧 Building Linux via Docker"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found!"
    echo ""
    echo "💡 Install Docker:"
    echo "   macOS: https://www.docker.com/products/docker-desktop"
    echo "   Or: brew install --cask docker"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running!"
    echo ""
    echo "💡 Start Docker Desktop and try again"
    exit 1
fi

cd "$(dirname "$0")/.."
FRAMEWORK_DIR=$(pwd)
PROJECT_NAME=$(basename "$PROJECT_DIR")

echo "📦 Project: $PROJECT_NAME"
echo "🔨 Framework: $FRAMEWORK_DIR"
echo ""

# ============================================
# Build x86_64 AppImage
# ============================================
echo "🔨 Building x86_64 AppImage via Docker..."
echo ""

docker run --rm \
    --platform linux/amd64 \
    -v "$PROJECT_DIR:/project:ro" \
    -v "$FRAMEWORK_DIR:/framework:ro" \
    -v "$OUTPUT_DIR:/output" \
    -w /framework \
    ubuntu:22.04 bash -c "
        set -e
        echo '📦 Installing dependencies...'
        apt-get update -qq
        apt-get install -y -qq \
            build-essential \
            cmake \
            pkg-config \
            libgtk-3-dev \
            libwebkit2gtk-4.0-dev \
            curl \
            > /dev/null 2>&1
        
        # Install Bun
        curl -fsSL https://bun.sh/install | bash > /dev/null 2>&1
        export PATH=\"/root/.bun/bin:\$PATH\"
        
        echo '📦 Embedding assets...'
        bun /framework/scripts/embed-assets-binary.ts /project /framework/launcher/embedded-assets.h
        
        echo '🔨 Building binary...'
        mkdir -p /framework/launcher/build-linux-native-x64
        cd /framework/launcher/build-linux-native-x64
        cmake .. -DCMAKE_BUILD_TYPE=Release
        make bakery-launcher -j\$(nproc)
        
        echo '📦 Creating AppDir...'
        mkdir -p /output/${PROJECT_NAME}-x86_64.AppDir
        cp bakery-launcher /output/${PROJECT_NAME}-x86_64.AppDir/AppRun
        chmod +x /output/${PROJECT_NAME}-x86_64.AppDir/AppRun
        
        # Create .desktop file
        cat > /output/${PROJECT_NAME}-x86_64.AppDir/${PROJECT_NAME}.desktop << 'EOF'
[Desktop Entry]
Type=Application
Name=${PROJECT_NAME}
Exec=AppRun
Icon=${PROJECT_NAME}
Categories=Game;
Terminal=false
EOF
        
        # Copy icon if exists
        if [ -f /project/icon.png ]; then
            cp /project/icon.png /output/${PROJECT_NAME}-x86_64.AppDir/${PROJECT_NAME}.png
        fi
        
        echo '✅ x86_64 AppDir created!'
    "

# ============================================
# Build aarch64 AppImage
# ============================================
echo ""
echo "🔨 Building aarch64 AppImage via Docker..."
echo ""

docker run --rm \
    --platform linux/arm64 \
    -v "$PROJECT_DIR:/project:ro" \
    -v "$FRAMEWORK_DIR:/framework:ro" \
    -v "$OUTPUT_DIR:/output" \
    -w /framework \
    ubuntu:22.04 bash -c "
        set -e
        echo '📦 Installing dependencies...'
        apt-get update -qq
        apt-get install -y -qq \
            build-essential \
            cmake \
            pkg-config \
            libgtk-3-dev \
            libwebkit2gtk-4.0-dev \
            curl \
            > /dev/null 2>&1
        
        # Install Bun
        curl -fsSL https://bun.sh/install | bash > /dev/null 2>&1
        export PATH=\"/root/.bun/bin:\$PATH\"
        
        echo '📦 Embedding assets...'
        bun /framework/scripts/embed-assets-binary.ts /project /framework/launcher/embedded-assets.h
        
        echo '🔨 Building binary...'
        mkdir -p /framework/launcher/build-linux-native-arm64
        cd /framework/launcher/build-linux-native-arm64
        cmake .. -DCMAKE_BUILD_TYPE=Release
        make bakery-launcher -j\$(nproc)
        
        echo '📦 Creating AppDir...'
        mkdir -p /output/${PROJECT_NAME}-aarch64.AppDir
        cp bakery-launcher /output/${PROJECT_NAME}-aarch64.AppDir/AppRun
        chmod +x /output/${PROJECT_NAME}-aarch64.AppDir/AppRun
        
        # Create .desktop file
        cat > /output/${PROJECT_NAME}-aarch64.AppDir/${PROJECT_NAME}.desktop << 'EOF'
[Desktop Entry]
Type=Application
Name=${PROJECT_NAME}
Exec=AppRun
Icon=${PROJECT_NAME}
Categories=Game;
Terminal=false
EOF
        
        # Copy icon if exists
        if [ -f /project/icon.png ]; then
            cp /project/icon.png /output/${PROJECT_NAME}-aarch64.AppDir/${PROJECT_NAME}.png
        fi
        
        echo '✅ aarch64 AppDir created!'
    "

# ============================================
# Summary
# ============================================
echo ""
echo "✅ Linux AppDirs complete!"
echo ""
echo "📦 Output:"
ls -d "$OUTPUT_DIR"/*.AppDir 2>/dev/null | while read dir; do
    size=$(du -sh "$dir" | cut -f1)
    echo "   $(basename "$dir") → $size"
done

echo ""
echo "💡 To create AppImages:"
echo "   Download appimagetool and run:"
echo "   ARCH=x86_64 appimagetool ${PROJECT_NAME}-x86_64.AppDir"
echo "   ARCH=aarch64 appimagetool ${PROJECT_NAME}-aarch64.AppDir"

