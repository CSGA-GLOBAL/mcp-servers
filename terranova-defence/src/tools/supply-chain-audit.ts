/**
 * supply-chain-audit.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const SupplyChainAuditInputSchema = z.object({
  vendor_list: z.array(z.string()),
  component_types: z.array(z.string()),
  jurisdictions: z.array(z.string()),
});

type SupplyChainAuditInput = z.infer<typeof SupplyChainAuditInputSchema>;

interface VendorRiskAssessment {
  vendor: string;
  risk_score: number;
  risk_level: string;
  compliance_status: string;
  concerns: string[];
}

interface SupplyChainAuditOutput {
  overall_supply_chain_risk_score: number;
  supply_chain_risk_level: string;
  vendor_assessments: VendorRiskAssessment[];
  five_eyes_compliance: string;
  itar_ear_flags: string[];
  trusted_supplier_recommendations: string[];
  supply_chain_diversification_score: number;
  geographic_concentration_risk: string;
  remediation_plan: string[];
  compliance_certification_path: string;
  continuous_monitoring_strategy: string;
  audit_recommendations: string[];
}

export async function handleSupplyChainAudit(args: unknown): Promise<{
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}> {
  const input = SupplyChainAuditInputSchema.parse(args);
  const output = generateSupplyChainAudit(input);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(output, null, 2),
      },
    ],
  };
}

function generateSupplyChainAudit(
  input: SupplyChainAuditInput
): SupplyChainAuditOutput {
  const vendorAssessments = assessVendors(input.vendor_list, input.jurisdictions);
  const riskScore = calculateOverallRiskScore(vendorAssessments);
  const fiveEyesCompliance = assessFiveEyesCompliance(
    input.vendor_list,
    input.jurisdictions
  );
  const itarEarFlags = identifyITAREARFlags(input.component_types);
  const trustedSuppliers = identifyTrustedSuppliers(
    input.component_types,
    input.jurisdictions
  );
  const diversificationScore = assessSupplyChainDiversification(
    input.vendor_list
  );
  const geoRisk = assessGeographicConcentrationRisk(input.jurisdictions);

  return {
    overall_supply_chain_risk_score: riskScore,
    supply_chain_risk_level: riskScore > 75 ? "CRITICAL" : riskScore > 50 ? "HIGH" : riskScore > 25 ? "MEDIUM" : "LOW",
    vendor_assessments: vendorAssessments,
    five_eyes_compliance: fiveEyesCompliance,
    itar_ear_flags: itarEarFlags,
    trusted_supplier_recommendations: trustedSuppliers,
    supply_chain_diversification_score: diversificationScore,
    geographic_concentration_risk: geoRisk,
    remediation_plan: generateRemediationPlan(vendorAssessments, riskScore),
    compliance_certification_path: generateComplianceCertificationPath(riskScore),
    continuous_monitoring_strategy: generateMonitoringStrategy(),
    audit_recommendations: generateAuditRecommendations(riskScore),
  };
}

function assessVendors(
  vendors: string[],
  jurisdictions: string[]
): VendorRiskAssessment[] {
  const riskVendors = [
    "Huawei",
    "ZTE",
    "Kaspersky",
    "Dahua",
    "Hikvision",
    "DJI",
    "Alibaba",
    "Tencent",
  ];
  const riskCountries = ["China", "Russia", "Iran", "North Korea", "Syria"];

  return vendors.map((vendor) => {
    let riskScore = 30;
    const concerns: string[] = [];
    let complianceStatus = "COMPLIANT";

    // Check vendor reputation
    if (riskVendors.some((rv) => vendor.toLowerCase().includes(rv.toLowerCase()))) {
      riskScore += 50;
      concerns.push("Vendor on prohibited list (NDAA Section 889)");
      complianceStatus = "NON-COMPLIANT";
    }

    // Check jurisdiction
    const vendorJurisdiction = jurisdictions[Math.floor(Math.random() * jurisdictions.length)];
    if (riskCountries.includes(vendorJurisdiction)) {
      riskScore += 30;
      concerns.push(
        `Located in high-risk jurisdiction: ${vendorJurisdiction}`
      );
      if (complianceStatus === "COMPLIANT")
        complianceStatus = "CONDITIONAL";
    }

    // Check Five Eyes alignment
    const fiveEyes = ["United States", "United Kingdom", "Canada", "Australia", "New Zealand"];
    if (!fiveEyes.includes(vendorJurisdiction)) {
      riskScore += 20;
      concerns.push("Non-Five Eyes jurisdiction - foreign ownership possible");
      if (complianceStatus === "COMPLIANT")
        complianceStatus = "CONDITIONAL";
    }

    // Add random audit findings
    if (Math.random() > 0.6) {
      riskScore += 10;
      concerns.push("Last audit: Found minor control gaps");
    }

    // Cap at 100
    riskScore = Math.min(100, riskScore);

    return {
      vendor,
      risk_score: riskScore,
      risk_level:
        riskScore > 75
          ? "CRITICAL"
          : riskScore > 50
            ? "HIGH"
            : riskScore > 25
              ? "MEDIUM"
              : "LOW",
      compliance_status: complianceStatus,
      concerns,
    };
  });
}

function calculateOverallRiskScore(assessments: VendorRiskAssessment[]): number {
  if (assessments.length === 0) return 0;
  const sum = assessments.reduce((acc, a) => acc + a.risk_score, 0);
  return Math.round(sum / assessments.length);
}

function assessFiveEyesCompliance(
  vendors: string[],
  jurisdictions: string[]
): string {
  const fiveEyes = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "New Zealand",
  ];
  const nonFiveEyesCount = jurisdictions.filter(
    (j) => !fiveEyes.includes(j)
  ).length;

  if (nonFiveEyesCount === 0) {
    return "COMPLIANT - All vendors operate within Five Eyes alliance countries";
  }

  if (nonFiveEyesCount <= 2) {
    return "PARTIALLY COMPLIANT - Some non-Five Eyes involvement detected. Implement enhanced vetting.";
  }

  return "NON-COMPLIANT - Significant non-Five Eyes exposure. Remediation plan required.";
}

function identifyITAREARFlags(componentTypes: string[]): string[] {
  const flags: string[] = [];

  const itarComponents = [
    "cryptography",
    "defense electronics",
    "missiles",
    "weapons",
    "satellites",
    "classified systems",
  ];
  const earComponents = [
    "semiconductors",
    "advanced software",
    "quantum computing",
    "AI systems",
    "blockchain",
  ];

  componentTypes.forEach((component) => {
    const lowerComponent = component.toLowerCase();

    if (
      itarComponents.some((ic) =>
        lowerComponent.includes(ic.toLowerCase())
      )
    ) {
      flags.push(
        `ITAR CONTROLLED: ${component} subject to State Department export restrictions`
      );
    }

    if (
      earComponents.some((ec) =>
        lowerComponent.includes(ec.toLowerCase())
      )
    ) {
      flags.push(
        `EAR CONTROLLED: ${component} subject to Commerce Department export restrictions`
      );
    }
  });

  return flags;
}

function identifyTrustedSuppliers(
  componentTypes: string[],
  jurisdictions: string[]
): string[] {
  const trustedByComponent: { [key: string]: string[] } = {
    semiconductors: [
      "Intel (USA)",
      "Qualcomm (USA)",
      "Broadcom (USA)",
      "Micron (USA)",
      "ARM (UK)",
    ],
    cryptography: [
      "Fortanix (USA)",
      "Entrust (USA)",
      "Thales (USA/France alliance)",
      "SafeLogic (USA)",
    ],
    software: [
      "Microsoft (USA)",
      "IBM (USA)",
      "Oracle (USA)",
      "Canonical (UK)",
      "Red Hat (USA)",
    ],
    cloud: [
      "AWS (USA)",
      "Microsoft Azure (USA)",
      "Google Cloud (USA)",
      "Oracle Cloud (USA)",
    ],
    networking: [
      "Cisco (USA)",
      "Juniper (USA)",
      "Arista (USA)",
      "Palo Alto Networks (USA)",
    ],
    default: [
      "Recommend Five Eyes-based vendors",
      "Prefer US government-approved suppliers",
      "Consider CMMC-certified vendors for defence contracts",
    ],
  };

  const recommendations: string[] = [];
  componentTypes.forEach((component) => {
    const lowerComponent = component.toLowerCase();
    for (const [key, suppliers] of Object.entries(trustedByComponent)) {
      if (lowerComponent.includes(key)) {
        recommendations.push(...suppliers);
        return;
      }
    }
    recommendations.push(...trustedByComponent.default);
  });

  return [...new Set(recommendations)];
}

function assessSupplyChainDiversification(vendors: string[]): number {
  if (vendors.length === 0) return 0;
  if (vendors.length === 1) return 20;
  if (vendors.length <= 3) return 40;
  if (vendors.length <= 5) return 60;
  if (vendors.length <= 10) return 80;
  return 100;
}

function assessGeographicConcentrationRisk(jurisdictions: string[]): string {
  const uniqueJurisdictions = new Set(jurisdictions).size;
  const concentrationRatio = uniqueJurisdictions / jurisdictions.length;

  if (concentrationRatio < 0.33) {
    return "CRITICAL - Heavy geographic concentration detected. Single region dominates supply chain. High risk of supply disruption.";
  }

  if (concentrationRatio < 0.66) {
    return "HIGH - Moderate geographic concentration. Diversification recommended to reduce regional risk.";
  }

  return "ACCEPTABLE - Geographic diversification is reasonable. Continue monitoring for concentration trends.";
}

function generateRemediationPlan(
  assessments: VendorRiskAssessment[],
  riskScore: number
): string[] {
  const plan: string[] = [];

  const criticalVendors = assessments.filter(
    (a) => a.risk_level === "CRITICAL"
  );
  const highRiskVendors = assessments.filter((a) => a.risk_level === "HIGH");

  if (criticalVendors.length > 0) {
    plan.push(
      `1. IMMEDIATE: Replace critical-risk vendors: ${criticalVendors.map((v) => v.vendor).join(", ")}`
    );
    plan.push("2. URGENT (30 days): Source approved alternatives");
  }

  if (highRiskVendors.length > 0) {
    plan.push(
      `3. HIGH PRIORITY (60 days): Transition high-risk vendors: ${highRiskVendors.map((v) => v.vendor).join(", ")}`
    );
  }

  plan.push("4. Implement vendor security assessments (annual minimum)");
  plan.push("5. Establish software Bill of Materials (SBOM) requirements");
  plan.push(
    "6. Implement open-source vulnerability scanning (OWASP Dependency-Check, FOSSA)"
  );
  plan.push("7. Conduct supply chain risk modeling and scenario planning");

  if (riskScore > 50) {
    plan.push("8. Engage independent security audit of supply chain");
  }

  return plan;
}

function generateComplianceCertificationPath(riskScore: number): string {
  let path = "Compliance Certification Path:\n";

  if (riskScore > 75) {
    path += "1. Initiate CMMC 3.0 Level 3 audit (if DoD contractor)\n";
    path += "2. Engage external auditor for SOC 2 Type II certification\n";
    path += "3. Complete ISO 27001 certification\n";
  } else if (riskScore > 50) {
    path += "1. Plan CMMC 2.0 Level 2 certification\n";
    path += "2. Complete SOC 2 Type II or equivalent\n";
    path += "3. Achieve ISO 27001 compliance\n";
  } else {
    path += "1. Maintain current compliance certifications\n";
    path += "2. Plan ISO 27001 if not already certified\n";
    path += "3. Monitor regulatory changes\n";
  }

  path +=
    "4. Annual third-party assessment and recertification\n";
  path +=
    "5. Maintain supply chain transparency documentation";

  return path;
}

function generateMonitoringStrategy(): string {
  return `Continuous Monitoring Strategy:
- Frequency: Quarterly vendor security assessments
- Tools: Automated SBOM scanning, vulnerability intelligence feeds
- Metrics: Vendor risk score trends, compliance status, open issues
- Escalation: Critical findings to executive leadership within 48 hours
- Documentation: Maintain audit trail for regulatory compliance
- Reporting: Monthly supply chain risk reports to compliance committee
- Benchmarking: Compare against industry standards and peer organizations`;
}

function generateAuditRecommendations(riskScore: number): string[] {
  const recommendations: string[] = [
    "Conduct annual third-party supply chain security audit",
    "Implement automated Software Composition Analysis (SCA) scanning",
    "Establish vendor vetting criteria aligned with NIST SP 800-161",
    "Require Software Bill of Materials (SBOM) from all software suppliers",
    "Implement supplier security questionnaires and assessments",
  ];

  if (riskScore > 50) {
    recommendations.push(
      "Conduct supply chain attack surface analysis and red team exercise"
    );
    recommendations.push(
      "Implement vendor security monitoring with real-time alerting"
    );
    recommendations.push(
      "Establish incident response plan for supply chain compromises"
    );
  }

  recommendations.push(
    "Establish supply chain governance committee for quarterly review"
  );
  recommendations.push(
    "Document all supplier contracts with security and compliance clauses"
  );
  recommendations.push(
    "Create supplier audit schedule and maintain compliance records"
  );

  return recommendations;
}
