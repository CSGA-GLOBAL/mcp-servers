# @csoai/healthcare-ai — Healthcare AI Governance MCP Server

Part of the CSOAI MCP Ecosystem — AI Economy Infrastructure.

## Tools

- `hipaa_ai_assessment` — HIPAA compliance assessment for AI systems processing PHI (Protected Health Information)
- `fda_ai_assessment` — FDA regulatory pathway determination for AI/ML-based Software as a Medical Device (SaMD)
- `clinical_ai_safety` — Clinical AI safety assessment covering bias, validation, human oversight, and EU AI Act obligations
- `eu_mdr_compliance` — EU Medical Device Regulation (MDR 2017/745) compliance assessment for AI medical devices

## Resources

- `healthcare://regulations/index` — Complete regulatory landscape (HIPAA, FDA, EU MDR, EU AI Act, international standards)
- `healthcare://tools/guide` — Comprehensive guide to all tools and usage workflows

## Quick Start

### Installation

```bash
npm install @csoai/healthcare-ai-mcp
```

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

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

### Usage Example

Run a complete healthcare AI governance assessment:

1. **HIPAA Assessment** — Understand PHI protection requirements
   ```
   hipaa_ai_assessment(
     system_name: "Diagnostic AI System",
     system_description: "ML model for cancer diagnosis using medical imaging",
     phi_data_types: "diagnostic images, patient demographics, treatment history",
     deployment_environment: "cloud"
   )
   ```

2. **FDA Assessment** — Determine regulatory pathway
   ```
   fda_ai_assessment(
     system_name: "Cancer Detection SaMD",
     intended_use: "assist radiologists in detecting lung cancer from CT scans",
     clinical_context: "diagnosis and treatment decision support",
     ai_model_type: "deep learning convolutional neural network"
   )
   ```

3. **Clinical Safety Assessment** — Evaluate safety and bias risks
   ```
   clinical_ai_safety(
     system_name: "Cancer Detection AI",
     clinical_domain: "radiology and oncology",
     patient_population: "adult patients with suspected lung cancer",
     decision_autonomy: "decision support - clinician makes final determination"
   )
   ```

4. **EU MDR Compliance** — EU market access requirements
   ```
   eu_mdr_compliance(
     system_name: "Cancer Detection Device",
     device_description: "AI software analyzing CT images using deep learning",
     intended_purpose: "diagnosis of lung cancer",
     risk_class: "Class IIb"
   )
   ```

## Regulatory Frameworks Covered

- **HIPAA** — 45 CFR Parts 160 and 164 (Privacy, Security, Breach Notification)
- **FDA AI/ML** — Software as a Medical Device (SaMD) classification and regulatory pathways
- **EU MDR** — Medical Device Regulation 2017/745 (CE marking, conformity assessment)
- **EU AI Act** — High-risk AI system requirements for healthcare
- **International Standards** — ISO 14971, IEC 62304, ISO 13485

## About CSOAI

The Council for the Safety of Artificial Intelligence (CSOAI) develops governance infrastructure for the AI economy, including Model Context Protocol (MCP) servers for regulatory compliance across healthcare, finance, autonomous systems, and general AI governance.

## License

CC0-1.0 — Public Domain

## Feedback and Contributions

Questions? Found an issue? Open an issue at https://github.com/csoai/healthcare-ai-mcp

---

**Version:** 1.0.0  
**Homepage:** https://csoai.org  
**Last Updated:** 2025
