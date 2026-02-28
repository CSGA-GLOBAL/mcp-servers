# Compliance Audit MCP Server

> Part of the [CSGA Global MCP Platform](https://csga-global.vercel.app/) — Cyber Security Global Alliance

Automated compliance auditing across regulatory frameworks including SOC2, GDPR, HIPAA, and industry standards.

## Installation

```bash
npx @smithery/cli install @csgaglobal/compliance-audit
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "compliance-audit": {
      "command": "npx",
      "args": ["-y", "@csgaglobal/compliance-audit"]
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

- [Product Page](https://csga-global.vercel.app/mcp/compliance-audit.html)
- [CSGA Global Platform](https://csga-global.vercel.app/)
- [GitHub Repository](https://github.com/csga-global/mcp-servers)
