// CSGA Global MCP Servers — Azure Functions Infrastructure
// Deploy with: az deployment group create -g csga-mcp -f main.bicep

param location string = resourceGroup().location
param prefix string = 'csga-mcp'

var mcpServers = [
  'agriculture-ai'
  'ai-economy-infrastructure'
  'autonomous-vehicles-ai'
  'biometrics-ai'
  'bmcc-cyber'
  'ca3o-certification'
  'casa-certification'
  'cobol-bridge'
  'construction-ai'
  'csga-standards'
  'csoai-governance'
  'digital-human-library'
  'employment-ai'
  'energy-ai'
  'financial-ai'
  'gaming-ai'
  'healthcare-ai'
  'insurance-ai'
  'law-enforcement-ai'
  'legal-tech-ai'
  'maritime-ai'
  'media-advertising-ai'
  'mining-ai'
  'oneos-education'
  'proofof-ai'
  'quantranet-pqc'
  'real-estate-ai'
  'retail-ai'
  'smart-cities-ai'
  'space-ai'
  'sports-analytics-ai'
  'supply-chain-ai'
  'telecom-ai'
  'thn-global'
  'travel-hospitality-ai'
]

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: '${prefix}store'
  location: location
  kind: 'StorageV2'
  sku: { name: 'Standard_LRS' }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: '${prefix}-plan'
  location: location
  kind: 'functionapp'
  sku: {
    name: 'Y1'     // Consumption plan — pay per execution
    tier: 'Dynamic'
  }
  properties: {
    reserved: true  // Linux
  }
}

resource functionApp 'Microsoft.Web/sites@2023-01-01' = [for server in mcpServers: {
  name: '${prefix}-${server}'
  location: location
  kind: 'functionapp,linux'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|20'
      appSettings: [
        { name: 'AzureWebJobsStorage', value: storageAccount.properties.primaryEndpoints.blob }
        { name: 'FUNCTIONS_EXTENSION_VERSION', value: '~4' }
        { name: 'FUNCTIONS_WORKER_RUNTIME', value: 'node' }
        { name: 'WEBSITE_NODE_DEFAULT_VERSION', value: '~20' }
        { name: 'MCP_SERVER_NAME', value: server }
      ]
    }
  }
}]

output functionAppNames array = [for (server, i) in mcpServers: {
  name: server
  url: 'https://${prefix}-${server}.azurewebsites.net'
}]
