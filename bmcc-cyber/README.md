# BMCC Cyber Programme MCP Server

A comprehensive Model Context Protocol (MCP) server for the BMCC Cyber Programme - a 4-course cybersecurity education pathway built in partnership between CSGA (Cybersecurity Governance Alliance) and Borough of Manhattan Community College (CUNY).

## Overview

This MCP server provides tools for cybersecurity education, career pathway guidance, skills assessment, certification preparation, and workforce gap analysis. It supports the White Hat cybersecurity focus and K.A.T.A. belt alignment system.

**Key Market Context:**
- Global cybersecurity training market: **USD 6.74B**
- Worldwide workforce gap: **4.8M cybersecurity professionals**
- Annual growth rate: **12.5%**
- Contact: Daniel Katz at BMCC-CUNY

## Features

### 6 Core Tools

#### 1. **bmcc_course_catalog**
Browse the comprehensive BMCC cyber course catalog with advanced filtering.

**Input Parameters:**
- `topic` (optional): Search by cybersecurity topic
- `level` (optional): Filter by beginner/intermediate/advanced
- `focus_area` (optional): Filter by specific focus areas

**Available Courses:**
- Cybersecurity Fundamentals (Beginner)
- Network Security & Defence (Intermediate)
- Ethical Hacking & Penetration Testing (Advanced)
- Incident Response & Forensics (Advanced)
- Application Security (Intermediate)
- Cloud Security (Intermediate)
- Cryptography & Data Protection (Advanced)
- Security Governance & Compliance (Advanced)

**Output:**
- Course listings with descriptions, prerequisites, duration, credits
- Learning outcomes and K.A.T.A. belt alignment
- Certification preparation information

#### 2. **bmcc_skill_assessment**
Assess cybersecurity skill level and generate personalized learning paths.

**Input Parameters:**
- `current_knowledge` (required): Areas of existing knowledge
- `experience_years` (required): Years of IT/security experience
- `certifications_held` (optional): Current certifications
- `career_goal` (required): Target role or specialization

**Output:**
- Current skill level (novice to expert)
- K.A.T.A. belt equivalent
- Detailed skill breakdown with proficiency scores
- Recommended course sequence
- Learning path with phases and timelines
- Certification timeline estimates
- Next steps and action items

#### 3. **bmcc_career_pathway**
Map complete career progression with certifications and job market data.

**Input Parameters:**
- `current_role` (required): Current job position
- `target_role` (required): Desired career goal
- `experience` (required): Years of experience
- `education_level` (required): Current education level
- `preferred_specialization` (optional): Cloud, AppSec, etc.

**Output:**
- Current and target role assessments with salary data
- Step-by-step progression path with duration and requirements
- Required certifications and exam information
- Global market context (4.8M gap, USD 6.74B market, 12.5% growth)
- Career timeline with milestones
- Investment costs and ROI projections

#### 4. **bmcc_certification_prep**
Comprehensive certification preparation guides for 8 certifications.

**Supported Certifications:**
- CompTIA Security+
- CEH (Certified Ethical Hacker)
- CISSP (Certified Information Systems Security Professional)
- CSR5 (Certified Cybersecurity Researcher)
- K.A.T.A. White Belt (Foundation)
- K.A.T.A. Yellow Belt (Intermediate)
- K.A.T.A. Orange Belt (Advanced)
- K.A.T.A. Red Belt (Expert/Master)

**Input Parameters:**
- `target_certification` (required): Choose from above list
- `current_level` (required): Current knowledge level

**Output:**
- Certification overview and career impact
- Prerequisites and requirement waivers
- Exam format and logistics
- Content domains with percentage weighting
- Week-by-week study plan (15 hours/week)
- BMCC course alignment
- Practice resources with costs
- Success metrics and benchmarks
- Test day tips

#### 5. **bmcc_lab_exercise**
Generate hands-on cybersecurity lab exercises with comprehensive instructions.

**Input Parameters:**
- `topic` (required): Lab topic (network_scanning, firewall_configuration, etc.)
- `difficulty_level` (required): beginner/intermediate/advanced
- `time_available` (required): Time in minutes (minimum 15)
- `learning_objective` (required): What learners will achieve

**Pre-built Lab Scenarios:**
- Network Scanning with Nmap
- Firewall Configuration and Testing
- Encryption Basics and Data Protection

**Output:**
- Lab metadata and learning objectives
- Realistic scenario and business context
- Hardware/software requirements
- Step-by-step instructions with commands
- Expected outputs and troubleshooting
- Assessment criteria with success indicators
- Extension challenges for deeper learning
- Lab report template

#### 6. **bmcc_workforce_gap**
Analyze cybersecurity skill gaps in organizations.

**Input Parameters:**
- `organization_size` (required): startup/small/medium/enterprise
- `sector` (required): Industry sector (finance, healthcare, etc.)
- `current_team_skills` (required): Array of current skill areas
- `region` (optional): Geographic region for market data

**Output:**
- Organization profile and security maturity assessment
- Global market context (4.8M gap, USD 6.74B market)
- Detailed skill gap analysis with severity ratings
- Critical skill shortages with availability timelines
- Role recommendations with salary ranges
- Training investment plan (3 phases, 10 months)
- ROI analysis with payback periods
- BMCC programme fit and partnership benefits
- Implementation roadmap (4 quarters)
- Competitive advantages and business impact

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. Clone or navigate to the repository:
```bash
cd /sessions/brave-adoring-cerf/mcp-servers/bmcc-cyber
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

The server will listen on stdio and output startup confirmation.

## Usage

### With Claude
Add to your Claude settings:
```json
{
  "name": "bmcc-cyber-mcp",
  "command": "node",
  "args": ["/path/to/bmcc-cyber/build/index.js"]
}
```

### Example Queries

**Course Discovery:**
```
"Show me all advanced cybersecurity courses with a focus on ethical hacking"
```

**Career Planning:**
```
"I'm an IT support person with 3 years experience. What's my path to become a security architect?"
```

**Skills Assessment:**
```
"I know networking and Linux. I want to become a penetration tester. What should I do?"
```

**Certification Prep:**
```
"I want to get CEH certified. I already have Security+. Create a study plan."
```

**Lab Practice:**
```
"Create a beginner network scanning lab that takes 45 minutes"
```

**Workforce Analysis:**
```
"We're a medium-sized financial services company. Analyze our security team gaps."
```

## K.A.T.A. Belt System

The BMCC Cyber Programme uses the K.A.T.A. (Knowledge, Ability, Teaching, Attitude) belt alignment system:

- **White Belt**: Foundation level (Cybersecurity Fundamentals)
- **Yellow Belt**: Intermediate level (Network & Application Security)
- **Orange Belt**: Advanced level (Ethical Hacking, Forensics)
- **Red Belt**: Expert/Master level (Enterprise Architecture, Leadership)

All tools align learning recommendations with the appropriate K.A.T.A. belt level.

## Data and Models

### Supported Sectors
- Finance (High maturity, compliance-heavy)
- Healthcare (Medium maturity, HIPAA-focused)
- Technology (Medium maturity, AppSec-focused)
- Government (High maturity, defense-focused)
- Manufacturing (Low maturity, OT security)
- Retail (Low maturity, PCI-focused)

### Market Data
- Global Workforce Gap: 4.8 million professionals
- Market Size: USD 6.74 billion
- Annual Growth: 12.5%
- Average Salary Growth: 8.2% annually
- Breach Cost Average: USD 4.24 million (2021)

### Certification Information
Complete details for 8 certifications including:
- Exam formats and costs
- Content domain breakdowns
- Prerequisites and experience requirements
- Renewal periods
- Global recognition levels

## Architecture

### Project Structure
```
bmcc-cyber/
├── src/
│   ├── index.ts           # MCP server setup and routing
│   └── tools/
│       ├── index.ts       # Tool exports
│       ├── courseCatalog.ts
│       ├── skillAssessment.ts
│       ├── careerPathway.ts
│       ├── certificationPrep.ts
│       ├── labExercise.ts
│       └── workforceGap.ts
├── build/                 # Compiled JavaScript (after npm run build)
├── package.json
├── tsconfig.json
└── README.md
```

### Technology Stack
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.3+
- **Validation**: Zod 3.22+
- **Protocol**: MCP SDK 0.9+

## Development

### Build
```bash
npm run build
```

### Development Mode (watch)
```bash
npm run watch
```

### Clean Build
```bash
npm run clean
```

## API Documentation

All tools follow the MCP tool calling convention with input validation via Zod schemas.

### Input Validation
- All inputs are validated with Zod schemas before processing
- Invalid inputs return clear error messages
- Optional parameters can be omitted

### Output Format
All tools return:
```json
{
  "content": [
    {
      "type": "text",
      "text": "JSON formatted result..."
    }
  ]
}
```

## Partnership Information

**BMCC Cyber Programme**
- Institution: Borough of Manhattan Community College (CUNY)
- Partner: Cybersecurity Governance Alliance (CSGA)
- Contact: Daniel Katz at BMCC-CUNY
- Focus: White Hat Cybersecurity
- Homepage: https://bmcc-cyberprogram.com

## Certifications and Compliance

This tool aligns with:
- CompTIA Security+
- CEH (EC-Council)
- CISSP (ISC²)
- CSR5 (GIAC/SANS)
- K.A.T.A. Belt System (CSGA)
- NIST Cybersecurity Framework
- ISO 27001
- GDPR compliance
- PCI-DSS
- HIPAA
- FedRAMP

## License

CC0-1.0 - Creative Commons Zero (Public Domain Dedication)

## Version

1.0.0

## Support

For support, contact:
- BMCC: Daniel Katz at BMCC-CUNY
- Programme: https://bmcc-cyberprogram.com

## Changelog

### 1.0.0 (Initial Release)
- Complete MCP server implementation
- 6 core tools for cybersecurity education
- K.A.T.A. belt alignment
- Career pathway mapping
- Workforce gap analysis
- 8 certification preparation guides
- Pre-built lab scenarios
- Global market data integration
