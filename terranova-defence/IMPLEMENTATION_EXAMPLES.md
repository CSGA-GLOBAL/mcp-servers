# Terranova Defence MCP - Implementation Examples

Real-world examples and use cases for each tool.

## Example 1: Defence Contractor PQC Migration Assessment

**Scenario**: Fortune 500 defence contractor evaluating post-quantum cryptography adoption for SECRET-level communications infrastructure.

### Input Request
```json
{
  "tool": "terranova_pqc_encrypt",
  "arguments": {
    "data_classification": "SECRET",
    "use_case": "secure communications between distributed manufacturing facilities and command center",
    "current_algorithms": "RSA-2048, ECDSA with SHA-256, TLS 1.2",
    "platform": "on-premises with some hybrid cloud for non-sensitive workloads"
  }
}
```

### Key Findings from Response
- **Recommended Primary:** ML-KEM (CRYSTALS-Kyber) for key exchange + ML-DSA (CRYSTALS-Dilithium) for signatures
- **Key Sizes:** 1024-byte Kyber (NIST Level 3), 2420-byte Dilithium
- **Hybrid Approach:** Recommended - combine ECC (P-256) with Kyber for transition period
- **CNSA 2.0 Compliance:** YES - algorithms approved for SECRET-level systems
- **Timeline:** 2025-Q3 prototype, 2026-Q2 full deployment
- **Budget:** $500K-$1M including testing, deployment, training
- **Critical Path:**
  1. Procure FIPS 203-compliant crypto libraries (Q1 2025)
  2. Test in sandbox environment (Q2 2025)
  3. Deploy hybrid mode in non-critical systems (Q3 2025)
  4. Deploy in operational systems (Q4 2025)

### Implementation Strategy
- Phase 1: Hybrid deployment (ECC + Kyber) for key exchange
- Phase 2: Gradual replacement of RSA with Kyber
- Phase 3: Transition to ML-DSA for all digital signatures
- Phase 4: Monitor for algorithm updates and security research

---

## Example 2: NDAA Section 889 Supply Chain Compliance Check

**Scenario**: Government contractor with global supply chain needs to verify NDAA Section 889 compliance before submitting $50M DoD contract bid.

### Input Request
```json
{
  "tool": "terranova_ndaa_compliance",
  "arguments": {
    "organization_type": "contractor",
    "supply_chain_components": [
      "Semiconductor production: Intel, Samsung",
      "Network infrastructure: Cisco, Huawei 5G",
      "Cloud services: AWS, Alibaba Cloud",
      "Cybersecurity: Kaspersky, Fortinet",
      "Telecommunications: Nokia, ZTE"
    ],
    "country_of_origin_list": [
      "United States",
      "South Korea",
      "United States",
      "China",
      "United States",
      "Russia",
      "United States",
      "Finland",
      "China"
    ],
    "contract_type": "DoD_contract"
  }
}
```

### Critical Findings
- **Compliance Status:** NON-COMPLIANT
- **Violations Identified:**
  - Huawei 5G infrastructure: CRITICAL - NDAA Section 889(a)(1) prohibited
  - Kaspersky cybersecurity software: CRITICAL - Prohibited Russian vendor
  - Alibaba Cloud services: CRITICAL - Prohibited Chinese vendor (where applicable)
  - ZTE telecommunications: CRITICAL - Prohibited vendor

- **Legal Exposure:**
  - Federal contract termination possible
  - Debarment from DoD procurement (3-year suspension)
  - Civil penalties up to $250,000 per violation
  - Criminal penalties for knowing violations

- **CMMC Level Assessment:** Level 2 required for DoD contract (75+ controls)

### Immediate Actions Required
1. **URGENT (30 days):** Remove/replace all prohibited equipment:
   - Replace Huawei 5G with alternative (Nokia, Ericsson)
   - Replace Kaspersky with compliant solution (Fortinet, Palo Alto Networks)
   - Replace Alibaba Cloud functions with AWS
   - Replace ZTE equipment with compliant alternative

2. **HIGH PRIORITY (60 days):**
   - Conduct comprehensive supply chain audit
   - Notify DoD contracting officer of prior non-compliance and remediation plan
   - Implement vendor vetting process per NIST SP 800-161

3. **Ongoing:**
   - Deploy automated SBOM scanning for all software
   - Quarterly vendor compliance audits
   - Personnel training on NDAA requirements

### Estimated Remediation
- **Cost:** ~$3-5M (equipment replacement, alternative systems)
- **Timeline:** 60-90 days for operational remediation, 6 months for full compliance
- **Risk:** Contract award jeopardy if compliance not achieved before submission

---

## Example 3: CBRN AI System Export Control Assessment

**Scenario**: Research institution developing AI system for drug discovery (potential CBRN dual-use) planning international collaboration.

### Input Request
```json
{
  "tool": "terranova_cbrn_ai_assess",
  "arguments": {
    "ai_system_description": "Deep learning model trained on molecular dynamics simulations and protein structure data. Predicts bioactive compounds and drug synthesis pathways. Uses attention mechanisms and transformer architecture. Training data: public protein databases and literature.",
    "cbrn_domain": "biological",
    "deployment_context": "Research collaboration with university partners in UK, Canada, and potentially China. Will be published in academic journals. Some models may be open-sourced."
  }
}
```

### Export Control Determination
- **Dual-Use Risk:** HIGH - Level B
  - System can assist with pathogen design and bioweapon research
  - Molecular prediction capability applicable to dangerous pathogens
  - Synthetic biology applications have obvious CBRN relevance

- **Export Control Status:**
  - Subject to EAR Part 700 (Category 1A002)
  - Collaboration with China requires BIS approval
  - Publication may require pre-publication review

- **Restricted Jurisdictions:**
  - China: Export restricted without license (likely denied)
  - Iran: Complete restriction
  - North Korea: Complete restriction
  - Syria: Complete restriction

- **Safeguards Required:**

  **Technical:**
  - Encrypt model weights and training data
  - Implement input/output filtering for dangerous queries
  - Audit logging of all model access
  - API rate limiting

  **Administrative:**
  - Designate export control compliance officer
  - Require all researchers to complete ITAR/EAR training
  - Export control approval for international collaboration
  - Non-disclosure agreements for all collaborators

  **Monitoring:**
  - Monthly usage pattern analysis
  - Quarterly security assessments
  - Annual vulnerability testing

### Recommended Actions
1. **Immediate:** Submit advisory opinion request to Commerce Dept (BIS)
2. **Before Publication:** Conduct technical review for controlled information
3. **Before Collaboration:** Obtain written approval from compliance officer
4. **Ongoing:** Maintain detailed export control documentation

### Timeline
- Advisory opinion: 30-60 days (may request more info)
- UK/Canada collaboration: Approved with standard restrictions
- China collaboration: Unlikely to receive approval; consider domestic-only partnership

---

## Example 4: APT Threat Assessment for Critical Infrastructure

**Scenario**: Regional power utility evaluating threat landscape before implementing critical infrastructure security upgrade.

### Input Request
```json
{
  "tool": "terranova_threat_assess",
  "arguments": {
    "organization_type": "critical_infrastructure",
    "assets": [
      "power generation control systems (SCADA)",
      "transmission and distribution network monitoring",
      "customer billing and financial systems",
      "operational technology (OT) networks",
      "IT/corporate network"
    ],
    "adversary_profile": "nation-state with interest in power infrastructure disruption",
    "sector": "energy/power utilities"
  }
}
```

### Threat Assessment Results
- **Threat Level:** CRITICAL

- **Relevant APT Groups:**
  1. **Sandworm (Unit 74455)** - Russian GRU
     - **Motivation:** Infrastructure disruption capability demonstration
     - **Capabilities:** Destructive malware (NotPetya, wiper capabilities), ICS/SCADA targeting
     - **Target Match:** CRITICAL - Known to target power grid systems
     - **Attribution Confidence:** HIGH

  2. **APT33 (Elfin)** - Iranian IRGC-affiliated
     - **Motivation:** Infrastructure research and potential disruption
     - **Capabilities:** ICS/SCADA knowledge, wiper malware
     - **Target Match:** HIGH - Iranian interest in US infrastructure

- **Prioritized Attack Vectors:**
  1. **Supply chain compromise** - HIGH likelihood, VERY HIGH impact
     - SCADA vendor compromise (e.g., supply chain attack on OPC software)
     - Grid equipment firmware vulnerabilities
     - Software update mechanisms

  2. **Spear-phishing of OT personnel** - VERY HIGH likelihood, HIGH impact
     - Targeting control system operators
     - Targeting IT/OT bridge personnel

  3. **Zero-day exploits** - MEDIUM likelihood, CRITICAL impact
     - ICS protocol vulnerabilities
     - Legacy system exploits

  4. **Insider threat** - MEDIUM likelihood, CRITICAL impact
     - Disgruntled employees with system access
     - Sabotage capability

- **Asset Risk Ranking:**
  1. Power generation control systems (SCADA): Risk Score 95
  2. Transmission/distribution network: Risk Score 90
  3. OT networks: Risk Score 85
  4. Customer billing/financial: Risk Score 70
  5. IT/corporate network: Risk Score 65

### Immediate Actions (0-3 months)
1. Deploy EDR across all systems (prioritize OT networks)
2. Implement network segmentation (IT/OT separation)
3. Deploy intrusion detection with SCADA-specific rules
4. Establish 24/7 SOC operations
5. Conduct supply chain security assessment of critical vendors

### Defensive Recommendations
1. **Network Architecture:**
   - Air-gap critical SCADA systems from internet
   - Implement demilitarized zone (DMZ) between IT/OT
   - Deploy industrial control system (ICS) firewalls
   - Implement network access control (NAC)

2. **Detection Capability:**
   - SIEM integration with ICS protocol monitoring
   - Behavioral analytics for abnormal grid operations
   - APT-specific detection rules (Sandworm/APT33 IOCs)
   - Real-time threat intelligence integration

3. **Incident Response:**
   - Emergency procedure for system isolation
   - Communication plan for government notification
   - Power grid failover procedures
   - Forensics capability for attribution

### Risk Reduction Strategy
- **Baseline risk:** 75/100 (CRITICAL)
- **12-month plan achieves:** 40/100 (HIGH with robust controls)
- **24-month plan achieves:** 25/100 (MEDIUM with mature program)

---

## Example 5: Supply Chain Security Audit for System Integrator

**Scenario**: Large defence system integrator with 50+ vendors needs comprehensive supply chain risk assessment before CMMC 3.0 audit.

### Input Request
```json
{
  "tool": "terranova_supply_chain_audit",
  "arguments": {
    "vendor_list": [
      "Intel", "Qualcomm", "Broadcom", "Cisco", "Fortinet",
      "Microsoft", "Red Hat", "VMware", "ServiceNow",
      "AWS", "Azure", "Okta", "Splunk", "CrowdStrike",
      "Fortanix", "Thales", "Entrust", "Various open-source"
    ],
    "component_types": [
      "semiconductors", "software platforms", "networking equipment",
      "cybersecurity tools", "cryptography services", "cloud services",
      "identity management", "SIEM platforms", "open-source libraries"
    ],
    "jurisdictions": [
      "USA (x12)", "UK (2)", "France (1)", "Unknown open-source (varies)"
    ]
  }
}
```

### Supply Chain Assessment Results
- **Overall Risk Score:** 35/100 (ACCEPTABLE)
- **Risk Level:** MEDIUM

- **Vendor Assessments:**
  - **Intel (USA):** Risk Score 20 - LOW, established supplier
  - **Cisco (USA):** Risk Score 25 - LOW, Five Eyes compliant
  - **Microsoft (USA):** Risk Score 30 - LOW, cloud provider
  - **AWS (USA):** Risk Score 30 - LOW, federal contractor
  - **Open-source components:** Risk Score 45 - MEDIUM, supply chain visibility challenges

- **Five Eyes Compliance:** PARTIALLY COMPLIANT
  - All major vendors in Five Eyes countries
  - Open-source components create foreign nation exposure
  - Requires enhanced vetting of open-source dependencies

- **ITAR/EAR Flags Identified:**
  - Cryptography services: ITAR controlled (export restrictions)
  - Semiconductors (advanced): EAR controlled (export restrictions)
  - Software platforms: Some components EAR controlled

- **Trusted Supplier Recommendations:**
  - **Semiconductors:** Intel, Qualcomm (USA), ARM (UK) preferred
  - **Cryptography:** Fortanix (USA), Entrust (USA), Thales (France)
  - **Cloud:** AWS (USA), Azure (USA), Oracle Cloud (USA)
  - **Cybersecurity:** Cisco, Fortinet, Palo Alto Networks (all USA)

- **Diversification Assessment:** 68/100
  - 16 primary vendors (good diversification)
  - 3+ alternatives for most components
  - Risk: Open-source library concentration

- **Geographic Risk Assessment:** ACCEPTABLE
  - 75%+ Five Eyes concentration
  - 0% high-risk countries (China, Russia)
  - Recommend: Increase UK/France alternatives

### Remediation Plan
1. **IMMEDIATE (30 days):**
   - Conduct open-source vulnerability scan (OWASP Dependency-Check)
   - Verify all vendors comply with CMMC requirements
   - Request Software Bill of Materials (SBOM) from all vendors

2. **HIGH PRIORITY (60-90 days):**
   - Implement automated SCA (Software Composition Analysis)
   - Establish vendor security assessment program
   - Review open-source dependencies, identify high-risk libraries

3. **ONGOING:**
   - Quarterly vendor security assessments
   - Monthly SBOM updates
   - Real-time vulnerability monitoring
   - Incident notification procedures

### CMMC 3.0 Certification Path
- **Current Status:** Most vendors CMMC-compliant
- **Recommended Level:** Level 3 (System-wide security discipline)
- **Timeline:** Achievable within 6-9 months
- **Gap Areas:** Open-source dependency management

---

## Example 6: Zero Trust Architecture Transformation Roadmap

**Scenario**: Federal agency with 5,000+ employees and hybrid IT/cloud infrastructure planning 3-year Zero Trust transformation.

### Input Request
```json
{
  "tool": "terranova_zero_trust_assess",
  "arguments": {
    "current_architecture": "Traditional perimeter security with legacy on-premises data center (40% workloads), hybrid cloud (AWS/Azure, 50%), departmental standalone systems (10%). Active Directory with limited MFA, some modern applications with OAuth2. EDR on ~60% of endpoints.",
    "network_segments": [
      "Perimeter/DMZ",
      "Internal Corporate",
      "Data Center",
      "AWS Production",
      "AWS Development",
      "Azure Production",
      "Department 1 (standalone)",
      "Department 2 (standalone)"
    ],
    "identity_management": "Active Directory with partial MFA (security groups, administrators), some Azure AD for cloud apps, legacy systems with basic authentication",
    "data_flows": "TLS 1.2 for most traffic, database encryption for 80% of databases, no DLP system, limited encryption in hybrid cloud"
  }
}
```

### Zero Trust Maturity Assessment
- **Current Maturity Score:** 42/100
- **Maturity Level:** DEVELOPING (Basic Controls)
- **NIST 800-207 Compliance:** 35%
- **DoD ZTRA Alignment:** 40%

### Identified Compliance Gaps

| Pillar | Gap | Severity | NIST Reference |
|--------|-----|----------|-----------------|
| User Identity Verification | Weak MFA adoption (<50%) | CRITICAL | 800-207 Section 4.1 |
| Device Posture | EDR only on 60% of endpoints | HIGH | 800-207 Section 4.2 |
| Network Segmentation | Only 8 segments, not micro-segmented | HIGH | 800-207 Section 4.3 |
| Application Security | No service mesh or workload identity | HIGH | 800-207 Section 4.4 |
| Data Security | No DLP, inconsistent encryption | HIGH | 800-207 Section 4.5 |
| Visibility | Basic SIEM, no threat hunting | CRITICAL | 800-207 Section 4.6 |

### 5-Phase Migration Roadmap

**Phase 0: Governance (Months 1-3)**
- Establish Zero Trust Program Office (7 FTE)
- Define target architecture and success metrics
- Secure executive sponsorship and funding
- Create Zero Trust governance council

**Phase 1: Identity Foundation (Months 4-9)**
- Deploy passwordless authentication (FIDO2) for 100% of users
- Expand MFA to 100% of user identities
- Implement Privileged Access Management (PAM) for admins
- Establish Azure AD as primary identity provider

**Phase 2: Network Transformation (Months 10-15)**
- Deploy software-defined perimeter (SDP)
- Implement microsegmentation in data center
- Establish cloud-native network controls (security groups, NSG)
- Implement network access control (NAC)

**Phase 3: Data & Workload Security (Months 16-21)**
- Implement service mesh (Istio) for microservices
- Deploy Data Loss Prevention (DLP) platform
- Establish encryption everywhere (AES-256 minimum)
- Implement API gateway for workload communication

**Phase 4: Visibility & Operations (Months 22-27)**
- Deploy comprehensive SIEM (Splunk/Sentinel)
- Stand up 24/7 Security Operations Center
- Implement threat intelligence integration
- Enable continuous threat hunting

**Phase 5+: Optimization (Ongoing)**
- AI/ML anomaly detection
- Quantum-resistant cryptography evaluation
- Continuous policy refinement

### Resource Requirements
**Budget:** $4-6M over 3 years

**Personnel (FTE):**
- Program Manager: 1
- Security Architects: 3
- Network Engineers: 4
- Identity/Access Engineers: 3
- SOC Analysts: 12
- Supporting roles: 5+

**Key Platform Investments:**
- Okta or Azure AD Premium
- Cisco SD-Access or Fortinet
- Splunk Enterprise or Azure Sentinel
- CrowdStrike or Microsoft Defender
- Fortanix or Thales HSM
- Budget: $3-4M for licenses/services over 3 years

### Quick Wins (0-3 months)
1. Enable MFA for all privileged accounts (2 weeks)
2. Deploy Azure AD conditional access policies (3 weeks)
3. Enable EDR on remaining endpoints (4 weeks)
4. Deploy basic SIEM correlation rules (6 weeks)
5. Establish weekly Zero Trust steering committee (1 week)

### Success Metrics
- **Authentication:** 100% passwordless user adoption in 18 months
- **Network:** 80% of critical traffic within microsegments in 15 months
- **Encryption:** 99% data in transit with TLS 1.3 in 12 months
- **Detection:** Mean Time to Detect (MTTD) < 1 hour by month 18
- **Response:** Mean Time to Respond (MTTR) < 4 hours by month 24
- **Compliance:** 100% Zero Trust policy coverage for critical assets by month 27

### Risk Assessment
- **Residual Risk (Month 0):** 65/100 (HIGH)
- **Projected Risk (Month 12):** 40/100 (MEDIUM-HIGH)
- **Target Risk (Month 36):** 15/100 (MEDIUM-LOW)

---

## Integration Examples

### Automated Workflow: Contract Risk Assessment
```
1. Run terranova_ndaa_compliance → Check supplier violations
2. Run terranova_supply_chain_audit → Assess vendor risk
3. Run terranova_zero_trust_assess → Evaluate security posture
4. Run terranova_threat_assess → Identify relevant threats
5. Compile into contract risk score
```

### Automated Workflow: PQC Transition Planning
```
1. Run terranova_pqc_encrypt (UNCLASSIFIED)
2. Run terranova_pqc_encrypt (CUI)
3. Run terranova_pqc_encrypt (SECRET)
4. Run terranova_pqc_encrypt (TOP_SECRET)
5. Cross-reference with current cryptographic inventory
6. Generate unified transition roadmap
```

### Automated Workflow: Pre-Audit Readiness
```
1. Run terranova_zero_trust_assess → Identify gaps
2. Run terranova_ndaa_compliance → Check compliance
3. Run terranova_supply_chain_audit → Verify vendors
4. Run terranova_threat_assess → Review defenses
5. Generate executive readiness report
```

---

These examples demonstrate the breadth of Terranova Defence MCP capabilities across the complete defence security landscape.
