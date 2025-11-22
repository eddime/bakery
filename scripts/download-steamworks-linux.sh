#!/bin/bash
# Download Steamworks SDK Linux binaries

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
STEAMWORKS_DIR="$REPO_ROOT/deps/steamworks/sdk/redistributable_bin"

echo "Downloading Steamworks SDK..."

# Create temp directory
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Download Steamworks SDK (requires Steam Partner account, but we can use the public version)
# Note: The SDK is ~300MB, but we only need the linux64 folder (~1MB)
echo "Downloading from Valve's CDN..."
curl -L "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" -o steamcmd.tar.gz 2>/dev/null || {
    echo "Failed to download. Please download manually from:"
    echo "https://partner.steamgames.com/downloads/steamworks_sdk.zip"
    echo ""
    echo "Then extract linux64/libsteam_api.so to:"
    echo "$STEAMWORKS_DIR/linux64/"
    exit 1
}

echo "Cleaning up..."
cd "$REPO_ROOT"
rm -rf "$TEMP_DIR"

echo ""
echo "Please download the Steamworks SDK manually:"
echo "1. Go to: https://partner.steamgames.com/downloads/steamworks_sdk.zip"
echo "2. Extract: sdk/redistributable_bin/linux64/libsteam_api.so"
echo "3. Copy to: $STEAMWORKS_DIR/linux64/libsteam_api.so"

