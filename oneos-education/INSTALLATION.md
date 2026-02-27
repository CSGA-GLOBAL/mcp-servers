# Installation & Setup Guide

## Quick Start

### 1. Prerequisites

Ensure you have Node.js 18+ and npm/yarn installed:

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `@modelcontextprotocol/sdk` - MCP framework
- `zod` - Schema validation
- TypeScript and dev dependencies

### 3. Build the Server

```bash
npm run build
```

Compiles TypeScript to JavaScript in the `dist/` directory.

### 4. Start the Server

```bash
npm start
```

The server will start and listen on stdin/stdout for MCP client connections.

### Development Mode

For active development with automatic recompilation:

```bash
npm run dev
```

## File Structure

```
oneos-education/
├── src/
│   ├── index.ts           # Main MCP server (tools & resources)
│   ├── schemas.ts         # Zod validation schemas
│   └── data.ts            # Mock database & helpers
├── dist/                  # Compiled output (auto-generated)
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript config
├── README.md              # Full documentation
├── EXAMPLE_USAGE.md       # Practical examples
├── INSTALLATION.md        # This file
└── .gitignore             # Git ignore rules
```

## Verification

### 1. Check Build Output

```bash
ls -la dist/
```

Should show:
- `dist/index.js` - Main server
- `dist/schemas.js` - Schemas
- `dist/data.js` - Data layer
- Source maps (`.js.map` files)

### 2. Validate TypeScript

```bash
npx tsc --noEmit
```

Should complete without errors.

### 3. Test Require Path

```bash
node -e "const idx = require('./dist/index.js'); console.log('✓ Server loads successfully')"
```

## Integration with MCP Clients

### Using with Claude or other MCP Clients

Add to your client configuration:

```json
{
  "mcpServers": {
    "oneos-education": {
      "command": "node",
      "args": ["/path/to/oneos-education/dist/index.js"]
    }
  }
}
```

Or with npm:

```json
{
  "mcpServers": {
    "oneos-education": {
      "command": "npm",
      "args": ["start"],
      "cwd": "/path/to/oneos-education"
    }
  }
}
```

## Troubleshooting

### Build Errors

**Error**: `Cannot find module '@modelcontextprotocol/sdk'`
- Solution: Run `npm install` first

**Error**: `TypeScript compilation failed`
- Check that all `.ts` files are in `src/`
- Verify `tsconfig.json` is in root directory

### Runtime Errors

**Error**: `Error: Cannot find module './dist/index.js'`
- Solution: Run `npm run build` first

**Error**: Server crashes immediately
- Ensure stdin/stdout are properly connected
- Check for syntax errors: `npm run build`

### Connection Issues

**Error**: MCP client cannot connect
- Verify server is started with `npm start`
- Check stdin/stdout availability
- Ensure no other processes are using stdio

## Environment Setup

### Node Version Management

Using nvm (Node Version Manager):

```bash
nvm install 18
nvm use 18
node --version  # Verify v18.x.x
```

### npm Alternatives

Using yarn:

```bash
yarn install
yarn build
yarn start
```

Using pnpm:

```bash
pnpm install
pnpm build
pnpm start
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build OneOS MCP Server

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build server
        run: npm run build
      
      - name: Verify build
        run: ls -la dist/
```

## Production Deployment

### Docker Container

```dockerfile
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ src/
COPY tsconfig.json .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### PM2 Process Manager

```bash
npm install -g pm2

pm2 start npm --name "oneos-mcp" -- start
pm2 save
pm2 startup
```

## Updating Dependencies

Check for updates:

```bash
npm outdated
```

Update all dependencies:

```bash
npm update
```

Update to latest versions (may include breaking changes):

```bash
npm install @modelcontextprotocol/sdk@latest
npm install zod@latest
```

## Additional Resources

- **MCP Documentation**: https://modelcontextprotocol.io
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Zod Documentation**: https://zod.dev
- **Node.js Docs**: https://nodejs.org/docs

## Support

For issues or questions:
1. Check `README.md` for API reference
2. Review `EXAMPLE_USAGE.md` for practical examples
3. Verify installation steps above
4. Check MCP server logs for errors

---

**Last Updated**: 2025-02-25
**Version**: 1.0.0
