/**
 * risk-assessment.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

export const RiskAssessmentSchema = z.object({
  system_name: z.string().describe("Name of the AI system"),
  system_description: z.string().describe("Detailed description of the system"),
  scope_and_impact: z
    .string()
    .describe("Who is affected and what decisions does the system influence")
});

export type RiskCategory = "Unacceptable" | "High" | "Limited" | "Minimal";

export interface RiskAssessmentResult {
  success: boolean;
  error?: string;
  data?: {
    systemName: string;
    riskCategory: RiskCategory;
    euAiActCategory: string;
    riskScore: number;
    identifiedRisks: Array<{
      risk: string;
      severity: "Critical" | "High" | "Medium" | "Low";
      probability: "High" | "Medium" | "Low";
      impact: string;
    }>;
    requiredMeasures: string[];
    recommendedMeasures: string[];
    complianceImplications: string[];
    residualRisk: string;
  };
}

interface RiskProfile {
  category: RiskCategory;
  euCategory: string;
  baseScore: number;
  description: string;
  requiredMeasures: string[];
  recommendedMeasures: string[];
  implications: string[];
}

const RISK_PROFILES: Record<RiskCategory, RiskProfile> = {
  Unacceptable: {
    category: "Unacceptable",
    euCategory: "Prohibited AI Practices",
    baseScore: 90,
    description: "AI systems with unacceptable risk that are prohibited under EU AI Act",
    requiredMeasures: [
      "Do not deploy the system",
      "Dismantle or significantly redesign the system",
      "Obtain explicit regulatory authorization before deployment",
      "Conduct comprehensive harm assessment"
    ],
    recommendedMeasures: [
      "Engage with regulators early in redesign process",
      "Consider alternative non-AI approaches",
      "Consult with ethics boards"
    ],
    implications: [
      "System is prohibited in EU and many jurisdictions",
      "Significant legal liability if deployed",
      "Criminal penalties may apply",
      "Must be withdrawn from market if already deployed",
      "International cooperation on enforcement"
    ]
  },
  High: {
    category: "High",
    euCategory: "High-Risk AI Systems",
    baseScore: 70,
    description: "AI systems with significant risks requiring strict compliance measures",
    requiredMeasures: [
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
    recommendedMeasures: [
      "Regular independent audits",
      "Bug bounty program",
      "Red teaming exercises",
      "Bias mitigation beyond regulatory minimums",
      "Enhanced monitoring and alerting"
    ],
    implications: [
      "EU AI Act Annex III compliance required",
      "Extensive documentation requirements",
      "Pre-market conformity assessment required",
      "Ongoing compliance monitoring",
      "Potential market restrictions if non-compliant",
      "Substantial penalties for violations"
    ]
  },
  Limited: {
    category: "Limited",
    euCategory: "Limited-Risk AI Systems",
    baseScore: 40,
    description: "AI systems with limited risks requiring transparency measures",
    requiredMeasures: [
      "Clear information about AI use to users",
      "Disclosure that AI is being used",
      "Basic user safety measures",
      "Appropriate documentation"
    ],
    recommendedMeasures: [
      "Risk assessment and mitigation strategy",
      "Testing for identified risks",
      "Monitoring and performance tracking",
      "Regular compliance reviews"
    ],
    implications: [
      "EU AI Act transparency requirements apply",
      "Disclosure obligations to users",
      "Basic compliance documentation required",
      "No pre-market approval needed",
      "Post-market monitoring encouraged"
    ]
  },
  Minimal: {
    category: "Minimal",
    euCategory: "Minimal-Risk AI Systems",
    baseScore: 10,
    description: "AI systems with minimal risks or no direct impact on safety/rights",
    requiredMeasures: [
      "General good AI practice",
      "Basic data protection compliance"
    ],
    recommendedMeasures: [
      "Internal governance and documentation",
      "Monitoring for emerging risks",
      "Regular risk reassessment as system evolves"
    ],
    implications: [
      "Limited regulatory compliance requirements",
      "Standard data protection laws apply",
      "No specific EU AI Act restrictions",
      "Continue monitoring as system evolves"
    ]
  }
};

export async function handleRiskAssessment(
  systemName: string,
  systemDescription: string,
  scopeAndImpact: string
): Promise<RiskAssessmentResult> {
  try {
    const riskScore = calculateRiskScore(systemDescription, scopeAndImpact);
    const riskCategory = determineRiskCategory(riskScore);
    const profile = RISK_PROFILES[riskCategory];
    const identifiedRisks = identifyRisks(systemDescription, scopeAndImpact);
    const residualRisk = calculateResidualRisk(identifiedRisks);

    return {
      success: true,
      data: {
        systemName,
        riskCategory,
        euAiActCategory: profile.euCategory,
        riskScore,
        identifiedRisks,
        requiredMeasures: profile.requiredMeasures,
        recommendedMeasures: profile.recommendedMeasures,
        complianceImplications: profile.implications,
        residualRisk
      }
    };
  } catch (error) {
    return {
      success: false,
      error: `Risk assessment failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function calculateRiskScore(description: string, impact: string): number {
  let score = 20; // Base score
  const combinedText = (description + " " + impact).toLowerCase();

  // High-risk indicators
  const highRiskFactors = [
    { keyword: "autonomous decision", weight: 15 },
    { keyword: "medical diagnosis", weight: 15 },
    { keyword: "criminal justice", weight: 15 },
    { keyword: "employment decision", weight: 12 },
    { keyword: "facial recognition", weight: 12 },
    { keyword: "child", weight: 12 },
    { keyword: "biometric", weight: 12 },
    { keyword: "safety-critical", weight: 10 },
    { keyword: "high-stakes", weight: 10 },
    { keyword: "vulnerable population", weight: 10 }
  ];

  // Risk-reducing factors
  const safetyFactors = [
    { keyword: "human oversight", weight: -10 },
    { keyword: "human review", weight: -10 },
    { keyword: "user control", weight: -8 },
    { keyword: "opt-out", weight: -8 },
    { keyword: "transparent", weight: -6 },
    { keyword: "audit", weight: -6 },
    { keyword: "monitoring", weight: -5 },
    { keyword: "testing", weight: -5 },
    { keyword: "limited scope", weight: -5 },
    { keyword: "low-stakes", weight: -8 }
  ];

  highRiskFactors.forEach(factor => {
    if (combinedText.includes(factor.keyword)) {
      score += factor.weight;
    }
  });

  safetyFactors.forEach(factor => {
    if (combinedText.includes(factor.keyword)) {
      score += factor.weight; // This is negative, so it reduces the score
    }
  });

  return Math.max(0, Math.min(100, score));
}

function determineRiskCategory(score: number): RiskCategory {
  if (score >= 80) {
    return "Unacceptable";
  } else if (score >= 60) {
    return "High";
  } else if (score >= 35) {
    return "Limited";
  } else {
    return "Minimal";
  }
}

interface IdentifiedRisk {
  risk: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  probability: "High" | "Medium" | "Low";
  impact: string;
}

function identifyRisks(description: string, impact: string): IdentifiedRisk[] {
  const risks: IdentifiedRisk[] = [];
  const combinedText = (description + " " + impact).toLowerCase();

  // Risk library
  const riskLibrary = [
    {
      keyword: "autonomous",
      risk: "Autonomous decision-making without human oversight",
      severity: "Critical" as const,
      impact: "Decisions made without human review could cause harm"
    },
    {
      keyword: "facial recognition",
      risk: "Biometric identification risks",
      severity: "High" as const,
      impact: "Privacy violations and false identification"
    },
    {
      keyword: "medical",
      risk: "Healthcare diagnostic errors",
      severity: "Critical" as const,
      impact: "Incorrect diagnosis leading to patient harm"
    },
    {
      keyword: "criminal justice",
      risk: "Bias in criminal risk assessment",
      severity: "Critical" as const,
      impact: "Discriminatory criminal justice outcomes"
    },
    {
      keyword: "employment",
      risk: "Hiring discrimination",
      severity: "High" as const,
      impact: "Discriminatory employment decisions"
    },
    {
      keyword: "child",
      risk: "Child safety risks",
      severity: "Critical" as const,
      impact: "Exploitation or harm to minors"
    },
    {
      keyword: "real-time",
      risk: "Real-time processing risks",
      severity: "High" as const,
      impact: "Rapid escalation without human review"
    },
    {
      keyword: "bias",
      risk: "Algorithmic bias and discrimination",
      severity: "High" as const,
      impact: "Unfair treatment of protected groups"
    },
    {
      keyword: "sensitive data",
      risk: "Privacy and data protection risks",
      severity: "High" as const,
      impact: "Unauthorized access or misuse of personal data"
    },
    {
      keyword: "model",
      risk: "Model drift and degradation",
      severity: "Medium" as const,
      impact: "System performance degradation over time"
    }
  ];

  // Check which risks apply
  riskLibrary.forEach(item => {
    if (combinedText.includes(item.keyword)) {
      const probability = combinedText.includes("monitoring")
        ? "Low"
        : combinedText.includes("test") || combinedText.includes("audit")
          ? "Medium"
          : "High";
      risks.push({
        risk: item.risk,
        severity: item.severity,
        probability: probability as "High" | "Medium" | "Low",
        impact: item.impact
      });
    }
  });

  // If no specific risks identified, add generic ones
  if (risks.length === 0) {
    risks.push({
      risk: "General AI system risks",
      severity: "Medium",
      probability: "Medium",
      impact: "System failure or unexpected behavior"
    });
  }

  return risks;
}

function calculateResidualRisk(identifiedRisks: IdentifiedRisk[]): string {
  if (identifiedRisks.length === 0) {
    return "Minimal residual risk";
  }

  const criticalCount = identifiedRisks.filter(r => r.severity === "Critical").length;
  const highCount = identifiedRisks.filter(r => r.severity === "High").length;

  if (criticalCount > 0) {
    return `CRITICAL: ${criticalCount} unmitigated critical risks identified. System deployment not recommended without major modifications.`;
  } else if (highCount > 2) {
    return `HIGH: ${highCount} high-severity risks identified. Comprehensive mitigation required before deployment.`;
  } else if (highCount > 0) {
    return `MODERATE: ${highCount} high-severity risks identified. Mitigation measures required.`;
  } else {
    return "LOW: Only low to medium severity risks. Standard AI governance practices should mitigate residual risk.";
  }
}
