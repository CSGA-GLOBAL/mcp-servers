/**
 * hiring-ai-compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface HiringAiResult {
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

export function handleHiringAiCompliance(
  systemName: string,
  aiFunction: string,
  dataInputs: string,
  jurisdiction: string
): HiringAiResult {
  const funcLower = aiFunction.toLowerCase();
  const jurLower = jurisdiction.toLowerCase();

  const euClassification = "High Risk — EU AI Act Annex III, Section 4(a): AI for recruitment and selection";
  let casaTier = "CASA Tier 3 — Enterprise ($75K-$200K/yr)";

  const applicableRegulations: string[] = [
    "EU AI Act — Annex III Section 4(a): Recruitment and selection of natural persons",
    "EU AI Act — Annex III Section 4(b): Decisions affecting terms of work relationships"
  ];

  if (jurLower.includes("us") || jurLower.includes("nyc") || jurLower.includes("new york")) {
    applicableRegulations.push(
      "NYC Local Law 144 (2023) — Automated Employment Decision Tools (AEDT)",
      "EEOC Guidance on AI in Employment Decisions (May 2023)",
      "Title VII of the Civil Rights Act — Disparate Impact Theory",
      "Americans with Disabilities Act (ADA) — AI Accommodation Requirements",
      "Age Discrimination in Employment Act (ADEA)",
      "Illinois AI Video Interview Act (820 ILCS 42)",
      "Colorado SB 21-169 — AI Insurance and Employment Practices",
      "California FEHA — Fair Employment and Housing Act"
    );
  }
  if (jurLower.includes("eu") || jurLower.includes("europe")) {
    applicableRegulations.push(
      "GDPR Article 22 — Automated decision-making in employment",
      "EU Employment Equality Directive 2000/78/EC",
      "EU Platform Workers Directive (2024) — Algorithmic management"
    );
  }
  if (jurLower.includes("uk")) {
    applicableRegulations.push(
      "UK Equality Act 2010 — Algorithmic discrimination",
      "UK ICO Employment Practices Code — AI Provisions"
    );
  }

  const biasAssessmentRequirements = [
    "Disparate impact analysis across ALL protected classes (race, sex, age, disability, national origin, religion)",
    "Four-fifths (80%) rule testing per EEOC Uniform Guidelines on Employee Selection Procedures",
    "Selection rate comparison across demographic groups at each stage of hiring funnel",
    "Intersectional bias testing (e.g., Black women, elderly disabled) not just single-axis",
    "Alternative selection procedure analysis — less discriminatory alternatives must be considered",
    "Historical hiring data bias audit — AI trained on biased data reproduces discrimination",
    "Proxy variable detection — identify features correlated with protected characteristics",
    funcLower.includes("video") ? "Video interview AI: facial analysis bias per NIST FRVT findings" : "Resume/application screening bias: keyword and educational institution bias"
  ];

  const transparencyRequirements = [
    "NYC LL144: Candidates must be notified at least 10 business days before AEDT use",
    "NYC LL144: Summary of bias audit results must be publicly posted on employer website",
    "EU AI Act Article 13: Deployer must inform candidates AI is used in hiring process",
    "EU AI Act Article 26: Fundamental Rights Impact Assessment (FRIA) required",
    "GDPR Article 13/14: Meaningful information about logic, significance, and consequences",
    "Illinois AIVIA: Candidates must consent to AI video analysis and can request human review",
    "Job posting disclosure: AI/automated screening tools must be disclosed (where required by law)"
  ];

  const candidateRights = [
    "Right to know AI is being used in hiring decisions",
    "Right to opt out of AI-only evaluation (human alternative)",
    "Right to explanation of AI-based hiring decisions (GDPR Article 22, EU AI Act Article 86)",
    "Right to contest AI-based adverse employment decisions",
    "Right to request accommodation that AI system can process (ADA)",
    "Right to data access — what data AI used to evaluate candidacy",
    "Right to erasure of application data after hiring process completion"
  ];

  const auditRequirements = [
    "NYC LL144: Annual independent bias audit by third-party auditor",
    "Audit must test for disparate impact on race/ethnicity and sex categories",
    "Audit results: selection rates, impact ratios, scoring distributions by group",
    "Audit summary must be publicly available on employer website",
    "EU AI Act: Conformity assessment for high-risk employment AI",
    "EEOC: Validation studies per Uniform Guidelines (criterion, content, construct validity)",
    "Maintain audit records for minimum 4 years (NYC) / 5 years (EU)"
  ];

  const remediation = [
    "1. Conduct bias audit per NYC LL144 requirements (even if not in NYC — best practice)",
    "2. Implement candidate notification system for AI use in hiring",
    "3. Establish human review option for all AI-screened candidates",
    "4. Deploy ongoing disparate impact monitoring at every hiring stage",
    "5. Publish bias audit summary on company website",
    "6. Create candidate data rights portal (access, explanation, erasure)",
    "7. Register AI system per EU AI Act Article 49 (if EU operations)",
    "8. Train HR staff on AI hiring tool limitations and override procedures",
    "9. Schedule annual third-party bias audit",
    "10. Implement feedback loop — track hire outcomes against AI predictions"
  ];

  return {
    system_name: systemName,
    risk_level: "High Risk — Employment AI universally classified as high-risk",
    eu_ai_act_classification: euClassification,
    applicable_regulations: applicableRegulations,
    bias_assessment_requirements: biasAssessmentRequirements,
    transparency_requirements: transparencyRequirements,
    candidate_rights: candidateRights,
    audit_requirements: auditRequirements,
    remediation,
    casa_tier: casaTier
  };
}
