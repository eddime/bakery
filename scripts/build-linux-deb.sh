#!/bin/bash
# Build .deb package for Debian/Ubuntu
# Creates a professional .deb that installs to /usr/local/bin with .desktop integration

set -e

PROJECT_DIR="$1"
APP_NAME="$2"
VERSION="$3"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ] || [ -z "$VERSION" ]; then
    echo "Usage: $0 <project_dir> <app_name> <version>"
    exit 1
fi

echo " Building .deb package for ${APP_NAME} v${VERSION}"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

# Output to dist/linux
OUTPUT_DIR="$(cd "$PROJECT_DIR" && pwd)/dist/linux"
mkdir -p "$OUTPUT_DIR"

# Check if standalone x86_64 binary exists (kept by build-linux-single-executables.sh)
BINARY_SOURCE="$OUTPUT_DIR/${APP_NAME}-x86_64"
if [ ! -f "$BINARY_SOURCE" ]; then
    echo " x86_64 binary not found at: $BINARY_SOURCE"
    echo " The binary should be kept by build-linux-single-executables.sh when building .deb"
    echo " Make sure to run with KEEP_BINARY_FOR_DEB=1 environment variable!"
    exit 1
fi

echo " Found standalone x86_64 binary: $(du -h "$BINARY_SOURCE" | awk '{print $1}')"
echo "   (This binary has embedded assets + Steam SDK)"

# Load config to get app info
CONFIG_PATH="$PROJECT_DIR/gemcore.config.js"
APP_TITLE="$APP_NAME"
APP_DESCRIPTION="Game built with Gemcore"
ICON_PATH=""

if [ -f "$CONFIG_PATH" ]; then
    APP_TITLE=$(grep -o 'title:[[:space:]]*"[^"]*"' "$CONFIG_PATH" | head -1 | sed 's/title:[[:space:]]*"\(.*\)"/\1/' || echo "$APP_NAME")
    ICON_PATH=$(grep -o 'icon:[[:space:]]*"[^"]*"' "$CONFIG_PATH" | head -1 | sed 's/icon:[[:space:]]*"\(.*\)"/\1/' || echo "")
fi

echo " App Title: $APP_TITLE"
echo " Version: $VERSION"
echo ""

# Create .deb package structure
DEB_DIR="$OUTPUT_DIR/${APP_NAME}_${VERSION}_amd64"
rm -rf "$DEB_DIR"
mkdir -p "$DEB_DIR/DEBIAN"
mkdir -p "$DEB_DIR/usr/local/bin"
mkdir -p "$DEB_DIR/usr/share/applications"
mkdir -p "$DEB_DIR/usr/share/pixmaps"

# Copy binary to /usr/local/bin
echo " Packaging binary..."
cp "$BINARY_SOURCE" "$DEB_DIR/usr/local/bin/${APP_NAME}"
chmod +x "$DEB_DIR/usr/local/bin/${APP_NAME}"

# Copy icon if available
ICON_SOURCE=""
if [ -n "$ICON_PATH" ]; then
    if [ -f "$PROJECT_DIR/$ICON_PATH" ]; then
        ICON_SOURCE="$PROJECT_DIR/$ICON_PATH"
    elif [ -f "$PROJECT_DIR/assets/$ICON_PATH" ]; then
        ICON_SOURCE="$PROJECT_DIR/assets/$ICON_PATH"
    elif [ -f "$PROJECT_DIR/assets/icon.png" ]; then
        ICON_SOURCE="$PROJECT_DIR/assets/icon.png"
    fi
fi

if [ -n "$ICON_SOURCE" ] && [ -f "$ICON_SOURCE" ]; then
    cp "$ICON_SOURCE" "$DEB_DIR/usr/share/pixmaps/${APP_NAME}.png"
    echo " Icon included: ${APP_NAME}.png"
else
    # Try to extract icon from AppImage
    if [ -d "$EXTRACT_DIR" ] && [ -f "$EXTRACT_DIR/${APP_NAME}.png" ]; then
        cp "$EXTRACT_DIR/${APP_NAME}.png" "$DEB_DIR/usr/share/pixmaps/${APP_NAME}.png"
        echo " Icon extracted from AppImage"
    else
        echo "  No icon found (will use fallback)"
    fi
fi

# Cleanup extracted binary after packaging
trap "rm -f '$BINARY_SOURCE'" EXIT

# Create .desktop file (with full path for GUI launcher)
cat > "$DEB_DIR/usr/share/applications/${APP_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=${APP_TITLE}
Exec=/usr/local/bin/${APP_NAME}
Icon=${APP_NAME}
Categories=Game;
Terminal=false
StartupNotify=true
EOF

echo " .desktop file created"

# Calculate installed size (in KB)
INSTALLED_SIZE=$(du -sk "$DEB_DIR" | awk '{print $1}')

# Create control file
cat > "$DEB_DIR/DEBIAN/control" << EOF
Package: ${APP_NAME}
Version: ${VERSION}
Section: games
Priority: optional
Architecture: amd64
Installed-Size: ${INSTALLED_SIZE}
Maintainer: Gemcore <support@gemcore.dev>
Description: ${APP_TITLE}
 ${APP_DESCRIPTION}
 .
 Built with Gemcore - Modern game launcher framework
EOF

echo " control file created"

# Create postinst script to update desktop database
cat > "$DEB_DIR/DEBIAN/postinst" << 'EOF'
#!/bin/bash
# Update desktop database after installation
if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database -q /usr/share/applications || true
fi
exit 0
EOF
chmod +x "$DEB_DIR/DEBIAN/postinst"

# Create postrm script to clean up after uninstall
cat > "$DEB_DIR/DEBIAN/postrm" << 'EOF'
#!/bin/bash
# Update desktop database after uninstall
if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database -q /usr/share/applications || true
fi
exit 0
EOF
chmod +x "$DEB_DIR/DEBIAN/postrm"

echo " Post-install/remove scripts created"

# Build .deb package using native Bun builder (cross-platform!)
echo ""
echo " Building .deb package with native builder (no dpkg-deb needed)..."
DEB_FILE="${APP_NAME}_${VERSION}_amd64.deb"

# Use native Bun .deb builder
cd "$FRAMEWORK_DIR"
if [ -n "$ICON_SOURCE" ] && [ -f "$ICON_SOURCE" ]; then
    bun scripts/build-deb-native.ts "$BINARY_SOURCE" "$APP_NAME" "$VERSION" "$ICON_SOURCE"
else
    bun scripts/build-deb-native.ts "$BINARY_SOURCE" "$APP_NAME" "$VERSION"
fi

# Move .deb to output directory
if [ -f "$FRAMEWORK_DIR/$DEB_FILE" ]; then
    mv "$FRAMEWORK_DIR/$DEB_FILE" "$OUTPUT_DIR/$DEB_FILE"
else
    echo " Failed to create .deb package!"
    
    # Fallback to .sh installer
    echo " Falling back to self-extracting installer..."
    echo ""
    
    # Create self-installing script
    INSTALLER_FILE="${APP_NAME}-${VERSION}-installer.sh"
    
    # Create tarball of DEB_DIR
    TAR_FILE="/tmp/${APP_NAME}-${VERSION}.tar.gz"
    cd "$DEB_DIR/.."
    tar -czf "$TAR_FILE" "$(basename "$DEB_DIR")"
    
    # Create self-extracting installer script
    cat > "$OUTPUT_DIR/$INSTALLER_FILE" << 'INSTALLER_HEADER'
#!/bin/bash
# Self-extracting installer for Linux
# Works on any Linux distribution with sudo

set -e

APP_NAME="__APP_NAME__"
VERSION="__VERSION__"
APP_TITLE="__APP_TITLE__"

echo " Installing ${APP_TITLE} v${VERSION}..."
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo " This installer needs sudo privileges to install to /usr/local/bin"
    echo " Re-running with sudo..."
    echo ""
    exec sudo bash "$0" "$@"
fi

# Extract tarball (everything after __TARBALL_MARKER__)
SCRIPT="$0"
TEMP_DIR="/tmp/${APP_NAME}-install-$$"
mkdir -p "$TEMP_DIR"
trap "rm -rf '$TEMP_DIR'" EXIT

# Find tarball marker
TARBALL_START=$(grep -an "^__TARBALL_MARKER__$" "$SCRIPT" | tail -1 | cut -d: -f1)
if [ -z "$TARBALL_START" ]; then
    echo " Invalid installer format"
    exit 1
fi

# Extract tarball
tail -n +$((TARBALL_START + 1)) "$SCRIPT" | tar -xzf - -C "$TEMP_DIR" 2>/dev/null || {
    echo " Failed to extract installer"
    exit 1
}

# Find extracted directory
DEB_DIR=$(find "$TEMP_DIR" -maxdepth 1 -type d -name "${APP_NAME}_*" | head -1)
if [ -z "$DEB_DIR" ] || [ ! -d "$DEB_DIR" ]; then
    echo " Extracted directory not found"
    exit 1
fi

# Install files
echo " Installing binary to /usr/local/bin..."
cp "$DEB_DIR/usr/local/bin/${APP_NAME}" /usr/local/bin/
chmod +x "/usr/local/bin/${APP_NAME}"

echo " Installing .desktop file..."
mkdir -p /usr/share/applications
cp "$DEB_DIR/usr/share/applications/${APP_NAME}.desktop" /usr/share/applications/

echo " Installing icon..."
mkdir -p /usr/share/pixmaps
if [ -f "$DEB_DIR/usr/share/pixmaps/${APP_NAME}.png" ]; then
    cp "$DEB_DIR/usr/share/pixmaps/${APP_NAME}.png" /usr/share/pixmaps/
fi

# Update desktop database
if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database -q /usr/share/applications || true
fi

echo ""
echo " Installation complete!"
echo ""
echo " Run from terminal: ${APP_NAME}"
echo " Or find '${APP_TITLE}' in your application menu"
echo ""
echo " To uninstall:"
echo "   sudo rm /usr/local/bin/${APP_NAME}"
echo "   sudo rm /usr/share/applications/${APP_NAME}.desktop"
echo "   sudo rm /usr/share/pixmaps/${APP_NAME}.png"
echo ""
exit 0

__TARBALL_MARKER__
INSTALLER_HEADER
    
    # Replace placeholders
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/__APP_NAME__/${APP_NAME}/g" "$OUTPUT_DIR/$INSTALLER_FILE"
        sed -i '' "s/__VERSION__/${VERSION}/g" "$OUTPUT_DIR/$INSTALLER_FILE"
        sed -i '' "s/__APP_TITLE__/${APP_TITLE}/g" "$OUTPUT_DIR/$INSTALLER_FILE"
    else
        sed -i "s/__APP_NAME__/${APP_NAME}/g" "$OUTPUT_DIR/$INSTALLER_FILE"
        sed -i "s/__VERSION__/${VERSION}/g" "$OUTPUT_DIR/$INSTALLER_FILE"
        sed -i "s/__APP_TITLE__/${APP_TITLE}/g" "$OUTPUT_DIR/$INSTALLER_FILE"
    fi
    
    # Append tarball
    cat "$TAR_FILE" >> "$OUTPUT_DIR/$INSTALLER_FILE"
    chmod +x "$OUTPUT_DIR/$INSTALLER_FILE"
    
    # Cleanup
    rm -f "$TAR_FILE"
    rm -rf "$DEB_DIR"
    
    # Get file size
    FILE_SIZE=$(du -h "$OUTPUT_DIR/$INSTALLER_FILE" | awk '{print $1}')
    
    echo " Installer created successfully!"
    echo ""
    echo " Output: $OUTPUT_DIR/$INSTALLER_FILE ($FILE_SIZE)"
    echo ""
    echo " Installation (on Linux):"
    echo "   chmod +x $INSTALLER_FILE"
    echo "   ./$INSTALLER_FILE"
    echo ""
    
    echo " After installation:"
    echo "   - Run from terminal: ${APP_NAME}"
    echo "   - Or find '${APP_TITLE}' in application menu"
    echo "   - Double-click support enabled!"
    echo ""
    exit 0
fi

# Cleanup temp .deb build directory
rm -rf "$DEB_DIR"

# Get file size
FILE_SIZE=$(du -h "$OUTPUT_DIR/$DEB_FILE" | awk '{print $1}')

echo ""
echo " .deb package created successfully!"
echo ""
echo " Output: $OUTPUT_DIR/$DEB_FILE ($FILE_SIZE)"
echo ""
echo " Installation:"
echo "   sudo apt install ./$DEB_FILE"
echo ""
echo " Uninstallation:"
echo "   sudo apt remove ${APP_NAME}"
echo ""
echo " After installation:"
echo "   - Run from terminal: ${APP_NAME}"
echo "   - Or find '${APP_TITLE}' in application menu"
echo "   - Double-click support enabled!"
echo ""

# Cleanup the standalone binary now that .deb is built
echo " Cleaning up intermediate binary..."
rm -f "$BINARY_SOURCE" 2>/dev/null || true
echo ""

