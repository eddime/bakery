#!/bin/bash
# Trigger GitHub Actions workflow to build Linux binaries

set -e

GITHUB_REPO="eddime/gemcore"
WORKFLOW_FILE="build-linux-binaries.yml"

echo "🚀 Triggering GitHub Actions workflow..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if gh CLI is installed and authenticated
if command -v gh &> /dev/null; then
    if gh auth status &> /dev/null; then
        echo "✅ GitHub CLI authenticated"
        echo "📦 Triggering workflow: $WORKFLOW_FILE"
        gh workflow run "$WORKFLOW_FILE" --repo "$GITHUB_REPO"
        echo ""
        echo "✅ Workflow triggered!"
        echo ""
        echo "📊 Check status:"
        echo "   gh run list --workflow=\"$WORKFLOW_FILE\" --repo=\"$GITHUB_REPO\""
        echo ""
        echo "💡 Or visit: https://github.com/$GITHUB_REPO/actions"
        exit 0
    fi
fi

# Fallback: Manual instructions
echo "⚠️  GitHub CLI not authenticated"
echo ""
echo "📥 To trigger the workflow manually:"
echo ""
echo "1. Visit: https://github.com/$GITHUB_REPO/actions/workflows/$WORKFLOW_FILE"
echo "2. Click 'Run workflow' button"
echo "3. Click 'Run workflow' to confirm"
echo ""
echo "Or authenticate GitHub CLI:"
echo "   gh auth login"
echo ""

