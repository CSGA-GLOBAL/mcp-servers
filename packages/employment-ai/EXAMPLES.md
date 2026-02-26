# Employment AI MCP Server — Real-World Examples & Use Cases

## Example 1: Resume Screening AI (NYC-based Tech Company)

### Scenario
A mid-sized tech company in NYC wants to deploy an AI resume screening system to handle 5,000+ applications per month for entry-level and mid-level software engineering positions.

### Input

```json
{
  "system_name": "TechScreen Resume AI",
  "ai_function": "automated resume screening and candidate ranking",
  "data_inputs": "resumes, education history, years of experience, programming languages, GitHub profiles",
  "jurisdiction": "US/NYC"
}
```

### Key Outputs

#### Applicable Regulations
- NYC Local Law 144 (2023) — MANDATORY
- EEOC Guidance on AI (May 2023)
- Title VII Civil Rights Act — Disparate Impact
- ADA Accommodation Requirements
- GDPR (if hiring in EU)

#### Bias Assessment Requirements
- **Four-Fifths Rule testing:** Selection rates must not fall below 80% of the highest group
- **Protected classes tested:** Race, ethnicity, sex, age, disability, national origin
- **Intersectional testing:** Black women vs. white women, disabled men vs. able-bodied men
- **Proxy variables:** Identify if "top university" correlates with race/ethnicity
- **Educational institution bias:** Check if AI unfairly weights elite universities
- **Age bias:** Ensure resume gaps don't proxy for age discrimination

#### Transparency Requirements (NYC LL144 Specific)
1. **Timeline:** Notify candidates at least 10 business days before using AEDT
2. **Application disclosure:** Include in job posting that AEDT will be used
3. **Public reporting:** Post annual bias audit summary on company website
4. **Content:** Include selection rates by race/ethnicity and sex categories

#### Required Audit (Annual)
- Independent third-party bias auditor
- Test disparate impact for each job level (entry, mid)
- Calculate selection rates at each stage:
  - Stage 1: Resume screen
  - Stage 2: Phone screen
  - Stage 3: Technical interview
  - Stage 4: Final interview
- Document any disparate impact remediation

#### Remediation Roadmap
1. **Immediate (Week 1-2):**
   - Conduct bias audit on historical resume data
   - Identify any demographic patterns

2. **Pre-launch (Week 3-4):**
   - Implement candidate notification system
   - Draft bias audit summary for website
   - Create human review process for all AI-screened candidates

3. **Ongoing:**
   - Deploy monitoring at each hiring stage
   - Monthly disparate impact reviews
   - Annual third-party audit
   - Quarterly HR training on AI limitations

### Compliance Timeline
- **Month 1:** Hire third-party auditor, conduct historical bias audit
- **Month 2-3:** Implement notification and data rights portal
- **Month 4:** Deploy system with human review fallback
- **Month 12:** Complete annual audit, publish summary

---

## Example 2: Video Interview AI (Global Enterprise)

### Scenario
A multinational corporation wants to use AI video interview analysis for initial candidate screening across 12 countries (US, EU, UK, APAC). The AI analyzes facial expressions, tone of voice, and response content.

### Input

```json
{
  "system_name": "InterviewInsight AI",
  "ai_function": "video interview analysis with facial recognition and speech analysis",
  "data_inputs": "video recording, facial expressions, voice tone, word choice, response content",
  "jurisdiction": "Global/US/EU/UK"
}
```

### Key Outputs

#### Critical Findings

**EU AI Act Classification:**
- HIGH RISK — Annex III 4(a) — Recruitment AI
- HIGH RISK — Annex III 4(b) — Work relationship AI
- POTENTIAL PROHIBITION — Emotion recognition (if system analyzes emotional expressions)

**Jurisdictional Conflicts:**
- US (Title VII): Facial recognition video analysis has known racial bias (NIST FRVT studies)
- EU: If emotion recognition used, PROHIBITED under Article 5(1)(f)
- Illinois: AI video interviews require explicit candidate consent and human review option (820 ILCS 42)
- UK: Equality Act 2010 applies

#### Bias Assessment Requirements
- **NIST FRVT findings:** Facial recognition error rates vary by race/ethnicity
  - Black faces: 10-100x higher error rates than white faces
  - Asian faces: 10-50x higher error rates
- **Facial action unit bias:** Microexpressions interpreted differently across cultures
- **Voice analysis:** Accent discrimination and language bias
- **Response content:** Wording may advantage certain educational backgrounds

#### Candidate Notification & Rights
1. **Pre-application:** Disclose video interview AI in job posting
2. **Consent:** Obtain explicit informed consent before video recording
3. **10-day notice:** NYC LL144 notification period
4. **Explanation right:** Candidate can request explanation of AI scoring
5. **Human review:** Illinois AIVIA requires human alternative
6. **Data access:** Candidates can see video and AI assessment data
7. **Data deletion:** Video deleted after hiring process completion

#### Specific Remediation Steps
1. **CRITICAL:** Conduct facial analysis bias audit per NIST standards
2. **GDPR Compliance:** Complete Fundamental Rights Impact Assessment (FRIA)
3. **Illinois Compliance:** Implement written human review option in consent form
4. **Data Protection:**
   - Encrypt video at rest
   - Limit video storage to 90 days post-process
   - Delete upon candidate rejection or hire completion
5. **EU Registry:** Register system per EU AI Act Article 49

### Geographic Compliance Matrix
| Jurisdiction | Key Requirement | Deadline |
|---|---|---|
| US (General) | Bias audit, EEOC validation | Before launch |
| NYC | 10-day notice, bias audit, public reporting | Before launch |
| Illinois | Consent form, human review option | Before launch |
| EU | FRIA, Article 49 registry, GDPR compliance | Before launch |
| UK | Equality Act compliance, ICO guidance | Before launch |

---

## Example 3: Workplace Productivity Monitoring (European Tech Company)

### Scenario
A Berlin-based software company deploys an AI productivity monitoring system that tracks:
- Keystroke patterns and typing speed
- Application switching frequency
- Email response times
- Meeting attendance
- Code commit frequency

### Input

```json
{
  "system_name": "WorkMetrics AI",
  "monitoring_type": "keystroke logging, application monitoring, email analysis",
  "data_collected": "keystroke timing, application window history, email metadata, meeting participation",
  "jurisdiction": "EU"
}
```

### Key Outputs

#### Risk Assessment
- **Standard Risk:** High Risk — EU AI Act Annex III 4(b)
- **NOT Prohibited:** (assuming no emotion recognition)
- **BUT:** Strict proportionality requirements apply

#### Proportionality Analysis Required
1. **Legitimate aim:** Is productivity monitoring for legitimate business purpose?
   - YES: Identifying underperforming teams, project delays
   - NO: Controlling employees, spying on communication

2. **Necessity:** Is AI monitoring the least intrusive means?
   - Alternative: Project outcome tracking without keystroke logs?
   - Alternative: Team self-reporting without surveillance?
   - Alternative: Manager observation without automated tracking?

3. **Proportionality:** Do benefits outweigh privacy intrusion?
   - Privacy intrusion: Continuous keystroke logging = VERY HIGH
   - Benefit: Marginal productivity gain = LOWER than intrusion
   - Verdict: LIKELY NOT PROPORTIONATE

4. **Data minimization:** Collect only necessary data
   - NOT necessary: Individual keystroke timing (can use aggregate metrics)
   - NECESSARY: Project code commits (directly measures output)
   - NOT necessary: Email metadata (use project management tools instead)

5. **Time limitation:** Only during work hours
   - Work hours: 9 AM - 6 PM, Monday-Friday
   - NOT after hours, NOT weekends
   - NOT monitoring home devices

6. **Transparency:** Employees fully informed
   - Yes: Written notice of monitoring
   - Yes: Detail about data collection and retention
   - Yes: Explanation of automated decision-making

#### Employee Rights to Implement
1. **Right to notification:** Written disclosure of what is monitored
2. **Right to data access:** Annual report of data collected about them
3. **Right to contestation:** Challenge AI-based performance ratings
4. **Right to human review:** Manager review before performance-based decisions
5. **Right to disconnect:** No monitoring after work hours
6. **Right to representation:** Works council/union involvement in policy

#### Prohibited Practices
AVOID:
- Real-time keystroke logging display to managers (too intrusive)
- Emotion/sentiment detection on communication (PROHIBITED)
- Continuous video monitoring (not justified)
- Monitoring personal devices or off-duty activities (illegal)
- Social scoring systems based on monitoring data (prohibited)

#### Remediation Steps
1. **Audit:** Review current monitoring against Article 5(1)(f) prohibitions
2. **Redesign:** Replace keystroke logging with aggregate metrics
3. **Notification:** Send written employee notice with detailed disclosure
4. **Consent:** Obtain documented employee consent
5. **Policy:** Develop monitoring policy with works council
6. **Appeal:** Establish process to contest AI-based evaluations
7. **Data:** Create employee portal to access personal monitoring data
8. **Assessment:** Annual workplace surveillance impact assessment

#### GDPR Compliance
- **Article 88:** Special processing in employment context allowed
- **BUT:** Proportionality still applies
- **Data minimization:** Cannot process all keystroke data, only summaries
- **Retention:** Delete detailed keystroke logs after 90 days
- **DPIA:** Data Protection Impact Assessment required

---

## Example 4: Hiring for Compliance Officers (EU Financial Services)

### Scenario
A large EU bank hires compliance officers. The AI system screens candidates for:
- Education in law or compliance
- Years of relevant experience
- Previous regulatory violations
- Geographic locations
- Language skills

### Input

```json
{
  "system_name": "ComplianceHire AI",
  "ai_function": "compliance officer candidate screening and ranking",
  "data_inputs": "education, work history, regulatory background, LinkedIn profiles, language proficiency",
  "jurisdiction": "EU"
}
```

### Key Outputs

#### EU AI Act Compliance
- **Classification:** HIGH RISK — Annex III 4(a)
- **Requirement:** Fundamental Rights Impact Assessment (FRIA) mandatory

#### Potential Bias Issues
- **Gender bias:** Compliance field historically male-dominated; AI may replicate this
- **Geographic bias:** Limiting to specific EU countries disadvantages minorities
- **Linguistic bias:** Language requirements may disadvantage non-native speakers
- **Educational institution bias:** Favoring specific universities
- **Age bias:** Years of experience requirement may proxy for age

#### FRIA (Fundamental Rights Impact Assessment) Required
1. **Impact on Equal Treatment:** Could the system discriminate based on protected characteristics?
2. **Data Protection:** What data is collected and how is it protected?
3. **Right to Explanation:** Can candidates understand why they were rejected?
4. **Right to Human Review:** Can candidates request human review?
5. **Equality & Non-discrimination:** Does the system comply with Equality Directives?

#### Audit Requirements
- **Annual bias audit** for disparate impact
- **Testing cohorts:** Gender, age, national origin, disability status
- **Metrics:**
  - Selection rates by cohort
  - Impact ratios (four-fifths rule)
  - Standardized selection rates
- **Third-party auditor:** Qualified independent assessor

#### Transparency & Candidate Rights
1. **Notification:** Tell candidates AI is used in compliance hiring
2. **Data collection:** Inform what data is used (CV, LinkedIn, etc.)
3. **Decision logic:** Explain how AI weights factors
4. **Right to explanation:** Candidate can request detailed explanation of ranking
5. **Right to contest:** Process to challenge AI-based rejections
6. **Human review:** Senior HR officer reviews before final rejection

#### Remediation
1. Conduct FRIA with legal team
2. Audit training data for historical bias
3. Test for geographic and linguistic bias
4. Implement bias correction mechanisms
5. Create explanation system for candidates
6. Establish appeals process
7. Schedule annual third-party audit
8. Register system with relevant EU regulators

---

## Example 5: Seasonal Worker Classification (US Agricultural Company)

### Scenario
A US agricultural company uses AI to classify workers as:
- Permanent full-time
- Seasonal
- Temporary contractors

This classification determines benefits eligibility, scheduling, and legal classification.

### Input

```json
{
  "system_name": "WorkerClassify AI",
  "ai_function": "employment classification (permanent vs. seasonal vs. contractor)",
  "data_inputs": "work history, hours worked, duration employed, job function, contract terms",
  "jurisdiction": "US"
}
```

### Key Concerns

#### Legal Risk — Misclassification
- **Rule:** If AI misclassifies workers as contractors, company may face:
  - Back pay for benefits (health insurance, 401k, etc.)
  - Unpaid overtime claims (FLSA)
  - Wage and hour violations
  - IRS reclassification penalties
  - State unemployment insurance disputes

#### Disparate Impact Risk
- **Potential:** If AI systematically classifies certain ethnic groups as temporary
- **Example:** Hispanic farmworkers classified as seasonal at higher rates
- **Result:** Reduced benefits access, lower pay

#### EEOC Compliance
- **Title VII:** Disparate impact on protected classes must be audited
- **ADEA:** Ensure age doesn't correlate with worker classification
- **ADA:** Disabled workers not disadvantaged in classification

#### Remediation
1. **Transparency:** Disclose classification criteria to workers
2. **Accuracy:** Ensure classification matches actual employment status
3. **Bias audit:** Test for disparate impact by race, ethnicity, age, disability
4. **Manual review:** Human review before classification determination
5. **Appeal process:** Workers can challenge classification
6. **Compliance:** Ensure benefits align with classification (don't misclassify)

---

## Testing Disparate Impact: Step-by-Step Example

### Scenario Data
Tech company uses hiring AI to screen 1,000 candidates:
- 400 white candidates: 100 pass screening (25% selection rate)
- 300 Hispanic candidates: 45 pass screening (15% selection rate)
- 200 Black candidates: 24 pass screening (12% selection rate)
- 100 Asian candidates: 30 pass screening (30% selection rate)

### Four-Fifths Rule Analysis

1. **Identify highest selection rate:** Asian candidates at 30%

2. **Calculate threshold:** 30% × 0.80 = 24%

3. **Compare other groups:**
   - White: 25% ≥ 24% ✓ PASS
   - Hispanic: 15% < 24% ✗ FAIL — DISPARATE IMPACT
   - Black: 12% < 24% ✗ FAIL — DISPARATE IMPACT

4. **Impact Ratio Calculation:**
   - Hispanic: 15% / 30% = 0.50 (50% of Asian selection rate)
   - Black: 12% / 30% = 0.40 (40% of Asian selection rate)

5. **Legal Consequence:**
   - Hispanic impact ratio 0.50 is BELOW 0.80 threshold
   - Black impact ratio 0.40 is WELL BELOW 0.80 threshold
   - DISPARATE IMPACT VIOLATION likely

6. **Required Response:**
   - Investigate cause (is it the algorithm, training data, or legitimate business factor?)
   - Develop alternative selection procedure with lower disparate impact
   - Consider removing biased features
   - Implement bias correction
   - Conduct validation study per EEOC guidelines
   - Document remediation

### Documentation Required
- Selection rate calculations by protected class
- Impact ratio calculations
- Statistical significance testing (if needed)
- Root cause analysis of disparate impact
- Remediation steps taken
- Validation study results
- Records maintained for minimum 1 year (EEOC) / 4 years (NYC LL144)

---

## Key Takeaways

1. **Always Audit:** Disparate impact isn't obvious without data analysis
2. **Test Intersectionally:** Test combinations (e.g., Black women separately)
3. **Document Everything:** Maintain complete audit trail and remediation steps
4. **Consider Alternatives:** Less discriminatory selection methods must exist
5. **Get Legal Help:** Employment law and compliance expertise essential
6. **Train Staff:** HR and managers need to understand AI system limitations
7. **Monitor Ongoing:** Disparate impact can emerge over time
8. **Respect Rights:** Implement all candidate/employee rights mechanisms

