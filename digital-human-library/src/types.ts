import { z } from 'zod';

// ============================================================================
// ENUMS AND CONSTANTS
// ============================================================================

export const GRADE_LEVELS = [
  'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
] as const;

export const SUBJECT_AREAS = [
  'Mathematics',
  'Science',
  'Technology',
  'Engineering',
  'Business',
  'Environmental',
  'Healthcare',
  'Agriculture',
  'Arts',
  'Language Arts',
  'Social Studies',
  'Computer Science',
  'Entrepreneurship',
  'Communications'
] as const;

export const SESSION_TYPES = ['virtual', 'in_person', 'hybrid'] as const;

export const REGIONS = [
  'Northeast',
  'Southeast',
  'Midwest',
  'Southwest',
  'West',
  'Pacific',
  'British Columbia',
  'Alberta',
  'Saskatchewan',
  'Manitoba',
  'Ontario',
  'Quebec',
  'Atlantic'
] as const;

export const METRICS = ['engagement', 'outcomes', 'satisfaction', 'all'] as const;

export const SCHOOL_TYPES = [
  'Elementary',
  'Middle School',
  'High School',
  'K-8',
  'K-12',
  'Alternative',
  'Charter',
  'Virtual'
] as const;

export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Engineering',
  'Environmental',
  'Education',
  'Media',
  'Manufacturing',
  'Renewable Energy',
  'Architecture',
  'Agriculture',
  'Business',
  'Law',
  'Government',
  'Non-profit'
] as const;

// ============================================================================
// ZOD SCHEMAS
// ============================================================================

export const MentorMatchInputSchema = z.object({
  grade_level: z.enum(GRADE_LEVELS),
  subject_area: z.enum(SUBJECT_AREAS),
  learning_objectives: z.array(z.string()).min(1),
  location: z.enum(REGIONS),
  session_type: z.enum(SESSION_TYPES)
});

export const CurriculumAlignInputSchema = z.object({
  province_or_state: z.string(),
  grade_level: z.enum(GRADE_LEVELS),
  subject: z.enum(SUBJECT_AREAS),
  learning_outcomes: z.array(z.string()).min(1),
  duration: z.number().min(30).max(480)
});

export const ImpactReportInputSchema = z.object({
  school_id: z.string(),
  date_range: z.object({
    start_date: z.string().datetime(),
    end_date: z.string().datetime()
  }),
  metrics_requested: z.enum(METRICS)
});

export const SessionPlanInputSchema = z.object({
  mentor_expertise: z.enum(SUBJECT_AREAS),
  student_grade: z.enum(GRADE_LEVELS),
  topic: z.string(),
  duration: z.number().min(30).max(480),
  group_size: z.number().min(1).max(50)
});

export const ProgramDesignInputSchema = z.object({
  school_type: z.enum(SCHOOL_TYPES),
  student_population: z.number().min(10),
  budget: z.number().min(1000),
  duration: z.enum(['semester', 'year', 'multi-year']),
  focus_areas: z.array(z.enum(SUBJECT_AREAS)).min(1),
  goals: z.array(z.string()).min(1)
});

export const CareerExplorerInputSchema = z.object({
  student_interests: z.array(z.string()).min(1),
  grade_level: z.enum(GRADE_LEVELS),
  preferred_industries: z.array(z.enum(INDUSTRIES)).min(1),
  skills: z.array(z.string()).min(0)
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type MentorMatchInput = z.infer<typeof MentorMatchInputSchema>;
export type CurriculumAlignInput = z.infer<typeof CurriculumAlignInputSchema>;
export type ImpactReportInput = z.infer<typeof ImpactReportInputSchema>;
export type SessionPlanInput = z.infer<typeof SessionPlanInputSchema>;
export type ProgramDesignInput = z.infer<typeof ProgramDesignInputSchema>;
export type CareerExplorerInput = z.infer<typeof CareerExplorerInputSchema>;

// ============================================================================
// OUTPUT TYPES
// ============================================================================

export interface MentorProfile {
  id: string;
  name: string;
  expertise: string[];
  industry: string;
  experience_years: number;
  availability: string[];
  certifications: string[];
  session_format_preference: string;
  rating: number;
  match_score: number;
}

export interface MentorMatchOutput {
  matched_mentors: MentorProfile[];
  total_matches: number;
  curriculum_alignment: string;
  session_format_recommendations: string[];
  expertise_profiles: string[];
  next_steps: string[];
}

export interface CurriculumStandard {
  standard_code: string;
  description: string;
  grade_band: string;
}

export interface CurriculumAlignOutput {
  province_or_state: string;
  subject: string;
  aligned_standards: CurriculumStandard[];
  cross_curricular_connections: string[];
  assessment_rubric: Record<string, string>;
  pre_session_activities: string[];
  post_session_activities: string[];
}

export interface EngagementMetric {
  metric_name: string;
  baseline: number;
  current: number;
  improvement_percentage: number;
  status: 'improving' | 'stable' | 'declining';
}

export interface ImpactReportOutput {
  school_id: string;
  report_period: string;
  student_engagement_metrics: EngagementMetric[];
  learning_outcome_improvements: EngagementMetric[];
  teacher_satisfaction_score: number;
  mentor_effectiveness_score: number;
  program_roi: number;
  success_stories: string[];
  recommendations: string[];
}

export interface SessionActivity {
  time_minutes: number;
  activity: string;
  description: string;
  materials_needed: string[];
}

export interface SessionPlanOutput {
  session_outline: SessionActivity[];
  discussion_prompts: string[];
  hands_on_activities: string[];
  reflection_questions: string[];
  follow_up_assignments: string[];
  tech_requirements: string[];
  estimated_time: number;
}

export interface ProgramPhase {
  phase_number: number;
  name: string;
  duration: string;
  objectives: string[];
  activities: string[];
}

export interface ProgramDesignOutput {
  program_structure: {
    total_sessions: number;
    frequency: string;
    phases: ProgramPhase[];
  };
  mentor_recruitment_plan: {
    target_count: number;
    recruitment_channels: string[];
    training_requirements: string[];
  };
  schedule: string;
  assessment_framework: Record<string, string>;
  budget_breakdown: Record<string, number>;
  success_metrics: string[];
}

export interface CareerPathway {
  career_title: string;
  industry: string;
  education_required: string[];
  estimated_salary_range: string;
  growth_outlook: string;
  related_skills: string[];
}

export interface CareerExplorerOutput {
  career_pathways: CareerPathway[];
  day_in_life_descriptions: Record<string, string>;
  required_education: string[];
  salary_ranges: string[];
  available_mentors_count: number;
  available_mentors: MentorProfile[];
  industry_growth_trends: Record<string, string>;
}
