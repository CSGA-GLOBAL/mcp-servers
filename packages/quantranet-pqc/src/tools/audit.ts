/**
 * audit.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  CryptoAuditInputSchema,
  CryptoAuditResult,
  AlgorithmAssessment,
  PriorityRanking,
  NIST_APPROVED_ALGORITHMS,
} from '../types';

export function performCryptoAudit(input: unknown): CryptoAuditResult {
  const validatedInput = CryptoAuditInputSchema.parse(input);

  // Assess each algorithm
  const assessments = validatedInput.algorithms.map((algo) =>
    assessAlgorithm(algo.name, algo.keySize, algo.protocol, algo.usageContext)
  );

  // Calculate overall vulnerability
  const criticalCount = assessments.filter((a) => a.vulnerabilityLevel === 'critical').length;
  const highCount = assessments.filter((a) => a.vulnerabilityLevel === 'high').length;

  const overallVulnerability =
    criticalCount > 0
      ? ('critical' as const)
      : highCount > 0
        ? ('high' as const)
        : assessments.some((a) => a.vulnerabilityLevel === 'medium')
          ? ('medium' as const)
          : ('low' as const);

  // Generate priority ranking
  const priorityRanking = generatePriorityRanking(assessments);

  // Estimate quantum threat timeline
  const quantumTimeline = estimateQuantumThreatTimeline();

  return {
    auditDate: new Date().toISOString(),
    algorithmAssessments: assessments,
    overallVulnerability,
    quantumThreatTimeline: quantumTimeline,
    migrationPriorityRanking: priorityRanking,
    totalAffectedSystems: assessments.length,
  };
}

function assessAlgorithm(
  algorithm: string,
  keySize: number,
  _protocol?: string,
  _usageContext?: string
): AlgorithmAssessment {
  const algoInfo = NIST_APPROVED_ALGORITHMS[algorithm];

  // Determine vulnerability level
  let vulnerabilityLevel: 'critical' | 'high' | 'medium' | 'low' = 'low';
  let estimatedDeprecation = '2040+';

  if (!algoInfo || !algoInfo.quantumSecure) {
    // Classical (quantum-vulnerable) algorithms
    if (algorithm.includes('DES') || algorithm.includes('MD5') || algorithm.includes('SHA-1')) {
      vulnerabilityLevel = 'critical';
      estimatedDeprecation = new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
    } else if (
      algorithm.includes('RSA') ||
      algorithm.includes('ECDSA') ||
      algorithm.includes('DSA')
    ) {
      vulnerabilityLevel = 'high';
      estimatedDeprecation = new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
    } else {
      vulnerabilityLevel = 'medium';
      estimatedDeprecation = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
    }

    // Increase severity for small key sizes
    if (keySize < 2048) {
      vulnerabilityLevel = 'critical';
    }
  } else {
    // PQC algorithms are secure
    vulnerabilityLevel = 'low';
    estimatedDeprecation = '2080+';
  }

  return {
    algorithm,
    keySize,
    quantumResistance: algoInfo?.quantumSecure || false,
    vulnerabilityLevel,
    migrationPriority: calculateMigrationPriority(algorithm, vulnerabilityLevel),
    alternativeAlgorithms: getAlternatives(algorithm),
    estimatedDeprecationDate: estimatedDeprecation,
  };
}

function calculateMigrationPriority(
  algorithm: string,
  vulnerabilityLevel: string
): number {
  const basePriority: { [key: string]: number } = {
    critical: 1,
    high: 2,
    medium: 3,
    low: 4,
  };

  let priority = basePriority[vulnerabilityLevel] || 4;

  // Boost priority for extremely vulnerable algorithms
  if (algorithm.includes('DES') || algorithm.includes('MD5')) {
    priority = 1;
  } else if (algorithm.includes('SHA-1') || (algorithm.includes('RSA') && !algorithm.includes('4096'))) {
    priority = Math.min(priority, 2);
  }

  return priority;
}

function getAlternatives(algorithm: string): string[] {
  const alternativeMap: { [key: string]: string[] } = {
    'RSA-2048': ['ML-DSA', 'CRYSTALS-Dilithium', 'FALCON'],
    'RSA-3072': ['ML-DSA', 'CRYSTALS-Dilithium', 'FALCON'],
    'RSA-4096': ['ML-DSA', 'CRYSTALS-Dilithium', 'FALCON'],
    'ECDSA-256': ['ML-DSA', 'CRYSTALS-Dilithium', 'SLH-DSA'],
    'ECDSA-384': ['ML-DSA', 'CRYSTALS-Dilithium', 'FALCON'],
    'ECDSA-521': ['FALCON', 'ML-DSA'],
    'DES': ['AES-256', 'ChaCha20'],
    'AES-128': ['AES-256', 'ChaCha20'],
    'AES-192': ['AES-256'],
    'AES-256': ['ChaCha20 (alternative)', 'AES-256 (keep)'],
    'SHA-1': ['SHA-256', 'SHA-384', 'SPHINCS+'],
    'SHA-256': ['SHA-256 (keep)', 'SHA-384 (upgrade)'],
    'MD5': ['SHA-256', 'BLAKE2'],
  };

  return alternativeMap[algorithm] || ['Contact QuantraNet for custom recommendations'];
}

function generatePriorityRanking(assessments: AlgorithmAssessment[]): PriorityRanking[] {
  return assessments
    .sort((a, b) => a.migrationPriority - b.migrationPriority)
    .map((assessment, index) => ({
      algorithm: assessment.algorithm,
      priority: index + 1,
      reason: getReasonForPriority(assessment),
    }));
}

function getReasonForPriority(assessment: AlgorithmAssessment): string {
  if (assessment.vulnerabilityLevel === 'critical') {
    return `Critical quantum vulnerability - immediate migration required within 6-12 months`;
  }
  if (assessment.vulnerabilityLevel === 'high') {
    return `High quantum vulnerability - migrate within 12-24 months as part of hybrid approach`;
  }
  if (assessment.vulnerabilityLevel === 'medium') {
    return `Medium quantum threat - include in standard 2-3 year migration timeline`;
  }
  return `Low quantum threat - monitor and migrate during scheduled upgrades`;
}

function estimateQuantumThreatTimeline(): {
  largeScaleQC: number;
  cryptanalysis: number;
  harvestNowDecryptLater: number;
} {
  return {
    largeScaleQC: 15, // Years until cryptographically relevant quantum computer (CRQC)
    cryptanalysis: 20, // Years until quantum cryptanalysis becomes practical
    harvestNowDecryptLater: 5, // Years until harvest-now-decrypt-later becomes critical threat
  };
}

export function generateDetailedAuditReport(
  auditResult: CryptoAuditResult
): string {
  let report = `
QUANTRANET PQC CRYPTOGRAPHIC AUDIT REPORT
==========================================

Audit Date: ${auditResult.auditDate}
Total Algorithms Assessed: ${auditResult.totalAffectedSystems}
Overall Vulnerability Level: ${auditResult.overallVulnerability.toUpperCase()}

QUANTUM THREAT TIMELINE:
- Cryptographically Relevant Quantum Computer (CRQC): ${auditResult.quantumThreatTimeline.largeScaleQC} years
- Practical Cryptanalysis Timeline: ${auditResult.quantumThreatTimeline.cryptanalysis} years
- Harvest Now, Decrypt Later Risk: ACTIVE (${auditResult.quantumThreatTimeline.harvestNowDecryptLater} years)

ALGORITHM ASSESSMENTS:
${auditResult.algorithmAssessments
  .map(
    (assessment) => `
  ${assessment.algorithm}:
  - Quantum Resistance: ${assessment.quantumResistance ? 'YES' : 'NO'}
  - Vulnerability Level: ${assessment.vulnerabilityLevel.toUpperCase()}
  - Key Size: ${assessment.keySize} bits
  - Migration Priority: ${assessment.migrationPriority}/5
  - Estimated Deprecation: ${assessment.estimatedDeprecationDate}
  - Recommended Replacements: ${assessment.alternativeAlgorithms.join(', ')}
`
  )
  .join('')}

MIGRATION PRIORITY RANKING:
${auditResult.migrationPriorityRanking
  .map((ranking) => `  ${ranking.priority}. ${ranking.algorithm} - ${ranking.reason}`)
  .join('\n')}

RECOMMENDATIONS:
1. Implement hybrid cryptography approach immediately
2. Prioritize migration of critical algorithms (Priority 1-2)
3. Establish PQC transition governance framework
4. Begin pilot deployments with NIST-standardized algorithms
5. Engage stakeholders in compliance requirement planning

For detailed implementation guidance, contact QuantraNet's expert team.
`;

  return report;
}
