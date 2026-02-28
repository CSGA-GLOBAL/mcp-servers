# Dsrb Defence MCP Server

> Part of the [CSGA Global MCP Platform](https://csga-global.vercel.app/) — Cyber Security Global Alliance

Defence Standards Review Board compliance toolkit for military AI systems with STANAG alignment and NATO interoperability.

## Installation

```bash
npx @smithery/cli install @csgaglobal/dsrb-defence
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "dsrb-defence": {
      "command": "npx",
      "args": ["-y", "@csgaglobal/dsrb-defence"]
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

- [Product Page](https://csga-global.vercel.app/mcp/dsrb-defence.html)
- [CSGA Global Platform](https://csga-global.vercel.app/)
- [GitHub Repository](https://github.com/csga-global/mcp-servers)
