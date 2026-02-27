/**
 * careerPathway.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const CareerPathwayInputSchema = z.object({
  current_role: z.string(),
  target_role: z.string(),
  experience: z.number().min(0),
  education_level: z.enum(["high_school", "associate", "bachelors", "masters"]),
  preferred_specialization: z.string().optional(),
});

export type CareerPathwayInput = z.infer<typeof CareerPathwayInputSchema>;

export interface CareerPathwayResult {
  current_assessment: {
    role: string;
    years_experience: number;
    education_level: string;
    market_value: string;
  };
  target_assessment: {
    role: string;
    median_salary_usd: number;
    salary_range: string;
    job_market_demand: "high" | "very_high" | "critical";
    growth_rate_percent: number;
  };
  progression_path: {
    step: number;
    title: string;
    duration_months: number;
    required_skills: string[];
    required_certifications: string[];
    recommended_bmcc_courses: string[];
    salary_expectation: string;
  }[];
  required_certifications: Array<{
    name: string;
    criticality: "essential" | "recommended" | "optional";
    exam_fee: number;
    study_hours: number;
  }>;
  market_data: {
    global_workforce_gap_millions: number;
    market_size_billions_usd: number;
    avg_salary_growth_percent: number;
    top_hiring_sectors: string[];
  };
  implementation_timeline: {
    phase: string;
    duration_months: number;
    key_milestones: string[];
  }[];
  total_investment: {
    course_fees_usd: number;
    certification_fees_usd: number;
    study_materials_usd: number;
    total_usd: number;
    estimated_roi_percent: number;
    payback_period_months: number;
  };
}

interface CareerLevel {
  title: string;
  min_experience: number;
  base_salary: number;
  certifications: string[];
}

const CAREER_LEVELS: { [key: string]: CareerLevel[] } = {
  security_analyst: [
    {
      title: "Junior Security Analyst",
      min_experience: 0,
      base_salary: 65000,
      certifications: ["CompTIA Security+", "CEH"],
    },
    {
      title: "Security Analyst",
      min_experience: 2,
      base_salary: 85000,
      certifications: ["CompTIA Security+", "CEH", "CISSP"],
    },
    {
      title: "Senior Security Analyst",
      min_experience: 5,
      base_salary: 110000,
      certifications: ["CISSP", "CISM", "CEH"],
    },
  ],
  penetration_tester: [
    {
      title: "Junior Penetration Tester",
      min_experience: 1,
      base_salary: 75000,
      certifications: ["CEH", "OSCP"],
    },
    {
      title: "Penetration Tester",
      min_experience: 3,
      base_salary: 105000,
      certifications: ["CEH", "OSCP", "GWAPT"],
    },
    {
      title: "Senior Penetration Tester",
      min_experience: 6,
      base_salary: 140000,
      certifications: ["OSCP", "OSCE", "GPEN"],
    },
  ],
  incident_response: [
    {
      title: "Incident Response Analyst",
      min_experience: 1,
      base_salary: 80000,
      certifications: ["CompTIA Security+", "GIAC GCIH"],
    },
    {
      title: "Senior Incident Response Analyst",
      min_experience: 4,
      base_salary: 115000,
      certifications: ["GIAC GCIH", "GIAC GCIA", "CISSP"],
    },
    {
      title: "Incident Response Manager",
      min_experience: 7,
      base_salary: 145000,
      certifications: ["CISSP", "CISM"],
    },
  ],
  security_architect: [
    {
      title: "Security Engineer",
      min_experience: 3,
      base_salary: 110000,
      certifications: ["CompTIA Security+", "CEH"],
    },
    {
      title: "Security Architect",
      min_experience: 7,
      base_salary: 150000,
      certifications: ["CISSP", "CCSK", "AWS Security"],
    },
    {
      title: "Principal Security Architect",
      min_experience: 10,
      base_salary: 180000,
      certifications: ["CISSP", "Multiple cloud certs"],
    },
  ],
};

const ROLE_MAPPING: { [key: string]: string } = {
  analyst: "security_analyst",
  pentest: "penetration_tester",
  pentester: "penetration_tester",
  incident: "incident_response",
  architect: "security_architect",
  engineer: "security_architect",
};

function normalizeRole(role: string): string {
  const lower = role.toLowerCase();
  for (const [key, value] of Object.entries(ROLE_MAPPING)) {
    if (lower.includes(key)) return value;
  }
  return "security_analyst";
}

function getCareerLevelFromRole(role: string, experience: number): CareerLevel {
  const normalized = normalizeRole(role);
  const levels = CAREER_LEVELS[normalized] || CAREER_LEVELS.security_analyst;

  for (let i = levels.length - 1; i >= 0; i--) {
    if (experience >= levels[i].min_experience) {
      return levels[i];
    }
  }
  return levels[0];
}

export async function handleCareerPathway(
  input: CareerPathwayInput
): Promise<CareerPathwayResult> {
  const currentLevel = getCareerLevelFromRole(
    input.current_role,
    input.experience
  );
  const targetNormalized = normalizeRole(input.target_role);
  const targetLevels = CAREER_LEVELS[targetNormalized] || CAREER_LEVELS.security_architect;
  const targetLevel = targetLevels[targetLevels.length - 1];
  void input.education_level; // Suppress unused variable warning

  const progression_path = generateProgressionPath(
    input.current_role,
    input.target_role,
    input.experience,
    input.education_level
  );

  const required_certifications = extractRequiredCertifications(
    progression_path
  );

  const implementation_timeline = generateImplementationTimeline(
    progression_path
  );

  const total_investment = calculateInvestment(required_certifications);

  return {
    current_assessment: {
      role: currentLevel.title,
      years_experience: input.experience,
      education_level: input.education_level,
      market_value: `$${currentLevel.base_salary.toLocaleString()}`,
    },
    target_assessment: {
      role: targetLevel.title,
      median_salary_usd: targetLevel.base_salary,
      salary_range: `$${(targetLevel.base_salary * 0.8).toLocaleString()}-$${(targetLevel.base_salary * 1.3).toLocaleString()}`,
      job_market_demand: "critical",
      growth_rate_percent: 12.5,
    },
    progression_path,
    required_certifications,
    market_data: {
      global_workforce_gap_millions: 4.8,
      market_size_billions_usd: 6.74,
      avg_salary_growth_percent: 8.2,
      top_hiring_sectors: [
        "Financial Services",
        "Healthcare",
        "Technology",
        "Government",
        "Manufacturing",
      ],
    },
    implementation_timeline,
    total_investment,
  };
}

function generateProgressionPath(
  currentRole: string,
  targetRole: string,
  experience: number,
  educationLevel: string
): Array<{
  step: number;
  title: string;
  duration_months: number;
  required_skills: string[];
  required_certifications: string[];
  recommended_bmcc_courses: string[];
  salary_expectation: string;
}> {
  const path: Array<{
    step: number;
    title: string;
    duration_months: number;
    required_skills: string[];
    required_certifications: string[];
    recommended_bmcc_courses: string[];
    salary_expectation: string;
  }> = [];

  if (experience < 2) {
    path.push({
      step: 1,
      title: "Foundation & Entry Level",
      duration_months: 6,
      required_skills: [
        "Networking basics",
        "Linux/Windows administration",
        "Security concepts",
      ],
      required_certifications: ["CompTIA Security+"],
      recommended_bmcc_courses: [
        "Cybersecurity Fundamentals",
        "Network Security & Defence",
      ],
      salary_expectation: "$65,000-$75,000",
    });
  }

  if (experience < 4) {
    path.push({
      step: path.length + 1,
      title: "Intermediate Specialization",
      duration_months: 8,
      required_skills: [
        "Threat analysis",
        "Vulnerability assessment",
        "Incident basics",
      ],
      required_certifications: ["CEH", "GIAC GCIH"],
      recommended_bmcc_courses: [
        "Ethical Hacking & Penetration Testing",
        "Application Security",
        "Cloud Security",
      ],
      salary_expectation: "$85,000-$105,000",
    });
  }

  if (experience < 7) {
    path.push({
      step: path.length + 1,
      title: "Advanced Specialization",
      duration_months: 10,
      required_skills: [
        "Architecture design",
        "Risk management",
        "Team leadership",
      ],
      required_certifications: ["CISSP", "CISM"],
      recommended_bmcc_courses: [
        "Incident Response & Forensics",
        "Security Governance & Compliance",
        "Cryptography & Data Protection",
      ],
      salary_expectation: "$115,000-$150,000",
    });
  }

  path.push({
    step: path.length + 1,
    title: "Expert/Leadership Level",
    duration_months: 12,
    required_skills: [
      "Enterprise architecture",
      "Strategic planning",
      "Team management",
      "Executive communication",
    ],
    required_certifications: ["CISSP", "CCSK", "AWS or Azure certification"],
    recommended_bmcc_courses: [
      "Advanced Incident Response & Forensics",
      "Security Governance & Compliance",
      "Specialized electives",
    ],
    salary_expectation: "$150,000+",
  });

  return path;
}

function extractRequiredCertifications(
  progressionPath: Array<{
    required_certifications: string[];
  }>
): Array<{
  name: string;
  criticality: "essential" | "recommended" | "optional";
  exam_fee: number;
  study_hours: number;
}> {
  const certSet = new Set<string>();
  progressionPath.forEach((step) => {
    step.required_certifications.forEach((cert) => certSet.add(cert));
  });

  const certifications: Array<{
    name: string;
    criticality: "essential" | "recommended" | "optional";
    exam_fee: number;
    study_hours: number;
  }> = [];

  const CERT_DATA: { [key: string]: { fee: number; hours: number } } = {
    "CompTIA Security+": { fee: 370, hours: 100 },
    CEH: { fee: 1250, hours: 300 },
    CISSP: { fee: 749, hours: 500 },
    "GIAC GCIH": { fee: 1650, hours: 200 },
    CISM: { fee: 749, hours: 400 },
    CCSK: { fee: 395, hours: 80 },
    "AWS or Azure certification": { fee: 300, hours: 150 },
    OSCP: { fee: 999, hours: 400 },
    GPEN: { fee: 1650, hours: 250 },
  };

  for (const cert of certSet) {
    const data = CERT_DATA[cert] || { fee: 500, hours: 200 };
    certifications.push({
      name: cert,
      criticality:
        cert.includes("Security+") || cert.includes("CEH")
          ? "essential"
          : cert.includes("CISSP")
            ? "essential"
            : "recommended",
      exam_fee: data.fee,
      study_hours: data.hours,
    });
  }

  return certifications;
}

function generateImplementationTimeline(
  progressionPath: Array<{ duration_months: number; title: string }>
): Array<{
  phase: string;
  duration_months: number;
  key_milestones: string[];
}> {
  return [
    {
      phase: "Immediate (0-3 months)",
      duration_months: 3,
      key_milestones: [
        "Enroll in foundational course",
        "Begin CompTIA Security+ prep",
        "Join BMCC cyber community",
      ],
    },
    {
      phase: "Short-term (3-9 months)",
      duration_months: 6,
      key_milestones: [
        "Complete foundational courses",
        "Obtain CompTIA Security+ certification",
        "Begin advanced course",
      ],
    },
    {
      phase: "Medium-term (9-18 months)",
      duration_months: 9,
      key_milestones: [
        "Complete advanced specialization",
        "Obtain CEH or specialized certification",
        "Gain hands-on lab experience",
      ],
    },
    {
      phase: "Long-term (18+ months)",
      duration_months: 12,
      key_milestones: [
        "Pursue CISSP certification",
        "Take on leadership roles",
        "Mentor junior team members",
      ],
    },
  ];
}

function calculateInvestment(
  certifications: Array<{
    exam_fee: number;
    study_hours: number;
  }>
): {
  course_fees_usd: number;
  certification_fees_usd: number;
  study_materials_usd: number;
  total_usd: number;
  estimated_roi_percent: number;
  payback_period_months: number;
} {
  const course_fees = 2500; // Typical BMCC course costs
  const certification_fees = certifications.reduce((sum, c) => sum + c.exam_fee, 0);
  const study_materials = certifications.length * 200;
  const total = course_fees + certification_fees + study_materials;

  return {
    course_fees_usd: course_fees,
    certification_fees_usd: certification_fees,
    study_materials_usd: study_materials,
    total_usd: total,
    estimated_roi_percent: 850,
    payback_period_months: 8,
  };
}
