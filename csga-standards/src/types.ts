import { z } from "zod";

// Standards Lookup Types
export const StandardNameSchema = z.enum([
  "CSR5",
  "NIST_CSF",
  "ISO_27001",
  "CIS_CONTROLS",
  "MITRE_ATTACK",
  "OWASP",
  "PCI_DSS",
  "HIPAA",
  "SOC_2",
]);

export type StandardName = z.infer<typeof StandardNameSchema>;

export const StandardsLookupInputSchema = z.object({
  standard: StandardNameSchema.optional(),
  query: z.string().optional(),
  focus_area: z
    .enum([
      "governance",
      "asset_management",
      "access_control",
      "detection_response",
      "recovery",
      "awareness_training",
    ])
    .optional(),
});

export type StandardsLookupInput = z.infer<typeof StandardsLookupInputSchema>;

export interface StandardDetails {
  name: string;
  type: string;
  description: string;
  key_domains: string[];
  implementation_steps: string[];
  certification_info?: string;
  compliance_effort: "Low" | "Medium" | "High" | "Critical";
  best_for: string;
}

// KATA Assessment Types
export const KataBeltSchema = z.enum([
  "White",
  "Yellow",
  "Orange",
  "Green",
  "Blue",
  "Purple",
  "Brown",
  "Black",
]);

export type KataBelt = z.infer<typeof KataBeltSchema>;

export const KataAssessmentInputSchema = z.object({
  organization_description: z.string(),
  current_controls: z.string().array(),
  employees_trained: z.number().optional(),
  incident_history: z.string().optional(),
  budget_allocation: z.enum(["Limited", "Moderate", "Substantial"]).optional(),
});

export type KataAssessmentInput = z.infer<typeof KataAssessmentInputSchema>;

export interface KataAssessmentResult {
  current_belt: KataBelt;
  belt_description: string;
  maturity_score: number;
  strengths: string[];
  gaps: string[];
  gap_to_next_belt: string[];
  recommended_training: string[];
  timeline_months: number;
}

// Threat Intelligence Types
export const ThreatIntelInputSchema = z.object({
  sector: z
    .enum([
      "Finance",
      "Healthcare",
      "Energy",
      "Manufacturing",
      "Technology",
      "Government",
      "Retail",
      "Education",
      "Other",
    ])
    .optional(),
  threat_type: z
    .enum([
      "Ransomware",
      "APT",
      "Insider_Threat",
      "DDoS",
      "Zero_Day",
      "Phishing",
      "Supply_Chain",
      "Cloud_Threat",
    ])
    .optional(),
  cve_id: z.string().optional(),
  query: z.string().optional(),
});

export type ThreatIntelInput = z.infer<typeof ThreatIntelInputSchema>;

export interface ThreatAssessment {
  threat_name: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  affected_sectors: string[];
  mitre_tactics: string[];
  mitre_techniques: string[];
  indicators_of_compromise: string[];
  mitigation_recommendations: string[];
  detection_methods: string[];
  recent_activity: string;
}

// Incident Response Types
export const IncidentResponseInputSchema = z.object({
  incident_type: z.enum([
    "Ransomware",
    "Data_Breach",
    "System_Compromise",
    "DDoS",
    "Insider_Threat",
    "Supply_Chain",
    "Malware",
    "Other",
  ]),
  severity: z.enum(["Critical", "High", "Medium", "Low"]),
  affected_systems: z.string().array(),
  affected_records: z.number().optional(),
  internal_systems_only: z.boolean().optional(),
});

export type IncidentResponseInput = z.infer<typeof IncidentResponseInputSchema>;

export interface IncidentResponseProcedure {
  incident_classification: string;
  immediate_actions: string[];
  containment_steps: string[];
  investigation_procedures: string[];
  notification_requirements: string[];
  recovery_timeline_hours: number;
  regulatory_reporting: string;
  post_incident_actions: string[];
}

// Training Pathway Types
export const TrainingPathwayInputSchema = z.object({
  current_level: z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ]),
  goal: z.enum([
    "Security_Awareness",
    "System_Administrator",
    "Security_Analyst",
    "Penetration_Tester",
    "CISO",
    "Incident_Response",
    "Cloud_Security",
    "DevSecOps",
  ]),
  sector: z.string().optional(),
  budget_usd: z.number().optional(),
  learning_preference: z
    .enum(["Self_Paced", "Instructor_Led", "Hybrid", "Hands_On_Lab"])
    .optional(),
});

export type TrainingPathwayInput = z.infer<typeof TrainingPathwayInputSchema>;

export interface TrainingPathway {
  goal: string;
  current_level: string;
  recommended_path: string[];
  courses: TrainingCourse[];
  certifications: Certification[];
  total_duration_months: number;
  estimated_cost_usd: number;
  prerequisite_skills: string[];
  success_metrics: string[];
}

export interface TrainingCourse {
  name: string;
  provider: string;
  duration_hours: number;
  cost_usd: number;
  difficulty: string;
  prerequisites: string[];
  hands_on_labs: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  duration_months: number;
  exam_cost_usd: number;
  maintenance_required: boolean;
  industry_recognition: "High" | "Medium" | "Emerging";
}

// Compliance Check Types
export const ComplianceCheckInputSchema = z.object({
  organization_type: z.enum([
    "Financial",
    "Healthcare",
    "Technology",
    "Retail",
    "Manufacturing",
    "Government",
    "Education",
    "Other",
  ]),
  size: z.enum(["Small", "Medium", "Enterprise"]).optional(),
  current_controls: z.string().array(),
  geographic_scope: z.string().array().optional(),
});

export type ComplianceCheckInput = z.infer<typeof ComplianceCheckInputSchema>;

export interface ComplianceStatus {
  framework: string;
  status: "Compliant" | "Partially_Compliant" | "Non_Compliant";
  compliance_percentage: number;
  applicable: boolean;
  gaps: string[];
  priority_actions: string[];
  estimated_effort_months: number;
  estimated_cost_usd: number;
}

export interface ComplianceCheckResult {
  organization_profile: string;
  assessment_date: string;
  frameworks: ComplianceStatus[];
  overall_risk_level: "Critical" | "High" | "Medium" | "Low";
  recommendations: string[];
}

// Framework Definition Types
export interface FrameworkDefinition {
  id: string;
  name: string;
  version: string;
  description: string;
  domains: string[];
  applicable_sectors: string[];
  compliance_effort: string;
  url: string;
}

// Kata Belt Definition
export interface KataBeltDefinition {
  belt: KataBelt;
  level: number;
  title: string;
  description: string;
  key_competencies: string[];
  maturity_range: { min: number; max: number };
  typical_timeline_months: number;
}
