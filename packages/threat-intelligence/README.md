# Threat Intelligence MCP Server

> Part of the [CSGA Global MCP Platform](https://csga-global.vercel.app/) — Cyber Security Global Alliance

Threat intelligence platform for IOC management, threat feed aggregation, and cyber threat analysis.

## Installation

```bash
npx @smithery/cli install @csgaglobal/threat-intelligence
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "threat-intelligence": {
      "command": "npx",
      "args": ["-y", "@csgaglobal/threat-intelligence"]
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

- [Product Page](https://csga-global.vercel.app/mcp/threat-intelligence.html)
- [CSGA Global Platform](https://csga-global.vercel.app/)
- [GitHub Repository](https://github.com/csga-global/mcp-servers)
