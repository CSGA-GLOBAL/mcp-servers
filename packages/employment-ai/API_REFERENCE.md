# Employment AI MCP Server — Complete API Reference

## Server Information

- **Name:** csoai-employment-ai-mcp
- **Version:** 1.0.0
- **Protocol:** Model Context Protocol (MCP)
- **Runtime:** Node.js 18+
- **Dependencies:** @modelcontextprotocol/sdk, Zod

## Tools

### 1. hiring_ai_compliance

Comprehensive regulatory compliance assessment for AI-based hiring, recruitment, and selection systems.

#### Signature
```typescript
hiring_ai_compliance(
  system_name: string,
  ai_function: string,
  data_inputs: string,
  jurisdiction: string
): Promise<HiringAiResult>
```

#### Parameters

| Parameter | Type | Description | Examples |
|-----------|------|-------------|----------|
| `system_name` | string | Name/identifier of the hiring AI system | "TalentScreen", "CareerMatch Pro", "HireAI" |
| `ai_function` | string | What the AI does in hiring | "resume screening", "video interview analysis", "candidate ranking", "skills assessment", "background check automation" |
| `data_inputs` | string | What data the AI uses | "resumes", "video", "skills assessments", "social media profiles", "employment history", "educational background" |
| `jurisdiction` | string | Where the system operates | "US", "NYC", "EU", "UK", "US/NYC", "US/EU", "Global" |

#### Response: HiringAiResult

```typescript
interface HiringAiResult {
  system_name: string;
  risk_level: string;
  eu_ai_act_classification: string;
  applicable_regulations: string[];
  bias_assessment_requirements: string[];
  transparency_requirements: string[];
  candidate_rights: string[];
  audit_requirements: string[];
  remediation: string[];
  casa_tier: string;
}
```

#### Response Fields

##### system_name
- **Type:** string
- **Description:** Echo of the input system name
- **Example:** "TalentScreen Pro"

##### risk_level
- **Type:** string
- **Description:** Overall risk classification
- **Value:** "High Risk — Employment AI universally classified as high-risk"
- **Note:** All employment AI systems are high-risk per EU AI Act

##### eu_ai_act_classification
- **Type:** string
- **Description:** EU AI Act Annex III classification
- **Value:** "High Risk — EU AI Act Annex III, Section 4(a): AI for recruitment and selection"
- **Note:** Section 4(b) applies to AI affecting work relationship terms

##### applicable_regulations
- **Type:** string[]
- **Description:** Array of applicable laws and regulations
- **Base regulations** (always included):
  - EU AI Act — Annex III Section 4(a)
  - EU AI Act — Annex III Section 4(b)
- **US-specific** (if jurisdiction includes "US" or "NYC"):
  - NYC Local Law 144 (2023) — AEDT
  - EEOC Guidance on AI (May 2023)
  - Title VII Civil Rights Act
  - ADA Accommodation Requirements
  - ADEA (Age discrimination)
  - Illinois AI Video Interview Act
  - Colorado SB 21-169
  - California FEHA
- **EU-specific** (if jurisdiction includes "EU" or "Europe"):
  - GDPR Article 22 & 88
  - EU Employment Equality Directive 2000/78/EC
  - Platform Workers Directive (2024)
- **UK-specific** (if jurisdiction includes "UK"):
  - UK Equality Act 2010
  - UK ICO Employment Practices Code

##### bias_assessment_requirements
- **Type:** string[]
- **Description:** Specific bias testing and assessment requirements
- **Key requirements:**
  - Disparate impact analysis across ALL protected classes
  - Four-Fifths (80%) Rule testing per EEOC guidelines
  - Selection rate comparison across demographic groups
  - Intersectional bias testing (e.g., Black women, elderly disabled)
  - Alternative selection procedure analysis
  - Historical hiring data bias audit
  - Proxy variable detection
  - Type-specific requirements (e.g., facial analysis for video AI)

##### transparency_requirements
- **Type:** string[]
- **Description:** Disclosure and notification requirements to candidates
- **Key requirements:**
  - NYC LL144: Notification at least 10 business days before use
  - NYC LL144: Public posting of bias audit summary
  - EU AI Act: Inform candidates AI is used
  - EU AI Act: Conduct Fundamental Rights Impact Assessment (FRIA)
  - GDPR: Meaningful information about logic and consequences
  - Illinois AIVIA: Consent and human review option
  - Job posting disclosure of automated screening

##### candidate_rights
- **Type:** string[]
- **Description:** Legal rights of candidates regarding hiring AI
- **Key rights:**
  - Right to know AI is being used
  - Right to opt out (human alternative)
  - Right to explanation of AI decisions
  - Right to contest AI-based adverse decisions
  - Right to accommodation (ADA)
  - Right to data access
  - Right to data erasure after hiring process

##### audit_requirements
- **Type:** string[]
- **Description:** Third-party and internal audit requirements
- **Key requirements:**
  - NYC LL144: Annual independent audit by third-party
  - Audit scope: Disparate impact on race/ethnicity and sex
  - Audit results: Selection rates, impact ratios, distributions
  - Public availability of audit summary
  - EU AI Act: Conformity assessment
  - EEOC: Validation studies per Uniform Guidelines
  - Record retention: 4 years (NYC) / 5 years (EU)

##### remediation
- **Type:** string[]
- **Description:** Step-by-step compliance roadmap (10 key steps)
- **Steps:**
  1. Conduct bias audit per NYC LL144 requirements
  2. Implement candidate notification system
  3. Establish human review option
  4. Deploy disparate impact monitoring at each stage
  5. Publish bias audit summary on website
  6. Create candidate data rights portal
  7. Register AI system per EU AI Act (if applicable)
  8. Train HR staff on AI limitations
  9. Schedule annual third-party audit
  10. Implement outcome feedback loop

##### casa_tier
- **Type:** string
- **Description:** CASA (Civil Service & Staffing Agencies) tier classification
- **Value:** "CASA Tier 3 — Enterprise ($75K-$200K/yr)"
- **Note:** Employment AI systems are enterprise-tier classified

#### Example Request

```json
{
  "system_name": "CareerScreen AI",
  "ai_function": "resume screening and initial candidate ranking",
  "data_inputs": "resumes, educational background, work experience, certifications",
  "jurisdiction": "US/NYC"
}
```

#### Example Response (Partial)

```json
{
  "system_name": "CareerScreen AI",
  "risk_level": "High Risk — Employment AI universally classified as high-risk",
  "eu_ai_act_classification": "High Risk — EU AI Act Annex III, Section 4(a): AI for recruitment and selection",
  "applicable_regulations": [
    "EU AI Act — Annex III Section 4(a): Recruitment and selection of natural persons",
    "NYC Local Law 144 (2023) — Automated Employment Decision Tools (AEDT)",
    "EEOC Guidance on AI in Employment Decisions (May 2023)",
    "Title VII of the Civil Rights Act — Disparate Impact Theory",
    ...
  ],
  "bias_assessment_requirements": [
    "Disparate impact analysis across ALL protected classes (race, sex, age, disability, national origin, religion)",
    "Four-fifths (80%) rule testing per EEOC Uniform Guidelines on Employee Selection Procedures",
    ...
  ],
  "remediation": [
    "1. Conduct bias audit per NYC LL144 requirements (even if not in NYC — best practice)",
    "2. Implement candidate notification system for AI use in hiring",
    ...
  ]
}
```

---

### 2. workplace_surveillance_compliance

Regulatory compliance assessment for AI-based workplace monitoring and surveillance systems.

#### Signature
```typescript
workplace_surveillance_compliance(
  system_name: string,
  monitoring_type: string,
  data_collected: string,
  jurisdiction: string
): Promise<WorkplaceSurveillanceResult>
```

#### Parameters

| Parameter | Type | Description | Examples |
|-----------|------|-------------|----------|
| `system_name` | string | Name of the monitoring system | "WorkWatch", "ProductivityTracker", "EmployeeMonitor" |
| `monitoring_type` | string | What is being monitored | "productivity", "email", "keystroke logging", "video", "emotion", "location", "biometric" |
| `data_collected` | string | What data is collected | "keystroke timing", "window activity", "video recording", "facial expressions", "GPS location" |
| `jurisdiction` | string | Operating jurisdiction | "US", "EU", "UK", "Global" |

#### Response: WorkplaceSurveillanceResult

```typescript
interface WorkplaceSurveillanceResult {
  system_name: string;
  risk_classification: string;
  applicable_regulations: string[];
  employee_rights: string[];
  proportionality_test: string[];
  prohibited_practices: string[];
  remediation: string[];
}
```

#### Response Fields

##### system_name
- **Type:** string
- **Description:** Echo of input system name

##### risk_classification
- **Type:** string
- **Description:** Risk level or prohibition status
- **Standard value:** "High Risk — EU AI Act Annex III, Section 4(b)"
- **Special case:** If monitoring_type includes "emotion", "sentiment", or "mood":
  - **Value:** "PROHIBITED — EU AI Act Article 5(1)(f): Emotion recognition in workplace"
  - **Legal consequence:** System cannot be deployed in EU jurisdictions

##### applicable_regulations
- **Type:** string[]
- **Base regulations** (always included):
  - EU AI Act — Workplace AI Provisions
  - EU Platform Workers Directive (2024)
  - ILO Convention on Workers' Privacy
- **EU-specific** (if jurisdiction includes "EU"):
  - GDPR Article 88 — Processing in the employment context
  - EU Charter of Fundamental Rights Article 8
- **US-specific** (if jurisdiction includes "US"):
  - Electronic Communications Privacy Act (ECPA)
  - National Labor Relations Act — Section 7 rights
  - State workplace monitoring laws (Connecticut, Delaware, New York)

##### employee_rights
- **Type:** string[]
- **Key rights:**
  - Right to be informed about AI monitoring
  - Right to access collected data
  - Right to contest AI-based evaluations
  - Right to human review of AI decisions
  - Right to NOT be subject to emotion monitoring
  - Right to disconnect (after-hours limits)
  - Right to union representation

##### proportionality_test
- **Type:** string[]
- **Description:** Six-point proportionality assessment framework
- **Test components:**
  1. Legitimate aim: Is there a legitimate business purpose?
  2. Necessity: Is AI monitoring the least intrusive means?
  3. Proportionality: Do benefits outweigh privacy intrusion?
  4. Data minimization: Is only necessary data collected?
  5. Time limitation: Limited to work hours/activities?
  6. Transparency: Are employees fully informed?

##### prohibited_practices
- **Type:** string[]
- **Key prohibitions:**
  - Emotion recognition in workplace (EU AI Act Article 5(1)(f))
  - Covert surveillance without notification
  - Monitoring of protected union activities (NLRA)
  - AI-based social scoring of employees
  - Continuous keystroke logging without justification
  - Monitoring personal devices or off-duty activities
  - Using monitoring data for discrimination

##### remediation
- **Type:** string[]
- **Description:** 8-step compliance roadmap
- **Steps:**
  1. Audit all workplace AI against Article 5 prohibitions
  2. Remove emotion recognition from systems
  3. Implement employee notification and consent
  4. Conduct proportionality assessment for each tool
  5. Establish employee data access portal
  6. Negotiate monitoring policies with employee reps
  7. Deploy data minimization
  8. Schedule annual surveillance impact assessment

#### Example Request

```json
{
  "system_name": "ProductivityTracker AI",
  "monitoring_type": "keystroke logging and activity monitoring",
  "data_collected": "keystroke timing, window focus, application usage, mouse movement patterns",
  "jurisdiction": "EU"
}
```

#### Example Response (Partial)

```json
{
  "system_name": "ProductivityTracker AI",
  "risk_classification": "High Risk — EU AI Act Annex III, Section 4(b)",
  "applicable_regulations": [
    "EU AI Act — Workplace AI Provisions",
    "EU Platform Workers Directive (2024)",
    "GDPR Article 88 — Processing in the employment context",
    ...
  ],
  "employee_rights": [
    "Right to be informed about AI monitoring systems and their purpose",
    "Right to access data collected by workplace AI systems",
    ...
  ],
  "prohibited_practices": [
    "Emotion recognition in workplace settings (EU AI Act Article 5(1)(f))",
    "Covert AI surveillance without employee notification",
    ...
  ]
}
```

---

## Resources

### employment://regulations/index

Complete index of employment AI regulatory frameworks.

**Type:** Resource (text/plain)
**Read-only:** Yes

**Content includes:**
- EU AI Act classifications and prohibitions
- US federal regulations (Title VII, ADA, ADEA, EEOC)
- US state/local regulations (NYC LL144, Illinois, Colorado, California)
- EU regulations (GDPR, Directives, Charter)

### employment://tools/guide

Guide to using Employment AI MCP Server tools.

**Type:** Resource (text/plain)
**Read-only:** Yes

**Content includes:**
- Tool overview
- Tool descriptions
- Resource references

---

## Error Handling

The MCP server follows standard error handling protocols. If an error occurs:

1. HTTP status codes are NOT used (MCP protocol)
2. Errors return with descriptive messages
3. Tool calls are validated against Zod schemas
4. Invalid parameters are rejected with schema validation errors

---

## Type Definitions

### HiringAiResult

```typescript
interface HiringAiResult {
  system_name: string;                              // System identifier
  risk_level: string;                                // Always "High Risk"
  eu_ai_act_classification: string;                 // Annex III classification
  applicable_regulations: string[];                 // Jurisdiction-specific laws
  bias_assessment_requirements: string[];           // Testing requirements
  transparency_requirements: string[];              // Disclosure requirements
  candidate_rights: string[];                        // Candidate legal rights
  audit_requirements: string[];                      // Third-party audit requirements
  remediation: string[];                             // 10-step compliance roadmap
  casa_tier: string;                                 // Classification tier
}
```

### WorkplaceSurveillanceResult

```typescript
interface WorkplaceSurveillanceResult {
  system_name: string;                              // System identifier
  risk_classification: string;                      // Risk level or prohibition
  applicable_regulations: string[];                 // Jurisdiction-specific laws
  employee_rights: string[];                         // Worker legal rights
  proportionality_test: string[];                   // Proportionality framework
  prohibited_practices: string[];                    // Illegal practices
  remediation: string[];                             // 8-step compliance roadmap
}
```

---

## Best Practices

1. **Always Audit:** Use hiring_ai_compliance even if not in NYC — best practice
2. **Consult Experts:** Get legal counsel for employment and privacy law
3. **Test Thoroughly:** Conduct bias testing before and after deployment
4. **Monitor Ongoing:** Set up continuous disparate impact monitoring
5. **Document Everything:** Keep audit records for minimum 4-5 years
6. **Train Staff:** Educate HR on AI system limitations and overrides
7. **Respect Rights:** Implement all candidate/employee rights mechanisms
8. **Update Regularly:** Review compliance with regulatory changes

---

## License

CC0-1.0 — Public Domain

## Version

API Reference: 1.0.0
Last Updated: February 2026
