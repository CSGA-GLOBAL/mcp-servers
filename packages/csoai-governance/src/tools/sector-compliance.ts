/**
 * sector-compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

export const SectorComplianceSchema = z.object({
  sector: z
    .enum([
      "healthcare",
      "financial",
      "military",
      "education",
      "employment",
      "criminal_justice",
      "transportation",
      "social_media"
    ])
    .describe("Industry sector for compliance assessment"),
  system_description: z
    .string()
    .describe("Description of the AI system and its use in the sector")
});

export interface SectorComplianceResult {
  success: boolean;
  error?: string;
  data?: {
    sector: string;
    complianceRequirements: string[];
    regulatoryFrameworks: string[];
    keyRisks: string[];
    mitigation_strategies: string[];
    compliance_checklist: Array<{
      item: string;
      status: "required" | "recommended" | "optional";
      implemented: boolean;
    }>;
    compliance_score: number;
  };
}

interface SectorSpec {
  requirements: string[];
  frameworks: string[];
  risks: string[];
  mitigations: string[];
  checklist: Array<{
    item: string;
    status: "required" | "recommended" | "optional";
  }>;
}

const SECTOR_SPECS: Record<string, SectorSpec> = {
  healthcare: {
    requirements: [
      "HIPAA Privacy Rule compliance",
      "FDA software validation for medical devices",
      "Clinical trial transparency",
      "Patient consent and data protection",
      "Diagnostic accuracy verification",
      "Bias assessment for different demographics",
      "Model validation against clinical standards",
      "Audit trail and explainability"
    ],
    frameworks: [
      "HIPAA (US)",
      "GDPR (EU)",
      "FDA Software as a Medical Device Guidance",
      "CE Marking for Medical Devices",
      "HL7/FHIR Standards",
      "ISO 13485 (Medical Device Quality)",
      "Clinical validation standards"
    ],
    risks: [
      "Misdiagnosis leading to patient harm",
      "Bias in treatment recommendations",
      "Data breaches exposing patient information",
      "Algorithm drift affecting diagnosis accuracy",
      "Inappropriate reliance on AI without human review",
      "Liability and malpractice claims",
      "Regulatory non-compliance"
    ],
    mitigations: [
      "Implement strict human oversight for all diagnoses",
      "Conduct extensive bias testing across demographics",
      "Maintain complete audit logs of all AI decisions",
      "Regular clinical validation and performance monitoring",
      "Clear informed consent processes",
      "Cybersecurity and encryption controls",
      "Liability insurance and legal frameworks"
    ],
    checklist: [
      { item: "Privacy impact assessment completed", status: "required" },
      { item: "Patient informed consent documented", status: "required" },
      { item: "Clinical validation completed", status: "required" },
      { item: "Bias testing across demographics", status: "required" },
      { item: "Human oversight mechanisms in place", status: "required" },
      { item: "Audit logging implemented", status: "required" },
      { item: "FDA pre-market review (if applicable)", status: "required" },
      { item: "Post-market surveillance plan", status: "recommended" },
      { item: "Continuing medical education for users", status: "recommended" },
      { item: "Regular model retraining schedule", status: "recommended" }
    ]
  },
  financial: {
    requirements: [
      "Model risk management compliance",
      "Fair lending and discrimination testing",
      "Explainability for lending decisions",
      "Regulatory capital requirements",
      "Anti-money laundering (AML) effectiveness",
      "Consumer protection and disclosure",
      "Stress testing and scenario analysis",
      "Audit and model governance"
    ],
    frameworks: [
      "Basel III/IV (Capital requirements)",
      "Fair Credit Reporting Act (US)",
      "Equal Credit Opportunity Act (US)",
      "GDPR (EU)",
      "CCPA (California)",
      "FCA Handbook (UK)",
      "Model Risk Management (SR 11-7)",
      "FinCEN AML Guidelines"
    ],
    risks: [
      "Discriminatory lending based on protected characteristics",
      "Model overfitting to historical biased data",
      "Inadequate explanation of credit decisions",
      "Systemic risk from correlated model failures",
      "Regulatory penalties and fines",
      "Reputational damage",
      "Money laundering and financing of terrorism"
    ],
    mitigations: [
      "Comprehensive fair lending testing",
      "Disparate impact analysis",
      "Clear decision explanation and dispute processes",
      "Regular backtesting and stress testing",
      "Independent model validation",
      "Regulatory audit and reporting",
      "Customer transparency and rights"
    ],
    checklist: [
      { item: "Fair lending analysis completed", status: "required" },
      { item: "Disparate impact testing", status: "required" },
      { item: "Model validation report", status: "required" },
      { item: "Explainability assessment", status: "required" },
      { item: "Regulatory approval obtained", status: "required" },
      { item: "Model governance framework established", status: "required" },
      { item: "Backtesting procedures in place", status: "required" },
      { item: "Customer disclosure statements", status: "recommended" },
      { item: "Dispute resolution process", status: "recommended" },
      { item: "Ongoing monitoring dashboard", status: "recommended" }
    ]
  },
  military: {
    requirements: [
      "National security impact assessment",
      "CBRN (Chemical, Biological, Radiological, Nuclear) risk mitigation",
      "Dual-use control and export compliance",
      "Autonomous weapons governance",
      "Human control over lethal decisions",
      "Classified information protection",
      "Rules of engagement compliance",
      "International humanitarian law alignment"
    ],
    frameworks: [
      "NDAA (National Defense Authorization Act)",
      "Wassenaar Arrangement (Dual-use controls)",
      "Department of Defense AI Strategy",
      "ICRC Guidelines on Autonomous Weapons",
      "International Humanitarian Law",
      "DoD Responsible AI Strategy",
      "NIST AI RMF with security extensions"
    ],
    risks: [
      "Misuse for weapons development or biological research",
      "Autonomous lethal decision-making without human control",
      "Adversarial attacks on military systems",
      "Data exfiltration of classified information",
      "Violation of international humanitarian law",
      "Uncontrolled proliferation of dangerous capabilities",
      "Escalation and arms race dynamics"
    ],
    mitigations: [
      "Strict national security and CBRN assessments",
      "Export controls and foreign participation restrictions",
      "Mandatory human-in-the-loop for lethal decisions",
      "Encrypted secure infrastructure",
      "Foreign ownership and investment restrictions",
      "Audit and verification by security agencies",
      "International treaty compliance"
    ],
    checklist: [
      { item: "National security review completed", status: "required" },
      { item: "CBRN risk assessment", status: "required" },
      { item: "Export control compliance", status: "required" },
      { item: "Human control over lethal decisions", status: "required" },
      { item: "Classified information protection", status: "required" },
      { item: "Foreign involvement restrictions", status: "required" },
      { item: "International treaty compliance check", status: "required" },
      { item: "Autonomous weapons governance", status: "recommended" },
      { item: "Adversarial robustness testing", status: "recommended" },
      { item: "Regular security audits", status: "recommended" }
    ]
  },
  education: {
    requirements: [
      "Student data protection and privacy",
      "Equitable access and accessibility compliance",
      "Academic integrity protection",
      "Transparency in grading and recommendations",
      "Bias assessment for student populations",
      "Teacher and parent consent",
      "FERPA (Family Educational Rights and Privacy Act) compliance",
      "Inclusive and culturally responsive design"
    ],
    frameworks: [
      "FERPA (US)",
      "COPPA (Children's Online Privacy Protection)",
      "GDPR (EU)",
      "Section 508 (Web Accessibility)",
      "Title VI (Civil Rights in Education)",
      "CCPA (California)",
      "State education privacy laws"
    ],
    risks: [
      "Unauthorized disclosure of student information",
      "Biased assessment leading to educational harm",
      "Digital divide excluding disadvantaged students",
      "Academic cheating detection failures",
      "Teacher surveillance and job discrimination",
      "Loss of human interaction and mentorship",
      "Regulatory non-compliance and fines"
    ],
    mitigations: [
      "Data encryption and access controls",
      "Bias testing across student demographics",
      "Accessibility compliance verification",
      "Transparent grading and appeals processes",
      "Parental consent and student privacy rights",
      "Human review of AI recommendations",
      "Regular audits and compliance reporting"
    ],
    checklist: [
      { item: "Student data protection assessed", status: "required" },
      { item: "Parental consent process established", status: "required" },
      { item: "Accessibility compliance verified", status: "required" },
      { item: "Bias assessment across demographics", status: "required" },
      { item: "FERPA compliance check", status: "required" },
      { item: "Transparency in grading/recommendations", status: "required" },
      { item: "Appeals and override process", status: "required" },
      { item: "Teacher input on AI decisions", status: "recommended" },
      { item: "Student opt-out options", status: "recommended" },
      { item: "Annual bias monitoring", status: "recommended" }
    ]
  },
  employment: {
    requirements: [
      "Equal employment opportunity compliance",
      "Adverse impact analysis and mitigation",
      "Transparency in hiring and promotion",
      "Worker privacy protection",
      "Protection against algorithmic discrimination",
      "Appeals and dispute processes",
      "Records retention and audit trails",
      "Salary equity analysis"
    ],
    frameworks: [
      "Title VII (Civil Rights Act)",
      "ADA (Americans with Disabilities Act)",
      "ADEA (Age Discrimination in Employment Act)",
      "EEOC AI Guidance",
      "Equal Pay Act",
      "State fair employment laws",
      "GDPR (EU) - employment context",
      "ILO AI Guidance"
    ],
    risks: [
      "Discrimination against protected groups",
      "Perpetuation of historical bias in hiring",
      "Worker surveillance and privacy violation",
      "Barriers to employment for disabled workers",
      "Wage discrimination",
      "EEOC enforcement actions and litigation",
      "Reputational damage"
    ],
    mitigations: [
      "Adverse impact analysis and testing",
      "Diverse training data and bias mitigation",
      "Transparent decision criteria",
      "Accessibility for disabled candidates",
      "Human review of adverse decisions",
      "Appeals and explanation processes",
      "Regular audits and reporting"
    ],
    checklist: [
      { item: "Adverse impact analysis completed", status: "required" },
      { item: "Bias testing across protected groups", status: "required" },
      { item: "Transparency in selection criteria", status: "required" },
      { item: "ADA accessibility assessment", status: "required" },
      { item: "Appeals process established", status: "required" },
      { item: "Record retention procedures", status: "required" },
      { item: "Human review of rejections", status: "required" },
      { item: "Salary equity analysis", status: "recommended" },
      { item: "Candidate feedback mechanisms", status: "recommended" },
      { item: "Annual compliance audit", status: "recommended" }
    ]
  },
  criminal_justice: {
    requirements: [
      "Due process and fairness guarantees",
      "Racial and demographic bias assessment",
      "Transparency and explainability",
      "Appeals and override mechanisms",
      "Accuracy and reliability validation",
      "Protection against double-counting of factors",
      "Human judgment preservation",
      "Validation against constitutional standards"
    ],
    frameworks: [
      "Constitutional Due Process",
      "Equal Protection Clause",
      "Sentencing Reform Act",
      "State evidence rules",
      "ProPublica COMPAS Studies",
      "Partnership on AI recommendations",
      "Constitutional AI principles"
    ],
    risks: [
      "Racial bias in risk assessment",
      "Disproportionate impact on minorities",
      "Perpetuation of historical discrimination",
      "Inability to challenge algorithmic decisions",
      "Over-reliance on AI over human judgment",
      "Constitutional violations",
      "Wrongful convictions or excessive sentences"
    ],
    mitigations: [
      "Comprehensive racial and gender bias testing",
      "Transparent algorithm documentation",
      "Human override and appeal processes",
      "Validation against historical outcomes",
      "Regular accuracy audits",
      "Judicial education and oversight",
      "Legal review and constitutional analysis"
    ],
    checklist: [
      { item: "Racial bias assessment completed", status: "required" },
      { item: "Explainability validation", status: "required" },
      { item: "Appeals process established", status: "required" },
      { item: "Human override capability", status: "required" },
      { item: "Constitutional review", status: "required" },
      { item: "Accuracy validation against outcomes", status: "required" },
      { item: "Transparency to defendants", status: "required" },
      { item: "Judicial training program", status: "recommended" },
      { item: "Public algorithm disclosure", status: "recommended" },
      { item: "Continuous fairness monitoring", status: "recommended" }
    ]
  },
  transportation: {
    requirements: [
      "Safety validation and testing",
      "Autonomous vehicle governance",
      "Cybersecurity for vehicles",
      "Accident liability and insurance",
      "Occupant and pedestrian protection",
      "Data privacy for travelers",
      "Regulatory compliance (NHTSA, EU)",
      "Transparency in autonomous decision-making"
    ],
    frameworks: [
      "SAE Automation Levels",
      "NHTSA guidelines for autonomous vehicles",
      "SOTIF (Functional Safety)",
      "ISO 26262 (Automotive Functional Safety)",
      "EU AV Regulation Proposal",
      "GDPR for location and travel data",
      "Insurance and liability frameworks"
    ],
    risks: [
      "Autonomous vehicle crashes and deaths",
      "Cybersecurity attacks disabling vehicles",
      "Inadequate occupant protection",
      "Liability and insurance gaps",
      "Privacy violation from location tracking",
      "Regulatory penalties",
      "Public loss of trust"
    ],
    mitigations: [
      "Extensive real-world testing and validation",
      "Redundancy and fail-safe mechanisms",
      "Encryption and intrusion detection",
      "Insurance and liability frameworks",
      "Privacy-preserving location handling",
      "Regulatory engagement and approval",
      "Transparent safety performance reporting"
    ],
    checklist: [
      { item: "Safety validation completed", status: "required" },
      { item: "Cybersecurity assessment", status: "required" },
      { item: "Occupant protection design", status: "required" },
      { item: "Pedestrian safety protocols", status: "required" },
      { item: "Liability and insurance coverage", status: "required" },
      { item: "Privacy safeguards for location data", status: "required" },
      { item: "Regulatory approval obtained", status: "required" },
      { item: "Real-world road testing", status: "recommended" },
      { item: "Accident investigation procedures", status: "recommended" },
      { item: "Continuous performance monitoring", status: "recommended" }
    ]
  },
  social_media: {
    requirements: [
      "Content moderation policy compliance",
      "Algorithmic transparency about recommendations",
      "Hate speech and harassment prevention",
      "Data privacy and retention",
      "Child safety protection",
      "Misinformation detection",
      "Appeal and removal processes",
      "Diversity in content ranking"
    ],
    frameworks: [
      "Digital Services Act (EU)",
      "Online Safety Bill (UK)",
      "COPPA (Children's Privacy)",
      "GDPR",
      "Meta Oversight Board principles",
      "Twitter Birdwatch/Community Notes approach",
      "Platform-specific policies"
    ],
    risks: [
      "Spread of hate speech and harassment",
      "Amplification of misinformation",
      "Child exploitation and grooming",
      "Mental health harms from engagement optimization",
      "Suppression of legitimate speech",
      "Privacy violations and data misuse",
      "Regulatory enforcement and fines"
    ],
    mitigations: [
      "Robust content moderation systems",
      "Transparent algorithmic ranking",
      "Child safety protections",
      "Misinformation detection and labeling",
      "Appeals and human review processes",
      "Diversity in content ranking",
      "Privacy controls and data minimization"
    ],
    checklist: [
      { item: "Content moderation policy established", status: "required" },
      { item: "Child safety measures implemented", status: "required" },
      { item: "Hate speech detection system", status: "required" },
      { item: "Misinformation labeling process", status: "required" },
      { item: "Appeal process documented", status: "required" },
      { item: "Data privacy controls", status: "required" },
      { item: "Transparency about algorithms", status: "required" },
      { item: "Regular content audit", status: "recommended" },
      { item: "Community input mechanisms", status: "recommended" },
      { item: "Researcher access for studies", status: "recommended" }
    ]
  }
};

export async function handleSectorCompliance(
  sector: string,
  systemDescription: string
): Promise<SectorComplianceResult> {
  try {
    const spec = SECTOR_SPECS[sector];

    if (!spec) {
      return {
        success: false,
        error: `Unknown sector: ${sector}. Supported sectors: healthcare, financial, military, education, employment, criminal_justice, transportation, social_media`
      };
    }

    // Assess which checklist items are likely implemented
    const lowerDescription = systemDescription.toLowerCase();
    const checklist = spec.checklist.map(item => ({
      item: item.item,
      status: item.status,
      implemented: assessImplementation(lowerDescription, item.item)
    }));

    // Calculate compliance score
    const implementedCount = checklist.filter(c => c.implemented && c.status === "required").length;
    const requiredCount = checklist.filter(c => c.status === "required").length;
    const complianceScore = Math.round((implementedCount / requiredCount) * 100);

    return {
      success: true,
      data: {
        sector,
        complianceRequirements: spec.requirements,
        regulatoryFrameworks: spec.frameworks,
        keyRisks: spec.risks,
        mitigation_strategies: spec.mitigations,
        compliance_checklist: checklist,
        compliance_score: complianceScore
      }
    };
  } catch (error) {
    return {
      success: false,
      error: `Sector compliance assessment failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function assessImplementation(description: string, checklistItem: string): boolean {
  // Extract keywords from the checklist item
  const keywords = checklistItem.toLowerCase().split(/\s+/).slice(0, 3);

  // Check if any keywords appear in the description
  return keywords.some(keyword => description.includes(keyword));
}
