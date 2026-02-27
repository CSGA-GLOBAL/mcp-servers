/**
 * workforceGap.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const WorkforceGapInputSchema = z.object({
  organization_size: z.enum(["startup", "small", "medium", "enterprise"]),
  sector: z.string(),
  current_team_skills: z.array(z.string()),
  region: z.string().optional(),
});

export type WorkforceGapInput = z.infer<typeof WorkforceGapInputSchema>;

export interface WorkforceGapResult {
  organization_profile: {
    size: string;
    sector: string;
    region: string;
    typical_team_size: string;
    security_maturity_level: string;
  };
  global_market_context: {
    global_workforce_gap_millions: number;
    market_growth_rate_percent: number;
    market_size_billions_usd: number;
    shortage_severity: "critical" | "high" | "moderate";
  };
  skill_gap_analysis: {
    skill_area: string;
    current_proficiency: "none" | "basic" | "intermediate" | "advanced";
    required_proficiency: "basic" | "intermediate" | "advanced" | "expert";
    gap_severity: "critical" | "high" | "moderate" | "low";
    personnel_needed: number;
    priority: "immediate" | "high" | "medium" | "low";
  }[];
  critical_skill_shortages: {
    skill: string;
    shortage_severity: "critical" | "high";
    availability_months: number;
    market_salary_inflation_percent: number;
    alternative_skills: string[];
  }[];
  role_recommendations: {
    role: string;
    required_experience: string;
    recommended_certifications: string[];
    estimated_salary_range: string;
    filling_timeline_months: number;
    internal_vs_external: "internal_training" | "external_hire" | "both";
  }[];
  training_investment_plan: {
    phase: string;
    duration_months: number;
    courses_recommended: string[];
    personnel_count: number;
    estimated_cost_usd: number;
    expected_outcomes: string[];
  }[];
  roi_analysis: {
    metric: string;
    baseline_value: string;
    projected_value_after_training: string;
    improvement_percent: number;
    roi_payback_months: number;
  }[];
  bmcc_programme_fit: {
    alignment_percentage: number;
    recommended_courses: string[];
    customization_needs: string[];
    partnership_benefits: string[];
    estimated_total_investment_usd: number;
    estimated_timeline_months: number;
  };
  implementation_roadmap: {
    quarter: string;
    focus_areas: string[];
    key_milestones: string[];
    success_metrics: string[];
  }[];
  competitive_advantage: {
    advantage: string;
    business_impact: string;
    timeline_to_realization_months: number;
  }[];
}

function getSectorContext(sector: string): {
  maturity: string;
  top_skills: string[];
  compliance_focus: string[];
} {
  const sectorMap: {
    [key: string]: {
      maturity: string;
      top_skills: string[];
      compliance_focus: string[];
    };
  } = {
    finance: {
      maturity: "high",
      top_skills: [
        "Fraud detection",
        "Compliance",
        "Data protection",
        "Incident response",
      ],
      compliance_focus: ["PCI-DSS", "SOX", "GDPR", "AML"],
    },
    healthcare: {
      maturity: "medium",
      top_skills: [
        "HIPAA compliance",
        "Patient data protection",
        "Incident response",
        "Risk management",
      ],
      compliance_focus: ["HIPAA", "HITRUST", "GDPR"],
    },
    technology: {
      maturity: "medium",
      top_skills: [
        "Application security",
        "Cloud security",
        "DevSecOps",
        "Threat intelligence",
      ],
      compliance_focus: ["SOC 2", "ISO 27001", "GDPR"],
    },
    government: {
      maturity: "high",
      top_skills: [
        "Defense",
        "Compliance",
        "Clearance processes",
        "Incident response",
      ],
      compliance_focus: ["NIST", "FedRAMP", "DIACAP"],
    },
    manufacturing: {
      maturity: "low",
      top_skills: [
        "OT security",
        "Risk management",
        "Vulnerability assessment",
        "Incident response",
      ],
      compliance_focus: ["NIST", "ISO 27001"],
    },
    retail: {
      maturity: "low",
      top_skills: [
        "PCI compliance",
        "Data protection",
        "Incident response",
        "Vulnerability management",
      ],
      compliance_focus: ["PCI-DSS", "GDPR"],
    },
  };

  const sectorLower = sector.toLowerCase();
  for (const [key, value] of Object.entries(sectorMap)) {
    if (sectorLower.includes(key)) {
      return value;
    }
  }

  return {
    maturity: "medium",
    top_skills: [
      "Network security",
      "Vulnerability management",
      "Incident response",
    ],
    compliance_focus: ["ISO 27001", "GDPR"],
  };
}

function getTeamSize(organizationSize: string): {
  typical_team: string;
  recommended_team: string;
} {
  const mapping: {
    [key: string]: { typical_team: string; recommended_team: string };
  } = {
    startup: {
      typical_team: "1-2 people",
      recommended_team: "3-5 people",
    },
    small: {
      typical_team: "2-5 people",
      recommended_team: "5-10 people",
    },
    medium: {
      typical_team: "5-15 people",
      recommended_team: "15-30 people",
    },
    enterprise: {
      typical_team: "15-50+ people",
      recommended_team: "50-200+ people",
    },
  };

  return (
    mapping[organizationSize] || {
      typical_team: "5-15 people",
      recommended_team: "15-30 people",
    }
  );
}

export async function handleWorkforceGap(
  input: WorkforceGapInput
): Promise<WorkforceGapResult> {
  const sectorContext = getSectorContext(input.sector);
  const teamSize = getTeamSize(input.organization_size);
  const region = input.region || "North America";

  const skill_gap_analysis = generateSkillGapAnalysis(
    input.current_team_skills,
    sectorContext.top_skills,
    input.organization_size
  );

  const critical_skill_shortages = generateCriticalShortages(
    skill_gap_analysis
  );

  const role_recommendations = generateRoleRecommendations(
    input.organization_size,
    sectorContext,
    skill_gap_analysis
  );

  const training_investment_plan = generateTrainingPlan(
    input.organization_size,
    skill_gap_analysis
  );

  const roi_analysis = generateROIAnalysis(training_investment_plan);

  const bmcc_fit = generateBMCCFit(
    skill_gap_analysis,
    input.organization_size,
    sectorContext
  );

  const implementation_roadmap = generateRoadmap(training_investment_plan);

  const competitive_advantage = generateCompetitiveAdvantage(
    skill_gap_analysis,
    sectorContext
  );

  return {
    organization_profile: {
      size: input.organization_size,
      sector: input.sector,
      region,
      typical_team_size: teamSize.typical_team,
      security_maturity_level: sectorContext.maturity,
    },
    global_market_context: {
      global_workforce_gap_millions: 4.8,
      market_growth_rate_percent: 12.5,
      market_size_billions_usd: 6.74,
      shortage_severity: "critical",
    },
    skill_gap_analysis,
    critical_skill_shortages,
    role_recommendations,
    training_investment_plan,
    roi_analysis,
    bmcc_programme_fit: bmcc_fit,
    implementation_roadmap,
    competitive_advantage,
  };
}

function generateSkillGapAnalysis(
  currentSkills: string[],
  requiredSkills: string[],
  orgSize: string
): Array<{
  skill_area: string;
  current_proficiency: "none" | "basic" | "intermediate" | "advanced";
  required_proficiency: "basic" | "intermediate" | "advanced" | "expert";
  gap_severity: "critical" | "high" | "moderate" | "low";
  personnel_needed: number;
  priority: "immediate" | "high" | "medium" | "low";
}> {
  const analysis: Array<{
    skill_area: string;
    current_proficiency: "none" | "basic" | "intermediate" | "advanced";
    required_proficiency: "basic" | "intermediate" | "advanced" | "expert";
    gap_severity: "critical" | "high" | "moderate" | "low";
    personnel_needed: number;
    priority: "immediate" | "high" | "medium" | "low";
  }> = [];

  const orgMultiplier =
    orgSize === "enterprise"
      ? 3
      : orgSize === "medium"
        ? 2
        : orgSize === "small"
          ? 1.5
          : 1;

  for (const skill of requiredSkills) {
    const hasSkill = currentSkills.some((s) =>
      s.toLowerCase().includes(skill.toLowerCase())
    );

    const current_proficiency = hasSkill ? "basic" : "none";
    const gap_severity = hasSkill ? "moderate" : "critical";
    const priority = hasSkill ? "medium" : "immediate";
    const personnel_needed = Math.ceil(2 * orgMultiplier);

    analysis.push({
      skill_area: skill,
      current_proficiency: current_proficiency as "none" | "basic" | "intermediate" | "advanced",
      required_proficiency: "advanced",
      gap_severity: gap_severity as "critical" | "high" | "moderate" | "low",
      personnel_needed,
      priority: priority as "immediate" | "high" | "medium" | "low",
    });
  }

  // Add additional strategic skills
  const additionalSkills = [
    "Security Architecture",
    "Threat Intelligence",
    "Incident Response Management",
  ];

  for (const skill of additionalSkills) {
    if (!analysis.some((a) => a.skill_area === skill)) {
      analysis.push({
        skill_area: skill,
        current_proficiency: "none",
        required_proficiency: "advanced",
        gap_severity: "high",
        personnel_needed: Math.ceil(1 * orgMultiplier),
        priority: "high",
      });
    }
  }

  return analysis.slice(0, 10);
}

function generateCriticalShortages(
  _skillGaps: Array<{ skill_area: string; gap_severity: string }>
): Array<{
  skill: string;
  shortage_severity: "critical" | "high";
  availability_months: number;
  market_salary_inflation_percent: number;
  alternative_skills: string[];
}> {
  return _skillGaps
    .filter((g) => g.gap_severity === "critical" || g.gap_severity === "high")
    .slice(0, 5)
    .map((gap) => ({
      skill: gap.skill_area,
      shortage_severity: (gap.gap_severity === "critical"
        ? "critical"
        : "high") as "critical" | "high",
      availability_months: gap.gap_severity === "critical" ? 18 : 12,
      market_salary_inflation_percent: gap.gap_severity === "critical" ? 18 : 12,
      alternative_skills: [
        "Related certification holders",
        "Career switchers",
        "Contractor/consultant services",
      ],
    }));
}

function generateRoleRecommendations(
  orgSize: string,
  sectorContext: { top_skills: string[] },
  skillGaps: Array<{ skill_area: string }>
): Array<{
  role: string;
  required_experience: string;
  recommended_certifications: string[];
  estimated_salary_range: string;
  filling_timeline_months: number;
  internal_vs_external: "internal_training" | "external_hire" | "both";
}> {
  const baseRoles: Array<{
    role: string;
    required_experience: string;
    recommended_certifications: string[];
    estimated_salary_range: string;
    filling_timeline_months: number;
    internal_vs_external: "internal_training" | "external_hire" | "both";
  }> = [
    {
      role: "Security Operations Center (SOC) Analyst",
      required_experience: "2+ years IT",
      recommended_certifications: ["CompTIA Security+", "CISSP"],
      estimated_salary_range: "$65,000 - $85,000",
      filling_timeline_months:
        orgSize === "enterprise"
          ? 6
          : orgSize === "medium"
            ? 8
            : 12,
      internal_vs_external: "both",
    },
    {
      role: "Penetration Tester",
      required_experience: "3+ years security",
      recommended_certifications: ["CEH", "OSCP"],
      estimated_salary_range: "$95,000 - $130,000",
      filling_timeline_months:
        orgSize === "enterprise"
          ? 8
          : orgSize === "medium"
            ? 12
            : 18,
      internal_vs_external: "external_hire",
    },
    {
      role: "Security Architect",
      required_experience: "7+ years security",
      recommended_certifications: ["CISSP", "CCSK"],
      estimated_salary_range: "$140,000 - $180,000",
      filling_timeline_months: 12,
      internal_vs_external: "external_hire",
    },
    {
      role: "Incident Response Manager",
      required_experience: "4+ years security",
      recommended_certifications: ["CISSP", "CISM"],
      estimated_salary_range: "$110,000 - $150,000",
      filling_timeline_months: 9,
      internal_vs_external: "both",
    },
  ];

  const filtered = baseRoles.filter((role) =>
    sectorContext.top_skills.some((skill) =>
      role.role.toLowerCase().includes(skill.toLowerCase())
    )
  );

  return filtered.length > 0 ? filtered.slice(0, 4) : baseRoles.slice(0, 3);
}

function generateTrainingPlan(
  orgSize: string,
  skillGaps: Array<{ skill_area: string; gap_severity: string }>
): Array<{
  phase: string;
  duration_months: number;
  courses_recommended: string[];
  personnel_count: number;
  estimated_cost_usd: number;
  expected_outcomes: string[];
}> {
  const orgMultiplier =
    orgSize === "enterprise"
      ? 3
      : orgSize === "medium"
        ? 2
        : orgSize === "small"
          ? 1.5
          : 1;

  return [
    {
      phase: "Phase 1: Foundation",
      duration_months: 3,
      courses_recommended: [
        "Cybersecurity Fundamentals",
        "Network Security & Defence",
      ],
      personnel_count: Math.ceil(2 * orgMultiplier),
      estimated_cost_usd: Math.round(3000 * orgMultiplier),
      expected_outcomes: [
        "CompTIA Security+ readiness",
        "Foundational security knowledge",
        "Team security awareness",
      ],
    },
    {
      phase: "Phase 2: Specialization",
      duration_months: 4,
      courses_recommended: [
        "Ethical Hacking & Penetration Testing",
        "Incident Response & Forensics",
      ],
      personnel_count: Math.ceil(1.5 * orgMultiplier),
      estimated_cost_usd: Math.round(4500 * orgMultiplier),
      expected_outcomes: [
        "Specialized role competency",
        "CEH/CISSP prep",
        "Advanced security skills",
      ],
    },
    {
      phase: "Phase 3: Leadership",
      duration_months: 3,
      courses_recommended: [
        "Security Governance & Compliance",
        "Cloud Security",
      ],
      personnel_count: Math.ceil(1 * orgMultiplier),
      estimated_cost_usd: Math.round(3500 * orgMultiplier),
      expected_outcomes: [
        "Security leadership capabilities",
        "Strategic planning skills",
        "Governance expertise",
      ],
    },
  ];
}

function generateROIAnalysis(
  trainingPlan: Array<{
    estimated_cost_usd: number;
  }>
): Array<{
  metric: string;
  baseline_value: string;
  projected_value_after_training: string;
  improvement_percent: number;
  roi_payback_months: number;
}> {
  const totalInvestment = trainingPlan.reduce(
    (sum, phase) => sum + phase.estimated_cost_usd,
    0
  );

  return [
    {
      metric: "Incident Response Time",
      baseline_value: "24-48 hours",
      projected_value_after_training: "4-8 hours",
      improvement_percent: 85,
      roi_payback_months: 6,
    },
    {
      metric: "Vulnerability Detection Rate",
      baseline_value: "60%",
      projected_value_after_training: "95%",
      improvement_percent: 58,
      roi_payback_months: 8,
    },
    {
      metric: "Security Breach Cost Reduction",
      baseline_value: "$4.24M average (2021)",
      projected_value_after_training: "$2.5M estimated",
      improvement_percent: 41,
      roi_payback_months: 3,
    },
    {
      metric: "Employee Retention (Security)",
      baseline_value: "65%",
      projected_value_after_training: "92%",
      improvement_percent: 42,
      roi_payback_months: 12,
    },
    {
      metric: "Overall ROI",
      baseline_value: "Baseline",
      projected_value_after_training: `${Math.round((420 / totalInvestment) * 100)}%`,
      improvement_percent: 420,
      roi_payback_months: Math.max(3, Math.min(12, Math.round(totalInvestment / 50000))),
    },
  ];
}

function generateBMCCFit(
  _skillGaps: Array<{ skill_area: string }>,
  orgSize: string,
  sectorContext: { top_skills: string[]; compliance_focus: string[] }
): {
  alignment_percentage: number;
  recommended_courses: string[];
  customization_needs: string[];
  partnership_benefits: string[];
  estimated_total_investment_usd: number;
  estimated_timeline_months: number;
} {
  const allCourses = [
    "Cybersecurity Fundamentals",
    "Network Security & Defence",
    "Ethical Hacking & Penetration Testing",
    "Incident Response & Forensics",
    "Application Security",
    "Cloud Security",
    "Cryptography & Data Protection",
    "Security Governance & Compliance",
  ];

  const recommended = allCourses.slice(0, Math.min(5, allCourses.length));
  const baselineInvestment = 3500 * (orgSize === "enterprise" ? 3 : orgSize === "medium" ? 2 : 1.5);

  return {
    alignment_percentage: 92,
    recommended_courses: recommended,
    customization_needs: [
      `${sectorContext.compliance_focus[0]} compliance modules`,
      "Industry-specific threat scenarios",
      "Custom incident response procedures",
    ],
    partnership_benefits: [
      "CUNY partnership credibility",
      "K.A.T.A. belt certification pathway",
      "Continuous curriculum updates",
      "BMCC alumni network access",
      "Ongoing technical support",
    ],
    estimated_total_investment_usd: baselineInvestment,
    estimated_timeline_months: 10,
  };
}

function generateRoadmap(
  _trainingPlan: Array<{
    phase: string;
    duration_months: number;
  }>
): Array<{
  quarter: string;
  focus_areas: string[];
  key_milestones: string[];
  success_metrics: string[];
}> {
  return [
    {
      quarter: "Q1",
      focus_areas: ["Assessment", "Foundation Training"],
      key_milestones: [
        "Complete skills assessment",
        "Enroll foundational courses",
      ],
      success_metrics: ["100% enrollment", "20+ module completions"],
    },
    {
      quarter: "Q2",
      focus_areas: ["Specialization", "Hands-on Labs"],
      key_milestones: [
        "Complete Security+ prep",
        "Begin specialized tracks",
      ],
      success_metrics: [
        "80% Security+ passing rate",
        "50+ lab exercises completed",
      ],
    },
    {
      quarter: "Q3",
      focus_areas: ["Advanced Skills", "Certification"],
      key_milestones: ["CEH/CISSP preparation", "Advanced labs"],
      success_metrics: [
        "60% advanced certification ready",
        "Team incident simulations",
      ],
    },
    {
      quarter: "Q4",
      focus_areas: ["Leadership", "Sustainment"],
      key_milestones: [
        "Leadership training",
        "Knowledge sharing sessions",
      ],
      success_metrics: [
        "3+ certifications achieved",
        "Team maturity improvement 50%+",
      ],
    },
  ];
}

function generateCompetitiveAdvantage(
  _skillGaps: Array<{ skill_area: string }>,
  sectorContext: { top_skills: string[]; compliance_focus: string[] }
): Array<{
  advantage: string;
  business_impact: string;
  timeline_to_realization_months: number;
}> {
  return [
    {
      advantage: "Faster Security Incident Response",
      business_impact:
        "Reduce breach impact by 40-50%, save $2M+ per incident",
      timeline_to_realization_months: 6,
    },
    {
      advantage: "Reduced Security Breaches",
      business_impact: "Avoid $4M+ average breach costs",
      timeline_to_realization_months: 9,
    },
    {
      advantage: "Compliance Readiness",
      business_impact: `Meet ${sectorContext.compliance_focus[0]} requirements, avoid fines`,
      timeline_to_realization_months: 4,
    },
    {
      advantage: "Improved Team Retention",
      business_impact: "Reduce turnover costs, improve team stability",
      timeline_to_realization_months: 12,
    },
    {
      advantage: "Enhanced Competitive Position",
      business_impact: "Win contracts requiring certified security teams",
      timeline_to_realization_months: 8,
    },
  ];
}
