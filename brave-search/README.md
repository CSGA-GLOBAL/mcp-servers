# @csgaglobal/brave-search

Privacy-focused web search with Brave Search API integration for real-time information retrieval and analysis.

**Category:** Search & Discovery | **Version:** 1.0.0 | **License:** MIT

## Overview

Part of the [CSGA Global MCP Server Platform](https://csga-global.org/) — a comprehensive suite of 70+ Model Context Protocol servers for AI governance, cybersecurity, and enterprise tooling.

## Features

- Privacy-focused web search
- Real-time information retrieval
- Structured result parsing
- Multi-language search support

## Installation

```bash
npm install @csgaglobal/brave-search
```

## Quick Start

```typescript
import { createServer } from "@csgaglobal/brave-search";

const server = createServer({
  // Configuration options
});

server.start();
```

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `port` | `number` | `3000` | Server port |
| `logLevel` | `string` | `"info"` | Logging verbosity |

## MCP Protocol

This server implements the [Model Context Protocol](https://modelcontextprotocol.io/) specification, enabling seamless integration with AI assistants and automation tools.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

## Related Packages

Explore the full suite at [csga-global.org/mcp](https://csga-global.org/mcp/)

## License

MIT © [CSGA Global](https://csga-global.org/)
