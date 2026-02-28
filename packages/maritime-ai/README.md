# Maritime Ai MCP Server

> Part of the [CSGA Global MCP Platform](https://csga-global.vercel.app/) — Cyber Security Global Alliance

Assess compliance for AI in maritime operations. Covers autonomous vessels, port operations, maritime safety, emissions monitoring, and piracy/security.

## Installation

```bash
npx @smithery/cli install @csga-global/maritime-ai
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "maritime-ai": {
      "command": "npx",
      "args": ["-y", "@csga-global/maritime-ai"]
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

- [Product Page](https://csga-global.vercel.app/mcp/maritime-ai.html)
- [CSGA Global Platform](https://csga-global.vercel.app/)
- [GitHub Repository](https://github.com/csga-global/mcp-servers)
