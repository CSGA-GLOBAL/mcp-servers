/**
 * assessment.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  PQCAssessmentInputSchema,
  PQCAssessmentResult,
  VulnerableAlgorithm,
  NistRecommendation,
  NIST_APPROVED_ALGORITHMS,
  Sector,
  DataSensitivityLevel,
} from '../types';

export function assessPQCReadiness(input: unknown): PQCAssessmentResult {
  const validatedInput = PQCAssessmentInputSchema.parse(input);

  // Analyze current algorithms
  const vulnerableAlgos = analyzeAlgorithms(validatedInput.cryptoAlgorithmsInUse);
  const vulnAlgorithmCount = vulnerableAlgos.filter(
    (algo) => algo.quantumVulnerability === 'critical' || algo.quantumVulnerability === 'high'
  ).length;

  // Calculate readiness score
  const baseScore = 100;
  const vulnPenalty = vulnAlgorithmCount * 20;
  const sensitivityMultiplier = getSensitivityMultiplier(validatedInput.dataSensitivityLevel);
  const sectorMultiplier = getSectorMultiplier(validatedInput.sector);

  let readinessScore = Math.max(0, baseScore - vulnPenalty);
  readinessScore = Math.min(100, readinessScore * (1 - sensitivityMultiplier) * (1 + sectorMultiplier));

  // Determine risk level
  const riskLevel =
    readinessScore < 20
      ? ('critical' as const)
      : readinessScore < 40
        ? ('high' as const)
        : readinessScore < 70
          ? ('medium' as const)
          : ('low' as const);

  // Get NIST recommendations
  const nistRecs = getNistRecommendations(validatedInput.cryptoAlgorithmsInUse);

  // Estimate timeline
  const timeline = estimateMigrationTimeline(
    validatedInput.organizationSize || 'medium',
    validatedInput.cryptoAlgorithmsInUse.length
  );

  // Estimate costs
  const costs = estimateCosts(
    validatedInput.organizationSize || 'medium',
    validatedInput.sector,
    validatedInput.cryptoAlgorithmsInUse.length
  );

  return {
    organizationName: validatedInput.organizationName,
    readinessScore: Math.round(readinessScore),
    riskLevel,
    vulnerableAlgorithms: vulnerableAlgos,
    nistRecommendations: nistRecs,
    estimatedMigrationTimeline: timeline,
    costRange: costs,
    keyFindings: generateKeyFindings(
      vulnerableAlgos,
      readinessScore,
      validatedInput.dataSensitivityLevel
    ),
    nextSteps: generateNextSteps(riskLevel, validatedInput.sector),
  };
}

function analyzeAlgorithms(algorithms: string[]): VulnerableAlgorithm[] {
  return algorithms
    .map((algo) => {
      const algoInfo = NIST_APPROVED_ALGORITHMS[algo] || {
        name: algo,
        quantumSecure: false,
        vulnerabilityTimeline: 15,
        category: 'unknown',
      };

      let quantumVulnerability: 'critical' | 'high' | 'medium' | 'low' = 'low';
      let timeline = '';

      if (!algoInfo.quantumSecure) {
        if (algoInfo.vulnerabilityTimeline <= 5) {
          quantumVulnerability = 'critical';
          timeline = '2-5 years (Harvest Now, Decrypt Later threat active)';
        } else if (algoInfo.vulnerabilityTimeline <= 10) {
          quantumVulnerability = 'high';
          timeline = '5-10 years (Moderate quantum threat)';
        } else {
          quantumVulnerability = 'medium';
          timeline = '10-20 years (Future quantum threat)';
        }
      } else {
        quantumVulnerability = 'low';
        timeline = 'Quantum-resistant';
      }

      return {
        name: algo,
        quantumVulnerability,
        affectedServices: getAffectedServices(algo),
        decryptionTimeline: timeline,
        migrationPriority: calculateMigrationPriority(algo),
      };
    })
    .filter((algo) => algo.quantumVulnerability !== 'low')
    .sort((a, b) => a.migrationPriority - b.migrationPriority);
}

function getAffectedServices(algorithm: string): string[] {
  const serviceMap: { [key: string]: string[] } = {
    'RSA-2048': ['TLS/SSL', 'Code Signing', 'Key Exchange'],
    'ECDSA-256': ['TLS/SSL', 'Digital Signatures', 'Authentication'],
    'DES': ['Legacy Data Encryption', 'File Encryption'],
    'AES-128': ['Data Encryption', 'TLS/SSL'],
    'SHA-1': ['Digital Signatures', 'Certificate Hashing'],
  };

  return serviceMap[algorithm] || ['General Cryptographic Operations'];
}

function calculateMigrationPriority(algorithm: string): number {
  const priorityMap: { [key: string]: number } = {
    'DES': 1,
    'SHA-1': 1,
    'RSA-2048': 2,
    'ECDSA-256': 2,
    'AES-128': 3,
    'MD5': 1,
  };

  return priorityMap[algorithm] || 4;
}

function getSensitivityMultiplier(level: DataSensitivityLevel): number {
  const multipliers: { [key in DataSensitivityLevel]: number } = {
    [DataSensitivityLevel.LOW]: 0.1,
    [DataSensitivityLevel.MEDIUM]: 0.25,
    [DataSensitivityLevel.HIGH]: 0.4,
    [DataSensitivityLevel.CRITICAL]: 0.6,
  };
  return multipliers[level];
}

function getSectorMultiplier(sector: Sector): number {
  const multipliers: { [key in Sector]: number } = {
    [Sector.FINANCE]: 0.15,
    [Sector.HEALTHCARE]: 0.12,
    [Sector.DEFENSE]: 0.2,
    [Sector.ENERGY]: 0.18,
    [Sector.TELECOMMUNICATIONS]: 0.14,
    [Sector.GOVERNMENT]: 0.16,
    [Sector.TECHNOLOGY]: 0.08,
    [Sector.MANUFACTURING]: 0.1,
    [Sector.EDUCATION]: 0.05,
    [Sector.OTHER]: 0.08,
  };
  return multipliers[sector];
}

function getNistRecommendations(algorithms: string[]): NistRecommendation[] {
  const recommendations: NistRecommendation[] = [];

  if (algorithms.some((a) => ['RSA-2048', 'ECDSA-256', 'DES', 'AES-128'].includes(a))) {
    recommendations.push({
      algorithm: 'CRYSTALS-Kyber (ML-KEM)',
      category: 'key_exchange',
      keySize: 1024,
      securityLevel: 3,
      adoptionStatus: 'finalist',
      expectedStandardization: 'FIPS 203 (Current)',
    });

    recommendations.push({
      algorithm: 'CRYSTALS-Dilithium (ML-DSA)',
      category: 'digital_signature',
      keySize: 2544,
      securityLevel: 3,
      adoptionStatus: 'finalist',
      expectedStandardization: 'FIPS 204 (Current)',
    });

    recommendations.push({
      algorithm: 'SPHINCS+ (SLH-DSA)',
      category: 'digital_signature',
      keySize: 32,
      securityLevel: 2,
      adoptionStatus: 'finalist',
      expectedStandardization: 'FIPS 205 (Current)',
    });

    recommendations.push({
      algorithm: 'FALCON',
      category: 'digital_signature',
      keySize: 512,
      securityLevel: 3,
      adoptionStatus: 'finalist',
      expectedStandardization: 'FIPS 206 (Current)',
    });
  }

  return recommendations;
}

function estimateMigrationTimeline(
  orgSize: string,
  algoCount: number
): {
  discovery: number;
  assessment: number;
  planning: number;
  implementation: number;
  total: number;
} {
  const sizeMultiplier: { [key: string]: number } = {
    small: 1,
    medium: 1.5,
    large: 2,
    enterprise: 3,
  };

  const multiplier = sizeMultiplier[orgSize] || 1.5;
  const complexity = Math.min(algoCount * 0.5, 3);

  return {
    discovery: Math.ceil(2 * multiplier),
    assessment: Math.ceil(3 * multiplier * complexity),
    planning: Math.ceil(2 * multiplier * complexity),
    implementation: Math.ceil(6 * multiplier * complexity),
    total: Math.ceil((2 + 3 * complexity + 2 * complexity + 6 * complexity) * multiplier),
  };
}

function estimateCosts(
  orgSize: string,
  sector: Sector,
  algoCount: number
): {
  low: number;
  high: number;
  currency: string;
} {
  const baseCosts: { [key: string]: { low: number; high: number } } = {
    small: { low: 50000, high: 150000 },
    medium: { low: 200000, high: 750000 },
    large: { low: 1000000, high: 5000000 },
    enterprise: { low: 5000000, high: 20000000 },
  };

  const sectorMultipliers: { [key in Sector]: number } = {
    [Sector.FINANCE]: 1.5,
    [Sector.HEALTHCARE]: 1.3,
    [Sector.DEFENSE]: 2.0,
    [Sector.ENERGY]: 1.4,
    [Sector.TELECOMMUNICATIONS]: 1.3,
    [Sector.GOVERNMENT]: 1.2,
    [Sector.TECHNOLOGY]: 0.9,
    [Sector.MANUFACTURING]: 1.1,
    [Sector.EDUCATION]: 0.8,
    [Sector.OTHER]: 1.0,
  };

  const baseCost = baseCosts[orgSize] || baseCosts.medium;
  const multiplier = sectorMultipliers[sector] * (1 + algoCount * 0.1);

  return {
    low: Math.ceil(baseCost.low * multiplier),
    high: Math.ceil(baseCost.high * multiplier),
    currency: 'USD',
  };
}

function generateKeyFindings(
  vulnerableAlgos: VulnerableAlgorithm[],
  readinessScore: number,
  sensitivity: DataSensitivityLevel
): string[] {
  const findings: string[] = [];

  if (vulnerableAlgos.length > 0) {
    findings.push(
      `${vulnerableAlgos.length} quantum-vulnerable algorithm(s) identified in your environment`
    );
  }

  if (readinessScore < 50) {
    findings.push('Organization requires immediate PQC migration planning');
  }

  if (sensitivity === DataSensitivityLevel.CRITICAL) {
    findings.push('Critical data sensitivity level demands urgent PQC transition');
    findings.push('Harvest Now, Decrypt Later threat is actively relevant for your data');
  }

  const criticalVuln = vulnerableAlgos.filter((a) => a.quantumVulnerability === 'critical');
  if (criticalVuln.length > 0) {
    findings.push(
      `Critical vulnerabilities in: ${criticalVuln.map((a) => a.name).join(', ')}`
    );
  }

  return findings;
}

function generateNextSteps(riskLevel: string, sector: Sector): string[] {
  const steps: string[] = [];

  steps.push('1. Schedule comprehensive cryptographic inventory audit');
  steps.push('2. Establish PQC transition steering committee');
  steps.push('3. Conduct detailed quantum threat assessment');

  if (riskLevel === 'critical' || riskLevel === 'high') {
    steps.push('4. Prioritize critical systems for immediate hybrid PQC deployment');
    steps.push('5. Develop incident response plan for post-quantum era');
  } else {
    steps.push('4. Begin PQC pilot program in non-critical systems');
  }

  steps.push('5. Engage NIST PQC standardization initiatives');
  steps.push('6. Budget for hybrid cryptography infrastructure');

  if (sector === Sector.DEFENSE || sector === Sector.GOVERNMENT) {
    steps.push('7. Align with CNSA 2.0 and White House OMB M-23-02 mandates');
  }

  return steps;
}
