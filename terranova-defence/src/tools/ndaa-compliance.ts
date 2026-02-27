/**
 * ndaa-compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const NDAEComplianceInputSchema = z.object({
  organization_type: z.enum(["contractor", "subcontractor", "vendor", "system_integrator"]),
  supply_chain_components: z.array(z.string()),
  country_of_origin_list: z.array(z.string()),
  contract_type: z.enum(["DoD_contract", "Federal_contract", "Commercial"]),
});

type NDAEComplianceInput = z.infer<typeof NDAEComplianceInputSchema>;

interface ComplianceFlag {
  component: string;
  risk_level: string;
  violation_type: string;
  remediation: string;
}

interface NDAEComplianceOutput {
  overall_compliance_status: string;
  compliance_percentage: number;
  section_889_compliance: boolean;
  prohibited_components_identified: ComplianceFlag[];
  supply_chain_risk_assessment: string;
  cmmc_level_assessment: string;
  remediation_steps: string[];
  estimated_remediation_cost: string;
  timeline_to_compliance: string;
  legal_exposure: string;
  procurement_recommendations: string;
  continuous_monitoring_plan: string;
}

export async function handleNDAACompliance(args: unknown): Promise<{
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}> {
  const input = NDAEComplianceInputSchema.parse(args);
  const output = generateNDAEComplianceAssessment(input);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(output, null, 2),
      },
    ],
  };
}

function generateNDAEComplianceAssessment(
  input: NDAEComplianceInput
): NDAEComplianceOutput {
  const prohibitedVendors = [
    "Huawei",
    "ZTE",
    "Kaspersky",
    "Dahua",
    "Hikvision",
    "DJI",
    "Tencent Cloud",
    "Alibaba Cloud",
    "Baidu",
  ];
  const riskCountries = [
    "China",
    "Russia",
    "Iran",
    "North Korea",
    "Syria",
    "Belarus",
  ];

  const prohibitedComponents: ComplianceFlag[] = [];
  let complianceScore = 100;

  input.supply_chain_components.forEach((component) => {
    prohibitedVendors.forEach((vendor) => {
      if (component.toLowerCase().includes(vendor.toLowerCase())) {
        prohibitedComponents.push({
          component,
          risk_level: "CRITICAL",
          violation_type: "NDAA Section 889(a)(1) - Prohibited Equipment",
          remediation:
            "Immediate replacement with compliant alternative required. No federal contract work permitted with prohibited equipment.",
        });
        complianceScore -= 20;
      }
    });
  });

  input.country_of_origin_list.forEach((country) => {
    if (riskCountries.includes(country)) {
      prohibitedComponents.push({
        component: `Component sourced from ${country}`,
        risk_level: "HIGH",
        violation_type: "NDAA Section 889(a)(2) - Country of Origin Restriction",
        remediation:
          "Supply chain diversification required. Source from approved countries (Five Eyes + allied nations preferred).",
      });
      complianceScore -= 15;
    }
  });

  const cmmc_assessment = determineCMMCLevel(input.organization_type);
  const overall_status = complianceScore >= 90 ? "COMPLIANT" : "NON-COMPLIANT";

  const remediation_steps = generateRemediationSteps(
    prohibitedComponents,
    input.contract_type
  );

  return {
    overall_compliance_status: overall_status,
    compliance_percentage: Math.max(0, complianceScore),
    section_889_compliance: complianceScore >= 90,
    prohibited_components_identified: prohibitedComponents,
    supply_chain_risk_assessment: generateSupplyChainRiskAssessment(input),
    cmmc_level_assessment: cmmc_assessment,
    remediation_steps,
    estimated_remediation_cost: estimateRemediationCost(prohibitedComponents),
    timeline_to_compliance: determineTimelineToCompliance(prohibitedComponents),
    legal_exposure: generateLegalExposure(
      prohibitedComponents,
      input.contract_type
    ),
    procurement_recommendations: generateProcurementRecommendations(input),
    continuous_monitoring_plan: generateMonitoringPlan(input),
  };
}

function determineCMMCLevel(organizationType: string): string {
  const levelMap: { [key: string]: string } = {
    contractor: "CMMC 2.0 Level 2 (75+ controls) recommended for DoD contracts",
    subcontractor:
      "CMMC 2.0 Level 2 required if handling CUI; Level 1 for basic compliance",
    vendor:
      "CMMC 2.0 Level 1-2 depending on contract scope and data access",
    system_integrator:
      "CMMC 2.0 Level 3 (minimum 110+ controls) recommended for system-wide integration",
  };

  return (
    levelMap[organizationType] || "CMMC 2.0 Level 2 (default recommendation)"
  );
}

function generateRemediationSteps(
  prohibitedComponents: ComplianceFlag[],
  contractType: string
): string[] {
  const steps: string[] = [
    "1. Conduct comprehensive supply chain audit to identify all equipment/software from prohibited sources",
    "2. Document all non-compliant items with acquisition dates, serial numbers, and usage context",
    "3. Notify federal contracting officer and compliance team of discovered violations",
  ];

  if (prohibitedComponents.length > 0) {
    steps.push(
      "4. IMMEDIATE: Isolate and remove prohibited equipment from federal contract work"
    );
    steps.push(
      "5. Develop procurement plan for compliant replacements (60-90 day target)"
    );
    steps.push(
      "6. Implement vendor vetting process aligned with DoD software Bill of Materials (SBOM) requirements"
    );
    steps.push(
      "7. Establish supply chain risk management (SCRM) program per NIST SP 800-161"
    );
    steps.push(
      "8. Implement continuous monitoring using automated tools (Nexus IQ, Black Duck, Snyk recommended)"
    );
  } else {
    steps.push(
      "4. Implement preventive controls: (a) Approved vendor list; (b) SBOM review; (c) Third-party assessments"
    );
    steps.push(
      "5. Establish quarterly compliance reviews and supply chain audits"
    );
  }

  steps.push("6. Train personnel on NDAA Section 889 requirements");
  steps.push(
    "7. Document all remediation activities for federal audit compliance"
  );

  if (contractType === "DoD_contract") {
    steps.push(
      "8. Submit SPRS (System for Award Management) declaration of compliance"
    );
    steps.push("9. Prepare for DCMA (Defense Contract Management Agency) audit");
  }

  return steps;
}

function generateSupplyChainRiskAssessment(
  input: NDAEComplianceInput
): string {
  let riskLevel = "LOW";

  if (input.supply_chain_components.some((c) =>
    ["cloud", "saas", "api"].some((t) => c.toLowerCase().includes(t))
  )) {
    riskLevel = "MEDIUM";
  }

  if (
    input.country_of_origin_list.some((c) =>
      ["China", "Russia"].includes(c)
    )
  ) {
    riskLevel = "HIGH";
  }

  const assessments: { [key: string]: string } = {
    LOW: "Green status: Supply chain demonstrates low risk profile. Vendor diversity is appropriate. Recommend standard NDAA compliance monitoring.",
    MEDIUM:
      "Yellow status: Moderate supply chain concentration risk detected. Diversification recommended. Heightened monitoring of cloud/SaaS providers required.",
    HIGH: "Red status: Critical supply chain vulnerabilities identified. Immediate action required. Risk of federal contract termination or penalties. Escalate to compliance leadership.",
  };

  return (
    assessments[riskLevel] ||
    "Assessment inconclusive. Recommend manual security review."
  );
}

function estimateRemediationCost(components: ComplianceFlag[]): string {
  const criticalComponents = components.filter(
    (c) => c.risk_level === "CRITICAL"
  ).length;
  const highRiskComponents = components.filter(
    (c) => c.risk_level === "HIGH"
  ).length;

  const costEstimate = criticalComponents * 150000 + highRiskComponents * 50000;

  if (costEstimate === 0) {
    return "Estimated cost: $25,000-$75,000 (preventive controls implementation)";
  }

  return `Estimated cost: $${costEstimate.toLocaleString()} (equipment replacement + remediation)`;
}

function determineTimelineToCompliance(components: ComplianceFlag[]): string {
  const criticalCount = components.filter((c) => c.risk_level === "CRITICAL")
    .length;

  if (criticalCount > 0) {
    return "URGENT: 30 days to operational remediation; 90 days to full compliance";
  }

  return "60-120 days depending on component availability and replacement complexity";
}

function generateLegalExposure(
  components: ComplianceFlag[],
  contractType: string
): string {
  if (components.length === 0) {
    return "No current legal exposure. Maintain compliance posture.";
  }

  const criticalCount = components.filter((c) => c.risk_level === "CRITICAL")
    .length;

  let exposure = `Current violations: ${components.length} component(s)`;

  if (contractType === "DoD_contract") {
    exposure += "\n- Federal contract termination risk (FAR 49.201-1)";
    exposure +=
      "\n- Debarment from federal procurement (up to 3 years under FAR 9.406)";
    exposure += "\n- Civil penalties: Up to $250,000 per violation";
    exposure +=
      "\n- Criminal penalties: Potential imprisonment and fines for knowing violations";
  }

  if (criticalCount > 0) {
    exposure +=
      "\n- Immediate suspension of affected contracts likely if violations become public";
    exposure +=
      "\n- Reputation damage and future contract award jeopardy";
  }

  return exposure;
}

function generateProcurementRecommendations(
  input: NDAEComplianceInput
): string {
  let recommendations = "NDAA-Compliant Procurement Strategy:\n";
  recommendations +=
    "1. Approved Vendor Management: Maintain list of vetted vendors compliant with NDAA Section 889\n";
  recommendations +=
    "2. SBOM Requirements: Require software Bill of Materials from all software suppliers\n";
  recommendations +=
    "3. Country of Origin Verification: Validate manufacturing location documentation\n";
  recommendations +=
    "4. Third-party Assessments: Use CISA, NIST, or industry-recognized assessors\n";
  recommendations +=
    "5. Contract Language: Include NDAA compliance clauses and audit rights\n";

  if (input.organization_type === "system_integrator") {
    recommendations +=
      "6. System Integration: Implement comprehensive component tracking and traceability\n";
  }

  recommendations +=
    "7. Continuous Monitoring: Deploy automated supply chain monitoring tools\n";
  recommendations +=
    "8. Training: Annual NDAA compliance training for procurement personnel";

  return recommendations;
}

function generateMonitoringPlan(input: NDAEComplianceInput): string {
  let plan = "Continuous Compliance Monitoring Program:\n";
  plan += "Frequency: Quarterly supply chain audits\n";
  plan += "Tools: Nexus IQ, Black Duck, FOSSA, or equivalent SCA platform\n";
  plan += "Metrics: (1) Vendor compliance status; (2) Open-source vulnerability tracking; ";
  plan += "(3) Country of origin compliance; (4) SBOM currency\n";
  plan += "Governance: Monthly compliance steering committee review\n";
  plan += "Documentation: Maintain audit trail for federal contract compliance\n";
  plan += "Escalation: Critical violations to executive leadership within 24 hours\n";

  if (input.contract_type === "DoD_contract") {
    plan +=
      "DoD Coordination: Quarterly reporting to contracting officer and DCMA\n";
  }

  plan += "Remediation SLA: Critical items resolved within 30 days";

  return plan;
}
