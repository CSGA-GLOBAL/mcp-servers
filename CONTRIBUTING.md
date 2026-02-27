# Contributing to CSGA Global MCP Ecosystem

Thank you for your interest in contributing to the world's first AI Governance MCP Ecosystem. This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [MCP Server Guidelines](#mcp-server-guidelines)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

- Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)
- Include MCP server name and version
- Provide steps to reproduce
- Include environment details

### Suggesting Features

- Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md)
- Describe the use case clearly
- Consider how it fits the AI governance mission

### Submitting Code

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/csga-global/csga-global.git
cd csga-global

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

## Pull Request Process

1. Update documentation for any changed functionality
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## MCP Server Guidelines

When contributing a new MCP server:

- Follow the existing naming convention: `mcp-[domain]-[function]`
- Include comprehensive README with installation and usage
- Provide example configurations for Claude Desktop
- Include at least 3 tools per server
- Add compliance mapping to relevant regulations
- Test with multiple MCP clients (Claude, Cursor, etc.)

### Server Classification

| Classification | Monthly Price | Credits | Use Case |
|---------------|--------------|---------|----------|
| LVP (Low Value) | $9/mo | 1,000 | Utility tools, basic integrations |
| MVP (Medium Value) | $29/mo | 5,000 | Domain-specific tools, analytics |
| HVP (High Value) | $79/mo | 15,000 | Enterprise security, compliance, defence |

## Reporting Issues

- **Bugs**: Use GitHub Issues with the bug template
- **Security**: Email security@csga-global.org (see [SECURITY.md](SECURITY.md))
- **General**: Email support@csga-global.org

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
