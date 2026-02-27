# CSGA Standards MCP Server

A comprehensive Model Context Protocol (MCP) server providing cybersecurity standards, training pathways, threat intelligence, and incident response capabilities from the Cyber Security Global Alliance (CSGA).

**Author:** CSGA — Cyber Security Global Alliance
**License:** CC0-1.0
**Homepage:** https://csga-global.org
**Version:** 1.0.0

---

## About CSGA

The **Cyber Security Global Alliance (CSGA)** is a leading global organization dedicated to advancing cybersecurity standards and practices worldwide.

- **95,000+ subscribers** across the global cybersecurity community
- **20+ countries** represented in our member network
- **11-member board** providing strategic governance and oversight
- **Mission:** To establish and promote unified cybersecurity standards, frameworks, and best practices globally

CSGA serves organizations of all sizes, from startups to enterprises, helping them implement security best practices and achieve compliance with major international frameworks.

---

## Features

### 1. **csga_standards_lookup** — Cybersecurity Standards Reference
Look up comprehensive information about major cybersecurity standards, frameworks, and best practices.

**Covers:**
- **CSR5** — CSGA Cyber Security Readiness Level 5 (proprietary maturity model)
- **NIST CSF** — NIST Cybersecurity Framework
- **ISO 27001** — International Information Security Management Standard
- **CIS Controls** — CIS Critical Security Controls
- **MITRE ATT&CK** — Adversary Tactics, Techniques & Common Knowledge
- Additional frameworks: OWASP, PCI-DSS, HIPAA, SOC 2

**Input:** Standard name or topic query (e.g., "access control", "incident response")
**Output:** Standard details, requirements, implementation guidance, compliance effort

### 2. **csga_kata_assessment** — K.A.T.A.™ 8-Belt Cyber Defense Assessment
Evaluate your organization's cybersecurity maturity using CSGA's proprietary K.A.T.A.™ framework.

**Belt Levels (Progression Path):**
1. **White (Awareness)** — Basic security awareness and understanding
2. **Yellow (Foundation)** — Foundational controls implementation
3. **Orange (Intermediate)** — Advanced controls and formalized processes
4. **Green (Applied)** — Applied mature practices with defined processes
5. **Blue (Advanced)** — Advanced expertise and capabilities
6. **Purple (Expert)** — Expert-level security program
7. **Brown (Mastery)** — Mastery-level exceptional capabilities
8. **Black (Leadership)** — Industry-leading security excellence

**Input:** Organization description, current controls, training level, incident history
**Output:** Current belt level, gap analysis, training recommendations, timeline to next level

### 3. **csga_threat_intel** — Cybersecurity Threat Intelligence
Access current threat intelligence, assess sector-specific threats, and understand threat tactics and indicators.

**Coverage:**
- Threat actors (APT groups, ransomware operators)
- Threat types (Ransomware, APT, Zero-Days, Supply Chain attacks)
- Sector-specific threat assessments
- CVE lookups and vulnerability intelligence
- MITRE ATT&CK mapping
- Indicators of Compromise (IOCs)
- Mitigation recommendations

**Input:** Sector, threat type, CVE ID, or search query
**Output:** Threat assessment, severity, tactics/techniques, detection methods, mitigations

### 4. **csga_incident_response** — Cyber Incident Response Protocol
Get detailed, step-by-step incident response procedures for various attack types.

**Incident Types:**
- Ransomware attacks
- Data breaches
- System compromises
- DDoS attacks
- Insider threats
- Supply chain attacks
- Malware infections

**Input:** Incident type, severity level, affected systems
**Output:** Response procedures, containment steps, investigation procedures, notification requirements, recovery timeline, escalation path

### 5. **csga_training_pathway** — Cybersecurity Training Recommendations
Get personalized training and certification recommendations based on your current skills and career goals.

**Career Paths:**
- Security Awareness Training
- System Administration
- Security Analysis
- Penetration Testing
- CISO/Leadership
- Incident Response Specialist
- Cloud Security Engineer
- DevSecOps Engineer

**Input:** Current skill level, career goal, sector, budget, learning preference
**Output:** Recommended courses, certifications, timeline, estimated costs, prerequisite skills, success metrics

### 6. **csga_compliance_check** — Compliance Framework Assessment
Quick compliance evaluation against major regulatory frameworks and standards.

**Frameworks Evaluated:**
- NIST Cybersecurity Framework
- ISO/IEC 27001:2022
- HIPAA Security Rule
- PCI-DSS v3.2.1
- SOC 2 Type II
- GDPR (EU)
- SOX (Sarbanes-Oxley)
- CIS Critical Security Controls

**Input:** Organization type, size, current controls, geographic scope
**Output:** Compliance status per framework, gaps, priority actions, estimated effort and cost

---

## Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Setup

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run the server
npm start
```

### Development

```bash
# Watch mode (rebuilds on file changes)
npm run watch

# Development mode (build and run)
npm run dev

# Linting
npm run lint

# Format code
npm run format
```

---

## Usage

### With Claude/MCP Client

The server operates via the Model Context Protocol (MCP) using stdio transport. Configure your MCP client to use:

```json
{
  "name": "csga-standards-mcp",
  "command": "node",
  "args": ["dist/index.js"],
  "env": {
    "MCP_STDIO": "true"
  }
}
```

### Example Tool Calls

**Look up NIST CSF standards:**
```json
{
  "name": "csga_standards_lookup",
  "arguments": {
    "standard": "NIST_CSF"
  }
}
```

**Assess organizational security maturity:**
```json
{
  "name": "csga_kata_assessment",
  "arguments": {
    "organization_description": "Financial services company with 500 employees",
    "current_controls": [
      "Firewall",
      "MFA",
      "SIEM",
      "EDR",
      "Vulnerability Scanning"
    ],
    "employees_trained": 450,
    "incident_history": "Minimal - one phishing incident in 2023",
    "budget_allocation": "Moderate"
  }
}
```

**Get threat intelligence for healthcare sector:**
```json
{
  "name": "csga_threat_intel",
  "arguments": {
    "sector": "Healthcare",
    "threat_type": "Ransomware"
  }
}
```

**Get ransomware incident response procedure:**
```json
{
  "name": "csga_incident_response",
  "arguments": {
    "incident_type": "Ransomware",
    "severity": "Critical",
    "affected_systems": [
      "File Servers",
      "Backup Systems",
      "Email Servers"
    ]
  }
}
```

**Get CISO training pathway:**
```json
{
  "name": "csga_training_pathway",
  "arguments": {
    "current_level": "Intermediate",
    "goal": "CISO",
    "sector": "Financial",
    "budget_usd": 50000
  }
}
```

**Evaluate compliance status:**
```json
{
  "name": "csga_compliance_check",
  "arguments": {
    "organization_type": "Healthcare",
    "size": "Enterprise",
    "current_controls": [
      "Firewall",
      "Encryption",
      "MFA",
      "Access Control",
      "Audit Logging"
    ],
    "geographic_scope": ["USA", "Europe"]
  }
}
```

---

## Framework & Standards Details

### CSR5 (CSGA Cyber Security Readiness Level 5)

CSGA's proprietary maturity assessment framework with 5 levels:
- **Level 1 (Initial):** Ad hoc processes
- **Level 2 (Repeatable):** Basic security practices
- **Level 3 (Defined):** Documented and standardized
- **Level 4 (Managed):** Quantitatively managed
- **Level 5 (Optimized):** Continuous improvement

### NIST Cybersecurity Framework (CSF)

Five core functions:
1. **Identify** — Asset and risk management
2. **Protect** — Access control and safeguards
3. **Detect** — Monitoring and detection
4. **Respond** — Incident response procedures
5. **Recover** — Recovery and resilience

### ISO/IEC 27001:2022

14 control areas with 93 controls across:
- Information Security Policies
- Organization of Information Security
- Human Resource Security
- Asset Management
- Access Control
- Cryptography
- Physical and Environmental Security
- Operations Security
- Communications Security
- System Acquisition, Development & Maintenance
- Supplier Relationships
- Information Security Incident Management
- Business Continuity Management
- Compliance

### CIS Critical Security Controls v8.1

18 controls organized in three implementation groups (IG):
- **IG1:** Essential controls for all organizations
- **IG2:** Advanced controls for sensitive data
- **IG3:** Organizational maturity controls

---

## API Reference

### Tool Schemas

All tools use Zod for input validation with comprehensive error handling.

#### StandardsLookupInputSchema
```typescript
{
  standard?: "CSR5" | "NIST_CSF" | "ISO_27001" | "CIS_CONTROLS" | "MITRE_ATTACK",
  query?: string,
  focus_area?: "governance" | "asset_management" | "access_control" | "detection_response" | "recovery" | "awareness_training"
}
```

#### KataAssessmentInputSchema
```typescript
{
  organization_description: string,
  current_controls: string[],
  employees_trained?: number,
  incident_history?: string,
  budget_allocation?: "Limited" | "Moderate" | "Substantial"
}
```

#### ThreatIntelInputSchema
```typescript
{
  sector?: "Finance" | "Healthcare" | "Energy" | "Manufacturing" | "Technology" | "Government" | "Retail" | "Education",
  threat_type?: "Ransomware" | "APT" | "Insider_Threat" | "DDoS" | "Zero_Day" | "Phishing" | "Supply_Chain" | "Cloud_Threat",
  cve_id?: string,
  query?: string
}
```

#### IncidentResponseInputSchema
```typescript
{
  incident_type: "Ransomware" | "Data_Breach" | "System_Compromise" | "DDoS" | "Insider_Threat" | "Supply_Chain" | "Malware",
  severity: "Critical" | "High" | "Medium" | "Low",
  affected_systems: string[],
  affected_records?: number,
  internal_systems_only?: boolean
}
```

#### TrainingPathwayInputSchema
```typescript
{
  current_level: "Beginner" | "Intermediate" | "Advanced" | "Expert",
  goal: "Security_Awareness" | "System_Administrator" | "Security_Analyst" | "Penetration_Tester" | "CISO" | "Incident_Response" | "Cloud_Security" | "DevSecOps",
  sector?: string,
  budget_usd?: number,
  learning_preference?: "Self_Paced" | "Instructor_Led" | "Hybrid" | "Hands_On_Lab"
}
```

#### ComplianceCheckInputSchema
```typescript
{
  organization_type: "Financial" | "Healthcare" | "Technology" | "Retail" | "Manufacturing" | "Government" | "Education",
  size?: "Small" | "Medium" | "Enterprise",
  current_controls: string[],
  geographic_scope?: string[]
}
```

---

## Resources

### Available Framework Resources

#### csga://frameworks
Access all supported cybersecurity frameworks and standards:
- NIST CSF
- ISO 27001
- CIS Controls
- CSR5
- MITRE ATT&CK
- OWASP Top 10
- PCI-DSS
- HIPAA
- SOC 2

#### csga://kata-belts
K.A.T.A. belt definitions and progression:
- Belt descriptions and competencies
- Maturity score ranges
- Typical advancement timeline
- Skill requirements per belt level

#### csga://training-catalog
Available training courses and certifications:
- SANS Institute courses (SEC401, SEC504, SEC566)
- CompTIA certifications (Security+, CISSP, CISM)
- CSGA proprietary courses
- Specialized certifications (OSCP, CEH, CISA)
- Cost and duration information

---

## Technology Stack

- **Language:** TypeScript (ES2020)
- **Runtime:** Node.js 18+
- **Framework:** Model Context Protocol (MCP) SDK
- **Validation:** Zod
- **Build:** TypeScript Compiler (tsc)

---

## Project Structure

```
csga-standards/
├── src/
│   ├── index.ts           # Main server and tool handlers
│   ├── types.ts           # TypeScript types and Zod schemas
│   ├── standards.ts       # Standards and frameworks database
│   ├── kata.ts            # K.A.T.A. assessment engine
│   ├── threats.ts         # Threat intelligence database
│   ├── incident.ts        # Incident response procedures
│   ├── training.ts        # Training pathways and courses
│   └── compliance.ts      # Compliance assessment logic
├── dist/                  # Compiled JavaScript (generated)
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

---

## Development Guidelines

### Adding New Standards

1. Add to `STANDARDS_DATABASE` in `src/standards.ts`
2. Update `StandardName` type in `src/types.ts`
3. Create corresponding entries in `FRAMEWORKS_CATALOG`

### Adding New Threats

1. Add to `THREATS_DATABASE` in `src/threats.ts`
2. Update `SECTOR_THREAT_MAPPING` for sector-specific lookup
3. Include MITRE ATT&CK mapping

### Adding New Training Paths

1. Add courses to `TRAINING_COURSES` in `src/training.ts`
2. Define training pathway in `TRAINING_PATHWAYS`
3. Add certifications to `CERTIFICATIONS` database

### Adding New Compliance Frameworks

1. Add framework to `COMPLIANCE_DATABASE` in `src/compliance.ts`
2. Update `applicableMap` in `getApplicableFrameworks()`
3. Define gaps and priority actions

---

## Error Handling

The server implements comprehensive error handling:
- Zod schema validation for all inputs
- Try-catch blocks around tool execution
- Descriptive error messages
- Graceful degradation for missing data

---

## Performance Considerations

- In-memory database for instant lookups
- O(1) direct lookups for specific standards
- O(n) search for query-based lookups (optimized for small datasets)
- Lazy evaluation of compliance calculations
- Minimal external dependencies

---

## Testing

The server is built with production-grade code quality:
- TypeScript strict mode enabled
- No unused variables or parameters
- Comprehensive type coverage
- Zod runtime validation on all inputs

---

## Security Considerations

- No external API calls (all data self-contained)
- No credential storage
- No sensitive data in responses
- Suitable for air-gapped environments
- HIPAA-compatible recommendations (no actual health data)

---

## License

CC0-1.0 (Creative Commons Zero) — Public Domain
Feel free to use, modify, and distribute without restriction.

---

## Support & Feedback

For issues, questions, or contributions:
- **Homepage:** https://csga-global.org
- **Community:** 95,000+ cybersecurity professionals
- **Global Reach:** 20+ countries

---

## Roadmap

Future enhancements:
- Real-time threat intelligence integration
- API for external threat feeds
- Advanced analytics and reporting
- Interactive compliance assessment UI
- Customizable training pathways
- Integration with popular SIEM platforms
- Automated remediation recommendations
- Advanced risk scoring algorithms

---

## Contributors

Built by the CSGA Team with input from our 11-member board and global community of cybersecurity professionals.

---

**Made with security excellence in mind.** 🛡️
