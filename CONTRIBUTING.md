# Contributing to CSGA Global MCP Servers

Thank you for your interest in contributing to the CSGA Global MCP ecosystem.

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run the build: `npm run build`
5. Submit a pull request

## Code Standards

- TypeScript strict mode
- ESM modules (ES2020)
- All tools must include proper Zod schemas
- Every regulation/standard referenced must be verifiable

## Adding a New MCP Server

1. Create a new directory under `packages/`
2. Follow the existing structure (see any package as template)
3. Register in the root `package.json` workspaces
4. Add comprehensive `README.md`, `QUICKSTART.md`, `ARCHITECTURE.md`

## Legal Accuracy

All regulatory references must cite real, current legislation with correct identifiers. We maintain an independent audit process for compliance verification.

## License

By contributing, you agree that your contributions will be licensed under CC0-1.0.
