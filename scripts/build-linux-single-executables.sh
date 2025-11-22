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

echo " Building Linux Single Executables (x86_64 + ARM64)"
echo ""
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output to dist/linux (use absolute path)
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

# ============================================
# 1. Build Universal Launcher (Embedded)
# ============================================
echo " Building universal launcher..."
BUILD_EMBEDDED="$FRAMEWORK_DIR/launcher/build-linux-universal-embedded"
mkdir -p "$BUILD_EMBEDDED"
cd "$BUILD_EMBEDDED"

# Check if pre-built binary is cached locally (like Neutralino!)
PREBUILT_UNIVERSAL="$FRAMEWORK_DIR/launcher/prebuilt/gemcore-universal-launcher-linux-embedded"
UNIVERSAL_CACHED=false

if [ -f "$PREBUILT_UNIVERSAL" ]; then
    echo " Using cached pre-built universal launcher"
    cp "$PREBUILT_UNIVERSAL" "gemcore-universal-launcher-linux-embedded"
    chmod +x "gemcore-universal-launcher-linux-embedded"
    UNIVERSAL_CACHED=true
fi

if [ "$UNIVERSAL_CACHED" = false ]; then
    # Check if we have prebuilt x64 and ARM64 launchers - if so, we can skip universal launcher
    PREBUILT_X64="$FRAMEWORK_DIR/launcher/prebuilt/linux/gemcore-launcher-linux-x64"
    PREBUILT_ARM64="$FRAMEWORK_DIR/launcher/prebuilt/linux/gemcore-launcher-linux-arm64"
    
    if [ -f "$PREBUILT_X64" ] && [ -f "$PREBUILT_ARM64" ] && [[ $(uname) != "Linux" ]]; then
        echo " Skipping universal launcher (using prebuilt x64 + ARM64 binaries)"
        echo "   Universal launcher only needed for single-file distribution"
        UNIVERSAL_CACHED="skipped"
    elif [[ $(uname) == "Linux" ]]; then
        # Native Linux build
        cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
        make gemcore-universal-launcher-linux-embedded -j4
        
        if [ ! -f "gemcore-universal-launcher-linux-embedded" ]; then
            echo " Universal launcher build failed!"
            exit 1
        fi
    else
        # Cross-compile from macOS
        if ! command -v x86_64-linux-musl-gcc &> /dev/null; then
            echo "  x86_64-linux-musl-gcc not found - skipping universal launcher"
            echo " Install: brew install FiloSottile/musl-cross/musl-cross"
            echo " Or build will use separate x64/ARM64 executables"
            UNIVERSAL_CACHED="skipped"
        else
            cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
            make gemcore-universal-launcher-linux-embedded -j4
            
            if [ ! -f "gemcore-universal-launcher-linux-embedded" ]; then
                echo " Universal launcher build failed!"
                exit 1
            fi
        fi
    fi
fi

echo " Universal launcher ready"
echo ""

# ============================================
# 2. Build x86_64 launcher binary (with WebKitGTK)
# ============================================
echo " Building x86_64 launcher binary..."
BUILD_X64="$FRAMEWORK_DIR/launcher/build-linux-x64-embedded"
mkdir -p "$BUILD_X64"
cd "$BUILD_X64"

# Check if pre-built binary is cached locally (like Neutralino!)
PREBUILT_DIR="$FRAMEWORK_DIR/launcher/prebuilt/linux"
PREBUILT_BINARY="$PREBUILT_DIR/gemcore-launcher-linux-x64"
DOWNLOADED=false

if [ -f "$PREBUILT_BINARY" ]; then
    echo " Using cached pre-built x64 binary (with WebKitGTK)"
    cp "$PREBUILT_BINARY" "gemcore-launcher-linux"
    chmod +x "gemcore-launcher-linux"
    DOWNLOADED=true
elif [[ $(uname) != "Linux" ]]; then
    # Try to download from GitHub if not cached
    echo " Attempting to download pre-built x64 binary (with WebKitGTK)..."
    GITHUB_REPO="eddime/gemcore"
    VERSION="latest"
    BINARY_URL="https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/gemcore-launcher-linux-x64"
    
    if curl -L -f -o "gemcore-launcher-linux" "${BINARY_URL}" 2>/dev/null; then
        chmod +x "gemcore-launcher-linux"
        echo " Downloaded pre-built x64 binary (with WebKitGTK)"
        DOWNLOADED=true
    else
        echo "  Pre-built binary not available, will cross-compile (without WebKitGTK)"
    fi
fi

if [ "$DOWNLOADED" = false ]; then
    if [[ $(uname) == "Linux" ]]; then
        # Native Linux build with WebKitGTK
        cmake .. -DCMAKE_BUILD_TYPE=Release
        make gemcore-launcher-linux -j4
    else
        # Cross-compile from macOS (without WebKitGTK - fallback)
        cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-x86_64.cmake
        make gemcore-launcher-linux -j4
    fi
    
    if [ ! -f "gemcore-launcher-linux" ]; then
        echo " x86_64 build failed!"
        exit 1
    fi
fi

echo " x86_64 launcher ready"
echo ""

# ============================================
# 3. Build ARM64 launcher binary
# ============================================
echo " Building ARM64 launcher binary..."
BUILD_ARM64="$FRAMEWORK_DIR/launcher/build-linux-arm64-embedded"
mkdir -p "$BUILD_ARM64"
cd "$BUILD_ARM64"

# Check if pre-built ARM64 binary with WebKitGTK is cached locally (like Neutralino!)
PREBUILT_ARM64="$FRAMEWORK_DIR/launcher/prebuilt/linux/gemcore-launcher-linux-arm64"
ARM64_CACHED=false

if [ -f "$PREBUILT_ARM64" ]; then
    echo " Using cached pre-built ARM64 binary (with WebKitGTK)"
    cp "$PREBUILT_ARM64" "gemcore-launcher-linux"
    chmod +x "gemcore-launcher-linux"
    ARM64_CACHED=true
fi

if [ "$ARM64_CACHED" = false ]; then
    if [[ $(uname) == "Linux" ]] && [[ $(uname -m) == "aarch64" ]]; then
        # Native ARM64 Linux build with WebKitGTK
        cmake .. -DCMAKE_BUILD_TYPE=Release
        make gemcore-launcher-linux -j4
    else
        # Cross-compile from macOS or x86_64 Linux (without WebKitGTK - fallback)
        if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
            echo "  aarch64-linux-musl-gcc not found! Skipping ARM64 build."
            echo " Install: brew install FiloSottile/musl-cross/musl-cross"
            BUILD_ARM64=""
        else
            cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake
            make gemcore-launcher-linux -j4
            
            if [ ! -f "gemcore-launcher-linux" ]; then
                echo "  ARM64 build failed! Skipping."
                BUILD_ARM64=""
            else
                echo " ARM64 launcher built (without WebKitGTK - cross-compiled)"
            fi
        fi
    fi
fi

if [ -n "$BUILD_ARM64" ] && [ -f "$BUILD_ARM64/gemcore-launcher-linux" ]; then
    echo " ARM64 launcher ready"
fi

echo ""

cd "$FRAMEWORK_DIR"

# ============================================
# 3.5. Embed assets (needed for single executable)
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
# 4. Pack everything into single executables
# ============================================
echo " Packing single executables..."

# Check if Steamworks is enabled
STEAM_SO_X64=""
STEAM_SO_ARM64=""
CONFIG_FILE="$PROJECT_DIR/gemcore.config.js"
if [ -f "$CONFIG_FILE" ]; then
    if grep -q "enabled: true" "$CONFIG_FILE" 2>/dev/null; then
        # Try bin/steamworks first (prebuilt), then deps/steamworks (SDK)
        if [ -f "$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so" ]; then
            STEAM_SO_X64="$FRAMEWORK_DIR/bin/steamworks/linux/libsteam_api.so"
        elif [ -f "$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so" ]; then
            STEAM_SO_X64="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux64/libsteam_api.so"
        fi
        
        # Note: Steam doesn't provide ARM64 Linux binaries yet, but we prepare for it
        if [ -f "$FRAMEWORK_DIR/bin/steamworks/linux-arm64/libsteam_api.so" ]; then
            STEAM_SO_ARM64="$FRAMEWORK_DIR/bin/steamworks/linux-arm64/libsteam_api.so"
        elif [ -f "$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux_arm64/libsteam_api.so" ]; then
            STEAM_SO_ARM64="$FRAMEWORK_DIR/deps/steamworks/sdk/redistributable_bin/linux_arm64/libsteam_api.so"
        fi
        
        if [ -n "$STEAM_SO_X64" ] && [ -f "$STEAM_SO_X64" ]; then
            echo " Embedding Steam SDK (x86_64) into executable..."
        else
            echo "  Steam SDK (x86_64) not found"
            STEAM_SO_X64=""
        fi
    fi
fi

# Pack x86_64 executable
echo " Packing x86_64 executable..."
if [ -f "$ASSETS_PATH" ]; then
    echo "   Using assets: $ASSETS_PATH ($(du -h "$ASSETS_PATH" | awk '{print $1}'))"
else
    echo "     Assets not found at: $ASSETS_PATH"
fi

if [ "$UNIVERSAL_CACHED" = "skipped" ]; then
    # No universal launcher - create separate executable + assets
    echo " Creating separate executable (no universal launcher)"
    cp "$BUILD_X64/gemcore-launcher-linux" "$OUTPUT_DIR/${APP_NAME}-x86_64"
    cp "$ASSETS_PATH" "$OUTPUT_DIR/gemcore-assets"
    chmod +x "$OUTPUT_DIR/${APP_NAME}-x86_64"
    
    if [ -n "$STEAM_SO_X64" ] && [ -f "$STEAM_SO_X64" ]; then
        cp "$STEAM_SO_X64" "$OUTPUT_DIR/"
        echo " Copied Steam SDK (x86_64)"
    fi
else
    # Pack with universal launcher
    bun scripts/pack-linux-single-exe.ts \
        "$BUILD_EMBEDDED/gemcore-universal-launcher-linux-embedded" \
        "$BUILD_X64/gemcore-launcher-linux" \
        "$OUTPUT_DIR/${APP_NAME}-x86_64" \
        ${STEAM_SO_X64:-""} \
        "$ASSETS_PATH"
fi

echo " x86_64 executable packed!"
echo ""

# Pack ARM64 executable if built
if [ -n "$BUILD_ARM64" ] && [ -f "$BUILD_ARM64/gemcore-launcher-linux" ]; then
    echo " Packing ARM64 executable..."
    
    if [ "$UNIVERSAL_CACHED" = "skipped" ]; then
        # No universal launcher - create separate executable + assets
        echo " Creating separate executable (no universal launcher)"
        cp "$BUILD_ARM64/gemcore-launcher-linux" "$OUTPUT_DIR/${APP_NAME}-arm64"
        # Assets already copied for x64
        chmod +x "$OUTPUT_DIR/${APP_NAME}-arm64"
        
        if [ -n "$STEAM_SO_ARM64" ] && [ -f "$STEAM_SO_ARM64" ]; then
            cp "$STEAM_SO_ARM64" "$OUTPUT_DIR/"
            echo " Copied Steam SDK (ARM64)"
        fi
    else
        # Build ARM64 Universal Launcher (needed for ARM64 builds!)
        BUILD_ARM64_UNIVERSAL="$FRAMEWORK_DIR/launcher/build-linux-universal-embedded-arm64"
        mkdir -p "$BUILD_ARM64_UNIVERSAL"
        cd "$BUILD_ARM64_UNIVERSAL"
        
        # Check if pre-built ARM64 universal launcher is cached locally
        PREBUILT_ARM64_UNIVERSAL="$FRAMEWORK_DIR/launcher/prebuilt/linux/gemcore-universal-launcher-linux-embedded-arm64"
        ARM64_UNIVERSAL_CACHED=false
        
        if [ -f "$PREBUILT_ARM64_UNIVERSAL" ]; then
            echo " Using cached pre-built ARM64 universal launcher"
            cp "$PREBUILT_ARM64_UNIVERSAL" "gemcore-universal-launcher-linux-embedded"
            chmod +x "gemcore-universal-launcher-linux-embedded"
            ARM64_UNIVERSAL_CACHED=true
        fi
        
        if [ "$ARM64_UNIVERSAL_CACHED" = false ]; then
            if [[ $(uname) == "Linux" ]] && [[ $(uname -m) == "aarch64" ]]; then
                # Native ARM64 Linux build
                cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
                make gemcore-universal-launcher-linux-embedded -j4
            else
                # Cross-compile from macOS or x86_64 Linux
                if ! command -v aarch64-linux-musl-gcc &> /dev/null; then
                    echo "  aarch64-linux-musl-gcc not found! Using x86-64 universal launcher (won't work on ARM64)"
                    BUILD_ARM64_UNIVERSAL="$BUILD_EMBEDDED"
                else
                    cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/musl-cross-aarch64.cmake -DBUILD_UNIVERSAL_LAUNCHER_LINUX=ON
                    make gemcore-universal-launcher-linux-embedded -j4
                    if [ ! -f "gemcore-universal-launcher-linux-embedded" ]; then
                        echo "  ARM64 universal launcher build failed! Using x86-64 (won't work on ARM64)"
                        BUILD_ARM64_UNIVERSAL="$BUILD_EMBEDDED"
                    fi
                fi
            fi
        fi
        
        cd "$FRAMEWORK_DIR"
        
        STEAM_ARG=""
        if [ -f "$STEAM_SO_ARM64" ]; then
            echo " Embedding Steam SDK (ARM64) into executable..."
            STEAM_ARG="$STEAM_SO_ARM64"
        fi
        
        if [ -n "$STEAM_ARG" ]; then
            bun scripts/pack-linux-single-exe.ts \
                "$BUILD_ARM64_UNIVERSAL/gemcore-universal-launcher-linux-embedded" \
                "$BUILD_ARM64/gemcore-launcher-linux" \
                "$OUTPUT_DIR/${APP_NAME}-arm64" \
                "$STEAM_ARG" \
                "$ASSETS_PATH"
        else
            bun scripts/pack-linux-single-exe.ts \
                "$BUILD_ARM64_UNIVERSAL/gemcore-universal-launcher-linux-embedded" \
                "$BUILD_ARM64/gemcore-launcher-linux" \
                "$OUTPUT_DIR/${APP_NAME}-arm64" \
                "" \
                "$ASSETS_PATH"
        fi
    fi
    
    echo " ARM64 executable packed!"
    echo ""
fi

echo ""
echo " Linux Single Executables complete!"
echo ""
echo " Output:"
echo "   $OUTPUT_DIR/${APP_NAME}-x86_64"
if [ -n "$BUILD_ARM64" ] && [ -f "$OUTPUT_DIR/${APP_NAME}-arm64" ]; then
    echo "   $OUTPUT_DIR/${APP_NAME}-arm64"
fi
echo ""
echo " Sizes:"
du -h "$OUTPUT_DIR/${APP_NAME}-x86_64" | awk '{print "   " $2 ": " $1}'
if [ -n "$BUILD_ARM64" ] && [ -f "$OUTPUT_DIR/${APP_NAME}-arm64" ]; then
    du -h "$OUTPUT_DIR/${APP_NAME}-arm64" | awk '{print "   " $2 ": " $1}'
fi
echo ""
echo " Everything embedded (launcher + binary + assets + Steam)"
echo ""
# ============================================
# 4. Create .desktop files for double-click support
# ============================================
echo " Creating .desktop files for double-click support..."

# Load config to get app name and icon
CONFIG_PATH="$PROJECT_DIR/gemcore.config.js"
APP_TITLE="$APP_NAME"
ICON_PATH=""
ICON_FILE=""

if [ -f "$CONFIG_PATH" ]; then
    # Try to extract title and icon from config (macOS-compatible grep)
    APP_TITLE=$(grep -o 'title:[[:space:]]*"[^"]*"' "$CONFIG_PATH" | head -1 | sed 's/title:[[:space:]]*"\(.*\)"/\1/' || echo "$APP_NAME")
    ICON_PATH=$(grep -o 'icon:[[:space:]]*"[^"]*"' "$CONFIG_PATH" | head -1 | sed 's/icon:[[:space:]]*"\(.*\)"/\1/' || echo "")
fi

# Copy icon to output directory if available
if [ -n "$ICON_PATH" ]; then
    # Try multiple possible locations
    ICON_SOURCE=""
    if [ -f "$PROJECT_DIR/$ICON_PATH" ]; then
        ICON_SOURCE="$PROJECT_DIR/$ICON_PATH"
    elif [ -f "$PROJECT_DIR/assets/$ICON_PATH" ]; then
        ICON_SOURCE="$PROJECT_DIR/assets/$ICON_PATH"
    elif [ -f "$PROJECT_DIR/assets/icon.png" ]; then
        ICON_SOURCE="$PROJECT_DIR/assets/icon.png"
    fi
    
    if [ -n "$ICON_SOURCE" ] && [ -f "$ICON_SOURCE" ]; then
        ICON_FILE="${APP_NAME}.png"
        cp "$ICON_SOURCE" "$OUTPUT_DIR/$ICON_FILE"
        echo " Icon copied: $ICON_FILE"
    fi
fi

# Use absolute path for icon in .desktop file
ICON_ABSOLUTE=""
if [ -n "$ICON_FILE" ] && [ -f "$OUTPUT_DIR/$ICON_FILE" ]; then
    ICON_ABSOLUTE="$OUTPUT_DIR/$ICON_FILE"
else
    # Fallback: use app name (Linux will search in icon theme)
    ICON_ABSOLUTE="${APP_NAME}"
fi

# Create .desktop file for x86_64
cat > "$OUTPUT_DIR/${APP_NAME}-x86_64.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${APP_TITLE}
Exec=${APP_NAME}-x86_64
Path=$(dirname "$OUTPUT_DIR")/linux
Icon=${ICON_ABSOLUTE}
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
Icon=${ICON_ABSOLUTE}
Terminal=false
Categories=Game;
EOF
    chmod +x "$OUTPUT_DIR/${APP_NAME}-arm64.desktop"
fi

echo " .desktop files created!"
echo ""

# ============================================
# 5. Create proper AppImage using appimagetool (like Godot)
# Based on AppImage spec: https://docs.appimage.org/
# Reference: https://github.com/AppImageCommunity/awesome-appimage
# ============================================
echo " Creating AppImage (single file, like macOS .app)..."

create_proper_appimage() {
    local ARCH="$1"
    local BINARY_NAME="${APP_NAME}-${ARCH}"
    local OUTPUT_FILE="${APP_NAME}-${ARCH}.AppImage"
    
    if [ ! -f "$OUTPUT_DIR/$BINARY_NAME" ]; then
        return  # Skip if binary doesn't exist
    fi
    
    # Create AppDir structure (AppImage spec)
    APPDIR_TMP="$OUTPUT_DIR/${APP_NAME}-${ARCH}.AppDir"
    rm -rf "$APPDIR_TMP"
    mkdir -p "$APPDIR_TMP/usr/bin"
    mkdir -p "$APPDIR_TMP/usr/share/applications"
    mkdir -p "$APPDIR_TMP/usr/share/icons/hicolor/256x256/apps"
    
    # Copy binary
    if [ ! -f "$OUTPUT_DIR/$BINARY_NAME" ]; then
        echo "    Binary not found: $OUTPUT_DIR/$BINARY_NAME"
        return 1
    fi
    echo "    Copying binary ($(du -h "$OUTPUT_DIR/$BINARY_NAME" | awk '{print $1}'))..."
    cp "$OUTPUT_DIR/$BINARY_NAME" "$APPDIR_TMP/usr/bin/${APP_NAME}"
    chmod +x "$APPDIR_TMP/usr/bin/${APP_NAME}"
    
    # Copy assets (required by launcher)
    if [ -f "$OUTPUT_DIR/gemcore-assets" ]; then
        echo "    Copying assets ($(du -h "$OUTPUT_DIR/gemcore-assets" | awk '{print $1}'))..."
        cp "$OUTPUT_DIR/gemcore-assets" "$APPDIR_TMP/usr/bin/gemcore-assets"
    fi
    
    # Copy Steam SDK if available
    if [ -f "$OUTPUT_DIR/libsteam_api.so" ]; then
        echo "    Copying Steam SDK..."
        cp "$OUTPUT_DIR/libsteam_api.so" "$APPDIR_TMP/usr/bin/libsteam_api.so"
    fi
    
    # Copy icon if available
    if [ -n "$ICON_FILE" ] && [ -f "$OUTPUT_DIR/$ICON_FILE" ]; then
        cp "$OUTPUT_DIR/$ICON_FILE" "$APPDIR_TMP/usr/share/icons/hicolor/256x256/apps/${APP_NAME}.png"
        cp "$OUTPUT_DIR/$ICON_FILE" "$APPDIR_TMP/${APP_NAME}.png"
    fi
    
    # Create .desktop file (required for AppImage)
    cat > "$APPDIR_TMP/usr/share/applications/${APP_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${APP_TITLE}
Exec=${APP_NAME}
Icon=${APP_NAME}
Categories=Game;
Terminal=false
StartupNotify=true
EOF
    
    # Copy .desktop to root (AppImage spec requirement)
    cp "$APPDIR_TMP/usr/share/applications/${APP_NAME}.desktop" "$APPDIR_TMP/${APP_NAME}.desktop"
    
    # Create AppRun script (required for AppImage)
    cat > "$APPDIR_TMP/AppRun" << 'APPRUN_EOF'
#!/bin/bash
# AppRun - Entry point for AppImage
# Based on AppImage spec: https://docs.appimage.org/

HERE="$(dirname "$(readlink -f "${0}")")"
export PATH="${HERE}/usr/bin:${PATH}"

# CRITICAL FIX: Set LD_LIBRARY_PATH to find libsteam_api.so
# AppImage binaries are in /usr/bin inside the AppImage
export LD_LIBRARY_PATH="${HERE}/usr/bin:${LD_LIBRARY_PATH}"

# CRITICAL FIX: Create writable temp directory for Steamworks
# AppImage filesystem is read-only, so we need a temp dir for:
# 1. steam_appid.txt (created by launcher from encrypted config)
# 2. Steam IPC sockets and shared memory
TEMP_DIR="/tmp/gemcore_appimage_$$"
mkdir -p "$TEMP_DIR"

# Change to temp directory so launcher can write steam_appid.txt
cd "$TEMP_DIR"

# Cleanup temp dir on exit
cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

# Launch the game
exec "${HERE}/usr/bin/${APP_NAME}" "$@"
APPRUN_EOF
    
    chmod +x "$APPDIR_TMP/AppRun"
    
    # Try to use appimagetool if available (requires Linux)
    if command -v appimagetool &> /dev/null || [ -f "/usr/bin/appimagetool" ]; then
        echo "   Using appimagetool..."
        appimagetool "$APPDIR_TMP" "$OUTPUT_DIR/$OUTPUT_FILE" 2>/dev/null || {
            echo "     appimagetool failed, creating self-extracting version..."
            create_self_extracting_appimage "$ARCH" "$BINARY_NAME" "$OUTPUT_FILE" "$APPDIR_TMP"
        }
    elif [[ $(uname) == "Linux" ]]; then
        # Download appimagetool if on Linux
        APPIMAGETOOL="/tmp/appimagetool-x86_64.AppImage"
        if [ ! -f "$APPIMAGETOOL" ]; then
            echo "     Downloading appimagetool..."
            wget -q "https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage" -O "$APPIMAGETOOL" 2>/dev/null || {
                echo "     Could not download appimagetool, creating self-extracting version..."
                create_self_extracting_appimage "$ARCH" "$BINARY_NAME" "$OUTPUT_FILE" "$APPDIR_TMP"
                return
            }
            chmod +x "$APPIMAGETOOL"
        fi
        echo "   Using downloaded appimagetool..."
        "$APPIMAGETOOL" "$APPDIR_TMP" "$OUTPUT_DIR/$OUTPUT_FILE" 2>/dev/null || {
            echo "     appimagetool failed, creating self-extracting version..."
            create_self_extracting_appimage "$ARCH" "$BINARY_NAME" "$OUTPUT_FILE" "$APPDIR_TMP"
        }
    else
        # Cross-compile from macOS/Windows: Create self-extracting AppImage with full AppDir
        echo "   Creating self-extracting AppImage (cross-compile from $(uname))..."
        create_self_extracting_appimage "$ARCH" "$BINARY_NAME" "$OUTPUT_FILE" "$APPDIR_TMP"
        # Don't cleanup AppDir yet - it's needed for the self-extracting version
        return
    fi
    
    # Cleanup AppDir (only if we used appimagetool)
    rm -rf "$APPDIR_TMP"
    
    # Get file size
    if [ -f "$OUTPUT_DIR/$OUTPUT_FILE" ]; then
        FILE_SIZE=$(du -h "$OUTPUT_DIR/$OUTPUT_FILE" | awk '{print $1}')
        echo " Created: $OUTPUT_FILE ($FILE_SIZE)"
    fi
}

create_self_extracting_appimage() {
    local ARCH="$1"
    local BINARY_NAME="$2"
    local OUTPUT_FILE="$3"
    local APPDIR_TMP="$4"
    
    # Verify AppDir exists
    if [ ! -d "$APPDIR_TMP" ]; then
        echo "    AppDir not found: $APPDIR_TMP"
        return 1
    fi
    
    # Verify key files exist
    if [ ! -f "$APPDIR_TMP/AppRun" ]; then
        echo "    AppRun not found in AppDir"
        return 1
    fi
    
    if [ ! -f "$APPDIR_TMP/usr/bin/${APP_NAME}" ]; then
        echo "    Binary not found in AppDir"
        return 1
    fi
    
    echo "    Packing AppDir structure (with icon + .desktop)..."
    
    # Create temporary tar.gz file first
    TAR_FILE="/tmp/${APP_NAME}-${ARCH}.tar.gz.$$"
    cd "$APPDIR_TMP"
    
    tar -czf "$TAR_FILE" . || {
        echo "    Failed to create tar.gz archive"
        rm -f "$TAR_FILE"
        return 1
    }
    
    TAR_SIZE=$(du -h "$TAR_FILE" | awk '{print $1}')
    echo "    Packed AppDir: $TAR_SIZE"
    
    # Create self-extracting AppImage with full AppDir structure (works from macOS/Windows)
    # This embeds the entire AppDir as a tar.gz archive, preserving icon and .desktop file
    {
        cat << 'APPIMAGE_HEADER'
#!/bin/bash
# Self-extracting AppImage - Single file, double-click to run
# Compatible with AppImage spec: https://docs.appimage.org/
# Works from macOS/Windows cross-compilation!

set -e

# Get script location
SCRIPT="$0"
APPDIR="/tmp/gemcore_appimage_$$"
mkdir -p "$APPDIR"
trap "rm -rf '$APPDIR'" EXIT

# Extract AppDir (everything after __APPDIR_MARKER__)
# Use grep -a to treat binary file as text
APPDIR_START=$(grep -a -n "^__APPDIR_MARKER__$" "$SCRIPT" | tail -1 | cut -d: -f1)
if [ -z "$APPDIR_START" ]; then
    echo " Invalid AppImage format"
    echo "Debug: Could not find __APPDIR_MARKER__ in script"
    exit 1
fi

# Extract AppDir from tar.gz archive
tail -n +$((APPDIR_START + 1)) "$SCRIPT" | tar -xzf - -C "$APPDIR" 2>/dev/null || {
    echo " Failed to extract AppImage"
    echo "Debug: tar extraction failed"
    exit 1
}

# Make AppRun executable
chmod +x "$APPDIR/AppRun" 2>/dev/null || true

# Run AppRun (which will execute the binary)
exec "$APPDIR/AppRun" "$@"

__APPDIR_MARKER__
APPIMAGE_HEADER
    } > "$OUTPUT_DIR/$OUTPUT_FILE"
    
    # Append the tar.gz file (must be done separately to avoid shell redirection issues)
    cat "$TAR_FILE" >> "$OUTPUT_DIR/$OUTPUT_FILE"
    
    # Cleanup temp tar file
    rm -f "$TAR_FILE"
    
    chmod +x "$OUTPUT_DIR/$OUTPUT_FILE"
    
    # Verify the AppImage was created and has reasonable size
    if [ ! -f "$OUTPUT_DIR/$OUTPUT_FILE" ]; then
        echo "    AppImage file not created"
        return 1
    fi
    
    FILE_SIZE=$(du -h "$OUTPUT_DIR/$OUTPUT_FILE" | awk '{print $1}')
    FILE_SIZE_BYTES=$(stat -f%z "$OUTPUT_DIR/$OUTPUT_FILE" 2>/dev/null || stat -c%s "$OUTPUT_DIR/$OUTPUT_FILE" 2>/dev/null || echo "0")
    
    # Check if file is too small (less than 100KB means something went wrong)
    if [ "$FILE_SIZE_BYTES" -lt 102400 ]; then
        echo "     AppImage seems too small ($FILE_SIZE), checking..."
        # Check if tar.gz is actually in the file
        if ! grep -q "__APPDIR_MARKER__" "$OUTPUT_DIR/$OUTPUT_FILE"; then
            echo "    Marker not found in AppImage"
            return 1
        fi
    fi
    
    echo "    AppImage created: $OUTPUT_FILE ($FILE_SIZE)"
    
    # Cleanup AppDir after creating AppImage
    rm -rf "$APPDIR_TMP"
}

# Create AppImages
create_proper_appimage "x86_64"
if [ -n "$BUILD_ARM64" ] && [ -f "$OUTPUT_DIR/${APP_NAME}-arm64" ]; then
    create_proper_appimage "arm64"
fi

# Clean up intermediate files (keep only AppImage - icon is embedded!)
echo ""
echo " Cleaning up intermediate files..."
rm -f "$OUTPUT_DIR/${APP_NAME}-x86_64" "$OUTPUT_DIR/${APP_NAME}-arm64" 2>/dev/null || true
rm -f "$OUTPUT_DIR/${APP_NAME}-x86_64.desktop" "$OUTPUT_DIR/${APP_NAME}-arm64.desktop" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/${APP_NAME}.app" "$OUTPUT_DIR/${APP_NAME}-arm64.app" 2>/dev/null || true
rm -f "$OUTPUT_DIR/${APP_NAME}.app.desktop" "$OUTPUT_DIR/${APP_NAME}-arm64.app.desktop" 2>/dev/null || true
rm -f "$OUTPUT_DIR/${APP_NAME}-x86_64.AppImage.desktop" "$OUTPUT_DIR/${APP_NAME}-arm64.AppImage.desktop" 2>/dev/null || true
rm -f "$OUTPUT_DIR/$ICON_FILE" 2>/dev/null || true  # Icon is embedded in AppImage
rm -f "$OUTPUT_DIR/gemcore-assets" 2>/dev/null || true  # Assets are embedded in AppImage
rm -f "$OUTPUT_DIR/libsteam_api.so" 2>/dev/null || true  # Steam SDK is embedded in AppImage
rm -f "$OUTPUT_DIR/install-${APP_NAME}.sh" 2>/dev/null || true
rm -f "$OUTPUT_DIR/README.txt" 2>/dev/null || true
echo " Cleanup complete (only AppImage files remain - everything embedded!)"

# No additional files needed - everything is in the AppImage!

echo ""
echo " User experience:"
echo "    AppImage (single file, like macOS .app):"
echo "      � Download: ${APP_NAME}-x86_64.AppImage"
echo "      � Make executable: chmod +x ${APP_NAME}-x86_64.AppImage"
echo "      � Run: ./${APP_NAME}-x86_64.AppImage"
echo "      � Icon embedded, works on any Linux!"
echo ""
if [[ $(uname) != "Linux" ]]; then
    echo "    Note: Built from $(uname) (self-extracting AppImage format)"
    echo "    Full AppDir structure included (icon + .desktop embedded)"
    echo ""
fi
echo "    Everything embedded in ONE file!"
echo ""
echo "    For double-click support on Ubuntu:"
echo "      � Right-click AppImage � Properties � Permissions"
echo "      � Enable 'Allow executing file as program'"
echo "      � Or use: chmod +x ${APP_NAME}-x86_64.AppImage"


