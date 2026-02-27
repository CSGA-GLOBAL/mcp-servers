export interface Crosswalk {
  id: string;
  name: string;
  version: string;
  jurisdiction: string;
  keyRequirements: string[];
  casaMappings: string[];
  complianceGaps: string[];
  recommendedActions: string[];
}

export const CROSSWALKS: Record<string, Crosswalk> = {
  "CW-01": {
    id: "CW-01",
    name: "EU AI Act",
    version: "2024-01",
    jurisdiction: "European Union",
    keyRequirements: [
      "Risk-based classification of AI systems",
      "Prohibited AI practices documentation",
      "High-risk AI system requirements",
      "Transparency and information obligations",
      "Human oversight and monitoring",
      "Post-market surveillance and monitoring"
    ],
    casaMappings: [
      "Tier 1: Self-assessment mapping to prohibited/high-risk categories",
      "Tier 2: Conformity assessment for high-risk AI systems",
      "Tier 3: Post-market monitoring and incident reporting",
      "Tier 4: Review board assessment for systemic risks"
    ],
    complianceGaps: [
      "Lack of AI system documentation and testing records",
      "Missing human oversight procedures",
      "Insufficient transparency mechanisms",
      "No post-market surveillance plan"
    ],
    recommendedActions: [
      "Classify AI systems according to EU AI Act categories",
      "Document technical documentation and testing procedures",
      "Establish human oversight and monitoring mechanisms",
      "Implement post-market surveillance procedures"
    ]
  },
  "CW-02": {
    id: "CW-02",
    name: "ISO/IEC 42001",
    version: "2023-01",
    jurisdiction: "International",
    keyRequirements: [
      "AI management system requirements",
      "Risk assessment and management",
      "Data governance and quality",
      "Model validation and testing",
      "Performance monitoring"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of AI management system controls",
      "Tier 2: Third-party audit of ISO 42001 compliance",
      "Tier 3: Continuous monitoring of system performance",
      "Tier 4: Review for systemic governance issues"
    ],
    complianceGaps: [
      "Missing AI management system documentation",
      "Inadequate risk assessment procedures",
      "Insufficient data governance controls",
      "Lack of model performance monitoring"
    ],
    recommendedActions: [
      "Establish AI management system framework",
      "Conduct comprehensive AI risk assessments",
      "Implement data quality and governance controls",
      "Deploy continuous performance monitoring"
    ]
  },
  "CW-03": {
    id: "CW-03",
    name: "NIST AI RMF",
    version: "1.1-2024",
    jurisdiction: "United States",
    keyRequirements: [
      "Governance and risk management",
      "Algorithmic impact assessment",
      "Risk assessment and mapping",
      "Testing and performance evaluation",
      "Monitoring and accountability"
    ],
    casaMappings: [
      "Tier 1: Self-assessment using NIST AI RMF categories",
      "Tier 2: Third-party evaluation of risk mitigation strategies",
      "Tier 3: Continuous monitoring dashboard and reporting",
      "Tier 4: Peer review of risk governance approach"
    ],
    complianceGaps: [
      "Lack of algorithmic impact assessment",
      "Insufficient risk mapping procedures",
      "Missing performance evaluation plans",
      "No monitoring and accountability mechanisms"
    ],
    recommendedActions: [
      "Conduct algorithmic impact assessments",
      "Map risks to NIST AI RMF categories",
      "Establish performance evaluation protocols",
      "Implement monitoring and accountability framework"
    ]
  },
  "CW-04": {
    id: "CW-04",
    name: "OECD AI Principles",
    version: "2024-01",
    jurisdiction: "OECD Member States",
    keyRequirements: [
      "AI should be human-centered and trustworthy",
      "Inclusive growth, sustainable development",
      "Respect for values, fairness, transparency",
      "Accountability and responsibility",
      "Risk-based governance"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of principle alignment",
      "Tier 2: Audit of accountability mechanisms",
      "Tier 3: Monitoring of fairness and transparency metrics",
      "Tier 4: Peer review of governance structures"
    ],
    complianceGaps: [
      "Absence of human-centered design principles",
      "Insufficient transparency in decision-making",
      "Lack of accountability mechanisms",
      "Missing fairness and non-discrimination testing"
    ],
    recommendedActions: [
      "Align AI systems with OECD principles",
      "Implement human-in-the-loop mechanisms",
      "Document accountability structures",
      "Conduct fairness and bias testing"
    ]
  },
  "CW-05": {
    id: "CW-05",
    name: "UNESCO AI Ethics",
    version: "2021-01",
    jurisdiction: "UNESCO Member States",
    keyRequirements: [
      "Human rights and human dignity",
      "Environmental and ecological preservation",
      "Inclusivity and accessibility",
      "Responsible innovation and governance"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of human rights considerations",
      "Tier 2: Third-party review of ethical safeguards",
      "Tier 3: Monitoring of environmental and social impact",
      "Tier 4: Council review of systemic ethical issues"
    ],
    complianceGaps: [
      "Lack of human rights impact assessment",
      "Missing ethical review processes",
      "Insufficient environmental impact consideration",
      "No accessibility provisions"
    ],
    recommendedActions: [
      "Conduct human rights impact assessments",
      "Establish ethical review boards",
      "Assess environmental and social impact",
      "Implement accessibility requirements"
    ]
  },
  "CW-06": {
    id: "CW-06",
    name: "IEEE 7000 Series",
    version: "2023-01",
    jurisdiction: "International",
    keyRequirements: [
      "Ethically aligned design principles",
      "Human rights and dignity",
      "Well-being and autonomy",
      "Transparency and accountability",
      "Safety and security"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of ethical design principles",
      "Tier 2: Audit of alignment procedures",
      "Tier 3: Continuous ethics monitoring",
      "Tier 4: Review of systemic ethics governance"
    ],
    complianceGaps: [
      "Missing ethical design documentation",
      "Insufficient transparency mechanisms",
      "Lack of safety and security testing",
      "No ongoing ethics monitoring"
    ],
    recommendedActions: [
      "Apply IEEE 7000 ethical alignment principles",
      "Document design and safety procedures",
      "Implement transparency mechanisms",
      "Establish ethics monitoring program"
    ]
  },
  "CW-07": {
    id: "CW-07",
    name: "Canadian AIDA",
    version: "2024-01",
    jurisdiction: "Canada",
    keyRequirements: [
      "Impact assessment and documentation",
      "Transparency and disclosure",
      "Accountability and training",
      "Bias and discrimination mitigation",
      "Records and auditing"
    ],
    casaMappings: [
      "Tier 1: Self-assessment under AIDA requirements",
      "Tier 2: Third-party verification of compliance",
      "Tier 3: Ongoing monitoring and documentation",
      "Tier 4: Regulatory oversight review"
    ],
    complianceGaps: [
      "Missing impact assessments",
      "Insufficient transparency and disclosure",
      "Lack of bias mitigation testing",
      "No audit trail or documentation"
    ],
    recommendedActions: [
      "Conduct impact assessments per AIDA",
      "Implement transparency and disclosure procedures",
      "Test for bias and discrimination",
      "Maintain audit records and documentation"
    ]
  },
  "CW-08": {
    id: "CW-08",
    name: "Singapore Model AI Governance",
    version: "2023-01",
    jurisdiction: "Singapore",
    keyRequirements: [
      "Ethical principles for AI governance",
      "Data and model governance",
      "Algorithmic risk management",
      "Transparency and accountability",
      "Capability and competency development"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of governance framework",
      "Tier 2: External audit of controls",
      "Tier 3: Continuous monitoring of algorithms",
      "Tier 4: Regulatory assessment"
    ],
    complianceGaps: [
      "Missing governance framework documentation",
      "Insufficient algorithm risk assessment",
      "Lack of transparency reporting",
      "No capability development plan"
    ],
    recommendedActions: [
      "Establish AI governance framework",
      "Conduct algorithmic risk assessments",
      "Implement transparency and reporting mechanisms",
      "Develop capability and competency programs"
    ]
  },
  "CW-09": {
    id: "CW-09",
    name: "Japan AI Social Principles",
    version: "2023-01",
    jurisdiction: "Japan",
    keyRequirements: [
      "Human-centric society principle",
      "Respect for human rights and dignity",
      "Sustainable and inclusive society",
      "Responsible innovation",
      "Transparency and accountability"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of principle alignment",
      "Tier 2: Audit of social impact measures",
      "Tier 3: Monitoring of human-centric outcomes",
      "Tier 4: Review of systemic societal effects"
    ],
    complianceGaps: [
      "Lack of human rights consideration",
      "Missing sustainability assessment",
      "Insufficient accountability mechanisms",
      "No social impact monitoring"
    ],
    recommendedActions: [
      "Align with human-centric AI principles",
      "Conduct social and sustainability impact assessment",
      "Implement transparency mechanisms",
      "Monitor and report on societal effects"
    ]
  },
  "CW-10": {
    id: "CW-10",
    name: "China AI Governance",
    version: "2023-01",
    jurisdiction: "China",
    keyRequirements: [
      "Algorithm security assessment",
      "Content security and control",
      "Data protection and compliance",
      "Security risk evaluation",
      "Transparency in recommendation systems"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of security measures",
      "Tier 2: Third-party security audit",
      "Tier 3: Continuous security monitoring",
      "Tier 4: Regulatory compliance review"
    ],
    complianceGaps: [
      "Missing algorithm security assessment",
      "Insufficient content control mechanisms",
      "Lack of data protection compliance",
      "No transparency in recommendations"
    ],
    recommendedActions: [
      "Conduct algorithm security assessments",
      "Implement content control mechanisms",
      "Ensure data protection compliance",
      "Implement recommendation transparency"
    ]
  },
  "CW-11": {
    id: "CW-11",
    name: "African Union AI Framework",
    version: "2023-01",
    jurisdiction: "African Union",
    keyRequirements: [
      "Human and socioeconomic development",
      "Respect for human rights and dignity",
      "Inclusion and non-discrimination",
      "Transparency and accountability",
      "Capacity building and technology transfer"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of development alignment",
      "Tier 2: Audit of inclusion and non-discrimination",
      "Tier 3: Monitoring of socioeconomic impact",
      "Tier 4: Review of capacity building efforts"
    ],
    complianceGaps: [
      "Missing development impact assessment",
      "Insufficient inclusion and accessibility provisions",
      "Lack of capacity building programs",
      "No accountability mechanisms"
    ],
    recommendedActions: [
      "Assess alignment with AU development goals",
      "Implement inclusion and non-discrimination measures",
      "Establish capacity building programs",
      "Create accountability mechanisms"
    ]
  },
  "CW-12": {
    id: "CW-12",
    name: "GPAI Code of Conduct",
    version: "2024-01",
    jurisdiction: "Global Partnership on AI",
    keyRequirements: [
      "Responsible AI development",
      "Transparency and accountability",
      "Human oversight and control",
      "Security and safety",
      "Fairness and non-discrimination"
    ],
    casaMappings: [
      "Tier 1: Self-assessment against code principles",
      "Tier 2: Third-party review of conduct compliance",
      "Tier 3: Continuous monitoring of practices",
      "Tier 4: Peer review of governance"
    ],
    complianceGaps: [
      "Lack of responsible development documentation",
      "Missing transparency and accountability mechanisms",
      "Insufficient human oversight provisions",
      "No fairness testing program"
    ],
    recommendedActions: [
      "Adopt GPAI code of conduct principles",
      "Implement transparency and accountability measures",
      "Establish human oversight mechanisms",
      "Conduct fairness and non-discrimination testing"
    ]
  },
  "CW-13": {
    id: "CW-13",
    name: "WEF AI Governance",
    version: "2023-01",
    jurisdiction: "World Economic Forum",
    keyRequirements: [
      "Accountability and transparency",
      "Risk assessment and mitigation",
      "Human augmentation and replacement",
      "Economic and social impact",
      "Stakeholder participation"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of WEF governance principles",
      "Tier 2: Third-party review of risk mitigation",
      "Tier 3: Monitoring of economic and social impact",
      "Tier 4: Stakeholder council review"
    ],
    complianceGaps: [
      "Missing risk assessment and mitigation plans",
      "Insufficient accountability mechanisms",
      "Lack of stakeholder engagement",
      "No economic/social impact monitoring"
    ],
    recommendedActions: [
      "Conduct comprehensive risk assessments",
      "Implement accountability and transparency mechanisms",
      "Engage stakeholders in governance",
      "Monitor economic and social impact"
    ]
  },
  "CW-14": {
    id: "CW-14",
    name: "Council of Europe AI Convention",
    version: "2023-01",
    jurisdiction: "Council of Europe",
    keyRequirements: [
      "Protection of human rights",
      "Rule of law and democracy",
      "Accountability and transparency",
      "Risk-based regulation",
      "Capacity building and international cooperation"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of human rights impact",
      "Tier 2: Third-party audit of accountability measures",
      "Tier 3: Continuous monitoring of compliance",
      "Tier 4: International peer review"
    ],
    complianceGaps: [
      "Missing human rights impact assessment",
      "Insufficient rule of law considerations",
      "Lack of democratic accountability",
      "No international cooperation mechanisms"
    ],
    recommendedActions: [
      "Conduct human rights impact assessment",
      "Implement rule of law and democratic accountability",
      "Establish transparency mechanisms",
      "Engage in international cooperation"
    ]
  },
  "CW-15": {
    id: "CW-15",
    name: "ASEAN Guide on AI Ethics",
    version: "2023-01",
    jurisdiction: "ASEAN",
    keyRequirements: [
      "Development of ethical frameworks",
      "Responsible innovation",
      "Transparency and accountability",
      "Data protection and privacy",
      "Regional cooperation and capacity building"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of ethical framework",
      "Tier 2: Audit of responsible innovation practices",
      "Tier 3: Monitoring of data protection compliance",
      "Tier 4: Regional capacity assessment"
    ],
    complianceGaps: [
      "Missing ethical framework documentation",
      "Insufficient responsible innovation practices",
      "Lack of data protection controls",
      "No regional cooperation mechanism"
    ],
    recommendedActions: [
      "Develop ethical framework",
      "Implement responsible innovation practices",
      "Ensure data protection and privacy compliance",
      "Participate in regional cooperation initiatives"
    ]
  },
  "CW-16": {
    id: "CW-16",
    name: "Saudi Arabia AI Ethics",
    version: "2023-01",
    jurisdiction: "Saudi Arabia",
    keyRequirements: [
      "Islamic values and ethics",
      "Societal benefit and welfare",
      "Accountability and responsibility",
      "Transparency and explainability",
      "Data security and privacy"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of values alignment",
      "Tier 2: Third-party review of ethical compliance",
      "Tier 3: Monitoring of social benefit outcomes",
      "Tier 4: Council review of systemic ethics"
    ],
    complianceGaps: [
      "Lack of values and ethics documentation",
      "Missing transparency and explainability",
      "Insufficient accountability mechanisms",
      "No data security compliance verification"
    ],
    recommendedActions: [
      "Align AI with Saudi AI Ethics principles",
      "Implement transparency and explainability",
      "Establish accountability mechanisms",
      "Verify data security and privacy compliance"
    ]
  },
  "CW-17": {
    id: "CW-17",
    name: "Brazil AI Framework",
    version: "2023-01",
    jurisdiction: "Brazil",
    keyRequirements: [
      "Respect for human rights and dignity",
      "Social and environmental protection",
      "Democratic governance",
      "Transparency and accountability",
      "Capacity building and inclusion"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of framework alignment",
      "Tier 2: Third-party audit of safeguards",
      "Tier 3: Continuous social impact monitoring",
      "Tier 4: Governance council review"
    ],
    complianceGaps: [
      "Missing human rights assessment",
      "Insufficient environmental protection measures",
      "Lack of democratic governance mechanisms",
      "No inclusion or capacity building plan"
    ],
    recommendedActions: [
      "Conduct human rights and environmental assessment",
      "Implement democratic governance mechanisms",
      "Establish transparency and accountability",
      "Develop inclusion and capacity building programs"
    ]
  },
  "CW-18": {
    id: "CW-18",
    name: "Australia AI Ethics Framework",
    version: "2023-01",
    jurisdiction: "Australia",
    keyRequirements: [
      "Fairness and non-discrimination",
      "Transparency and explainability",
      "Accountability and oversight",
      "Data protection and privacy",
      "Contestability and remedy"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of framework principles",
      "Tier 2: Audit of transparency and accountability",
      "Tier 3: Monitoring of fairness metrics",
      "Tier 4: Peer review of governance"
    ],
    complianceGaps: [
      "Missing fairness and bias testing",
      "Insufficient transparency mechanisms",
      "Lack of accountability procedures",
      "No contestability or remedy process"
    ],
    recommendedActions: [
      "Implement fairness and bias testing",
      "Establish transparency mechanisms",
      "Create accountability and oversight structures",
      "Provide contestability and remedy processes"
    ]
  },
  "CW-19": {
    id: "CW-19",
    name: "ISO/IEC 23894 AI Risk Management",
    version: "2023-01",
    jurisdiction: "International",
    keyRequirements: [
      "Risk identification and assessment",
      "Risk analysis and evaluation",
      "Risk response and treatment",
      "Risk monitoring and review",
      "Context and governance"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of risk management controls",
      "Tier 2: Third-party audit of risk processes",
      "Tier 3: Continuous risk monitoring",
      "Tier 4: Review of risk governance maturity"
    ],
    complianceGaps: [
      "Missing risk identification procedures",
      "Insufficient risk analysis documentation",
      "Lack of risk response plans",
      "No continuous risk monitoring"
    ],
    recommendedActions: [
      "Establish risk identification and assessment process",
      "Conduct detailed risk analysis",
      "Develop risk response and treatment plans",
      "Implement continuous risk monitoring"
    ]
  },
  "CW-20": {
    id: "CW-20",
    name: "AI Agent Release Certification Standards",
    version: "2024-01",
    jurisdiction: "International",
    keyRequirements: [
      "Agent capability and behavior assessment",
      "Safety and security testing",
      "Human oversight and control mechanisms",
      "Incident response and recovery",
      "Transparency and documentation"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of agent capabilities and risks",
      "Tier 2: Third-party certification of safety controls",
      "Tier 3: Continuous behavior monitoring and logging",
      "Tier 4: Byzantine Council review of release decision"
    ],
    complianceGaps: [
      "Missing capability and behavior documentation",
      "Insufficient safety and security testing",
      "Lack of human oversight mechanisms",
      "No incident response procedures"
    ],
    recommendedActions: [
      "Document all agent capabilities and limitations",
      "Conduct comprehensive safety and security testing",
      "Implement human oversight and control mechanisms",
      "Establish incident response and recovery procedures"
    ]
  },
  "CW-21": {
    id: "CW-21",
    name: "NIST AI 600-1 GenAI Profile",
    version: "2024-01",
    jurisdiction: "United States",
    keyRequirements: [
      "Generative AI system characterization",
      "Capability and limitation assessment",
      "Risk assessment for generative models",
      "Testing and evaluation protocols",
      "Monitoring and measurement"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of GenAI capabilities",
      "Tier 2: Third-party evaluation of risk mitigations",
      "Tier 3: Continuous testing and measurement",
      "Tier 4: Peer review of GenAI governance"
    ],
    complianceGaps: [
      "Missing capability characterization",
      "Insufficient limitation documentation",
      "Lack of generative AI risk assessment",
      "No comprehensive testing program"
    ],
    recommendedActions: [
      "Characterize all generative AI capabilities",
      "Document all known limitations and failure modes",
      "Conduct GenAI-specific risk assessments",
      "Implement comprehensive testing protocols"
    ]
  },
  "CW-22": {
    id: "CW-22",
    name: "OWASP MCP Top 10",
    version: "2024-01",
    jurisdiction: "International",
    keyRequirements: [
      "Resource limitation and DoS protection",
      "Secure tool integration and validation",
      "Prompt injection prevention",
      "Sensitive data handling",
      "Audit logging and monitoring",
      "Session management",
      "Access control and authorization",
      "Error handling and information disclosure",
      "Dependency management",
      "Model integrity and safety"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of MCP security controls",
      "Tier 2: Security audit of MCP implementation",
      "Tier 3: Continuous monitoring of security metrics",
      "Tier 4: Security council review"
    ],
    complianceGaps: [
      "Missing resource limitation controls",
      "Insufficient input validation",
      "Lack of audit logging",
      "No session management or access control"
    ],
    recommendedActions: [
      "Implement all OWASP MCP Top 10 controls",
      "Validate all tool inputs and outputs",
      "Establish comprehensive audit logging",
      "Implement access control and session management"
    ]
  },
  "CW-23": {
    id: "CW-23",
    name: "OWASP Agentic AI Top 10",
    version: "2024-01",
    jurisdiction: "International",
    keyRequirements: [
      "LLM plugin design and security",
      "Unsafe plugin retrieval",
      "Excessive agency and autonomy",
      "Prompt injection",
      "Inadequate output filtering",
      "Insufficient access control",
      "Inadequate logging and monitoring",
      "Misuse of agent capabilities",
      "Overreliance without human oversight",
      "Lack of proper testing and validation"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of agentic AI controls",
      "Tier 2: Third-party audit of safety mechanisms",
      "Tier 3: Continuous monitoring of agent behavior",
      "Tier 4: Byzantine Council safety review"
    ],
    complianceGaps: [
      "Missing plugin security controls",
      "Insufficient autonomy limitations",
      "Lack of output validation",
      "No human oversight mechanisms"
    ],
    recommendedActions: [
      "Secure all plugin design and retrieval",
      "Limit agent autonomy with guardrails",
      "Implement output filtering and validation",
      "Establish human oversight procedures"
    ]
  },
  "CW-24": {
    id: "CW-24",
    name: "Defence/NDAA/CBRN AI Governance",
    version: "2024-01",
    jurisdiction: "United States / International",
    keyRequirements: [
      "National security assessment",
      "CBRN threat mitigation",
      "Dual-use technology controls",
      "Export control compliance",
      "Classified information protection",
      "Foreign involvement restrictions",
      "Transparency in security mechanisms",
      "Incident response and containment"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of security posture",
      "Tier 2: Government security audit and certification",
      "Tier 3: Continuous security monitoring and reporting",
      "Tier 4: National security council review"
    ],
    complianceGaps: [
      "Missing national security assessment",
      "Insufficient CBRN mitigation measures",
      "Lack of export control procedures",
      "No foreign involvement restrictions"
    ],
    recommendedActions: [
      "Conduct national security impact assessment",
      "Implement CBRN dual-use controls",
      "Establish export control compliance procedures",
      "Restrict foreign participation and data access"
    ]
  },
  "CW-25": {
    id: "CW-25",
    name: "OWASP LLM Top 10",
    version: "2023-01",
    jurisdiction: "International",
    keyRequirements: [
      "Prompt injection prevention",
      "Insecure output handling",
      "Training data poisoning",
      "Model denial of service",
      "Supply chain vulnerabilities",
      "Sensitive information disclosure",
      "Insecure plugin design",
      "Excessive agency",
      "Overreliance without monitoring",
      "Model theft"
    ],
    casaMappings: [
      "Tier 1: Self-assessment of LLM security controls",
      "Tier 2: Third-party security audit of LLM safeguards",
      "Tier 3: Continuous monitoring of LLM behavior",
      "Tier 4: Peer review of LLM governance"
    ],
    complianceGaps: [
      "Missing prompt injection defenses",
      "Insufficient output validation",
      "Lack of supply chain security",
      "No model monitoring or theft prevention"
    ],
    recommendedActions: [
      "Implement prompt injection defenses",
      "Validate all LLM outputs",
      "Secure supply chain and dependencies",
      "Monitor for model theft and misuse"
    ]
  }
};

export function getCrosswalk(id: string): Crosswalk | null {
  return CROSSWALKS[id] || null;
}

export function listCrosswalkIds(): string[] {
  return Object.keys(CROSSWALKS).sort();
}
