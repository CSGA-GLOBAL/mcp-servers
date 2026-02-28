# @csgaglobal/playwright-browser

Browser automation with Playwright for web testing, scraping, screenshot capture, and end-to-end workflow automation.

**Category:** Testing & Automation | **Version:** 1.0.0 | **License:** MIT

## Overview

Part of the [CSGA Global MCP Server Platform](https://csga-global.org/) — a comprehensive suite of 70+ Model Context Protocol servers for AI governance, cybersecurity, and enterprise tooling.

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Screenshot & video capture
- Network interception
- End-to-end test automation

## Installation

```bash
npm install @csgaglobal/playwright-browser
```

## Quick Start

```typescript
import { createServer } from "@csgaglobal/playwright-browser";

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
