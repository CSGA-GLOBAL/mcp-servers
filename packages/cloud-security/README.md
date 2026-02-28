# Cloud Security MCP Server

> Part of the [CSGA Global MCP Platform](https://csga-global.vercel.app/) — Cyber Security Global Alliance

Multi-cloud security posture management with vulnerability scanning, compliance checking, and threat detection.

## Installation

```bash
npx @smithery/cli install @csgaglobal/cloud-security
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "cloud-security": {
      "command": "npx",
      "args": ["-y", "@csgaglobal/cloud-security"]
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

- [Product Page](https://csga-global.vercel.app/mcp/cloud-security.html)
- [CSGA Global Platform](https://csga-global.vercel.app/)
- [GitHub Repository](https://github.com/csga-global/mcp-servers)
