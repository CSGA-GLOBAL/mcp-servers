# Healthcare AI MCP Server - Quick Start Guide

## Installation & Setup

```bash
cd /sessions/brave-adoring-cerf/mcp-servers/healthcare-ai

# Install dependencies
npm install

# Build the server
npm run build

# Start the server
npm start
```

## Tool Reference

### 1. HIPAA AI Assessment
**Purpose:** Assess HIPAA compliance for AI systems processing PHI

```typescript
hipaa_ai_assessment({
  system_name: "Diagnostic AI",
  system_description: "ML model analyzing patient medical records",
  phi_data_types: "diagnostic data, medication records, patient demographics",
  deployment_environment: "cloud"
})
```

**Returns:**
- HIPAA compliance category (Covered Entity / Business Associate)
- PHI risk level (minimal, moderate, high, critical)
- Applicable regulatory rules
- Required administrative/physical/technical safeguards
- Gap analysis
- Remediation steps with timeline

---

### 2. FDA AI Assessment
**Purpose:** Determine FDA regulatory pathway for AI medical devices (SaMD)

```typescript
fda_ai_assessment({
  system_name: "Cancer Detection SaMD",
  intended_use: "assist radiologists in detecting lung cancer from CT scans",
  clinical_context: "diagnosis and treatment decision support",
  ai_model_type: "deep learning convolutional neural network"
})
```

**Returns:**
- Device classification (Class I-III)
- Regulatory pathway (510(k), De Novo, PMA, or Exempt)
- SaMD category (I-IV)
- Whether Predetermined Change Control Plan (PCCP) required
- Quality system requirements per 21 CFR 820
- Post-market surveillance obligations
- Timeline estimate (3-36 months)

---

### 3. Clinical AI Safety
**Purpose:** Comprehensive clinical safety assessment with bias analysis

```typescript
clinical_ai_safety({
  system_name: "Cancer Detection AI",
  clinical_domain: "radiology and oncology",
  patient_population: "adult patients with suspected lung cancer",
  decision_autonomy: "decision support - clinician makes final determination"
})
```

**Returns:**
- Risk classification per EU AI Act
- Safety concerns (automation bias, model drift, adversarial robustness)
- Bias assessment (demographic risks + mitigation strategies)
- Clinical validation requirements
- Human oversight model (HITL/HOTL/HoTL)
- EU AI Act Article obligations
- CASA tier recommendation ($25K-$500K+)

---

### 4. EU MDR Compliance
**Purpose:** EU Medical Device Regulation assessment for CE marking

```typescript
eu_mdr_compliance({
  system_name: "Cancer Detection Device",
  device_description: "AI software analyzing CT images using deep learning",
  intended_purpose: "diagnosis of lung cancer",
  risk_class: "Class IIb"
})
```

**Returns:**
- MDR classification (Class I-III)
- Conformity assessment route
- Whether notified body required
- Essential requirements (GSPR, software lifecycle)
- Technical documentation checklist
- Post-market surveillance plan
- MDCG guidance documents
- Timeline estimate (6-36 months)

---

## Typical Healthcare AI Assessment Workflow

### Step 1: Understand PHI Requirements
```
Run: hipaa_ai_assessment
Focus: Data protection, safeguards, breach notification rules
```

### Step 2: Determine Regulatory Pathway
```
Run: fda_ai_assessment
Focus: Device classification, clinical validation, QMS requirements
```

### Step 3: Assess Clinical Safety
```
Run: clinical_ai_safety
Focus: Bias, safety concerns, human oversight, validation plan
```

### Step 4: EU Market Considerations
```
Run: eu_mdr_compliance
Focus: MDR classification, CE marking, notified body requirements
```

---

## Key Regulatory Frameworks

| Framework | Focus | Key Concern |
|-----------|-------|-------------|
| **HIPAA** | Data Privacy & Security | Protecting patient health information |
| **FDA AI/ML** | Medical Device Safety | Clinical validation & algorithm transparency |
| **EU MDR** | Device Compliance | CE marking & post-market surveillance |
| **EU AI Act** | Algorithmic Fairness | High-risk AI safety & human oversight |
| **ISO 14971** | Risk Management | Medical device hazard analysis |
| **IEC 62304** | Software Lifecycle | Software as medical device development |

---

## Common Scenarios

### Diagnostic AI Tool
```
- HIPAA: HIGH (diagnostic data = sensitive PHI)
- FDA: Class II-III (diagnostic impact)
- Safety: High Risk (decision support)
- EU MDR: Class IIb (diagnosis-influencing)
- Timeline: 12-24 months total
```

### Clinical Decision Support
```
- HIPAA: HIGH (treatment-influencing)
- FDA: Class II (impacts clinical management)
- Safety: High Risk (AI in care pathway)
- EU MDR: Class IIa-IIb
- Timeline: 12-18 months total
```

### Administrative Workflow AI
```
- HIPAA: LOW-MODERATE (non-clinical PHI)
- FDA: Class I or Exempt (informational only)
- Safety: Limited Risk (no clinical decision impact)
- EU MDR: Class I
- Timeline: 3-6 months total
```

---

## Output Format

All tools return structured JSON with:
- System identification
- Classification/risk level
- Applicable regulations
- Required safeguards/requirements
- Gap analysis
- Remediation steps
- Timeline estimates

---

## Integration with Claude Desktop

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

---

## Resources

Two built-in resources provide reference material:

1. **healthcare://regulations/index**
   - Complete list of all applicable regulations
   - Links to regulatory frameworks

2. **healthcare://tools/guide**
   - Detailed tool documentation
   - Example workflows
   - Use case guidance

---

## Support

For issues or questions:
- GitHub: https://github.com/CSGA_Global/healthcare-ai-mcp
- Website: https://csoai.org

---

**Version:** 1.0.0 | **License:** CC0-1.0 (Public Domain)
