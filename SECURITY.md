# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅ Active |
| < 1.0   | ❌ EOL    |

## Reporting a Vulnerability

We take security seriously at CSGA Global. If you discover a security vulnerability in any of our MCP servers or platform infrastructure, please report it responsibly.

### Please DO NOT

- Open a public GitHub issue
- Post about it on social media
- Share details in public forums

### Please DO

- Email us at **security@csga-global.org**
- Include detailed steps to reproduce
- Provide your contact information for follow-up
- Encrypt sensitive reports using our PGP key (available on request)

## Response Timeline

| Severity | Initial Response | Assessment | Fix Released |
|----------|-----------------|------------|-------------|
| Critical | 24 hours        | 48 hours   | 7 days      |
| High     | 48 hours        | 5 days     | 14 days     |
| Medium   | 72 hours        | 7 days     | 30 days     |
| Low      | 5 days          | 14 days    | Next release|

## Security Best Practices

When using CSGA MCP servers:

1. **Keep packages updated** — Regularly update to the latest versions
2. **Review permissions** — Understand what each MCP server can access
3. **Use environment variables** — Never hardcode API keys or secrets
4. **Monitor logs** — Watch for unusual activity
5. **Follow principle of least privilege** — Only grant necessary permissions
6. **Enable audit logging** — Track all MCP server interactions
7. **Use encrypted connections** — TLS 1.3 for all communications

## Scope

This security policy covers:

- All 47 CSGA MCP servers
- The CSGA Global platform (csga-global.vercel.app)
- API endpoints and webhook integrations
- Stripe payment integration
- User dashboard and authentication

## Acknowledgments

We thank security researchers who responsibly disclose vulnerabilities. Reporters of valid vulnerabilities will be acknowledged here (with permission).
