/**
 * compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  ComplianceCheckInputSchema,
  ComplianceCheckResult,
  ComplianceRecommendation,
  RequiredAction,
  Sector,
  Jurisdiction,
} from '../types';

export function checkPQCCompliance(input: unknown): ComplianceCheckResult {
  const validatedInput = ComplianceCheckInputSchema.parse(input);

  const complianceStatuses = determineComplianceStatus(
    validatedInput.sector,
    validatedInput.jurisdiction,
    validatedInput.currentImplementations || []
  );

  const recommendations = generateComplianceRecommendations(
    validatedInput.sector,
    validatedInput.jurisdiction,
    complianceStatuses
  );

  const requiredActions = generateRequiredActions(
    validatedInput.sector,
    validatedInput.jurisdiction
  );

  const deadline = determineCriticalDeadline(validatedInput.jurisdiction);

  return {
    sector: validatedInput.sector,
    jurisdiction: validatedInput.jurisdiction,
    complianceStatus: complianceStatuses,
    recommendations,
    requiredActions,
    deadline,
  };
}

function determineComplianceStatus(
  sector: Sector,
  jurisdiction: Jurisdiction,
  currentImplementations: string[]
): {
  nistSP800_208: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  whiteHouseOMB_M23_02: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  cnsa2_0: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  euCyberResilienceAct: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
} {
  // Check for PQC implementations
  const hasPQC = currentImplementations.some((impl) =>
    ['ML-KEM', 'CRYSTALS-Kyber', 'ML-DSA', 'CRYSTALS-Dilithium', 'SLH-DSA', 'FALCON'].includes(
      impl
    )
  );

  // Check for classical-only implementations
  const hasClassicalOnly = currentImplementations.some((impl) =>
    ['RSA', 'ECDSA', 'DES', 'AES'].some((classical) => impl.includes(classical))
  );

  return {
    nistSP800_208: hasPQC ? 'compliant' : hasClassicalOnly ? 'partial' : 'non_compliant',
    whiteHouseOMB_M23_02:
      jurisdiction === Jurisdiction.US ? (hasPQC ? 'compliant' : 'non_compliant') : 'not_applicable',
    cnsa2_0:
      sector === Sector.DEFENSE || sector === Sector.GOVERNMENT
        ? hasPQC
          ? 'compliant'
          : 'non_compliant'
        : 'not_applicable',
    euCyberResilienceAct:
      jurisdiction === Jurisdiction.EU ? (hasPQC ? 'compliant' : 'non_compliant') : 'not_applicable',
  };
}

function generateComplianceRecommendations(
  sector: Sector,
  jurisdiction: Jurisdiction,
  complianceStatuses: any
): ComplianceRecommendation[] {
  const recommendations: ComplianceRecommendation[] = [];

  // NIST SP 800-208
  if (complianceStatuses.nistSP800_208 !== 'compliant') {
    recommendations.push({
      requirement: 'NIST SP 800-208: Post-Quantum Cryptography Implementation',
      currentState: complianceStatuses.nistSP800_208,
      recommendedState: 'compliant',
      priority: complianceStatuses.nistSP800_208 === 'non_compliant' ? 'high' : 'medium',
      estimatedEffort: complianceStatuses.nistSP800_208 === 'non_compliant' ? '12-18 months' : '6-12 months',
    });
  }

  // White House OMB M-23-02
  if (jurisdiction === Jurisdiction.US) {
    if (complianceStatuses.whiteHouseOMB_M23_02 !== 'compliant') {
      recommendations.push({
        requirement: 'White House OMB M-23-02: Migration to Post-Quantum Cryptography',
        currentState: complianceStatuses.whiteHouseOMB_M23_02,
        recommendedState: 'compliant',
        priority: 'critical',
        estimatedEffort: '12-24 months',
      });
    }
  }

  // CNSA 2.0
  if (sector === Sector.DEFENSE || sector === Sector.GOVERNMENT) {
    if (complianceStatuses.cnsa2_0 !== 'compliant') {
      recommendations.push({
        requirement: 'CNSA 2.0: Post-Quantum Cryptography Transition Plan (NSA)',
        currentState: complianceStatuses.cnsa2_0,
        recommendedState: 'compliant',
        priority: 'critical',
        estimatedEffort: '6-12 months (accelerated timeline)',
      });
    }
  }

  // EU Cyber Resilience Act
  if (jurisdiction === Jurisdiction.EU) {
    if (complianceStatuses.euCyberResilienceAct !== 'compliant') {
      recommendations.push({
        requirement: 'EU Cyber Resilience Act: Post-Quantum Cryptography Requirements',
        currentState: complianceStatuses.euCyberResilienceAct,
        recommendedState: 'compliant',
        priority: 'high',
        estimatedEffort: '12-18 months',
      });
    }
  }

  // Sector-specific recommendations
  if (sector === Sector.FINANCE) {
    recommendations.push({
      requirement: 'Financial Sector Cybersecurity Act - PQC Readiness',
      currentState: 'not_assessed',
      recommendedState: 'compliant',
      priority: 'high',
      estimatedEffort: '9-12 months',
    });
  }

  if (sector === Sector.HEALTHCARE) {
    recommendations.push({
      requirement: 'FDA Medical Device Cybersecurity Guidance - PQC Readiness',
      currentState: 'not_assessed',
      recommendedState: 'compliant',
      priority: 'medium',
      estimatedEffort: '12-18 months',
    });
  }

  return recommendations;
}

function generateRequiredActions(
  sector: Sector,
  jurisdiction: Jurisdiction
): RequiredAction[] {
  const actions: RequiredAction[] = [];

  // Universal actions
  actions.push({
    action: 'Establish PQC migration governance committee',
    timeline: 'Within 30 days',
    responsibility: 'CISO / Chief Technology Officer',
    successCriteria: [
      'Committee formed with representatives from IT, Security, Legal, Compliance',
      'Stakeholder list maintained',
      'Monthly review meetings scheduled',
    ],
  });

  actions.push({
    action: 'Conduct complete cryptographic inventory audit',
    timeline: 'Within 90 days',
    responsibility: 'Security Team',
    successCriteria: [
      'All crypto systems documented',
      'Threat levels assigned',
      'Dependencies mapped',
      'Audit report completed',
    ],
  });

  actions.push({
    action: 'Evaluate NIST-standardized PQC algorithms',
    timeline: 'Within 120 days',
    responsibility: 'Cryptography Experts',
    successCriteria: [
      'Algorithm selection completed',
      'Performance benchmarks established',
      'Implementation libraries evaluated',
      'Vendor roadmaps reviewed',
    ],
  });

  actions.push({
    action: 'Develop PQC migration roadmap',
    timeline: 'Within 180 days',
    responsibility: 'Project Management Office',
    successCriteria: [
      'Detailed timeline created',
      'Resource requirements identified',
      'Budget allocated',
      'Executive approval obtained',
    ],
  });

  actions.push({
    action: 'Implement hybrid cryptography in critical systems',
    timeline: '6-12 months',
    responsibility: 'Development and Infrastructure Teams',
    successCriteria: [
      'Pilot deployment successful',
      'Performance SLAs met',
      'Security validations passed',
      'Production readiness confirmed',
    ],
  });

  // US-specific actions
  if (jurisdiction === Jurisdiction.US) {
    actions.push({
      action: 'Align with White House OMB M-23-02 compliance requirements',
      timeline: 'By 2030-12-31',
      responsibility: 'Compliance Officer',
      successCriteria: [
        'Requirements documented',
        'Timeline established',
        'Progress tracked quarterly',
        'Annual reports submitted',
      ],
    });
  }

  // Defense/Government-specific actions
  if (sector === Sector.DEFENSE || sector === Sector.GOVERNMENT) {
    actions.push({
      action: 'Achieve CNSA 2.0 compliance for national security systems',
      timeline: 'By 2028-12-31',
      responsibility: 'Chief Information Security Officer',
      successCriteria: [
        'All NSA-approved algorithms implemented',
        'Certification audit passed',
        'Continuous monitoring enabled',
        'Incident response validated',
      ],
    });
  }

  // EU-specific actions
  if (jurisdiction === Jurisdiction.EU) {
    actions.push({
      action: 'Implement EU Cyber Resilience Act PQC requirements',
      timeline: 'By 2027-12-31',
      responsibility: 'Data Protection Officer',
      successCriteria: [
        'Requirements mapped to systems',
        'Implementation timeline finalized',
        'Compliance audit scheduled',
        'Product compliance verified',
      ],
    });
  }

  return actions;
}

function determineCriticalDeadline(jurisdiction: Jurisdiction): string | null {
  const deadlineMap: { [key in Jurisdiction]: string } = {
    [Jurisdiction.US]: '2030-12-31',
    [Jurisdiction.EU]: '2027-12-31',
    [Jurisdiction.UK]: '2030-06-30',
    [Jurisdiction.CANADA]: '2032-12-31',
    [Jurisdiction.APAC]: '2032-12-31',
    [Jurisdiction.GLOBAL]: '2030-12-31',
  };

  return deadlineMap[jurisdiction] || null;
}

export function generateComplianceReport(compliance: ComplianceCheckResult): string {
  let report = `
QUANTRANET PQC COMPLIANCE ASSESSMENT
====================================

Organization Sector: ${compliance.sector.toUpperCase()}
Jurisdiction: ${compliance.jurisdiction}
Assessment Date: ${new Date().toISOString().split('T')[0]}

COMPLIANCE STATUS:
${formatComplianceStatus('NIST SP 800-208', compliance.complianceStatus.nistSP800_208)}
${formatComplianceStatus('White House OMB M-23-02', compliance.complianceStatus.whiteHouseOMB_M23_02)}
${formatComplianceStatus('CNSA 2.0', compliance.complianceStatus.cnsa2_0)}
${formatComplianceStatus('EU Cyber Resilience Act', compliance.complianceStatus.euCyberResilienceAct)}

CRITICAL DEADLINE: ${compliance.deadline || 'No jurisdiction-specific deadline'}

COMPLIANCE RECOMMENDATIONS:
${compliance.recommendations
  .map(
    (rec, idx) => `
${idx + 1}. ${rec.requirement}
   Current State: ${rec.currentState}
   Target State: ${rec.recommendedState}
   Priority: ${rec.priority.toUpperCase()}
   Estimated Effort: ${rec.estimatedEffort}
`
  )
  .join('')}

REQUIRED ACTIONS:
${compliance.requiredActions
  .map(
    (action, idx) => `
${idx + 1}. ${action.action}
   Timeline: ${action.timeline}
   Responsibility: ${action.responsibility}
   Success Criteria:
${action.successCriteria.map((criterion) => `     - ${criterion}`).join('\n')}
`
  )
  .join('')}

For detailed implementation support, contact QuantraNet's compliance team.
`;

  return report;
}

function formatComplianceStatus(requirement: string, status: string): string {
  const statusSymbol = {
    compliant: '✓ COMPLIANT',
    non_compliant: '✗ NON-COMPLIANT',
    partial: '⚠ PARTIAL',
    not_applicable: '- NOT APPLICABLE',
  }[status] || '? UNKNOWN';

  return `- ${requirement}: ${statusSymbol}`;
}
