/**
 * eu-mdr-compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface EuMdrResult {
  system_name: string;
  mdr_classification: string;
  conformity_assessment_route: string;
  notified_body_required: boolean;
  essential_requirements: string[];
  technical_documentation: string[];
  post_market_surveillance: string[];
  mdcg_guidance_applicable: string[];
  timeline_estimate: string;
}

export function handleEuMdrCompliance(
  systemName: string,
  deviceDescription: string,
  intendedPurpose: string,
  riskClass: string
): EuMdrResult {
  const descLower = deviceDescription.toLowerCase();
  const purposeLower = intendedPurpose.toLowerCase();
  const riskLower = riskClass.toLowerCase();

  let mdrClassification = "Class IIa — MDR Annex VIII, Rule 11 (Software as Medical Device)";
  let conformityRoute = "Annex IX (Quality Management System) + Annex XI (Technical Documentation)";
  let notifiedBodyRequired = true;

  if (riskLower.includes("class i") || purposeLower.includes("wellness") || purposeLower.includes("administrative")) {
    mdrClassification = "Class I — MDR Annex VIII, Rule 11 (Non-measuring, non-sterile software)";
    conformityRoute = "Self-certification with Technical Documentation per Annex II and III";
    notifiedBodyRequired = false;
  } else if (riskLower.includes("class iib") || purposeLower.includes("treatment") || purposeLower.includes("therapy")) {
    mdrClassification = "Class IIb — MDR Annex VIII, Rule 11 (Treatment-influencing AI)";
    conformityRoute = "Annex IX (Full QMS) + Clinical Evaluation per MDCG 2020-1";
  } else if (riskLower.includes("class iii") || purposeLower.includes("life-sustaining") || purposeLower.includes("implant")) {
    mdrClassification = "Class III — MDR Article 52(4) (Highest risk AI medical device)";
    conformityRoute = "Annex IX (Full QMS) + Annex X (Type Examination) + Clinical Investigation";
  }

  const essentialRequirements = [
    "MDR Annex I Chapter I — General Safety and Performance Requirements (GSPR)",
    "MDR Annex I Section 17.1-17.4 — Software Lifecycle Requirements",
    "IEC 62304 — Medical Device Software Lifecycle Processes",
    "ISO 14971 — Risk Management for Medical Devices (AI-adapted)",
    "IEC 82304-1 — Health Software: General Requirements for Product Safety",
    "ISO 13485 — Quality Management System for Medical Devices",
    "MDR Article 10 — General obligations of manufacturers",
    "MDR Annex XIV Part A — Clinical Evaluation (with AI-specific considerations)",
    "MDCG 2021-24 — Guidance on Classification of Medical Device Software"
  ];

  if (descLower.includes("ai") || descLower.includes("machine learning")) {
    essentialRequirements.push("EU AI Act Harmonisation — High-risk AI system requirements per Article 6(1)");
    essentialRequirements.push("MDCG 2019-11 — Guidance on Qualification and Classification of Software in MDR");
  }

  const technicalDocumentation = [
    "Device description and specification including AI model architecture",
    "Intended purpose and indications for use",
    "AI model training methodology, data provenance, and validation approach",
    "Risk-benefit analysis per ISO 14971 with AI-specific hazards",
    "Software development lifecycle documentation per IEC 62304",
    "Clinical evidence compilation per MEDDEV 2.7/1 Rev 4",
    "Biocompatibility assessment (if applicable to AI-integrated hardware)",
    "Labelling and instructions for use per MDR Annex I Chapter III",
    "Post-market surveillance plan per MDR Article 84",
    "Declaration of Conformity per MDR Annex IV"
  ];

  const postMarketSurveillance = [
    "Post-Market Surveillance (PMS) Plan per MDR Article 84",
    "Post-Market Clinical Follow-up (PMCF) per MDR Annex XIV Part B",
    "Periodic Safety Update Report (PSUR) per MDR Article 86",
    "Vigilance reporting per MDR Articles 87-92",
    "Field Safety Corrective Actions (FSCA) per MDR Article 82",
    "AI model performance monitoring against CE-marked specifications",
    "EUDAMED registration and UDI assignment"
  ];

  const mdcgGuidance = [
    "MDCG 2021-24: Classification of medical device software",
    "MDCG 2020-1: Clinical evaluation of medical device software",
    "MDCG 2019-11: Qualification and classification of software",
    "MDCG 2019-16: Cybersecurity guidance for medical devices"
  ];

  const timelineEstimates: Record<string, string> = {
    "Class I": "6-9 months",
    "Class IIa": "12-18 months",
    "Class IIb": "18-24 months",
    "Class III": "24-36 months"
  };

  const classKey = mdrClassification.split(" —")[0].replace("Class ", "Class ");
  const matchKey = Object.keys(timelineEstimates).find(k => mdrClassification.includes(k)) || "Class IIa";

  return {
    system_name: systemName,
    mdr_classification: mdrClassification,
    conformity_assessment_route: conformityRoute,
    notified_body_required: notifiedBodyRequired,
    essential_requirements: essentialRequirements,
    technical_documentation: technicalDocumentation,
    post_market_surveillance: postMarketSurveillance,
    mdcg_guidance_applicable: mdcgGuidance,
    timeline_estimate: timelineEstimates[matchKey] || "12-18 months"
  };
}
