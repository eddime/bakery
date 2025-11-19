#!/bin/bash
# Finalize Linux AppImage (run this ON LINUX after copying from macOS)
# This script converts the prepared AppDir into an AppImage

set -e

if [[ $(uname) != "Linux" ]]; then
    echo "❌ This script must be run on Linux!"
    echo "💡 Copy the entire project to Linux first, then run this script"
    exit 1
fi

PROJECT_DIR="$1"
if [ -z "$PROJECT_DIR" ]; then
    echo "Usage: $0 <project_dir>"
    echo "Example: $0 ./examples/stress-test"
    exit 1
fi

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"
PROJECT_DIR="$(cd "$PROJECT_DIR" && pwd)"
OUTPUT_DIR="$PROJECT_DIR/dist/linux"

# Find AppDir
APPDIR=$(find "$OUTPUT_DIR" -maxdepth 1 -name "*.AppDir" -type d | head -1)
if [ -z "$APPDIR" ]; then
    echo "❌ No AppDir found in $OUTPUT_DIR"
    echo "💡 Run './bake linux --dir $PROJECT_DIR' first"
    exit 1
fi

APP_NAME=$(basename "$APPDIR" .AppDir)
APP_VERSION=$(grep "Version=" "$APPDIR/${APP_NAME}.desktop" 2>/dev/null | cut -d'=' -f2 || echo "1.0.0")

echo "📦 Finalizing AppImage for: $APP_NAME"
echo "🔢 Version: $APP_VERSION"
echo ""

# Download appimagetool (if not exists)
APPIMAGETOOL="$FRAMEWORK_DIR/bin/appimagetool-x86_64.AppImage"
if [ ! -f "$APPIMAGETOOL" ]; then
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
    echo "   → Double-click to run!"
    echo "   → Works on all Linux distros"
    echo ""
    
    # Cleanup AppDir
    rm -rf "$APPDIR"
else
    echo "❌ AppImage build failed!"
    exit 1
fi

