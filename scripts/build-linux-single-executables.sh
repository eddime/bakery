#!/bin/bash
# Build Linux Single Executable with Embedded Resources
# Embeds launcher + binary + assets + Steam .so into ONE file

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo "🐧 Building Linux Single Executables (x86_64 + ARM64)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output to dist/linux (use absolute path)
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

# ============================================
# 1. Build Universal Launcher (Embedded)
# ============================================
echo "🔨 Building universal launcher..."
BUILD_EMBEDDED="$FRAMEWORK_DIR/launcher/build-linux-universal-embedded"
mkdir -p "$BUILD_EMBEDDED"
cd "$BUILD_EMBEDDED"

# Check if pre-built binary is cached locally (like Neutralino!)
PREBUILT_UNIVERSAL="$FRAMEWORK_DIR/launcher/prebuilt/bakery-universal-launcher-linux-embedded"
UNIVERSAL_CACHED=false

if [ -f "$PREBUILT_UNIVERSAL" ]; then
    echo "💾 Using cached pre-built universal launcher"
    cp "$PREBUILT_UNIVERSAL" "bakery-universal-launcher-linux-embedded"
    chmod +x "bakery-universal-launcher-linux-embedded"
    UNIVERSAL_CACHED=true
fi

if [ "$UNIVERSAL_CACHED" = false ]; then
    if [[ $(uname) == "Linux" ]]; then
        # Native Linux build
        cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
    else
        # Cross-compile from macOS
        if ! command -v x86_64-linux-musl-gcc &> /dev/null; then
            echo "❌ x86_64-linux-musl-gcc not found!"
            echo "💡 Install: brew install FiloSottile/musl-cross/musl-cross"
            exit 1
        fi
        cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
    fi

    make bakery-universal-launcher-linux-embedded -j4

    if [ ! -f "bakery-universal-launcher-linux-embedded" ]; then
        echo "❌ Universal launcher build failed!"
        exit 1
    fi
fi

echo "✅ Universal launcher ready"
echo ""

# ============================================
# 2. Build x86_64 launcher binary (with WebKitGTK)
# ============================================
echo "🔨 Building x86_64 launcher binary..."
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

# Check if pre-built binary is cached locally (like Neutralino!)
PREBUILT_DIR="$FRAMEWORK_DIR/launcher/prebuilt"
PREBUILT_BINARY="$PREBUILT_DIR/bakery-launcher-linux-x64"
DOWNLOADED=false

if [ -f "$PREBUILT_BINARY" ]; then
    echo "💾 Using cached pre-built x64 binary (with WebKitGTK)"
    cp "$PREBUILT_BINARY" "bakery-launcher-linux"
    chmod +x "bakery-launcher-linux"
    DOWNLOADED=true
elif [[ $(uname) != "Linux" ]]; then
    # Try to download from GitHub if not cached
    echo "📥 Attempting to download pre-built x64 binary (with WebKitGTK)..."
    GITHUB_REPO="eddime/bakery"
    VERSION="latest"
    BINARY_URL="https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/bakery-launcher-linux-x64"
    
    if curl -L -f -o "bakery-launcher-linux" "${BINARY_URL}" 2>/dev/null; then
        chmod +x "bakery-launcher-linux"
        echo "✅ Downloaded pre-built x64 binary (with WebKitGTK)"
        DOWNLOADED=true
    else
        echo "⚠️  Pre-built binary not available, will cross-compile (without WebKitGTK)"
    fi
fi

if [ "$DOWNLOADED" = false ]; then
    if [[ $(uname) == "Linux" ]]; then
        # Native Linux build with WebKitGTK
        cmake .. -DCMAKE_BUILD_TYPE=Release
        make bakery-launcher-linux -j4
    else
        # Cross-compile from macOS (without WebKitGTK - fallback)
        cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
        make bakery-launcher-linux -j4
    fi
    
    if [ ! -f "bakery-launcher-linux" ]; then
        echo "❌ x86_64 build failed!"
        exit 1
    fi
fi

echo "✅ x86_64 launcher ready"
echo ""

# ============================================
# 3. Build ARM64 launcher binary
# ============================================
echo "🔨 Building ARM64 launcher binary..."
BUILD_ARM64="$FRAMEWORK_DIR/launcher/build-linux-arm64-embedded"
mkdir -p "$BUILD_ARM64"
cd "$BUILD_ARM64"

if [[ $(uname) == "Linux" ]] && [[ $(uname -m) == "aarch64" ]]; then
    # Native ARM64 Linux build
    cmake .. -DCMAKE_BUILD_TYPE=Release
else
    # Cross-compile from macOS or x86_64 Linux
    if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
        echo "⚠️  aarch64-linux-musl-gcc not found! Skipping ARM64 build."
        echo "💡 Install: brew install FiloSottile/musl-cross/musl-cross"
        BUILD_ARM64=""
    else
        cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake
        make bakery-launcher-linux -j4
        
        if [ ! -f "bakery-launcher-linux" ]; then
            echo "⚠️  ARM64 build failed! Skipping."
            BUILD_ARM64=""
        else
            echo "✅ ARM64 launcher built"
        fi
    fi
fi

echo ""

cd "$FRAMEWORK_DIR"

# ============================================
# 3.5. Embed assets (needed for single executable)
# ============================================
echo "📦 Embedding assets..."
ASSETS_PATH="$BUILD_X64/bakery-assets"
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" "$ASSETS_PATH"

if [ ! -f "$ASSETS_PATH" ]; then
    echo "❌ Failed to embed assets!"
    exit 1
fi

echo "✅ Assets embedded: $(du -h "$ASSETS_PATH" | awk '{print $1}')"
echo ""

# ============================================
# 4. Pack everything into single executables
# ============================================
echo "📦 Packing single executables..."

# Check if Steamworks is enabled
STEAM_SO_X64=""
STEAM_SO_ARM64=""
CONFIG_FILE="$PROJECT_DIR/bakery.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        STEAM_SO_X64="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so"
        # Note: Steam doesn't provide ARM64 Linux binaries yet, but we prepare for it
        STEAM_SO_ARM64="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux_arm64/libsteam_api.so"
        
        if [ -f "$STEAM_SO_X64" ]; then
            echo "🎮 Embedding Steam SDK (x86_64) into executable..."
        else
            echo "⚠️  Steam SDK (x86_64) not found at: $STEAM_SO_X64"
            STEAM_SO_X64=""
        fi
    fi
fi

# Pack x86_64 executable
echo "📦 Packing x86_64 executable..."
if [ -f "$ASSETS_PATH" ]; then
    echo "   Using assets: $ASSETS_PATH ($(du -h "$ASSETS_PATH" | awk '{print $1}'))"
else
    echo "   ⚠️  Assets not found at: $ASSETS_PATH"
fi
bun scripts/pack-linux-single-exe.ts \
    "$BUILD_EMBEDDED/bakery-universal-launcher-linux-embedded" \
    "$BUILD_X64/bakery-launcher-linux" \
    "$OUTPUT_DIR/${APP_NAME}-x86_64" \
    ${STEAM_SO_X64:-""} \
    "$ASSETS_PATH"

echo "✅ x86_64 executable packed!"
echo ""

# Pack ARM64 executable if built
if [ -n "$BUILD_ARM64" ] && [ -f "$BUILD_ARM64/bakery-launcher-linux" ]; then
    echo "📦 Packing ARM64 executable..."
    
    # Build ARM64 Universal Launcher (needed for ARM64 builds!)
    BUILD_ARM64_UNIVERSAL="$FRAMEWORK_DIR/launcher/build-linux-universal-embedded-arm64"
    mkdir -p "$BUILD_ARM64_UNIVERSAL"
    cd "$BUILD_ARM64_UNIVERSAL"
    
    if [[ $(uname) == "Linux" ]] && [[ $(uname -m) == "aarch64" ]]; then
        # Native ARM64 Linux build
        cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
    else
        # Cross-compile from macOS or x86_64 Linux
        if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
            echo "⚠️  aarch64-linux-musl-gcc not found! Using x86-64 universal launcher (won't work on ARM64)"
            BUILD_ARM64_UNIVERSAL="$BUILD_EMBEDDED"
        else
            cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
            make bakery-universal-launcher-linux-embedded -j4
            if [ ! -f "bakery-universal-launcher-linux-embedded" ]; then
                echo "⚠️  ARM64 universal launcher build failed! Using x86-64 (won't work on ARM64)"
                BUILD_ARM64_UNIVERSAL="$BUILD_EMBEDDED"
            fi
        fi
    fi
    
    cd "$FRAMEWORK_DIR"
    
    STEAM_ARG=""
    if [ -f "$STEAM_SO_ARM64" ]; then
        echo "🎮 Embedding Steam SDK (ARM64) into executable..."
        STEAM_ARG="$STEAM_SO_ARM64"
    fi
    
    if [ -n "$STEAM_ARG" ]; then
        bun scripts/pack-linux-single-exe.ts \
            "$BUILD_ARM64_UNIVERSAL/bakery-universal-launcher-linux-embedded" \
            "$BUILD_ARM64/bakery-launcher-linux" \
            "$OUTPUT_DIR/${APP_NAME}-arm64" \
            "$STEAM_ARG" \
            "$ASSETS_PATH"
    else
        bun scripts/pack-linux-single-exe.ts \
            "$BUILD_ARM64_UNIVERSAL/bakery-universal-launcher-linux-embedded" \
            "$BUILD_ARM64/bakery-launcher-linux" \
            "$OUTPUT_DIR/${APP_NAME}-arm64" \
            "" \
            "$ASSETS_PATH"
    fi
    
    echo "✅ ARM64 executable packed!"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Linux Single Executables complete!"
echo ""
echo "📦 Output:"
echo "   $OUTPUT_DIR/${APP_NAME}-x86_64"
if [ -n "$BUILD_ARM64" ] && [ -f "$OUTPUT_DIR/${APP_NAME}-arm64" ]; then
    echo "   $OUTPUT_DIR/${APP_NAME}-arm64"
fi
echo ""
echo "📊 Sizes:"
du -h "$OUTPUT_DIR/${APP_NAME}-x86_64" | awk '{print "   " $2 ": " $1}'
if [ -n "$BUILD_ARM64" ] && [ -f "$OUTPUT_DIR/${APP_NAME}-arm64" ]; then
    du -h "$OUTPUT_DIR/${APP_NAME}-arm64" | awk '{print "   " $2 ": " $1}'
fi
echo ""
echo "🔐 Everything embedded (launcher + binary + assets + Steam)"
echo ""
# ============================================
# 4. Create .desktop files for double-click support
# ============================================
echo "📝 Creating .desktop files for double-click support..."

# Load config to get app name and icon
CONFIG_PATH="$PROJECT_DIR/bakery.config.js"
APP_TITLE="$APP_NAME"
ICON_PATH=""

if [ -f "$CONFIG_PATH" ]; then
    # Try to extract title and icon from config (macOS-compatible grep)
    APP_TITLE=$(grep -o 'title:[[:space:]]*"[^"]*"' "$CONFIG_PATH" | head -1 | sed 's/title:[[:space:]]*"\(.*\)"/\1/' || echo "$APP_NAME")
    ICON_PATH=$(grep -o 'icon:[[:space:]]*"[^"]*"' "$CONFIG_PATH" | head -1 | sed 's/icon:[[:space:]]*"\(.*\)"/\1/' || echo "")
fi

# Create .desktop file for x86_64
cat > "$OUTPUT_DIR/${APP_NAME}-x86_64.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${APP_TITLE}
Exec=${APP_NAME}-x86_64
Path=$(dirname "$OUTPUT_DIR")/linux
Icon=${APP_NAME}
Terminal=false
Categories=Game;
EOF
chmod +x "$OUTPUT_DIR/${APP_NAME}-x86_64.desktop"

# Create .desktop file for ARM64 if built
if [ -n "$BUILD_ARM64" ] && [ -f "$OUTPUT_DIR/${APP_NAME}-arm64" ]; then
    cat > "$OUTPUT_DIR/${APP_NAME}-arm64.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${APP_TITLE}
Exec=${APP_NAME}-arm64
Path=$(dirname "$OUTPUT_DIR")/linux
Icon=${APP_NAME}
Terminal=false
Categories=Game;
EOF
    chmod +x "$OUTPUT_DIR/${APP_NAME}-arm64.desktop"
fi

echo "✅ .desktop files created!"
echo ""

echo "🎯 User experience:"
echo "   → Download: ${APP_NAME}-x86_64 (or -arm64)"
echo "   → Double-click: ${APP_NAME}-x86_64.desktop (or right-click → Properties → Allow executing)"
echo "   → Or terminal: chmod +x ${APP_NAME}-x86_64 && ./${APP_NAME}-x86_64"
echo "   → Everything embedded, instant launch!"
echo ""


