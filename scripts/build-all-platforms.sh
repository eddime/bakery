#!/bin/bash
#  Build All Platforms with Auto-Version Increment
# Usage: ./scripts/build-all-platforms.sh <project_dir>

set -e

PROJECT_DIR="$1"

if [ -z "$PROJECT_DIR" ]; then
    echo "Usage: $0 <project_dir>"
    exit 1
fi

cd "$(dirname "$0")/.."
FRAMEWORK_DIR="$(pwd)"

CONFIG_FILE="$PROJECT_DIR/gemcore.config.js"

if [ ! -f "$CONFIG_FILE" ]; then
    echo " gemcore.config.js not found in $PROJECT_DIR"
    exit 1
fi

echo ""
echo " Building All Platforms with Auto-Version Increment"
echo ""
echo ""

# ============================================
# 1. Auto-increment version
# ============================================
echo " Auto-incrementing version..."

# Extract current version
CURRENT_VERSION=$(grep -o 'version: "[^"]*"' "$CONFIG_FILE" | sed 's/version: "\(.*\)"/\1/')

if [ -z "$CURRENT_VERSION" ]; then
    echo "  No version found, using 1.0.0"
    CURRENT_VERSION="1.0.0"
fi

echo "   Current version: $CURRENT_VERSION"

# Parse version (supports X.Y.Z and X.Y.Z-suffix)
if [[ $CURRENT_VERSION =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)(-.*)?$ ]]; then
    MAJOR="${BASH_REMATCH[1]}"
    MINOR="${BASH_REMATCH[2]}"
    PATCH="${BASH_REMATCH[3]}"
    SUFFIX="${BASH_REMATCH[4]}"
    
    # Increment patch version
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="${MAJOR}.${MINOR}.${NEW_PATCH}${SUFFIX}"
else
    echo "  Invalid version format, using 1.0.0"
    NEW_VERSION="1.0.0"
fi

echo "   New version: $NEW_VERSION"

# Update version in config
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/version: \"$CURRENT_VERSION\"/version: \"$NEW_VERSION\"/" "$CONFIG_FILE"
else
    # Linux
    sed -i "s/version: \"$CURRENT_VERSION\"/version: \"$NEW_VERSION\"/" "$CONFIG_FILE"
fi

echo " Version updated to $NEW_VERSION"
echo ""

# ============================================
# 2. Build macOS (parallel with Windows)
# ============================================
echo " Building macOS..."
./bake mac --dir "$PROJECT_DIR" > /tmp/gemcore-build-mac.log 2>&1 &
MAC_PID=$!

# ============================================
# 3. Build Windows (parallel with macOS)
# ============================================
echo " Building Windows..."
./bake win --dir "$PROJECT_DIR" > /tmp/gemcore-build-win.log 2>&1 &
WIN_PID=$!

# ============================================
# 4. Wait for both builds to complete
# ============================================
echo ""
echo " Waiting for builds to complete..."
echo "   (Building macOS and Windows in parallel)"
echo ""

# Wait for macOS
if wait $MAC_PID; then
    echo " macOS build complete!"
else
    echo " macOS build failed!"
    cat /tmp/gemcore-build-mac.log
    exit 1
fi

# Wait for Windows
if wait $WIN_PID; then
    echo " Windows build complete!"
else
    echo " Windows build failed!"
    cat /tmp/gemcore-build-win.log
    exit 1
fi

echo ""
echo ""
echo " All platforms built successfully!"
echo ""
echo ""
echo " Version: $NEW_VERSION"
echo ""
echo " Output:"
echo "   macOS:   $PROJECT_DIR/dist/mac/"
echo "   Windows: $PROJECT_DIR/dist/windows/"
echo ""

# Show sizes
if [ -d "$PROJECT_DIR/dist/mac" ]; then
    echo " macOS:"
    du -sh "$PROJECT_DIR/dist/mac"/*.app 2>/dev/null || true
fi

if [ -d "$PROJECT_DIR/dist/windows" ]; then
    echo " Windows:"
    du -sh "$PROJECT_DIR/dist/windows"/*.exe 2>/dev/null || true
fi

echo ""
echo " Ready to distribute!"
echo ""

