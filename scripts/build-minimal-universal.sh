#!/bin/bash
# 🥐 Bakery Minimal Universal Binary
# FAT binary (runtime only) + Separate asset file = MINIMUM size!

set -e

PROJECT_DIR="$1"
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$PROJECT_DIR" ]; then
    echo "❌ Usage: $0 <project_dir>"
    exit 1
fi

echo "🥐 Bakery Minimal Universal Binary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Strategy: FAT binary (200 KB x2) + Shared assets (8.8 MB)"
echo "   Total: ~9.2 MB (vs. 18 MB with duplication)"
echo ""

# 1. Create asset archive
echo "📦 Creating asset archive..."
ASSETS_ARCHIVE="$FRAMEWORK_DIR/launcher/assets.tar.gz"
cd "$PROJECT_DIR/src"
tar -czf "$ASSETS_ARCHIVE" .
ASSETS_SIZE=$(stat -f%z "$ASSETS_ARCHIVE")
echo "✅ Assets: $(echo "scale=1; $ASSETS_SIZE/1024/1024" | bc) MB (compressed)"
echo ""

# 2. Build runtime-only binaries (NO assets embedded)
# We'll create a minimal launcher that loads assets from .tar.gz

echo "🏗️  Building minimal ARM64 runtime..."
# TODO: Modify bakery-ultra.cpp to load from external assets.tar.gz
# For now, show the concept

echo "💡 Concept:"
echo "   1. Runtime code:   ~200 KB x2 = 400 KB (FAT binary)"
echo "   2. Assets file:    ~8.8 MB (shared .tar.gz)"
echo "   3. Total:          ~9.2 MB"
echo ""
echo "   Savings: 18 MB → 9.2 MB (48% reduction!)"
echo ""

# Cleanup
rm "$ASSETS_ARCHIVE"

echo "⚠️  This requires code changes to support external assets"
echo "💡 Alternative: Keep current approach (18 MB) for simplicity"
echo ""
echo "Current options:"
echo "   A) FAT binary with embedded assets: 18 MB (simple, no external files)"
echo "   B) FAT binary + external assets:    9 MB (complex, requires loader)"
echo ""
echo "Recommendation: Keep option A (simplicity > 9 MB savings)"


