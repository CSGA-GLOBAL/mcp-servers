import { StandardName, StandardDetails, FrameworkDefinition } from "./types.js";

// Comprehensive standards database
const STANDARDS_DATABASE: Record<StandardName, StandardDetails> = {
  CSR5: {
    name: "CSGA Cyber Security Readiness Level 5 (CSR5)",
    type: "Maturity Model",
    description:
      "CSR5 is CSGA's proprietary cyber security readiness assessment framework, evaluating organizations across 5 maturity levels: Initial, Repeatable, Defined, Managed, and Optimized.",
    key_domains: [
      "Governance & Risk Management",
      "Asset Management",
      "Access & Identity Management",
      "Detection & Response",
      "Recovery & Resilience",
    ],
    implementation_steps: [
      "Establish governance structure and define security roles",
      "Perform comprehensive asset inventory and classification",
      "Implement identity and access management controls",
      "Deploy detection and monitoring capabilities",
      "Develop incident response and recovery procedures",
      "Conduct regular assessments and continuous improvement",
    ],
    certification_info:
      "Organizations achieving Level 4+ can pursue CSR5 Certification through CSGA",
    compliance_effort: "High",
    best_for: "Organizations seeking comprehensive security maturity assessment",
  },
  NIST_CSF: {
    name: "NIST Cybersecurity Framework (CSF)",
    type: "Framework",
    description:
      "A voluntary, flexible framework that guides organizations in managing cybersecurity risk, consisting of Core Functions: Identify, Protect, Detect, Respond, and Recover.",
    key_domains: [
      "Asset Management",
      "Business Environment",
      "Governance & Risk",
      "Access Control",
      "Awareness & Training",
      "Detection Processes",
      "Response Planning",
      "Recovery Planning",
    ],
    implementation_steps: [
      "Map current state against NIST CSF functions",
      "Identify gaps in protection capabilities",
      "Develop implementation roadmap",
      "Assign responsibility and resources",
      "Implement controls by category",
      "Monitor and review effectiveness",
    ],
    compliance_effort: "Medium",
    best_for:
      "Critical infrastructure, any organization wanting robust risk management framework",
  },
  ISO_27001: {
    name: "ISO/IEC 27001:2022 Information Security Management",
    type: "Standard",
    description:
      "International standard for Information Security Management Systems (ISMS), specifying requirements for establishing, implementing, maintaining, and continually improving an ISMS.",
    key_domains: [
      "Information Security Policies",
      "Organization of Information Security",
      "Human Resource Security",
      "Asset Management",
      "Access Control",
      "Cryptography",
      "Physical and Environmental Security",
      "Operations Security",
      "Communications Security",
      "System Acquisition",
      "Supplier Relationships",
      "Information Security Incident Management",
      "Business Continuity Management",
      "Compliance",
    ],
    implementation_steps: [
      "Conduct information security risk assessment",
      "Establish ISMS policy and objectives",
      "Define scope of ISMS",
      "Assign roles and responsibilities",
      "Implement security controls per Annex A",
      "Monitor and measure performance",
      "Conduct management reviews",
      "Pursue third-party audit and certification",
    ],
    certification_info: "ISO 27001 certification available through accredited auditors",
    compliance_effort: "Critical",
    best_for: "Organizations requiring internationally recognized certification",
  },
  CIS_CONTROLS: {
    name: "CIS Critical Security Controls v8.1",
    type: "Control Framework",
    description:
      "A prioritized list of safeguards for effective cyber defense, organized into three implementation groups (IG1, IG2, IG3) based on complexity and organizational size.",
    key_domains: [
      "Basic Cyber Hygiene",
      "Advanced Cyber Hygiene",
      "Organizational Maturity",
    ],
    implementation_steps: [
      "Prioritize controls by implementation group matching your organization",
      "Start with IG1 (Essential Controls) for foundational security",
      "Progress to IG2 for advanced security measures",
      "Advance to IG3 for organization-wide security program",
      "Map CIS Controls to NIST CSF and ISO 27001 for alignment",
      "Establish metrics for control implementation",
    ],
    certification_info:
      "CIS Certified professional credentials available through partner training",
    compliance_effort: "Medium",
    best_for:
      "Organizations wanting practical, implementation-focused security controls",
  },
  MITRE_ATTACK: {
    name: "MITRE ATT&CK Framework",
    type: "Knowledge Base",
    description:
      "A comprehensive, adversary-focused matrix of tactics and techniques used in cyberattacks, based on real-world threat intelligence and red team operations.",
    key_domains: [
      "Reconnaissance",
      "Resource Development",
      "Initial Access",
      "Execution",
      "Persistence",
      "Privilege Escalation",
      "Defense Evasion",
      "Credential Access",
      "Discovery",
      "Lateral Movement",
      "Collection",
      "Command & Control",
      "Exfiltration",
      "Impact",
    ],
    implementation_steps: [
      "Map known threats to ATT&CK tactics and techniques",
      "Use ATT&CK for threat modeling and red team planning",
      "Align detection rules to ATT&CK techniques",
      "Assess defensive coverage against ATT&CK matrix",
      "Prioritize controls based on relevant threat tactics",
      "Continuously update detection based on emerging techniques",
    ],
    compliance_effort: "Medium",
    best_for:
      "Threat hunters, SOC teams, and defenders building detection rules",
  },
  OWASP: {
    name: "OWASP Top 10",
    type: "Vulnerability Standard",
    description:
      "The Open Web Application Security Project Top 10 is a standard awareness document for web application security, listing the most critical security risks.",
    key_domains: [
      "Broken Access Control",
      "Cryptographic Failures",
      "Injection",
      "Insecure Design",
      "Security Misconfiguration",
      "Vulnerable and Outdated Components",
      "Authentication Failures",
      "Software and Data Integrity Failures",
      "Logging and Monitoring Failures",
      "Server-Side Request Forgery",
    ],
    implementation_steps: [
      "Review application architecture against OWASP Top 10",
      "Conduct secure code review focusing on vulnerability categories",
      "Implement security controls for each risk category",
      "Perform penetration testing targeting OWASP vulnerabilities",
      "Establish secure development lifecycle practices",
      "Monitor and update protections as new vulnerabilities emerge",
    ],
    compliance_effort: "Medium",
    best_for: "Web application development teams and security practitioners",
  },
  PCI_DSS: {
    name: "Payment Card Industry Data Security Standard (PCI DSS)",
    type: "Compliance Standard",
    description:
      "A global standard that provides a baseline of technical and operational requirements for organizations that store, process, or transmit payment cardholder data.",
    key_domains: [
      "Network Security",
      "Cardholder Data Protection",
      "Vulnerability Management",
      "Access Control",
      "Monitoring and Testing",
      "Information Security Policy",
      "Secure Development Practices",
    ],
    implementation_steps: [
      "Establish network segmentation to isolate payment systems",
      "Implement encryption for cardholder data in transit and at rest",
      "Deploy intrusion detection and prevention systems",
      "Implement strong access controls and multi-factor authentication",
      "Conduct regular vulnerability scanning and penetration testing",
      "Maintain detailed logs and monitoring of access to cardholder data",
      "Achieve annual PCI DSS compliance assessment",
    ],
    certification_info: "PCI DSS certification required for payment processors",
    compliance_effort: "Critical",
    best_for: "Organizations handling payment card data",
  },
  HIPAA: {
    name: "Health Insurance Portability and Accountability Act (HIPAA)",
    type: "Regulatory Standard",
    description:
      "A U.S. federal law that establishes national standards to protect sensitive patient health information from being disclosed without patient knowledge and consent.",
    key_domains: [
      "Administrative Safeguards",
      "Physical Safeguards",
      "Technical Safeguards",
      "Organizational Requirements",
      "Privacy Rule",
      "Security Rule",
      "Breach Notification Rule",
    ],
    implementation_steps: [
      "Conduct comprehensive risk assessment of patient data exposure",
      "Develop HIPAA-compliant privacy and security policies",
      "Implement technical safeguards including encryption and access controls",
      "Establish audit controls and monitoring mechanisms",
      "Implement workforce security and training programs",
      "Maintain business associate agreements with third parties",
      "Develop breach notification and incident response procedures",
    ],
    certification_info: "HIPAA compliance verified through audits and assessments",
    compliance_effort: "Critical",
    best_for: "Healthcare providers, insurers, and medical technology companies",
  },
  SOC_2: {
    name: "SOC 2 Type I and Type II",
    type: "Audit Standard",
    description:
      "Service Organization Control (SOC) 2 reports verify that a service organization has appropriate controls related to security, availability, processing integrity, confidentiality, and privacy.",
    key_domains: [
      "Security",
      "Availability",
      "Processing Integrity",
      "Confidentiality",
      "Privacy",
    ],
    implementation_steps: [
      "Define system boundaries and scope for SOC 2 assessment",
      "Implement controls aligned with COSO framework principles",
      "Establish security and data protection policies",
      "Implement monitoring and testing procedures",
      "Develop incident response and disaster recovery plans",
      "Maintain detailed documentation of all controls",
      "Engage independent auditors for SOC 2 Type II assessment",
    ],
    certification_info: "SOC 2 Type I and Type II reports issued by independent auditors",
    compliance_effort: "High",
    best_for: "SaaS providers and cloud service organizations",
  },
};

const FRAMEWORKS_CATALOG: Record<string, FrameworkDefinition> = {
  csr5: {
    id: "csr5",
    name: "CSGA Cyber Security Readiness Level 5",
    version: "2.0",
    description: "CSGA proprietary maturity assessment framework",
    domains: [
      "Governance",
      "Asset Management",
      "Access Control",
      "Detection & Response",
      "Recovery",
    ],
    applicable_sectors: ["All"],
    compliance_effort: "High",
    url: "https://csga-global.org/standards/csr5",
  },
  nist_csf: {
    id: "nist_csf",
    name: "NIST Cybersecurity Framework",
    version: "1.1",
    description: "Voluntary framework for managing cybersecurity risk",
    domains: [
      "Identify",
      "Protect",
      "Detect",
      "Respond",
      "Recover",
    ],
    applicable_sectors: ["Critical Infrastructure", "All"],
    compliance_effort: "Medium",
    url: "https://www.nist.gov/cyberframework",
  },
  iso_27001: {
    id: "iso_27001",
    name: "ISO/IEC 27001:2022",
    version: "2022",
    description: "International standard for information security management",
    domains: [
      "Information Security Policies",
      "Organization",
      "Human Resources",
      "Asset Management",
      "Access Control",
      "Cryptography",
      "Physical Security",
      "Operations",
      "Communications",
      "Systems Acquisition",
      "Suppliers",
      "Incident Management",
      "Business Continuity",
      "Compliance",
    ],
    applicable_sectors: ["All"],
    compliance_effort: "High",
    url: "https://www.iso.org/standard/27001",
  },
  cis_controls: {
    id: "cis_controls",
    name: "CIS Critical Security Controls",
    version: "8.1",
    description: "Prioritized safeguards for effective cyber defense",
    domains: [
      "Basic Cyber Hygiene",
      "Advanced Cyber Hygiene",
      "Organizational Maturity",
    ],
    applicable_sectors: ["All"],
    compliance_effort: "Medium",
    url: "https://www.cisecurity.org/controls",
  },
  mitre_attack: {
    id: "mitre_attack",
    name: "MITRE ATT&CK",
    version: "13.0",
    description: "Adversary tactics and techniques knowledge base",
    domains: [
      "Reconnaissance",
      "Resource Development",
      "Initial Access",
      "Execution",
      "Persistence",
      "Privilege Escalation",
      "Defense Evasion",
      "Credential Access",
      "Discovery",
      "Lateral Movement",
      "Collection",
      "Command & Control",
      "Exfiltration",
      "Impact",
    ],
    applicable_sectors: ["All"],
    compliance_effort: "Medium",
    url: "https://attack.mitre.org",
  },
  owasp: {
    id: "owasp",
    name: "OWASP Top 10",
    version: "2021",
    description: "Most critical web application security risks",
    domains: [
      "Broken Access Control",
      "Cryptographic Failures",
      "Injection",
      "Insecure Design",
      "Security Misconfiguration",
      "Vulnerable Components",
      "Authentication Failures",
      "Integrity Failures",
      "Logging and Monitoring",
      "SSRF",
    ],
    applicable_sectors: ["Technology", "All"],
    compliance_effort: "Medium",
    url: "https://owasp.org/Top10",
  },
  pci_dss: {
    id: "pci_dss",
    name: "PCI DSS",
    version: "4.0",
    description: "Payment Card Industry Data Security Standard",
    domains: [
      "Network Security",
      "Data Protection",
      "Vulnerability Management",
      "Access Control",
      "Monitoring",
      "Policy",
      "Secure Development",
    ],
    applicable_sectors: ["Finance", "Retail", "All"],
    compliance_effort: "High",
    url: "https://www.pcisecuritystandards.org",
  },
  hipaa: {
    id: "hipaa",
    name: "HIPAA",
    version: "2013",
    description: "Health Insurance Portability and Accountability Act",
    domains: [
      "Administrative Safeguards",
      "Physical Safeguards",
      "Technical Safeguards",
      "Privacy",
      "Security",
      "Breach Notification",
    ],
    applicable_sectors: ["Healthcare"],
    compliance_effort: "High",
    url: "https://www.hhs.gov/hipaa",
  },
  soc_2: {
    id: "soc_2",
    name: "SOC 2",
    version: "Type I and II",
    description: "Service Organization Control framework",
    domains: [
      "Security",
      "Availability",
      "Processing Integrity",
      "Confidentiality",
      "Privacy",
    ],
    applicable_sectors: ["Technology", "Cloud Services", "All"],
    compliance_effort: "High",
    url: "https://www.aicpa.org/soc2",
  },
};

export function lookupStandard(standardName: StandardName): StandardDetails {
  const standard = STANDARDS_DATABASE[standardName];
  if (!standard) {
    throw new Error(`Unknown standard: ${standardName}`);
  }
  return standard;
}

export function searchStandards(query: string): StandardDetails[] {
  const normalizedQuery = query.toLowerCase();
  return Object.values(STANDARDS_DATABASE).filter(
    (standard) =>
      standard.name.toLowerCase().includes(normalizedQuery) ||
      standard.description.toLowerCase().includes(normalizedQuery) ||
      standard.best_for.toLowerCase().includes(normalizedQuery) ||
      standard.key_domains.some((domain) =>
        domain.toLowerCase().includes(normalizedQuery)
      )
  );
}

export function getFrameworksCatalog(): FrameworkDefinition[] {
  return Object.values(FRAMEWORKS_CATALOG);
}

export function getStandardsByFocusArea(
  focusArea: string
): StandardDetails[] {
  return Object.values(STANDARDS_DATABASE).filter((standard) =>
    standard.key_domains.some((domain) =>
      domain.toLowerCase().includes(focusArea.toLowerCase())
    )
  );
}

export function getAllStandards(): StandardDetails[] {
  return Object.values(STANDARDS_DATABASE);
}
