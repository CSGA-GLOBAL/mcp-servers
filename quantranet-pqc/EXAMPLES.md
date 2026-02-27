# QuantraNet PQC MCP Server - Usage Examples

This document provides comprehensive examples of how to use each QuantraNet tool through the MCP interface.

## Table of Contents

1. [PQC Readiness Assessment](#pqc-readiness-assessment)
2. [Cryptographic Audit](#cryptographic-audit)
3. [Migration Planning](#migration-planning)
4. [Quantum Threat Modeling](#quantum-threat-modeling)
5. [Compliance Checking](#compliance-checking)
6. [Algorithm Recommendations](#algorithm-recommendations)
7. [Real-World Scenarios](#real-world-scenarios)

---

## PQC Readiness Assessment

### Example 1: Financial Services Firm

**Scenario:** A mid-sized financial services company wants to assess their quantum readiness.

**Request:**
```json
{
  "organizationName": "FinTech Solutions Inc.",
  "cryptoAlgorithmsInUse": [
    "RSA-2048",
    "ECDSA-256",
    "AES-256",
    "SHA-256"
  ],
  "sector": "finance",
  "dataSensitivityLevel": "critical",
  "organizationSize": "medium",
  "currentInvestmentInCrypto": 500000
}
```

**Expected Response:**
```json
{
  "organizationName": "FinTech Solutions Inc.",
  "readinessScore": 35,
  "riskLevel": "high",
  "vulnerableAlgorithms": [
    {
      "name": "RSA-2048",
      "quantumVulnerability": "high",
      "affectedServices": ["TLS/SSL", "Code Signing", "Key Exchange"],
      "decryptionTimeline": "5-10 years (Moderate quantum threat)",
      "migrationPriority": 2
    },
    {
      "name": "ECDSA-256",
      "quantumVulnerability": "high",
      "affectedServices": ["TLS/SSL", "Digital Signatures", "Authentication"],
      "decryptionTimeline": "5-10 years (Moderate quantum threat)",
      "migrationPriority": 2
    }
  ],
  "nistRecommendations": [
    {
      "algorithm": "CRYSTALS-Kyber (ML-KEM)",
      "category": "key_exchange",
      "keySize": 1024,
      "securityLevel": 3,
      "adoptionStatus": "finalist",
      "expectedStandardization": "FIPS 203 (Current)"
    },
    {
      "algorithm": "CRYSTALS-Dilithium (ML-DSA)",
      "category": "digital_signature",
      "keySize": 2544,
      "securityLevel": 3,
      "adoptionStatus": "finalist",
      "expectedStandardization": "FIPS 204 (Current)"
    },
    {
      "algorithm": "FALCON",
      "category": "digital_signature",
      "keySize": 512,
      "securityLevel": 3,
      "adoptionStatus": "finalist",
      "expectedStandardization": "FIPS 206 (Current)"
    }
  ],
  "estimatedMigrationTimeline": {
    "discovery": 5,
    "assessment": 6,
    "planning": 3,
    "implementation": 9,
    "total": 23
  },
  "costRange": {
    "low": 450000,
    "high": 1500000,
    "currency": "USD"
  },
  "keyFindings": [
    "2 quantum-vulnerable algorithm(s) identified in your environment",
    "Organization requires immediate PQC migration planning",
    "Critical data sensitivity level demands urgent PQC transition",
    "Critical vulnerabilities in: RSA-2048, ECDSA-256"
  ],
  "nextSteps": [
    "1. Schedule comprehensive cryptographic inventory audit",
    "2. Establish PQC transition steering committee",
    "3. Conduct detailed quantum threat assessment",
    "4. Prioritize critical systems for immediate hybrid PQC deployment",
    "5. Develop incident response plan for post-quantum era",
    "6. Engage NIST PQC standardization initiatives",
    "7. Budget for hybrid cryptography infrastructure"
  ]
}
```

### Example 2: Small Educational Institution

**Scenario:** Small university wants basic PQC readiness check.

**Request:**
```json
{
  "organizationName": "Tech University",
  "cryptoAlgorithmsInUse": ["RSA-2048", "AES-256"],
  "sector": "education",
  "dataSensitivityLevel": "medium",
  "organizationSize": "small"
}
```

**Key Differences:**
- Lower readiness score (45-50 range)
- Medium risk level instead of high
- Lower cost estimates (USD 150K-400K)
- Longer timeline (higher multiplier for small org)

---

## Cryptographic Audit

### Example 1: Detailed Vulnerability Analysis

**Scenario:** Defense contractor needs comprehensive crypto audit.

**Request:**
```json
{
  "algorithms": [
    {
      "name": "RSA-2048",
      "keySize": 2048,
      "protocol": "TLS 1.3",
      "usageContext": "key exchange"
    },
    {
      "name": "DES",
      "keySize": 56,
      "protocol": "Legacy system",
      "usageContext": "file encryption"
    },
    {
      "name": "ECDSA-384",
      "keySize": 384,
      "protocol": "Code signing",
      "usageContext": "application signing"
    },
    {
      "name": "AES-256",
      "keySize": 256,
      "protocol": "AES-GCM",
      "usageContext": "data encryption"
    },
    {
      "name": "SHA-1",
      "keySize": 160,
      "protocol": "Legacy hashing",
      "usageContext": "certificate hashing"
    }
  ],
  "detailedAnalysis": true
}
```

**Key Response Elements:**
```json
{
  "auditDate": "2024-02-25T10:30:00.000Z",
  "algorithmAssessments": [
    {
      "algorithm": "DES",
      "keySize": 56,
      "quantumResistance": false,
      "vulnerabilityLevel": "critical",
      "migrationPriority": 1,
      "alternativeAlgorithms": ["AES-256", "ChaCha20"],
      "estimatedDeprecationDate": "2025-06-15"
    },
    {
      "algorithm": "SHA-1",
      "keySize": 160,
      "quantumResistance": false,
      "vulnerabilityLevel": "critical",
      "migrationPriority": 1,
      "alternativeAlgorithms": ["SHA-256", "SHA-384", "SPHINCS+"],
      "estimatedDeprecationDate": "2025-06-15"
    },
    {
      "algorithm": "RSA-2048",
      "keySize": 2048,
      "quantumResistance": false,
      "vulnerabilityLevel": "high",
      "migrationPriority": 2,
      "alternativeAlgorithms": ["ML-DSA", "CRYSTALS-Dilithium", "FALCON"],
      "estimatedDeprecationDate": "2028-08-15"
    }
  ],
  "overallVulnerability": "critical",
  "quantumThreatTimeline": {
    "largeScaleQC": 15,
    "cryptanalysis": 20,
    "harvestNowDecryptLater": 5
  },
  "migrationPriorityRanking": [
    {
      "algorithm": "DES",
      "priority": 1,
      "reason": "Critical quantum vulnerability - immediate migration required within 6-12 months"
    },
    {
      "algorithm": "SHA-1",
      "priority": 2,
      "reason": "Critical quantum vulnerability - immediate migration required within 6-12 months"
    },
    {
      "algorithm": "RSA-2048",
      "priority": 3,
      "reason": "High quantum vulnerability - migrate within 12-24 months as part of hybrid approach"
    }
  ],
  "totalAffectedSystems": 5,
  "detailedReport": "[Long-form audit report with comprehensive analysis]"
}
```

---

## Migration Planning

### Example 1: Enterprise Finance Organization

**Scenario:** Large financial institution with complex infrastructure.

**Request:**
```json
{
  "organizationSize": "enterprise",
  "sector": "finance",
  "cryptoInventory": [
    "RSA-2048",
    "RSA-4096",
    "ECDSA-256",
    "ECDSA-384",
    "AES-128",
    "AES-256",
    "SHA-256",
    "SHA-384"
  ],
  "complianceRequirements": ["NIST", "White House"],
  "budget": 5000000,
  "timeline": "high"
}
```

**Response Structure:**
```json
{
  "organizationProfile": {
    "size": "enterprise",
    "sector": "finance",
    "estimatedCryptoAssets": 8
  },
  "phasedMigrationPlan": [
    {
      "phase": "discovery",
      "duration": 4,
      "keyActivities": [
        "Complete cryptographic inventory across all systems",
        "Map crypto dependencies and data flows",
        "Identify legacy systems and custom implementations",
        "Document quantum threat impact per system"
      ],
      "resources": ["Cryptography experts", "System administrators", "Security architects"],
      "successMetrics": [
        "100% crypto inventory completion",
        "All systems documented",
        "Dependencies mapped"
      ],
      "estimatedCost": 150000,
      "startDate": "2024-02-25",
      "endDate": "2024-06-24"
    },
    {
      "phase": "assessment",
      "duration": 6,
      "keyActivities": [
        "Quantum threat assessment for each algorithm",
        "Compliance gap analysis",
        "Performance testing of PQC alternatives",
        "Business impact analysis"
      ],
      "resources": [
        "PQC specialists",
        "Compliance officers",
        "Performance engineers"
      ],
      "successMetrics": [
        "Threat levels assigned to all algorithms",
        "Compliance gaps identified",
        "PQC performance data available"
      ],
      "estimatedCost": 250000,
      "startDate": "2024-06-24",
      "endDate": "2024-12-23"
    },
    {
      "phase": "pilot",
      "duration": 6,
      "keyActivities": [
        "Deploy PQC in non-critical systems",
        "Test hybrid cryptography approach",
        "Validate performance and compatibility",
        "Gather lessons learned"
      ],
      "estimatedCost": 350000
    },
    {
      "phase": "deployment",
      "duration": 12,
      "keyActivities": [
        "Phased rollout to production systems",
        "Monitoring and optimization",
        "Incident response preparation",
        "Hybrid crypto maintenance"
      ],
      "estimatedCost": 800000
    }
  ],
  "hybridApproach": {
    "strategy": "Parallel classical + PQC implementation to ensure security against both classical and quantum threats during transition period",
    "classicalAlgorithms": [
      "RSA-2048 (key exchange)",
      "AES-256 (encryption)",
      "HMAC-SHA-256 (authentication)"
    ],
    "pqcAlgorithms": [
      "ML-KEM/CRYSTALS-Kyber (key exchange)",
      "ML-DSA/CRYSTALS-Dilithium (signatures)",
      "SLH-DSA/SPHINCS+ (backup signatures)"
    ],
    "transitionPeriod": 18,
    "justification": "Hybrid approach provides protection against both classical and quantum adversaries..."
  },
  "estimatedTotalCost": {
    "low": 1720000,
    "high": 2064000,
    "currency": "USD"
  }
}
```

---

## Quantum Threat Modeling

### Example 1: Healthcare Organization - HNDL Risk

**Scenario:** Hospital system storing patient records indefinitely.

**Request:**
```json
{
  "dataType": "health_records",
  "storageDuration": "indefinite",
  "adversaryCapability": "state_level",
  "includeRiskAssessment": true
}
```

**Response:**
```json
{
  "dataType": "health_records",
  "harvestNowDecryptLater": {
    "risk": "critical",
    "details": "The 'Harvest Now, Decrypt Later' (HNDL) attack involves collecting and storing encrypted data today, then decrypting it once quantum computers become available. Your health_records stored indefinite faces IMMEDIATE critical risk from HNDL attacks. Adversaries may already be harvesting this data. Post-quantum cryptography deployment is URGENT.",
    "timeframeOfVulnerability": "Actively at risk now and for indefinite future"
  },
  "quantumComputingTimeline": {
    "largeScaleQCYears": 10,
    "harvestableDataWindow": "0-10 years (NOW is the window - urgent action required)",
    "recommendedProtectionDate": "2024-02-25"
  },
  "countermeasures": [
    {
      "measure": "Deploy NIST-standardized PQC algorithms (ML-KEM for key exchange, ML-DSA for signatures)",
      "implementationEffort": "high",
      "effectiveness": "high",
      "costEstimate": {
        "amount": 500000,
        "currency": "USD"
      },
      "timeline": "6-12 months for production deployment"
    },
    {
      "measure": "Implement hybrid cryptography (classical + PQC in parallel)",
      "implementationEffort": "medium",
      "effectiveness": "high",
      "costEstimate": {
        "amount": 300000,
        "currency": "USD"
      },
      "timeline": "3-6 months for initial deployment"
    },
    {
      "measure": "Consider defensive quantum-resistant rekeying (rotate keys using PQC immediately)",
      "implementationEffort": "high",
      "effectiveness": "high",
      "costEstimate": {
        "amount": 600000,
        "currency": "USD"
      },
      "timeline": "3-6 months for critical systems"
    },
    {
      "measure": "Establish compliance alignment with regulatory PQC mandates",
      "implementationEffort": "medium",
      "effectiveness": "high",
      "costEstimate": {
        "amount": 200000,
        "currency": "USD"
      },
      "timeline": "2-4 months for governance setup"
    }
  ],
  "complianceRequirements": [
    "NIST SP 800-208: Post-Quantum Cryptography: ML-KEM, ML-DSA, SLH-DSA",
    "HIPAA Breach Notification Rule - cryptographic safeguards required",
    "FDA Medical Device Cybersecurity Guidance - PQC readiness",
    "White House OMB M-23-02 - Memorandum on Migration to PQC",
    "EU Cyber Resilience Act - Post-Quantum Cryptography requirements"
  ]
}
```

### Example 2: Financial Services - Moderate HNDL Risk

**Scenario:** Bank with medium-term data retention (5-10 years).

**Request:**
```json
{
  "dataType": "financial_records",
  "storageDuration": "medium_term",
  "adversaryCapability": "advanced"
}
```

**Response:**
```json
{
  "harvestNowDecryptLater": {
    "risk": "high",
    "details": "Your financial_records stored medium_term faces significant HNDL risk. PQC migration should be prioritized within the next 2-3 years.",
    "timeframeOfVulnerability": "5-15 years from encryption date"
  },
  "quantumComputingTimeline": {
    "largeScaleQCYears": 15,
    "harvestableDataWindow": "0-15 years (Window is actively closing - implement PQC now)"
  }
}
```

---

## Compliance Checking

### Example 1: US Defense Contractor

**Scenario:** Company doing government work needing CNSA 2.0 compliance.

**Request:**
```json
{
  "sector": "defense",
  "jurisdiction": "US",
  "currentImplementations": ["RSA-2048", "ECDSA-384"]
}
```

**Response:**
```json
{
  "sector": "defense",
  "jurisdiction": "US",
  "complianceStatus": {
    "nistSP800_208": "partial",
    "whiteHouseOMB_M23_02": "non_compliant",
    "cnsa2_0": "non_compliant",
    "euCyberResilienceAct": "not_applicable"
  },
  "recommendations": [
    {
      "requirement": "NIST SP 800-208: Post-Quantum Cryptography Implementation",
      "currentState": "partial",
      "recommendedState": "compliant",
      "priority": "high",
      "estimatedEffort": "6-12 months"
    },
    {
      "requirement": "White House OMB M-23-02: Migration to Post-Quantum Cryptography",
      "currentState": "non_compliant",
      "recommendedState": "compliant",
      "priority": "critical",
      "estimatedEffort": "12-24 months"
    },
    {
      "requirement": "CNSA 2.0: Post-Quantum Cryptography Transition Plan (NSA)",
      "currentState": "non_compliant",
      "recommendedState": "compliant",
      "priority": "critical",
      "estimatedEffort": "6-12 months (accelerated timeline)"
    }
  ],
  "requiredActions": [
    {
      "action": "Establish PQC migration governance committee",
      "timeline": "Within 30 days",
      "responsibility": "CISO / Chief Technology Officer",
      "successCriteria": [
        "Committee formed with representatives from IT, Security, Legal, Compliance",
        "Stakeholder list maintained",
        "Monthly review meetings scheduled"
      ]
    },
    {
      "action": "Conduct complete cryptographic inventory audit",
      "timeline": "Within 90 days",
      "responsibility": "Security Team",
      "successCriteria": [
        "All crypto systems documented",
        "Threat levels assigned",
        "Dependencies mapped"
      ]
    },
    {
      "action": "Achieve CNSA 2.0 compliance for national security systems",
      "timeline": "By 2028-12-31",
      "responsibility": "Chief Information Security Officer",
      "successCriteria": [
        "All NSA-approved algorithms implemented",
        "Certification audit passed",
        "Continuous monitoring enabled"
      ]
    }
  ],
  "deadline": "2030-12-31"
}
```

### Example 2: EU-based Technology Company

**Scenario:** SaaS provider operating in EU needing CRA compliance.

**Request:**
```json
{
  "sector": "technology",
  "jurisdiction": "EU",
  "currentImplementations": ["RSA-3072", "AES-256"]
}
```

**Response:**
```json
{
  "complianceStatus": {
    "nistSP800_208": "partial",
    "whiteHouseOMB_M23_02": "not_applicable",
    "cnsa2_0": "not_applicable",
    "euCyberResilienceAct": "non_compliant"
  },
  "deadline": "2027-12-31",
  "requiredActions": [
    {
      "action": "Implement EU Cyber Resilience Act PQC requirements",
      "timeline": "By 2027-12-31",
      "responsibility": "Data Protection Officer"
    }
  ]
}
```

---

## Algorithm Recommendations

### Example 1: TLS Key Exchange Selection

**Scenario:** Web service needs to select PQC key exchange algorithm.

**Request:**
```json
{
  "useCase": "key_exchange",
  "performanceRequirements": "balanced",
  "platformConstraints": ["server"],
  "quantumSecurityLevel": "256_bit"
}
```

**Response:**
```json
{
  "useCase": "key_exchange",
  "recommendedAlgorithms": [
    {
      "name": "ML-KEM (CRYSTALS-Kyber)",
      "category": "Key Encapsulation Mechanism",
      "securityLevel": 3,
      "keySize": 1024,
      "maturity": "standardized",
      "pros": [
        "FIPS 203 standardized (Nov 2024)",
        "Excellent performance characteristics",
        "Small ciphertext size (768 bytes)",
        "Suitable for TLS integration"
      ],
      "cons": [
        "Larger public key than classical ECC (1184 bytes)",
        "Newer than RSA/ECDSA - less deployed history"
      ],
      "suitableFor": ["TLS/SSL handshakes", "HTTPS connections", "VPN key exchange"]
    }
  ],
  "performanceBenchmarks": [
    {
      "algorithm": "ML-KEM",
      "keyGeneration": "~100 microseconds",
      "encryption": "~150 microseconds (encapsulation)",
      "decryption": "~200 microseconds (decapsulation)",
      "keySize": "1184 bytes public / 2400 bytes private",
      "signatureSize": "N/A - generates 768-byte ciphertext"
    }
  ],
  "hybridApproach": "Run ML-KEM in parallel with classical ECDH during transition period...",
  "migrationPath": [
    "1. Evaluate ML-KEM performance in your TLS stack (6 weeks)",
    "2. Deploy hybrid ECDH + ML-KEM in staging environment (2 months)",
    "3. Run parallel classical + PQC key exchange in production (3-6 months)",
    "4. Monitor performance and gather metrics (ongoing)",
    "5. Transition fully to ML-KEM when standardization is complete (2025-2026)",
    "6. Deprecate classical ECDH/RSA key exchange (2027-2028)"
  ]
}
```

### Example 2: Digital Signature for Code Signing

**Scenario:** Software publisher needs compact PQC signatures.

**Request:**
```json
{
  "useCase": "digital_signature",
  "performanceRequirements": "low_latency",
  "platformConstraints": ["embedded"],
  "quantumSecurityLevel": "256_bit"
}
```

**Response:**
```json
{
  "useCase": "digital_signature",
  "recommendedAlgorithms": [
    {
      "name": "FALCON",
      "category": "Lattice-Based Signature (Compact)",
      "securityLevel": 3,
      "keySize": 512,
      "maturity": "standardized",
      "pros": [
        "FIPS 206 standardized (Feb 2024)",
        "Smallest signature size among NIST finalists (666 bytes)",
        "Fast signature generation",
        "Good for bandwidth-constrained environments"
      ],
      "cons": [
        "More complex implementation",
        "Patent considerations",
        "Newer standardization"
      ],
      "suitableFor": ["Bandwidth-critical applications", "Embedded systems", "Certificate signatures"]
    },
    {
      "name": "ML-DSA (CRYSTALS-Dilithium)",
      "category": "Digital Signature Algorithm",
      "securityLevel": 3,
      "keySize": 2544,
      "maturity": "standardized",
      "suitableFor": ["Code signing", "Document signatures", "Authentication"]
    }
  ],
  "migrationPath": [
    "1. Integrate FALCON signature generation (4 weeks)",
    "2. Implement dual-signature approach (2 weeks)",
    "3. Deploy to code signing pipeline (1 month)",
    "4. Apply dual-signatures to all certificates (3 months)",
    "5. Monitor ecosystem adoption of PQC signature verification (ongoing)",
    "6. Deprecate classical-only signatures (2027-2028)"
  ]
}
```

---

## Real-World Scenarios

### Scenario 1: Financial Institution Complete Assessment

**Organization:** National Bank with 50,000 employees, critical national infrastructure

**Step 1: Initial Assessment**
```json
{
  "organizationName": "National Bank Corp",
  "cryptoAlgorithmsInUse": [
    "RSA-2048", "RSA-3072", "RSA-4096",
    "ECDSA-256", "ECDSA-384",
    "AES-128", "AES-192", "AES-256",
    "SHA-256", "SHA-384", "SHA-512",
    "DES", "MD5"
  ],
  "sector": "finance",
  "dataSensitivityLevel": "critical",
  "organizationSize": "enterprise",
  "currentInvestmentInCrypto": 2000000
}
```

**Expected Readiness Score:** 25-30 (CRITICAL)
**Risk Level:** CRITICAL
**Timeline:** 24-36 months
**Cost:** USD 8M-12M

**Step 2: Detailed Audit**
```json
{
  "algorithms": [
    { "name": "DES", "keySize": 56, "protocol": "Legacy", "usageContext": "archive encryption" },
    { "name": "MD5", "keySize": 128, "protocol": "Hashing", "usageContext": "legacy hashing" },
    { "name": "RSA-2048", "keySize": 2048, "protocol": "TLS 1.3", "usageContext": "key exchange" },
    { "name": "AES-256", "keySize": 256, "protocol": "AES-GCM", "usageContext": "transaction encryption" }
  ],
  "detailedAnalysis": true
}
```

**Step 3: Compliance Check**
```json
{
  "sector": "finance",
  "jurisdiction": "US",
  "currentImplementations": ["RSA-2048", "AES-256"]
}
```

**Compliance Result:**
- NIST SP 800-208: PARTIAL
- White House OMB M-23-02: NON-COMPLIANT
- Deadline: December 31, 2030
- Estimated Effort: 12-24 months

**Step 4: Migration Planning**
```json
{
  "organizationSize": "enterprise",
  "sector": "finance",
  "cryptoInventory": ["RSA-2048", "RSA-3072", "RSA-4096", "ECDSA-256", "ECDSA-384", "AES-128", "AES-256", "SHA-256", "SHA-384", "DES", "MD5"],
  "complianceRequirements": ["NIST", "White House"],
  "budget": 10000000,
  "timeline": "high"
}
```

**Migration Timeline:**
- Discovery: 4 months (Feb-May 2024)
- Assessment: 6 months (May-Nov 2024)
- Planning: 3 months (Nov 2024-Jan 2025)
- Pilot: 6 months (Jan-Jun 2025)
- Deployment: 12 months (Jun 2025-Jun 2026)
- Monitoring: Ongoing from Jun 2026+

**Total: 31 months to full PQC compliance**

**Step 5: Threat Modeling**

For critical customer data stored indefinitely:
```json
{
  "dataType": "customer_financial_records",
  "storageDuration": "indefinite",
  "adversaryCapability": "state_level",
  "includeRiskAssessment": true
}
```

**HNDL Risk:** CRITICAL
**Action Required:** Immediate PQC deployment

---

### Scenario 2: Government Agency Security Assessment

**Organization:** Federal agency with sensitive national security data

**Key Findings:**
- CNSA 2.0 compliance REQUIRED (accelerated timeline)
- Defense-level classification data requires maximum security
- Deadline: December 31, 2028 (earlier than commercial deadline)
- Estimated Cost: USD 5M-8M

**Compliance Focus:**
- NSA-approved algorithms only
- All NIST standardized options
- Hybrid approach: Classical + PQC minimum 2 years
- Annual compliance audits required

---

### Scenario 3: Small Healthcare Startup

**Organization:** Telemedicine platform with 100 employees

**Assessment:**
- Readiness Score: 42 (MEDIUM)
- Risk: HIGH (health data at risk)
- Timeline: 12-18 months
- Cost: USD 150K-300K

**Key Actions:**
1. Quick crypto audit (1 month)
2. Pilot PQC in non-critical systems (3 months)
3. Full TLS migration to hybrid (3-6 months)
4. Patient data re-encryption plan (ongoing)

**Fast Path:**
- Focus on TLS upgrade to ML-KEM + ECDH
- Use managed services where possible (AWS, Azure)
- Defer signature algorithm changes to year 2

---

## API Response Pattern

All tools follow this response pattern:

```typescript
{
  // Tool-specific data
  organizationName?: string;
  readinessScore?: number;
  riskLevel?: 'critical' | 'high' | 'medium' | 'low';

  // Supporting analysis
  auditDate?: string;
  overallVulnerability?: string;

  // Extended information (when requested)
  detailedReport?: string;
  threatAssessmentSummary?: string;
  complianceReport?: string;
  selectionGuide?: string;

  // Structured recommendations
  recommendations?: Array<...>;
  requiredActions?: Array<...>;
  countermeasures?: Array<...>;

  // Timeline and cost
  estimatedMigrationTimeline?: {...};
  estimatedTotalCost?: {low: number, high: number, currency: string};
  deadline?: string;
}
```

---

For more information, visit: https://quantranet.com
