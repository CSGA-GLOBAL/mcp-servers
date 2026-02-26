/**
 * threat.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  ThreatModelInputSchema,
  ThreatModelResult,
  Countermeasure,
} from '../types';

export function modelQuantumThreat(input: unknown): ThreatModelResult {
  const validatedInput = ThreatModelInputSchema.parse(input);

  const harvestNowDecryptLater = assessHarvestNowDecryptLater(
    validatedInput.dataType,
    validatedInput.storageDuration
  );

  const quantumTimeline = estimateQuantumTimeline(validatedInput.adversaryCapability);

  const countermeasures = generateCountermeasures(
    validatedInput.dataType,
    validatedInput.storageDuration,
    validatedInput.adversaryCapability
  );

  const complianceReqs = getComplianceRequirements(validatedInput.dataType);

  return {
    dataType: validatedInput.dataType,
    harvestNowDecryptLater,
    quantumComputingTimeline: quantumTimeline,
    countermeasures,
    complianceRequirements: complianceReqs,
  };
}

function assessHarvestNowDecryptLater(
  dataType: string,
  storageDuration: string
): {
  risk: 'critical' | 'high' | 'medium' | 'low';
  details: string;
  timeframeOfVulnerability: string;
} {
  // Determine if data has long-term confidentiality value
  const sensitiveDatatypes = [
    'financial_records',
    'health_records',
    'state_secrets',
    'military_intelligence',
    'intellectual_property',
    'personal_identification',
    'biometric_data',
    'trade_secrets',
  ];

  const isHighValue = sensitiveDatatypes.some((type) =>
    dataType.toLowerCase().includes(type.toLowerCase())
  );

  // Assess storage duration
  let riskLevel: 'critical' | 'high' | 'medium' | 'low' = 'low';
  let timeframe = '';

  if (storageDuration === 'indefinite' || storageDuration === 'long_term') {
    if (isHighValue) {
      riskLevel = 'critical';
      timeframe = 'Actively at risk now and for indefinite future';
    } else {
      riskLevel = 'high';
      timeframe = '10-20 years from encryption date';
    }
  } else if (storageDuration === 'medium_term') {
    if (isHighValue) {
      riskLevel = 'high';
      timeframe = '5-15 years from encryption date';
    } else {
      riskLevel = 'medium';
      timeframe = '15-25 years from encryption date';
    }
  } else if (storageDuration === 'short_term') {
    riskLevel = 'medium';
    timeframe = '20-30 years from encryption date';
  } else {
    riskLevel = 'low';
    timeframe = '30+ years from encryption date (minimal risk)';
  }

  return {
    risk: riskLevel,
    details: generateHNDLDetails(dataType, storageDuration, riskLevel),
    timeframeOfVulnerability: timeframe,
  };
}

function generateHNDLDetails(
  dataType: string,
  storageDuration: string,
  riskLevel: string
): string {
  let details = `The "Harvest Now, Decrypt Later" (HNDL) attack involves collecting and storing encrypted data today, `;
  details += `then decrypting it once quantum computers become available. `;

  if (riskLevel === 'critical') {
    details += `Your ${dataType} stored ${storageDuration} faces IMMEDIATE critical risk from HNDL attacks. `;
    details += `Adversaries may already be harvesting this data. Post-quantum cryptography deployment is URGENT.`;
  } else if (riskLevel === 'high') {
    details += `Your ${dataType} stored ${storageDuration} faces significant HNDL risk. `;
    details += `PQC migration should be prioritized within the next 2-3 years.`;
  } else if (riskLevel === 'medium') {
    details += `Your ${dataType} faces moderate HNDL risk. `;
    details += `PQC implementation should be planned as part of standard crypto modernization.`;
  } else {
    details += `Your ${dataType} faces lower HNDL risk but should still be protected with PQC as practical.`;
  }

  return details;
}

function estimateQuantumTimeline(adversaryCapability: string): {
  largeScaleQCYears: number;
  harvestableDataWindow: string;
  recommendedProtectionDate: string;
} {
  let largeScaleQCYears: number;
  let harvestableWindow: string;
  let protectionDate: Date;

  if (adversaryCapability === 'state_level') {
    largeScaleQCYears = 10;
    harvestableWindow = '0-10 years (NOW is the window - urgent action required)';
    protectionDate = new Date();
  } else if (adversaryCapability === 'advanced') {
    largeScaleQCYears = 15;
    harvestableWindow = '0-15 years (Window is actively closing - implement PQC now)';
    protectionDate = new Date();
  } else {
    largeScaleQCYears = 20;
    harvestableWindow = '0-20 years (Within next few years - begin PQC implementation)';
    protectionDate = new Date();
    protectionDate.setFullYear(protectionDate.getFullYear() + 2);
  }

  return {
    largeScaleQCYears,
    harvestableDataWindow: harvestableWindow,
    recommendedProtectionDate: protectionDate.toISOString().split('T')[0],
  };
}

function generateCountermeasures(
  dataType: string,
  storageDuration: string,
  adversaryCapability: string
): Countermeasure[] {
  const countermeasures: Countermeasure[] = [
    {
      measure: 'Deploy NIST-standardized PQC algorithms (ML-KEM for key exchange, ML-DSA for signatures)',
      implementationEffort: 'high',
      effectiveness: 'high',
      costEstimate: {
        amount: 500000,
        currency: 'USD',
      },
      timeline: '6-12 months for production deployment',
    },
    {
      measure: 'Implement hybrid cryptography (classical + PQC in parallel)',
      implementationEffort: 'medium',
      effectiveness: 'high',
      costEstimate: {
        amount: 300000,
        currency: 'USD',
      },
      timeline: '3-6 months for initial deployment',
    },
    {
      measure: 'Establish crypto agility infrastructure for future algorithm migration',
      implementationEffort: 'high',
      effectiveness: 'medium',
      costEstimate: {
        amount: 400000,
        currency: 'USD',
      },
      timeline: '9-18 months for full implementation',
    },
    {
      measure: 'Re-encrypt previously harvested data with PQC once algorithms standardize',
      implementationEffort: 'medium',
      effectiveness: 'medium',
      costEstimate: {
        amount: 250000,
        currency: 'USD',
      },
      timeline: '2025-2028 based on algorithm maturity',
    },
  ];

  // Add severity-based recommendations
  if (adversaryCapability === 'state_level' || storageDuration === 'indefinite') {
    countermeasures.push({
      measure: 'Consider defensive quantum-resistant rekeying (rotate keys using PQC immediately)',
      implementationEffort: 'high',
      effectiveness: 'high',
      costEstimate: {
        amount: 600000,
        currency: 'USD',
      },
      timeline: '3-6 months for critical systems',
    });

    countermeasures.push({
      measure: 'Implement continuous cryptographic monitoring and threat assessment',
      implementationEffort: 'medium',
      effectiveness: 'high',
      costEstimate: {
        amount: 150000,
        currency: 'USD',
      },
      timeline: 'Ongoing after initial 2-3 month setup',
    });
  }

  if (dataType.toLowerCase().includes('financial') || dataType.toLowerCase().includes('health')) {
    countermeasures.push({
      measure: 'Establish compliance alignment with regulatory PQC mandates',
      implementationEffort: 'medium',
      effectiveness: 'high',
      costEstimate: {
        amount: 200000,
        currency: 'USD',
      },
      timeline: '2-4 months for governance setup',
    });
  }

  return countermeasures;
}

function getComplianceRequirements(dataType: string): string[] {
  const requirements: string[] = [];

  requirements.push('NIST SP 800-208: Post-Quantum Cryptography: ML-KEM, ML-DSA, SLH-DSA');

  if (dataType.toLowerCase().includes('health')) {
    requirements.push('HIPAA Breach Notification Rule - cryptographic safeguards required');
    requirements.push('FDA Medical Device Cybersecurity Guidance - PQC readiness');
  }

  if (dataType.toLowerCase().includes('financial')) {
    requirements.push('Gramm-Leach-Bliley Act (GLBA) - encryption requirements');
    requirements.push('Federal Reserve SR 19-4 - Guidance on Cyber Risk Management');
    requirements.push('OCC Bulletin 2020-13 - Cyber Risk Management');
  }

  if (dataType.toLowerCase().includes('military') || dataType.toLowerCase().includes('defense')) {
    requirements.push('CNSA 2.0 - Post-Quantum Cryptographic Transition Plan');
    requirements.push('NIST IR 8411 - Hardware-Rooted Security in Supply Chain Risk Management');
    requirements.push('Executive Order 14028 - Improving the Nation\'s Cybersecurity');
  }

  if (dataType.toLowerCase().includes('trade') || dataType.toLowerCase().includes('intellectual')) {
    requirements.push('IP Protection Laws - Confidentiality safeguards');
    requirements.push('Trade Secrets Act - Encryption of proprietary information');
  }

  requirements.push('White House OMB M-23-02 - Memorandum on Migration to PQC');
  requirements.push('EU Cyber Resilience Act - Post-Quantum Cryptography requirements');

  return requirements;
}

export function generateThreatAssessmentSummary(threat: ThreatModelResult): string {
  let summary = `
QUANTUM THREAT ASSESSMENT FOR: ${threat.dataType}
================================================

HARVEST NOW, DECRYPT LATER RISK: ${threat.harvestNowDecryptLater.risk.toUpperCase()}
Details: ${threat.harvestNowDecryptLater.details}
Vulnerability Timeframe: ${threat.harvestNowDecryptLater.timeframeOfVulnerability}

QUANTUM COMPUTING TIMELINE:
- Cryptographically Relevant Quantum Computer (CRQC): ~${threat.quantumComputingTimeline.largeScaleQCYears} years
- Harvestable Data Window: ${threat.quantumComputingTimeline.harvestableDataWindow}
- Recommended Protection Date: ${threat.quantumComputingTimeline.recommendedProtectionDate}

RECOMMENDED COUNTERMEASURES:
${threat.countermeasures
  .map(
    (measure, index) => `
${index + 1}. ${measure.measure}
   Implementation Effort: ${measure.implementationEffort}
   Effectiveness: ${measure.effectiveness}
   Estimated Cost: $${measure.costEstimate.amount.toLocaleString()} USD
   Timeline: ${measure.timeline}
`
  )
  .join('')}

COMPLIANCE REQUIREMENTS:
${threat.complianceRequirements.map((req) => `- ${req}`).join('\n')}

RECOMMENDATION:
${threat.harvestNowDecryptLater.risk === 'critical' ? 'IMMEDIATE ACTION REQUIRED' : 'Plan PQC deployment within 2 years'}

For detailed implementation guidance, contact QuantraNet's expert team.
`;

  return summary;
}
