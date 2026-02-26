/**
 * certificationPrep.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const CertificationPrepInputSchema = z.object({
  target_certification: z.enum([
    "CompTIA Security+",
    "CEH",
    "CISSP",
    "CSR5",
    "K.A.T.A. White Belt",
    "K.A.T.A. Yellow Belt",
    "K.A.T.A. Orange Belt",
    "K.A.T.A. Red Belt",
  ]),
  current_level: z.string(),
});

export type CertificationPrepInput = z.infer<typeof CertificationPrepInputSchema>;

export interface CertificationPrepResult {
  certification_overview: {
    name: string;
    issuing_body: string;
    renewal_period_years: number;
    global_recognition: string;
    career_impact: string;
  };
  prerequisites: {
    minimum_experience: string;
    required_education: string;
    recommended_prior_certifications: string[];
    waiver_options: string[];
  };
  exam_format: {
    question_types: string[];
    number_of_questions: number;
    time_limit_minutes: number;
    passing_score: string;
    cost_usd: number;
    delivery_method: string[];
  };
  content_domains: {
    domain: string;
    percentage: number;
    key_topics: string[];
    practice_questions: number;
  }[];
  study_plan: {
    week: number;
    focus_domains: string[];
    study_hours: number;
    activities: string[];
    practice_test_targets: string;
  }[];
  bmcc_course_alignment: {
    course_id: string;
    course_title: string;
    coverage_percentage: number;
    alignment_domains: string[];
  }[];
  practice_resources: {
    resource_type: string;
    name: string;
    provider: string;
    cost_usd: number;
    estimated_questions: number;
    recommended: boolean;
  }[];
  success_metrics: {
    metric: string;
    benchmark: string;
    how_to_measure: string;
  }[];
  estimated_timeline: {
    total_study_weeks: number;
    hours_per_week: number;
    total_study_hours: number;
    earliest_exam_date_weeks: number;
  };
  test_day_tips: string[];
}

interface CertSpec {
  issuing_body: string;
  renewal_years: number;
  recognition: string;
  impact: string;
  min_experience: string;
  min_education: string;
  prior_certs: string[];
  waivers: string[];
  question_type: string[];
  num_questions: number;
  time_limit: number;
  passing_score: string;
  cost: number;
  delivery: string[];
  domains: Array<{ name: string; pct: number; topics: string[] }>;
  prep_weeks: number;
}

const CERT_SPECS: { [key: string]: CertSpec } = {
  "CompTIA Security+": {
    issuing_body: "CompTIA",
    renewal_years: 3,
    recognition: "Global, widely accepted by US government",
    impact: "Entry-point to security careers, DoD 8570 compliance",
    min_experience: "2+ years IT experience",
    min_education: "High school diploma/GED",
    prior_certs: ["A+", "Network+"],
    waivers: ["Military experience"],
    question_type: ["Multiple choice", "Performance-based"],
    num_questions: 90,
    time_limit: 90,
    passing_score: "750/900 (83%)",
    cost: 370,
    delivery: ["Pearson VUE testing centers", "Online proctored"],
    domains: [
      {
        name: "Threats, Attacks, and Vulnerabilities",
        pct: 24,
        topics: [
          "Types of attacks",
          "Vulnerabilities",
          "Threat intelligence",
          "Impact analysis",
        ],
      },
      {
        name: "Technologies and Tools",
        pct: 22,
        topics: [
          "Encryption",
          "PKI",
          "Firewalls",
          "IDS/IPS",
          "SIEM",
          "DLP",
          "NAC",
        ],
      },
      {
        name: "Architecture and Design",
        pct: 15,
        topics: [
          "Security models",
          "Zero trust",
          "Defense in depth",
          "Secure design",
        ],
      },
      {
        name: "Identity and Access Management",
        pct: 16,
        topics: ["AAA", "OAuth", "SAML", "MFA", "Access controls"],
      },
      {
        name: "Risk Management",
        pct: 12,
        topics: ["Risk assessment", "Incident response", "Business continuity"],
      },
      {
        name: "Cryptography and PKI",
        pct: 11,
        topics: [
          "Encryption algorithms",
          "Hash functions",
          "Digital signatures",
          "Certificates",
        ],
      },
    ],
    prep_weeks: 8,
  },
  CEH: {
    issuing_body: "EC-Council",
    renewal_years: 3,
    recognition: "Global, valued in penetration testing",
    impact: "Career advancement for ethical hackers and pentesters",
    min_experience: "2+ years relevant security experience",
    min_education: "High school diploma/GED",
    prior_certs: ["CompTIA Security+"],
    waivers: ["5+ years experience", "Military experience"],
    question_type: ["Multiple choice (exam)", "Practical labs"],
    num_questions: 125,
    time_limit: 240,
    passing_score: "70%",
    cost: 1250,
    delivery: ["Prometric centers", "Online proctored"],
    domains: [
      {
        name: "Reconnaissance",
        pct: 8,
        topics: ["Passive reconnaissance", "OSINT", "Footprinting"],
      },
      {
        name: "Scanning & Enumeration",
        pct: 10,
        topics: ["Port scanning", "Vulnerability scanning", "SNMP"],
      },
      {
        name: "Exploitation",
        pct: 15,
        topics: ["Exploit frameworks", "Metasploit", "Privilege escalation"],
      },
      {
        name: "Cloud Security",
        pct: 10,
        topics: ["AWS/Azure security", "Cloud vulnerabilities"],
      },
      {
        name: "Cryptography",
        pct: 12,
        topics: [
          "Encryption",
          "Hashing",
          "PKI",
          "Cryptanalysis",
        ],
      },
      {
        name: "IDS/IPS",
        pct: 8,
        topics: ["Detection systems", "Evasion techniques"],
      },
      {
        name: "Firewalls & Proxies",
        pct: 7,
        topics: ["Firewall types", "NAT", "Proxy servers"],
      },
      {
        name: "Mobile & Web Security",
        pct: 15,
        topics: ["OWASP Top 10", "Mobile vulns", "API security"],
      },
      {
        name: "Incident Response",
        pct: 15,
        topics: ["Detection", "Investigation", "Forensics"],
      },
    ],
    prep_weeks: 12,
  },
  CISSP: {
    issuing_body: "ISC²",
    renewal_years: 3,
    recognition: "Gold standard, global enterprise security",
    impact: "Path to senior and leadership roles",
    min_experience: "5+ years security experience",
    min_education: "Bachelor's degree required",
    prior_certs: ["Security+ recommended"],
    waivers: ["Master's degree reduces to 3 years experience"],
    question_type: ["Multiple choice"],
    num_questions: 100,
    time_limit: 180,
    passing_score: "70%",
    cost: 749,
    delivery: ["Prometric centers", "Online proctored"],
    domains: [
      {
        name: "Security and Risk Management",
        pct: 13,
        topics: ["Risk assessment", "Security policies", "Compliance"],
      },
      {
        name: "Asset Security",
        pct: 12,
        topics: ["Data classification", "Asset management"],
      },
      {
        name: "Security Architecture and Engineering",
        pct: 13,
        topics: ["Design principles", "Implementation"],
      },
      {
        name: "Communication and Network Security",
        pct: 14,
        topics: ["Network protocols", "Network security"],
      },
      {
        name: "Identity and Access Management",
        pct: 13,
        topics: ["AAA", "Access control models"],
      },
      {
        name: "Security Assessment and Testing",
        pct: 12,
        topics: ["Vulnerability assessment", "Penetration testing"],
      },
      {
        name: "Security Operations",
        pct: 13,
        topics: ["Incident response", "Business continuity"],
      },
      {
        name: "Software Development Security",
        pct: 10,
        topics: ["Secure SDLC", "Code review"],
      },
    ],
    prep_weeks: 16,
  },
  CSR5: {
    issuing_body: "GIAC/SANS",
    renewal_years: 4,
    recognition: "Specialized, strong in advanced security",
    impact: "Expert-level security specialization",
    min_experience: "3+ years security experience",
    min_education: "Bachelor's degree recommended",
    prior_certs: ["Security+ or equivalent"],
    waivers: [],
    question_type: ["Multiple choice", "Hands-on scenario"],
    num_questions: 75,
    time_limit: 120,
    passing_score: "70%",
    cost: 500,
    delivery: ["Testing centers"],
    domains: [
      {
        name: "Cryptography",
        pct: 20,
        topics: [
          "Cryptographic algorithms",
          "Implementation",
          "Analysis",
        ],
      },
      {
        name: "PKI and Certificates",
        pct: 18,
        topics: ["PKI architecture", "Certificate management"],
      },
      {
        name: "Network Protocols",
        pct: 17,
        topics: ["Protocol analysis", "Secure protocols"],
      },
      {
        name: "Security Applications",
        pct: 20,
        topics: ["VPN", "SSL/TLS", "Secure applications"],
      },
      {
        name: "Emerging Technologies",
        pct: 15,
        topics: ["Cloud security", "IoT security"],
      },
      {
        name: "Enterprise Security",
        pct: 10,
        topics: ["Enterprise architecture", "Integration"],
      },
    ],
    prep_weeks: 10,
  },
  "K.A.T.A. White Belt": {
    issuing_body: "CSGA",
    renewal_years: 2,
    recognition: "Foundation level, BMCC partnership",
    impact: "Entry to K.A.T.A. progression system",
    min_experience: "None",
    min_education: "None",
    prior_certs: [],
    waivers: [],
    question_type: ["Practical demonstration"],
    num_questions: 0,
    time_limit: 120,
    passing_score: "Demonstrated competency",
    cost: 200,
    delivery: ["BMCC testing centers"],
    domains: [
      {
        name: "Cybersecurity Fundamentals",
        pct: 30,
        topics: ["Security basics", "Threats overview"],
      },
      {
        name: "Hands-on Lab Exercises",
        pct: 40,
        topics: ["Basic security controls", "Network basics"],
      },
      {
        name: "Compliance Awareness",
        pct: 20,
        topics: ["Security policies", "Best practices"],
      },
      {
        name: "Practical Assessment",
        pct: 10,
        topics: ["Real-world scenarios"],
      },
    ],
    prep_weeks: 4,
  },
  "K.A.T.A. Yellow Belt": {
    issuing_body: "CSGA",
    renewal_years: 2,
    recognition: "Intermediate level, practical skills",
    impact: "Qualification for intermediate security roles",
    min_experience: "1+ year OR White Belt",
    min_education: "None",
    prior_certs: ["K.A.T.A. White Belt recommended"],
    waivers: [],
    question_type: ["Practical labs", "Written exam"],
    num_questions: 50,
    time_limit: 180,
    passing_score: "75%",
    cost: 300,
    delivery: ["BMCC testing centers"],
    domains: [
      {
        name: "Network Security",
        pct: 30,
        topics: ["Network configuration", "Firewalls"],
      },
      {
        name: "System Hardening",
        pct: 25,
        topics: ["OS security", "Patch management"],
      },
      {
        name: "Vulnerability Assessment",
        pct: 25,
        topics: ["Scanning tools", "Assessment techniques"],
      },
      {
        name: "Incident Response Basics",
        pct: 20,
        topics: ["Detection", "Basic response"],
      },
    ],
    prep_weeks: 6,
  },
  "K.A.T.A. Orange Belt": {
    issuing_body: "CSGA",
    renewal_years: 2,
    recognition: "Advanced level, specialized skills",
    impact: "Qualification for specialist roles",
    min_experience: "2+ years OR Yellow Belt",
    min_education: "Associate's degree or equivalent",
    prior_certs: ["K.A.T.A. Yellow Belt"],
    waivers: [],
    question_type: ["Advanced labs", "Practical project"],
    num_questions: 60,
    time_limit: 240,
    passing_score: "80%",
    cost: 400,
    delivery: ["BMCC testing centers"],
    domains: [
      {
        name: "Advanced Network Security",
        pct: 25,
        topics: [
          "Advanced configurations",
          "Segmentation",
          "Protocol analysis",
        ],
      },
      {
        name: "Ethical Hacking Basics",
        pct: 25,
        topics: ["Reconnaissance", "Scanning", "Basic exploitation"],
      },
      {
        name: "Forensics Introduction",
        pct: 20,
        topics: ["Evidence handling", "Investigation basics"],
      },
      {
        name: "Cloud Security",
        pct: 20,
        topics: ["Cloud platforms", "Cloud security controls"],
      },
      {
        name: "Advanced Incident Response",
        pct: 10,
        topics: ["Advanced response", "Threat hunting"],
      },
    ],
    prep_weeks: 8,
  },
  "K.A.T.A. Red Belt": {
    issuing_body: "CSGA",
    renewal_years: 2,
    recognition: "Expert/Master level",
    impact: "Qualification for expert and leadership roles",
    min_experience: "5+ years OR Orange Belt + 2 years",
    min_education: "Bachelor's degree or equivalent",
    prior_certs: ["K.A.T.A. Orange Belt"],
    waivers: [],
    question_type: ["Comprehensive project", "Mentoring"],
    num_questions: 0,
    time_limit: 480,
    passing_score: "Master-level demonstration",
    cost: 600,
    delivery: ["BMCC testing centers", "Remote options"],
    domains: [
      {
        name: "Enterprise Security Architecture",
        pct: 25,
        topics: ["Enterprise design", "Integration"],
      },
      {
        name: "Advanced Penetration Testing",
        pct: 20,
        topics: ["Complex exploitation", "Post-exploitation"],
      },
      {
        name: "Advanced Forensics & IR",
        pct: 20,
        topics: ["Complex investigations", "Malware analysis"],
      },
      {
        name: "Security Leadership",
        pct: 20,
        topics: ["Team management", "Strategy"],
      },
      {
        name: "Emerging Threats",
        pct: 15,
        topics: ["AI security", "Zero trust", "Advanced threats"],
      },
    ],
    prep_weeks: 12,
  },
};

export async function handleCertificationPrep(
  input: CertificationPrepInput
): Promise<CertificationPrepResult> {
  const spec = CERT_SPECS[input.target_certification];
  if (!spec) {
    throw new Error(`Certification ${input.target_certification} not found`);
  }

  const studyPlan = generateStudyPlan(spec, input.target_certification);
  const bmccAlignment = generateBMCCAlignment(input.target_certification);
  const practiceResources = generatePracticeResources(
    input.target_certification
  );
  const successMetrics = generateSuccessMetrics();

  return {
    certification_overview: {
      name: input.target_certification,
      issuing_body: spec.issuing_body,
      renewal_period_years: spec.renewal_years,
      global_recognition: spec.recognition,
      career_impact: spec.impact,
    },
    prerequisites: {
      minimum_experience: spec.min_experience,
      required_education: spec.min_education,
      recommended_prior_certifications: spec.prior_certs,
      waiver_options: spec.waivers,
    },
    exam_format: {
      question_types: spec.question_type,
      number_of_questions: spec.num_questions,
      time_limit_minutes: spec.time_limit,
      passing_score: spec.passing_score,
      cost_usd: spec.cost,
      delivery_method: spec.delivery,
    },
    content_domains: spec.domains.map((d) => ({
      domain: d.name,
      percentage: d.pct,
      key_topics: d.topics,
      practice_questions: Math.round((spec.num_questions * d.pct) / 100),
    })),
    study_plan: studyPlan,
    bmcc_course_alignment: bmccAlignment,
    practice_resources: practiceResources,
    success_metrics: successMetrics,
    estimated_timeline: {
      total_study_weeks: spec.prep_weeks,
      hours_per_week: 15,
      total_study_hours: spec.prep_weeks * 15,
      earliest_exam_date_weeks: Math.ceil(spec.prep_weeks * 1.2),
    },
    test_day_tips: [
      "Arrive 15 minutes early",
      "Bring two valid IDs",
      "Review exam rules and guidelines",
      "Read questions carefully",
      "Manage your time (time_limit / num_questions minutes per question)",
      "Answer easier questions first",
      "Review your answers if time permits",
      "Stay calm and focused",
      "Trust your preparation",
      "Bring nothing except IDs and admission ticket",
    ],
  };
}

function generateStudyPlan(
  spec: CertSpec,
  _cert: string
): Array<{
  week: number;
  focus_domains: string[];
  study_hours: number;
  activities: string[];
  practice_test_targets: string;
}> {
  const plan: Array<{
    week: number;
    focus_domains: string[];
    study_hours: number;
    activities: string[];
    practice_test_targets: string;
  }> = [];

  const domains = spec.domains;
  const weeksPerDomain = Math.floor(spec.prep_weeks / domains.length);

  for (let week = 1; week <= spec.prep_weeks; week++) {
    const domainIndex = Math.min(
      Math.floor((week - 1) / weeksPerDomain),
      domains.length - 1
    );
    const domain = domains[domainIndex];

    if (week % 2 === 1) {
      // Odd weeks: learning
      plan.push({
        week,
        focus_domains: [domain.name],
        study_hours: 15,
        activities: [
          `Study ${domain.name}`,
          "Review course materials",
          "Take detailed notes",
          "Watch instructional videos",
        ],
        practice_test_targets: "0%",
      });
    } else {
      // Even weeks: practice
      plan.push({
        week,
        focus_domains: [domain.name, domains[(domainIndex + 1) % domains.length].name],
        study_hours: 15,
        activities: [
          "Practice questions on topic",
          "Review missed questions",
          "Do hands-on labs",
          "Analyze weak areas",
        ],
        practice_test_targets: `${Math.min(50 + week * 5, 95)}%`,
      });
    }
  }

  return plan;
}

function generateBMCCAlignment(
  cert: string
): Array<{
  course_id: string;
  course_title: string;
  coverage_percentage: number;
  alignment_domains: string[];
}> {
  const alignments: { [key: string]: Array<{
    course_id: string;
    course_title: string;
    coverage_percentage: number;
    alignment_domains: string[];
  }> } = {
    "CompTIA Security+": [
      {
        course_id: "cyber-101",
        course_title: "Cybersecurity Fundamentals",
        coverage_percentage: 40,
        alignment_domains: [
          "Threats, Attacks, and Vulnerabilities",
          "Risk Management",
        ],
      },
      {
        course_id: "cyber-201",
        course_title: "Network Security & Defence",
        coverage_percentage: 35,
        alignment_domains: [
          "Technologies and Tools",
          "Architecture and Design",
        ],
      },
    ],
    CEH: [
      {
        course_id: "cyber-201",
        course_title: "Network Security & Defence",
        coverage_percentage: 25,
        alignment_domains: ["Scanning & Enumeration", "IDS/IPS"],
      },
      {
        course_id: "cyber-301",
        course_title: "Ethical Hacking & Penetration Testing",
        coverage_percentage: 70,
        alignment_domains: [
          "Reconnaissance",
          "Exploitation",
          "Incident Response",
        ],
      },
    ],
    CISSP: [
      {
        course_id: "cyber-401",
        course_title: "Incident Response & Forensics",
        coverage_percentage: 30,
        alignment_domains: [
          "Security Operations",
          "Security Assessment and Testing",
        ],
      },
      {
        course_id: "cyber-402",
        course_title: "Security Governance & Compliance",
        coverage_percentage: 45,
        alignment_domains: [
          "Security and Risk Management",
          "Security Architecture and Engineering",
        ],
      },
    ],
    CSR5: [
      {
        course_id: "cyber-303",
        course_title: "Cryptography & Data Protection",
        coverage_percentage: 50,
        alignment_domains: ["Cryptography", "PKI and Certificates"],
      },
      {
        course_id: "cyber-302",
        course_title: "Cloud Security",
        coverage_percentage: 25,
        alignment_domains: ["Emerging Technologies"],
      },
    ],
    "K.A.T.A. White Belt": [
      {
        course_id: "cyber-101",
        course_title: "Cybersecurity Fundamentals",
        coverage_percentage: 100,
        alignment_domains: [
          "Cybersecurity Fundamentals",
          "Compliance Awareness",
        ],
      },
    ],
    "K.A.T.A. Yellow Belt": [
      {
        course_id: "cyber-201",
        course_title: "Network Security & Defence",
        coverage_percentage: 80,
        alignment_domains: ["Network Security", "System Hardening"],
      },
    ],
    "K.A.T.A. Orange Belt": [
      {
        course_id: "cyber-301",
        course_title: "Ethical Hacking & Penetration Testing",
        coverage_percentage: 60,
        alignment_domains: ["Ethical Hacking Basics"],
      },
      {
        course_id: "cyber-302",
        course_title: "Cloud Security",
        coverage_percentage: 50,
        alignment_domains: ["Cloud Security"],
      },
    ],
    "K.A.T.A. Red Belt": [
      {
        course_id: "cyber-401",
        course_title: "Incident Response & Forensics",
        coverage_percentage: 70,
        alignment_domains: [
          "Advanced Forensics & IR",
          "Enterprise Security Architecture",
        ],
      },
      {
        course_id: "cyber-402",
        course_title: "Security Governance & Compliance",
        coverage_percentage: 70,
        alignment_domains: [
          "Security Leadership",
          "Enterprise Security Architecture",
        ],
      },
    ],
  };

  return alignments[cert] || [];
}

function generatePracticeResources(
  cert: string
): Array<{
  resource_type: string;
  name: string;
  provider: string;
  cost_usd: number;
  estimated_questions: number;
  recommended: boolean;
}> {
  return [
    {
      resource_type: "Practice Exam",
      name: `${cert} Official Practice Test`,
      provider: "Official Provider",
      cost_usd: 50,
      estimated_questions: 100,
      recommended: true,
    },
    {
      resource_type: "Study Materials",
      name: `${cert} Study Guide (Latest Edition)`,
      provider: "Official/Third-party",
      cost_usd: 45,
      estimated_questions: 0,
      recommended: true,
    },
    {
      resource_type: "Online Course",
      name: `${cert} Complete Course`,
      provider: "Udemy/Coursera",
      cost_usd: 60,
      estimated_questions: 150,
      recommended: true,
    },
    {
      resource_type: "Video Training",
      name: `${cert} Video Course`,
      provider: "Pluralsight",
      cost_usd: 299,
      estimated_questions: 200,
      recommended: false,
    },
    {
      resource_type: "Lab Environment",
      name: "Hands-on Lab Platform",
      provider: "TryHackMe/HackTheBox",
      cost_usd: 120,
      estimated_questions: 300,
      recommended: true,
    },
    {
      resource_type: "Exam Simulator",
      name: "Full Exam Simulator",
      provider: "Boson/Kaplan",
      cost_usd: 150,
      estimated_questions: 400,
      recommended: true,
    },
  ];
}

function generateSuccessMetrics(): Array<{
  metric: string;
  benchmark: string;
  how_to_measure: string;
}> {
  return [
    {
      metric: "Practice Exam Score",
      benchmark: ">= Passing Score",
      how_to_measure:
        "Take official practice exams and compare with passing threshold",
    },
    {
      metric: "Domain Mastery",
      benchmark: ">= 80% per domain",
      how_to_measure:
        "Track performance on domain-specific practice questions",
    },
    {
      metric: "Time Management",
      benchmark: "Complete exam in 80% of time limit",
      how_to_measure: "Practice under timed conditions",
    },
    {
      metric: "Consistency",
      benchmark: "3 consecutive practice exams >= passing score",
      how_to_measure: "Log practice exam results",
    },
    {
      metric: "Knowledge Retention",
      benchmark: "90%+ on review quizzes",
      how_to_measure: "Take end-of-topic quizzes",
    },
  ];
}
