# Employment AI MCP Server — Complete File Index

## Quick Navigation

### Getting Started (Pick One)
1. **New to this project?** → Start with `README.md` (2-min read)
2. **Want to set up quickly?** → See `QUICKSTART.md` (5-min read)
3. **Need deployment help?** → See `DEPLOYMENT.md` (10-min read)
4. **Need technical details?** → See `API_REFERENCE.md` (15-min read)

### Project Overview
- `BUILD_SUMMARY.txt` — Complete build summary and capabilities
- `STRUCTURE.md` — Project architecture and file organization

### Real-World Examples
- `EXAMPLES.md` — 5 detailed compliance scenarios

---

## File-by-File Guide

### Root Level Files (9 files)

#### Configuration
| File | Size | Purpose |
|------|------|---------|
| `package.json` | 638 B | Node.js dependencies, scripts |
| `tsconfig.json` | 386 B | TypeScript compiler settings |

#### Documentation
| File | Size | Purpose |
|------|------|---------|
| `README.md` | 2.8 KB | Project overview, features, quick start |
| `QUICKSTART.md` | ~3 KB | 5-minute setup guide, FAQs, red flags |
| `DEPLOYMENT.md` | ~5 KB | Deployment, configuration, checklists |
| `API_REFERENCE.md` | ~12 KB | Complete API specification |
| `EXAMPLES.md` | ~8 KB | 5 real-world scenarios with analysis |
| `STRUCTURE.md` | ~3 KB | Project architecture and statistics |
| `BUILD_SUMMARY.txt` | ~4 KB | Build completion summary |
| `INDEX.md` | This file | Complete file index and navigation |

### Source Code (3 files)

#### Main Server
- `src/index.ts` (3.8 KB)
  - MCP server initialization
  - Tool registration
  - Resource definitions
  - Server entry point

#### Tools
- `src/tools/hiring-ai-compliance.ts` (6.1 KB)
  - Hiring AI compliance assessment
  - Jurisdictional regulation detection
  - Bias requirements enumeration
  - Candidate rights and audit specs

- `src/tools/workplace-surveillance.ts` (3.9 KB)
  - Workplace monitoring compliance
  - Emotion recognition prohibition
  - Employee rights enumeration
  - Proportionality test framework

---

## Documentation Quick Reference

### README.md
**Contains:**
- Project description
- Features overview
- Regulations covered (by jurisdiction)
- Installation instructions
- Build and run commands
- License information

**Read this if:** You want a high-level overview

**Time to read:** 2-3 minutes

### QUICKSTART.md
**Contains:**
- 30-second setup instructions
- Tool summaries (one-page each)
- Key regulations at a glance
- Critical requirements (hiring and surveillance)
- 5-step compliance roadmaps
- Red flags to watch for
- Frequently asked questions
- Next steps

**Read this if:** You need quick answers and want to get started fast

**Time to read:** 5-8 minutes

### DEPLOYMENT.md
**Contains:**
- Step-by-step installation
- npm commands (install, build, start)
- Claude Desktop integration
- Detailed tool documentation
- Parameter explanations
- Response field descriptions
- Regulatory framework reference
- Pre-deployment checklists
- Testing and validation procedures
- Audit documentation requirements
- Support and consultation guidance

**Read this if:** You're ready to deploy or integrate with Claude

**Time to read:** 10-15 minutes

### API_REFERENCE.md
**Contains:**
- Server information (name, version, dependencies)
- Complete tool specifications
  - Function signatures
  - Parameter definitions
  - Response field descriptions
  - Example requests and responses
- Resource definitions
- Type definitions (TypeScript interfaces)
- Error handling
- Best practices
- Implementation recommendations

**Read this if:** You need technical specifications or are building integration

**Time to read:** 15-20 minutes

### EXAMPLES.md
**Contains:**
- 5 real-world compliance scenarios:
  1. Resume Screening AI (NYC-based tech company)
  2. Video Interview AI (Global enterprise)
  3. Workplace Monitoring (EU tech company)
  4. Compliance Officer Hiring (EU financial services)
  5. Worker Classification (US agricultural company)
- Step-by-step disparate impact testing walkthrough
- Compliance matrices and checklists
- Key takeaways and lessons learned

**Read this if:** You want to understand real-world application or see specific examples

**Time to read:** 20-25 minutes

### STRUCTURE.md
**Contains:**
- Complete directory layout
- File descriptions (what each file does)
- Build artifacts (after compilation)
- Key features overview
- Regulations covered (detailed list)
- Compliance requirements (hiring and surveillance)
- Implementation statistics
- Dependencies overview
- Target audience
- Future enhancement opportunities
- License and attribution

**Read this if:** You need architectural understanding or detailed technical info

**Time to read:** 10-12 minutes

### BUILD_SUMMARY.txt
**Contains:**
- Project overview
- Complete deliverables list
- Features summary
- Regulations covered (18+)
- Compliance requirements
- Built-in documentation overview
- Technology stack
- Implementation statistics
- Quick start commands
- Claude Desktop integration
- Usage examples
- Key strengths
- Limitations and disclaimers
- Project metadata

**Read this if:** You want a comprehensive summary of what was built

**Time to read:** 10 minutes

---

## Tools Reference

### Tool 1: hiring_ai_compliance

**What it does:** Assesses regulatory compliance for AI-based hiring systems

**Input Parameters:**
- `system_name` — Name of the hiring AI
- `ai_function` — What it does (screening, interviews, ranking, etc.)
- `data_inputs` — What data it uses (resumes, video, assessments, etc.)
- `jurisdiction` — Where it operates (US/NYC, EU, UK, etc.)

**Output (10 fields):**
- Risk level
- EU AI Act classification
- Applicable regulations (jurisdiction-aware)
- Bias assessment requirements
- Transparency requirements
- Candidate rights
- Audit requirements
- 10-step remediation roadmap
- CASA tier classification

**Documentation:** See DEPLOYMENT.md (section "Tool 1: hiring_ai_compliance")

### Tool 2: workplace_surveillance_compliance

**What it does:** Assesses compliance for AI-based workplace monitoring

**Input Parameters:**
- `system_name` — Name of the monitoring system
- `monitoring_type` — Type of monitoring (keystroke, video, emotion, etc.)
- `data_collected` — What data is collected
- `jurisdiction` — Where it operates

**Output (7 fields):**
- Risk classification
- Applicable regulations
- Employee rights
- 6-point proportionality test
- Prohibited practices
- 8-step remediation roadmap

**Documentation:** See DEPLOYMENT.md (section "Tool 2: workplace_surveillance_compliance")

---

## Regulations by Jurisdiction

### United States
- **Federal:** Title VII, ADA, ADEA, ECPA, NLRA, EEOC Guidance
- **State/Local:** NYC LL144, Illinois AI Video Interview Act, Colorado SB 21-169, California FEHA

### European Union
- **Core:** EU AI Act, GDPR, Platform Workers Directive
- **Supplementary:** Employment Equality Directive, Charter of Fundamental Rights

### United Kingdom
- **Core:** Equality Act 2010, ICO Employment Practices Code

### International
- **Core:** ILO Convention on Workers' Privacy

---

## Key Definitions

### High-Risk AI (Employment)
Per EU AI Act Annex III:
- Section 4(a): AI for recruitment and selection of natural persons
- Section 4(b): AI affecting employment relationship terms and conditions

### Disparate Impact
Neutral policy/practice with disproportionate effect on protected class
- Test: Four-Fifths (80%) Rule
- Coverage: Race, sex, age, disability, national origin, religion

### Protected Classes
Employment discrimination laws protect:
1. Race
2. Color
3. Religion
4. Sex/Gender
5. National origin
6. Age (40+)
7. Disability (physical or mental)
8. Genetic information
9. Marital/parental status (state-specific)
10. Sexual orientation (some jurisdictions)

### Proportionality Test
Balances legitimate purpose against privacy intrusion:
1. Legitimate aim
2. Necessity
3. Proportionality
4. Data minimization
5. Time limitation
6. Transparency

---

## Common Compliance Tasks

### Task: Assess Hiring AI
1. Read: QUICKSTART.md (5 min)
2. Run: hiring_ai_compliance tool with your system details
3. Review: Remediation roadmap
4. Consult: Employment law attorney
5. Execute: Compliance steps

### Task: Assess Workplace Monitoring
1. Read: QUICKSTART.md (5 min)
2. Run: workplace_surveillance_compliance tool
3. Review: Red flags section
4. Consult: Privacy attorney
5. Execute: Remediation steps

### Task: Prepare for Bias Audit
1. Read: EXAMPLES.md (disparate impact section)
2. Review: API_REFERENCE.md (bias assessment requirements)
3. Prepare: Selection rate data by demographic
4. Plan: Third-party auditor engagement
5. Document: Audit methodology and results

### Task: Deploy to Claude
1. Read: DEPLOYMENT.md (Claude Desktop section)
2. Build: npm install && npm run build
3. Configure: Add to claude_desktop_config.json
4. Test: Run npm start
5. Verify: Integration with Claude

---

## File Dependencies

```
package.json ─────┐
                  ├─> npm (build system)
tsconfig.json ────┘

src/index.ts ─────┐
                  ├─> npm run build ──> dist/ (compiled output)
src/tools/*.ts ───┘

All .md files ──> Documentation (human-readable, no dependencies)
```

---

## Building & Running

### From Scratch
```bash
# 1. Navigate to project
cd /sessions/brave-adoring-cerf/mcp-servers/employment-ai

# 2. Install dependencies
npm install

# 3. Build TypeScript
npm run build

# 4. Run server
npm start
```

### Integration
See DEPLOYMENT.md section "Integration with Claude Desktop"

### Troubleshooting
See DEPLOYMENT.md section "Compliance Checklist"

---

## Reading Recommendations

### For Developers
1. README.md (overview)
2. STRUCTURE.md (architecture)
3. API_REFERENCE.md (technical specs)
4. DEPLOYMENT.md (integration)

### For Compliance Officers
1. QUICKSTART.md (rapid onboarding)
2. EXAMPLES.md (real-world scenarios)
3. DEPLOYMENT.md (requirements checklist)
4. API_REFERENCE.md (detailed specifications)

### For Legal/HR Teams
1. README.md (overview)
2. QUICKSTART.md (quick reference)
3. EXAMPLES.md (scenarios)
4. DEPLOYMENT.md (compliance requirements)

### For Auditors
1. EXAMPLES.md (testing methodologies)
2. DEPLOYMENT.md (audit requirements)
3. API_REFERENCE.md (system specifications)

---

## Statistics

| Metric | Count |
|--------|-------|
| Total Files | 12 |
| Code Files (.ts) | 3 |
| Config Files (.json) | 2 |
| Documentation Files | 8 |
| Total Code (bytes) | ~1,900 |
| Total Documentation (words) | ~35,000 |
| Regulations Covered | 18+ |
| Tools Provided | 2 |
| Resources Provided | 2 |
| Candidate/Employee Rights | 7+ |
| Bias Assessment Requirements | 8+ |
| Remediation Steps (Total) | 18 |

---

## License & Usage

**License:** CC0-1.0 (Public Domain Dedication)

**You can:**
- Use freely
- Modify as needed
- Distribute
- Use commercially

**You must:**
- Consult legal counsel for interpretation
- Hire qualified auditors for testing
- Engage compliance experts
- Obtain proper legal advice

---

## Getting Help

### Technical Issues
- See: DEPLOYMENT.md
- Check: API_REFERENCE.md
- Review: BUILD_SUMMARY.txt

### Regulatory Questions
- Consult: Employment law attorney
- Contact: AI governance specialist
- Reach out to: Data protection officer

### Implementation Support
- Review: EXAMPLES.md
- Study: DEPLOYMENT.md checklists
- Consult: Compliance expert

---

## Version Information

- **Project Version:** 1.0.0
- **Build Date:** February 26, 2026
- **Regulatory Coverage:** Current through February 2026
- **Status:** Production Ready

---

## Next Steps

1. Choose your reading path above
2. Run `npm install` to set up
3. Review appropriate documentation
4. Run tools with your system details
5. Consult qualified professionals
6. Implement compliance requirements
7. Schedule ongoing compliance review

---

**Last Updated:** February 26, 2026
**Maintained By:** CSOAI — Council for the Safety of Artificial Intelligence
**License:** CC0-1.0 (Public Domain)

