/**
 * fda-ai-assessment.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface FdaAiResult {
  system_name: string;
  device_classification: string;
  regulatory_pathway: string;
  samd_category: string;
  predetermined_change_control: boolean;
  requirements: string[];
  quality_system_requirements: string[];
  post_market_obligations: string[];
  timeline_estimate: string;
}

export function handleFdaAiAssessment(
  systemName: string,
  intendedUse: string,
  clinicalContext: string,
  aiModelType: string
): FdaAiResult {
  const useLower = intendedUse.toLowerCase();
  const contextLower = clinicalContext.toLowerCase();

  // Determine SaMD category (IMDRF framework)
  let samdCategory = "SaMD Category II";
  let deviceClassification = "Class II Medical Device";
  let regulatoryPathway = "510(k) Premarket Notification";

  if (contextLower.includes("life-threatening") || contextLower.includes("critical care") || contextLower.includes("surgical")) {
    samdCategory = "SaMD Category IV";
    deviceClassification = "Class III Medical Device";
    regulatoryPathway = "Premarket Approval (PMA)";
  } else if (contextLower.includes("diagnosis") || contextLower.includes("treatment decision") || useLower.includes("diagnostic")) {
    samdCategory = "SaMD Category III";
    deviceClassification = "Class II Medical Device (Special Controls)";
    regulatoryPathway = "De Novo Classification";
  } else if (useLower.includes("inform") || useLower.includes("administrative") || useLower.includes("workflow")) {
    samdCategory = "SaMD Category I";
    deviceClassification = "Class I Medical Device (Exempt)";
    regulatoryPathway = "Exempt — General Controls Only";
  }

  const predeterminedChangeControl = aiModelType.toLowerCase().includes("adaptive") ||
    aiModelType.toLowerCase().includes("continuous learning") ||
    aiModelType.toLowerCase().includes("reinforcement");

  const requirements = [
    "FDA AI/ML-Based SaMD Action Plan compliance",
    "Good Machine Learning Practice (GMLP) per FDA/Health Canada/MHRA joint statement",
    "Clinical validation per IMDRF SaMD N41 guidance",
    "Real-world performance monitoring plan",
    `Predetermined Change Control Plan (PCCP): ${predeterminedChangeControl ? "REQUIRED — adaptive/continuous learning model" : "Recommended but not mandatory"}`,
    "Total Product Lifecycle (TPLC) regulatory approach",
    "Transparency and explainability documentation",
    "Algorithmic bias assessment per FDA guidance on diversity in clinical trials"
  ];

  if (samdCategory === "SaMD Category III" || samdCategory === "SaMD Category IV") {
    requirements.push("Prospective clinical study or pivotal trial data required");
    requirements.push("FDA Breakthrough Device Designation eligibility assessment");
  }

  const qualitySystemRequirements = [
    "21 CFR Part 820 — Quality Management System Regulation (QMSR, eff. Feb 2026)",
    "Design Controls (21 CFR 820.30) — including AI model design verification and validation",
    "Software Lifecycle Process per IEC 62304",
    "Risk Management per ISO 14971 — with AI-specific risk considerations",
    "Cybersecurity per FDA premarket cybersecurity guidance (2023)",
    "Software Bill of Materials (SBOM) for AI/ML components",
    "Data Management — training data provenance, quality, and bias documentation",
    "Model Version Control — complete audit trail of model iterations"
  ];

  const postMarketObligations = [
    "Post-market surveillance per 21 CFR Part 803 (MDR reporting)",
    "Real-world performance monitoring against clinical validation benchmarks",
    "Algorithm change protocol — documenting when PCCP triggers apply",
    "Annual AI model performance report to FDA (if PMA)",
    "Adverse event reporting within 30 days (serious) / annually (non-serious)",
    "Cybersecurity vulnerability disclosure per CISA coordination",
    "Patient and clinician feedback mechanism for AI decision quality"
  ];

  const timelineEstimates: Record<string, string> = {
    "SaMD Category I": "3-6 months (registration only)",
    "SaMD Category II": "6-12 months (510(k) pathway)",
    "SaMD Category III": "12-18 months (De Novo pathway)",
    "SaMD Category IV": "18-36 months (PMA pathway)"
  };

  return {
    system_name: systemName,
    device_classification: deviceClassification,
    regulatory_pathway: regulatoryPathway,
    samd_category: samdCategory,
    predetermined_change_control: predeterminedChangeControl,
    requirements,
    quality_system_requirements: qualitySystemRequirements,
    post_market_obligations: postMarketObligations,
    timeline_estimate: timelineEstimates[samdCategory] || "12-18 months"
  };
}
