# @csoai/aiemployment — Employment & HR AI Governance MCP Server

CSOAI Employment & HR AI MCP Server provides AI governance tools for employment-related AI systems covering hiring bias, EU AI Act compliance, NYC Local Law 144, EEOC regulations, and workplace surveillance AI.

## Features

### Tools
- `hiring_ai_compliance` — Comprehensive regulatory compliance assessment for hiring AI systems
  - NYC Local Law 144 (AEDT) bias audit requirements
  - EEOC disparate impact testing (Four-Fifths Rule)
  - EU AI Act Annex III high-risk classification
  - Candidate rights and transparency requirements
  - Bias assessment and remediation roadmap

- `workplace_surveillance_compliance` — Compliance assessment for workplace monitoring AI
  - EU AI Act Article 5(1)(f) emotion recognition prohibition
  - Employee rights and proportionality testing
  - Platform Workers Directive compliance
  - Prohibited surveillance practices

### Resources
- `employment://regulations/index` — Complete regulatory framework reference
- `employment://tools/guide` — Tool usage guide

## Regulations Covered

### US Federal
- Title VII Civil Rights Act — Disparate impact
- ADA — Accommodation requirements
- ADEA — Age discrimination
- EEOC AI Guidance (2023)
- ECPA — Electronic surveillance

### US State/Local
- NYC Local Law 144 — Automated Employment Decision Tools
- Illinois AI Video Interview Act
- Colorado SB 21-169
- California FEHA

### EU
- EU AI Act — Employment AI high-risk classification
- GDPR Articles 22, 88 — Automated decision-making
- Platform Workers Directive (2024)
- EU Charter — Fundamental rights

### International
- ILO Convention on Workers' Privacy
- UK Equality Act 2010
- UK ICO Employment Practices Code

## Install

```bash
npx @csoai/aiemployment
```

## Build from Source

```bash
npm install
npm run build
npm start
```

## Example Usage

### Hiring AI Assessment
```
Tool: hiring_ai_compliance
- system_name: "TalentScreen Pro"
- ai_function: "resume screening and candidate ranking"
- data_inputs: "resumes, educational background, work history"
- jurisdiction: "US/NYC"
```

### Workplace Surveillance Assessment
```
Tool: workplace_surveillance_compliance
- system_name: "ProductivityTracker AI"
- monitoring_type: "keystroke logging and activity monitoring"
- data_collected: "keystroke timing, window activity, mouse movement"
- jurisdiction: "EU"
```

## Legal Notice

This MCP server provides technical compliance guidance based on current regulations. It is not a substitute for legal counsel. Organizations should consult qualified employment law and AI governance attorneys before implementing AI systems in hiring and workplace monitoring.

## License

CC0-1.0 (Public Domain Dedication)

## Author

CSOAI — Council for the Safety of Artificial Intelligence
