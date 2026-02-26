import { z } from 'zod';

// Course Level Enum
export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

// Course Status Enum
export enum CourseStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DRAFT = 'draft',
  UPCOMING = 'upcoming'
}

// Certification Type Enum
export enum CertificationType {
  COMPLETION = 'completion',
  PROFESSIONAL = 'professional',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

// Entity Enum
export enum Entity {
  BMCC_CYBER = 'BMCC Cyber',
  DHL_LAWRIE = 'DHL/Lawrie Group',
  CSGA_GLOBAL = 'CSGA Global',
  CSOAI = 'CSOAI',
  TERRANOVA = 'Terranova Group',
  ORBITQ = 'OrbitQ',
  AIDOME = 'AIdome'
}

// Zod Schemas for Validation

export const CourseSearchInputSchema = z.object({
  topic: z.string().min(1).max(100).describe('Topic or subject area to search'),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional().describe('Desired skill level'),
  sector: z.string().max(50).optional().describe('Industry or sector focus'),
  certificationGoal: z.string().max(100).optional().describe('Specific certification target'),
  entity: z.string().optional().describe('Specific entity/organization'),
  limit: z.number().int().min(1).max(50).optional().default(10).describe('Maximum results to return')
});

export type CourseSearchInput = z.infer<typeof CourseSearchInputSchema>;

export const LearningPathInputSchema = z.object({
  currentSkills: z.array(z.string().min(1)).min(0).max(20).describe('List of current skills'),
  careerGoal: z.string().min(1).max(200).describe('Target career goal'),
  timeAvailable: z.number().int().min(1).max(1440).describe('Weekly hours available for learning'),
  budget: z.number().min(0).max(100000).describe('Budget in USD for learning'),
  preferredEntities: z.array(z.string()).max(3).optional().describe('Preferred educational entities')
});

export type LearningPathInput = z.infer<typeof LearningPathInputSchema>;

export const CredentialVerifyInputSchema = z.object({
  credentialId: z.string().optional().describe('Digital credential ID'),
  qrCodeData: z.string().optional().describe('QR code data from credential'),
  blockchainAnchor: z.string().optional().describe('Blockchain transaction hash')
}).refine(
  (data) => data.credentialId || data.qrCodeData || data.blockchainAnchor,
  { message: 'At least one of credentialId, qrCodeData, or blockchainAnchor must be provided' }
);

export type CredentialVerifyInput = z.infer<typeof CredentialVerifyInputSchema>;

export const EnrollInputSchema = z.object({
  courseId: z.string().min(1).describe('Course ID to enroll in'),
  learnerProfile: z.object({
    email: z.string().email().describe('Learner email'),
    firstName: z.string().optional().describe('First name'),
    lastName: z.string().optional().describe('Last name'),
    currentSkillLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional()
  }).describe('Learner information')
});

export type EnrollInput = z.infer<typeof EnrollInputSchema>;

export const ProgressCheckInputSchema = z.object({
  learnerId: z.string().optional().describe('Learner unique ID'),
  email: z.string().email().optional().describe('Learner email address')
}).refine(
  (data) => data.learnerId || data.email,
  { message: 'Either learnerId or email must be provided' }
);

export type ProgressCheckInput = z.infer<typeof ProgressCheckInputSchema>;

export const CertificateIssueInputSchema = z.object({
  courseId: z.string().min(1).describe('Course ID'),
  learnerId: z.string().min(1).describe('Learner ID'),
  completionDate: z.string().datetime().describe('Course completion date (ISO 8601)'),
  score: z.number().min(0).max(100).optional().describe('Final course score'),
  metadata: z.record(z.string(), z.any()).optional().describe('Additional metadata')
});

export type CertificateIssueInput = z.infer<typeof CertificateIssueInputSchema>;

// Response Schemas

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  entity: z.string(),
  level: z.string(),
  duration: z.number().describe('Duration in hours'),
  price: z.number().describe('Price in USD'),
  certification: z.string(),
  enrollmentCount: z.number(),
  completionRate: z.number().describe('Completion rate as percentage'),
  status: z.string(),
  tags: z.array(z.string())
});

export type Course = z.infer<typeof CourseSchema>;

export const LearningPathSchema = z.object({
  id: z.string(),
  userId: z.string(),
  careerGoal: z.string(),
  courses: z.array(CourseSchema),
  estimatedCompletionHours: z.number(),
  estimatedCompletionMonths: z.number(),
  totalCost: z.number(),
  certifications: z.array(z.string()),
  skillsGained: z.array(z.string()),
  careerImpact: z.string()
});

export type LearningPath = z.infer<typeof LearningPathSchema>;

export const CredentialSchema = z.object({
  id: z.string(),
  learnerId: z.string(),
  courseId: z.string(),
  certificationType: z.string(),
  issuingEntity: z.string(),
  completionDate: z.string(),
  skillsValidated: z.array(z.string()),
  blockchainAnchor: z.string().describe('Blockchain transaction hash'),
  qrCode: z.string().describe('QR code image data URI'),
  verificationUrl: z.string().url(),
  status: z.enum(['valid', 'expired', 'revoked'])
});

export type Credential = z.infer<typeof CredentialSchema>;

export const EnrollmentSchema = z.object({
  enrollmentId: z.string(),
  courseId: z.string(),
  learnerId: z.string(),
  status: z.enum(['active', 'completed', 'dropped', 'paused']),
  enrollmentDate: z.string(),
  startDate: z.string(),
  expectedCompletionDate: z.string(),
  prerequisites: z.array(z.string()),
  paymentOptions: z.array(z.object({
    method: z.string(),
    amount: z.number(),
    currency: z.string(),
    available: z.boolean()
  }))
});

export type Enrollment = z.infer<typeof EnrollmentSchema>;

export const ProgressSchema = z.object({
  learnerId: z.string(),
  currentCourses: z.array(z.object({
    courseId: z.string(),
    title: z.string(),
    completionPercentage: z.number().min(0).max(100),
    lastAccessDate: z.string(),
    daysRemaining: z.number()
  })),
  completedCourses: z.array(z.object({
    courseId: z.string(),
    title: z.string(),
    completionDate: z.string(),
    score: z.number()
  })),
  upcomingDeadlines: z.array(z.object({
    courseId: z.string(),
    title: z.string(),
    deadline: z.string(),
    daysUntilDeadline: z.number()
  })),
  achievements: z.array(z.object({
    badgeId: z.string(),
    name: z.string(),
    earnedDate: z.string(),
    description: z.string()
  })),
  totalHoursLearned: z.number(),
  certificationsEarned: z.number(),
  averageCompletionRate: z.number().min(0).max(100)
});

export type Progress = z.infer<typeof ProgressSchema>;

export const CertificateSchema = z.object({
  certificateId: z.string(),
  learnerId: z.string(),
  courseId: z.string(),
  courseName: z.string(),
  issuingEntity: z.string(),
  issuanceDate: z.string(),
  expirationDate: z.string().optional(),
  score: z.number().optional(),
  digitalCertificateUrl: z.string().url(),
  qrCodeUrl: z.string().url(),
  linkedInBadgeUrl: z.string().url().optional(),
  blockchainAnchor: z.string(),
  blockchainVerificationUrl: z.string().url(),
  skills: z.array(z.string())
});

export type Certificate = z.infer<typeof CertificateSchema>;

export const PlatformMetricsSchema = z.object({
  totalLearners: z.number(),
  activeEnrollments: z.number(),
  activeCourses: z.number(),
  completionRate: z.number(),
  monthlyRevenue: z.number(),
  averageCourseDuration: z.number(),
  averageCoursePrice: z.number(),
  topEntities: z.array(z.string()),
  topSkills: z.array(z.string()),
  lastUpdated: z.string()
});

export type PlatformMetrics = z.infer<typeof PlatformMetricsSchema>;
