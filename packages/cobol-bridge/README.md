# Cobol Bridge MCP Server

> Part of the [CSGA Global MCP Platform](https://csga-global.vercel.app/) — Cyber Security Global Alliance

COBOL-to-AI Bridge MCP Server — Legacy enterprise integration for CICS/IMS mainframes, COBOL copybook parsing, JCL scanning, and VSAM mapping to AI governance APIs

## Installation

```bash
npx @smithery/cli install @csga-global/cobol-bridge
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "cobol-bridge": {
      "command": "npx",
      "args": ["-y", "@csga-global/cobol-bridge"]
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

- [Product Page](https://csga-global.vercel.app/mcp/cobol-bridge.html)
- [CSGA Global Platform](https://csga-global.vercel.app/)
- [GitHub Repository](https://github.com/csga-global/mcp-servers)
