# QuantraNet PQC MCP Server

A production-grade Model Context Protocol (MCP) server for quantum-secure internet infrastructure and post-quantum cryptography (PQC) assessment.

**Version:** 1.0.0
**Authors:** QuantraNet — JV of Terranova Defence + CSGA
**License:** CC0-1.0
**Homepage:** https://quantranet.com

## Overview

QuantraNet provides comprehensive post-quantum cryptography assessment, migration planning, and compliance checking to help organizations prepare for the quantum computing era. The MCP server integrates with Claude and other AI systems to deliver expert-level PQC consulting capabilities.

### Market Context

The global PQC market is projected to grow from USD 1.35B (2023) to USD 22.68B by 2033, representing a 42% CAGR. This growth is driven by:

- White House OMB M-23-02 mandate requiring agencies to migrate to post-quantum cryptography by 2030
- NIST standardization of PQC algorithms (FIPS 203-206)
- NSA CNSA 2.0 Post-Quantum Cryptographic Transition Plan
- EU Cyber Resilience Act requirements
- "Harvest Now, Decrypt Later" threat from quantum-capable adversaries

## Features

### 1. PQC Readiness Assessment (`quantranet_pqc_assess`)

Evaluates an organization's quantum cryptography readiness with comprehensive analysis:

**Inputs:**
- Organization name and profile
- Current cryptographic algorithms in use
- Industry sector and data sensitivity level
- Organization size (optional)
- Current crypto investment (optional)

**Outputs:**
- PQC readiness score (0-100)
- Risk level classification (critical, high, medium, low)
- Vulnerable algorithms identified with quantum threat timelines
- NIST PQC migration recommendations (CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+, FALCON)
- Estimated migration timeline (phased breakdown)
- Cost range estimate for full migration
- Key findings and immediate next steps

**Example Use Case:**
```bash
quantranet_pqc_assess(
  organizationName: "TechCorp Financial",
  cryptoAlgorithmsInUse: ["RSA-2048", "ECDSA-256", "AES-128"],
  sector: "finance",
  dataSensitivityLevel: "critical"
)
```

### 2. Cryptographic Audit (`quantranet_crypto_audit`)

Detailed cryptographic algorithm vulnerability assessment:

**Inputs:**
- List of algorithms with key sizes and protocols
- Detailed analysis flag (optional)

**Outputs:**
- Individual algorithm vulnerability assessments
- Overall vulnerability level
- Quantum computing threat timeline (CRQC, cryptanalysis, HNDL)
- Migration priority ranking (1-5)
- Alternative algorithms for each vulnerable system

**Example:**
```bash
quantranet_crypto_audit(
  algorithms: [
    { name: "RSA-2048", keySize: 2048, protocol: "TLS 1.3" },
    { name: "AES-256", keySize: 256, protocol: "AES-GCM" }
  ],
  detailedAnalysis: true
)
```

### 3. Migration Planning (`quantranet_migration_plan`)

Comprehensive phased migration roadmap:

**Inputs:**
- Organization size and sector
- Cryptographic inventory
- Compliance requirements (NIST, White House, CNSA, EU)
- Budget and timeline preferences

**Outputs:**
- 6-phase migration plan:
  - Discovery (cryptographic inventory)
  - Assessment (threat analysis)
  - Planning (roadmap development)
  - Pilot (controlled testing)
  - Deployment (production rollout)
  - Monitoring (ongoing security)
- Hybrid cryptography recommendations (classical + PQC)
- Resource requirements (personnel, technology, training)
- Compliance timeline for all regulations
- Risk mitigation strategies with responsibilities
- Total cost estimates

### 4. Quantum Threat Modeling (`quantranet_threat_model`)

"Harvest Now, Decrypt Later" (HNDL) risk assessment:

**Inputs:**
- Data type and sensitivity
- Storage duration
- Adversary capability estimate
- Risk assessment flag

**Outputs:**
- HNDL risk level and vulnerability timeframe
- Quantum computing timeline estimates
- Recommended protection date
- Targeted countermeasures with costs
- Compliance requirements (regulatory)

**HNDL Context:** Adversaries harvest encrypted data today, then decrypt it once quantum computers become available. Long-term sensitive data is at critical risk.

### 5. Compliance Checking (`quantranet_compliance_check`)

Multi-framework regulatory compliance assessment:

**Inputs:**
- Sector and jurisdiction
- Current cryptographic implementations (optional)

**Outputs:**
- Compliance status for:
  - NIST SP 800-208 (PQC guidance)
  - White House OMB M-23-02 (Federal mandate)
  - CNSA 2.0 (National security)
  - EU Cyber Resilience Act
- Gap analysis and recommendations
- Required actions with timelines and responsibilities
- Critical compliance deadline

### 6. Algorithm Recommendation (`quantranet_algorithm_recommend`)

NIST-approved PQC algorithm selection guidance:

**Inputs:**
- Use case (key exchange, digital signature, encryption)
- Performance requirements (low latency, balanced, maximum security)
- Platform constraints (embedded, mobile, server, IoT)
- Quantum security level (128, 192, 256-bit)

**Outputs:**
- Recommended algorithms with pros/cons
- Performance benchmarks (key generation, encryption, decryption)
- Implementation libraries with maturity levels
- Hybrid approach recommendations
- Migration path (6+ steps)

**Standardized Algorithms:**
- **Key Exchange:** ML-KEM (FIPS 203), CRYSTALS-Kyber
- **Digital Signatures:** ML-DSA (FIPS 204), SLH-DSA (FIPS 205), FALCON (FIPS 206)
- **Hybrid Encryption:** ML-KEM + AES-256-GCM

## Installation

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Setup

```bash
# Clone or download the server
cd /path/to/quantranet-pqc

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run the server
npm run dev
```

### Integration with Claude

Add to your Claude configuration or MCP launcher:

```json
{
  "mcpServers": {
    "quantranet-pqc": {
      "command": "node",
      "args": ["/path/to/quantranet-pqc/dist/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## Architecture

### Project Structure

```
quantranet-pqc/
├── src/
│   ├── index.ts                 # Main MCP server entry point
│   ├── types.ts                 # TypeScript types, schemas, and database
│   └── tools/
│       ├── assessment.ts        # PQC readiness assessment
│       ├── audit.ts             # Cryptographic audit
│       ├── migration.ts         # Migration planning
│       ├── threat.ts            # Threat modeling
│       ├── compliance.ts        # Compliance checking
│       └── algorithms.ts        # Algorithm recommendations
├── package.json
├── tsconfig.json
└── README.md
```

### Technology Stack

- **Framework:** Model Context Protocol SDK v1.0+
- **Language:** TypeScript 5.3+
- **Validation:** Zod (type-safe schema validation)
- **Runtime:** Node.js 18+

## NIST PQC Standards Reference

### FIPS 203: ML-KEM (Key Encapsulation Mechanism)

**Status:** Standardized (November 2024)
**Category:** Key Exchange
**Variants:** ML-KEM-512, ML-KEM-768, ML-KEM-1024
**Based on:** CRYSTALS-Kyber (Lattice-based)
**Key Sizes:** 1184 bytes (public), 2400 bytes (private)
**Ciphertext Size:** 768 bytes
**Performance:** ~100 microseconds key generation, ~150-200 microseconds encapsulation/decapsulation
**Use Cases:** TLS/SSL, HTTPS, VPN key exchange, hybrid deployments

### FIPS 204: ML-DSA (Digital Signature Algorithm)

**Status:** Standardized (November 2024)
**Category:** Digital Signatures
**Variants:** ML-DSA-44, ML-DSA-65, ML-DSA-87
**Based on:** CRYSTALS-Dilithium (Lattice-based)
**Key Sizes:** 1312 bytes (public), 2544 bytes (private)
**Signature Size:** 2420 bytes
**Performance:** ~300 microseconds key generation, ~400 microseconds signing, ~500 microseconds verification
**Use Cases:** Code signing, document signatures, certificate generation, authentication

### FIPS 205: SLH-DSA (Hash-Based Digital Signature)

**Status:** Standardized (November 2024)
**Category:** Digital Signatures
**Based on:** SPHINCS+ (Hash-based, stateless)
**Key Sizes:** 32 bytes (public), 64 bytes (private)
**Signature Size:** 17,408 bytes (conservative, includes internal structure)
**Characteristics:** Stateless, highly conservative security proof
**Use Cases:** Long-term archives, offline signatures, stateless applications

### FIPS 206: FALCON (Lattice-based Signature)

**Status:** Standardized (February 2024)
**Category:** Digital Signatures
**Variants:** FALCON-512, FALCON-1024
**Based on:** NTRU lattice problem
**Key Sizes:** 897 bytes (public, 512), 1281 bytes (private, 512)
**Signature Size:** 666 bytes (very compact)
**Performance:** Very fast signature generation (~300 microseconds)
**Use Cases:** Bandwidth-critical applications, embedded systems, certificate signatures

## Regulatory Framework

### White House OMB M-23-02 Mandate

**Deadline:** December 31, 2030
**Scope:** All U.S. federal agencies
**Requirements:**
- Inventory all cryptographic systems
- Migrate to NIST-approved PQC algorithms
- Implement crypto agility capabilities
- Annual progress reporting

**Estimated Cost:** USD 7.1 billion government-wide investment

### CNSA 2.0 (Commercial National Security Algorithm Suite 2.0)

**Scope:** U.S. defense, national security systems
**Timeline:** Accelerated (2025-2028)
**Approved Algorithms:**
- ML-KEM/CRYSTALS-Kyber (key exchange)
- ML-DSA/CRYSTALS-Dilithium (signatures)
- SLH-DSA/SPHINCS+ (backup signatures)

### NIST SP 800-208

**Status:** Guideline available (2023)
**Content:** Post-Quantum Cryptography Implementation Guidance
**Coverage:** Algorithm selection, migration strategies, hybrid approaches
**Availability:** https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf

### EU Cyber Resilience Act

**Effective Date:** December 10, 2024 (implementation by December 10, 2027)
**Scope:** Digital products sold in EU
**PQC Requirements:** Post-quantum cryptography readiness and transition planning
**Penalties:** Up to 5% of global annual turnover for non-compliance

## Hybrid Cryptography Strategy

QuantraNet recommends a hybrid approach during the transition period:

### Key Exchange (TLS Example)

```
Classical + PQC Handshake:
1. Client initiates with both ECDH and ML-KEM key shares
2. Server responds with both ECDH and ML-KEM key shares
3. Both classical and PQC shared secrets are generated
4. Final TLS key = KDF(ECDH_secret || ML-KEM_secret)
5. Result: Security against both classical and quantum adversaries
```

**Rationale:**
- ECDH provides immediate security against quantum threats
- ML-KEM provides proven post-quantum security
- Combined approach provides defense-in-depth during algorithm transition
- Can transition to ML-KEM only once standards mature (2026+)

### Digital Signatures (Dual-Signature Example)

```
Dual-Signature Approach:
1. Create both RSA and ML-DSA signatures on critical documents
2. Verification requires at least one valid signature
3. Maintains compatibility during transition period
4. Protects against future algorithm compromise

Timeline:
- 2024-2025: Dual signatures (classical + PQC)
- 2026-2027: Majority PQC signatures with classical fallback
- 2028+: PQC-only signatures (classical deprecated)
```

## Quantum Timeline Estimates

### Cryptographically Relevant Quantum Computer (CRQC)

- **Conservative Estimate:** 15-20 years (mid-to-late 2030s)
- **Aggressive Estimate:** 10-12 years (early 2030s)
- **NSA Assessment:** "Within 10-20 years is possible"

### Harvest Now, Decrypt Later Window

- **Risk Period:** NOW through CRQC deployment
- **Data at Risk:** All long-term sensitive data encrypted with classical crypto
- **Mitigation:** Deploy PQC encryption NOW
- **Timeline:** Critical window closes in 5-10 years

### Recommended PQC Deployment Timeline

```
2024-2025: Pilot deployments, hybrid crypto in non-critical systems
2025-2026: Broad hybrid deployment, standards stabilization
2026-2027: Production PQC in critical systems, classical fallback maintained
2027-2028: Majority PQC, classical graceful deprecation
2028-2030: Full PQC migration (exceeds White House deadline)
2030+: Classical cryptography fully deprecated
```

## Performance Considerations

### Algorithm Performance Comparison

| Algorithm | Operation | Time | Key Size | Signature Size |
|-----------|-----------|------|----------|-----------------|
| ML-KEM | Encapsulation | ~150μs | 1184B | 768B ciphertext |
| ML-DSA | Sign | ~400μs | 1312B | 2420B |
| | Verify | ~500μs | | |
| FALCON | Sign | ~300μs | 897B | 666B |
| | Verify | ~400μs | | |
| SLH-DSA | Sign | ~3ms | 32B | 17KB |
| | Verify | ~500μs | | |

### Implementation Strategies

1. **High-Performance:** FALCON for signature size/speed
2. **Balanced:** ML-KEM/ML-DSA for standardization + performance
3. **Conservative:** SLH-DSA for maximum security proof strength
4. **Constrained:** Kyber512 for embedded/IoT environments

## Resource Requirements

### Personnel

- **Small Orgs:** 1 crypto expert, 2 engineers, 1 PM
- **Medium Orgs:** 2 crypto experts, 4 engineers, 2 PMs
- **Large Orgs:** 4 crypto experts, 8 engineers, 3 PMs
- **Enterprise:** 8+ crypto experts, 16+ engineers, 5+ PMs

### Technology

- NIST PQC reference implementations
- liboqs (Open Quantum Safe library) - C with Python/Go bindings
- Crypto testing frameworks
- Performance benchmarking tools
- Deployment and monitoring infrastructure

### Training

- 16 hours per employee minimum
- Specializations:
  - PQC fundamentals
  - Hybrid crypto implementation
  - Key management for PQC
  - Compliance and standards
  - Performance optimization

## Cost Estimates

### Typical Migration Costs

- **Small (50-500 employees):** USD 150K - 400K
- **Medium (500-5K employees):** USD 500K - 2.5M
- **Large (5K-50K employees):** USD 2.5M - 10M
- **Enterprise (50K+ employees):** USD 10M - 40M+

**Cost Drivers:**
- Crypto system complexity
- Legacy system constraints
- Hybrid approach duration
- Compliance requirements
- Industry sector (defense/finance = higher cost)

## Implementation Libraries

### C/C++

- **liboqs** (MIT, production)
  - All NIST algorithms
  - Bindings: Python, Go, Java, .NET
  - GitHub: https://github.com/open-quantum-safe/liboqs

- **OpenSSL 3.x** (Apache 2.0, production)
  - ML-KEM and ML-DSA integration
  - TLS support in development

### Rust

- **RustCrypto** (MIT/Apache-2.0, stable)
  - Pure Rust implementations
  - No external dependencies

### Python

- **liboqs-python** (MIT, stable)
  - Bindings to liboqs
  - Pure Python alternatives in development

### Go

- **liboqs-go** (MIT, stable)
  - Bindings to liboqs

### JavaScript/Node.js

- **liboqs-node** (MIT, beta)
  - Native bindings to liboqs

## API Examples

### PQC Assessment

```typescript
const result = await client.tools.call({
  name: 'quantranet_pqc_assess',
  arguments: {
    organizationName: 'TechCorp',
    cryptoAlgorithmsInUse: ['RSA-2048', 'ECDSA-256', 'AES-256'],
    sector: 'finance',
    dataSensitivityLevel: 'critical',
    organizationSize: 'large'
  }
});

// Result includes:
// - readinessScore (0-100)
// - riskLevel (critical/high/medium/low)
// - vulnerableAlgorithms with migration priority
// - nistRecommendations (ML-KEM, ML-DSA, etc.)
// - estimatedMigrationTimeline (discovery, assessment, planning, implementation)
// - costRange with low/high estimates
// - keyFindings and nextSteps
```

### Compliance Check

```typescript
const result = await client.tools.call({
  name: 'quantranet_compliance_check',
  arguments: {
    sector: 'defense',
    jurisdiction: 'US',
    currentImplementations: ['RSA-2048', 'ECDSA-384', 'AES-256']
  }
});

// Result includes compliance status for:
// - NIST SP 800-208
// - White House OMB M-23-02
// - CNSA 2.0 (NSA)
// - EU Cyber Resilience Act
// Plus recommendations, required actions, and deadlines
```

### Algorithm Recommendation

```typescript
const result = await client.tools.call({
  name: 'quantranet_algorithm_recommend',
  arguments: {
    useCase: 'key_exchange',
    performanceRequirements: 'balanced',
    platformConstraints: ['server'],
    quantumSecurityLevel: '256_bit'
  }
});

// Result includes:
// - Recommended algorithms (ML-KEM primary, alternatives)
// - Performance benchmarks (timing, key sizes)
// - Implementation libraries with maturity levels
// - Hybrid approach summary
// - Migration path (6+ steps)
```

## Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch build
npm run dev

# Type checking
npm run type-check
```

## Security Considerations

1. **Algorithm Validation:** All recommendations based on NIST official standards (FIPS 203-206)
2. **No Backdoors:** Open-source reference implementations used
3. **Crypto Agility:** Migration paths designed for algorithm flexibility
4. **Hybrid Defense:** Recommendations pair classical + PQC for transition period
5. **Compliance Alignment:** Recommendations align with government/regulatory mandates

## Limitations & Future Work

### Current Limitations

- No real-time quantum computing threat assessment
- Simplified cost models (actual costs vary significantly)
- Limited to NIST-standardized algorithms (by design)
- Assumes conventional quantum computing threat model

### Future Roadmap

- Integration with cryptographic hardware (HSM/TPM) assessments
- Real-time HNDL risk monitoring capabilities
- Quantum-safe supply chain security evaluation
- Post-quantum secure blockchain assessment
- Quantum-resistant cryptographic agility metrics

## Support & Consulting

For implementation support, architecture review, or consulting services:

- **QuantraNet:** https://quantranet.com
- **Terranova Defence:** https://terranova.ca
- **CSGA:** Contact through QuantraNet partnership

## References

### Standards & Guidelines

- NIST Special Publication 800-208: Post-Quantum Cryptography Implementation Guidance
- FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM)
- FIPS 204: Module-Lattice-Based Digital Signature Algorithm (ML-DSA)
- FIPS 205: Stateless Hash-Based Digital Signature Algorithm (SLH-DSA)
- FIPS 206: Lattice-Based Digital Signature Algorithm (FALCON)

### Regulations

- White House OMB M-23-02: Memorandum on Quantum Cybersecurity
- CNSA 2.0: Commercial National Security Algorithm Suite 2.0
- EU Cyber Resilience Act (2024)
- FDA Medical Device Cybersecurity Guidance

### Research

- Original NIST PQC Competition: https://csrc.nist.gov/projects/post-quantum-cryptography/
- Open Quantum Safe Project: https://openquantumsafe.org/
- Quantum Threat Timeline: https://csis.org/analysis/quantum-computing-and-post-quantum-cryptography

## License

CC0 1.0 Universal - Public Domain dedication. Use freely for any purpose.

## Citation

```bibtex
@software{quantranet_pqc_2024,
  title={QuantraNet PQC MCP Server},
  author={QuantraNet},
  year={2024},
  version={1.0.0},
  url={https://quantranet.com}
}
```

---

**QuantraNet** — Making cryptography quantum-safe for the future.

For the latest updates and documentation, visit: https://quantranet.com
