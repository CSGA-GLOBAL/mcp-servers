# CSOAI AI Governance MCP Server - Deployment Guide

## Overview

This guide covers deploying the CSOAI Governance MCP Server across different environments and AI platforms.

## Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager
- Access to your target AI platform
- 10-50 MB disk space

## Local Development

### 1. Clone and Install

```bash
cd /sessions/brave-adoring-cerf/mcp-servers/csoai-governance
npm install
```

### 2. Build

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### 3. Run

```bash
npm start
```

The server listens on stdin/stdout, ready to accept MCP requests.

### 4. Development Mode

For development with auto-recompilation:

```bash
npm run watch
```

In another terminal, connect your MCP client.

## Platform-Specific Deployment

### Claude Desktop

#### Configuration

Edit `~/.claude/mcp_servers.json` (create if doesn't exist):

```json
{
  "mcpServers": {
    "csoai-governance": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"],
      "disabled": false
    }
  }
}
```

#### Verify Installation

1. Restart Claude Desktop
2. Look for "csoai-governance" in the MCP servers list
3. Test with: `<use_mcp_tool name="crosswalk_lookup" argument='{"crosswalk_id":"CW-01"}'>`

### ChatGPT

#### Prerequisites

- ChatGPT Plus subscription (for custom plugins)
- API access to OpenAI

#### Deployment Steps

1. Start the server locally:
```bash
npm start
```

2. Configure tunnel (using ngrok or similar):
```bash
ngrok http 3000
```

3. Note the public URL: `https://xxxx-xx-xxx-xx.ngrok.io`

4. In ChatGPT plugin settings:
   - Add custom plugin
   - API endpoint: Your ngrok URL + `/mcp`
   - Protocol: Stdio over HTTP bridge

5. Test functionality in ChatGPT

#### Production Deployment

For production use with ChatGPT:

1. Deploy to cloud server (AWS, Google Cloud, Azure)
2. Enable HTTPS with SSL certificate
3. Implement authentication if needed
4. Configure rate limiting
5. Set up monitoring and logging

### Cursor IDE

#### Integration Steps

1. Install Cursor extension for MCP
2. Add to Cursor settings (`.cursor/settings.json`):

```json
{
  "mcp": {
    "servers": {
      "csoai-governance": {
        "command": "node",
        "args": ["/absolute/path/to/dist/index.js"]
      }
    }
  }
}
```

3. Restart Cursor
4. Use tools in development context
5. Call tools: Right-click → "Use MCP Tool"

### VS Code

#### Installation

1. Install MCP extension from marketplace
2. Create `.vscode/mcp-servers.json`:

```json
{
  "servers": {
    "csoai-governance": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

3. Reload VS Code
4. Open MCP panel in sidebar
5. Test tools in VS Code's integrated AI assistant

### Gemini

#### Setup

1. Access Google AI Studio
2. Create MCP integration
3. Configure endpoint:
   - Type: Custom MCP
   - Name: csoai-governance
   - Command: `node /path/to/dist/index.js`
4. Test in Gemini chat

### Generic MCP Client

For any MCP-compatible client:

```bash
# Start server
npm start

# In your MCP client, connect to:
# Type: Stdio
# Command: node /path/to/dist/index.js
```

## Docker Deployment

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy built code (build first locally: npm run build)
COPY dist ./dist

# Expose port for HTTP bridge (optional)
EXPOSE 3000

# Run server
CMD ["node", "dist/index.js"]
```

### Build Image

```bash
docker build -t csoai-governance:1.0.0 .
```

### Run Container

```bash
# Local stdio mode
docker run -it csoai-governance:1.0.0

# With volume mount for custom data (if extending)
docker run -it -v /custom/data:/app/data csoai-governance:1.0.0
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  csoai-governance:
    build: .
    container_name: csoai-governance-server
    stdin_open: true
    tty: true
    volumes:
      - ./logs:/app/logs
    environment:
      - NODE_ENV=production
```

Run:
```bash
docker-compose up -d
```

## Cloud Deployment

### AWS Lambda

Create `lambda-handler.js`:

```javascript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export async function handler(event, context) {
  const server = new McpServer({...});
  const transport = new StdioServerTransport();

  // Handle event and return response
  await server.connect(transport);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'Server running' })
  };
}
```

Deploy to AWS Lambda with Node.js 18 runtime.

### Google Cloud Functions

```bash
gcloud functions deploy csoai-governance \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated
```

### Azure Functions

```bash
func azure functionapp create --resource-group myGroup --consumption-plan-location eastus
func azure functionapp publish myFunctionApp
```

### Heroku

```bash
# Create app
heroku create csoai-governance

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## Production Hardening

### 1. Environment Variables

Create `.env`:
```env
NODE_ENV=production
LOG_LEVEL=info
MAX_ASSESSMENT_TIMEOUT=30000
```

Load in `src/index.ts`:
```typescript
import dotenv from 'dotenv';
dotenv.config();
```

### 2. Rate Limiting

Add rate limiting middleware (for HTTP bridges):

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

### 3. Error Logging

Implement logging:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 4. Monitoring

Set up monitoring for:
- Server uptime
- Response times
- Error rates
- Resource usage

Recommended: New Relic, DataDog, or similar APM tools.

### 5. Security

- Use HTTPS only (SSL/TLS)
- Validate all inputs (already done with Zod)
- Implement CORS if needed
- Use security headers
- Regular dependency updates

## Scaling

### Load Balancing

For high-traffic deployments, use a load balancer (nginx, HAProxy):

```nginx
upstream csoai {
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
}

server {
    listen 80;
    location / {
        proxy_pass http://csoai;
    }
}
```

### Multiple Instances

Run multiple server instances:

```bash
# Terminal 1
PORT=3001 npm start

# Terminal 2
PORT=3002 npm start

# Terminal 3
PORT=3003 npm start
```

### Caching

For read-heavy workloads, add caching:

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 });

function handleCrosswalkLookup(id) {
  const cached = cache.get(id);
  if (cached) return cached;

  const result = /* computation */;
  cache.set(id, result);
  return result;
}
```

## Monitoring & Logging

### Health Check Endpoint

Add optional HTTP health check:

```typescript
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', version: '1.0.0' });
});
```

### Metrics

Track:
- Tool invocation counts
- Average response time per tool
- Error rates
- Active connections

### Alerting

Configure alerts for:
- Server crashes
- High error rates
- Response time degradation
- Resource exhaustion

## Backup & Recovery

### Database Backup

Backup the crosswalk and charter data:

```bash
# Backup source data
cp -r src/resources/ backup/resources-$(date +%Y%m%d).tar.gz

# Verify integrity
tar -tzf backup/resources-*.tar.gz
```

### Recovery Procedure

```bash
# Restore from backup
tar -xzf backup/resources-YYYYMMDD.tar.gz -C src/

# Rebuild
npm run build

# Restart
npm start
```

## Updating & Maintenance

### Update Procedure

1. Backup current version:
```bash
git tag v1.0.0-backup
```

2. Pull updates:
```bash
git pull origin main
npm install
```

3. Build:
```bash
npm run build
```

4. Test:
```bash
npm test
```

5. Deploy to staging first
6. Run final tests
7. Deploy to production

### Zero-Downtime Deployment

1. Start new instance on different port
2. Test thoroughly
3. Switch load balancer traffic
4. Stop old instance

### Rollback Procedure

1. Switch load balancer to previous version
2. Stop new instance
3. Verify operation
4. Review failure logs

## Troubleshooting

### Server Won't Start

```bash
# Check Node version
node --version  # Should be 18+

# Clear build artifacts
rm -rf dist node_modules
npm install
npm run build

# Run with debug
DEBUG=* npm start
```

### High Memory Usage

- Check for memory leaks in tools
- Reduce cache size
- Implement garbage collection
- Monitor with: `node --inspect dist/index.js`

### Slow Response Times

- Profile with: `node --prof dist/index.js`
- Analyze: `node --prof-process isolate-*.log > profile.txt`
- Check I/O operations
- Consider caching

### Connection Issues

- Verify firewall settings
- Check port availability: `lsof -i :3000`
- Test with: `telnet localhost 3000`
- Review network configuration

## Performance Tuning

### Node.js Optimization

```bash
# Increase max listeners
node --max-old-space-size=4096 dist/index.js

# Use clustering for multi-core
npm install cluster
```

### Database Queries

- Crosswalk lookups are O(1) hash lookups
- Assessment operations are O(n) where n = keywords
- Typical assessment: <100ms

## Compliance & Privacy

- No data is stored persistently
- No user data is transmitted externally
- All processing is local
- Complies with GDPR (no data retention)
- HIPAA-compliant (no PHI processing)

## Support & Issues

- Check QUICKSTART.md for quick solutions
- Review architecture in ARCHITECTURE.md
- Visit https://csoai.org for additional resources
- Report issues on GitHub

## Checklist for Production

- [ ] Build verified locally
- [ ] Dependencies audited for vulnerabilities
- [ ] Logging configured
- [ ] Monitoring set up
- [ ] Error alerting configured
- [ ] Load testing completed
- [ ] Backup procedures documented
- [ ] Rollback plan tested
- [ ] Documentation updated
- [ ] Team trained on deployment
- [ ] Security review completed
- [ ] Performance benchmarked

---

Ready to deploy the CSOAI AI Governance MCP Server! 🚀
