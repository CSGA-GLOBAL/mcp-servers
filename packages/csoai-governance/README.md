# CSOAI AI Governance MCP Server

A production-quality Model Context Protocol (MCP) server implementing the CSOAI AI Governance Suite with comprehensive AI safety, compliance, and risk assessment capabilities.

**Version:** 1.0.0
**Author:** CSOAI — Council for the Safety of Artificial Intelligence
**License:** CC0-1.0
**Homepage:** https://csoai.org

## Overview

The CSOAI AI Governance MCP Server provides AI governance professionals, developers, and compliance teams with tools to:

- Map AI systems against 25 international governance frameworks
- Conduct CASA 4-tier AI certification assessments
- Perform sector-specific compliance analysis
- Classify AI system risks per EU AI Act categories
- Respond to AI incidents with structured protocols
- Reference 52 Partnership Charter principles

## Features

### 25 International Framework Crosswalks

Comprehensive mappings for:

- **CW-01:** EU AI Act
- **CW-02:** ISO/IEC 42001 (AI Management Systems)
- **CW-03:** NIST AI Risk Management Framework
- **CW-04:** OECD AI Principles
- **CW-05:** UNESCO AI Ethics
- **CW-06:** IEEE 7000 Series (Ethically Aligned Design)
- **CW-07:** Canadian AIDA
- **CW-08:** Singapore Model AI Governance
- **CW-09:** Japan AI Social Principles
- **CW-10:** China AI Governance
- **CW-11:** African Union AI Framework
- **CW-12:** GPAI Code of Conduct
- **CW-13:** WEF AI Governance
- **CW-14:** Council of Europe AI Convention
- **CW-15:** ASEAN Guide on AI Ethics
- **CW-16:** Saudi Arabia AI Ethics
- **CW-17:** Brazil AI Framework
- **CW-18:** Australia AI Ethics Framework
- **CW-19:** ISO/IEC 23894 (AI Risk Management)
- **CW-20:** AI Agent Release Certification Standards
- **CW-21:** NIST AI 600-1 GenAI Profile
- **CW-22:** OWASP MCP Top 10
- **CW-23:** OWASP Agentic AI Top 10
- **CW-24:** Defence/NDAA/CBRN AI Governance
- **CW-25:** OWASP LLM Top 10

Each crosswalk provides:
- Framework requirements and principles
- Mapping to CASA certification tiers
- Identified compliance gaps
- Recommended actions for compliance

### CASA 4-Tier Certification Assessment

Comprehensive AI system assessment with four certification tiers:

- **Tier 1:** Self-Assessment (organizations assess their own practices)
- **Tier 2:** Third-Party Audit (independent auditors verify compliance)
- **Tier 3:** Continuous Monitoring (automated systems monitor ongoing compliance)
- **Tier 4:** Byzantine Council Review (expert council reviews systemic risks)

Returns:
- Recommended certification tier
- Compliance score against governance standards
- Applicable international frameworks
- Identified compliance gaps
- Step-by-step certification pathway

### 52 Partnership Charter Articles

Complete reference for AI governance principles covering:
- Governance and accountability
- Risk assessment and management
- Safety testing and evaluation
- Human oversight and control
- Transparency and explainability
- Data governance and privacy
- Stakeholder engagement
- Incident response protocols
- And 44 additional articles

### Sector-Specific Compliance

Compliance analysis for 8 critical sectors:

1. **Healthcare**
   - HIPAA, FDA, clinical validation requirements
   - Diagnostic accuracy, bias testing, human oversight
   - Post-market surveillance

2. **Financial Services**
   - Fair lending, capital requirements, AML compliance
   - Model risk management, explainability
   - Regulatory audit and reporting

3. **Military/Defense**
   - National security, CBRN risk mitigation
   - Autonomous weapons governance, human control
   - Export controls and foreign involvement restrictions

4. **Education**
   - Student data protection, FERPA compliance
   - Equitable access, academic integrity
   - Bias assessment across student populations

5. **Employment**
   - Fair hiring, adverse impact analysis
   - ADA accessibility, discrimination prevention
   - Salary equity, appeals processes

6. **Criminal Justice**
   - Due process, racial bias assessment
   - Transparency and explainability
   - Constitutional compliance

7. **Transportation**
   - Autonomous vehicle safety validation
   - Cybersecurity for vehicles
   - Occupant and pedestrian protection

8. **Social Media**
   - Content moderation, misinformation detection
   - Child safety, algorithmic transparency
   - Appeals and removal processes

### EU AI Act Risk Classification

Risk assessment using EU AI Act categories:

- **Unacceptable Risk:** Systems prohibited under EU AI Act
  - Requires non-deployment or major redesign
  - Significant legal liability

- **High Risk:** Systems requiring strict compliance measures
  - Comprehensive documentation and testing
  - Third-party conformity assessment
  - Human oversight and monitoring

- **Limited Risk:** Systems requiring transparency measures
  - User disclosure requirements
  - Basic safety measures

- **Minimal Risk:** Systems with minimal impact
  - Standard data protection compliance

### AI Incident Response Protocol

Structured incident response with:
- Severity assessment and classification
- Immediate actions and escalation procedures
- Investigation and root cause analysis
- Stakeholder notification requirements
- Remediation and recovery steps
- Preventive measures for future incidents

## Installation

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Setup

1. Clone or navigate to the server directory:
```bash
cd /sessions/brave-adoring-cerf/mcp-servers/csoai-governance
```

2. Install dependencies:
```bash
npm install
```

3. Build the TypeScript:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## Usage

### With ChatGPT

Configure the MCP plugin in ChatGPT settings to connect to the CSOAI server endpoint.

### With Claude

Add the server to your MCP configuration in Claude desktop:

```json
{
  "mcpServers": {
    "csoai-governance": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
```

### With Cursor

Configure in Cursor's MCP settings to enable governance analysis in your development workflow.

### With VS Code

Install the MCP extension and configure to connect to the CSOAI server.

### Direct API Usage

Connect via stdio to any MCP-compatible application:

```bash
node dist/index.js
```

## Tools Reference

### 1. crosswalk_lookup

Look up any of 25 international AI governance framework crosswalks.

**Parameters:**
- `crosswalk_id` (string): Framework identifier (CW-01 to CW-25)

**Example:**
```
crosswalk_lookup(crosswalk_id="CW-01")
```

**Returns:**
- Framework name and version
- Jurisdiction
- Key requirements
- CASA tier mappings
- Compliance gaps
- Recommended actions

### 2. charter_lookup

Look up any of the 52 Partnership Charter articles.

**Parameters:**
- `article_number` (number): Article number (1-52)

**Example:**
```
charter_lookup(article_number=4)
```

**Returns:**
- Article title
- Full content
- Key principles

### 3. casa_assessment

Run the CASA 4-tier certification assessment.

**Parameters:**
- `system_name` (string): Name of the AI system
- `system_description` (string): Detailed system description
- `deployment_context` (string): Where and how the system is deployed

**Example:**
```
casa_assessment(
  system_name="MedicalDiagnosisAI",
  system_description="Machine learning system for medical image analysis...",
  deployment_context="Deployed in 50 hospitals across EU for diagnostic support"
)
```

**Returns:**
- Recommended CASA tier (1-4)
- Compliance score (0-100)
- Applicable crosswalk frameworks
- Identified compliance gaps
- Certification pathway with phases

### 4. sector_compliance

Perform sector-specific compliance assessment.

**Parameters:**
- `sector` (enum): One of healthcare, financial, military, education, employment, criminal_justice, transportation, social_media
- `system_description` (string): Description of the AI system

**Example:**
```
sector_compliance(
  sector="healthcare",
  system_description="AI diagnostic system for chest X-ray analysis..."
)
```

**Returns:**
- Compliance requirements for the sector
- Applicable regulatory frameworks
- Key risks and mitigation strategies
- Compliance checklist with status

### 5. risk_assessment

Classify AI system risk per EU AI Act categories.

**Parameters:**
- `system_name` (string): Name of the AI system
- `system_description` (string): System description
- `scope_and_impact` (string): Who is affected and what decisions does it influence

**Example:**
```
risk_assessment(
  system_name="EmploymentScreeningAI",
  system_description="Automated resume screening for job applications...",
  scope_and_impact="Used in hiring decisions for technical roles affecting 1000+ applicants annually"
)
```

**Returns:**
- Risk category (Unacceptable, High, Limited, Minimal)
- Risk score (0-100)
- Identified risks with severity
- Required measures
- Compliance implications
- Residual risk assessment

### 6. incident_response

Generate incident response protocol.

**Parameters:**
- `incident_name` (string): Brief incident title
- `incident_description` (string): Detailed incident description
- `severity_assessment` (enum): Critical, High, Medium, or Low

**Example:**
```
incident_response(
  incident_name="Bias in Recruitment AI",
  incident_description="Analysis revealed the AI rejected 80% of applications from women...",
  severity_assessment="High"
)
```

**Returns:**
- Assessed severity level
- Immediate actions to take
- Investigation steps
- Stakeholder notification requirements
- Remediation steps
- Preventive measures
- Estimated resolution timeline

## Resources

### csoai://crosswalks/index

Index and guide to all 25 international AI framework crosswalks.

### csoai://charter/index

Complete guide to all 52 Partnership Charter articles organized by category.

### csoai://tools/guide

Comprehensive guide to all server tools, workflow examples, and best practices.

## Workflow Examples

### Example 1: Assessing a Healthcare AI System

1. Start with risk assessment:
```
risk_assessment(
  system_name="DiagnosticAI",
  system_description="ML system for pathology slide analysis",
  scope_and_impact="Used in 20 hospital labs for cancer diagnosis, 10,000+ patients/year"
)
```
Result: High risk → EU AI Act compliance required

2. Check sector-specific requirements:
```
sector_compliance(
  sector="healthcare",
  system_description="Pathology analysis AI..."
)
```
Result: HIPAA, FDA, clinical validation requirements

3. Run CASA assessment:
```
casa_assessment(
  system_name="DiagnosticAI",
  system_description="Pathology analysis AI...",
  deployment_context="Hospital diagnostic labs in EU and US"
)
```
Result: Tier 2-3 recommended (third-party audit + continuous monitoring)

4. Review relevant frameworks:
```
crosswalk_lookup(crosswalk_id="CW-19")  # ISO/IEC 23894
crosswalk_lookup(crosswalk_id="CW-02")  # ISO/IEC 42001
```

### Example 2: Evaluating LLM Safety

1. Risk classification:
```
risk_assessment(
  system_name="CompanyLLM",
  system_description="Large language model for customer service...",
  scope_and_impact="Used to respond to 100,000 customer queries daily"
)
```

2. Check multiple security frameworks:
```
crosswalk_lookup(crosswalk_id="CW-25")  # OWASP LLM Top 10
crosswalk_lookup(crosswalk_id="CW-22")  # OWASP MCP Top 10
crosswalk_lookup(crosswalk_id="CW-23")  # OWASP Agentic AI Top 10
```

3. CASA assessment:
```
casa_assessment(
  system_name="CompanyLLM",
  system_description="LLM for customer service...",
  deployment_context="Production customer-facing service"
)
```

### Example 3: Incident Response

1. Generate response protocol:
```
incident_response(
  incident_name="LLM Generated Offensive Content",
  incident_description="System generated offensive content about protected group...",
  severity_assessment="High"
)
```

2. Reference Charter principles:
```
charter_lookup(article_number=9)   # Fairness and non-discrimination
charter_lookup(article_number=14)  # Incident reporting and response
```

3. Re-assess after remediation:
```
casa_assessment(
  system_name="CompanyLLM",
  system_description="LLM with improved content filtering...",
  deployment_context="Production with enhanced safety measures"
)
```

## Architecture

### Directory Structure

```
csoai-governance/
├── src/
│   ├── index.ts                 # Main MCP server
│   ├── tools/
│   │   ├── crosswalk-lookup.ts  # Framework crosswalk tool
│   │   ├── charter-lookup.ts    # Charter article tool
│   │   ├── casa-assess.ts       # CASA certification assessment
│   │   ├── sector-compliance.ts # Sector compliance tool
│   │   ├── risk-assessment.ts   # Risk classification tool
│   │   └── incident-response.ts # Incident response protocol
│   └── resources/
│       ├── crosswalks.ts        # 25 crosswalk definitions
│       └── charter.ts           # 52 charter articles
├── dist/                         # Compiled JavaScript
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── README.md                    # This file
```

### Technology Stack

- **Runtime:** Node.js 18+
- **Language:** TypeScript 5+
- **MCP SDK:** @modelcontextprotocol/sdk
- **Validation:** Zod
- **Transport:** Stdio (compatible with all MCP clients)

## Best Practices

### 1. Assessment Workflow

Always follow this sequence for comprehensive analysis:
1. Risk assessment (understand the risk level)
2. Sector compliance (check industry-specific requirements)
3. CASA assessment (determine certification pathway)
4. Crosswalk lookup (map to specific frameworks)
5. Charter review (implement governance principles)

### 2. Documentation

Keep detailed documentation of:
- Assessment results and reasoning
- Compliance gaps identified
- Remediation plans with timelines
- Evidence of compliance measures
- Monitoring and audit results

### 3. Continuous Monitoring

For Tier 3-4 systems:
- Establish continuous monitoring dashboards
- Set up automated alerts for performance degradation
- Schedule regular compliance reviews
- Document and respond to any deviations

### 4. Incident Management

When incidents occur:
- Use incident_response tool immediately
- Follow recommended notification requirements
- Document all investigation findings
- Implement preventive measures
- Re-assess system risk after resolution

## Integration Examples

### With Python/LangChain

```python
from mcp import McpClient

client = McpClient("csoai-governance")

# Run CASA assessment
result = client.call_tool("casa_assessment", {
    "system_name": "MyAISystem",
    "system_description": "...",
    "deployment_context": "..."
})
```

### With JavaScript/Node.js

```javascript
const { McpClient } = require("@modelcontextprotocol/sdk");

const client = new McpClient("csoai-governance");

const result = await client.callTool("risk_assessment", {
  system_name: "MyAISystem",
  system_description: "...",
  scope_and_impact: "..."
});
```

## Performance

- **Instant Response:** All lookups and assessments run locally
- **Scalable:** Handles assessments for multiple systems simultaneously
- **Reliable:** Comprehensive error handling and validation
- **Secure:** All processing occurs on your system

## Support and Contribution

For questions, issues, or contributions:
- Visit: https://csoai.org
- Issues and pull requests welcome
- Adopt the Charter principles in your AI governance

## License

This server is released under the CC0-1.0 license, placing it in the public domain. You are free to use, modify, and distribute it for any purpose.

## Disclaimer

This tool provides information and guidance for AI governance and compliance. It should not be considered legal advice. Consult with legal experts and compliance specialists for your specific situation and jurisdiction.

## Acknowledgments

The CSOAI AI Governance MCP Server builds upon work from:
- European Commission (EU AI Act)
- NIST (AI Risk Management Framework)
- OWASP (LLM Top 10, Agentic AI, MCP Top 10)
- ISO/IEC (AI Standards)
- UNESCO (AI Ethics)
- IEEE (Ethically Aligned Design)
- And many international organizations advancing AI safety

---

**CSOAI — Council for the Safety of Artificial Intelligence**
Advancing responsible development and deployment of AI systems through governance, standards, and cooperation.
