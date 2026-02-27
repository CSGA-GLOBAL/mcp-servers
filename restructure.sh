#!/bin/bash
# Run this to restructure into packages/ layout for GitHub
set -e
cd "/sessions/brave-adoring-cerf/mcp-servers"
mkdir -p packages
for dir in */; do
  [ "$dir" = "packages/" ] && continue
  [ "$dir" = "node_modules/" ] && continue
  [ "$dir" = ".github/" ] && continue
  [ ! -f "$dir/package.json" ] && continue
  if [ ! -d "packages/$(basename $dir)" ]; then
    cp -r "$dir" "packages/$(basename $dir)"
    echo "  → packages/$(basename $dir)"
  fi
done
echo "✓ Restructured into packages/ layout"
