import {
  KataAssessmentInput,
  KataAssessmentResult,
  KataBelt,
  KataBeltDefinition,
} from "./types.js";

// K.A.T.A. Belt Definitions
const KATA_BELT_DEFINITIONS: Record<KataBelt, KataBeltDefinition> = {
  White: {
    belt: "White",
    level: 1,
    title: "Awareness",
    description:
      "Security awareness foundation. Understanding of basic cybersecurity concepts, terminology, and the importance of security in organizational context.",
    key_competencies: [
      "Cybersecurity fundamentals",
      "Threat awareness",
      "Password hygiene",
      "Phishing identification",
      "Security policy understanding",
    ],
    maturity_range: { min: 0, max: 15 },
    typical_timeline_months: 1,
  },
  Yellow: {
    belt: "Yellow",
    level: 2,
    title: "Foundation",
    description:
      "Foundational security controls implementation. Building basic security infrastructure including access control, asset management, and security policies.",
    key_competencies: [
      "Access control implementation",
      "Asset inventory management",
      "Security policy development",
      "Basic incident response",
      "User authentication controls",
    ],
    maturity_range: { min: 15, max: 30 },
    typical_timeline_months: 3,
  },
  Orange: {
    belt: "Orange",
    level: 3,
    title: "Intermediate",
    description:
      "Intermediate security capabilities. Implementing advanced controls, detection systems, and formalizing security processes across the organization.",
    key_competencies: [
      "Advanced access control",
      "Security monitoring setup",
      "Threat intelligence integration",
      "Incident response procedures",
      "Security training programs",
      "Risk assessment methodologies",
    ],
    maturity_range: { min: 30, max: 50 },
    typical_timeline_months: 6,
  },
  Green: {
    belt: "Green",
    level: 4,
    title: "Applied",
    description:
      "Applied security practices. Demonstrating mature security program with defined processes, regular assessments, and effective threat detection and response.",
    key_competencies: [
      "Mature incident response",
      "Continuous monitoring",
      "Threat hunting capabilities",
      "Security metrics and KPIs",
      "Third-party risk management",
      "Security governance",
    ],
    maturity_range: { min: 50, max: 65 },
    typical_timeline_months: 9,
  },
  Blue: {
    belt: "Blue",
    level: 5,
    title: "Advanced",
    description:
      "Advanced security expertise. Organizational security program with advanced detection, predictive threat intelligence, and proactive defense strategies.",
    key_competencies: [
      "Advanced threat detection",
      "Predictive analytics",
      "Red team/penetration testing",
      "Security architecture design",
      "Compliance program management",
      "Security automation",
    ],
    maturity_range: { min: 65, max: 78 },
    typical_timeline_months: 12,
  },
  Purple: {
    belt: "Purple",
    level: 6,
    title: "Expert",
    description:
      "Expert-level security program. Highly sophisticated security operations with industry-leading threat intelligence, advanced analytics, and strategic risk management.",
    key_competencies: [
      "Advanced threat intelligence analysis",
      "AI/ML in security",
      "Supply chain security",
      "Advanced forensics and investigation",
      "Strategic security planning",
      "Industry influence and thought leadership",
    ],
    maturity_range: { min: 78, max: 88 },
    typical_timeline_months: 18,
  },
  Brown: {
    belt: "Brown",
    level: 7,
    title: "Mastery",
    description:
      "Mastery-level security organization. Comprehensive security program demonstrating exceptional capabilities, innovation, and organizational alignment across all domains.",
    key_competencies: [
      "Security innovation leadership",
      "Zero-trust architecture implementation",
      "Advanced incident response and forensics",
      "Security culture development",
      "Enterprise risk management",
      "Cross-industry security leadership",
    ],
    maturity_range: { min: 88, max: 95 },
    typical_timeline_months: 24,
  },
  Black: {
    belt: "Black",
    level: 8,
    title: "Leadership",
    description:
      "Leadership-level security excellence. Organization recognized as security leader, influencing industry standards and demonstrating world-class security capabilities and culture.",
    key_competencies: [
      "Security standards development",
      "Industry board participation",
      "Advanced threat research",
      "Security transformation leadership",
      "Emerging technology integration",
      "Global security governance",
    ],
    maturity_range: { min: 95, max: 100 },
    typical_timeline_months: 30,
  },
};

// Scoring rules and maturity assessment
export function assessKataBelt(input: KataAssessmentInput): KataAssessmentResult {
  // Calculate maturity score (0-100)
  const score = calculateMaturityScore(input);

  // Determine current belt
  const currentBelt = determineBelt(score);
  const beltDefinition = KATA_BELT_DEFINITIONS[currentBelt];

  // Generate gap analysis
  const nextBelt =
    currentBelt === "Black"
      ? "Black"
      : getNextBelt(currentBelt);
  const nextBeltDef = KATA_BELT_DEFINITIONS[nextBelt];

  return {
    current_belt: currentBelt,
    belt_description: beltDefinition.description,
    maturity_score: score,
    strengths: identifyStrengths(input, score),
    gaps: identifyGaps(input, score),
    gap_to_next_belt: generateGapRecommendations(currentBelt),
    recommended_training: getTrainingRecommendations(currentBelt),
    timeline_months: nextBeltDef.typical_timeline_months,
  };
}

function calculateMaturityScore(input: KataAssessmentInput): number {
  let score = 0;

  // Controls assessment (40% of score)
  const controlsScore = Math.min(40, input.current_controls.length * 5);
  score += controlsScore;

  // Training coverage (20% of score)
  if (input.employees_trained !== undefined) {
    const trainingScore = Math.min(
      20,
      (input.employees_trained / 1000) * 20
    );
    score += trainingScore;
  } else {
    score += 5; // Base score if no data
  }

  // Budget allocation (20% of score)
  if (input.budget_allocation) {
    const budgetScores: Record<string, number> = {
      Limited: 5,
      Moderate: 12,
      Substantial: 20,
    };
    score += budgetScores[input.budget_allocation] || 0;
  }

  // Incident history (20% of score)
  if (input.incident_history) {
    const history = input.incident_history.toLowerCase();
    if (history.includes("none") || history.includes("minimal")) {
      score += 20;
    } else if (history.includes("few") || history.includes("minor")) {
      score += 12;
    } else if (history.includes("multiple") || history.includes("significant")) {
      score += 5;
    }
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

function determineBelt(score: number): KataBelt {
  const belts: KataBelt[] = [
    "White",
    "Yellow",
    "Orange",
    "Green",
    "Blue",
    "Purple",
    "Brown",
    "Black",
  ];

  for (const belt of belts) {
    const def = KATA_BELT_DEFINITIONS[belt];
    if (score >= def.maturity_range.min && score <= def.maturity_range.max) {
      return belt;
    }
  }

  return "Black";
}

function getNextBelt(currentBelt: KataBelt): KataBelt {
  const progression: Record<KataBelt, KataBelt> = {
    White: "Yellow",
    Yellow: "Orange",
    Orange: "Green",
    Green: "Blue",
    Blue: "Purple",
    Purple: "Brown",
    Brown: "Black",
    Black: "Black",
  };

  return progression[currentBelt];
}

function identifyStrengths(input: KataAssessmentInput, score: number): string[] {
  const strengths: string[] = [];

  if (input.current_controls.length >= 10) {
    strengths.push("Strong technical control implementation");
  }

  if (input.employees_trained && input.employees_trained > 500) {
    strengths.push("Comprehensive security awareness training");
  }

  if (input.budget_allocation === "Substantial") {
    strengths.push("Adequate security investment and budget allocation");
  }

  if (
    input.incident_history === "None" ||
    input.incident_history === "Minimal"
  ) {
    strengths.push("Excellent incident history - minimal security events");
  }

  if (score >= 70) {
    strengths.push("Mature security program with good governance");
  }

  return strengths.length > 0
    ? strengths
    : ["Foundation in place for security improvements"];
}

function identifyGaps(input: KataAssessmentInput, score: number): string[] {
  const gaps: string[] = [];

  if (input.current_controls.length < 5) {
    gaps.push("Limited number of implemented security controls");
  }

  if (!input.employees_trained || input.employees_trained < 50) {
    gaps.push("Insufficient security awareness training coverage");
  }

  if (input.budget_allocation === "Limited") {
    gaps.push("Constrained security budget limiting capability expansion");
  }

  if (
    input.incident_history &&
    input.incident_history.toLowerCase().includes("significant")
  ) {
    gaps.push("History of significant security incidents");
  }

  if (score < 50) {
    gaps.push("Need to formalize security governance and processes");
  }

  return gaps.length > 0 ? gaps : ["Continue incremental improvements"];
}

function generateGapRecommendations(
  currentBelt: KataBelt
): string[] {

  const beltGaps: Record<KataBelt, string[]> = {
    White: [
      "Establish formal security governance structure",
      "Implement basic access control policies",
      "Deploy antivirus and endpoint protection",
      "Conduct security awareness training for all users",
      "Create incident response plan",
    ],
    Yellow: [
      "Implement comprehensive asset management",
      "Deploy network monitoring and logging",
      "Establish security metrics and KPIs",
      "Create formalized change management process",
      "Implement multi-factor authentication",
    ],
    Orange: [
      "Deploy SIEM or advanced monitoring solution",
      "Implement threat intelligence integration",
      "Formalize vulnerability management program",
      "Establish security team and SOC capabilities",
      "Implement data loss prevention controls",
    ],
    Green: [
      "Deploy advanced threat detection capabilities",
      "Implement threat hunting program",
      "Establish supply chain risk management",
      "Implement continuous compliance monitoring",
      "Develop security architecture framework",
    ],
    Blue: [
      "Implement AI/ML-based threat detection",
      "Establish red team capability",
      "Develop advanced forensics capability",
      "Implement zero-trust architecture",
      "Establish security innovation lab",
    ],
    Purple: [
      "Lead security standards development",
      "Implement advanced threat intelligence sharing",
      "Develop security research program",
      "Establish board-level security governance",
      "Implement quantum-safe cryptography planning",
    ],
    Brown: [
      "Achieve industry security leadership position",
      "Implement transformational security culture",
      "Develop next-generation security capabilities",
      "Lead cross-industry security initiatives",
      "Establish security innovation partnerships",
    ],
    Black: [
      "Maintain security leadership position",
      "Continue innovation and capability enhancement",
      "Mentor other organizations in security",
      "Shape global security standards",
    ],
  };

  return beltGaps[currentBelt] || [];
}

function getTrainingRecommendations(
  currentBelt: KataBelt
): string[] {
  const trainingMap: Record<KataBelt, string[]> = {
    White: [
      "CSGA Security Awareness Fundamentals",
      "Cybersecurity Basics for All Employees",
      "SANS Security Essentials (SEC401)",
    ],
    Yellow: [
      "CompTIA Security+ Certification",
      "NIST Cybersecurity Framework Training",
      "ISO 27001 Foundations",
      "CIS Controls Fundamentals",
    ],
    Orange: [
      "Certified Information Systems Security Professional (CISSP)",
      "GIAC Security Essentials (GSEC)",
      "Certified Incident Handler (GCIH)",
      "MITRE ATT&CK Framework Mastery",
    ],
    Green: [
      "CSGA Advanced Threat Intelligence",
      "Advanced Incident Response Training",
      "GIAC Certified Enterprise Defender (GCED)",
      "Threat Hunting Masterclass",
    ],
    Blue: [
      "CSGA Security Architecture Mastery",
      "AI/ML in Cybersecurity",
      "Offensive Security Certified Professional (OSCP)",
      "Red Team Lead Training",
    ],
    Purple: [
      "CSGA Expert Security Leadership Program",
      "Advanced Threat Research Course",
      "Security Standards Development Workshop",
      "Executive CISO Program",
    ],
    Brown: [
      "CSGA Mastery-Level Security Transformation",
      "Board-Level Security Governance",
      "Advanced Security Research",
      "Global Security Standards Leadership",
    ],
    Black: [
      "Executive Security Leadership",
      "Security Standards Board Participation",
      "Advanced Security Innovation",
      "Continuous Security Excellence",
    ],
  };

  return trainingMap[currentBelt] || [];
}

export function getKataBeltDefinitions(): Record<KataBelt, KataBeltDefinition> {
  return KATA_BELT_DEFINITIONS;
}
