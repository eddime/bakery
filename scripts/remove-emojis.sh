#!/bin/bash
# Remove all emojis from source files

set -e

cd "$(dirname "$0")/.."

echo "Removing emojis from all source files..."

# List of common emojis to remove
EMOJI_PATTERN='[🎮🚀✅❌⚠️📦💡🔧🎯🎨🐧🍎🪟🔨🔐💾📁📊🧹🏗️⬇️🔍📝🎉💻🖥️⚡🥐🔒📄🔑🌐🔄💬📋🎪🔥💪🏃‍♂️🎁🛠️📱🖼️🎬🎵🎤🎸🎹🎺🎻🥁🎲🎰🎳🎯🎪🎭🎨🖌️🖍️📐📏📌📍📎🖇️📏📐✂️🗂️🗃️🗄️🗑️🔒🔓🔏🔐🔑🗝️🔨🪓⛏️⚒️🛠️🗡️⚔️🔫🏹🛡️🔧🔩⚙️🗜️⚖️🦯🔗⛓️🧰🧲⚗️🧪🧫🧬🔬🔭📡💉💊🩹🩺🚪🛏️🛋️🪑🚽🚿🛁🪒🧴🧷🧹🧺🧻🧼🧽🧯🛒🚬⚰️⚱️🗿]'

# Find all source files and remove emojis
find . -type f \( \
    -name "*.cpp" -o \
    -name "*.h" -o \
    -name "*.ts" -o \
    -name "*.js" -o \
    -name "*.sh" -o \
    -name "*.md" -o \
    -name "bake" \
\) ! -path "*/node_modules/*" \
   ! -path "*/.git/*" \
   ! -path "*/dist/*" \
   ! -path "*/build*/*" \
   ! -path "*/_deps/*" \
   ! -path "*/launcher/gemcore-assets" \
   ! -path "*/examples/*/src/*" \
   ! -name "remove-emojis.sh" \
   -print0 | while IFS= read -r -d '' file; do
    
    # Check if file contains emojis
    if grep -q "$EMOJI_PATTERN" "$file" 2>/dev/null; then
        echo "Processing: $file"
        # Remove emojis using sed (macOS compatible)
        LC_ALL=C sed -i '' "s/$EMOJI_PATTERN//g" "$file"
    fi
done

echo ""
echo "Done! All emojis removed from source files."
echo ""
echo "Note: Example game files (examples/*/src/*) were NOT modified."

