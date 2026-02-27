import {
  TrainingPathwayInput,
  TrainingPathway,
  TrainingCourse,
  Certification,
} from "./types.js";

// Training Course Database
const TRAINING_COURSES: Record<string, TrainingCourse> = {
  sec401: {
    name: "Security Essentials (SEC401)",
    provider: "SANS Institute",
    duration_hours: 40,
    cost_usd: 8000,
    difficulty: "Beginner",
    prerequisites: [],
    hands_on_labs: true,
  },
  sec504: {
    name: "Hacker Tools and Incident Handling (SEC504)",
    provider: "SANS Institute",
    duration_hours: 40,
    cost_usd: 8000,
    difficulty: "Intermediate",
    prerequisites: ["sec401"],
    hands_on_labs: true,
  },
  sec566: {
    name: "Implementing and Auditing the NIST Cybersecurity Framework (SEC566)",
    provider: "SANS Institute",
    duration_hours: 40,
    cost_usd: 8000,
    difficulty: "Intermediate",
    prerequisites: ["sec401"],
    hands_on_labs: true,
  },
  comptia_sec: {
    name: "CompTIA Security+ Certification",
    provider: "CompTIA",
    duration_hours: 60,
    cost_usd: 3000,
    difficulty: "Intermediate",
    prerequisites: ["A+", "Network+"],
    hands_on_labs: false,
  },
  cissp: {
    name: "Certified Information Systems Security Professional (CISSP)",
    provider: "ISC²",
    duration_hours: 80,
    cost_usd: 7000,
    difficulty: "Advanced",
    prerequisites: ["5 years security experience"],
    hands_on_labs: false,
  },
  oscp: {
    name: "Offensive Security Certified Professional (OSCP)",
    provider: "Offensive Security",
    duration_hours: 120,
    cost_usd: 1000,
    difficulty: "Advanced",
    prerequisites: ["sec401", "Advanced Linux/Windows knowledge"],
    hands_on_labs: true,
  },
  nist_csf: {
    name: "NIST Cybersecurity Framework Implementation",
    provider: "CSGA",
    duration_hours: 24,
    cost_usd: 2500,
    difficulty: "Intermediate",
    prerequisites: [],
    hands_on_labs: true,
  },
  iso27001: {
    name: "ISO 27001 Information Security Management",
    provider: "CSGA",
    duration_hours: 32,
    cost_usd: 3500,
    difficulty: "Intermediate",
    prerequisites: [],
    hands_on_labs: false,
  },
  threat_hunting: {
    name: "Advanced Threat Hunting Masterclass",
    provider: "CSGA",
    duration_hours: 40,
    cost_usd: 5000,
    difficulty: "Advanced",
    prerequisites: ["SIEM experience", "log analysis"],
    hands_on_labs: true,
  },
  incident_response: {
    name: "Incident Response and Crisis Management",
    provider: "CSGA",
    duration_hours: 30,
    cost_usd: 3500,
    difficulty: "Advanced",
    prerequisites: ["2 years SOC experience"],
    hands_on_labs: true,
  },
  red_team: {
    name: "Red Team Operations Certification",
    provider: "CSGA",
    duration_hours: 60,
    cost_usd: 8000,
    difficulty: "Expert",
    prerequisites: ["OSCP", "penetration testing experience"],
    hands_on_labs: true,
  },
  security_architecture: {
    name: "Enterprise Security Architecture Design",
    provider: "CSGA",
    duration_hours: 50,
    cost_usd: 6000,
    difficulty: "Expert",
    prerequisites: ["CISSP", "5 years security architecture"],
    hands_on_labs: false,
  },
};

// Certification Database
const CERTIFICATIONS: Record<string, Certification> = {
  security_plus: {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    duration_months: 6,
    exam_cost_usd: 400,
    maintenance_required: true,
    industry_recognition: "High",
  },
  cissp: {
    name: "CISSP",
    issuer: "ISC²",
    duration_months: 12,
    exam_cost_usd: 749,
    maintenance_required: true,
    industry_recognition: "High",
  },
  cism: {
    name: "Certified Information Security Manager (CISM)",
    issuer: "ISACA",
    duration_months: 12,
    exam_cost_usd: 765,
    maintenance_required: true,
    industry_recognition: "High",
  },
  oscp: {
    name: "Offensive Security Certified Professional (OSCP)",
    issuer: "Offensive Security",
    duration_months: 12,
    exam_cost_usd: 1049,
    maintenance_required: false,
    industry_recognition: "High",
  },
  ceh: {
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    duration_months: 6,
    exam_cost_usd: 450,
    maintenance_required: true,
    industry_recognition: "Medium",
  },
  cisa: {
    name: "Certified Information Systems Auditor (CISA)",
    issuer: "ISACA",
    duration_months: 12,
    exam_cost_usd: 765,
    maintenance_required: true,
    industry_recognition: "High",
  },
  giac_gsec: {
    name: "GIAC Security Essentials Certification (GSEC)",
    issuer: "GIAC",
    duration_months: 6,
    exam_cost_usd: 375,
    maintenance_required: true,
    industry_recognition: "Medium",
  },
  giac_gcih: {
    name: "GIAC Certified Incident Handler (GCIH)",
    issuer: "GIAC",
    duration_months: 6,
    exam_cost_usd: 375,
    maintenance_required: true,
    industry_recognition: "Medium",
  },
};

// Pathway definitions
const TRAINING_PATHWAYS: Record<string, string[][]> = {
  Security_Awareness: [
    ["CSGA Security Awareness Fundamentals"],
    ["Cybersecurity Basics for All Employees"],
    ["SANS Security Essentials (SEC401)"],
  ],
  System_Administrator: [
    ["CompTIA A+", "CompTIA Network+"],
    ["CompTIA Security+"],
    ["Linux Security Administration"],
    ["Windows Security Hardening"],
  ],
  Security_Analyst: [
    ["SANS Security Essentials (SEC401)"],
    ["CompTIA Security+"],
    ["SIEM Administration and Setup"],
    ["Log Analysis and Threat Detection"],
    ["GIAC Certified Incident Handler (GCIH)"],
  ],
  Penetration_Tester: [
    ["SANS Security Essentials (SEC401)"],
    ["CompTIA Security+"],
    ["Offensive Security Certified Professional (OSCP)"],
    ["Advanced Penetration Testing"],
    ["Red Team Operations Certification"],
  ],
  CISO: [
    ["SANS Security Essentials (SEC401)"],
    ["CompTIA Security+"],
    ["CISSP Training and Certification"],
    ["NIST Cybersecurity Framework Implementation"],
    ["ISO 27001 Information Security Management"],
    ["Enterprise Security Architecture Design"],
  ],
  Incident_Response: [
    ["SANS Security Essentials (SEC401)"],
    ["SANS Hacker Tools and Incident Handling (SEC504)"],
    ["Incident Response and Crisis Management"],
    ["Advanced Threat Hunting Masterclass"],
    ["Forensics and Evidence Collection"],
  ],
  Cloud_Security: [
    ["CompTIA Security+"],
    ["AWS Security Fundamentals"],
    ["Azure Security Engineer"],
    ["Cloud Security Architecture"],
    ["Cloud Threat Detection and Response"],
  ],
  DevSecOps: [
    ["CompTIA Security+"],
    ["Secure Software Development Lifecycle (SDLC)"],
    ["Vulnerability Management and Remediation"],
    ["Container and Kubernetes Security"],
    ["DevSecOps Engineering Certification"],
  ],
};

export function getTrainingPathway(
  input: TrainingPathwayInput
): TrainingPathway {
  const pathwaySteps = TRAINING_PATHWAYS[input.goal] || [
    ["SANS Security Essentials (SEC401)"],
  ];

  const courses: TrainingCourse[] = [];
  let totalCost = 0;
  let totalHours = 0;

  for (const step of pathwaySteps) {
    for (const courseName of step) {
      const course = findCourseByName(courseName);
      if (course) {
        courses.push(course);
        totalCost += course.cost_usd;
        totalHours += course.duration_hours;
      }
    }
  }

  const certifications = getRecommendedCertifications(input.goal);
  totalCost += certifications.reduce((sum, cert) => sum + cert.exam_cost_usd, 0);

  return {
    goal: input.goal,
    current_level: input.current_level,
    recommended_path: pathwaySteps.flat(),
    courses,
    certifications,
    total_duration_months: Math.ceil(totalHours / 40 / 2), // ~40 hours per week, 2-week buffer
    estimated_cost_usd: totalCost,
    prerequisite_skills: getPrerequisiteSkills(input.goal),
    success_metrics: getSuccessMetrics(input.goal),
  };
}

function findCourseByName(name: string): TrainingCourse | undefined {
  const courseKeys = Object.keys(TRAINING_COURSES);
  for (const key of courseKeys) {
    if (TRAINING_COURSES[key].name.toLowerCase().includes(name.toLowerCase())) {
      return TRAINING_COURSES[key];
    }
  }

  // Return a generic course if not found (for demonstration)
  return {
    name,
    provider: "External Provider",
    duration_hours: 40,
    cost_usd: 3000,
    difficulty: "Intermediate",
    prerequisites: [],
    hands_on_labs: false,
  };
}

function getRecommendedCertifications(goal: string): Certification[] {
  const certMap: Record<string, string[]> = {
    Security_Awareness: [],
    System_Administrator: ["security_plus"],
    Security_Analyst: ["security_plus", "cisa"],
    Penetration_Tester: ["security_plus", "oscp"],
    CISO: ["cissp", "cism"],
    Incident_Response: ["cism", "giac_gcih"],
    Cloud_Security: ["security_plus"],
    DevSecOps: ["security_plus"],
  };

  const certKeys = certMap[goal] || ["security_plus"];
  return certKeys
    .map((key) => CERTIFICATIONS[key])
    .filter((cert): cert is Certification => cert !== undefined);
}

function getPrerequisiteSkills(goal: string): string[] {
  const skillMap: Record<string, string[]> = {
    Security_Awareness: ["Basic computer literacy"],
    System_Administrator: [
      "Windows/Linux administration",
      "Network concepts",
      "Basic scripting",
    ],
    Security_Analyst: [
      "SIEM tools",
      "Log analysis",
      "Network concepts",
      "Linux/Windows",
    ],
    Penetration_Tester: [
      "Advanced networking",
      "Linux expertise",
      "Scripting/coding",
      "Web application knowledge",
    ],
    CISO: [
      "5+ years security experience",
      "Risk management",
      "Compliance knowledge",
      "Business acumen",
    ],
    Incident_Response: [
      "Forensics basics",
      "Incident handling",
      "Malware analysis",
      "Log analysis",
    ],
    Cloud_Security: [
      "Cloud platform knowledge",
      "Network security",
      "Identity and access management",
    ],
    DevSecOps: [
      "Software development",
      "CI/CD pipelines",
      "Container technologies",
      "Security testing",
    ],
  };

  return skillMap[goal] || ["Security fundamentals"];
}

function getSuccessMetrics(goal: string): string[] {
  const metricsMap: Record<string, string[]> = {
    Security_Awareness: [
      "Pass awareness assessment",
      "Complete required training",
      "Demonstrate understanding of security policies",
    ],
    System_Administrator: [
      "Obtain Security+ certification",
      "Successfully manage enterprise security controls",
      "Demonstrate hardening capabilities",
    ],
    Security_Analyst: [
      "Obtain CISA or equivalent certification",
      "Detect and investigate security incidents",
      "Reduce mean time to detect (MTTD)",
    ],
    Penetration_Tester: [
      "Obtain OSCP certification",
      "Successfully identify critical vulnerabilities",
      "Demonstrate advanced exploitation techniques",
    ],
    CISO: [
      "Obtain CISSP certification",
      "Develop and execute security strategy",
      "Achieve board-level recognition",
    ],
    Incident_Response: [
      "Reduce mean time to respond (MTTR)",
      "Successfully contain incidents",
      "Complete post-incident reviews",
    ],
    Cloud_Security: [
      "Secure cloud deployments",
      "Obtain cloud security certification",
      "Demonstrate cloud compliance knowledge",
    ],
    DevSecOps: [
      "Integrate security into CI/CD pipeline",
      "Reduce security vulnerabilities in releases",
      "Obtain DevSecOps certification",
    ],
  };

  return metricsMap[goal] || ["Complete training program"];
}
