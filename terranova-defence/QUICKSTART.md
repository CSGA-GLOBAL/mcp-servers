# Terranova Defence MCP - Quick Start Guide

## Installation & Setup (5 minutes)

```bash
# 1. Navigate to project directory
cd /sessions/brave-adoring-cerf/mcp-servers/terranova-defence

# 2. Install dependencies
npm install

# 3. Build TypeScript
npm run build

# 4. Start MCP server
npm start
```

The server will be ready to accept MCP requests via stdio transport.

## Tool Quick Reference

### 1. PQC Encryption Recommendations
**When to use:** Evaluating cryptography strategy, planning CNSA 2.0 transition

```json
{
  "tool": "terranova_pqc_encrypt",
  "arguments": {
    "data_classification": "TOP_SECRET",
    "use_case": "key exchange for military communications",
    "current_algorithms": "RSA-2048, ECDSA, SHA-256",
    "platform": "on-premises classified network"
  }
}
```

**Expected output:** ML-KEM/ML-DSA recommendations, hybrid approach, CNSA 2.0 compliance status, implementation roadmap

---

### 2. NDAA Section 889 Compliance
**When to use:** Verifying defence contract compliance, auditing supply chain

```json
{
  "tool": "terranova_ndaa_compliance",
  "arguments": {
    "organization_type": "contractor",
    "supply_chain_components": [
      "Telecom infrastructure: Nokia",
      "Network security: Palo Alto Networks",
      "Cloud services: AWS"
    ],
    "country_of_origin_list": [
      "United States",
      "Finland",
      "United States"
    ],
    "contract_type": "DoD_contract"
  }
}
```

**Expected output:** Compliance status, prohibited components (if any), CMMC level assessment, remediation plan, legal exposure

---

### 3. CBRN AI Governance Assessment
**When to use:** Evaluating AI systems for dual-use risks, planning export control compliance

```json
{
  "tool": "terranova_cbrn_ai_assess",
  "arguments": {
    "ai_system_description": "Machine learning model for protein structure prediction using deep neural networks, trained on public datasets",
    "cbrn_domain": "biological",
    "deployment_context": "research institution, potential international collaboration"
  }
}
```

**Expected output:** Dual-use risk classification, export control status (ITAR/EAR), restricted jurisdictions, required safeguards

---

### 4. Defence Cyber Threat Assessment
**When to use:** Identifying relevant threats, planning defensive priorities

```json
{
  "tool": "terranova_threat_assess",
  "arguments": {
    "organization_type": "contractor",
    "assets": [
      "weapons system design documents",
      "personnel security clearance records",
      "supply chain vendor network"
    ],
    "adversary_profile": "Chinese state-sponsored APT group",
    "sector": "aerospace and defence"
  }
}
```

**Expected output:** APT groups (APT41/Winnti), attack vectors (spear-phishing, supply chain attacks), asset risk ranking, defensive recommendations, detection strategies

---

### 5. Supply Chain Security Audit
**When to use:** Evaluating vendor security, ensuring Five Eyes compliance

```json
{
  "tool": "terranova_supply_chain_audit",
  "arguments": {
    "vendor_list": [
      "Intel",
      "Microsoft",
      "Cisco",
      "Fortanix"
    ],
    "component_types": [
      "semiconductors",
      "software platforms",
      "networking equipment",
      "cryptography services"
    ],
    "jurisdictions": [
      "United States",
      "United States",
      "United States",
      "United States"
    ]
  }
}
```

**Expected output:** Overall risk score, vendor assessments, Five Eyes compliance, ITAR/EAR flags, trusted alternatives, diversification score

---

### 6. Zero Trust Architecture Assessment
**When to use:** Measuring Zero Trust maturity, planning transformation roadmap

```json
{
  "tool": "terranova_zero_trust_assess",
  "arguments": {
    "current_architecture": "Traditional perimeter security with Active Directory, segmented DMZ and internal networks, some cloud workloads in Azure, EDR on endpoints",
    "network_segments": [
      "Internet",
      "DMZ",
      "Internal Network",
      "Data Center",
      "Cloud (Azure)"
    ],
    "identity_management": "Active Directory with MFA for some users, some legacy systems with basic auth",
    "data_flows": "Some encryption in transit with TLS 1.2, at-rest encryption for databases, no DLP system"
  }
}
```

**Expected output:** Maturity score (0-100), NIST 800-207 compliance %, compliance gaps, 5-phase migration roadmap, quick wins, success metrics

---

## Common Workflows

### Scenario 1: Preparing for CMMC 2.0 Compliance Audit
```
1. Run terranova_ndaa_compliance → Identify prohibited components
2. Run terranova_supply_chain_audit → Assess vendor security
3. Run terranova_zero_trust_assess → Measure IAM/network maturity
4. Compile findings → Develop remediation roadmap
```

### Scenario 2: Planning Post-Quantum Cryptography Transition
```
1. Run terranova_pqc_encrypt (UNCLASSIFIED) → Get PQC recommendations
2. Run terranova_pqc_encrypt (SECRET) → Get classified system strategy
3. Run terranova_pqc_encrypt (TOP_SECRET) → Get NSA-aligned approach
4. Cross-reference with current supply chain capabilities
5. Plan hybrid deployment across classification levels
```

### Scenario 3: Threat Landscape Assessment for New Contract
```
1. Run terranova_threat_assess → Identify relevant APT groups
2. Run terranova_supply_chain_audit → Assess vendor risk
3. Run terranova_ndaa_compliance → Verify regulatory compliance
4. Run terranova_zero_trust_assess → Baseline security posture
5. Integrate findings into contract security requirements
```

### Scenario 4: CBRN AI System Approval
```
1. Run terranova_cbrn_ai_assess → Evaluate dual-use risk
2. Identify export control requirements
3. Plan interagency review board engagement
4. Develop safeguards and governance framework
5. Prepare regulatory submission materials
```

---

## Input Guidelines

### Classification Levels
- **UNCLASSIFIED**: General, no classification restrictions
- **CUI**: Controlled Unclassified Information (controlled but not classified)
- **SECRET**: Classified - limited distribution, need-to-know
- **TOP_SECRET**: Classified - highest sensitivity, access strictly limited

### Organization Types
- **Military**: Department of Defense, military services
- **Intelligence**: CIA, DIA, NSA, and related agencies
- **Contractor**: Defence prime contractors and subcontractors
- **Government Agency**: Civilian government with defence connections
- **Critical Infrastructure**: Energy, communications, transport sectors

### Platforms
- **Cloud**: AWS, Azure, GCP deployments
- **On-premises**: Data center, classified facilities
- **Edge**: IoT, remote sensors, edge computing
- **IoT**: Internet of Things, constrained devices
- **Blockchain**: Distributed ledger systems

---

## Typical Output Sections

All tools return JSON-formatted assessments with:
1. **Executive Summary** - Risk level, compliance status, key findings
2. **Detailed Analysis** - Specific assessments and risk factors
3. **Recommendations** - Prioritized action items
4. **Timelines** - Implementation schedules
5. **Resource Requirements** - Budget and personnel needs
6. **Compliance Mappings** - Standards alignment (NIST, NSA, DoD)
7. **Success Metrics** - KPIs and measurement criteria

---

## Performance Tips

- **Large supply chains (1000+ vendors):** Expect 1-2s response time
- **Complex architectures (10+ segments):** Expect 500ms-1s response time
- **High-classification assessments:** May include additional analysis (adds <1s)

---

## Regulatory Reference Quick Links

- **NIST PQC Standards**: FIPS 203, 204, 205 (2024 releases)
- **CNSA 2.0**: NSA Commercial National Security Algorithm Suite
- **CMMC 2.0**: Cybersecurity Maturity Model Certification
- **NDAA Section 889**: Prohibition on certain Chinese technology
- **NIST 800-207**: Zero Trust Architecture
- **NIST 800-161**: Supply Chain Risk Management
- **EAR/ITAR**: Export control regulations
- **Five Eyes**: USA, UK, Canada, Australia, New Zealand

---

## Troubleshooting

### Server won't start
```bash
# Check Node.js version (need 18+)
node --version

# Clean rebuild
rm -rf build node_modules
npm install
npm run build
npm start
```

### Tool errors
- Verify all required input parameters are provided
- Check parameter types match schema (strings, arrays, enums)
- Review error message for schema validation details

### Slow responses
- Large input arrays may take longer to process
- Complex architectures require more analysis
- This is normal; responses still complete within 5 seconds

---

## Next Steps

1. **Integrate with your systems**: Use MCP client libraries to integrate
2. **Develop custom workflows**: Combine tools for comprehensive assessments
3. **Automate compliance monitoring**: Schedule regular assessments
4. **Build assessment pipeline**: Chain tools for end-to-end analysis
5. **Integrate threat intelligence**: Enhance APT assessments with live feeds

---

For detailed documentation, see **README.md**
For architecture details, see **package.json** and **tsconfig.json**
