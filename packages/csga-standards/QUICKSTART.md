# CSGA Standards MCP Server - Quick Start Guide

Get up and running with the CSGA Standards MCP Server in minutes.

## Installation

```bash
# Navigate to the project directory
cd mcp-servers/csga-standards

# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Start the server
npm start
```

The server will start listening on stdio transport.

---

## Using with Claude/MCP Clients

### Configuration

Add this to your MCP client configuration (typically `~/.config/claude/settings.json` or your client's config):

```json
{
  "mcpServers": {
    "csga-standards-mcp": {
      "command": "node",
      "args": ["/path/to/mcp-servers/csga-standards/dist/index.js"],
      "env": {
        "MCP_STDIO": "true"
      }
    }
  }
}
```

### Tool Usage Examples

#### 1. Look Up NIST CSF Standard

```
User: Look up the NIST Cybersecurity Framework
Tool: csga_standards_lookup
Arguments: { "standard": "NIST_CSF" }
```

Returns comprehensive information about NIST CSF, its 5 functions, and implementation guidance.

#### 2. Assess Organizational Security Maturity

```
User: What security belt level is our organization at?

Tool: csga_kata_assessment
Arguments: {
  "organization_description": "Financial services company with 500 employees",
  "current_controls": ["Firewall", "MFA", "SIEM", "EDR", "Intrusion Detection"],
  "employees_trained": 480,
  "incident_history": "Minimal - one phishing incident handled",
  "budget_allocation": "Substantial"
}
```

Returns K.A.T.A. belt level (e.g., Green - Applied), gaps, and training recommendations.

#### 3. Get Threat Intelligence

```
User: What ransomware threats should our healthcare organization be aware of?

Tool: csga_threat_intel
Arguments: {
  "sector": "Healthcare",
  "threat_type": "Ransomware"
}
```

Returns current threat assessments, MITRE ATT&CK mapping, IOCs, and mitigation recommendations.

#### 4. Get Incident Response Procedure

```
User: We've detected a ransomware infection. What should we do?

Tool: csga_incident_response
Arguments: {
  "incident_type": "Ransomware",
  "severity": "Critical",
  "affected_systems": ["File Servers", "Backup Systems", "Email Servers"]
}
```

Returns step-by-step response procedures, containment steps, notification requirements, and escalation path.

#### 5. Get Training Recommendations

```
User: I want to become a Security Analyst. What training should I take?

Tool: csga_training_pathway
Arguments: {
  "current_level": "Intermediate",
  "goal": "Security_Analyst",
  "sector": "Finance",
  "budget_usd": 15000
}
```

Returns recommended courses, certifications, timeline, and cost estimates.

#### 6. Check Compliance Status

```
User: Are we compliant with NIST and ISO 27001?

Tool: csga_compliance_check
Arguments: {
  "organization_type": "Technology",
  "size": "Enterprise",
  "current_controls": [
    "Firewall",
    "SIEM",
    "MFA",
    "Encryption",
    "EDR",
    "Access Control"
  ],
  "geographic_scope": ["USA", "Europe"]
}
```

Returns compliance status for all applicable frameworks, gaps, and priority remediation actions.

---

## Available Tools

| Tool | Purpose | Best For |
|------|---------|----------|
| `csga_standards_lookup` | Reference for security standards | Understanding requirements for frameworks |
| `csga_kata_assessment` | Evaluate security maturity | Assessing organizational capability |
| `csga_threat_intel` | Current threat intelligence | Understanding threats in your sector |
| `csga_incident_response` | Step-by-step IR procedures | Responding to active incidents |
| `csga_training_pathway` | Training recommendations | Planning security career development |
| `csga_compliance_check` | Compliance assessment | Evaluating regulatory compliance |

---

## Development Commands

```bash
# Watch for changes and rebuild
npm run watch

# Development mode (build and run)
npm run dev

# Lint code (if eslint is configured)
npm run lint

# Format code (if prettier is configured)
npm run format

# Run tests (when tests are added)
npm test
```

---

## Project Structure

```
csga-standards/
├── src/
│   ├── index.ts              # Main server and tool handlers
│   ├── types.ts              # TypeScript types and schemas
│   ├── standards.ts          # Standards database
│   ├── kata.ts               # K.A.T.A. assessment logic
│   ├── threats.ts            # Threat intelligence
│   ├── incident.ts           # Incident response procedures
│   ├── training.ts           # Training pathways
│   └── compliance.ts         # Compliance assessment
├── dist/                     # Compiled output
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── mcp.json                  # MCP configuration template
├── README.md                 # Full documentation
└── QUICKSTART.md             # This file
```

---

## Troubleshooting

### Server won't start

1. Check Node.js version: `node --version` (need 18+)
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Check for errors in console output

### Tools not showing up

1. Ensure server is running: `npm start`
2. Verify MCP client configuration points to correct path
3. Check that `dist/index.ts` exists (run `npm run build`)

### Invalid input errors

1. Check that arguments match the tool's schema
2. Verify all required fields are provided
3. Review README.md for example tool usage

---

## Common Use Cases

### Security Team Starting Out (White Belt)
1. Use `csga_standards_lookup` to understand basic frameworks
2. Review `csga_compliance_check` to see what's needed
3. Use `csga_training_pathway` to plan training program

### SOC Team (Green/Blue Belt)
1. Use `csga_threat_intel` for current threat landscape
2. Use `csga_incident_response` for IR procedures
3. Reference `csga_standards_lookup` for control mappings

### Security Leadership (Purple/Brown Belt)
1. Use `csga_kata_assessment` to measure organizational maturity
2. Use `csga_training_pathway` to plan team development
3. Use `csga_compliance_check` for regulatory assessment

---

## Next Steps

1. **Read the full README:** `README.md`
2. **Explore frameworks:** Use `csga_standards_lookup` to learn about each standard
3. **Assess your organization:** Use `csga_kata_assessment` to find your starting point
4. **Plan improvements:** Use other tools to develop roadmaps
5. **Get training:** Use `csga_training_pathway` to build skills

---

## Support

For detailed information, see:
- **Full Documentation:** README.md
- **Type Definitions:** src/types.ts
- **CSGA Homepage:** https://csga-global.org

Enjoy exploring the world of cybersecurity standards with CSGA!
