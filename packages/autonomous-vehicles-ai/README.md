# Autonomous Vehicles Ai MCP Server

> Part of the [CSGA Global MCP Platform](https://csga-global.vercel.app/) — Cyber Security Global Alliance

Assess regulatory compliance for autonomous vehicle AI systems. Covers EU AI Act high-risk classification, UNECE WP.29, NHTSA, ISO 26262, safety validation, and liability frameworks.

## Installation

```bash
npx @smithery/cli install @csga-global/autonomous-vehicles-ai
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "autonomous-vehicles-ai": {
      "command": "npx",
      "args": ["-y", "@csga-global/autonomous-vehicles-ai"]
    }
  }
}
```

## Features

- AI governance compliance assessment
- Real-time policy validation
- CSOAI standards alignment
- Automated reporting

## License

CC0-1.0 — See [LICENSE](./LICENSE)

## Links

- [Product Page](https://csga-global.vercel.app/mcp/autonomous-vehicles-ai.html)
- [CSGA Global Platform](https://csga-global.vercel.app/)
- [GitHub Repository](https://github.com/csga-global/mcp-servers)
