#!/bin/bash
# Build Linux AppImage (like .app for macOS, .exe for Windows)
# AppImage = Single file, double-click to run, works on all Linux distros

set -e

PROJECT_DIR="$1"
APP_NAME="$2"

if [ -z "$PROJECT_DIR" ] || [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <project_dir> <app_name>"
    exit 1
fi

echo "📦 Building Linux AppImage"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"
PROJECT_DIR="$(cd "$PROJECT_DIR" && pwd)"
OUTPUT_DIR="$PROJECT_DIR/dist/linux"
mkdir -p "$OUTPUT_DIR"

# Load config
CONFIG_FILE="$PROJECT_DIR/bakery.config.js"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ bakery.config.js not found!"
    exit 1
fi

# Parse app name and version from config
APP_TITLE=$(node -p "require('$CONFIG_FILE').default.app.name" 2>/dev/null || echo "$APP_NAME")
APP_VERSION=$(node -p "require('$CONFIG_FILE').default.app.version" 2>/dev/null || echo "1.0.0")
ICON_PNG="$PROJECT_DIR/assets/icon.png"

echo "📱 App: $APP_TITLE"
echo "🔢 Version: $APP_VERSION"
echo ""

# 1. Build the single executable first
echo "🔨 Building single executable..."
bash "$FRAMEWORK_DIR/scripts/build-linux-single-executables.sh" "$PROJECT_DIR" "$APP_NAME"
echo ""

# 2. Create AppDir structure
APPDIR="$OUTPUT_DIR/${APP_NAME}.AppDir"
rm -rf "$APPDIR"
mkdir -p "$APPDIR/usr/bin"
mkdir -p "$APPDIR/usr/share/icons/hicolor/256x256/apps"
mkdir -p "$APPDIR/usr/share/applications"

echo "📁 Creating AppDir structure..."

# 3. Copy executable
cp "$OUTPUT_DIR/${APP_NAME}-x86_64" "$APPDIR/usr/bin/${APP_NAME}"
chmod +x "$APPDIR/usr/bin/${APP_NAME}"

# 4. Copy icon (if exists)
if [ -f "$ICON_PNG" ]; then
    cp "$ICON_PNG" "$APPDIR/usr/share/icons/hicolor/256x256/apps/${APP_NAME}.png"
    cp "$ICON_PNG" "$APPDIR/${APP_NAME}.png"
    echo "🎨 Icon: ✓"
else
    echo "⚠️  No icon found at: $ICON_PNG"
fi

# 5. Create .desktop file
cat > "$APPDIR/${APP_NAME}.desktop" << EOF
[Desktop Entry]
Type=Application
Name=$APP_TITLE
Exec=${APP_NAME}
Icon=${APP_NAME}
Categories=Game;
Terminal=false
EOF

cp "$APPDIR/${APP_NAME}.desktop" "$APPDIR/usr/share/applications/"
echo "📄 Desktop file: ✓"

# 6. Create AppRun script
cat > "$APPDIR/AppRun" << EOF
#!/bin/bash
SELF=\$(readlink -f "\$0")
HERE=\${SELF%/*}
export PATH="\${HERE}/usr/bin:\${PATH}"
exec "\${HERE}/usr/bin/${APP_NAME}" "\$@"
EOF

chmod +x "$APPDIR/AppRun"
echo "🚀 AppRun: ✓"

# 7. Build AppImage (only on Linux)
if [[ $(uname) == "Linux" ]]; then
    # Download appimagetool (if not exists)
    APPIMAGETOOL="$FRAMEWORK_DIR/bin/appimagetool-x86_64.AppImage"
    if [ ! -f "$APPIMAGETOOL" ]; then
        echo ""
        echo "📥 Downloading appimagetool..."
        mkdir -p "$FRAMEWORK_DIR/bin"
        curl -L "https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage" \
            -o "$APPIMAGETOOL"
        chmod +x "$APPIMAGETOOL"
        echo "✅ appimagetool downloaded"
    fi

    # Build AppImage
    echo ""
    echo "🔨 Building AppImage..."
    ARCH=x86_64 "$APPIMAGETOOL" "$APPDIR" "$OUTPUT_DIR/${APP_NAME}-${APP_VERSION}-x86_64.AppImage" 2>&1 | grep -v "WARNING" || true
else
    echo ""
    echo "⚠️  AppImage can only be built on Linux"
    echo "💡 The AppDir structure is ready at: $APPDIR"
    echo "💡 On Linux, run: ARCH=x86_64 appimagetool \"$APPDIR\" \"$OUTPUT_DIR/${APP_NAME}-${APP_VERSION}-x86_64.AppImage\""
    echo ""
    echo "📦 Single executable is available:"
    echo "   $OUTPUT_DIR/${APP_NAME}-x86_64"
    
    # Cleanup AppDir
    rm -rf "$APPDIR"
    exit 0
fi

if [ -f "$OUTPUT_DIR/${APP_NAME}-${APP_VERSION}-x86_64.AppImage" ]; then
    chmod +x "$OUTPUT_DIR/${APP_NAME}-${APP_VERSION}-x86_64.AppImage"
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ AppImage created successfully!"
    echo ""
    echo "📦 Output:"
    echo "   $OUTPUT_DIR/${APP_NAME}-${APP_VERSION}-x86_64.AppImage"
    echo ""
    echo "📊 Size:"
    du -h "$OUTPUT_DIR/${APP_NAME}-${APP_VERSION}-x86_64.AppImage" | awk '{print "   " $1}'
    echo ""
    echo "🎯 User experience:"
    echo "   → Download: ${APP_NAME}-${APP_VERSION}-x86_64.AppImage"
    echo "   → Double-click to run (or: chmod +x && ./${APP_NAME}-*.AppImage)"
    echo "   → Works on all Linux distros!"
    echo ""
else
    echo "❌ AppImage build failed!"
    exit 1
fi

# Cleanup AppDir
rm -rf "$APPDIR"

