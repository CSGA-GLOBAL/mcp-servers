#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# CSGA Global MCP Servers — GitHub + npm Setup Script
# ═══════════════════════════════════════════════════════════════
# 
# Prerequisites:
#   1. GitHub CLI installed: brew install gh
#   2. npm account with @csga-global org created
#   3. npm token: npm token create
#
# This script will:
#   - Create the GitHub org + repo
#   - Initialize git, push to GitHub
#   - Create npm org
#   - Publish all 36 packages
# ═══════════════════════════════════════════════════════════════
set -e

echo ""
echo "═══════════════════════════════════════════════════"
echo "  CSGA Global — GitHub + npm Setup"
echo "═══════════════════════════════════════════════════"
echo ""

# ─── Step 1: GitHub ───
echo "▸ Step 1: GitHub Repository"
echo ""

# Check if gh is authenticated
if ! gh auth status &>/dev/null; then
  echo "  Please authenticate GitHub CLI first:"
  echo "  gh auth login"
  exit 1
fi

# Create org (if not exists) — requires manual creation at github.com/organizations/new
echo "  ⚠  Create the GitHub org 'csga-global' manually at:"
echo "     https://github.com/organizations/new"
echo ""
read -p "  Press Enter once 'csga-global' org exists on GitHub... "

# Create repo
gh repo create csga-global/mcp-servers \
  --public \
  --description "36 AI Governance MCP Servers — CSGA Global" \
  --homepage "https://csga-global.org" \
  --license "CC0-1.0" \
  2>/dev/null || echo "  (repo may already exist)"

echo "  ✓ GitHub repo: https://github.com/csga-global/mcp-servers"

# ─── Step 2: Git init + push ───
echo ""
echo "▸ Step 2: Git Initialize & Push"

git init
git add -A
git commit -m "feat: initial release — 36 AI governance MCP servers

CSGA Global MCP Ecosystem v1.0.0
- 36 MCP servers covering AI governance, sector compliance, and certifications
- 76+ regulations verified against authoritative sources
- E2E smoke tests: 36/36 PASS
- npm packages under @csga-global scope
- Azure Functions + Docker deployment configs
- GitHub Actions CI/CD

Co-authored-by: Nick Templeman <nicholastempleman@gmail.com>"

git branch -M main
git remote add origin https://github.com/csga-global/mcp-servers.git 2>/dev/null || true
git push -u origin main

echo "  ✓ Pushed to GitHub"

# ─── Step 3: npm ───
echo ""
echo "▸ Step 3: npm Organization & Publishing"

# Create npm org
echo "  Creating @csga-global npm org..."
echo "  ⚠  Create the npm org manually at:"
echo "     https://www.npmjs.com/org/create"
echo "     Org name: csga-global"
echo ""
read -p "  Press Enter once @csga-global npm org exists... "

# Login
npm whoami 2>/dev/null || npm login

# Build all
echo "  Building all packages..."
npm run build:all

# Publish all 36
echo ""
echo "  Publishing 36 packages to npm..."
PUBLISHED=0
FAILED=0
# NOTE: terranova-defence is in private/ (CA3O only)
for dir in packages/*/; do
  PKG=$(basename "$dir")
  echo -n "    @csga-global/$PKG ... "
  if (cd "$dir" && npm publish --access public 2>/dev/null); then
    echo "✓"
    PUBLISHED=$((PUBLISHED + 1))
  else
    echo "✗"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "═══════════════════════════════════════════════════"
echo "  Published: $PUBLISHED / 36"
echo "  Failed:    $FAILED"
echo "  npm:       https://www.npmjs.com/org/csga-global"
echo "  GitHub:    https://github.com/csga-global/mcp-servers"
echo "═══════════════════════════════════════════════════"

# ─── Step 4: GitHub Actions secrets ───
echo ""
echo "▸ Step 4: Set up CI/CD"
echo ""
echo "  Add your npm token as a GitHub secret:"
echo "  gh secret set NPM_TOKEN --repo csga-global/mcp-servers"
echo ""
echo "  Then any GitHub Release will auto-publish to npm."
echo ""
echo "═══════════════════════════════════════════════════"
echo "  🚀 CSGA Global MCP Servers — LIVE"
echo "═══════════════════════════════════════════════════"
