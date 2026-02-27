# Employment AI MCP Server — Deployment & Configuration Guide

## Quick Start

### 1. Install Dependencies
```bash
cd /sessions/brave-adoring-cerf/mcp-servers/employment-ai
npm install
```

### 2. Build TypeScript
```bash
npm run build
```

### 3. Run MCP Server
```bash
npm start
```

## Integration with Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "employment-ai": {
      "command": "node",
      "args": ["/sessions/brave-adoring-cerf/mcp-servers/employment-ai/dist/index.js"]
    }
  }
}
```

## Tool Documentation

### Tool 1: hiring_ai_compliance

Assesses hiring AI systems for regulatory compliance across multiple jurisdictions.

**Parameters:**
- `system_name` (string): Name of the hiring AI system
- `ai_function` (string): Type of AI function (resume screening, video interview, ranking, skills assessment)
- `data_inputs` (string): Data sources (resumes, video, assessments, social media)
- `jurisdiction` (string): Operating jurisdiction (US/NYC, EU, UK, etc.)

**Output Fields:**
- `system_name` — System identifier
- `risk_level` — High Risk classification
- `eu_ai_act_classification` — EU AI Act Annex III mapping
- `applicable_regulations` — List of applicable laws and regulations
- `bias_assessment_requirements` — Specific bias testing requirements
- `transparency_requirements` — Disclosure and notification requirements
- `candidate_rights` — Rights candidates have
- `audit_requirements` — Third-party audit requirements
- `remediation` — Step-by-step compliance roadmap
- `casa_tier` — CASA tier classification

**Example Request:**
```json
{
  "system_name": "CareerScreen AI",
  "ai_function": "resume screening and initial ranking",
  "data_inputs": "resumes, education, work experience, certifications",
  "jurisdiction": "US/NYC"
}
```

**Key Outputs for NYC Local Law 144:**
- Annual independent bias audit requirement
- Disparate impact testing (Four-Fifths Rule)
- Public disclosure of audit summary
- Candidate notification at least 10 days before use

### Tool 2: workplace_surveillance_compliance

Assesses workplace monitoring AI systems for compliance with privacy, data protection, and worker rights regulations.

**Parameters:**
- `system_name` (string): Name of the monitoring system
- `monitoring_type` (string): Type of monitoring (productivity, email, keystroke, video, emotion, location)
- `data_collected` (string): Description of data collected
- `jurisdiction` (string): Operating jurisdiction

**Output Fields:**
- `system_name` — System identifier
- `risk_classification` — Risk level or prohibition status
- `applicable_regulations` — Relevant laws and directives
- `employee_rights` — Rights of workers
- `proportionality_test` — Six-point proportionality assessment
- `prohibited_practices` — Illegal monitoring types
- `remediation` — Compliance steps

**Example Request:**
```json
{
  "system_name": "WorkWatch Pro",
  "monitoring_type": "keystroke logging and window activity",
  "data_collected": "typing patterns, application usage, window focus timing",
  "jurisdiction": "EU"
}
```

**Critical EU AI Act Prohibition:**
- Article 5(1)(f): Emotion recognition in workplace is PROHIBITED

## Regulatory Frameworks

### NYC Local Law 144 (Automated Employment Decision Tools)
- Applies to employers with 4+ NYC employees
- Required bias audit every 12 months
- Results must be posted on employer website
- Candidates must be notified 10 days before AEDT use
- Disparate impact testing on race/ethnicity and sex categories

### EEOC AI Guidance (May 2023)
- Four-Fifths (80%) Rule for selection rate comparison
- Disparate impact analysis at each hiring stage
- Historical bias in training data must be identified
- Less discriminatory alternatives must be considered

### EU AI Act (Articles on Employment)
- Annex III 4(a): HIGH RISK — Recruitment and selection AI
- Annex III 4(b): HIGH RISK — AI affecting work relationships
- Article 5(1)(f): PROHIBITED — Emotion recognition
- Article 13: Transparency requirements for candidates
- Article 26: Fundamental Rights Impact Assessment (FRIA)

### GDPR (Articles 22 & 88)
- Article 22: Right not to be subject to solely automated decisions
- Article 88: Special employment processing rules
- Meaningful human involvement required

### Platform Workers Directive (2024)
- Algorithmic management of workers
- Transparency about AI decision-making
- Right to explanation
- Human review option

## Compliance Checklist

### Before Deploying Hiring AI
- [ ] Conduct bias audit per NYC LL144 (if applicable)
- [ ] Test for disparate impact using Four-Fifths Rule
- [ ] Perform intersectional bias testing
- [ ] Identify proxy variables correlated with protected classes
- [ ] Audit training data for historical bias
- [ ] Develop candidate notification process
- [ ] Create human review mechanism for all AI-screened candidates
- [ ] Establish data rights portal (access, explanation, deletion)
- [ ] Schedule annual third-party bias audit
- [ ] Document validation studies per EEOC guidelines
- [ ] Register with EU AI Act registry (if EU operations)

### Before Deploying Workplace Surveillance
- [ ] Remove any emotion recognition capabilities
- [ ] Develop employee notification system
- [ ] Conduct proportionality assessment
- [ ] Minimize data collection to necessity
- [ ] Limit monitoring to work hours/activities
- [ ] Establish employee data access portal
- [ ] Negotiate policies with employee representatives
- [ ] Schedule annual surveillance impact assessment
- [ ] Create appeals/contestation process

## Testing & Validation

### Bias Testing Process
1. Identify candidate cohorts by protected class
2. Calculate selection rates for each cohort at each hiring stage
3. Apply Four-Fifths Rule: lowest selection rate × 0.80 = threshold
4. Compare actual selection rates to threshold
5. Calculate impact ratios and standardized selection rates
6. Perform statistical significance testing
7. Document alternative selection procedures with lower impact

### Proportionality Testing for Surveillance
1. Define legitimate business purpose
2. Assess necessity of AI monitoring vs. alternatives
3. Quantify benefits and privacy intrusions
4. Determine if less intrusive methods exist
5. Set data minimization standards
6. Establish time limitations
7. Document employee transparency measures

## Audit and Compliance Documentation

Keep records for:
- NYC LL144: 4 years minimum
- EU GDPR/AI Act: 5 years minimum
- EEOC: 1 year minimum (some claims require longer)

### Documentation Should Include
- Bias audit reports and methodologies
- Selection rate data by protected class
- Impact ratios and statistical analysis
- Alternative selection procedure documentation
- Candidate notification records
- Employee consent/acknowledgment records
- Third-party auditor reports
- Remediation steps taken
- Training records for HR staff

## Support & Legal Consultation

This MCP server provides technical compliance assessment. Organizations must:

1. **Consult Legal Counsel**
   - Employment law attorney for hiring AI
   - Privacy/data protection lawyer for surveillance AI
   - Compliance expert for regulatory interpretation

2. **Engage Domain Experts**
   - Industrial-Organizational (I-O) psychologist for bias testing
   - Data scientist for model validation
   - HR professional for implementation

3. **Engage External Auditors**
   - Third-party bias auditors (required by NYC LL144)
   - Data protection impact assessment (DPIA) experts
   - Compliance attestation firms

## License

CC0-1.0 — Public Domain

This tool is provided as-is for informational and compliance assessment purposes only.
