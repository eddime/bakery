#!/bin/bash
# Download pre-built Linux binaries from GitHub Actions (like Neutralino)
# These binaries are stored in bin/ for cross-platform builds

set -e

GITHUB_REPO="eddime/bakery"
VERSION="${1:-latest}"

echo "📥 Downloading pre-built Linux binaries from GitHub Actions..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Create bin/ structure
mkdir -p bin/linux-x64 bin/linux-universal

# Download x64 launcher
echo "📦 Downloading x64 launcher..."
if curl -L -f -o "bin/linux-x64/bakery-launcher-linux" \
    "https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/bakery-launcher-linux-x64" 2>/dev/null; then
    chmod +x "bin/linux-x64/bakery-launcher-linux"
    echo "✅ x64 launcher downloaded"
else
    echo "⚠️  x64 launcher not available (build on Linux or wait for GitHub Actions)"
fi

echo ""

# Download universal launcher
echo "📦 Downloading universal launcher..."
if curl -L -f -o "bin/linux-universal/bakery-universal-launcher-linux-embedded" \
    "https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/bakery-universal-launcher-linux-embedded" 2>/dev/null; then
    chmod +x "bin/linux-universal/bakery-universal-launcher-linux-embedded"
    echo "✅ Universal launcher downloaded"
else
    echo "⚠️  Universal launcher not available (build on Linux or wait for GitHub Actions)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Download complete!"
echo ""
echo "📁 Binaries stored in:"
echo "   bin/linux-x64/bakery-launcher-linux"
echo "   bin/linux-universal/bakery-universal-launcher-linux-embedded"
echo ""
echo "💡 These binaries enable cross-platform builds (like Neutralino)"
echo "   Now you can build Linux games from macOS/Windows!"

