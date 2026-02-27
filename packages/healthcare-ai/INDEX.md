# Healthcare AI Governance MCP Server - Complete Index

**Location:** `/sessions/brave-adoring-cerf/mcp-servers/healthcare-ai/`  
**Version:** 1.0.0  
**License:** CC0-1.0 (Public Domain)

---

## Files Overview

| File | Type | Purpose | Lines |
|------|------|---------|-------|
| `src/index.ts` | TypeScript | Main MCP server entry point | 192 |
| `src/tools/hipaa-assessment.ts` | TypeScript | HIPAA compliance assessment tool | 101 |
| `src/tools/fda-ai-assessment.ts` | TypeScript | FDA AI/ML SaMD regulatory pathway tool | 99 |
| `src/tools/clinical-ai-safety.ts` | TypeScript | Clinical safety and bias assessment tool | 125 |
| `src/tools/eu-mdr-compliance.ts` | TypeScript | EU MDR compliance assessment tool | 115 |
| `package.json` | Config | NPM package configuration | 32 |
| `tsconfig.json` | Config | TypeScript compiler configuration | 15 |
| `.gitignore` | Config | Git ignore patterns | 4 |
| `README.md` | Docs | Main user documentation and quick start | 120+ |
| `QUICK_START.md` | Docs | Detailed quick start guide with examples | 250+ |
| `STRUCTURE.md` | Docs | Architecture and directory structure guide | 180+ |
| `BUILD_SUMMARY.txt` | Docs | Comprehensive build summary | 400+ |

**Total: 12 files, ~1,600+ lines of code and documentation**

---

## Server Tools

### 1. HIPAA AI Assessment
**File:** `src/tools/hipaa-assessment.ts`  
**Function:** `handleHipaaAssessment()`

Assesses HIPAA Privacy & Security Rule compliance for AI systems processing Protected Health Information (PHI).

**Inputs:**
- `system_name` - Name of the healthcare AI system
- `system_description` - Description of the AI system and its role
- `phi_data_types` - Types of PHI processed (diagnostic, genomic, etc.)
- `deployment_environment` - Where deployed (cloud, on-premise, hybrid)

**Outputs:**
- `hipaa_category` - Covered Entity or Business Associate classification
- `phi_risk_level` - minimal | moderate | high | critical
- `applicable_rules` - List of applicable CFR sections and regulations
- `safeguards_required` - Administrative, physical, and technical safeguards
- `gap_analysis` - Identified compliance gaps
- `remediation_steps` - Steps to achieve compliance
- `estimated_compliance_timeline` - 3-18 months depending on risk level

**Key Regulations:**
- 45 CFR Parts 160, 164 (HIPAA Privacy & Security Rules)
- 42 CFR Part 2 (Substance Abuse Confidentiality)
- FDA AI/ML-Based SaMD Action Plan
- EU AI Act Article 6 (High-Risk Healthcare)

---

### 2. FDA AI Assessment
**File:** `src/tools/fda-ai-assessment.ts`  
**Function:** `handleFdaAiAssessment()`

Determines FDA regulatory pathway for AI/ML-based Software as a Medical Device (SaMD).

**Inputs:**
- `system_name` - Name of the AI medical device
- `intended_use` - Intended use statement
- `clinical_context` - diagnosis, treatment, screening, monitoring
- `ai_model_type` - static, adaptive, continuous learning, reinforcement

**Outputs:**
- `device_classification` - Class I, II, or III medical device
- `regulatory_pathway` - 510(k), De Novo, PMA, or Exempt
- `samd_category` - IMDRF Category I, II, III, or IV
- `predetermined_change_control` - Whether PCCP is required
- `requirements` - FDA compliance requirements
- `quality_system_requirements` - 21 CFR 820 requirements
- `post_market_obligations` - Adverse event reporting, surveillance
- `timeline_estimate` - 3-36 months depending on pathway

**Key Regulations:**
- FDA AI/ML-Based SaMD Action Plan (2021)
- 21 CFR Part 820 (Quality System Regulation)
- FDA Good Machine Learning Practice (GMLP)
- IMDRF SaMD Framework Documents (N41, N42, N43)

---

### 3. Clinical AI Safety
**File:** `src/tools/clinical-ai-safety.ts`  
**Function:** `handleClinicalAiSafety()`

Comprehensive clinical safety assessment covering bias, validation, human oversight, and EU AI Act obligations.

**Inputs:**
- `system_name` - Name of the clinical AI system
- `clinical_domain` - radiology, pathology, cardiology, oncology, pharmacy
- `patient_population` - adult, pediatric, geriatric, specific demographics
- `decision_autonomy` - advisory, decision support, autonomous, triage

**Outputs:**
- `risk_classification` - Per EU AI Act (High Risk, Limited Risk, Unacceptable)
- `safety_concerns` - List of identified safety issues
- `bias_assessment` - Demographic risks, mitigation strategies, monitoring
- `clinical_validation_requirements` - Prospective studies, multi-site validation
- `human_oversight_model` - HITL, HOTL, or HoTL recommendation
- `eu_ai_act_obligations` - Articles 9-72 requirements
- `casa_tier_recommendation` - Tier 2-4 with cost estimates

**Key Regulations:**
- EU AI Act (Articles 6-72)
- FDA Clinical Decision Support Software Guidance
- IMDRF Clinical Validation Documents
- WHO AI Ethics Guidance

---

### 4. EU MDR Compliance
**File:** `src/tools/eu-mdr-compliance.ts`  
**Function:** `handleEuMdrCompliance()`

EU Medical Device Regulation (MDR 2017/745) compliance assessment for CE marking.

**Inputs:**
- `system_name` - Name of the AI medical device
- `device_description` - Device description including AI/ML components
- `intended_purpose` - Per MDR Article 2(12)
- `risk_class` - Class I, IIa, IIb, III, or "unknown"

**Outputs:**
- `mdr_classification` - Class I, IIa, IIb, or III device
- `conformity_assessment_route` - Annex II/IX/X pathway
- `notified_body_required` - Boolean
- `essential_requirements` - GSPR, software lifecycle, risk mgmt
- `technical_documentation` - Documentation checklist
- `post_market_surveillance` - PMS Plan, vigilance, FSCA
- `mdcg_guidance_applicable` - MDCG 2019-11, 2020-1, 2021-24, etc.
- `timeline_estimate` - 6-36 months depending on class

**Key Regulations:**
- MDR 2017/745 (Medical Device Regulation)
- IEC 62304 (Software Lifecycle)
- ISO 14971 (Risk Management)
- MDCG Guidance Documents (2019-2021)

---

## Server Resources

### Resource 1: Regulatory Landscape Index
**URI:** `healthcare://regulations/index`  
**MIME Type:** `text/plain`

Complete reference index of all applicable healthcare AI regulatory frameworks:
- US: HIPAA, FDA, 21st Century Cures Act, HHS AI Strategy
- EU: MDR, IVDR, AI Act, GDPR, EHDS
- International: ISO 14971, IEC 62304, IMDRF, WHO Guidance
- Emerging: UK MHRA, Health Canada, Japan PMDA, Australia TGA, Singapore HSA

---

### Resource 2: Tools Guide
**URI:** `healthcare://tools/guide`  
**MIME Type:** `text/plain`

Comprehensive guide to all healthcare AI MCP server tools:
- Tool descriptions and inputs/outputs
- Typical assessment workflows
- Example use cases
- Best practices

---

## Documentation Files

### 1. README.md
**Purpose:** Main user documentation  
**Contents:**
- Overview of all tools and resources
- Installation and setup instructions
- Usage examples with code snippets
- Regulatory framework summary
- Claude Desktop configuration
- CSOAI organization information

**Read this for:** Initial understanding and quick setup

---

### 2. QUICK_START.md
**Purpose:** Detailed implementation guide  
**Contents:**
- Step-by-step installation
- Tool-by-tool reference with examples
- Typical workflow (4-step assessment)
- Regulatory framework comparison table
- Common scenarios with expected outputs
- Claude Desktop integration instructions

**Read this for:** Implementing assessments and understanding workflows

---

### 3. STRUCTURE.md
**Purpose:** Architecture and structure guide  
**Contents:**
- Complete directory structure visualization
- File descriptions and purposes
- Build and run instructions
- Integration points
- Regulatory coverage matrix
- Key features overview
- Version and license information

**Read this for:** Understanding the project architecture

---

### 4. BUILD_SUMMARY.txt
**Purpose:** Comprehensive build summary  
**Contents:**
- Complete file structure with descriptions
- Core components overview
- Regulatory frameworks covered
- Key features list
- Technology stack details
- Build and deployment instructions
- Usage examples for each tool
- Integration with CSOAI ecosystem
- Support and feedback information

**Read this for:** Complete project understanding and deployment

---

## Configuration Files

### package.json
**Purpose:** NPM package configuration  
**Key Content:**
- Package name: `csoai-healthcare-ai-mcp`
- Version: `1.0.0`
- Main entry: `dist/index.js`
- Scripts: build, start, dev, watch
- Dependencies: @modelcontextprotocol/sdk, zod
- Dev Dependencies: @types/node, typescript
- Node.js requirement: >=18.0.0

---

### tsconfig.json
**Purpose:** TypeScript compiler configuration  
**Key Settings:**
- Target: ES2020
- Module: ES2020
- Output: `./dist`
- Source: `./src`
- Strict mode enabled
- ESM module resolution

---

### .gitignore
**Purpose:** Git ignore patterns  
**Patterns:**
- `node_modules/`
- `dist/`
- `*.log`
- `.DS_Store`

---

## Workflow Examples

### Complete Healthcare AI Assessment
1. **HIPAA Assessment**
   - Tool: `hipaa_ai_assessment`
   - Focus: Understand PHI protection requirements
   - Output: Data classification, safeguards, gaps

2. **FDA Assessment**
   - Tool: `fda_ai_assessment`
   - Focus: Determine regulatory pathway
   - Output: Device class, pathway, QMS requirements

3. **Clinical Safety Assessment**
   - Tool: `clinical_ai_safety`
   - Focus: Evaluate safety and bias risks
   - Output: Validation plan, oversight model, CASA tier

4. **EU Market Assessment**
   - Tool: `eu_mdr_compliance`
   - Focus: EU regulatory requirements
   - Output: MDR class, CE marking pathway, timeline

---

## Key Regulatory Topics Covered

### Data Protection
- HIPAA PHI safeguards (administrative, physical, technical)
- GDPR health data processing
- De-identification methods
- Breach notification requirements

### Device Regulation
- FDA SaMD classification (Categories I-IV)
- EU MDR classification (Classes I-III)
- Conformity assessment pathways
- Notified body requirements

### Clinical Safety
- Clinical validation requirements
- Bias assessment and mitigation
- Human oversight models (HITL/HOTL/HoTL)
- Post-market surveillance

### Algorithmic Governance
- EU AI Act high-risk assessment
- Transparency and explainability
- Model performance monitoring
- Predetermined change control plans (PCCP)

---

## Integration Points

### Claude Desktop
Add to `claude_desktop_config.json`:
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

### Other CSOAI MCP Servers
- `governance-ai` — CASA certification, AI governance boards
- `financial-ai` — Financial services AI regulations
- `autonomy-ai` — Autonomous systems governance

---

## Getting Started Checklist

- [ ] Review README.md for overview
- [ ] Review QUICK_START.md for implementation
- [ ] Review STRUCTURE.md for architecture
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Run `npm start` to test
- [ ] Configure in Claude Desktop
- [ ] Run first assessment using all 4 tools
- [ ] Review output structure and customize as needed

---

## Support and Contribution

**Website:** https://csoai.org  
**GitHub:** https://github.com/CSGA_Global/healthcare-ai-mcp  
**Issues:** https://github.com/CSGA_Global/healthcare-ai-mcp/issues

---

## Version Information

- **Version:** 1.0.0
- **Release Date:** 2025
- **License:** CC0-1.0 (Public Domain)
- **Status:** Production Ready

---

## Quick Reference

**Total Files:** 12  
**TypeScript Files:** 5  
**Configuration Files:** 2  
**Documentation Files:** 4  
**Support Files:** 1  

**Tools:** 4 assessment tools  
**Resources:** 2 reference resources  

**Regulatory Frameworks:** 30+  
**Countries/Regions:** 8+  

**Timeline Range:** 3-36 months  
**Risk Levels:** 4 (minimal to critical)  
**CASA Tiers:** 2-4  

---

## Last Updated

February 2025

For the most current version and updates, visit https://csoai.org
