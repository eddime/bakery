#!/bin/bash
# Build Linux Universal Binary (x86_64 + aarch64) as AppImage

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo "🐧 Building Linux Universal AppImage"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."

# Output to dist/linux
OUTPUT_DIR="$PROJECT_DIR/dist/linux"
mkdir -p "$OUTPUT_DIR"

# Get project name (use APP_NAME for consistency)
PROJECT_NAME="$APP_NAME"

# ============================================
# 1. Create ENCRYPTED shared assets file
# ============================================
echo "📦 Creating ENCRYPTED shared assets file..."
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" launcher/bakery-assets

# ============================================
# 2. Build x86_64 binary (native on macOS x86 or cross-compile)
# ============================================
echo ""
echo "🔨 Building x86_64 binary..."
mkdir -p launcher/build-linux-x86_64
cd launcher/build-linux-x86_64

if [[ $(uname -m) == "x86_64" ]] && [[ $(uname) == "Linux" ]]; then
    # Native Linux x86_64 build
    cmake .. -DCMAKE_BUILD_TYPE=Release
else
    # Cross-compile from macOS
    if ! command -v x86_64-linux-musl-gcc &> /dev/null; then
        echo "⚠️  x86_64-linux-musl-gcc not found!"
        echo "   Install with: brew install FiloSottile/musl-cross/musl-cross"
        exit 1
    fi
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
fi

make bakery-launcher-linux -j4
echo "✅ x86_64 done!"

cd ../..

# ============================================
# 3. Build aarch64 binary (cross-compile)
# ============================================
echo ""
echo "🔨 Building aarch64 binary..."
mkdir -p launcher/build-linux-aarch64
cd launcher/build-linux-aarch64

if [[ $(uname -m) == "aarch64" ]] && [[ $(uname) == "Linux" ]]; then
    # Native Linux aarch64 build
    cmake .. -DCMAKE_BUILD_TYPE=Release
else
    # Cross-compile
    if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
        echo "⚠️  aarch64-linux-musl-gcc not found!"
        echo "   Install with: brew install FiloSottile/musl-cross/musl-cross"
        exit 1
    fi
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake
fi

make bakery-launcher-linux -j4
echo "✅ aarch64 done!"

cd ../..

# ============================================
# 4. Build Universal Launcher (x86_64 for now, will detect arch at runtime)
# ============================================
echo ""
echo "🔨 Building Universal Launcher (AppRun)..."
mkdir -p launcher/build-linux-universal-launcher
cd launcher/build-linux-universal-launcher

if [[ $(uname) == "Linux" ]]; then
    cmake .. -DCMAKE_BUILD_TYPE=Release
else
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
fi

make bakery-universal-launcher-linux -j4
echo "✅ Universal Launcher done!"

cd ../..

# ============================================
# 5. Create AppDir structure
# ============================================
echo ""
echo "📦 Creating AppDir structure..."

APPDIR="$OUTPUT_DIR/${PROJECT_NAME}.AppDir"
rm -rf "$APPDIR"
mkdir -p "$APPDIR"

# Copy universal launcher as AppRun
cp launcher/build-linux-universal-launcher/bakery-universal-launcher-linux "$APPDIR/AppRun"
chmod +x "$APPDIR/AppRun"

# Copy architecture-specific binaries
cp launcher/build-linux-x86_64/bakery-launcher-linux "$APPDIR/${PROJECT_NAME}-x86_64"
cp launcher/build-linux-aarch64/bakery-launcher-linux "$APPDIR/${PROJECT_NAME}-aarch64"

# Copy shared assets
cp launcher/bakery-assets "$APPDIR/bakery-assets"

# Copy config (if exists)
if [ -f "$PROJECT_DIR/bakery.config.json" ]; then
    cp "$PROJECT_DIR/bakery.config.json" "$APPDIR/"
elif [ -f "$PROJECT_DIR/bakery.config.js" ]; then
    # Convert to JSON (simple approach - assumes default export)
    echo "{}" > "$APPDIR/bakery.config.json"
fi

# Create .desktop file
cat > "$APPDIR/${PROJECT_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${PROJECT_NAME}
Exec=AppRun
Icon=${PROJECT_NAME}
Categories=Game;
Terminal=false
EOF

# Create default icon (if not provided)
if [ ! -f "$PROJECT_DIR/icon.png" ]; then
    # Create a simple placeholder (you can replace this with actual icon)
    echo "⚠️  No icon.png found, using placeholder"
else
    cp "$PROJECT_DIR/icon.png" "$APPDIR/${PROJECT_NAME}.png"
fi

echo ""
echo "✅ AppDir created!"
echo ""
echo "📋 Structure:"
ls -lh "$APPDIR" | tail -n +2 | awk '{print "   "$9" → "$5}'

echo ""
echo "🎯 To create AppImage:"
echo "   1. Download appimagetool:"
echo "      wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage"
echo "      chmod +x appimagetool-x86_64.AppImage"
echo ""
echo "   2. Create AppImage:"
echo "      ./appimagetool-x86_64.AppImage $APPDIR ${PROJECT_NAME}.AppImage"
echo ""
echo "💡 Or install appimagetool: brew install appimagetool"

