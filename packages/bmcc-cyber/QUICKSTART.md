# BMCC Cyber Programme MCP Server - Quick Start Guide

## Installation (30 seconds)

```bash
cd /sessions/brave-adoring-cerf/mcp-servers/bmcc-cyber
npm install
npm run build
```

## Running the Server

```bash
node build/index.js
```

You should see:
```
BMCC Cyber MCP Server started successfully
```

## Using with Claude

Configure in Claude settings:
```json
{
  "name": "bmcc-cyber-mcp",
  "command": "node",
  "args": ["/sessions/brave-adoring-cerf/mcp-servers/bmcc-cyber/build/index.js"]
}
```

## Example Queries

### 1. Browse Courses
```
"Show me all intermediate cybersecurity courses"
```

### 2. Assess Skills
```
"I know networking and some Linux. I want to become a penetration tester. 
What's my current level and what should I do?"
```

**Response includes:**
- Current skill level (e.g., "beginner")
- K.A.T.A. belt equivalent
- 4-5 recommended courses with priority
- 3-phase learning path with timelines
- 3+ certifications with prep timelines
- Actionable next steps

### 3. Plan Career Path
```
"I'm an IT support person with 3 years experience. 
I want to become a security architect. What's my path?"
```

**Response includes:**
- Current role assessment with salary
- Target role salary and demand
- 4-step progression path with timelines
- Required certifications
- Global market data (4.8M gap, USD 6.74B market)
- Investment costs and ROI

### 4. Certification Prep
```
"Help me prepare for CompTIA Security+. 
I have no security background."
```

**Response includes:**
- Exam overview and career impact
- Prerequisites and waivers
- 90-question format, 750 passing score
- 6 content domains with percentages
- Week-by-week study plan (15 hrs/week)
- Practice resources with costs
- Success metrics and test day tips

### 5. Generate Lab Exercises
```
"Create a beginner network scanning lab. 
I have 45 minutes. I want to learn how to discover devices."
```

**Response includes:**
- Scenario with business context
- Hardware/software requirements
- 4 step-by-step instructions
- CLI commands with expected outputs
- Troubleshooting guide
- 2 extension challenges
- Lab report template

### 6. Workforce Gap Analysis
```
"We're a medium financial services company. 
Analyze our security team gaps. 
Current team knows: networking, Linux, compliance"
```

**Response includes:**
- Organization profile and maturity
- 10 skill gaps with severity
- 3 critical shortages
- 4 role recommendations with salaries
- 3-phase training plan (10 months)
- ROI analysis (420% estimated)
- BMCC programme fit
- 4-quarter implementation roadmap

## Available Tools

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `bmcc_course_catalog` | Browse courses | topic, level, focus_area | 8 courses with details |
| `bmcc_skill_assessment` | Assess skills | knowledge, experience, goal | Level, K.A.T.A., path |
| `bmcc_career_pathway` | Map careers | current_role, target, exp | 4-step progression, salary |
| `bmcc_certification_prep` | Cert guides | target_cert, current_level | Study plan, exam specs |
| `bmcc_lab_exercise` | Lab scenarios | topic, difficulty, time | Full lab with steps |
| `bmcc_workforce_gap` | Org analysis | org_size, sector, skills | Gap assessment, ROI |

## Supported Certifications

- CompTIA Security+ ($370, 90 questions)
- CEH ($1,250, 125 questions)
- CISSP ($749, 100 questions)
- CSR5 ($500, 75 questions)
- K.A.T.A. White Belt (Foundation)
- K.A.T.A. Yellow Belt (Intermediate)
- K.A.T.A. Orange Belt (Advanced)
- K.A.T.A. Red Belt (Expert)

## Pre-built Lab Scenarios

1. **Network Scanning** - Discover devices with Nmap
2. **Firewall Configuration** - Setup and test firewall rules
3. **Encryption Basics** - Encrypt/decrypt with OpenSSL

## Market Context

- Global cybersecurity training market: **USD 6.74 billion**
- Worldwide workforce gap: **4.8 million professionals**
- Annual growth: **12.5%**
- Average breach cost: **USD 4.24 million**

## Available Courses

1. Cybersecurity Fundamentals (Beginner)
2. Network Security & Defence (Intermediate)
3. Ethical Hacking & Penetration Testing (Advanced)
4. Incident Response & Forensics (Advanced)
5. Application Security (Intermediate)
6. Cloud Security (Intermediate)
7. Cryptography & Data Protection (Advanced)
8. Security Governance & Compliance (Advanced)

## Supported Sectors

- Finance (PCI-DSS, SOX, GDPR)
- Healthcare (HIPAA, HITRUST)
- Technology (SOC 2, ISO 27001)
- Government (NIST, FedRAMP)
- Manufacturing (NIST, ISO 27001)
- Retail (PCI-DSS, GDPR)

## Career Paths Mapped

- Security Analyst (Junior → Senior → Expert)
- Penetration Tester (Junior → Senior → Expert)
- Incident Response (Analyst → Manager)
- Security Architect (Engineer → Architect → Principal)

## Contact

**BMCC Cyber Programme**
- Institution: Borough of Manhattan Community College (CUNY)
- Partner: Cybersecurity Governance Alliance (CSGA)
- Contact: Daniel Katz at BMCC-CUNY
- Website: https://bmcc-cyberprogram.com

## Key Features

✅ 6 production-ready tools
✅ 8 complete courses
✅ 8 certification guides
✅ Real market data integration
✅ K.A.T.A. belt alignment
✅ 3 pre-built lab scenarios
✅ ROI projections
✅ Multi-sector support
✅ Career pathway mapping
✅ Workforce gap analysis

---

**Ready to use!** Start building with the BMCC Cyber Programme MCP Server.
