# CSOAI AI Governance MCP Server - Usage Examples

This document provides detailed examples of how to use each tool in the CSOAI Governance MCP Server.

## Tool 1: Crosswalk Lookup Examples

### Example 1.1: Look Up EU AI Act Framework

**Request:**
```json
{
  "tool": "crosswalk_lookup",
  "arguments": {
    "crosswalk_id": "CW-01"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "CW-01",
    "name": "EU AI Act",
    "version": "2024-01",
    "jurisdiction": "European Union",
    "keyRequirements": [
      "Risk-based classification of AI systems",
      "Prohibited AI practices documentation",
      "High-risk AI system requirements",
      "Transparency and information obligations",
      "Human oversight and monitoring",
      "Post-market surveillance and monitoring"
    ],
    "casaMappings": [
      "Tier 1: Self-assessment mapping to prohibited/high-risk categories",
      "Tier 2: Conformity assessment for high-risk AI systems",
      "Tier 3: Post-market monitoring and incident reporting",
      "Tier 4: Review board assessment for systemic risks"
    ],
    "complianceGaps": [
      "Lack of AI system documentation and testing records",
      "Missing human oversight procedures",
      "Insufficient transparency mechanisms",
      "No post-market surveillance plan"
    ],
    "recommendedActions": [
      "Classify AI systems according to EU AI Act categories",
      "Document technical documentation and testing procedures",
      "Establish human oversight and monitoring mechanisms",
      "Implement post-market surveillance procedures"
    ]
  }
}
```

### Example 1.2: Look Up NIST AI RMF

**Request:**
```json
{
  "tool": "crosswalk_lookup",
  "arguments": {
    "crosswalk_id": "CW-03"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "CW-03",
    "name": "NIST AI RMF",
    "version": "1.1-2024",
    "jurisdiction": "United States",
    "keyRequirements": [
      "Governance and risk management",
      "Algorithmic impact assessment",
      "Risk assessment and mapping",
      "Testing and performance evaluation",
      "Monitoring and accountability"
    ],
    "casaMappings": [
      "Tier 1: Self-assessment using NIST AI RMF categories",
      "Tier 2: Third-party evaluation of risk mitigation strategies",
      "Tier 3: Continuous monitoring dashboard and reporting",
      "Tier 4: Peer review of risk governance approach"
    ],
    ...
  }
}
```

### Example 1.3: Look Up OWASP LLM Top 10

**Request:**
```json
{
  "tool": "crosswalk_lookup",
  "arguments": {
    "crosswalk_id": "CW-25"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "CW-25",
    "name": "OWASP LLM Top 10",
    "version": "2023-01",
    "jurisdiction": "International",
    "keyRequirements": [
      "Prompt injection prevention",
      "Insecure output handling",
      "Training data poisoning",
      "Model denial of service",
      "Supply chain vulnerabilities",
      "Sensitive information disclosure",
      "Insecure plugin design",
      "Excessive agency",
      "Overreliance without monitoring",
      "Model theft"
    ],
    ...
  }
}
```

## Tool 2: Charter Lookup Examples

### Example 2.1: Look Up Risk Assessment Principle (Article 4)

**Request:**
```json
{
  "tool": "charter_lookup",
  "arguments": {
    "article_number": 4
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "number": 4,
    "title": "Risk Assessment and Management",
    "content": "Before deployment, AI systems must undergo comprehensive risk assessment identifying potential harms, failure modes, and mitigation strategies. Risk management must be ongoing throughout the system lifecycle.",
    "keyPrinciples": [
      "Risk Assessment",
      "Proactive Management",
      "Continuous Monitoring"
    ],
    "totalArticles": 52
  }
}
```

### Example 2.2: Look Up Human Oversight Principle (Article 6)

**Request:**
```json
{
  "tool": "charter_lookup",
  "arguments": {
    "article_number": 6
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "number": 6,
    "title": "Human Oversight and Control",
    "content": "Meaningful human oversight must be maintained for all AI systems of concern. Humans must retain the ability to understand, monitor, and intervene in AI decision-making. Critical decisions must never be fully automated.",
    "keyPrinciples": [
      "Human Agency",
      "Meaningful Control",
      "Interpretability"
    ],
    "totalArticles": 52
  }
}
```

### Example 2.3: Look Up Incident Response Principle (Article 14)

**Request:**
```json
{
  "tool": "charter_lookup",
  "arguments": {
    "article_number": 14
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "number": 14,
    "title": "Incident Reporting and Response",
    "content": "Organizations must establish clear procedures for identifying, reporting, and responding to AI-related incidents. Serious incidents must be reported to relevant authorities. Public disclosure may be required in certain circumstances.",
    "keyPrinciples": [
      "Transparency",
      "Rapid Response",
      "Accountability"
    ],
    "totalArticles": 52
  }
}
```

## Tool 3: CASA Assessment Examples

### Example 3.1: Assess a Medical Diagnostic AI System

**Request:**
```json
{
  "tool": "casa_assessment",
  "arguments": {
    "system_name": "PathologyAnalysisAI",
    "system_description": "Machine learning system trained on 100,000+ pathology slide images for cancer detection. Uses convolutional neural networks with attention mechanisms. Can identify tumors, assess grades, and provide differential diagnoses. Trained on diverse patient populations.",
    "deployment_context": "Deployed in 20 hospital pathology labs across Europe and North America. Processes approximately 5,000 slides per day. Results are reviewed by pathologists before use in clinical decision-making."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "systemName": "PathologyAnalysisAI",
    "assessmentDate": "2024-12-15",
    "recommendedTier": 3,
    "tierDescription": "Continuous Monitoring: Ongoing automated and manual monitoring of system performance and safety metrics.",
    "complianceScore": 65,
    "applicableCrosswalkIds": ["CW-01", "CW-02", "CW-03", "CW-19"],
    "complianceGaps": [
      "Missing comprehensive bias testing across different demographics",
      "No continuous performance monitoring dashboard",
      "Insufficient documentation of model limitations",
      "Lack of formal audit trail for diagnostic decisions"
    ],
    "certificationPathway": [
      "Phase 1: Prepare governance framework and documentation",
      "- Align with CW-01, CW-02, CW-03, CW-19 requirements",
      "- Conduct initial risk and impact assessment",
      "- Document AI system capabilities and limitations",
      "Phase 2: Implement required controls and safeguards",
      "- Deploy testing and monitoring infrastructure",
      "- Establish human oversight mechanisms",
      "- Create incident response procedures",
      "Phase 3: External Review",
      "- Engage qualified third-party auditor",
      "- Address audit findings and recommendations",
      "Phase 4: Continuous Monitoring",
      "- Implement automated monitoring dashboards",
      "- Establish performance tracking and reporting",
      "- Plan regular review cycles",
      "Phase 6: Certification and Ongoing Compliance",
      "- Obtain CASA certification",
      "- Maintain documentation and audit trails",
      "- Continue monitoring and reporting"
    ],
    "keyFindings": [
      "MODERATE RISK: System requires enhanced safety measures",
      "ADEQUATE COMPLIANCE: System demonstrates 65% alignment with governance standards",
      "System should align with 4 international frameworks",
      "System demonstrates good governance practices but needs enhancement"
    ],
    "nextSteps": [
      "1. Conduct a comprehensive AI governance audit",
      "2. Map system against applicable frameworks",
      "3. Identify and prioritize compliance gaps",
      "4. Develop remediation plan with timelines",
      "5. Implement enhanced monitoring and oversight",
      "6. Engage qualified external auditors",
      "7. Establish continuous monitoring infrastructure",
      "8. Establish annual review and update cycle"
    ]
  }
}
```

### Example 3.2: Assess a Generative AI Customer Service Chatbot

**Request:**
```json
{
  "tool": "casa_assessment",
  "arguments": {
    "system_name": "CustomerServiceLLM",
    "system_description": "Large language model fine-tuned on customer service interactions for a retail company. Responds to product questions, handles refund requests, and escalates complex issues. Uses prompt engineering to ensure brand-appropriate responses.",
    "deployment_context": "Web-based customer service chatbot handling 10,000+ interactions daily across 5 countries. Used for tier-1 support with human escalation for complex issues."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "systemName": "CustomerServiceLLM",
    "assessmentDate": "2024-12-15",
    "recommendedTier": 2,
    "tierDescription": "Third-Party Audit: External auditor verifies compliance with CASA standards and applicable frameworks.",
    "complianceScore": 45,
    "applicableCrosswalkIds": ["CW-21", "CW-22", "CW-23", "CW-25"],
    "complianceGaps": [
      "Insufficient prompt injection and adversarial input testing",
      "Missing fairness testing across different customer demographics",
      "No comprehensive documentation of LLM limitations and failure modes",
      "Inadequate monitoring for unexpected behavior changes",
      "Lack of formal incident response procedures for LLM outputs"
    ],
    "certificationPathway": [
      "Phase 1: Prepare governance framework and documentation",
      "- Align with CW-21, CW-22, CW-23, CW-25 requirements",
      "- Document LLM capabilities, limitations, and training data",
      "- Assess risks specific to generative AI",
      "Phase 2: Implement required controls and safeguards",
      "- Implement prompt injection defenses",
      "- Deploy fairness and bias testing",
      "- Establish output validation and filtering",
      "- Create comprehensive monitoring",
      "Phase 3: External Review",
      "- Engage qualified generative AI auditor",
      "- Conduct adversarial testing",
      "Phase 6: Certification and Ongoing Compliance",
      "- Obtain CASA certification",
      "- Maintain continuous monitoring",
      "- Regular LLM safety assessments"
    ],
    "keyFindings": [
      "HIGH RISK: System requires enhanced safety measures",
      "NEEDS IMPROVEMENT: System demonstrates 45% alignment with governance standards",
      "System should align with 4 international frameworks focused on LLM security",
      "Significant governance gaps must be addressed before full deployment"
    ],
    "nextSteps": [
      "1. Conduct comprehensive generative AI safety assessment",
      "2. Implement prompt injection and adversarial defenses",
      "3. Add fairness and bias testing for multi-cultural responses",
      "4. Develop LLM-specific monitoring and alerting",
      "5. Create incident response for unexpected LLM behaviors",
      "6. Engage generative AI security auditors",
      "7. Establish continuous LLM safety monitoring",
      "8. Document all LLM limitations and failure modes"
    ]
  }
}
```

## Tool 4: Sector Compliance Examples

### Example 4.1: Healthcare AI Compliance

**Request:**
```json
{
  "tool": "sector_compliance",
  "arguments": {
    "sector": "healthcare",
    "system_description": "AI system for automated detection of diabetic retinopathy in retinal images. Uses deep learning model trained on 300,000 labeled fundus photographs. Provides confidence scores and flags images requiring human review. Integrated with electronic health records."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sector": "healthcare",
    "complianceRequirements": [
      "HIPAA Privacy Rule compliance",
      "FDA software validation for medical devices",
      "Clinical trial transparency",
      "Patient consent and data protection",
      "Diagnostic accuracy verification",
      "Bias assessment for different demographics",
      "Model validation against clinical standards",
      "Audit trail and explainability"
    ],
    "regulatoryFrameworks": [
      "HIPAA (US)",
      "GDPR (EU)",
      "FDA Software as a Medical Device Guidance",
      "CE Marking for Medical Devices",
      "HL7/FHIR Standards",
      "ISO 13485 (Medical Device Quality)",
      "Clinical validation standards"
    ],
    "keyRisks": [
      "Misdiagnosis leading to patient harm",
      "Bias in treatment recommendations",
      "Data breaches exposing patient information",
      "Algorithm drift affecting diagnosis accuracy",
      "Inappropriate reliance on AI without human review",
      "Liability and malpractice claims",
      "Regulatory non-compliance"
    ],
    "mitigation_strategies": [
      "Implement strict human oversight for all diagnoses",
      "Conduct extensive bias testing across demographics",
      "Maintain complete audit logs of all AI decisions",
      "Regular clinical validation and performance monitoring",
      "Clear informed consent processes",
      "Cybersecurity and encryption controls",
      "Liability insurance and legal frameworks"
    ],
    "compliance_checklist": [
      {
        "item": "Privacy impact assessment completed",
        "status": "required",
        "implemented": false
      },
      {
        "item": "Patient informed consent documented",
        "status": "required",
        "implemented": false
      },
      {
        "item": "Clinical validation completed",
        "status": "required",
        "implemented": false
      },
      {
        "item": "Bias testing across demographics",
        "status": "required",
        "implemented": true
      },
      {
        "item": "Human oversight mechanisms in place",
        "status": "required",
        "implemented": true
      },
      {
        "item": "Audit logging implemented",
        "status": "required",
        "implemented": true
      },
      {
        "item": "FDA pre-market review (if applicable)",
        "status": "required",
        "implemented": false
      },
      {
        "item": "Post-market surveillance plan",
        "status": "recommended",
        "implemented": false
      }
    ],
    "compliance_score": 50
  }
}
```

### Example 4.2: Employment AI Compliance

**Request:**
```json
{
  "tool": "sector_compliance",
  "arguments": {
    "sector": "employment",
    "system_description": "Resume screening AI for technical positions. Analyzes 10,000+ resumes per week. Scores candidates on education, experience, skills, and keywords. Top 10% are automatically advanced to human review."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sector": "employment",
    "complianceRequirements": [
      "Equal employment opportunity compliance",
      "Adverse impact analysis and mitigation",
      "Transparency in hiring and promotion",
      "Worker privacy protection",
      "Protection against algorithmic discrimination",
      "Appeals and dispute processes",
      "Records retention and audit trails",
      "Salary equity analysis"
    ],
    "regulatoryFrameworks": [
      "Title VII (Civil Rights Act)",
      "ADA (Americans with Disabilities Act)",
      "ADEA (Age Discrimination in Employment Act)",
      "EEOC AI Guidance",
      "Equal Pay Act",
      "State fair employment laws",
      "GDPR (EU) - employment context",
      "ILO AI Guidance"
    ],
    "compliance_checklist": [
      {
        "item": "Adverse impact analysis completed",
        "status": "required",
        "implemented": false
      },
      {
        "item": "Bias testing across protected groups",
        "status": "required",
        "implemented": false
      },
      {
        "item": "Transparency in selection criteria",
        "status": "required",
        "implemented": true
      },
      {
        "item": "ADA accessibility assessment",
        "status": "required",
        "implemented": false
      },
      {
        "item": "Appeals process established",
        "status": "required",
        "implemented": true
      },
      {
        "item": "Record retention procedures",
        "status": "required",
        "implemented": true
      },
      {
        "item": "Human review of rejections",
        "status": "required",
        "implemented": false
      },
      {
        "item": "Salary equity analysis",
        "status": "recommended",
        "implemented": false
      }
    ],
    "compliance_score": 43
  }
}
```

## Tool 5: Risk Assessment Examples

### Example 5.1: Autonomous Hiring AI - High Risk

**Request:**
```json
{
  "tool": "risk_assessment",
  "arguments": {
    "system_name": "AutonomousHiringAI",
    "system_description": "Autonomous AI system that makes final hiring decisions for entry-level positions based on resume screening and video interview analysis. No human review of decisions before notification to candidates.",
    "scope_and_impact": "Used by 50+ companies to make hiring decisions affecting 100,000+ job applicants annually. Directly impacts employment opportunities and financial livelihood of candidates."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "systemName": "AutonomousHiringAI",
    "riskCategory": "High",
    "euAiActCategory": "High-Risk AI Systems",
    "riskScore": 78,
    "identifiedRisks": [
      {
        "risk": "Autonomous decision-making without human oversight",
        "severity": "Critical",
        "probability": "High",
        "impact": "Hiring decisions made without human review could cause harm to candidates"
      },
      {
        "risk": "Hiring discrimination",
        "severity": "High",
        "probability": "High",
        "impact": "Discriminatory hiring decisions against protected groups"
      },
      {
        "risk": "Algorithmic bias and discrimination",
        "severity": "High",
        "probability": "High",
        "impact": "Unfair treatment of protected groups in hiring"
      }
    ],
    "requiredMeasures": [
      "Comprehensive risk assessment and documentation",
      "Data governance and quality measures",
      "Algorithm testing and evaluation",
      "Logging of all decisions and inputs",
      "Human oversight mechanisms",
      "Explainability and transparency measures",
      "Training for users and operators",
      "Post-market surveillance and incident reporting",
      "Third-party conformity assessment"
    ],
    "recommendedMeasures": [
      "Regular independent audits",
      "Bug bounty program",
      "Red teaming exercises",
      "Bias mitigation beyond regulatory minimums",
      "Enhanced monitoring and alerting"
    ],
    "complianceImplications": [
      "EU AI Act Annex III compliance required",
      "Extensive documentation requirements",
      "Pre-market conformity assessment required",
      "Ongoing compliance monitoring",
      "Potential market restrictions if non-compliant",
      "Substantial penalties for violations"
    ],
    "residualRisk": "CRITICAL: 1 unmitigated critical risk identified. System deployment not recommended without major modifications."
  }
}
```

### Example 5.2: Recommendation Algorithm - Limited Risk

**Request:**
```json
{
  "tool": "risk_assessment",
  "arguments": {
    "system_name": "MovieRecommendationAI",
    "system_description": "Collaborative filtering system recommending movies to users based on viewing history and ratings. Provides ranked list of suggested movies. Users can see why recommendations are made through explainability interface.",
    "scope_and_impact": "Used by movie streaming service to recommend content to 10 million users. Recommendations influence content consumption but do not directly impact critical life decisions."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "systemName": "MovieRecommendationAI",
    "riskCategory": "Limited",
    "euAiActCategory": "Limited-Risk AI Systems",
    "riskScore": 28,
    "identifiedRisks": [
      {
        "risk": "Model drift and degradation",
        "severity": "Medium",
        "probability": "Medium",
        "impact": "System performance degradation over time"
      }
    ],
    "requiredMeasures": [
      "Clear information about AI use to users",
      "Disclosure that AI is being used",
      "Basic user safety measures",
      "Appropriate documentation"
    ],
    "recommendedMeasures": [
      "Risk assessment and mitigation strategy",
      "Testing for identified risks",
      "Monitoring and performance tracking",
      "Regular compliance reviews"
    ],
    "complianceImplications": [
      "EU AI Act transparency requirements apply",
      "Disclosure obligations to users",
      "Basic compliance documentation required",
      "No pre-market approval needed",
      "Post-market monitoring encouraged"
    ],
    "residualRisk": "LOW: Only low to medium severity risks. Standard AI governance practices should mitigate residual risk."
  }
}
```

## Tool 6: Incident Response Examples

### Example 6.1: AI Generated Discriminatory Content - High Severity

**Request:**
```json
{
  "tool": "incident_response",
  "arguments": {
    "incident_name": "Biased Hiring Recommendations",
    "incident_description": "Analysis of hiring recommendation AI revealed it systematically recommends women candidates at 40% lower rate than men for the same role. Investigation found training data was skewed toward historically male-dominated hiring patterns. Issue affects 50,000+ hiring decisions over 6-month period affecting 25,000+ candidates.",
    "severity_assessment": "High"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "incidentName": "Biased Hiring Recommendations",
    "assessedSeverity": "High",
    "severityRationale": "This incident affects multiple users or systems with significant impact. Requires prompt investigation and remediation within 24 hours.",
    "immediateActions": [
      "Assemble incident response team immediately",
      "Document incident details and timeline",
      "Assess scope of impact and affected users",
      "Isolate system for investigation if safe to do so",
      "Begin root cause analysis",
      "Prepare internal notifications",
      "Start user communication draft",
      "Activate incident response procedures",
      "Notify relevant stakeholders per notification matrix"
    ],
    "investigationSteps": [
      "1. INITIAL INVESTIGATION",
      "- Establish timeline of incident",
      "- Identify all affected systems and users",
      "- Collect and preserve logs and evidence",
      "- Determine initial root cause",
      "- Assess ongoing impact",
      "2. DETAILED ANALYSIS",
      "- Review system behavior before, during, and after incident",
      "- Analyze model decisions and outputs",
      "- Check for adversarial inputs or attacks",
      "- Review data quality and integrity",
      "- Examine access logs and user activity",
      "3. IMPACT ASSESSMENT",
      "- Quantify users and systems affected",
      "- Assess financial and operational impact",
      "- Identify vulnerable populations",
      "- Evaluate reputational impact",
      "- Determine if regulatory notification required",
      "4. ROOT CAUSE DETERMINATION",
      "- Identify primary failure mode",
      "- Trace cause to underlying factors",
      "- Document failure chain",
      "- Determine if systemic or isolated",
      "5. FORENSIC ANALYSIS",
      "- Preserve evidence chain",
      "- Document all findings",
      "- Prepare for potential legal proceedings",
      "- Maintain confidentiality of sensitive findings"
    ],
    "notificationRequirements": [
      {
        "stakeholder": "Executive Leadership",
        "timeframe": "Within 2 hours",
        "urgency": "Immediate",
        "required": true
      },
      {
        "stakeholder": "Legal Department",
        "timeframe": "Within 2 hours",
        "urgency": "Immediate",
        "required": true
      },
      {
        "stakeholder": "Regulators (if applicable)",
        "timeframe": "Within 24-48 hours per regulation",
        "urgency": "Within 24 hours",
        "required": true
      },
      {
        "stakeholder": "Affected Users",
        "timeframe": "Within 48-72 hours",
        "urgency": "Within 24 hours",
        "required": true
      }
    ],
    "documenting": [
      "Incident report with timeline and key events",
      "Root cause analysis and findings",
      "Impact assessment (affected users, systems, data)",
      "All logs and evidence collected",
      "Forensic analysis report",
      "Management summary",
      "User communication sent",
      "Regulatory notification (if required)",
      "Lessons learned memo",
      "Remediation plan with owners and deadlines",
      "Follow-up verification plan"
    ],
    "remediationSteps": [
      "1. Implement immediate fix or workaround",
      "2. Test fix in isolated environment",
      "3. Develop deployment plan with rollback procedure",
      "4. Deploy fix in phases if possible",
      "5. Verify fix effectiveness",
      "6. Monitor system after deployment",
      "7. Communicate fix to users",
      "8. Conduct post-incident review",
      "9. Identify systemic causes",
      "10. Develop long-term prevention measures",
      "11. Update documentation and procedures",
      "12. Close incident after verification"
    ],
    "preventiveMeasures": [
      "Implement continuous bias monitoring",
      "Increase fairness testing frequency",
      "Implement automated monitoring dashboards",
      "Create automated alerts for performance degradation",
      "Conduct security/safety assessment of related systems",
      "Update risk assessment and governance practices",
      "Document lessons learned in knowledge base",
      "Train staff on incident response procedures"
    ],
    "estimatedTimelineHours": 168
  }
}
```

### Example 6.2: Model Performance Degradation - Medium Severity

**Request:**
```json
{
  "tool": "incident_response",
  "arguments": {
    "incident_name": "Chatbot Accuracy Drop",
    "incident_description": "Customer service chatbot accuracy dropped from 94% to 71% over 2-week period. Root cause being investigated. Escalation rate to human agents increased 300%. Some customers reporting incorrect product information provided by bot.",
    "severity_assessment": "Medium"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "incidentName": "Chatbot Accuracy Drop",
    "assessedSeverity": "Medium",
    "severityRationale": "This incident has limited scope or impact. Requires investigation and remediation within 72 hours. Standard incident response procedures apply.",
    "immediateActions": [
      "Assemble incident response team immediately",
      "Document incident details and timeline",
      "Assess scope of impact and affected users",
      "Begin investigation and analysis",
      "Prepare incident documentation",
      "Activate incident response procedures",
      "Notify relevant stakeholders per notification matrix"
    ],
    "investigationSteps": [
      "1. INITIAL INVESTIGATION",
      "- Establish timeline of incident",
      "- Identify all affected systems and users",
      "- Collect and preserve logs and evidence",
      "- Determine initial root cause",
      "- Assess ongoing impact",
      "2. DETAILED ANALYSIS",
      "- Review system behavior before, during, and after incident",
      "- Analyze model decisions and outputs",
      "- Check for adversarial inputs or attacks",
      "- Review data quality and integrity",
      "- Examine access logs and user activity",
      "3. ROOT CAUSE DETERMINATION",
      "- Identify primary failure mode",
      "- Trace cause to underlying factors",
      "- Document failure chain",
      "- Determine if systemic or isolated"
    ],
    "notificationRequirements": [
      {
        "stakeholder": "Management",
        "timeframe": "Within 24 hours",
        "urgency": "Within 24 hours",
        "required": true
      },
      {
        "stakeholder": "Legal (if needed)",
        "timeframe": "Within 24 hours",
        "urgency": "Within 24 hours",
        "required": false
      },
      {
        "stakeholder": "Affected users (if any)",
        "timeframe": "Within 72 hours",
        "urgency": "Within 72 hours",
        "required": false
      }
    ],
    "preventiveMeasures": [
      "Implement continuous performance monitoring",
      "Create automated alerts for performance degradation",
      "Update incident response procedures based on lessons learned",
      "Implement automated monitoring dashboards",
      "Conduct security/safety assessment of related systems",
      "Update documentation and procedures",
      "Train staff on incident response procedures"
    ],
    "estimatedTimelineHours": 240
  }
}
```

## Combined Workflow Example

### Scenario: Launching a New Healthcare AI System

**Step 1: Risk Assessment**

Use `risk_assessment()` to understand the system's risk profile and determine compliance obligations.

```
risk_assessment(
  system_name="DiagnosticAI",
  system_description="Machine learning system for analyzing X-ray images to detect pneumonia...",
  scope_and_impact="Used in 10 hospitals for patient diagnosis, affecting 1000+ patients daily"
)
Result: High Risk → EU AI Act Tier 2-3 compliance required
```

**Step 2: Sector Compliance**

Use `sector_compliance()` to check healthcare-specific requirements.

```
sector_compliance(
  sector="healthcare",
  system_description="Same as above..."
)
Result: Shows HIPAA, FDA, clinical validation requirements, compliance checklist
```

**Step 3: CASA Assessment**

Use `casa_assessment()` to determine certification tier and pathway.

```
casa_assessment(
  system_name="DiagnosticAI",
  system_description="Same as above...",
  deployment_context="Hospital pathology labs in EU and US"
)
Result: Tier 2 recommended with step-by-step certification pathway
```

**Step 4: Framework Mapping**

Use `crosswalk_lookup()` to understand specific framework requirements.

```
crosswalk_lookup(crosswalk_id="CW-19")  # ISO/IEC 23894 Risk Management
crosswalk_lookup(crosswalk_id="CW-02")  # ISO/IEC 42001
```

**Step 5: Charter Principles**

Use `charter_lookup()` to understand governance implementation.

```
charter_lookup(article_number=5)   # Safety testing
charter_lookup(article_number=6)   # Human oversight
charter_lookup(article_number=16)  # Continuous monitoring
```

---

These examples provide concrete models for using each tool and understanding the comprehensive governance information the CSOAI server provides.
