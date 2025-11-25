#!/bin/bash
# Build Linux Single Binary (like Godot!)
# Embeds launcher + assets + Steam SDK into ONE ELF binary
# x86_64 ONLY - like Godot's .x86_64 format

set -e

PROJECT_DIR="$1"
APP_NAME="$2"
VERSION="$3"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ] || [ -z "$VERSION" ]; then
    echo "Usage: $0 <project_dir> <app_name> <version>"
    exit 1
fi

echo " Building Linux Binary (like Godot!)"
echo " Format: ${APP_NAME}_${VERSION}_x64"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output to dist/linux (use absolute path)
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

# ============================================
# 1. Build x86_64 launcher binary (with WebKitGTK)
# ============================================
echo " Building x86_64 launcher binary..."
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

# Check if pre-built binary is cached locally
PREBUILT_DIR="$FRAMEWORK_DIR/launcher/prebuilt/linux"
PREBUILT_BINARY="$PREBUILT_DIR/gemcore-launcher-linux-x64"
DOWNLOADED=false

if [ -f "$PREBUILT_BINARY" ]; then
    echo " Using prebuilt x64 launcher (with WebKitGTK + Steamworks)"
    cp "$PREBUILT_BINARY" "gemcore-launcher-linux"
    chmod +x "gemcore-launcher-linux"
    DOWNLOADED=true
elif [[ $(uname) != "Linux" ]]; then
    echo "  Prebuilt binary not available"
    echo "  Cross-compilation from macOS not supported for WebKitGTK"
    echo "  Please build on Linux or provide prebuilt binary"
    exit 1
fi

if [ "$DOWNLOADED" = false ]; then
    if [[ $(uname) == "Linux" ]]; then
        # Native Linux build with WebKitGTK
        cmake .. -DCMAKE_BUILD_TYPE=Release -DENABLE_STEAMWORKS=ON
        make gemcore-launcher-linux -j4
    else
        echo " Error: Cannot build on $(uname)"
        exit 1
    fi
    
    if [ ! -f "gemcore-launcher-linux" ]; then
        echo " x86_64 build failed!"
        exit 1
    fi
fi

echo " x86_64 launcher: $(du -h "gemcore-launcher-linux" | awk '{print $1}')"
echo ""

cd "$FRAMEWORK_DIR"

# ============================================
# 2. Embed assets
# ============================================
echo " Embedding assets..."
ASSETS_PATH="$BUILD_X64/gemcore-assets"
bun scripts/embed-assets-shared.ts "$PROJECT_DIR" "$ASSETS_PATH"

if [ ! -f "$ASSETS_PATH" ]; then
    echo " Failed to embed assets!"
    exit 1
fi

echo " Assets embedded: $(du -h "$ASSETS_PATH" | awk '{print $1}')"
echo ""

# ============================================
# 3. Check if Steamworks is enabled
# ============================================
STEAM_SO_X64=""
CONFIG_FILE="$PROJECT_DIR/gemcore.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        # Try bin/steamworks first (prebuilt), then deps/steamworks (SDK)
        if [ -f "$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so" ]; then
            STEAM_SO_X64="$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so"
        elif [ -f "$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so" ]; then
            STEAM_SO_X64="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so"
        fi
        
        if [ -n "$STEAM_SO_X64" ] && [ -f "$STEAM_SO_X64" ]; then
            echo " Embedding Steam SDK (x86_64)..."
            echo "   $(du -h "$STEAM_SO_X64" | awk '{print $1}')"
        else
            echo "  Steam SDK (x86_64) not found"
            STEAM_SO_X64=""
        fi
    fi
fi

# ============================================
# 4. Build Universal Launcher (Embedded) - like Godot's packer
# ============================================
echo " Building embedded launcher (packs binary + assets + Steam SDK)..."
BUILD_EMBEDDED="$FRAMEWORK_DIR/launcher/build-linux-universal-embedded"
mkdir -p "$BUILD_EMBEDDED"
cd "$BUILD_EMBEDDED"

# Check if we have prebuilt universal launcher
PREBUILT_UNIVERSAL="$FRAMEWORK_DIR/launcher/prebuilt/gemcore-universal-launcher-linux-embedded"
UNIVERSAL_CACHED=false

if [ -f "$PREBUILT_UNIVERSAL" ]; then
    echo " Using cached universal launcher"
    cp "$PREBUILT_UNIVERSAL" "gemcore-universal-launcher-linux-embedded"
    chmod +x "gemcore-universal-launcher-linux-embedded"
    UNIVERSAL_CACHED=true
fi

if [ "$UNIVERSAL_CACHED" = false ]; then
    # Check if we have prebuilt x64 launcher to use directly
    PREBUILT_X64_FOR_UNIVERSAL="$FRAMEWORK_DIR/launcher/prebuilt/linux/gemcore-launcher-linux-x64"
    
    if [ -f "$PREBUILT_X64_FOR_UNIVERSAL" ] && [[ $(uname) != "Linux" ]]; then
        echo " Using prebuilt x64 launcher (skipping universal wrapper)"
        cp "$PREBUILT_X64_FOR_UNIVERSAL" "gemcore-universal-launcher-linux-embedded"
        chmod +x "gemcore-universal-launcher-linux-embedded"
        UNIVERSAL_CACHED=true
    elif [[ $(uname) == "Linux" ]]; then
        # Native Linux build
        cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
        make gemcore-universal-launcher-linux-embedded -j4
        
        if [ ! -f "gemcore-universal-launcher-linux-embedded" ]; then
            echo " Universal launcher build failed!"
            exit 1
        fi
    else
        echo "  Prebuilt universal launcher required for cross-compilation"
        echo "  Please build on Linux or provide prebuilt universal launcher"
        exit 1
    fi
fi

echo " Universal launcher ready"
echo ""

cd "$FRAMEWORK_DIR"

# ============================================
# 5. Create self-extracting binary (like Godot, but with Steam SDK!)
# ============================================
echo " Creating self-extracting binary (like Godot's .x86_64)..."

OUTPUT_BINARY="${APP_NAME}_${VERSION}_x64"

# Create self-extracting shell script that embeds everything
cat > "$OUTPUT_DIR/$OUTPUT_BINARY" << 'EXTRACTOR_HEADER'
#!/bin/bash
# Self-extracting Gemcore binary (like Godot!)
# Extracts launcher + assets + Steam SDK to /tmp and runs

set -e

# Create unique temp directory
TEMP_DIR="/tmp/gemcore_$$"
mkdir -p "$TEMP_DIR"

# Cleanup on exit
cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

# Extract embedded files (after __GEMCORE_DATA__ marker)
SCRIPT="$0"
DATA_START=$(grep -a -n "^__GEMCORE_DATA__$" "$SCRIPT" | tail -1 | cut -d: -f1)
if [ -z "$DATA_START" ]; then
    echo " Error: Invalid Gemcore binary (no data marker found)"
    exit 1
fi

# Extract tar.gz archive
tail -n +$((DATA_START + 1)) "$SCRIPT" | tar -xzf - -C "$TEMP_DIR" 2>/dev/null || {
    echo " Error: Failed to extract Gemcore binary data"
    exit 1
}

# Set LD_LIBRARY_PATH so libsteam_api.so is found
export LD_LIBRARY_PATH="$TEMP_DIR:$LD_LIBRARY_PATH"

# Change to temp dir (for steam_appid.txt)
cd "$TEMP_DIR"

# Execute the launcher
chmod +x "$TEMP_DIR/launcher"
exec "$TEMP_DIR/launcher" "$@"

__GEMCORE_DATA__
EXTRACTOR_HEADER

# Create temporary directory for packing
PACK_DIR="/tmp/gemcore_pack_$$"
mkdir -p "$PACK_DIR"

# Copy files to pack
cp "$BUILD_X64/gemcore-launcher-linux" "$PACK_DIR/launcher"
cp "$ASSETS_PATH" "$PACK_DIR/gemcore-assets"

if [ -n "$STEAM_SO_X64" ] && [ -f "$STEAM_SO_X64" ]; then
    cp "$STEAM_SO_X64" "$PACK_DIR/libsteam_api.so"
    echo " Steam SDK included"
fi

# Create tar.gz archive
TAR_FILE="/tmp/gemcore_data_$$.tar.gz"
cd "$PACK_DIR"
tar -czf "$TAR_FILE" . || {
    echo " Failed to create archive"
    rm -rf "$PACK_DIR"
    exit 1
}

# Append archive to shell script
cat "$TAR_FILE" >> "$OUTPUT_DIR/$OUTPUT_BINARY"

# Cleanup
rm -rf "$PACK_DIR" "$TAR_FILE"

# Make executable
chmod +x "$OUTPUT_DIR/$OUTPUT_BINARY"

FILE_SIZE=$(du -h "$OUTPUT_DIR/$OUTPUT_BINARY" | awk '{print $1}')
echo " Self-extracting binary created: $FILE_SIZE"
echo ""

# ============================================
# 6. Show results
# ============================================
echo ""
echo " Linux Binary complete!"
echo ""
echo " Output: $OUTPUT_DIR/$OUTPUT_BINARY"
echo " Size: $(du -h "$OUTPUT_DIR/$OUTPUT_BINARY" | awk '{print $1}')"
echo ""
echo " Everything embedded (launcher + assets + Steam SDK)"
echo ""
echo " Usage:"
echo "   1. For Steam: Upload '$OUTPUT_BINARY' to depot"
echo "   2. For Direct Download:"
echo "      chmod +x $OUTPUT_BINARY"
echo "      ./$OUTPUT_BINARY"
echo ""
echo " Note: Like Godot, no icon in file manager (Linux limitation)"
echo "       Icon shown after installation or in Steam library"
echo ""

