# CSGA Global — MCP Servers

[![CI](https://github.com/csga-global/mcp-servers/actions/workflows/ci.yml/badge.svg)](https://github.com/csga-global/mcp-servers/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@csga-global/csoai-governance?label=npm&color=blue)](https://www.npmjs.com/org/csga-global)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

**36 AI Governance MCP Servers** for [Anthropic's Model Context Protocol](https://modelcontextprotocol.io) — built by [CSGA Global](https://csga-global.org), the Cyber Security Global Alliance.

> The world's first comprehensive, compliance-verified AI governance toolkit delivered as MCP servers. Covering 25+ international frameworks, 20 crosswalk mappings, and sector-specific compliance across defence, healthcare, finance, energy, education, and 30+ industries.

## Quick Start

```bash
# Install any server
npm install @csga-global/csoai-governance

# Or use npx directly with Claude Desktop / any MCP client
npx @csga-global/healthcare-ai
```

### Claude Desktop Integration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "csga-governance": {
      "command": "npx",
      "args": ["-y", "@csga-global/csoai-governance"]
    },
    "csga-healthcare": {
      "command": "npx",
      "args": ["-y", "@csga-global/healthcare-ai"]
    }
  }
}
```

## All 35 MCP Servers

| Package | Description | Install |
|---------|-------------|---------|
| [`@csga-global/agriculture-ai`](./packages/agriculture-ai) | Assess compliance for AI in agriculture. Covers precision farming, crop analytics, autonomous farm equipment, food safety traceability, and environmental monitoring. | `npm i @csga-global/agriculture-ai` |
| [`@csga-global/ai-economy-infrastructure`](./packages/ai-economy-infrastructure) | Unified AI Economy Infrastructure | `npm i @csga-global/ai-economy-infrastructure` |
| [`@csga-global/autonomous-vehicles-ai`](./packages/autonomous-vehicles-ai) | Assess regulatory compliance for autonomous vehicle AI systems. Covers EU AI Act high-risk classification, UNECE WP.29, NHTSA, ISO 26262, safety validation, and liability frameworks. | `npm i @csga-global/autonomous-vehicles-ai` |
| [`@csga-global/biometrics-ai`](./packages/biometrics-ai) | CSOAI Biometrics & Identity AI Governance | `npm i @csga-global/biometrics-ai` |
| [`@csga-global/bmcc-cyber`](./packages/bmcc-cyber) | BMCC Cyber Programme MCP Server - Cybersecurity education pathway built in partnership between CSGA and Borough of Manhattan Community College (CUNY) | `npm i @csga-global/bmcc-cyber` |
| [`@csga-global/ca3o-certification`](./packages/ca3o-certification) | CA3O | `npm i @csga-global/ca3o-certification` |
| [`@csga-global/casa-certification`](./packages/casa-certification) | CASA Certification - CSOAI-Authorised Safety Assessment MCP Server | `npm i @csga-global/casa-certification` |
| 🔷 [`@csga-global/cobol-bridge`](./packages/cobol-bridge) | COBOL-to-AI Bridge MCP Server | `npm i @csga-global/cobol-bridge` |
| [`@csga-global/construction-ai`](./packages/construction-ai) | Assess compliance for AI in construction. Covers BIM, safety monitoring, autonomous equipment, structural analysis, and project management AI. | `npm i @csga-global/construction-ai` |
| [`@csga-global/csga-standards`](./packages/csga-standards) | CSGA Cyber Security Standards MCP Server - Provides cybersecurity standards, training pathways, and incident response capabilities | `npm i @csga-global/csga-standards` |
| [`@csga-global/csoai-governance`](./packages/csoai-governance) | CSOAI AI Governance Suite | `npm i @csga-global/csoai-governance` |
| [`@csga-global/digital-human-library`](./packages/digital-human-library) | MCP server for Digital Human Library - North America's largest K-12 professional mentoring network | `npm i @csga-global/digital-human-library` |
| [`@csga-global/employment-ai`](./packages/employment-ai) | CSOAI Employment & HR AI Governance | `npm i @csga-global/employment-ai` |
| [`@csga-global/energy-ai`](./packages/energy-ai) | Assess compliance for AI in energy and utilities. Covers grid optimization, smart metering, demand response, renewable forecasting, and NERC/FERC regulations. | `npm i @csga-global/energy-ai` |
| [`@csga-global/financial-ai`](./packages/financial-ai) | CSOAI Financial Services AI Governance | `npm i @csga-global/financial-ai` |
| [`@csga-global/gaming-ai`](./packages/gaming-ai) | CSOAI Gaming & Entertainment AI Governance | `npm i @csga-global/gaming-ai` |
| [`@csga-global/healthcare-ai`](./packages/healthcare-ai) | CSOAI Healthcare AI Governance | `npm i @csga-global/healthcare-ai` |
| [`@csga-global/insurance-ai`](./packages/insurance-ai) | Assess compliance for AI in insurance underwriting, claims, and pricing. Covers algorithmic fairness, anti-discrimination, EU AI Act, state regulations, and actuarial standards. | `npm i @csga-global/insurance-ai` |
| [`@csga-global/law-enforcement-ai`](./packages/law-enforcement-ai) | CSOAI Law Enforcement & Criminal Justice AI Governance | `npm i @csga-global/law-enforcement-ai` |
| [`@csga-global/legal-tech-ai`](./packages/legal-tech-ai) | Assess compliance for AI in legal services. Covers contract analysis, e-discovery, legal research, predictive case outcomes, and unauthorized practice of law. | `npm i @csga-global/legal-tech-ai` |
| [`@csga-global/maritime-ai`](./packages/maritime-ai) | Assess compliance for AI in maritime operations. Covers autonomous vessels, port operations, maritime safety, emissions monitoring, and piracy/security. | `npm i @csga-global/maritime-ai` |
| [`@csga-global/media-advertising-ai`](./packages/media-advertising-ai) | Assess compliance for AI in media and advertising. Covers programmatic advertising, deepfakes, content recommendation, political ads, and DSA platform obligations. | `npm i @csga-global/media-advertising-ai` |
| [`@csga-global/mining-ai`](./packages/mining-ai) | Assess compliance for AI in mining and resources. Covers autonomous haulage, safety monitoring, environmental compliance, resource estimation, and indigenous rights. | `npm i @csga-global/mining-ai` |
| [`@csga-global/oneos-education`](./packages/oneos-education) | MCP server for OneOS | `npm i @csga-global/oneos-education` |
| [`@csga-global/proofof-ai`](./packages/proofof-ai) | Blockchain-verified AI content authentication and deepfake detection MCP server | `npm i @csga-global/proofof-ai` |
| [`@csga-global/quantranet-pqc`](./packages/quantranet-pqc) | QuantraNet - Quantum-Secure Internet Infrastructure and Post-Quantum Cryptography Assessment MCP Server | `npm i @csga-global/quantranet-pqc` |
| [`@csga-global/real-estate-ai`](./packages/real-estate-ai) | Assess compliance for AI in real estate. Covers automated valuation, tenant screening, fair housing, advertising targeting, and smart building management. | `npm i @csga-global/real-estate-ai` |
| [`@csga-global/retail-ai`](./packages/retail-ai) | Assess compliance for AI in retail and e-commerce. Covers dynamic pricing, recommendation engines, customer profiling, inventory AI, and consumer protection. | `npm i @csga-global/retail-ai` |
| [`@csga-global/smart-cities-ai`](./packages/smart-cities-ai) | Assess compliance for AI in smart city infrastructure. Covers traffic management, surveillance, public services, digital twins, environmental monitoring, and citizen privacy. | `npm i @csga-global/smart-cities-ai` |
| [`@csga-global/space-ai`](./packages/space-ai) | Assess compliance for AI in space systems. Covers autonomous spacecraft, satellite constellations, space debris management, launch safety, and dual-use technology. | `npm i @csga-global/space-ai` |
| [`@csga-global/sports-analytics-ai`](./packages/sports-analytics-ai) | Assess compliance for AI in sports. Covers performance analytics, betting/integrity, athlete biometrics, fan engagement, and anti-doping monitoring. | `npm i @csga-global/sports-analytics-ai` |
| [`@csga-global/supply-chain-ai`](./packages/supply-chain-ai) | Assess compliance for AI in supply chain and logistics. Covers demand forecasting, autonomous warehousing, route optimization, trade compliance, and forced labor screening. | `npm i @csga-global/supply-chain-ai` |
| [`@csga-global/telecom-ai`](./packages/telecom-ai) | Assess compliance for AI in telecommunications. Covers network optimization, customer analytics, content filtering, lawful intercept, and spectrum management. | `npm i @csga-global/telecom-ai` |
| [`@csga-global/thn-global`](./packages/thn-global) | MCP Server for THN Global - Pharma AI IP engine for drug discovery and patent landscape analysis | `npm i @csga-global/thn-global` |
| [`@csga-global/travel-hospitality-ai`](./packages/travel-hospitality-ai) | Assess compliance for AI in travel and hospitality. Covers dynamic pricing, guest profiling, automated border control, loyalty manipulation, and accessibility. | `npm i @csga-global/travel-hospitality-ai` |

## Architecture

Each MCP server follows a consistent structure:

```
packages/<server-name>/
├── src/
│   ├── index.ts          # Server entry point
│   └── tools/            # MCP tool implementations
├── dist/                 # Compiled output
├── package.json          # @csga-global scoped
├── tsconfig.json
├── README.md
├── QUICKSTART.md
├── ARCHITECTURE.md
├── DEPLOYMENT.md
├── EXAMPLES.md
└── LICENSE               # CC0-1.0
```

## Building from Source

```bash
git clone https://github.com/csga-global/mcp-servers.git
cd mcp-servers
npm install
npm run build
```

## Compliance & Audit Status

All 36 servers have passed independent compliance verification:

- **76+ regulations** verified against authoritative legal sources
- **3 legal corrections** applied and re-verified
- **E2E smoke tests**: 36/36 PASS
- **Frameworks**: EU AI Act, NIST AI RMF, ISO/IEC 42001, OECD AI Principles, UNESCO, IEEE, and 20+ more

See the [Audit Report](./AUDIT_REPORT.md) for full details.

## Hosting

These MCP servers support multiple deployment models:

| Method | Best For | Cost |
|--------|----------|------|
| **npx** (default) | Local development, Claude Desktop | Free |
| **Azure Functions** | Production, enterprise | ~$0.20/M executions |
| **Railway** | Fast prototyping | ~$5/mo |
| **Fly.io** | Global edge deployment | ~$3-7/mo |
| **Docker** | Self-hosted / air-gapped | Infrastructure cost |

## Contributing

We welcome contributions. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

CC0-1.0 — Public Domain. Use freely for any purpose.

## About CSGA Global

The **Cyber Security Global Alliance** (CSGA Global) builds open-source AI governance infrastructure for responsible AI deployment worldwide. Learn more at [csga-global.org](https://csga-global.org).

---

*Built with [Model Context Protocol](https://modelcontextprotocol.io) by [Anthropic](https://anthropic.com)*
