#!/bin/bash
# Deploy CSGA Global MCP Servers to Azure Functions
set -e

RESOURCE_GROUP="csga-mcp-servers"
LOCATION="canadacentral"  # Canada-first strategy

echo "═══════════════════════════════════════════"
echo "  CSGA Global — Azure Functions Deployment"
echo "═══════════════════════════════════════════"

# Create resource group
az group create -n $RESOURCE_GROUP -l $LOCATION

# Deploy infrastructure
az deployment group create \
  -g $RESOURCE_GROUP \
  -f infra/azure/main.bicep \
  --parameters prefix=csga-mcp

# Deploy each function
for dir in packages/*/; do
  PKG=$(basename "$dir")
  echo "Deploying $PKG..."
  (cd "$dir" && func azure functionapp publish "csga-mcp-$PKG" --node)
done

echo "✓ All 36 MCP servers deployed to Azure Functions"
echo "  Region: $LOCATION (Canada Central)"
echo "  Estimated cost: ~$5-15/mo at moderate usage"
