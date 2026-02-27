/**
 * courseCatalog.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const CourseCatalogInputSchema = z.object({
  topic: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  focus_area: z.string().optional(),
});

export type CourseCatalogInput = z.infer<typeof CourseCatalogInputSchema>;

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  duration_hours: number;
  credits: number;
  prerequisites: string[];
  learning_outcomes: string[];
  focus_areas: string[];
  kata_alignment: string[];
  certification_prep: string[];
}

const BMCC_COURSES: Course[] = [
  {
    id: "cyber-101",
    title: "Cybersecurity Fundamentals",
    description:
      "Introduction to core cybersecurity concepts, threats, vulnerabilities, and defense mechanisms. Covers CIA triad, common attack vectors, and industry best practices.",
    level: "beginner",
    duration_hours: 40,
    credits: 3,
    prerequisites: ["Basic IT knowledge recommended"],
    learning_outcomes: [
      "Understand cybersecurity principles and concepts",
      "Identify common threats and vulnerabilities",
      "Apply basic security controls",
      "Recognize social engineering tactics",
      "Understand compliance frameworks",
    ],
    focus_areas: [
      "threat_analysis",
      "security_controls",
      "compliance",
      "risk_assessment",
    ],
    kata_alignment: ["K.A.T.A. White Belt"],
    certification_prep: ["CompTIA Security+ (foundation)"],
  },
  {
    id: "cyber-201",
    title: "Network Security & Defence",
    description:
      "Comprehensive study of network architecture, protocols, and security. Covers firewalls, IDS/IPS, VPNs, DNS security, and network hardening techniques.",
    level: "intermediate",
    duration_hours: 50,
    credits: 4,
    prerequisites: ["Cybersecurity Fundamentals", "Networking basics"],
    learning_outcomes: [
      "Design secure network architectures",
      "Configure and manage firewalls",
      "Implement intrusion detection/prevention systems",
      "Secure network protocols and services",
      "Perform network vulnerability assessments",
      "Analyze network traffic and logs",
    ],
    focus_areas: [
      "network_security",
      "firewall_management",
      "ids_ips",
      "network_hardening",
    ],
    kata_alignment: ["K.A.T.A. Yellow Belt"],
    certification_prep: ["CompTIA Security+", "CEH (network module)"],
  },
  {
    id: "cyber-301",
    title: "Ethical Hacking & Penetration Testing",
    description:
      "Learn offensive security techniques in controlled, ethical environment. Covers reconnaissance, scanning, enumeration, exploitation, and post-exploitation analysis.",
    level: "advanced",
    duration_hours: 60,
    credits: 4,
    prerequisites: [
      "Network Security & Defence",
      "Linux/Windows administration basics",
    ],
    learning_outcomes: [
      "Conduct authorized penetration tests",
      "Perform reconnaissance and intelligence gathering",
      "Execute vulnerability scanning and enumeration",
      "Develop and execute exploits responsibly",
      "Write comprehensive penetration test reports",
      "Understand legal and ethical frameworks",
    ],
    focus_areas: [
      "ethical_hacking",
      "penetration_testing",
      "vulnerability_analysis",
      "exploit_development",
    ],
    kata_alignment: ["K.A.T.A. Orange Belt"],
    certification_prep: ["CEH", "OSCP"],
  },
  {
    id: "cyber-401",
    title: "Incident Response & Forensics",
    description:
      "Master incident detection, investigation, and response. Covers digital forensics, evidence handling, incident classification, containment strategies, and post-incident analysis.",
    level: "advanced",
    duration_hours: 55,
    credits: 4,
    prerequisites: ["Network Security & Defence", "Cybersecurity Fundamentals"],
    learning_outcomes: [
      "Develop incident response procedures",
      "Collect and preserve digital evidence",
      "Analyze security events and logs",
      "Perform malware analysis basics",
      "Document chain of custody",
      "Create incident reports and recommendations",
    ],
    focus_areas: [
      "incident_response",
      "digital_forensics",
      "malware_analysis",
      "log_analysis",
    ],
    kata_alignment: ["K.A.T.A. Red Belt"],
    certification_prep: ["CISSP (IR module)", "GIAC certifications"],
  },
  {
    id: "cyber-205",
    title: "Application Security",
    description:
      "Secure software development lifecycle, code review, and vulnerability assessment. Covers OWASP Top 10, secure coding practices, and application testing techniques.",
    level: "intermediate",
    duration_hours: 45,
    credits: 3,
    prerequisites: ["Cybersecurity Fundamentals", "Programming basics"],
    learning_outcomes: [
      "Understand OWASP Top 10 vulnerabilities",
      "Perform code security reviews",
      "Test applications for security flaws",
      "Understand authentication and authorization",
      "Implement secure coding practices",
      "Evaluate third-party dependencies",
    ],
    focus_areas: [
      "application_security",
      "secure_coding",
      "vulnerability_assessment",
    ],
    kata_alignment: ["K.A.T.A. Yellow Belt", "K.A.T.A. Orange Belt"],
    certification_prep: ["CEH (application module)"],
  },
  {
    id: "cyber-302",
    title: "Cloud Security",
    description:
      "Security in cloud environments (AWS, Azure, GCP). Covers cloud architecture, IAM, data protection, compliance, and cloud-specific threats.",
    level: "intermediate",
    duration_hours: 40,
    credits: 3,
    prerequisites: ["Network Security & Defence", "Cybersecurity Fundamentals"],
    learning_outcomes: [
      "Understand cloud security models",
      "Configure cloud IAM and access controls",
      "Implement cloud data protection",
      "Assess cloud compliance requirements",
      "Identify cloud-specific vulnerabilities",
      "Design secure cloud architectures",
    ],
    focus_areas: ["cloud_security", "iam", "data_protection", "compliance"],
    kata_alignment: ["K.A.T.A. Yellow Belt"],
    certification_prep: ["CompTIA Security+", "AWS Certified Security"],
  },
  {
    id: "cyber-303",
    title: "Cryptography & Data Protection",
    description:
      "Cryptographic principles, algorithms, and applications. Covers symmetric/asymmetric encryption, hashing, digital signatures, PKI, and data protection standards.",
    level: "advanced",
    duration_hours: 45,
    credits: 3,
    prerequisites: [
      "Cybersecurity Fundamentals",
      "Network Security & Defence",
    ],
    learning_outcomes: [
      "Understand cryptographic principles",
      "Implement encryption solutions",
      "Manage cryptographic keys",
      "Design PKI infrastructure",
      "Assess cryptographic implementations",
      "Comply with data protection regulations",
    ],
    focus_areas: [
      "cryptography",
      "encryption",
      "key_management",
      "data_protection",
    ],
    kata_alignment: ["K.A.T.A. Orange Belt", "K.A.T.A. Red Belt"],
    certification_prep: ["CISSP", "CEH"],
  },
  {
    id: "cyber-402",
    title: "Security Governance & Compliance",
    description:
      "Enterprise security frameworks, policies, and regulatory compliance. Covers NIST, ISO 27001, GDPR, HIPAA, PCI-DSS, and security governance best practices.",
    level: "advanced",
    duration_hours: 40,
    credits: 3,
    prerequisites: ["Cybersecurity Fundamentals"],
    learning_outcomes: [
      "Develop security policies and procedures",
      "Implement security frameworks",
      "Assess compliance requirements",
      "Perform risk assessments",
      "Design security governance models",
      "Audit security controls",
    ],
    focus_areas: [
      "governance",
      "compliance",
      "risk_management",
      "audit",
    ],
    kata_alignment: ["K.A.T.A. Red Belt"],
    certification_prep: ["CISSP", "CISM"],
  },
];

export async function handleCourseCatalog(
  input: CourseCatalogInput
): Promise<{
  courses: Course[];
  total: number;
  filters_applied: string[];
}> {
  let filtered = BMCC_COURSES;
  const filters_applied: string[] = [];

  if (input.level) {
    filtered = filtered.filter((c) => c.level === input.level);
    filters_applied.push(`level: ${input.level}`);
  }

  if (input.topic) {
    const topicLower = input.topic.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(topicLower) ||
        c.description.toLowerCase().includes(topicLower) ||
        c.focus_areas.some((f) =>
          f.toLowerCase().includes(topicLower)
        )
    );
    filters_applied.push(`topic: ${input.topic}`);
  }

  if (input.focus_area) {
    filtered = filtered.filter((c) =>
      c.focus_areas.some((f) =>
        f.toLowerCase().includes(input.focus_area!.toLowerCase())
      )
    );
    filters_applied.push(`focus_area: ${input.focus_area}`);
  }

  return {
    courses: filtered,
    total: filtered.length,
    filters_applied,
  };
}
