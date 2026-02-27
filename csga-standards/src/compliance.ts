import {
  ComplianceCheckInput,
  ComplianceCheckResult,
  ComplianceStatus,
} from "./types.js";

// Compliance Framework Requirements
interface ComplianceFramework {
  name: string;
  applicable_to: string[];
  compliance_percentage: number;
  gaps: string[];
  priority_actions: string[];
  estimated_effort_months: number;
  estimated_cost_usd: number;
}

const COMPLIANCE_DATABASE: Record<string, ComplianceFramework> = {
  nist_csf: {
    name: "NIST Cybersecurity Framework",
    applicable_to: ["Critical Infrastructure", "Technology", "Government"],
    compliance_percentage: 0,
    gaps: [
      "Lack of comprehensive asset inventory",
      "No formalized risk assessment process",
      "Limited access control implementation",
      "Insufficient monitoring and detection capabilities",
      "No formal incident response plan",
    ],
    priority_actions: [
      "Establish governance and risk management framework",
      "Implement asset inventory and classification",
      "Deploy network monitoring and logging",
      "Define and implement access control policies",
      "Develop incident response procedures",
    ],
    estimated_effort_months: 6,
    estimated_cost_usd: 250000,
  },
  iso_27001: {
    name: "ISO/IEC 27001:2022",
    applicable_to: ["All"],
    compliance_percentage: 0,
    gaps: [
      "No formal ISMS policy",
      "Insufficient access controls",
      "Limited cryptography implementation",
      "Weak supplier management",
      "No formal compliance assessment",
    ],
    priority_actions: [
      "Establish ISMS policy and scope",
      "Perform risk assessment",
      "Implement security controls (Annex A)",
      "Establish metrics and monitoring",
      "Plan for third-party audit",
    ],
    estimated_effort_months: 12,
    estimated_cost_usd: 350000,
  },
  hipaa: {
    name: "HIPAA Security Rule",
    applicable_to: ["Healthcare"],
    compliance_percentage: 0,
    gaps: [
      "Insufficient encryption of ePHI",
      "Weak access controls for patient data",
      "Limited audit logging",
      "Lack of workforce security training",
      "No formal Business Associate Agreements",
    ],
    priority_actions: [
      "Conduct HIPAA risk assessment",
      "Implement administrative safeguards",
      "Deploy technical safeguards (encryption, access control)",
      "Establish physical safeguards",
      "Train workforce on HIPAA requirements",
    ],
    estimated_effort_months: 9,
    estimated_cost_usd: 300000,
  },
  pci_dss: {
    name: "PCI DSS v3.2.1",
    applicable_to: ["Finance", "Retail", "E-commerce"],
    compliance_percentage: 0,
    gaps: [
      "Lack of network segmentation",
      "Weak access controls on cardholder data",
      "Insufficient encryption for data in transit",
      "No formal vulnerability scanning program",
      "Limited incident response procedures",
    ],
    priority_actions: [
      "Establish secure network architecture",
      "Implement strong access controls",
      "Deploy encryption for cardholder data",
      "Establish vulnerability management program",
      "Conduct regular security assessment",
    ],
    estimated_effort_months: 8,
    estimated_cost_usd: 280000,
  },
  soc_2: {
    name: "SOC 2 Type II",
    applicable_to: ["Technology", "SaaS", "Cloud Services"],
    compliance_percentage: 0,
    gaps: [
      "Insufficient access controls",
      "Limited logging and monitoring",
      "Weak change management",
      "Insufficient availability controls",
      "Limited encryption implementation",
    ],
    priority_actions: [
      "Establish access control framework",
      "Deploy comprehensive logging and monitoring",
      "Implement change management procedures",
      "Establish disaster recovery plan",
      "Implement data encryption standards",
    ],
    estimated_effort_months: 10,
    estimated_cost_usd: 320000,
  },
  gdpr: {
    name: "GDPR (EU)",
    applicable_to: ["All (if serving EU customers)"],
    compliance_percentage: 0,
    gaps: [
      "Lack of privacy policies",
      "No data processing agreements",
      "Insufficient encryption of personal data",
      "Weak data subject rights fulfillment",
      "No formal DPA implementation",
    ],
    priority_actions: [
      "Conduct data inventory and mapping",
      "Implement Privacy by Design principles",
      "Establish data processing agreements",
      "Implement data encryption",
      "Establish data breach notification process",
    ],
    estimated_effort_months: 8,
    estimated_cost_usd: 250000,
  },
  sox: {
    name: "SOX (Sarbanes-Oxley)",
    applicable_to: ["Finance", "Publicly Traded Companies"],
    compliance_percentage: 0,
    gaps: [
      "Weak IT general controls",
      "Insufficient access controls",
      "Limited audit logging",
      "Weak change management",
      "No formal SOX compliance program",
    ],
    priority_actions: [
      "Establish IT general controls framework",
      "Implement strong access controls",
      "Deploy comprehensive audit logging",
      "Formalize change management",
      "Establish SOX compliance monitoring",
    ],
    estimated_effort_months: 12,
    estimated_cost_usd: 400000,
  },
  cis_controls: {
    name: "CIS Critical Security Controls",
    applicable_to: ["All"],
    compliance_percentage: 0,
    gaps: [
      "Limited control implementation across IG1",
      "No formalized vulnerability management",
      "Weak access control policies",
      "Insufficient endpoint protection",
      "Limited security awareness training",
    ],
    priority_actions: [
      "Implement CIS IG1 controls (Essential)",
      "Establish asset management program",
      "Deploy endpoint protection platform",
      "Implement access control policies",
      "Establish security awareness training",
    ],
    estimated_effort_months: 6,
    estimated_cost_usd: 200000,
  },
};

export function performComplianceCheck(
  input: ComplianceCheckInput
): ComplianceCheckResult {
  const applicableFrameworks = getApplicableFrameworks(input);
  const frameworkStatuses = evaluateCompliance(input, applicableFrameworks);

  const overallRiskLevel = determineOverallRisk(frameworkStatuses);
  const recommendations = generateRecommendations(frameworkStatuses);

  return {
    organization_profile: `${input.organization_type} ${input.size || "Medium"} Organization`,
    assessment_date: new Date().toISOString().split("T")[0],
    frameworks: frameworkStatuses,
    overall_risk_level: overallRiskLevel,
    recommendations,
  };
}

function getApplicableFrameworks(
  input: ComplianceCheckInput
): string[] {
  const applicableMap: Record<string, string[]> = {
    Financial: ["pci_dss", "soc_2", "sox", "nist_csf", "iso_27001", "cis_controls"],
    Healthcare: ["hipaa", "nist_csf", "iso_27001", "cis_controls", "gdpr"],
    Technology: ["soc_2", "iso_27001", "gdpr", "cis_controls", "nist_csf"],
    Retail: ["pci_dss", "gdpr", "iso_27001", "cis_controls"],
    Manufacturing: ["nist_csf", "iso_27001", "cis_controls"],
    Government: ["nist_csf", "iso_27001", "cis_controls"],
    Education: ["ferpa", "nist_csf", "iso_27001", "cis_controls", "gdpr"],
    Other: ["iso_27001", "nist_csf", "cis_controls"],
  };

  return (
    applicableMap[input.organization_type] ||
    applicableMap["Other"]
  );
}

function evaluateCompliance(
  input: ComplianceCheckInput,
  frameworks: string[]
): ComplianceStatus[] {
  const controlScore = calculateControlScore(input.current_controls);

  return frameworks
    .map((frameworkKey) => {
      const framework = COMPLIANCE_DATABASE[frameworkKey];
      if (!framework) return null;

      const applicable = framework.applicable_to.some((sector) =>
        sector.toLowerCase().includes(input.organization_type.toLowerCase())
      );

      if (!applicable) {
        return {
          framework: framework.name,
          status: "Non_Compliant",
          compliance_percentage: 0,
          applicable: false,
          gaps: [],
          priority_actions: [],
          estimated_effort_months: 0,
          estimated_cost_usd: 0,
        };
      }

      // Calculate compliance percentage based on controls
      const compliancePercentage = Math.min(
        100,
        controlScore + (applicable ? 5 : 0)
      );

      const status =
        compliancePercentage >= 80
          ? "Compliant"
          : compliancePercentage >= 50
            ? "Partially_Compliant"
            : "Non_Compliant";

      return {
        framework: framework.name,
        status,
        compliance_percentage: compliancePercentage,
        applicable: true,
        gaps: framework.gaps.slice(0, 4),
        priority_actions: framework.priority_actions.slice(0, 3),
        estimated_effort_months: framework.estimated_effort_months,
        estimated_cost_usd: framework.estimated_cost_usd,
      };
    })
    .filter((status): status is ComplianceStatus => status !== null);
}

function calculateControlScore(controls: string[]): number {
  let score = 0;

  // Basic scoring logic
  const scoreMap: Record<string, number> = {
    firewall: 10,
    ids_ips: 8,
    siem: 12,
    endpoint_protection: 8,
    vulnerability_management: 10,
    access_control: 10,
    mfa: 8,
    encryption: 10,
    audit_logging: 8,
    incident_response: 10,
    vulnerability_scanning: 8,
    penetration_testing: 8,
    security_training: 6,
    asset_management: 8,
    change_management: 6,
  };

  controls.forEach((control) => {
    const normalizedControl = control.toLowerCase().replace(/\s+/g, "_");
    for (const [key, points] of Object.entries(scoreMap)) {
      if (normalizedControl.includes(key.toLowerCase())) {
        score += points;
      }
    }
  });

  return Math.min(60, score); // Cap at 60 to account for baseline
}

function determineOverallRisk(
  frameworkStatuses: ComplianceStatus[]
): "Critical" | "High" | "Medium" | "Low" {
  const criticalCount = frameworkStatuses.filter(
    (f) => f.status === "Non_Compliant"
  ).length;
  const partialCount = frameworkStatuses.filter(
    (f) => f.status === "Partially_Compliant"
  ).length;

  if (criticalCount >= 3) return "Critical";
  if (criticalCount >= 1 && partialCount >= 2) return "High";
  if (partialCount >= 3) return "Medium";
  return "Low";
}

function generateRecommendations(
  frameworkStatuses: ComplianceStatus[]
): string[] {
  const recommendations: string[] = [];

  // Identify priority frameworks
  const nonCompliant = frameworkStatuses.filter(
    (f) => f.status === "Non_Compliant"
  );

  if (nonCompliant.length > 0) {
    recommendations.push(
      `Address critical compliance gaps in ${nonCompliant.map((f) => f.framework).join(", ")}`
    );
  }

  // Add control recommendations
  const allGaps = new Set<string>();
  frameworkStatuses.forEach((f) => {
    f.gaps.forEach((gap) => allGaps.add(gap));
  });

  Array.from(allGaps)
    .slice(0, 3)
    .forEach((gap) => {
      recommendations.push(`Implement: ${gap}`);
    });

  // Add resource recommendations
  const totalEffort = frameworkStatuses.reduce(
    (sum, f) => sum + f.estimated_effort_months,
    0
  );
  const totalCost = frameworkStatuses.reduce(
    (sum, f) => sum + f.estimated_cost_usd,
    0
  );

  recommendations.push(
    `Allocate approximately ${totalEffort} months and ${totalCost} USD to achieve full compliance`
  );

  recommendations.push("Establish ongoing compliance monitoring program");
  recommendations.push(
    "Conduct regular compliance audits and assessments"
  );

  return recommendations;
}
