/**
 * clinical-ai-safety.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface ClinicalAiSafetyResult {
  system_name: string;
  risk_classification: string;
  safety_concerns: string[];
  bias_assessment: {
    demographic_risks: string[];
    mitigation_strategies: string[];
    monitoring_requirements: string[];
  };
  clinical_validation_requirements: string[];
  human_oversight_model: string;
  eu_ai_act_obligations: string[];
  casa_tier_recommendation: string;
}

export function handleClinicalAiSafety(
  systemName: string,
  clinicalDomain: string,
  patientPopulation: string,
  decisionAutonomy: string
): ClinicalAiSafetyResult {
  const domainLower = clinicalDomain.toLowerCase();
  const popLower = patientPopulation.toLowerCase();
  const autonomyLower = decisionAutonomy.toLowerCase();

  // Risk classification
  let riskClassification = "High Risk — EU AI Act Annex III, Section 5(a)";
  let casaTier = "CASA Tier 3 — Enterprise Certification ($75K-$200K/yr)";

  if (autonomyLower.includes("autonomous") || autonomyLower.includes("no human") || autonomyLower.includes("automated")) {
    riskClassification = "Unacceptable Risk — EU AI Act Article 5 (requires human oversight override)";
    casaTier = "CASA Tier 4 — Critical Infrastructure ($200K-$500K+)";
  } else if (autonomyLower.includes("advisory") || autonomyLower.includes("decision support")) {
    riskClassification = "High Risk — EU AI Act Annex III, Section 5(a) — AI as medical device";
    casaTier = "CASA Tier 3 — Enterprise Certification ($75K-$200K/yr)";
  } else if (autonomyLower.includes("informational") || autonomyLower.includes("administrative")) {
    riskClassification = "Limited Risk — EU AI Act Article 50 (transparency obligations)";
    casaTier = "CASA Tier 2 — Professional Certification ($25K-$75K)";
  }

  const safetyConcerns = [
    "Diagnostic accuracy degradation across demographic subgroups",
    "Training data bias from historical healthcare inequities",
    "Automation bias — clinicians over-relying on AI recommendations",
    "Alert fatigue from excessive AI-generated clinical notifications",
    "Model drift — performance degradation over time as disease patterns evolve",
    "Adversarial robustness — vulnerability to manipulated medical images/data",
    "Explainability gap — inability to provide clinical rationale for AI decisions"
  ];

  if (domainLower.includes("radiology") || domainLower.includes("imaging") || domainLower.includes("pathology")) {
    safetyConcerns.push("Image quality sensitivity — performance variance across scanner manufacturers and protocols");
    safetyConcerns.push("False negative risk in screening applications — missed diagnoses");
  }
  if (domainLower.includes("drug") || domainLower.includes("prescri")) {
    safetyConcerns.push("Drug interaction prediction accuracy with polypharmacy patients");
    safetyConcerns.push("Dosing algorithm safety for pediatric and geriatric populations");
  }
  if (popLower.includes("pediatric") || popLower.includes("child") || popLower.includes("elderly") || popLower.includes("geriatric")) {
    safetyConcerns.push("Vulnerable population protection — enhanced safety requirements for pediatric/geriatric AI");
  }

  const biasAssessment = {
    demographic_risks: [
      "Race/ethnicity bias — historically underrepresented populations in training data",
      "Sex/gender bias — clinical presentation differences not captured in model",
      "Age bias — model performance across pediatric, adult, and geriatric populations",
      "Socioeconomic bias — access patterns and health literacy affecting model inputs",
      "Geographic bias — urban vs. rural healthcare delivery differences",
      "Disability bias — accessibility of AI interfaces and decision outputs"
    ],
    mitigation_strategies: [
      "Stratified performance evaluation across all demographic subgroups",
      "Fairness constraints in model optimization (demographic parity, equalized odds)",
      "Synthetic data augmentation for underrepresented populations",
      "Regular bias audits using FDA-recommended diversity metrics",
      "Clinician feedback loops for identifying bias in real-world deployment",
      "Patient-reported outcome integration for ground truth validation"
    ],
    monitoring_requirements: [
      "Quarterly demographic performance reports",
      "Real-time alert when subgroup performance drops below clinical threshold",
      "Annual comprehensive bias audit with external review",
      "Patient complaint tracking system with demographic categorization",
      "Model performance dashboard accessible to clinical governance committee"
    ]
  };

  const clinicalValidationRequirements = [
    "Prospective clinical validation study with predefined endpoints",
    "Multi-site validation across diverse healthcare settings",
    "Comparison against current standard of care (non-inferiority or superiority)",
    "Subgroup analysis for all FDA-identified demographic categories",
    "Clinician-in-the-loop usability study per human factors engineering (IEC 62366)",
    "Time-motion study for workflow integration impact",
    "Patient safety reporting mechanism per FDA 21 CFR Part 803"
  ];

  let humanOversightModel = "Human-in-the-Loop (HITL) — AI provides recommendation, clinician makes final decision";
  if (autonomyLower.includes("autonomous")) {
    humanOversightModel = "Human-on-the-Loop (HOTL) — AI acts autonomously with human override capability and real-time monitoring";
  } else if (autonomyLower.includes("triage") || autonomyLower.includes("screening")) {
    humanOversightModel = "Human-over-the-Loop (HoTL) — AI performs initial screening, human reviews all flagged cases";
  }

  const euAiActObligations = [
    "Article 9: Risk management system throughout AI system lifecycle",
    "Article 10: Data governance — training data quality, relevance, representativeness",
    "Article 11: Technical documentation per Annex IV requirements",
    "Article 12: Record-keeping — automatic logging of AI system operation",
    "Article 13: Transparency — clear instructions for healthcare deployers",
    "Article 14: Human oversight — mechanisms for clinician override",
    "Article 15: Accuracy, robustness, cybersecurity standards",
    "Article 17: Quality management system",
    "Article 26: Deployer obligations — fundamental rights impact assessment",
    "Article 72: Post-market monitoring system per Annex IX"
  ];

  return {
    system_name: systemName,
    risk_classification: riskClassification,
    safety_concerns: safetyConcerns,
    bias_assessment: biasAssessment,
    clinical_validation_requirements: clinicalValidationRequirements,
    human_oversight_model: humanOversightModel,
    eu_ai_act_obligations: euAiActObligations,
    casa_tier_recommendation: casaTier
  };
}
