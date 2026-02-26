/**
 * casa-assess.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

export const CasaAssessmentSchema = z.object({
  system_name: z.string().describe("Name of the AI system being assessed"),
  system_description: z
    .string()
    .describe("Detailed description of the AI system, its purpose, and deployment context"),
  deployment_context: z
    .string()
    .describe("Where and how the system is deployed (e.g., healthcare, financial services, social media)")
});

export type CasaTier = 1 | 2 | 3 | 4;

export interface CasaAssessmentResult {
  success: boolean;
  error?: string;
  data?: {
    systemName: string;
    assessmentDate: string;
    recommendedTier: CasaTier;
    tierDescription: string;
    complianceScore: number;
    applicableCrosswalkIds: string[];
    complianceGaps: string[];
    certificationPathway: string[];
    keyFindings: string[];
    nextSteps: string[];
  };
}

export async function handleCasaAssessment(
  systemName: string,
  systemDescription: string,
  deploymentContext: string
): Promise<CasaAssessmentResult> {
  try {
    // Analyze the system description and context to determine risk level
    const riskScore = analyzeRisk(systemDescription, deploymentContext);
    const recommendedTier = determineTier(riskScore);
    const complianceScore = calculateComplianceScore(systemDescription);
    const applicableCrosswalks = determineApplicableCrosswalk(deploymentContext, systemDescription);
    const gaps = identifyGaps(systemDescription);
    const pathway = generateCertificationPathway(recommendedTier, applicableCrosswalks);
    const findings = generateKeyFindings(riskScore, complianceScore, applicableCrosswalks);
    const nextSteps = generateNextSteps(recommendedTier);

    return {
      success: true,
      data: {
        systemName,
        assessmentDate: new Date().toISOString().split("T")[0],
        recommendedTier,
        tierDescription: getTierDescription(recommendedTier),
        complianceScore,
        applicableCrosswalkIds: applicableCrosswalks,
        complianceGaps: gaps,
        certificationPathway: pathway,
        keyFindings: findings,
        nextSteps
      }
    };
  } catch (error) {
    return {
      success: false,
      error: `CASA assessment failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function analyzeRisk(description: string, context: string): number {
  let riskScore = 50; // Base score

  // High-risk keywords
  const highRiskKeywords = [
    "autonomous",
    "decision",
    "medical",
    "healthcare",
    "financial",
    "criminal justice",
    "employment",
    "facial recognition",
    "biometric",
    "high-stakes",
    "life-altering",
    "risk of harm"
  ];

  // Count high-risk keywords
  const combinedText = (description + " " + context).toLowerCase();
  highRiskKeywords.forEach(keyword => {
    if (combinedText.includes(keyword)) {
      riskScore += 10;
    }
  });

  // Moderate risk mitigation
  const safetyKeywords = [
    "monitoring",
    "oversight",
    "human review",
    "testing",
    "audit",
    "control",
    "safeguard"
  ];

  safetyKeywords.forEach(keyword => {
    if (combinedText.includes(keyword)) {
      riskScore -= 5;
    }
  });

  // Ensure score is in range
  return Math.max(0, Math.min(100, riskScore));
}

function determineTier(riskScore: number): CasaTier {
  if (riskScore >= 75) {
    return 4; // Byzantine Council Review
  } else if (riskScore >= 50) {
    return 3; // Continuous Monitoring
  } else if (riskScore >= 25) {
    return 2; // Third-Party Audit
  } else {
    return 1; // Self-Assessment
  }
}

function getTierDescription(tier: CasaTier): string {
  switch (tier) {
    case 1:
      return "Self-Assessment: Organization conducts internal assessment of AI governance practices.";
    case 2:
      return "Third-Party Audit: External auditor verifies compliance with CASA standards and applicable frameworks.";
    case 3:
      return "Continuous Monitoring: Ongoing automated and manual monitoring of system performance and safety metrics.";
    case 4:
      return "Byzantine Council Review: Independent expert council reviews systemic risks and governance approach.";
    default:
      return "Unknown";
  }
}

function calculateComplianceScore(description: string): number {
  let score = 0;
  let checkCount = 0;

  // Check for specific governance elements
  const checks = [
    { keyword: "risk assessment", weight: 15 },
    { keyword: "testing", weight: 15 },
    { keyword: "monitoring", weight: 15 },
    { keyword: "audit", weight: 10 },
    { keyword: "documentation", weight: 10 },
    { keyword: "training", weight: 10 },
    { keyword: "incident response", weight: 10 },
    { keyword: "oversight", weight: 5 }
  ];

  const lowerDesc = description.toLowerCase();

  checks.forEach(check => {
    checkCount += check.weight;
    if (lowerDesc.includes(check.keyword)) {
      score += check.weight;
    }
  });

  return Math.round((score / checkCount) * 100);
}

function determineApplicableCrosswalk(context: string, description: string): string[] {
  const applicable: string[] = [];
  const lowerContext = (context + " " + description).toLowerCase();

  // Map contexts to crosswalks
  const contextMappings: Record<string, string[]> = {
    healthcare: ["CW-01", "CW-02", "CW-03", "CW-19"],
    financial: ["CW-01", "CW-03", "CW-04"],
    military: ["CW-24"],
    "criminal justice": ["CW-01", "CW-03"],
    employment: ["CW-01", "CW-04"],
    transportation: ["CW-01", "CW-02", "CW-19"],
    education: ["CW-01", "CW-04", "CW-05"],
    "social media": ["CW-22", "CW-23", "CW-25"],
    agent: ["CW-20", "CW-23"],
    "large language": ["CW-21", "CW-25"],
    "generative": ["CW-21", "CW-25"],
    llm: ["CW-21", "CW-25"]
  };

  // Check for context matches
  Object.entries(contextMappings).forEach(([contextKey, crosswalks]) => {
    if (lowerContext.includes(contextKey)) {
      applicable.push(...crosswalks);
    }
  });

  // Always include base frameworks
  if (!applicable.length) {
    applicable.push("CW-01", "CW-02", "CW-03", "CW-19");
  }

  // Remove duplicates and sort
  return [...new Set(applicable)].sort();
}

function identifyGaps(description: string): string[] {
  const gaps: string[] = [];
  const lowerDesc = description.toLowerCase();

  // Check for missing elements
  const requiredElements = [
    { element: "Risk Assessment", keywords: ["risk assessment"] },
    { element: "Testing and Evaluation", keywords: ["testing", "evaluation", "test"] },
    { element: "Human Oversight", keywords: ["human oversight", "human review", "human control"] },
    { element: "Documentation", keywords: ["documentation", "documented"] },
    { element: "Monitoring", keywords: ["monitoring", "monitor"] },
    { element: "Incident Response Plan", keywords: ["incident response", "incident handling"] },
    { element: "Fairness and Bias Testing", keywords: ["bias", "fairness", "discrimination"] },
    { element: "Security Assessment", keywords: ["security", "security assessment"] },
    { element: "Data Governance", keywords: ["data governance", "data quality", "data protection"] },
    { element: "Stakeholder Engagement", keywords: ["stakeholder", "engagement", "community"] }
  ];

  requiredElements.forEach(item => {
    const hasElement = item.keywords.some(keyword => lowerDesc.includes(keyword));
    if (!hasElement) {
      gaps.push(item.element);
    }
  });

  // If no gaps identified, provide generic recommendations
  if (gaps.length === 0) {
    gaps.push("Continue implementing and strengthening existing safety practices");
  }

  return gaps;
}

function generateCertificationPathway(tier: CasaTier, crosswalks: string[]): string[] {
  const pathway: string[] = [];

  // Phase 1: Preparation
  pathway.push("Phase 1: Prepare governance framework and documentation");
  pathway.push(`- Align with ${crosswalks.join(", ")} requirements`);
  pathway.push("- Conduct initial risk and impact assessment");
  pathway.push("- Document AI system capabilities and limitations");

  // Phase 2: Implementation
  pathway.push("Phase 2: Implement required controls and safeguards");
  pathway.push("- Deploy testing and monitoring infrastructure");
  pathway.push("- Establish human oversight mechanisms");
  pathway.push("- Create incident response procedures");

  // Tier-specific pathway
  if (tier >= 2) {
    pathway.push("Phase 3: External Review");
    pathway.push("- Engage qualified third-party auditor");
    pathway.push("- Address audit findings and recommendations");
  }

  if (tier >= 3) {
    pathway.push("Phase 4: Continuous Monitoring");
    pathway.push("- Implement automated monitoring dashboards");
    pathway.push("- Establish performance tracking and reporting");
    pathway.push("- Plan regular review cycles");
  }

  if (tier === 4) {
    pathway.push("Phase 5: Byzantine Council Review");
    pathway.push("- Submit complete assessment package to council");
    pathway.push("- Participate in peer review process");
    pathway.push("- Implement council recommendations");
  }

  // Final phase
  pathway.push("Phase 6: Certification and Ongoing Compliance");
  pathway.push("- Obtain CASA certification");
  pathway.push("- Maintain documentation and audit trails");
  pathway.push("- Continue monitoring and reporting");

  return pathway;
}

function generateKeyFindings(riskScore: number, complianceScore: number, crosswalks: string[]): string[] {
  const findings: string[] = [];

  findings.push(
    riskScore >= 75
      ? "HIGH RISK: System presents significant governance and safety challenges"
      : riskScore >= 50
        ? "MODERATE RISK: System requires enhanced safety measures"
        : "LOWER RISK: System demonstrates good governance practices"
  );

  findings.push(
    complianceScore >= 70
      ? `STRONG COMPLIANCE: System demonstrates ${complianceScore}% alignment with governance standards`
      : complianceScore >= 50
        ? `ADEQUATE COMPLIANCE: System demonstrates ${complianceScore}% alignment with governance standards`
        : `NEEDS IMPROVEMENT: System demonstrates ${complianceScore}% alignment with governance standards`
  );

  findings.push(`System should align with ${crosswalks.length} international frameworks`);

  if (riskScore >= 75) {
    findings.push("Byzantine Council review is recommended due to systemic risk levels");
  }

  if (complianceScore < 50) {
    findings.push("Significant governance gaps must be addressed before deployment");
  }

  return findings;
}

function generateNextSteps(tier: CasaTier): string[] {
  const steps: string[] = [];

  steps.push("1. Conduct a comprehensive AI governance audit");
  steps.push("2. Map system against applicable frameworks");
  steps.push("3. Identify and prioritize compliance gaps");
  steps.push("4. Develop remediation plan with timelines");
  steps.push("5. Implement enhanced monitoring and oversight");

  if (tier >= 2) {
    steps.push("6. Engage qualified external auditors");
  }

  if (tier >= 3) {
    steps.push("7. Establish continuous monitoring infrastructure");
  }

  if (tier === 4) {
    steps.push("8. Prepare comprehensive assessment package for Byzantine Council");
    steps.push("9. Submit for expert review and certification");
  }

  steps.push("10. Establish annual review and update cycle");

  return steps;
}
