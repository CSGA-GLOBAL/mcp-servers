# CSOAI AI Governance MCP Server - Architecture Documentation

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MCP Client Layer                         │
│     (ChatGPT, Claude, Gemini, Cursor, VS Code, etc.)       │
└────────────────────────┬────────────────────────────────────┘
                         │
                    StdioServerTransport
                         │
┌────────────────────────▼────────────────────────────────────┐
│              CSOAI Governance MCP Server                    │
│                   (src/index.ts)                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  6 Tool Handlers                                     │  │
│  │  ├─ crosswalk_lookup                               │  │
│  │  ├─ charter_lookup                                 │  │
│  │  ├─ casa_assessment                                │  │
│  │  ├─ sector_compliance                              │  │
│  │  ├─ risk_assessment                                │  │
│  │  └─ incident_response                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  3 Resource Handlers                                │  │
│  │  ├─ csoai://crosswalks/index                        │  │
│  │  ├─ csoai://charter/index                           │  │
│  │  └─ csoai://tools/guide                             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬──────────────────────┬───────────────────────┘
             │                      │
    ┌────────▼────────┐    ┌────────▼─────────┐
    │  Tool Modules   │    │  Resource Data   │
    │  (src/tools/)   │    │  (src/resources/)│
    │                 │    │                  │
    │ • crosswalk     │    │ • crosswalks.ts  │
    │ • charter       │    │ • charter.ts     │
    │ • casa-assess   │    │                  │
    │ • sector        │    │  25 Crosswalks   │
    │ • risk          │    │  52 Charter      │
    │ • incident      │    │  Articles        │
    └─────────────────┘    └──────────────────┘
```

## Component Details

### 1. Main Server (src/index.ts)

**Responsibilities:**
- Initialize MCP server with metadata
- Register all 6 tools with the MCP protocol
- Register 3 resources for information access
- Establish stdio transport for client communication
- Handle tool invocations and dispatch to handlers

**Key Functions:**
- `server.tool()` - Register tool with schema and handler
- `server.resource()` - Register resource with generator function
- `server.connect()` - Establish stdio transport

**Metadata:**
```typescript
name: "csoai-governance-mcp"
version: "1.0.0"
description: "CSOAI AI Governance Suite..."
```

### 2. Tool Modules (src/tools/)

#### 2.1 crosswalk-lookup.ts
**Purpose:** Look up 25 international AI governance frameworks

**Input Schema:**
```typescript
interface CrosswalkLookupSchema {
  crosswalk_id: string  // CW-01 to CW-25
}
```

**Processing:**
1. Normalize crosswalk ID (uppercase)
2. Validate format (regex: CW-##)
3. Look up in CROSSWALKS database
4. Return framework details with CASA mappings

**Output:**
```typescript
{
  id: string
  name: string
  version: string
  jurisdiction: string
  keyRequirements: string[]
  casaMappings: string[]
  complianceGaps: string[]
  recommendedActions: string[]
}
```

#### 2.2 charter-lookup.ts
**Purpose:** Look up 52 Partnership Charter articles

**Input Schema:**
```typescript
interface CharterLookupSchema {
  article_number: number  // 1-52
}
```

**Processing:**
1. Validate article number (1-52)
2. Look up in CHARTER_ARTICLES database
3. Return article content with key principles

**Output:**
```typescript
{
  number: number
  title: string
  content: string
  keyPrinciples: string[]
}
```

#### 2.3 casa-assess.ts
**Purpose:** Run 4-tier CASA certification assessment

**Input Schema:**
```typescript
interface CasaAssessmentSchema {
  system_name: string
  system_description: string
  deployment_context: string
}
```

**Processing Pipeline:**
1. **Risk Analysis** - Analyze description for risk factors
   - Count high-risk keywords (autonomous, medical, financial, etc.)
   - Count safety-mitigating keywords (monitoring, testing, oversight, etc.)
   - Calculate risk score (0-100)

2. **Tier Determination** - Map risk to CASA tier
   - Score >= 75 → Tier 4 (Byzantine Council Review)
   - Score >= 50 → Tier 3 (Continuous Monitoring)
   - Score >= 25 → Tier 2 (Third-Party Audit)
   - Score < 25 → Tier 1 (Self-Assessment)

3. **Compliance Scoring** - Check for governance elements
   - Weight: risk assessment (15%), testing (15%), monitoring (15%), etc.
   - Calculate percentage compliance

4. **Crosswalk Mapping** - Identify applicable frameworks
   - Match deployment context to framework domains
   - Return relevant CW-## identifiers

5. **Gap Identification** - Find missing governance elements
   - Check for risk assessment, testing, monitoring, etc.
   - Report gaps for each missing element

6. **Pathway Generation** - Create certification roadmap
   - Phase 1: Prepare framework
   - Phase 2: Implement controls
   - Tier-specific phases (audit, monitoring, council review)
   - Phase 6: Certification and compliance

**Output:**
```typescript
{
  systemName: string
  assessmentDate: string
  recommendedTier: 1 | 2 | 3 | 4
  tierDescription: string
  complianceScore: number (0-100)
  applicableCrosswalkIds: string[]
  complianceGaps: string[]
  certificationPathway: string[]
  keyFindings: string[]
  nextSteps: string[]
}
```

#### 2.4 sector-compliance.ts
**Purpose:** Sector-specific compliance assessment

**Input Schema:**
```typescript
interface SectorComplianceSchema {
  sector: enum  // healthcare | financial | military | ...
  system_description: string
}
```

**Sector Specifications** (SECTOR_SPECS):
- Each sector has: requirements, frameworks, risks, mitigations, checklist
- Sector definitions stored in constant object

**Processing:**
1. Look up sector specifications
2. Assess implementation (keywords in description)
3. Calculate compliance score from checklist
4. Return sector-specific analysis

**Output:**
```typescript
{
  sector: string
  complianceRequirements: string[]
  regulatoryFrameworks: string[]
  keyRisks: string[]
  mitigation_strategies: string[]
  compliance_checklist: Array<{
    item: string
    status: "required" | "recommended" | "optional"
    implemented: boolean
  }>
  compliance_score: number
}
```

#### 2.5 risk-assessment.ts
**Purpose:** Risk classification per EU AI Act

**Input Schema:**
```typescript
interface RiskAssessmentSchema {
  system_name: string
  system_description: string
  scope_and_impact: string
}
```

**Risk Calculation:**
1. Base score: 20
2. Add points for high-risk indicators (15 pts each):
   - autonomous decision, medical, criminal justice, employment, etc.
3. Subtract points for safety factors (-5 to -10 pts each):
   - human oversight, monitoring, testing, audit, etc.
4. Clamp to 0-100 range

**Risk Categories:**
- Score >= 80 → Unacceptable (Prohibited AI Practices)
- Score >= 60 → High (High-Risk AI Systems)
- Score >= 35 → Limited (Limited-Risk AI Systems)
- Score < 35 → Minimal (Minimal-Risk AI Systems)

**Risk Identification:**
- Match keywords to risk library
- Return identified risks with severity and impact
- Calculate residual risk assessment

**Output:**
```typescript
{
  systemName: string
  riskCategory: "Unacceptable" | "High" | "Limited" | "Minimal"
  euAiActCategory: string
  riskScore: number
  identifiedRisks: Array<{
    risk: string
    severity: "Critical" | "High" | "Medium" | "Low"
    probability: "High" | "Medium" | "Low"
    impact: string
  }>
  requiredMeasures: string[]
  recommendedMeasures: string[]
  complianceImplications: string[]
  residualRisk: string
}
```

#### 2.6 incident-response.ts
**Purpose:** AI incident response protocol

**Input Schema:**
```typescript
interface IncidentResponseSchema {
  incident_name: string
  incident_description: string
  severity_assessment: "Critical" | "High" | "Medium" | "Low"
}
```

**Severity Refinement:**
1. Count critical indicators (death, injury, mass harm, etc.)
2. Count high indicators (financial loss, service degradation, etc.)
3. Return assessed severity (may override initial assessment)

**Response Generation:**
1. **Immediate Actions** - Severity-based action list
2. **Investigation Steps** - 5-phase investigation plan
3. **Notifications** - Stakeholder matrix with timelines
4. **Documentation** - Required records and reports
5. **Remediation** - Fix and deployment steps
6. **Prevention** - Measures to prevent recurrence
7. **Timeline** - Estimated resolution (72 hrs - 20 days)

**Output:**
```typescript
{
  incidentName: string
  assessedSeverity: "Critical" | "High" | "Medium" | "Low"
  severityRationale: string
  immediateActions: string[]
  investigationSteps: string[]
  notificationRequirements: Array<{
    stakeholder: string
    timeframe: string
    urgency: "Immediate" | "Within 24 hours" | "Within 72 hours"
    required: boolean
  }>
  documenting: string[]
  remediationSteps: string[]
  preventiveMeasures: string[]
  estimatedTimelineHours: number
}
```

### 3. Resource Modules (src/resources/)

#### 3.1 crosswalks.ts
**Purpose:** Store and access 25 framework crosswalk definitions

**Data Structure:**
```typescript
interface Crosswalk {
  id: string                    // CW-01, CW-02, ..., CW-25
  name: string
  version: string
  jurisdiction: string
  keyRequirements: string[]     // Framework requirements
  casaMappings: string[]        // How it maps to CASA tiers
  complianceGaps: string[]      // Common implementation gaps
  recommendedActions: string[]  // What to do to comply
}
```

**Key Functions:**
- `getCrosswalk(id)` - Look up single crosswalk
- `listCrosswalkIds()` - List all 25 identifiers

**Data Coverage:** All 25 frameworks (CW-01 through CW-25)

#### 3.2 charter.ts
**Purpose:** Store and access 52 Partnership Charter articles

**Data Structure:**
```typescript
interface CharterArticle {
  number: number
  title: string
  content: string
  keyPrinciples: string[]
}
```

**Key Functions:**
- `getCharterArticle(number)` - Look up single article
- `listCharterArticles()` - List all 52 articles

**Data Coverage:**
- Articles 1-52 covering all governance principles
- Organized by category (governance, data, stakeholder, risk, operations, advanced)

### 4. Information Flow

#### Tool Request Flow
```
Client
  ↓
MCP Server (index.ts)
  ↓
Tool Router
  ↓
Tool Module (e.g., casa-assess.ts)
  ↓
Handler Function
  ↓
Resource Lookup (crosswalks.ts, charter.ts)
  ↓
Processing Logic
  ↓
Result Generation
  ↓
JSON Response
  ↓
Client
```

#### Resource Request Flow
```
Client
  ↓
MCP Server (index.ts)
  ↓
Resource Router
  ↓
Resource Generator Function
  ↓
Text/Data Generation
  ↓
Client
```

## Error Handling

### Tool Error Handling

Each tool module includes:
1. Input validation using Zod schemas
2. Try-catch blocks in handler functions
3. Descriptive error messages
4. Graceful degradation (return null or empty arrays)

### Schema Validation

All input uses Zod schemas:
```typescript
export const CrosswalkLookupSchema = z.object({
  crosswalk_id: z.string().describe(...)
});
```

## Data Model Design

### Crosswalk Data Model

Each crosswalk captures:
1. **Identification** - ID, name, version
2. **Scope** - Jurisdiction and applicability
3. **Content** - Key requirements and principles
4. **Integration** - CASA mapping and compliance guidance
5. **Gaps** - Common implementation gaps
6. **Actions** - Recommended remediation steps

### Charter Data Model

Each article covers:
1. **Title** - Clear, descriptive heading
2. **Content** - Full principle text (200-400 words)
3. **Key Principles** - 2-4 main ideas from article
4. **Organization** - Grouped into 6 categories

### Assessment Data Model

Assessments return:
1. **Metadata** - System name, date, context
2. **Classification** - Category, score, tier
3. **Analysis** - Applicable frameworks, gaps
4. **Recommendations** - Actionable pathway

## Extension Points

### Adding a New Tool

1. Create `src/tools/new-tool.ts`:
```typescript
export const NewToolSchema = z.object({ ... });
export async function handleNewTool(...) { ... }
```

2. Import and register in `src/index.ts`:
```typescript
import { NewToolSchema, handleNewTool } from "./tools/new-tool.js";
server.tool("new_tool", "Description", NewToolSchema, async args => { ... });
```

### Adding Framework Crosswalks

1. Add entry to `CROSSWALKS` object in `src/resources/crosswalks.ts`
2. Update count in documentation
3. Test with `crosswalk_lookup()`

### Adding Charter Articles

1. Add entry to `CHARTER_ARTICLES` object in `src/resources/charter.ts`
2. Update article count in documentation
3. Test with `charter_lookup()`

## Performance Characteristics

- **Lookup Operations:** O(1) - Direct hash lookup
- **Assessment Operations:** O(n) where n = keywords analyzed
- **Memory:** Constant - All data in-memory
- **Response Time:** <100ms typical
- **Scalability:** Handles multiple concurrent requests

## Security Considerations

1. **Input Validation:** All inputs validated with Zod
2. **No External Calls:** All data local, no API dependencies
3. **No Persistence:** Stateless server, no data storage
4. **No Authentication:** Expected to run in trusted context
5. **Error Messages:** Safe error reporting without data leakage

## Testing Strategy

### Unit Tests (Recommended)

```typescript
// Test crosswalk lookup
test("crosswalk_lookup returns correct framework", () => {
  const result = handleCrosswalkLookup("CW-01");
  expect(result.success).toBe(true);
  expect(result.data.name).toBe("EU AI Act");
});

// Test assessment
test("casa_assessment determines High risk correctly", () => {
  const result = handleCasaAssessment(
    "MedicalAI",
    "medical diagnosis system",
    "hospital deployment"
  );
  expect(result.data.recommendedTier).toBeGreaterThanOrEqual(2);
});
```

### Integration Tests (Recommended)

Test end-to-end MCP protocol interaction with actual clients.

### Validation Tests

Verify:
- All 25 crosswalks accessible
- All 52 charter articles accessible
- Assessment tiers correct for risk scores
- Sector compliance matches framework requirements

## Deployment

### Local Deployment
```bash
npm install
npm run build
npm start
```

### Docker Deployment
Create Dockerfile for containerized deployment.

### Cloud Deployment
Compatible with serverless MCP hosting providers.

## Maintenance

### Regular Updates

1. Update crosswalk requirements as frameworks evolve
2. Add new charter articles as community grows
3. Refine assessment algorithms based on usage
4. Update sector-specific requirements

### Version Management

- Semantic versioning (MAJOR.MINOR.PATCH)
- Maintain changelog
- Document API changes

## Monitoring and Logging

Currently uses stderr for error logging. Recommended enhancements:

1. Structured logging with timestamps
2. Request/response logging
3. Performance metrics
4. Error tracking

---

This architecture provides a scalable, maintainable foundation for AI governance assessment and compliance management.
