/**
 * cbrn-ai-assess.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const CBRNAIAssessInputSchema = z.object({
  ai_system_description: z.string(),
  cbrn_domain: z.enum(["chemical", "biological", "radiological", "nuclear", "general"]),
  deployment_context: z.string(),
});

type CBRNAIAssessInput = z.infer<typeof CBRNAIAssessInputSchema>;

interface CBRNAIAssessOutput {
  dual_use_risk_classification: string;
  export_control_determination: string;
  cbrn_applicability_assessment: string;
  safeguards_required: string[];
  governance_framework: string;
  export_control_authorities: string[];
  restricted_jurisdictions: string[];
  technical_safeguards: string[];
  administrative_safeguards: string[];
  monitoring_requirements: string[];
  legal_compliance_status: string;
  risk_mitigation_strategy: string;
}

export async function handleCBRNAIAssess(args: unknown): Promise<{
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}> {
  const input = CBRNAIAssessInputSchema.parse(args);
  const output = generateCBRNAIAssessment(input);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(output, null, 2),
      },
    ],
  };
}

function generateCBRNAIAssessment(input: CBRNAIAssessInput): CBRNAIAssessOutput {
  const riskClassification = determineDualUseRiskClass(
    input.ai_system_description,
    input.cbrn_domain
  );
  const exportControl = determineExportControlStatus(
    input.cbrn_domain,
    input.deployment_context
  );
  const safeguards = generateRequiredSafeguards(
    riskClassification,
    input.cbrn_domain
  );

  return {
    dual_use_risk_classification: riskClassification,
    export_control_determination: exportControl,
    cbrn_applicability_assessment: assessCBRNApplicability(
      input.ai_system_description,
      input.cbrn_domain
    ),
    safeguards_required: safeguards.required,
    governance_framework: buildGovernanceFramework(riskClassification),
    export_control_authorities: getExportControlAuthorities(
      input.deployment_context
    ),
    restricted_jurisdictions: getRestrictedJurisdictions(
      input.cbrn_domain
    ),
    technical_safeguards: safeguards.technical,
    administrative_safeguards: safeguards.administrative,
    monitoring_requirements: safeguards.monitoring,
    legal_compliance_status: determineLegalCompliance(
      riskClassification,
      input.deployment_context
    ),
    risk_mitigation_strategy: generateMitigationStrategy(
      riskClassification,
      input.cbrn_domain,
      input.deployment_context
    ),
  };
}

function determineDualUseRiskClass(
  description: string,
  domain: string
): string {
  const keywords = {
    highRisk: [
      "synthesis",
      "design",
      "optimization",
      "simulation",
      "protein folding",
      "molecular dynamics",
      "pathogen",
      "agent",
      "toxin",
      "radiological dispersal",
      "nuclear",
      "enrichment",
    ],
    mediumRisk: [
      "detection",
      "analysis",
      "classification",
      "monitoring",
      "surveillance",
      "prediction",
    ],
  };

  const lowerDesc = description.toLowerCase();
  const hasHighRisk = keywords.highRisk.some((kw) => lowerDesc.includes(kw));
  const hasMediumRisk = keywords.mediumRisk.some((kw) =>
    lowerDesc.includes(kw)
  );

  if (domain !== "general") {
    if (hasHighRisk) return "CRITICAL - Level A (Dual-use with offensive potential)";
    if (hasMediumRisk) return "HIGH - Level B (Potential dual-use applications)";
  }

  return "MODERATE - Level C (Primarily defensive with incidental dual-use risk)";
}

function determineExportControlStatus(
  domain: string,
  context: string
): string {
  const exportMap: { [key: string]: string } = {
    chemical:
      "Subject to EAR (Export Administration Regulations) Part 700 (Commerce Control List Category 18B)",
    biological:
      "Subject to EAR Part 700 (Category 1A002 - systems for production/genetic engineering)",
    radiological:
      "Subject to EAR Part 700 (Nuclear Regulatory Commission coordination)",
    nuclear:
      "Subject to EAR Part 700 and ITAR (International Traffic in Arms Regulations) Part 121",
    general: "Determine case-by-case based on AI capabilities and domain",
  };

  let status = exportMap[domain] || "Export control determination required";

  if (context.toLowerCase().includes("export")) {
    status +=
      " | EXPORT RESTRICTIONS: Prior approval required from Commerce Department (BIS)";
  }

  if (
    context.toLowerCase().includes("foreign") ||
    context.toLowerCase().includes("international")
  ) {
    status +=
      " | FOREIGN NATIONAL INVOLVEMENT: Restricted - must comply with EAR Part 734";
  }

  return status;
}

function assessCBRNApplicability(
  description: string,
  domain: string
): string {
  if (domain === "general") {
    return "CBRN applicability: System claimed to be general-purpose. Detailed capability assessment required to confirm no CBRN applications.";
  }

  const applicabilityMap: { [key: string]: string } = {
    chemical:
      "APPLICABLE - System may assist with chemical synthesis, structure prediction, or toxicity assessment. Subject to CWC (Chemical Weapons Convention) restrictions.",
    biological:
      "APPLICABLE - System may support genetic engineering, pathogen simulation, or bioweapon design. Subject to Biological Weapons Convention (BWC) restrictions.",
    radiological:
      "APPLICABLE - System may optimize radiological dispersal device design or radiological modeling. Export-controlled under ITAR/EAR.",
    nuclear:
      "APPLICABLE - System may support nuclear weapons design, simulation, or enrichment processes. Highly classified; strict ITAR control.",
  };

  return applicabilityMap[domain] || "Applicability assessment inconclusive";
}

function generateRequiredSafeguards(
  riskClass: string,
  domain: string
): {
  required: string[];
  technical: string[];
  administrative: string[];
  monitoring: string[];
} {
  const isCritical = riskClass.includes("CRITICAL");
  const isHigh = riskClass.includes("HIGH");

  const required: string[] = [];
  const technical: string[] = [];
  const administrative: string[] = [];
  const monitoring: string[] = [];

  // Required safeguards
  if (isCritical || isHigh) {
    required.push("Export control compliance assessment (BIS/DDTC approval)");
    required.push("Foreign national access restrictions");
    required.push("Encryption of AI models and training data");
  }

  required.push("AI governance framework aligned with OMB/NIST guidelines");
  required.push("Dual-use risk assessment and documentation");
  required.push("Personnel security clearance verification (if applicable)");

  // Technical safeguards
  if (isCritical) {
    technical.push("Air-gapped systems (no network connectivity)");
    technical.push("Classified infrastructure for model training");
    technical.push("Hardware security modules (HSM) for key management");
    technical.push("Cryptographic isolation of model weights");
  }

  technical.push("Multi-factor authentication and access controls");
  technical.push("End-to-end encryption for data in transit");
  technical.push("Comprehensive audit logging and monitoring");
  technical.push("API rate limiting and usage monitoring");
  technical.push("Input/output filtering for sensitive queries");

  // Administrative safeguards
  if (isCritical || isHigh) {
    administrative.push("Designated export control compliance officer");
    administrative.push("Regular ITAR/EAR training for all personnel");
    administrative.push(
      "Approval workflows for international collaboration or deployment"
    );
    administrative.push("Confidentiality agreements and non-disclosure requirements");
  }

  administrative.push("Incident response plan for potential misuse");
  administrative.push("Annual compliance audits and certifications");
  administrative.push("Supply chain vetting for dependencies");
  administrative.push("Data retention and disposal procedures");

  // Monitoring requirements
  if (isCritical) {
    monitoring.push("Real-time anomaly detection for unusual queries");
    monitoring.push("Daily AI security logs review");
    monitoring.push("Quarterly external security assessments");
    monitoring.push("Classified threat intelligence integration");
  }

  monitoring.push("Monthly usage pattern analysis");
  monitoring.push("Quarterly security control assessments");
  monitoring.push("Annual vulnerability testing");
  monitoring.push("Tracking of model updates and version control");

  return { required, technical, administrative, monitoring };
}

function buildGovernanceFramework(riskClass: string): string {
  let framework = "AI CBRN Governance Framework:\n";
  framework +=
    "Authority: Commerce Department (BIS), State Department (DDTC), DoD, intelligence community\n";
  framework +=
    "Standards: NIST AI Risk Management Framework, OMB M-24-01 (AI Governance), EAR Part 700\n";

  if (riskClass.includes("CRITICAL")) {
    framework += "Oversight: National Security Council (NSC) AI governance board\n";
    framework +=
      "Review Cycle: Quarterly with classified briefings to relevant agencies\n";
  } else if (riskClass.includes("HIGH")) {
    framework += "Oversight: Inter-agency review board with Commerce/State participation\n";
    framework += "Review Cycle: Semi-annual compliance assessments\n";
  } else {
    framework += "Oversight: Organization-level compliance committee\n";
    framework += "Review Cycle: Annual governance assessment\n";
  }

  framework +=
    "Documentation: Maintain audit trail for all governance decisions and risk assessments";

  return framework;
}

function getExportControlAuthorities(context: string): string[] {
  const authorities = [
    "Bureau of Industry and Security (BIS) - Commerce Department (EAR)",
    "Directorate of Defense Trade Controls (DDTC) - State Department (ITAR)",
  ];

  if (context.toLowerCase().includes("nuclear")) {
    authorities.push(
      "Nuclear Regulatory Commission (NRC) and Department of Energy (DOE)"
    );
  }

  if (context.toLowerCase().includes("classified")) {
    authorities.push("National Security Agency (NSA) - Classification authority");
  }

  return authorities;
}

function getRestrictedJurisdictions(domain: string): string[] {
  const universallyRestricted = [
    "Cuba",
    "Iran",
    "North Korea",
    "Syria",
    "Crimea Region",
    "Donetsk/Luhansk (Russia-controlled)",
  ];

  const domainRestricted: { [key: string]: string[] } = {
    chemical: [
      "Russia",
      "China",
      "Syria",
      "any country with active chemical weapons programs",
    ],
    biological: [
      "Russia",
      "China",
      "Iran",
      "any country with active bioweapon programs",
    ],
    radiological: ["Iran", "North Korea", "any radiological threat state"],
    nuclear: [
      "Iran",
      "North Korea",
      "any non-NPT nuclear weapons state",
      "any state pursuing illicit nuclear programs",
    ],
    general: [
      "Sanctioned countries",
      "entities on Commerce Department denied parties list",
    ],
  };

  return [
    ...universallyRestricted,
    ...(domainRestricted[domain] || domainRestricted["general"]),
  ];
}

function determineLegalCompliance(riskClass: string, context: string): string {
  const isExporting =
    context.toLowerCase().includes("export") ||
    context.toLowerCase().includes("international");

  if (riskClass.includes("CRITICAL")) {
    return isExporting
      ? "NON-COMPLIANT without DDTC/BIS pre-approval. Export prohibited without licenses. Risk of criminal penalties (18 USC 1519-1526)."
      : "COMPLIANT domestically only. Export strictly prohibited. Maintain segregation of controlled AI systems.";
  }

  if (riskClass.includes("HIGH")) {
    return isExporting
      ? "Export subject to EAR Part 700. License required (likely denied if CBRN-relevant). Consult export control counsel."
      : "COMPLIANT with documented governance. Monitor for changes in risk classification.";
  }

  return "COMPLIANT with standard AI governance practices. Monitor regulatory developments for changes.";
}

function generateMitigationStrategy(
  riskClass: string,
  domain: string,
  context: string
): string {
  let strategy = "Risk Mitigation Strategy:\n";

  if (riskClass.includes("CRITICAL")) {
    strategy += "1. IMMEDIATE: Conduct formal interagency export control review\n";
    strategy +=
      "2. Implement complete technical isolation (air-gapped systems)\n";
    strategy += "3. Engage classified contracting and export counsel\n";
    strategy +=
      "4. Establish NSC-coordinated governance oversight structure\n";
    strategy += "5. Consider not pursuing deployment if unresolvable export barriers exist\n";
  } else if (riskClass.includes("HIGH")) {
    strategy += "1. Request advisory opinion from Commerce/State departments\n";
    strategy += "2. Implement robust access controls and monitoring\n";
    strategy +=
      "3. Develop export compliance documentation and audit procedures\n";
    strategy += "4. Establish inter-agency review board for ongoing oversight\n";
  } else {
    strategy += "1. Document dual-use risk assessment for compliance file\n";
    strategy += "2. Implement standard AI governance controls\n";
    strategy +=
      "3. Monitor regulatory developments and reassess periodically\n";
  }

  strategy += "6. Maintain detailed decision documentation for regulatory audit";

  return strategy;
}
