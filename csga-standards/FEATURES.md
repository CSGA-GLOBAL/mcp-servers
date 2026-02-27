# CSGA Standards MCP Server - Feature Map

Complete breakdown of all features and capabilities by tool.

---

## Tool 1: csga_standards_lookup

### Purpose
Reference and lookup cybersecurity frameworks and standards

### Supported Standards
- **CSR5** — CSGA Cyber Security Readiness Level 5
- **NIST CSF** — NIST Cybersecurity Framework
- **ISO 27001** — ISO/IEC 27001:2022 Information Security Management
- **CIS Controls** — CIS Critical Security Controls v8.1
- **MITRE ATT&CK** — MITRE ATT&CK Framework

### Query Methods
1. **Direct Standard Lookup** — Specify exact standard name
2. **Full-Text Search** — Search by keyword across all standards
3. **Focus Area Filtering** — Filter by domain (governance, access control, etc.)
4. **Browse All** — View complete standards and frameworks catalog

### Focus Areas Supported
- Governance
- Asset Management
- Access Control
- Detection & Response
- Recovery
- Awareness Training

### Output for Each Standard
- Standard name and type
- Comprehensive description
- Key domains (5-10 domains)
- Implementation steps (5-7 steps)
- Compliance effort rating (Low/Medium/High/Critical)
- Best use cases
- Certification info (where applicable)

### Data Coverage
- 5 major standards fully detailed
- 8 frameworks in catalog
- 50+ implementation steps
- 100+ control mappings
- 40+ key domains

---

## Tool 2: csga_kata_assessment

### Purpose
Evaluate organizational cybersecurity maturity using K.A.T.A.™ framework

### K.A.T.A. Belt Levels

| Belt | Level | Title | Maturity Range | Timeline |
|------|-------|-------|-----------------|----------|
| White | 1 | Awareness | 0-15 | 1 month |
| Yellow | 2 | Foundation | 15-30 | 3 months |
| Orange | 3 | Intermediate | 30-50 | 6 months |
| Green | 4 | Applied | 50-65 | 9 months |
| Blue | 5 | Advanced | 65-78 | 12 months |
| Purple | 6 | Expert | 78-88 | 18 months |
| Brown | 7 | Mastery | 88-95 | 24 months |
| Black | 8 | Leadership | 95-100 | 30 months |

### Scoring Inputs
1. **Current Controls** (40%) — Implemented security controls
2. **Training Coverage** (20%) — Number of trained employees
3. **Budget Allocation** (20%) — Security investment level
4. **Incident History** (20%) — Historical security events

### Assessment Output
- **Current Belt Level** — Specific belt classification
- **Maturity Score** — 0-100 numeric score
- **Strengths** — 3-5 identified organizational strengths
- **Gaps** — 3-5 identified security gaps
- **Path to Next Belt** — 5-7 specific recommendations
- **Training Recommendations** — 4+ recommended courses
- **Timeline** — Months to reach next belt

### Controls Evaluation
Recognizes 15+ types of controls:
- Firewall
- IDS/IPS
- SIEM
- Endpoint Protection (EDR)
- Vulnerability Management
- Access Control
- MFA
- Encryption
- Audit Logging
- Incident Response
- Vulnerability Scanning
- Penetration Testing
- Security Training
- Asset Management
- Change Management

### Training Recommendations by Belt
- **White:** Awareness fundamentals, basics for all employees
- **Yellow:** CompTIA Security+, NIST CSF, ISO 27001 fundamentals
- **Orange:** CISSP preparation, advanced incident handling, MITRE ATT&CK
- **Green:** Advanced threat intelligence, threat hunting, advanced IR
- **Blue:** Security architecture, AI/ML in security, red team operations
- **Purple:** Expert leadership, threat research, security standards development
- **Brown:** Transformation leadership, next-gen capabilities, industry influence
- **Black:** Executive leadership, standards board participation

---

## Tool 3: csga_threat_intel

### Purpose
Access current cybersecurity threat intelligence and tactical threat information

### Threat Coverage

#### Major Threat Profiles
- **LockBit 3.0 Ransomware**
  - Severity: Critical
  - Sectors: Finance, Healthcare, Manufacturing, Technology, Energy
  - Techniques: Phishing, credential theft, lateral movement, data encryption
  - IOCs: .lockbit file extensions, ransom notes
  - Mitigations: EDR, MFA, network segmentation, offline backups

- **Lazarus Group (APT38)**
  - Severity: Critical
  - Sectors: Finance, Energy, Government, Technology, Healthcare
  - Tactics: Reconnaissance, resource development, initial access, execution
  - Techniques: Watering hole attacks, custom malware, wiper tools
  - Focus: Financial theft and disruptive attacks

- **Zero-Day Exploitation**
  - Severity: Critical
  - Sectors: All
  - Vector: Unpatched public-facing applications
  - Impact: Arbitrary code execution, system compromise
  - Prevention: Application whitelisting, IPS, aggressive patching

- **Supply Chain Attacks**
  - Severity: Critical
  - Sectors: All
  - Vector: Compromise of software vendors/suppliers
  - Impact: Widespread malicious code distribution
  - Examples: SolarWinds, 3CX

### Sector-Specific Threat Mapping
- **Finance:** Ransomware, APT, Zero-Days, Supply Chain
- **Healthcare:** Ransomware, Zero-Days, Supply Chain
- **Energy:** APT, Zero-Days, Supply Chain
- **Manufacturing:** Ransomware, Zero-Days, Supply Chain
- **Technology:** APT, Zero-Days, Supply Chain
- **Government:** APT, Zero-Days, Supply Chain

### Threat Intelligence Output
- Threat name and severity level
- Affected sectors and industries
- MITRE ATT&CK tactics (4-8 tactics)
- MITRE ATT&CK techniques (4-8 techniques)
- Indicators of Compromise (5-7 IOCs)
- Mitigation recommendations (5-7 mitigations)
- Detection methods (4-5 detection approaches)
- Recent activity and statistics

### Query Methods
1. **Sector-based** — Get threats relevant to your industry
2. **Threat-type based** — Look up specific threat category
3. **CVE-based** — Search specific vulnerability
4. **Free-text search** — Keyword search across all threats

### MITRE ATT&CK Coverage
- **14 Tactics:** Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command & Control, Exfiltration, Impact
- **Technique Mapping:** Specific techniques per threat
- **Sub-techniques:** Detailed technical execution methods

---

## Tool 4: csga_incident_response

### Purpose
Step-by-step cyber incident response procedures and escalation guidance

### Incident Types Covered

#### 1. Ransomware Attack
**Response Time:** 72 hours (adjusted by severity)
**Immediate Actions:** 6 critical first steps
**Containment:** 7 containment measures
**Investigation:** 7 investigation procedures
**Notification:** Legal and regulatory requirements
**Recovery:** System restoration from clean backups
**Post-Incident:** Lessons learned and control improvements

#### 2. Data Breach
**Response Time:** 168 hours (7 days, adjusted)
**Immediate Actions:** 7 immediate steps
**Containment:** 7 containment measures
**Investigation:** 7 investigation procedures
**Notification:** Affected individuals, regulators, agencies
**Regulatory:** GDPR (72 hours), HIPAA (60 days), CCPA
**Post-Incident:** Credit monitoring, DLP implementation

#### 3. System Compromise
**Response Time:** 48 hours
**Immediate Actions:** 7 immediate steps
**Containment:** 7 containment measures
**Investigation:** 7 forensic procedures
**Notification:** IT leadership, customer assessment
**Recovery:** System rebuild from clean backup
**Post-Incident:** EDR deployment, hardening

#### 4. DDoS Attack
**Response Time:** 24 hours
**Immediate Actions:** 7 immediate steps
**Mitigation:** 7 mitigation measures
**Investigation:** 6 investigation procedures
**Communication:** Customer notifications, status updates
**Recovery:** Restore normal service operations
**Post-Incident:** Architecture improvements, redundancy

### Response Procedures for Each Incident

**Immediate Actions** — Prioritized by urgency
- Activation of incident response teams
- Isolation of affected systems
- Preservation of evidence
- Documentation of timeline
- Notification to leadership

**Containment Steps** — Stop spread and limit damage
- Network isolation
- Credential revocation
- Process/service blocking
- Access restrictions
- Monitoring implementation

**Investigation Procedures** — Determine scope and cause
- Forensic analysis
- Log review
- Timeline establishment
- Impact assessment
- Root cause analysis

**Notification Requirements** — Legal and regulatory
- Law enforcement notification (where applicable)
- Customer/affected party notification
- Regulatory body reporting
- Insurance notification
- Media/public communication

**Recovery Timeline** — Adjusted by severity
- Critical: 1.5x baseline
- High: 1.2x baseline
- Medium: 1.0x baseline
- Low: 0.8x baseline

### Escalation Paths

#### Critical Incidents
- **Immediate (0 min):** CISO + Chief Security Officer
- **5 minutes:** VP Security + IT Director
- **15 minutes:** CEO + Legal Counsel
- **30 minutes:** Board of Directors
- **1 hour:** Law Enforcement + Regulators

#### High Severity
- **Immediate:** Security Manager + Incident Lead
- **10 minutes:** CISO
- **30 minutes:** VP Security
- **1 hour:** Legal if regulatory impact

#### Medium Severity
- **Immediate:** Security Team
- **30 minutes:** Security Manager
- **2 hours:** CISO review

#### Low Severity
- **1 hour:** Security Team handles
- **24 hours:** Document for review

### Regulatory Reporting

**HIPAA:** 60-day notification requirement for breach
**GDPR:** 72-hour mandatory reporting for data breach
**CCPA:** Consumer notification requirements
**State Laws:** 30-day notification in most states
**PCI-DSS:** Immediate notification for payment card exposure
**SOC 2:** Customer notification required

---

## Tool 5: csga_training_pathway

### Purpose
Personalized cybersecurity training and certification recommendations

### Career Path Options
1. **Security Awareness Training**
2. **System Administrator**
3. **Security Analyst**
4. **Penetration Tester**
5. **CISO/Leadership**
6. **Incident Response Specialist**
7. **Cloud Security Engineer**
8. **DevSecOps Engineer**

### Skill Level Progression
- **Beginner** → Intermediate: 3-6 months
- **Intermediate** → Advanced: 6-12 months
- **Advanced** → Expert: 12-24 months

### Training Courses (25+)

#### SANS Institute Courses
- **SEC401:** Security Essentials (40h, $8,000)
- **SEC504:** Hacker Tools and Incident Handling (40h, $8,000)
- **SEC566:** NIST Cybersecurity Framework (40h, $8,000)

#### CompTIA Certifications
- **Security+:** (60h, $3,000)
- **CISSP:** (80h, $7,000)
- **CASP+:** (Included in CISSP path)

#### CSGA Proprietary Courses
- **NIST CSF Implementation:** (24h, $2,500)
- **ISO 27001 Management:** (32h, $3,500)
- **Advanced Threat Hunting:** (40h, $5,000)
- **Incident Response:** (30h, $3,500)
- **Enterprise Security Architecture:** (50h, $6,000)
- **Red Team Operations:** (60h, $8,000)

#### Specialized Certifications
- **OSCP:** Offensive Security Certified Professional ($1,000 exam)
- **CEH:** Certified Ethical Hacker ($450 exam)
- **CISA:** Certified Information Systems Auditor ($765 exam)
- **CISM:** Certified Information Security Manager ($765 exam)

### Training Pathways by Goal

#### Security Analyst Path
1. Security Essentials (SEC401)
2. CompTIA Security+
3. SIEM Administration
4. Log Analysis & Threat Detection
5. GIAC Certified Incident Handler
**Total:** 6-9 months, $18,000-25,000

#### Penetration Tester Path
1. Security Essentials (SEC401)
2. CompTIA Security+
3. Offensive Security OSCP
4. Advanced Penetration Testing
5. Red Team Operations
**Total:** 12-18 months, $22,000-30,000

#### CISO Path
1. Security Essentials (SEC401)
2. CompTIA Security+
3. CISSP Training
4. NIST Cybersecurity Framework
5. ISO 27001 Management
6. Enterprise Security Architecture
**Total:** 18-24 months, $40,000-55,000

#### Incident Response Path
1. Security Essentials (SEC401)
2. SANS Hacker Tools (SEC504)
3. Incident Response Management
4. Advanced Threat Hunting
5. Forensics & Evidence Collection
**Total:** 9-12 months, $28,000-35,000

### Pathway Output
- **Recommended learning path:** Step-by-step progression
- **Specific courses:** With providers, costs, duration
- **Certifications:** Recommended certs with exam costs
- **Total timeline:** Months to complete
- **Total cost:** USD estimate
- **Prerequisite skills:** Required prior knowledge
- **Success metrics:** How to measure progress

### Success Metrics by Path
- **Analyst:** Detect/investigate incidents, reduce MTTD
- **Tester:** Identify critical vulnerabilities, advanced techniques
- **CISO:** Develop strategy, board-level recognition
- **Incident Response:** Reduce MTTR, successful containment

---

## Tool 6: csga_compliance_check

### Purpose
Quick compliance evaluation against major regulatory frameworks

### Frameworks Evaluated

#### 1. NIST Cybersecurity Framework
- **Applicable to:** Critical Infrastructure, Technology, Government, All
- **Key Requirements:** 5 Functions, 22 Categories, 98 Outcomes
- **Assessment:** Governance, asset management, protection, detection, recovery
- **Effort:** 6 months, $250,000

#### 2. ISO/IEC 27001:2022
- **Applicable to:** All organizations
- **Key Requirements:** 14 domains, 93 controls
- **Assessment:** Policies, organization, HR, assets, access, crypto, physical, operations, communications, systems, suppliers, incidents, continuity, compliance
- **Certification:** Available through accredited auditors
- **Effort:** 12 months, $350,000

#### 3. HIPAA Security Rule
- **Applicable to:** Healthcare organizations
- **Key Requirements:** Administrative, technical, physical safeguards
- **Assessment:** ePHI encryption, access controls, audit logging, workforce training, Business Associate Agreements
- **Effort:** 9 months, $300,000

#### 4. PCI-DSS v3.2.1
- **Applicable to:** Financial institutions, payment processors, retailers handling card data
- **Key Requirements:** 12 requirements across network, cardholder data, vulnerability, access management, testing, policy
- **Assessment:** Network segmentation, encryption, access controls, vulnerability management
- **Effort:** 8 months, $280,000

#### 5. SOC 2 Type II
- **Applicable to:** Technology companies, SaaS, cloud services
- **Key Requirements:** Security, availability, processing integrity, confidentiality, privacy
- **Assessment:** Access controls, change management, availability, encryption, logging
- **Effort:** 10 months, $320,000

#### 6. GDPR (General Data Protection Regulation)
- **Applicable to:** Any organization serving EU customers
- **Key Requirements:** Data protection by design, consent, DPA, breach notification, DPIA
- **Assessment:** Privacy policies, data processing agreements, encryption, subject rights
- **Effort:** 8 months, $250,000

#### 7. SOX (Sarbanes-Oxley)
- **Applicable to:** Publicly traded companies (US)
- **Key Requirements:** IT general controls, access controls, audit logging, change management
- **Assessment:** Control environment, risk assessment, control activities, information & communication, monitoring
- **Effort:** 12 months, $400,000

#### 8. CIS Critical Security Controls
- **Applicable to:** All organizations
- **Key Requirements:** 18 controls in IG1, IG2, IG3
- **Assessment:** Asset management, access control, training, protection, detection, response
- **Effort:** 6 months, $200,000

### Compliance Assessment Output

**For Each Framework:**
- **Compliance Status:** Compliant / Partially Compliant / Non-Compliant
- **Compliance Percentage:** 0-100%
- **Applicable:** Whether framework applies to organization
- **Major Gaps:** 3-5 identified compliance gaps
- **Priority Actions:** 3-4 immediate remediation actions
- **Estimated Effort:** Timeline in months
- **Estimated Cost:** Budget in USD

### Overall Assessment

**Risk Level Determination:**
- **Critical:** 3+ non-compliant frameworks
- **High:** 1+ non-compliant + 2+ partially compliant
- **Medium:** 3+ partially compliant
- **Low:** Mostly compliant

**Recommendations:**
- Framework-specific remediation actions
- Prioritized control implementation
- Resource allocation guidance
- Timeline and budget planning

### Control Score Calculation

Recognizes 15 types of controls:
- Firewall (10 points)
- IDS/IPS (8 points)
- SIEM (12 points)
- Endpoint Protection (8 points)
- Vulnerability Management (10 points)
- Access Control (10 points)
- MFA (8 points)
- Encryption (10 points)
- Audit Logging (8 points)
- Incident Response (10 points)
- Vulnerability Scanning (8 points)
- Penetration Testing (8 points)
- Security Training (6 points)
- Asset Management (8 points)
- Change Management (6 points)

---

## Cross-Tool Features

### Common Functionality
- ✅ Comprehensive input validation (Zod schemas)
- ✅ Error handling and graceful degradation
- ✅ Deterministic outputs for repeatability
- ✅ Type-safe throughout
- ✅ Production-ready quality

### Integration Capability
- Can be chained together: KATA → Compliance → Training pathway
- Standards lookups support all tool areas
- Threat intel maps to incident response procedures
- Compliance frameworks map to standards

### Data Consistency
- Single source of truth for all definitions
- Cross-referenced standards and frameworks
- Aligned MITRE ATT&CK mappings
- Consistent control definitions

---

## Quick Reference

### By Use Case

**Getting Started:**
1. Use `csga_standards_lookup` to understand frameworks
2. Use `csga_kata_assessment` to find baseline
3. Use `csga_compliance_check` to identify gaps

**Responding to Threats:**
1. Use `csga_threat_intel` to understand current threats
2. Use `csga_incident_response` to execute response

**Building Security Program:**
1. Use `csga_kata_assessment` for maturity baseline
2. Use `csga_training_pathway` to build team
3. Use `csga_compliance_check` for regulatory readiness
4. Use `csga_standards_lookup` for implementation details

**Executive Reporting:**
1. Use `csga_kata_assessment` for metrics
2. Use `csga_compliance_check` for compliance status
3. Use `csga_threat_intel` for threat landscape

---

**Total Features:** 150+ distinct capabilities
**Total Data Points:** 500+ standards, controls, and recommendations
**Total Documentation:** 3,000+ lines of detailed guides

