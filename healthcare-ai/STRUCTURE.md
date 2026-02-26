# Healthcare AI MCP Server - Complete Directory Structure

```
mcp-servers/healthcare-ai/
├── .gitignore                           # Git ignore file
├── README.md                            # Main documentation
├── STRUCTURE.md                         # This file
├── package.json                         # NPM package configuration
├── tsconfig.json                        # TypeScript configuration
└── src/
    ├── index.ts                         # Main MCP server entry point
    ├── tools/
    │   ├── hipaa-assessment.ts          # HIPAA compliance assessment
    │   ├── fda-ai-assessment.ts         # FDA AI/ML SaMD assessment
    │   ├── clinical-ai-safety.ts        # Clinical safety & bias assessment
    │   └── eu-mdr-compliance.ts         # EU MDR compliance assessment
    └── resources/                       # Resources directory (for future expansion)
```

## File Descriptions

### Configuration Files
- **package.json** — NPM package metadata, dependencies, build scripts
- **tsconfig.json** — TypeScript compiler configuration (ES2020 module)
- **.gitignore** — Git ignore patterns (node_modules, dist, logs)

### Main Server
- **src/index.ts** — MCP server initialization with 4 tools and 2 resources

### Tools (src/tools/)
1. **hipaa-assessment.ts**
   - Assesses HIPAA compliance for AI systems
   - Outputs: HIPAA category, PHI risk level, safeguards, gap analysis, remediation timeline
   - Handles: Covered entities, business associates, deployment environments

2. **fda-ai-assessment.ts**
   - FDA regulatory pathway determination for SaMD
   - Outputs: Device classification, regulatory pathway, PCCP requirements, timeline
   - Handles: SaMD Categories I-IV, adaptive/continuous learning models

3. **clinical-ai-safety.ts**
   - Clinical safety assessment including bias and validation
   - Outputs: Risk classification, safety concerns, bias assessment, validation requirements, CASA tier
   - Handles: Domain-specific risks (radiology, oncology, pharmacy), vulnerable populations

4. **eu-mdr-compliance.ts**
   - EU MDR classification and compliance assessment
   - Outputs: MDR classification, conformity assessment route, technical documentation requirements
   - Handles: Class I-III devices, notified body requirements, post-market surveillance

### Documentation
- **README.md** — User guide with examples and regulatory framework overview
- **STRUCTURE.md** — This file, describing the project structure

## Build & Run

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start server
npm start

# Development (watch mode)
npm run dev

# Watch TypeScript compilation
npm run watch
```

## Integration Points

### Claude Desktop
Configure in `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "healthcare-ai": {
      "command": "npx",
      "args": ["-y", "@csoai/healthcare-ai-mcp"]
    }
  }
}
```

### MCP Ecosystem
Designed to work with other CSOAI MCP servers:
- governance-ai (CASA certification, board governance)
- financial-ai (financial regulations)
- autonomy-ai (autonomous systems governance)

## Regulatory Coverage

- **United States:** HIPAA, FDA AI/ML SaMD, 21st Century Cures Act, HHS AI Strategy
- **European Union:** MDR 2017/745, EU AI Act, GDPR, IVDR 2017/746
- **International:** ISO 14971, IEC 62304, IMDRF SaMD Framework, WHO Guidance
- **Emerging:** UK MHRA, Health Canada, Japan PMDA, Australia TGA, Singapore HSA

## Key Features

- Multi-regulatory assessment (HIPAA + FDA + EU MDR + EU AI Act)
- Risk classification and timeline estimation
- Bias and safety concern identification
- Clinical validation requirements
- Post-market surveillance planning
- CASA tier recommendations
- Detailed remediation guidance

## Version
- **1.0.0** (2025)
- License: CC0-1.0 (Public Domain)
