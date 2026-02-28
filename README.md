<p align="center">
  <img src="https://csga-global.vercel.app/favicon.svg" alt="CSGA Global" width="80" />
</p>

<h1 align="center">CSGA Global — AI Governance MCP Ecosystem</h1>

<p align="center">
  <strong>The world's first enterprise-grade AI Governance & Cybersecurity MCP (Model Context Protocol) platform</strong><br/>
  67 production-ready servers · Claude · ChatGPT · Cursor · Any MCP client
</p>

<p align="center">
  <a href="https://csga-global.vercel.app"><img src="https://img.shields.io/badge/Platform-Live-00c853?style=flat-square" alt="Platform Live" /></a>
  <a href="https://smithery.ai"><img src="https://img.shields.io/badge/Smithery-Install-0058A4?style=flat-square" alt="Smithery" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="MIT License" /></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" /></a>
  <img src="https://img.shields.io/badge/MCP_Servers-67-CC0000?style=flat-square" alt="67 MCP Servers" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node 18+" />
</p>

---

## About CSGA Global

CSGA Global (Cyber Security Global Alliance) builds open-source and enterprise MCP servers for AI governance, cybersecurity, compliance auditing, and defence intelligence. Our ecosystem provides standards-aligned tooling for enterprises, governments, and defence organisations that require auditable, regulation-ready AI infrastructure.

CSGA Global is the platform division of **CSGA's CSOAI (UK) Division** — a non-profit certification body headquartered in the United Kingdom, focused on international AI governance standards and cybersecurity certification.

### Corporate Structure

| Entity | Role | Leadership |
|--------|------|------------|
| **CSGA — Cyber Security Global Alliance** | Parent umbrella | James Castle, Global Chairperson & Founder |
| **CSGA's CSOAI (UK) Division** | Non-profit certification body (UK) | Nick Templeman, President & COO |
| **Terranova Aerospace and Defense Group** | Defence & aerospace | James Castle, CEO & CSO |
| **CSGA Cyber-AI Research Institute** | Research & development | Research leadership |
| **ORBIT-Q** | Quantum-safe & post-quantum cryptography | Under the Research Institute |
| **Terranova-BMCC** | Department of Labor internship programme | Joint programme |

---

## MCP Ecosystem — 67 Production-Ready Servers

Every server is available on [Smithery.ai](https://smithery.ai) for one-click installation with Claude Desktop, Cursor, Windsurf, and other MCP-compatible clients.

### Security & Compliance (8 servers)

| Server | Description |
|--------|-------------|
| `mcp-threat-intelligence` | Real-time threat feeds, IOC enrichment, MITRE ATT&CK mapping |
| `mcp-vulnerability-scanner` | CVE scanning, CVSS scoring, remediation guidance |
| `mcp-compliance-audit` | ISO 27001, SOC 2, NIST, GDPR compliance auditing |
| `mcp-policy-engine` | Automated policy generation and enforcement |
| `mcp-incident-response` | SOAR workflows, playbook execution, alert triage |
| `mcp-data-classification` | Automated data discovery and sensitivity labelling |
| `mcp-secure-comms` | End-to-end encrypted communications tooling |
| `mcp-red-team-ops` | Adversarial testing, attack simulation, purple team ops |

### AI Governance (3 servers)

| Server | Description |
|--------|-------------|
| `mcp-ai-governance` | AI risk assessment, model cards, bias detection, EU AI Act alignment |
| `mcp-dsrb-defence` | Defence Science Research Board analysis and intelligence |
| `mcp-pmcp-gateway` | Federated MCP gateway with policy-based routing |

### Cloud & DevOps (8 servers)

| Server | Description |
|--------|-------------|
| `mcp-aws-cloud` | EC2, S3, Lambda, IAM — full AWS management |
| `mcp-docker-compose` | Container orchestration, Compose file management |
| `mcp-vercel-deploy` | Vercel project deployment, environment management |
| `mcp-github-api` | Repos, issues, PRs, Actions, webhooks |
| `mcp-gitlab-api` | GitLab CI/CD, merge requests, pipelines |
| `mcp-git-operations` | Git workflows, branching, merge conflict resolution |
| `mcp-sentry-monitoring` | Error tracking, performance monitoring, alerting |
| `mcp-playwright-browser` | Browser automation, E2E testing, scraping |

### Data & Analytics (6 servers)

| Server | Description |
|--------|-------------|
| `mcp-csv-analytics` | CSV parsing, statistical analysis, visualisation |
| `mcp-postgres-db` | PostgreSQL queries, schema management, migrations |
| `mcp-sqlite-db` | SQLite database operations and analytics |
| `mcp-json-transformer` | JSON schema validation, transformation, mapping |
| `mcp-memory-graph` | Knowledge graph construction and querying |
| `mcp-sequential-thinking` | Chain-of-thought reasoning and structured analysis |

### Defence & Sovereign (4 servers)

| Server | Description |
|--------|-------------|
| `mcp-terranova-defence` | Terranova Aerospace & Defense intelligence tools |
| `mcp-quantranet-pqc` | Post-quantum cryptography (ORBIT-Q programme) |
| `mcp-thn-global` | THN Global defence network integration |
| `mcp-space-ai` | Space domain awareness, satellite security |

### Industry Verticals (8 servers)

| Server | Description |
|--------|-------------|
| `mcp-real-estate-ai` | Property analysis, valuation, market intelligence |
| `mcp-retail-ai` | Retail analytics, inventory optimisation, demand forecasting |
| `mcp-telecom-ai` | Telecom network analysis, 5G security, spectrum management |
| `mcp-supply-chain-ai` | Supply chain risk, logistics optimisation, traceability |
| `mcp-smart-cities-ai` | Smart infrastructure, IoT security, urban analytics |
| `mcp-sports-analytics-ai` | Performance analytics, injury prediction, scouting |
| `mcp-travel-hospitality-ai` | Travel risk, booking analytics, hospitality operations |
| `mcp-puppeteer-headless` | Headless browser automation and web interaction |

### Productivity & Integration (10 servers)

| Server | Description |
|--------|-------------|
| `mcp-slack-messaging` | Slack workspace messaging, channels, automation |
| `mcp-notion-workspace` | Notion databases, pages, project management |
| `mcp-google-drive` | Google Drive file management and collaboration |
| `mcp-linear-issues` | Linear issue tracking and project management |
| `mcp-brave-search` | Privacy-first web search integration |
| `mcp-fetch-http` | HTTP request builder, API testing, webhooks |
| `mcp-filesystem-ops` | Local filesystem operations, file management |
| `mcp-context7-docs` | Documentation context and retrieval |
| `mcp-time-zones` | Timezone conversion, scheduling across regions |
| `mcp-cloud-security` | Multi-cloud security posture management |

---

## Quick Start

### Install via Smithery (Recommended)

```bash
# Install any CSGA MCP server with one command
npx @smithery/cli install @csgaglobal/mcp-threat-intelligence --client claude

# Examples
npx @smithery/cli install @csgaglobal/mcp-ai-governance --client claude
npx @smithery/cli install @csgaglobal/mcp-compliance-audit --client cursor
npx @smithery/cli install @csgaglobal/mcp-vulnerability-scanner --client claude
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/csgaglobal/csga-global.git
cd csga-global

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

### Claude Desktop Configuration

Add any CSGA MCP server to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "csga-threat-intelligence": {
      "command": "npx",
      "args": ["-y", "@csgaglobal/mcp-threat-intelligence"],
      "env": {
        "CSGA_API_KEY": "your-api-key"
      }
    }
  }
}
```

---

## Pricing

| Plan | MCP Access | Monthly | Annual (save 20%) |
|------|-----------|---------|-------------------|
| **Community** | 12 open-source MCPs | Free | Free |
| **Starter** | 24 MCPs | $79/mo | $759/yr |
| **Professional** | 36 MCPs | $199/mo | $1,910/yr |
| **Enterprise Sector** | All 67 MCPs | $499/mo | $4,790/yr |
| **Enterprise Full** | All 67 + priority support | $1,499/mo | $14,390/yr |
| **Enterprise Custom** | Sovereign, air-gapped, FedRAMP | $2,499+/mo | Custom |

Individual MCP pricing also available: LVP $9/mo · MVP $29/mo · HVP $79/mo

[View full pricing →](https://csga-global.vercel.app/pricing)

---

## Standards & Compliance

CSGA MCP servers are built to align with international standards:

- **ISO 27001 / 27701** — Information security & privacy management
- **NIST CSF / SP 800-53** — US federal cybersecurity framework
- **EU AI Act** — European AI regulation compliance
- **SOC 2 Type II** — Service organisation controls
- **GDPR / UK GDPR** — Data protection regulation
- **FedRAMP** — US federal cloud security (Enterprise Custom tier)
- **MITRE ATT&CK** — Threat intelligence framework mapping

---

## Contributing

We welcome contributions from the community. Please read our [Contributing Guide](CONTRIBUTING.md) before submitting pull requests.

- [Bug Reports](.github/ISSUE_TEMPLATE/bug_report.md) — Report issues with any MCP server
- [Feature Requests](.github/ISSUE_TEMPLATE/feature_request.md) — Suggest new features or servers
- [Security Issues](SECURITY.md) — Responsible disclosure policy
- [Code of Conduct](CODE_OF_CONDUCT.md) — Community standards

---

## Documentation

| Resource | Link |
|----------|------|
| Platform & Pricing | [csga-global.vercel.app](https://csga-global.vercel.app) |
| MCP Catalog | [csga-global.vercel.app/catalog](https://csga-global.vercel.app/catalog) |
| API Documentation | [csga-global.vercel.app/api](https://csga-global.vercel.app/api) |
| Smithery Marketplace | [smithery.ai](https://smithery.ai) |
| Security Policy | [SECURITY.md](SECURITY.md) |
| Changelog | [CHANGELOG.md](CHANGELOG.md) |

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Copyright © 2024–2026 CSGA Global — Cyber Security Global Alliance
A division of CSGA's CSOAI (UK) Division

---

<p align="center">
  <sub>Built for enterprises, governments, and defence organisations that require auditable, standards-aligned AI governance tooling.</sub><br/>
  <sub><a href="https://csga-global.vercel.app">csga-global.vercel.app</a> · <a href="mailto:support@csga-global.org">support@csga-global.org</a> · <a href="mailto:security@csga-global.org">security@csga-global.org</a></sub>
</p>
