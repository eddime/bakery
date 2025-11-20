#!/bin/bash
#  Gemcore Dev Runner
# Starts dev server and launcher together

PROJECT_DIR="$1"
FRAMEWORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$PROJECT_DIR" ]; then
    echo " Usage: $0 <project_dir>"
    exit 1
fi

echo " GEMCORE DEV MODE "
echo ""
echo " Project: $PROJECT_DIR"
echo ""

# Start dev server in background
echo " Starting dev server..."
bun "$FRAMEWORK_DIR/scripts/dev-server.ts" "$PROJECT_DIR" &
DEV_SERVER_PID=$!

# Wait for server to start
sleep 0.5

# Start launcher (foreground)
echo " Starting WebView..."
echo ""
"$FRAMEWORK_DIR/launcher/build/gemcore-dev" "$PROJECT_DIR"

# Kill dev server when launcher exits
echo ""
echo " Shutting down dev server..."
kill $DEV_SERVER_PID 2>/dev/null
wait $DEV_SERVER_PID 2>/dev/null

echo " Gemcore closed"


