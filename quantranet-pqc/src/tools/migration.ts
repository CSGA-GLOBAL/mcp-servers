/**
 * migration.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  MigrationPlanInputSchema,
  MigrationPlanResult,
  MigrationPhaseDetail,
  HybridApproachRecommendation,
  ResourceRequirements,
  ComplianceTimeline,
  RiskMitigationStrategy,
  MigrationPhase,
  Sector,
} from '../types';

export function generateMigrationPlan(input: unknown): MigrationPlanResult {
  const validatedInput = MigrationPlanInputSchema.parse(input);

  const phases = generateMigrationPhases(
    validatedInput.organizationSize,
    validatedInput.sector,
    validatedInput.cryptoInventory.length,
    validatedInput.timeline || 'medium'
  );

  const hybridApproach = generateHybridApproach(validatedInput.sector);

  const resourceReqs = calculateResourceRequirements(
    validatedInput.organizationSize,
    validatedInput.sector,
    phases
  );

  const complianceTimeline = generateComplianceTimeline(
    validatedInput.complianceRequirements || []
  );

  const riskStrategies = generateRiskMitigationStrategies(validatedInput.sector);

  const totalCost = calculateTotalCost(validatedInput.organizationSize, phases);

  return {
    organizationProfile: {
      size: validatedInput.organizationSize,
      sector: validatedInput.sector,
      estimatedCryptoAssets: validatedInput.cryptoInventory.length,
    },
    phasedMigrationPlan: phases,
    hybridApproach,
    resourceRequirements: resourceReqs,
    complianceTimeline,
    riskMitigation: riskStrategies,
    estimatedTotalCost: totalCost,
  };
}

function generateMigrationPhases(
  orgSize: string,
  _sector: Sector,
  _cryptoAssetCount: number,
  timeline: string
): MigrationPhaseDetail[] {
  const baseTimelines: { [key: string]: { [key: string]: number } } = {
    urgent: {
      discovery: 2,
      assessment: 2,
      planning: 1,
      pilot: 2,
      deployment: 3,
      monitoring: 2,
    },
    high: {
      discovery: 3,
      assessment: 3,
      planning: 2,
      pilot: 3,
      deployment: 6,
      monitoring: 3,
    },
    medium: {
      discovery: 3,
      assessment: 4,
      planning: 3,
      pilot: 4,
      deployment: 9,
      monitoring: 3,
    },
    flexible: {
      discovery: 4,
      assessment: 5,
      planning: 4,
      pilot: 6,
      deployment: 12,
      monitoring: 4,
    },
  };

  const sizeMultiplier: { [key: string]: number } = {
    small: 0.8,
    medium: 1,
    large: 1.5,
    enterprise: 2,
  };

  const baseTimeline = baseTimelines[timeline] || baseTimelines.medium;
  const multiplier = sizeMultiplier[orgSize] || 1;

  const startDate = new Date();
  let currentDate = new Date(startDate);

  const phases: MigrationPhaseDetail[] = [
    {
      phase: MigrationPhase.DISCOVERY,
      duration: Math.ceil(baseTimeline.discovery * multiplier),
      keyActivities: [
        'Complete cryptographic inventory across all systems',
        'Map crypto dependencies and data flows',
        'Identify legacy systems and custom implementations',
        'Document quantum threat impact per system',
      ],
      resources: ['Cryptography experts', 'System administrators', 'Security architects'],
      successMetrics: [
        '100% crypto inventory completion',
        'All systems documented',
        'Dependencies mapped',
      ],
      estimatedCost: 150000,
      startDate: currentDate.toISOString().split('T')[0],
      endDate: new Date(currentDate.getTime() + Math.ceil(baseTimeline.discovery * multiplier) * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    },
  ];

  currentDate = new Date(
    currentDate.getTime() + Math.ceil(baseTimeline.discovery * multiplier) * 30 * 24 * 60 * 60 * 1000
  );

  phases.push({
    phase: MigrationPhase.ASSESSMENT,
    duration: Math.ceil(baseTimeline.assessment * multiplier),
    keyActivities: [
      'Quantum threat assessment for each algorithm',
      'Compliance gap analysis',
      'Performance testing of PQC alternatives',
      'Business impact analysis',
    ],
    resources: [
      'PQC specialists',
      'Compliance officers',
      'Performance engineers',
      'Security consultants',
    ],
    successMetrics: [
      'Threat levels assigned to all algorithms',
      'Compliance gaps identified',
      'PQC performance data available',
    ],
    estimatedCost: 250000,
    startDate: currentDate.toISOString().split('T')[0],
    endDate: new Date(currentDate.getTime() + Math.ceil(baseTimeline.assessment * multiplier) * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });

  currentDate = new Date(
    currentDate.getTime() + Math.ceil(baseTimeline.assessment * multiplier) * 30 * 24 * 60 * 60 * 1000
  );

  phases.push({
    phase: MigrationPhase.PLANNING,
    duration: Math.ceil(baseTimeline.planning * multiplier),
    keyActivities: [
      'Create detailed PQC migration roadmap',
      'Develop hybrid cryptography strategy',
      'Establish governance and oversight',
      'Plan resource allocation',
    ],
    resources: ['Project managers', 'Technical architects', 'Governance specialists'],
    successMetrics: [
      'Migration roadmap approved',
      'Budget allocated',
      'Team assigned',
      'Governance structure established',
    ],
    estimatedCost: 120000,
    startDate: currentDate.toISOString().split('T')[0],
    endDate: new Date(currentDate.getTime() + Math.ceil(baseTimeline.planning * multiplier) * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });

  currentDate = new Date(
    currentDate.getTime() + Math.ceil(baseTimeline.planning * multiplier) * 30 * 24 * 60 * 60 * 1000
  );

  phases.push({
    phase: MigrationPhase.PILOT,
    duration: Math.ceil(baseTimeline.pilot * multiplier),
    keyActivities: [
      'Deploy PQC in non-critical systems',
      'Test hybrid cryptography approach',
      'Validate performance and compatibility',
      'Gather lessons learned',
    ],
    resources: [
      'Development team',
      'QA engineers',
      'Infrastructure team',
      'Security team',
    ],
    successMetrics: [
      'Pilot deployment complete',
      'Performance within acceptable range',
      'No critical issues found',
      'Lessons documented',
    ],
    estimatedCost: 350000,
    startDate: currentDate.toISOString().split('T')[0],
    endDate: new Date(currentDate.getTime() + Math.ceil(baseTimeline.pilot * multiplier) * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });

  currentDate = new Date(
    currentDate.getTime() + Math.ceil(baseTimeline.pilot * multiplier) * 30 * 24 * 60 * 60 * 1000
  );

  phases.push({
    phase: MigrationPhase.DEPLOYMENT,
    duration: Math.ceil(baseTimeline.deployment * multiplier),
    keyActivities: [
      'Phased rollout to production systems',
      'Monitoring and optimization',
      'Incident response preparation',
      'Hybrid crypto maintenance',
    ],
    resources: [
      'Operations team',
      'Infrastructure engineers',
      'Security operations',
      'Support team',
    ],
    successMetrics: [
      'Full production deployment',
      'Zero crypto-related incidents',
      'Performance SLAs met',
      'Compliance achieved',
    ],
    estimatedCost: 800000,
    startDate: currentDate.toISOString().split('T')[0],
    endDate: new Date(currentDate.getTime() + Math.ceil(baseTimeline.deployment * multiplier) * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });

  currentDate = new Date(
    currentDate.getTime() + Math.ceil(baseTimeline.deployment * multiplier) * 30 * 24 * 60 * 60 * 1000
  );

  phases.push({
    phase: MigrationPhase.MONITORING,
    duration: Math.ceil(baseTimeline.monitoring * multiplier),
    keyActivities: [
      'Continuous PQC algorithm performance monitoring',
      'Crypto agility capability maintenance',
      'Security update management',
      'Compliance auditing',
    ],
    resources: ['Security team', 'Operations team', 'Compliance team'],
    successMetrics: [
      'Continuous monitoring established',
      'Metrics within target ranges',
      'Compliance maintained',
      'Incident response validated',
    ],
    estimatedCost: 200000,
    startDate: currentDate.toISOString().split('T')[0],
    endDate: new Date(currentDate.getTime() + Math.ceil(baseTimeline.monitoring * multiplier) * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });

  return phases;
}

function generateHybridApproach(sector: Sector): HybridApproachRecommendation {
  const transitionPeriods: { [key in Sector]: number } = {
    [Sector.FINANCE]: 18,
    [Sector.HEALTHCARE]: 24,
    [Sector.DEFENSE]: 12,
    [Sector.ENERGY]: 20,
    [Sector.TELECOMMUNICATIONS]: 18,
    [Sector.GOVERNMENT]: 18,
    [Sector.TECHNOLOGY]: 24,
    [Sector.MANUFACTURING]: 24,
    [Sector.EDUCATION]: 30,
    [Sector.OTHER]: 24,
  };

  return {
    strategy:
      'Parallel classical + PQC implementation to ensure security against both classical and quantum threats during transition period',
    classicalAlgorithms: ['RSA-2048 (key exchange)', 'AES-256 (encryption)', 'HMAC-SHA-256 (authentication)'],
    pqcAlgorithms: [
      'ML-KEM/CRYSTALS-Kyber (key exchange)',
      'ML-DSA/CRYSTALS-Dilithium (signatures)',
      'SLH-DSA/SPHINCS+ (backup signatures)',
    ],
    transitionPeriod: transitionPeriods[sector],
    justification:
      'Hybrid approach provides protection against both classical and quantum adversaries while maintaining compatibility during standards transition period. Full PQC transition will occur as algorithms mature and deployment patterns stabilize.',
  };
}

function calculateResourceRequirements(
  orgSize: string,
  _sector: Sector,
  _phases: MigrationPhaseDetail[]
): ResourceRequirements {
  const personnelRequirements: { [key: string]: { experts: number; engineers: number; managers: number } } = {
    small: { experts: 1, engineers: 2, managers: 1 },
    medium: { experts: 2, engineers: 4, managers: 2 },
    large: { experts: 4, engineers: 8, managers: 3 },
    enterprise: { experts: 8, engineers: 16, managers: 5 },
  };

  const reqs = personnelRequirements[orgSize] || personnelRequirements.medium;

  return {
    personnel: {
      cryptographyExperts: reqs.experts,
      systemEngineers: reqs.engineers,
      projectManagers: reqs.managers,
    },
    technology: {
      developmentTools: [
        'NIST PQC reference implementations',
        'Hybrid crypto library (liboqs)',
        'Performance testing frameworks',
      ],
      testingFrameworks: [
        'Cryptographic test vectors',
        'Algorithm benchmark suite',
        'Compatibility testing tools',
      ],
      deploymentTools: [
        'Configuration management system',
        'Continuous integration/deployment',
        'Monitoring and alerting platform',
      ],
    },
    training: {
      hoursPerEmployee: 16,
      specializations: [
        'Post-quantum cryptography fundamentals',
        'Hybrid crypto implementation',
        'Key management for PQC',
        'Compliance and standards',
      ],
    },
  };
}

function generateComplianceTimeline(
  _requirements: string[]
): ComplianceTimeline {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 3);

  return {
    nistSP800_208: {
      deadline: '2025-12-31',
      status: 'Guideline available - early implementation recommended',
    },
    whiteHouseOMB_M23_02: {
      deadline: '2030-12-31',
      status: 'Mandate issued - agencies must transition by deadline',
    },
    cnsa2_0: {
      deadline: '2028-12-31',
      status: 'National security requirement - accelerated timeline',
    },
    euCyberResilienceAct: {
      deadline: '2027-12-31',
      status: 'EU regulatory requirement - enforcement pending',
    },
  };
}

function generateRiskMitigationStrategies(_sector: Sector): RiskMitigationStrategy[] {
  return [
    {
      risk: 'Algorithm standardization delays',
      mitigation: 'Implement using NIST-approved interim standards; maintain crypto agility',
      responsibleTeam: 'Architecture Team',
      completionDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      risk: 'Legacy system incompatibility',
      mitigation: 'Create compatibility layer; plan phased retirement of unsupported systems',
      responsibleTeam: 'Infrastructure Team',
      completionDate: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      risk: 'Performance degradation',
      mitigation: 'Benchmark PQC algorithms; optimize implementations; upgrade hardware if needed',
      responsibleTeam: 'Performance Team',
      completionDate: new Date(Date.now() + 9 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      risk: 'Staff expertise gaps',
      mitigation: 'Hire PQC specialists; conduct comprehensive training program',
      responsibleTeam: 'HR & Training',
      completionDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      risk: 'Supply chain security',
      mitigation: 'Audit crypto library vendors; verify implementation correctness',
      responsibleTeam: 'Security Team',
      completionDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  ];
}

function calculateTotalCost(
  _orgSize: string,
  phases: MigrationPhaseDetail[]
): {
  low: number;
  high: number;
  currency: string;
} {
  const phaseCosts = phases.reduce((sum, phase) => sum + phase.estimatedCost, 0);
  const contingency = phaseCosts * 0.2; // 20% contingency

  return {
    low: Math.ceil(phaseCosts * 0.9),
    high: Math.ceil(phaseCosts + contingency),
    currency: 'USD',
  };
}
