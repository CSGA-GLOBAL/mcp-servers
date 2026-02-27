import { z } from 'zod';

// Enums
export enum Sector {
  FINANCE = 'finance',
  HEALTHCARE = 'healthcare',
  DEFENSE = 'defense',
  ENERGY = 'energy',
  TELECOMMUNICATIONS = 'telecommunications',
  GOVERNMENT = 'government',
  TECHNOLOGY = 'technology',
  MANUFACTURING = 'manufacturing',
  EDUCATION = 'education',
  OTHER = 'other',
}

export enum DataSensitivityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum PQCAlgorithmType {
  KEY_EXCHANGE = 'key_exchange',
  DIGITAL_SIGNATURE = 'digital_signature',
  ENCRYPTION = 'encryption',
}

export enum Jurisdiction {
  US = 'US',
  EU = 'EU',
  UK = 'UK',
  APAC = 'APAC',
  CANADA = 'CANADA',
  GLOBAL = 'GLOBAL',
}

export enum MigrationPhase {
  DISCOVERY = 'discovery',
  ASSESSMENT = 'assessment',
  PLANNING = 'planning',
  PILOT = 'pilot',
  DEPLOYMENT = 'deployment',
  MONITORING = 'monitoring',
}

// Zod Schemas
export const PQCAssessmentInputSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  cryptoAlgorithmsInUse: z.array(z.string()).min(1, 'At least one algorithm required'),
  sector: z.nativeEnum(Sector),
  dataSensitivityLevel: z.nativeEnum(DataSensitivityLevel),
  organizationSize: z.enum(['small', 'medium', 'large', 'enterprise']).optional(),
  currentInvestmentInCrypto: z.number().nonnegative().optional(),
});

export const CryptoAuditInputSchema = z.object({
  algorithms: z.array(
    z.object({
      name: z.string(),
      keySize: z.number().positive(),
      protocol: z.string().optional(),
      usageContext: z.string().optional(),
    })
  ).min(1, 'At least one algorithm required'),
  detailedAnalysis: z.boolean().default(false),
});

export const MigrationPlanInputSchema = z.object({
  organizationSize: z.enum(['small', 'medium', 'large', 'enterprise']),
  sector: z.nativeEnum(Sector),
  cryptoInventory: z.array(z.string()).min(1),
  complianceRequirements: z.array(z.enum(['NIST', 'White House', 'CNSA', 'EU_CRA'])).optional(),
  budget: z.number().nonnegative().optional(),
  timeline: z.enum(['urgent', 'high', 'medium', 'flexible']).optional(),
});

export const ThreatModelInputSchema = z.object({
  dataType: z.string(),
  storageDuration: z.enum(['short_term', 'medium_term', 'long_term', 'indefinite']),
  adversaryCapability: z.enum(['theoretical', 'advanced', 'state_level']),
  includeRiskAssessment: z.boolean().default(true),
});

export const ComplianceCheckInputSchema = z.object({
  sector: z.nativeEnum(Sector),
  jurisdiction: z.nativeEnum(Jurisdiction),
  currentImplementations: z.array(z.string()).optional(),
});

export const AlgorithmRecommendationInputSchema = z.object({
  useCase: z.nativeEnum(PQCAlgorithmType),
  performanceRequirements: z.enum(['low_latency', 'balanced', 'maximum_security']).optional(),
  platformConstraints: z.array(z.enum(['embedded', 'mobile', 'server', 'iot'])).optional(),
  quantumSecurityLevel: z.enum(['128_bit', '192_bit', '256_bit']).optional(),
});

// Response Types
export interface PQCAssessmentResult {
  organizationName: string;
  readinessScore: number; // 0-100
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  vulnerableAlgorithms: VulnerableAlgorithm[];
  nistRecommendations: NistRecommendation[];
  estimatedMigrationTimeline: {
    discovery: number; // months
    assessment: number;
    planning: number;
    implementation: number;
    total: number;
  };
  costRange: {
    low: number;
    high: number;
    currency: string;
  };
  keyFindings: string[];
  nextSteps: string[];
}

export interface VulnerableAlgorithm {
  name: string;
  quantumVulnerability: 'critical' | 'high' | 'medium' | 'low';
  affectedServices: string[];
  decryptionTimeline: string;
  migrationPriority: number; // 1 (highest) to 10
}

export interface NistRecommendation {
  algorithm: string;
  category: 'key_exchange' | 'digital_signature' | 'encryption';
  keySize: number;
  securityLevel: number; // 1-5
  adoptionStatus: 'finalist' | 'alternative' | 'emerging';
  expectedStandardization: string;
}

export interface CryptoAuditResult {
  auditDate: string;
  algorithmAssessments: AlgorithmAssessment[];
  overallVulnerability: 'critical' | 'high' | 'medium' | 'low';
  quantumThreatTimeline: {
    largeScaleQC: number; // years until viable
    cryptanalysis: number;
    harvestNowDecryptLater: number;
  };
  migrationPriorityRanking: PriorityRanking[];
  totalAffectedSystems: number;
}

export interface AlgorithmAssessment {
  algorithm: string;
  keySize: number;
  quantumResistance: boolean;
  vulnerabilityLevel: 'critical' | 'high' | 'medium' | 'low';
  migrationPriority: number;
  alternativeAlgorithms: string[];
  estimatedDeprecationDate: string;
}

export interface PriorityRanking {
  algorithm: string;
  priority: number; // 1-5, where 1 is highest
  reason: string;
}

export interface MigrationPlanResult {
  organizationProfile: {
    size: string;
    sector: string;
    estimatedCryptoAssets: number;
  };
  phasedMigrationPlan: MigrationPhaseDetail[];
  hybridApproach: HybridApproachRecommendation;
  resourceRequirements: ResourceRequirements;
  complianceTimeline: ComplianceTimeline;
  riskMitigation: RiskMitigationStrategy[];
  estimatedTotalCost: {
    low: number;
    high: number;
    currency: string;
  };
}

export interface MigrationPhaseDetail {
  phase: MigrationPhase;
  duration: number; // months
  keyActivities: string[];
  resources: string[];
  successMetrics: string[];
  estimatedCost: number;
  startDate: string;
  endDate: string;
}

export interface HybridApproachRecommendation {
  strategy: string;
  classicalAlgorithms: string[];
  pqcAlgorithms: string[];
  transitionPeriod: number; // months
  justification: string;
}

export interface ResourceRequirements {
  personnel: {
    cryptographyExperts: number;
    systemEngineers: number;
    projectManagers: number;
  };
  technology: {
    developmentTools: string[];
    testingFrameworks: string[];
    deploymentTools: string[];
  };
  training: {
    hoursPerEmployee: number;
    specializations: string[];
  };
}

export interface ComplianceTimeline {
  nistSP800_208: {
    deadline: string;
    status: string;
  };
  whiteHouseOMB_M23_02: {
    deadline: string;
    status: string;
  };
  cnsa2_0: {
    deadline: string;
    status: string;
  };
  euCyberResilienceAct: {
    deadline: string;
    status: string;
  };
}

export interface RiskMitigationStrategy {
  risk: string;
  mitigation: string;
  responsibleTeam: string;
  completionDate: string;
}

export interface ThreatModelResult {
  dataType: string;
  harvestNowDecryptLater: {
    risk: 'critical' | 'high' | 'medium' | 'low';
    details: string;
    timeframeOfVulnerability: string;
  };
  quantumComputingTimeline: {
    largeScaleQCYears: number;
    harvestableDataWindow: string;
    recommendedProtectionDate: string;
  };
  countermeasures: Countermeasure[];
  complianceRequirements: string[];
}

export interface Countermeasure {
  measure: string;
  implementationEffort: 'low' | 'medium' | 'high';
  effectiveness: 'high' | 'medium' | 'low';
  costEstimate: {
    amount: number;
    currency: string;
  };
  timeline: string;
}

export interface ComplianceCheckResult {
  sector: string;
  jurisdiction: string;
  complianceStatus: {
    nistSP800_208: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
    whiteHouseOMB_M23_02: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
    cnsa2_0: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
    euCyberResilienceAct: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  };
  recommendations: ComplianceRecommendation[];
  requiredActions: RequiredAction[];
  deadline: string | null;
}

export interface ComplianceRecommendation {
  requirement: string;
  currentState: string;
  recommendedState: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedEffort: string;
}

export interface RequiredAction {
  action: string;
  timeline: string;
  responsibility: string;
  successCriteria: string[];
}

export interface AlgorithmRecommendationResult {
  useCase: string;
  recommendedAlgorithms: RecommendedAlgorithm[];
  performanceBenchmarks: PerformanceBenchmark[];
  implementationLibraries: ImplementationLibrary[];
  hybridApproach: string;
  migrationPath: string[];
}

export interface RecommendedAlgorithm {
  name: string;
  category: string;
  securityLevel: number;
  keySize: number;
  maturity: 'standardized' | 'finalist' | 'alternative' | 'research';
  pros: string[];
  cons: string[];
  suitableFor: string[];
}

export interface PerformanceBenchmark {
  algorithm: string;
  keyGeneration: string;
  encryption: string;
  decryption: string;
  signatureGeneration: string;
  signatureVerification: string;
  keySize: string;
  signatureSize: string;
}

export interface ImplementationLibrary {
  name: string;
  language: string;
  algorithms: string[];
  maturity: 'production' | 'stable' | 'beta' | 'experimental';
  licenseType: string;
  sourceUrl: string;
}

// Database of algorithms
export interface AlgorithmDatabase {
  [key: string]: AlgorithmInfo;
}

export interface AlgorithmInfo {
  name: string;
  category: PQCAlgorithmType;
  nistStatus: string;
  keySize: number;
  quantumSecure: boolean;
  vulnerabilityTimeline: number; // years until vulnerable
  replacementAlgorithm?: string;
  description: string;
}

export const NIST_APPROVED_ALGORITHMS: AlgorithmDatabase = {
  'CRYSTALS-Kyber': {
    name: 'CRYSTALS-Kyber',
    category: PQCAlgorithmType.KEY_EXCHANGE,
    nistStatus: 'FIPS 203 (Standardized)',
    keySize: 1024,
    quantumSecure: true,
    vulnerabilityTimeline: Infinity,
    description: 'Lattice-based key encapsulation mechanism',
  },
  'CRYSTALS-Dilithium': {
    name: 'CRYSTALS-Dilithium',
    category: PQCAlgorithmType.DIGITAL_SIGNATURE,
    nistStatus: 'FIPS 204 (Standardized)',
    keySize: 2544,
    quantumSecure: true,
    vulnerabilityTimeline: Infinity,
    description: 'Lattice-based digital signature scheme',
  },
  'SPHINCS+': {
    name: 'SPHINCS+',
    category: PQCAlgorithmType.DIGITAL_SIGNATURE,
    nistStatus: 'FIPS 205 (Standardized)',
    keySize: 32,
    quantumSecure: true,
    vulnerabilityTimeline: Infinity,
    description: 'Hash-based digital signature scheme',
  },
  'FALCON': {
    name: 'FALCON',
    category: PQCAlgorithmType.DIGITAL_SIGNATURE,
    nistStatus: 'FIPS 206 (Standardized)',
    keySize: 512,
    quantumSecure: true,
    vulnerabilityTimeline: Infinity,
    description: 'Lattice-based signature scheme',
  },
  'ML-KEM': {
    name: 'ML-KEM',
    category: PQCAlgorithmType.KEY_EXCHANGE,
    nistStatus: 'FIPS 203 (Standardized)',
    keySize: 1024,
    quantumSecure: true,
    vulnerabilityTimeline: Infinity,
    description: 'Module-Lattice-Based Key-Encapsulation Mechanism',
  },
  'ML-DSA': {
    name: 'ML-DSA',
    category: PQCAlgorithmType.DIGITAL_SIGNATURE,
    nistStatus: 'FIPS 204 (Standardized)',
    keySize: 2544,
    quantumSecure: true,
    vulnerabilityTimeline: Infinity,
    description: 'Module-Lattice-Based Digital Signature Algorithm',
  },
  'SLH-DSA': {
    name: 'SLH-DSA',
    category: PQCAlgorithmType.DIGITAL_SIGNATURE,
    nistStatus: 'FIPS 205 (Standardized)',
    keySize: 32,
    quantumSecure: true,
    vulnerabilityTimeline: Infinity,
    description: 'Stateless Hash-Based Digital Signature Algorithm',
  },
  'RSA-2048': {
    name: 'RSA-2048',
    category: PQCAlgorithmType.DIGITAL_SIGNATURE,
    nistStatus: 'Deprecated',
    keySize: 2048,
    quantumSecure: false,
    vulnerabilityTimeline: 15,
    replacementAlgorithm: 'CRYSTALS-Dilithium',
    description: 'Classical RSA - quantum vulnerable',
  },
  'ECDSA-256': {
    name: 'ECDSA-256',
    category: PQCAlgorithmType.DIGITAL_SIGNATURE,
    nistStatus: 'Deprecated',
    keySize: 256,
    quantumSecure: false,
    vulnerabilityTimeline: 15,
    replacementAlgorithm: 'CRYSTALS-Dilithium',
    description: 'Classical ECC - quantum vulnerable',
  },
  'DES': {
    name: 'DES',
    category: PQCAlgorithmType.ENCRYPTION,
    nistStatus: 'Withdrawn',
    keySize: 56,
    quantumSecure: false,
    vulnerabilityTimeline: 5,
    replacementAlgorithm: 'AES-256',
    description: 'Legacy encryption - deprecated',
  },
};
