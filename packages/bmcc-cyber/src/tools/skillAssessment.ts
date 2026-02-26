/**
 * skillAssessment.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const SkillAssessmentInputSchema = z.object({
  current_knowledge: z.array(z.string()),
  experience_years: z.number().min(0),
  certifications_held: z.array(z.string()).optional(),
  career_goal: z.string(),
});

export type SkillAssessmentInput = z.infer<typeof SkillAssessmentInputSchema>;

export interface SkillAssessmentResult {
  current_skill_level: "novice" | "beginner" | "intermediate" | "advanced" | "expert";
  kata_belt_equivalent: string;
  skill_breakdown: {
    area: string;
    level: string;
    proficiency: number; // 0-100
    gaps: string[];
  }[];
  recommended_courses: Array<{
    course_id: string;
    title: string;
    priority: "high" | "medium" | "low";
    reason: string;
  }>;
  learning_path: {
    phase: string;
    duration_months: number;
    courses: string[];
    outcomes: string[];
  }[];
  estimated_time_to_certification: {
    certification: string;
    months: number;
    prerequisites_needed: string[];
  }[];
  next_steps: string[];
}

const SKILL_KNOWLEDGE_MAP: {
  [key: string]: { area: string; weight: number; level: "basic" | "intermediate" | "advanced" };
} = {
  networking: { area: "Network Security", weight: 0.2, level: "basic" },
  linux: { area: "System Administration", weight: 0.15, level: "basic" },
  windows: { area: "System Administration", weight: 0.15, level: "basic" },
  scripting: { area: "Automation", weight: 0.1, level: "intermediate" },
  compliance: { area: "Governance", weight: 0.15, level: "basic" },
  vulnerability_assessment: { area: "Threat Analysis", weight: 0.15, level: "intermediate" },
  incident_response: { area: "Incident Handling", weight: 0.1, level: "advanced" },
};

function calculateSkillLevel(
  knowledgeAreas: string[],
  yearsExperience: number,
  certifications: string[]
): "novice" | "beginner" | "intermediate" | "advanced" | "expert" {
  let score = 0;

  // Knowledge areas score
  score += knowledgeAreas.length * 15;

  // Experience score
  if (yearsExperience >= 5) score += 50;
  else if (yearsExperience >= 3) score += 35;
  else if (yearsExperience >= 1) score += 20;
  else score += 10;

  // Certification score
  if (certifications && certifications.length > 0) {
    score += certifications.length * 15;
  }

  if (score >= 80) return "expert";
  if (score >= 65) return "advanced";
  if (score >= 45) return "intermediate";
  if (score >= 25) return "beginner";
  return "novice";
}

function getKataBeltEquivalent(level: string, yearsExperience: number): string {
  if (level === "expert") return "K.A.T.A. Red Belt (Master)";
  if (level === "advanced") return "K.A.T.A. Red Belt / Instructor";
  if (level === "intermediate" && yearsExperience >= 2)
    return "K.A.T.A. Orange Belt (Advanced)";
  if (level === "intermediate") return "K.A.T.A. Yellow Belt (Intermediate)";
  if (level === "beginner") return "K.A.T.A. White Belt (Foundation)";
  return "K.A.T.A. White Belt (Foundation)";
}

export async function handleSkillAssessment(
  input: SkillAssessmentInput
): Promise<SkillAssessmentResult> {
  const skillLevel = calculateSkillLevel(
    input.current_knowledge,
    input.experience_years,
    input.certifications_held || []
  );

  const kataBelt = getKataBeltEquivalent(skillLevel, input.experience_years);

  // Skill breakdown
  const skill_breakdown = input.current_knowledge.map((knowledge) => {
    const mapped = SKILL_KNOWLEDGE_MAP[knowledge.toLowerCase()] || {
      area: knowledge,
      weight: 0.1,
      level: "basic" as const,
    };

    const proficiency =
      skillLevel === "expert"
        ? 95
        : skillLevel === "advanced"
          ? 80
          : skillLevel === "intermediate"
            ? 60
            : skillLevel === "beginner"
              ? 40
              : 20;

    return {
      area: mapped.area,
      level: mapped.level,
      proficiency,
      gaps: getGapsForArea(mapped.area, skillLevel),
    };
  });

  // Recommended courses based on goal and current level
  const recommendedCourses = getRecommendedCourses(
    input.career_goal,
    skillLevel,
    input.current_knowledge
  );

  // Learning path
  const learningPath = generateLearningPath(skillLevel, input.career_goal);

  // Time to certifications
  const certifications = estimateCertificationTimeline(
    skillLevel,
    input.career_goal,
    input.experience_years
  );

  // Next steps
  const nextSteps = generateNextSteps(skillLevel, input.career_goal);

  return {
    current_skill_level: skillLevel,
    kata_belt_equivalent: kataBelt,
    skill_breakdown,
    recommended_courses: recommendedCourses,
    learning_path: learningPath,
    estimated_time_to_certification: certifications,
    next_steps: nextSteps,
  };
}

function getGapsForArea(
  area: string,
  level: "novice" | "beginner" | "intermediate" | "advanced" | "expert"
): string[] {
  const gaps: { [key: string]: string[] } = {
    "Network Security": [
      "Advanced firewall configuration",
      "IDS/IPS tuning",
      "Network forensics",
    ],
    "System Administration": ["Hardening techniques", "Access control", "Patch management"],
    Automation: ["Infrastructure as Code", "Security automation", "DevSecOps"],
    Governance: ["Risk frameworks", "Policy development", "Compliance audits"],
    "Threat Analysis": ["Advanced threat modeling", "OSINT", "Threat intelligence"],
    "Incident Handling": ["Forensics", "Root cause analysis", "Legal procedures"],
  };

  if (level === "expert") return [];
  if (level === "advanced") return gaps[area]?.slice(0, 1) || [];
  if (level === "intermediate") return gaps[area]?.slice(0, 2) || [];
  return gaps[area] || [];
}

function getRecommendedCourses(
  careerGoal: string,
  skillLevel: string,
  _currentKnowledge: string[]
): Array<{
  course_id: string;
  title: string;
  priority: "high" | "medium" | "low";
  reason: string;
}> {
  const courseRecommendations: Array<{
    course_id: string;
    title: string;
    priority: "high" | "medium" | "low";
    reason: string;
  }> = [];

  if (skillLevel === "novice" || skillLevel === "beginner") {
    courseRecommendations.push({
      course_id: "cyber-101",
      title: "Cybersecurity Fundamentals",
      priority: "high",
      reason: "Essential foundation for all cybersecurity roles",
    });
  }

  const goalLower = careerGoal.toLowerCase();

  if (
    goalLower.includes("network") ||
    goalLower.includes("security engineer")
  ) {
    courseRecommendations.push({
      course_id: "cyber-201",
      title: "Network Security & Defence",
      priority: "high",
      reason: "Core for network security career path",
    });
  }

  if (
    goalLower.includes("ethical hacker") ||
    goalLower.includes("penetration") ||
    goalLower.includes("red team")
  ) {
    courseRecommendations.push({
      course_id: "cyber-301",
      title: "Ethical Hacking & Penetration Testing",
      priority: "high",
      reason: "Essential for offensive security roles",
    });
  }

  if (
    goalLower.includes("incident") ||
    goalLower.includes("forensic") ||
    goalLower.includes("response")
  ) {
    courseRecommendations.push({
      course_id: "cyber-401",
      title: "Incident Response & Forensics",
      priority: "high",
      reason: "Critical for incident response careers",
    });
  }

  if (
    goalLower.includes("application") ||
    goalLower.includes("developer")
  ) {
    courseRecommendations.push({
      course_id: "cyber-205",
      title: "Application Security",
      priority: "high",
      reason: "Specialized for AppSec roles",
    });
  }

  if (goalLower.includes("cloud")) {
    courseRecommendations.push({
      course_id: "cyber-302",
      title: "Cloud Security",
      priority: "high",
      reason: "Essential for cloud security specialization",
    });
  }

  if (
    goalLower.includes("compliance") ||
    goalLower.includes("governance") ||
    goalLower.includes("risk")
  ) {
    courseRecommendations.push({
      course_id: "cyber-402",
      title: "Security Governance & Compliance",
      priority: "high",
      reason: "Core for compliance and governance roles",
    });
  }

  return courseRecommendations.slice(0, 4);
}

function generateLearningPath(
  skillLevel: string,
  _careerGoal: string
): Array<{
  phase: string;
  duration_months: number;
  courses: string[];
  outcomes: string[];
}> {
  if (skillLevel === "novice") {
    return [
      {
        phase: "Foundation",
        duration_months: 3,
        courses: ["cyber-101"],
        outcomes: [
          "Understand cybersecurity principles",
          "Recognize threats and vulnerabilities",
          "Know basic security controls",
        ],
      },
      {
        phase: "Core Specialization",
        duration_months: 4,
        courses: ["cyber-201", "cyber-205"],
        outcomes: [
          "Master network and application security",
          "Perform basic vulnerability assessments",
          "Understand secure coding",
        ],
      },
      {
        phase: "Advanced Track",
        duration_months: 3,
        courses: ["cyber-301"],
        outcomes: [
          "Conduct ethical hacking exercises",
          "Perform penetration tests",
          "Report security findings",
        ],
      },
    ];
  }

  if (skillLevel === "beginner") {
    return [
      {
        phase: "Core Specialization",
        duration_months: 3,
        courses: ["cyber-201", "cyber-205"],
        outcomes: [
          "Deepen network security knowledge",
          "Master application security",
          "Prepare for CompTIA Security+",
        ],
      },
      {
        phase: "Advanced Track",
        duration_months: 4,
        courses: ["cyber-301", "cyber-303"],
        outcomes: [
          "Learn ethical hacking techniques",
          "Understand cryptography",
          "Prepare for CEH",
        ],
      },
    ];
  }

  return [
    {
      phase: "Specialization",
      duration_months: 3,
      courses: ["cyber-401", "cyber-402"],
      outcomes: [
        "Master advanced topics",
        "Prepare for expert certifications",
        "Develop leadership skills",
      ],
    },
  ];
}

function estimateCertificationTimeline(
  skillLevel: string,
  _careerGoal: string,
  yearsExperience: number
): Array<{
  certification: string;
  months: number;
  prerequisites_needed: string[];
}> {
  const timelines: Array<{
    certification: string;
    months: number;
    prerequisites_needed: string[];
  }> = [];

  if (
    skillLevel === "novice" ||
    skillLevel === "beginner"
  ) {
    timelines.push({
      certification: "CompTIA Security+",
      months: 4,
      prerequisites_needed: ["Cybersecurity Fundamentals"],
    });
  }

  if (
    skillLevel === "beginner" ||
    skillLevel === "intermediate"
  ) {
    timelines.push({
      certification: "CEH",
      months: 6,
      prerequisites_needed: [
        "2+ years experience",
        "Network Security & Defence",
        "Ethical Hacking & Penetration Testing",
      ],
    });
  }

  if (
    yearsExperience >= 5 &&
    (skillLevel === "intermediate" ||
      skillLevel === "advanced")
  ) {
    timelines.push({
      certification: "CISSP",
      months: 9,
      prerequisites_needed: [
        "5+ years experience",
        "Advanced courses",
        "Security Governance & Compliance",
      ],
    });
  }

  timelines.push({
    certification: "K.A.T.A. Belt Progression",
    months: 2,
    prerequisites_needed: ["Current belt training"],
  });

  return timelines;
}

function generateNextSteps(
  skillLevel: string,
  _careerGoal: string
): string[] {
  const steps: string[] = [];

  if (skillLevel === "novice") {
    steps.push("Enroll in Cybersecurity Fundamentals course");
    steps.push("Build foundational networking and Linux knowledge");
    steps.push("Join BMCC cyber community");
  } else if (skillLevel === "beginner") {
    steps.push("Complete core specialization courses");
    steps.push("Pursue CompTIA Security+ certification");
    steps.push("Gain hands-on lab experience");
  } else if (skillLevel === "intermediate") {
    steps.push("Focus on specialization courses");
    steps.push("Pursue CEH or advanced certifications");
    steps.push("Take on real-world security projects");
  } else {
    steps.push("Pursue CISSP certification");
    steps.push("Mentor junior team members");
    steps.push("Take on leadership roles");
  }

  steps.push("Schedule regular skill assessments");
  steps.push("Participate in CTF competitions");
  steps.push("Maintain professional certifications");

  return steps;
}
