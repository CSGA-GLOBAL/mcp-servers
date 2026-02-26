# CSOAI AI Governance MCP Server - Quick Start Guide

## 5-Minute Setup

### 1. Install & Build

```bash
cd /sessions/brave-adoring-cerf/mcp-servers/csoai-governance
npm install
npm run build
```

### 2. Start the Server

```bash
npm start
```

You should see it listening on stdio.

### 3. Connect with Your AI Tool

#### ChatGPT
Add to MCP plugins and configure the endpoint.

#### Claude Desktop
Add to `~/.claude/mcp_servers.json`:
```json
{
  "csoai-governance": {
    "command": "node",
    "args": ["/full/path/to/dist/index.js"]
  }
}
```

#### Cursor
Configure MCP settings to point to the server.

#### Any MCP Client
Connect via stdio to the running server.

## 6 Essential Tools

### 1. Quick Risk Assessment
```
risk_assessment(
  system_name="MyAI",
  system_description="Brief description of your AI system",
  scope_and_impact="Who uses it and what decisions does it affect"
)
```

### 2. Check Sector Compliance
```
sector_compliance(
  sector="healthcare",  // or: financial, military, education, employment, criminal_justice, transportation, social_media
  system_description="Your system description"
)
```

### 3. Get CASA Tier Recommendation
```
casa_assessment(
  system_name="MyAI",
  system_description="Detailed system description",
  deployment_context="Where it's deployed and how it's used"
)
```

### 4. Look Up a Framework
```
crosswalk_lookup(crosswalk_id="CW-03")  // NIST AI RMF
```

All crosswalks: CW-01 (EU AI Act) through CW-25 (OWASP LLM Top 10)

### 5. Find Charter Principles
```
charter_lookup(article_number=4)  // Risk assessment and management
```

Articles: 1-52 covering all AI governance principles

### 6. Respond to Incident
```
incident_response(
  incident_name="AI made discriminatory decision",
  incident_description="Detailed description of what happened",
  severity_assessment="High"  // or: Critical, Medium, Low
)
```

## Common Workflows

### Assess a New AI System
1. `risk_assessment()` → See risk category (Unacceptable/High/Limited/Minimal)
2. `casa_assessment()` → Get certification tier recommendation
3. `sector_compliance()` → Check industry requirements (if applicable)
4. Reference relevant `crosswalk_lookup()` results

### Deploy Healthcare AI
1. `risk_assessment()` → Likely "High" risk
2. `sector_compliance(sector="healthcare")` → See FDA/HIPAA requirements
3. `casa_assessment()` → Get Tier 2-3 path
4. Check `crosswalk_lookup("CW-19")` (Risk Management)

### Launch LLM Application
1. `risk_assessment()` → Assess scope of impact
2. Review `crosswalk_lookup("CW-25")` (OWASP LLM Top 10)
3. Review `crosswalk_lookup("CW-22")` (OWASP MCP Top 10)
4. `casa_assessment()` → Plan certification

### Handle AI Incident
1. `incident_response()` → Get immediate actions
2. Follow recommended notification steps
3. Implement remediation measures
4. `casa_assessment()` → Re-evaluate system afterward

## All 25 Frameworks

| ID | Framework | Jurisdiction |
|---|---|---|
| CW-01 | EU AI Act | European Union |
| CW-02 | ISO/IEC 42001 | International |
| CW-03 | NIST AI RMF | United States |
| CW-04 | OECD AI Principles | OECD Member States |
| CW-05 | UNESCO AI Ethics | UNESCO Members |
| CW-06 | IEEE 7000 Series | International |
| CW-07 | Canadian AIDA | Canada |
| CW-08 | Singapore Model AI | Singapore |
| CW-09 | Japan AI Principles | Japan |
| CW-10 | China AI Governance | China |
| CW-11 | African Union AI | African Union |
| CW-12 | GPAI Code of Conduct | Global Partnership |
| CW-13 | WEF AI Governance | World Economic Forum |
| CW-14 | Council of Europe Convention | Council of Europe |
| CW-15 | ASEAN AI Ethics | ASEAN |
| CW-16 | Saudi Arabia AI Ethics | Saudi Arabia |
| CW-17 | Brazil AI Framework | Brazil |
| CW-18 | Australia AI Ethics | Australia |
| CW-19 | ISO/IEC 23894 Risk Mgmt | International |
| CW-20 | AI Agent Release Standards | International |
| CW-21 | NIST AI 600-1 GenAI | United States |
| CW-22 | OWASP MCP Top 10 | International |
| CW-23 | OWASP Agentic AI Top 10 | International |
| CW-24 | Defence/NDAA/CBRN AI | US/International |
| CW-25 | OWASP LLM Top 10 | International |

## All 52 Charter Principles

The Charter covers 52 articles in these categories:

- **Articles 1-7:** Governance & Accountability
- **Articles 8-12:** Data & Algorithmic Integrity
- **Articles 13-18:** Stakeholder & Community
- **Articles 19-25:** Risk & Security
- **Articles 26-40:** Operational Excellence
- **Articles 41-52:** Advanced Practices

Use `charter_lookup(article_number=N)` for any article.

## Sector Coverage

The server covers compliance for:

1. **Healthcare** - HIPAA, FDA, clinical validation
2. **Financial** - Fair lending, capital requirements, AML
3. **Military** - National security, CBRN, dual-use controls
4. **Education** - Student data, FERPA, equitable access
5. **Employment** - Fair hiring, adverse impact, discrimination
6. **Criminal Justice** - Due process, racial bias, appeals
7. **Transportation** - Vehicle safety, cybersecurity, occupant protection
8. **Social Media** - Content moderation, child safety, misinformation

## Risk Categories

AI systems are classified as:

- **Unacceptable** → Prohibited in most jurisdictions, do not deploy
- **High** → Strict compliance required, third-party audit needed
- **Limited** → Transparency requirements, basic safeguards
- **Minimal** → Standard data protection applies

## CASA Tiers

Certification pathway has 4 levels:

1. **Tier 1:** Self-assessment by organization
2. **Tier 2:** Third-party independent audit
3. **Tier 3:** Continuous automated monitoring
4. **Tier 4:** Byzantine Council expert review

## Troubleshooting

### Server won't start
```bash
npm run build
npm start
```

### Tool not found
Make sure server is running and connection is active.

### Assessment seems generic
Provide more detailed system description and deployment context.

## Need Help?

- Read the full README.md for detailed documentation
- Visit https://csoai.org for more information
- Check specific framework documents
- Review incident response protocols

## Next Steps

1. Try a quick assessment on your current AI system
2. Review the results and compliance gaps
3. Plan remediation using the recommended actions
4. Set up monitoring using CASA tier guidance
5. Schedule regular reassessment as system evolves

---

You're ready to use the CSOAI AI Governance MCP Server! 🚀
