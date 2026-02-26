/**
 * workplace-surveillance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface WorkplaceSurveillanceResult {
  system_name: string;
  risk_classification: string;
  applicable_regulations: string[];
  employee_rights: string[];
  proportionality_test: string[];
  prohibited_practices: string[];
  remediation: string[];
}

export function handleWorkplaceSurveillance(
  systemName: string,
  monitoringType: string,
  dataCollected: string,
  jurisdiction: string
): WorkplaceSurveillanceResult {
  const typeLower = monitoringType.toLowerCase();
  const jurLower = jurisdiction.toLowerCase();

  let riskClassification = "High Risk — EU AI Act Annex III, Section 4(b)";
  if (typeLower.includes("emotion") || typeLower.includes("sentiment") || typeLower.includes("mood")) {
    riskClassification = "PROHIBITED — EU AI Act Article 5(1)(f): Emotion recognition in workplace";
  }

  const applicableRegulations: string[] = [
    "EU AI Act — Workplace AI Provisions",
    "EU Platform Workers Directive (2024)",
    "ILO Convention on Workers' Privacy"
  ];

  if (jurLower.includes("eu")) {
    applicableRegulations.push(
      "GDPR Article 88 — Processing in the employment context",
      "EU Charter of Fundamental Rights Article 8 — Data protection"
    );
  }
  if (jurLower.includes("us")) {
    applicableRegulations.push(
      "Electronic Communications Privacy Act (ECPA)",
      "National Labor Relations Act — Section 7 rights",
      "State workplace monitoring laws (Connecticut, Delaware, New York)"
    );
  }

  const employeeRights = [
    "Right to be informed about AI monitoring systems and their purpose",
    "Right to access data collected by workplace AI systems",
    "Right to contest AI-based performance evaluations",
    "Right to human review of AI-driven employment decisions",
    "Right to not be subject to emotion/sentiment monitoring (EU AI Act prohibition)",
    "Right to disconnect — limits on after-hours AI monitoring",
    "Right to union representation in AI monitoring disputes"
  ];

  const proportionalityTest = [
    "Legitimate aim: Is monitoring necessary for a legitimate business purpose?",
    "Necessity: Is AI monitoring the least intrusive means to achieve the purpose?",
    "Proportionality: Do benefits to employer outweigh privacy intrusion to employees?",
    "Data minimization: Is only necessary data collected?",
    "Time limitation: Is monitoring limited to work hours and work activities?",
    "Transparency: Are employees fully informed about monitoring scope?"
  ];

  const prohibitedPractices = [
    "Emotion recognition in workplace settings (EU AI Act Article 5(1)(f))",
    "Covert AI surveillance without employee notification",
    "Monitoring of protected union organizing activities (NLRA)",
    "AI-based social scoring of employees",
    "Continuous keystroke logging without legitimate business justification",
    "Monitoring personal devices or off-duty activities without consent",
    "Using AI monitoring data for discriminatory employment decisions"
  ];

  const remediation = [
    "1. Audit all workplace AI monitoring against EU AI Act Article 5 prohibitions",
    "2. Remove any emotion recognition from workplace monitoring systems",
    "3. Implement employee notification and consent mechanisms",
    "4. Conduct proportionality assessment for each monitoring tool",
    "5. Establish employee data access and contestation portal",
    "6. Negotiate AI monitoring policies with employee representatives",
    "7. Deploy data minimization — collect only what is strictly necessary",
    "8. Schedule annual workplace surveillance impact assessment"
  ];

  return {
    system_name: systemName,
    risk_classification: riskClassification,
    applicable_regulations: applicableRegulations,
    employee_rights: employeeRights,
    proportionality_test: proportionalityTest,
    prohibited_practices: prohibitedPractices,
    remediation
  };
}
