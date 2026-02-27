# QuantraNet PQC MCP Server - Architecture & Implementation Guide

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Claude AI / MCP Client                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│          MCP Server Transport (stdio)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         QuantraNet PQC MCP Server (src/index.ts)            │
├─────────────────────────────────────────────────────────────┤
│  Tool Router & Request Handler                              │
│  ├─ Tool Schema Validation (Zod)                            │
│  ├─ Tool Invocation Routing                                 │
│  └─ Response Formatting                                     │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌─────────┐     ┌──────────┐    ┌──────────────┐
   │Assessment│     │Audit    │    │Migration Plan│
   │Tools    │     │Tools     │    │Tools        │
   └─────────┘     └──────────┘    └──────────────┘
        │                ▼                ▼
        │           ┌──────────┐    ┌──────────────┐
        │           │Threat    │    │Compliance    │
        │           │Tools     │    │Tools         │
        │           └──────────┘    └──────────────┘
        │                │                ▼
        │                │           ┌──────────────┐
        └────────────────┼──────────▶│Algorithm     │
                         │           │Tools         │
                         │           └──────────────┘
                         ▼
        ┌────────────────────────────────────────┐
        │   Shared Types & Schemas (types.ts)    │
        ├────────────────────────────────────────┤
        │  • Zod Validation Schemas              │
        │  • Response Type Definitions           │
        │  • NIST Algorithm Database             │
        │  • Enumeration Definitions             │
        └────────────────────────────────────────┘
```

### Data Flow

```
User Request (via Claude)
        │
        ▼
MCP Server validates input against Zod schema
        │
        ▼
Tool handler invokes appropriate function
        │
        ▼
Function processes request with business logic
        │
        ├─ Perform calculations/assessments
        ├─ Apply regulatory frameworks
        ├─ Generate recommendations
        └─ Format output data
        │
        ▼
Results converted to JSON response
        │
        ▼
Returned to Claude client for display/analysis
```

## Module Structure

### 1. Core Entry Point: `src/index.ts`

**Responsibilities:**
- Initialize MCP Server with metadata
- Define tool schemas (JSON Schema format)
- Register request handlers
- Route tool calls to implementations
- Handle errors and format responses

**Key Components:**
```typescript
- Server initialization with name/version
- ListToolsRequestSchema handler → returns all tools
- CallToolRequestSchema handler → routes to tool functions
- Error handling with Zod validation
- JSON response formatting
```

**Tool Definitions:**
1. `quantranet_pqc_assess` - PQC readiness assessment
2. `quantranet_crypto_audit` - Algorithm audit
3. `quantranet_migration_plan` - Migration planning
4. `quantranet_threat_model` - Quantum threat modeling
5. `quantranet_compliance_check` - Regulatory compliance
6. `quantranet_algorithm_recommend` - Algorithm selection

### 2. Types & Schemas: `src/types.ts`

**Responsibility:** Single source of truth for all data structures

**Components:**

#### Enumerations
```typescript
- Sector (finance, healthcare, defense, energy, etc.)
- DataSensitivityLevel (low, medium, high, critical)
- PQCAlgorithmType (key_exchange, digital_signature, encryption)
- Jurisdiction (US, EU, UK, APAC, CANADA, GLOBAL)
- MigrationPhase (discovery, assessment, planning, pilot, deployment, monitoring)
```

#### Zod Validation Schemas
```typescript
- PQCAssessmentInputSchema
- CryptoAuditInputSchema
- MigrationPlanInputSchema
- ThreatModelInputSchema
- ComplianceCheckInputSchema
- AlgorithmRecommendationInputSchema
```

#### Response Type Definitions
```typescript
- PQCAssessmentResult
- CryptoAuditResult
- MigrationPlanResult
- ThreatModelResult
- ComplianceCheckResult
- AlgorithmRecommendationResult
- [All supporting nested types]
```

#### NIST Algorithm Database
```typescript
NIST_APPROVED_ALGORITHMS = {
  'CRYSTALS-Kyber': { FIPS 203, key_exchange, ... },
  'CRYSTALS-Dilithium': { FIPS 204, digital_signature, ... },
  'SPHINCS+': { FIPS 205, digital_signature, ... },
  'FALCON': { FIPS 206, digital_signature, ... },
  'RSA-2048': { Deprecated, vulnerable, ... },
  'ECDSA-256': { Deprecated, vulnerable, ... },
  ...
}
```

### 3. Tool Implementations: `src/tools/`

#### `assessment.ts` - PQC Readiness Assessment
**Functions:**
- `assessPQCReadiness(input)` - Main assessment logic
- `analyzeAlgorithms(algorithms)` - Vulnerability analysis per algorithm
- `getSensitivityMultiplier(level)` - Data sensitivity weighting
- `getSectorMultiplier(sector)` - Industry-specific adjustments
- `getNistRecommendations(algorithms)` - NIST PQC recommendations
- `estimateMigrationTimeline(size, algoCount)` - Timeline projection
- `estimateCosts(size, sector, algoCount)` - Cost estimation
- `generateKeyFindings(vulnAlgos, score, sensitivity)` - Summary findings
- `generateNextSteps(riskLevel, sector)` - Action items

**Algorithm Analysis:**
- Classical algorithms (RSA, ECDSA, DES) → quantum vulnerable
- Vulnerability severity: critical (5 yrs), high (5-10 yrs), medium (10-20 yrs)
- Migration priority ranking based on threat level

**Scoring Methodology:**
```
base_score = 100
vulnerability_penalty = vulnerable_count * 20
sensitivity_multiplier = 0.1 to 0.6 (low to critical)
sector_multiplier = 0.05 to 0.2 (education to defense)

readinessScore = (base_score - penalty) * (1 - sensitivity_mult) * (1 + sector_mult)
```

#### `audit.ts` - Cryptographic Audit
**Functions:**
- `performCryptoAudit(input)` - Main audit logic
- `assessAlgorithm(name, keySize, protocol, context)` - Individual algorithm assessment
- `calculateMigrationPriority(algorithm)` - Priority ranking
- `getAlternatives(algorithm)` - Recommended replacements
- `generatePriorityRanking(assessments)` - Overall ranking
- `estimateQuantumThreatTimeline()` - Quantum timeline estimates
- `generateDetailedAuditReport(result)` - Formatted audit report

**Threat Assessment:**
- CRQC timeline: 15 years (conservative)
- HNDL window: 5 years (data already at risk)
- Deprecation dates calculated per algorithm

#### `migration.ts` - Migration Planning
**Functions:**
- `generateMigrationPlan(input)` - Main migration plan logic
- `generateMigrationPhases(size, sector, assets, timeline)` - 6-phase planning
- `generateHybridApproach(sector)` - Hybrid crypto strategy
- `calculateResourceRequirements(size, sector, phases)` - Resource planning
- `generateComplianceTimeline(requirements)` - Regulatory deadlines
- `generateRiskMitigationStrategies(sector)` - Risk management

**6-Phase Migration Model:**
1. **Discovery (2-4 months):** Complete cryptographic inventory
2. **Assessment (3-5 months):** Threat analysis, performance testing
3. **Planning (2-4 months):** Roadmap, governance, budget
4. **Pilot (3-6 months):** Non-critical system testing
5. **Deployment (6-12 months):** Production rollout
6. **Monitoring (3+ months):** Continuous security/compliance

**Hybrid Approach:**
```
Classical + PQC dual deployment
├─ Key Exchange: ECDH + ML-KEM
├─ Signatures: RSA/ECDSA + ML-DSA
└─ Final key = KDF(classical_secret || pqc_secret)

Transition period: Sector-dependent (12-24 months typical)
```

#### `threat.ts` - Quantum Threat Modeling
**Functions:**
- `modelQuantumThreat(input)` - Main threat analysis
- `assessHarvestNowDecryptLater(dataType, duration)` - HNDL risk assessment
- `generateHNDLDetails(dataType, duration, riskLevel)` - Risk narrative
- `estimateQuantumTimeline(adversaryCapability)` - CRQC timeline
- `generateCountermeasures(dataType, duration, capability)` - Mitigation options
- `getComplianceRequirements(dataType)` - Regulatory requirements
- `generateThreatAssessmentSummary(threat)` - Formatted report

**HNDL Risk Factors:**
- Data sensitivity + Storage duration = Risk level
- State-level adversaries: 10-year CRQC timeline
- Advanced adversaries: 15-year CRQC timeline
- Theoretical threat: 20-year CRQC timeline

**Risk Matrix:**
```
                 Short-term  Medium-term  Long-term  Indefinite
Low value           Low         Low        Medium     Medium
Medium value        Low        Medium       High       High
High value        Medium       High        High       Critical
Critical value     High        High       Critical   Critical
```

#### `compliance.ts` - Compliance Checking
**Functions:**
- `checkPQCCompliance(input)` - Main compliance check
- `determineComplianceStatus(sector, jurisdiction, implementations)` - Status per framework
- `generateComplianceRecommendations(sector, jurisdiction, statuses)` - Gap analysis
- `generateRequiredActions(sector, jurisdiction)` - Action items
- `determineCriticalDeadline(jurisdiction)` - Regulatory deadline
- `generateComplianceReport(compliance)` - Formatted report

**Regulatory Frameworks:**
1. **NIST SP 800-208:** Post-Quantum Cryptography Implementation Guidance
   - Status: Published (2023)
   - Scope: Federal agencies, contractors, commercial orgs
   - Compliance: COMPLIANT if PQC algorithms deployed

2. **White House OMB M-23-02:** Migration to Post-Quantum Cryptography
   - Deadline: December 31, 2030
   - Scope: All US federal agencies
   - Budget: USD 7.1B government-wide
   - Status: CRITICAL (federal mandate)

3. **CNSA 2.0:** Commercial National Security Algorithm Suite 2.0
   - Deadline: December 31, 2028 (accelerated for defense)
   - Scope: Defense, national security systems
   - Algorithms: NSA-approved only
   - Status: CRITICAL (national security)

4. **EU Cyber Resilience Act:**
   - Effective: December 10, 2024
   - Deadline: December 10, 2027
   - Scope: All digital products sold in EU
   - Penalties: Up to 5% global revenue
   - Status: REGULATORY (EU law)

#### `algorithms.ts` - Algorithm Recommendation
**Functions:**
- `recommendPQCAlgorithms(input)` - Main recommendation logic
- `selectRecommendedAlgorithms(useCase, performance, constraints)` - Algorithm selection
- `generatePerformanceBenchmarks(algorithms)` - Performance data
- `getImplementationLibraries(algorithms)` - Library recommendations
- `generateHybridApproachSummary(useCase)` - Hybrid strategy
- `generateMigrationPath(useCase)` - Implementation timeline
- `generateAlgorithmSelectionGuide(recommendations)` - Formatted guide

**Algorithm Recommendations by Use Case:**

**Key Exchange:**
- Primary: ML-KEM (CRYSTALS-Kyber, FIPS 203)
  - Security level: 3/5
  - Key size: 1184 bytes (public), 2400 bytes (private)
  - Ciphertext: 768 bytes
  - Performance: ~150 microseconds encapsulation

- Alternative (Constrained): Kyber512
  - Reduced key/ciphertext sizes
  - For embedded/IoT environments

**Digital Signature:**
- Primary: ML-DSA (CRYSTALS-Dilithium, FIPS 204)
  - Signature size: 2420 bytes
  - Performance: ~400 microseconds signing

- Conservative: SLH-DSA (SPHINCS+, FIPS 205)
  - Stateless, maximum security proof
  - Larger signatures (17 KB)

- High-Performance: FALCON (FIPS 206)
  - Compact signatures (666 bytes)
  - Fast signing (~300 microseconds)

**Encryption:**
- Hybrid: ML-KEM + AES-256-GCM
  - PQC key exchange + classical symmetric encryption
  - Best of both worlds approach

**Implementation Libraries:**
- **C:** liboqs (MIT, production)
- **Rust:** RustCrypto (MIT/Apache-2.0, stable)
- **Python:** liboqs-python (MIT, stable)
- **Go:** liboqs-go (MIT, stable)
- **Node.js:** liboqs-node (MIT, beta)

## Error Handling Strategy

### Validation Layer (Zod)

```typescript
try {
  const input = PQCAssessmentInputSchema.parse(args);
  // Process validated input
} catch (error) {
  return {
    isError: true,
    content: [{
      type: 'text',
      text: `Validation error: ${error.message}`
    }]
  };
}
```

**Validation ensures:**
- Required fields present
- Correct data types
- Valid enum values
- Reasonable numeric ranges

### Business Logic Errors

All functions include defensive checks:
- Algorithm database lookups with defaults
- Safe arithmetic (no division by zero)
- Graceful handling of unknown sectors/jurisdictions
- Fallback recommendations

## Performance Considerations

### Algorithm Database Lookup: O(1)
```typescript
const algoInfo = NIST_APPROVED_ALGORITHMS[algorithm];
// Direct hash table access
```

### Scoring Calculations: O(n)
```typescript
// n = number of algorithms
const vulnerableCount = algorithms.filter(...).length;
const score = calculateScore(vulnerableCount);
```

### Assessment Complexity: O(n)
```typescript
// Analyze each algorithm once
algorithms.forEach(algo => assessAlgorithm(algo));
```

**Overall Time Complexity:** O(n) where n = number of algorithms
**Expected Response Time:** <200ms for typical assessment

## Security Considerations

### No Sensitive Data Handling
- No cryptographic key storage
- No credential input (design choice)
- No actual encryption/decryption operations
- Assessment and planning only

### Input Validation
- All inputs validated against Zod schemas
- String length limits enforced
- Numeric ranges checked
- Enum values verified

### Output Safety
- No system information leakage
- No hardcoded credentials
- No external API calls
- Deterministic, reproducible results

## Testing Strategy

### Unit Testing (Jest)
```typescript
describe('assessPQCReadiness', () => {
  it('should calculate correct readiness score', () => {
    const result = assessPQCReadiness({
      organizationName: 'Test',
      cryptoAlgorithmsInUse: ['RSA-2048'],
      sector: 'finance',
      dataSensitivityLevel: 'critical'
    });
    expect(result.readinessScore).toBeLessThan(50);
  });
});
```

### Integration Testing
- Test MCP server with full request/response cycle
- Verify tool routing works correctly
- Validate schema enforcement

### Performance Testing
- Measure response times
- Test with large algorithm lists
- Benchmark calculations

## Deployment

### Prerequisites
```bash
Node.js 18.0.0+
npm or yarn
```

### Installation
```bash
npm install
npm run build
npm run dev
```

### Production Deployment
```bash
npm run build
# Run via MCP launcher or stdio transport
NODE_ENV=production node dist/index.js
```

### Configuration
- No environment variables required
- All settings in code/schema
- Database (NIST algorithms) embedded

## Future Enhancement Opportunities

### Phase 2 Features
- Hardware security module (HSM) assessment
- Real-time threat monitoring
- Cryptographic agility metrics
- Supply chain security evaluation
- Blockchain quantum-safety assessment
- Performance optimization caching

### Phase 3 Features
- Integration with actual crypto libraries
- Live algorithm performance testing
- Automated audit report generation
- Continuous compliance monitoring
- Integration with NIST database APIs

### Phase 4 Features
- Quantum risk quantification
- ROI calculator for PQC investment
- Cost-benefit analysis modeling
- Stakeholder reporting templates
- Training material generation

## Code Quality Metrics

### TypeScript Configuration
- Strict mode enabled
- No implicit any
- All functions typed
- Full null checks
- Unused variable detection

### Architecture Patterns
- Functional programming (pure functions)
- Single responsibility principle
- Immutable data structures
- Clear separation of concerns

### Code Organization
- One tool per file
- Types in centralized location
- Consistent naming conventions
- Comprehensive documentation

## Maintenance & Support

### Version Management
- Semantic versioning (major.minor.patch)
- Current version: 1.0.0
- Breaking changes require major version bump

### Dependency Management
- Minimal dependencies (@modelcontextprotocol/sdk, zod)
- Regular security updates
- Compatibility with Node.js 18+

### Documentation
- Comprehensive README
- API examples (EXAMPLES.md)
- Architecture documentation (this file)
- Inline code comments for complex logic

---

**For deployment and integration support, contact:**
- QuantraNet: https://quantranet.com
- Terranova Defence: https://terranova.ca
