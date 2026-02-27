/**
 * maritime_ai_compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T06:00:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */

export interface handleMaritimeAiComplianceResult {
  system_name: string;
  risk_classification: string;
  risk_level: string;
  imo_mass_degree: string;
  applicable_regulations: string[];
  safety_requirements: string[];
  compliance_requirements: string[];
  technical_requirements: string[];
  cybersecurity_requirements: string[];
  environmental_obligations: string[];
  remediation: string[];
  casa_tier: string;
}

export function handleMaritimeAiCompliance(
  systemName: string,
  aiFunction: string,
  vesselAutonomy: string,
  safetyScope: string,
  jurisdiction: string
): handleMaritimeAiComplianceResult {
  const jurLower = jurisdiction.toLowerCase();
  const fnLower = aiFunction.toLowerCase();
  const autoLower = vesselAutonomy.toLowerCase();
  const safeLower = safetyScope.toLowerCase();

  // ── Risk classification (maritime-specific) ──
  let riskClassification = "Standard — AI-assisted maritime system with human oversight";
  let riskLevel = "MEDIUM";

  if (autoLower.includes("fully autonomous") || autoLower.includes("degree 4") || autoLower.includes("unmanned")) {
    riskClassification = "CRITICAL — Fully autonomous vessel (IMO Degree 4/MASS) requires flag state approval and enhanced safety case";
    riskLevel = "CRITICAL";
  } else if (autoLower.includes("degree 3") || autoLower.includes("remote operated")) {
    riskClassification = "HIGH — Remotely operated vessel (IMO Degree 3) with no seafarers aboard requires special certification";
    riskLevel = "HIGH";
  } else if (autoLower.includes("degree 2") || autoLower.includes("remote")) {
    riskClassification = "HIGH — Remote-controlled ship (IMO Degree 2) with seafarers aboard for intervention";
    riskLevel = "HIGH";
  } else if (fnLower.includes("navigation") || fnLower.includes("collision")) {
    riskClassification = "HIGH — AI navigation/collision avoidance is safety-critical under SOLAS/COLREGs";
    riskLevel = "HIGH";
  } else if (fnLower.includes("security") || fnLower.includes("surveillance")) {
    riskClassification = "MEDIUM-HIGH — Maritime security AI subject to ISPS Code and port state controls";
    riskLevel = "HIGH";
  }

  // ── IMO MASS degree classification ──
  let massDegree = "Degree 1 — Ship with automated processes (crew on board for control)";
  if (autoLower.includes("degree 4") || autoLower.includes("fully autonomous")) {
    massDegree = "Degree 4 — Fully autonomous ship (no seafarers, AI makes all decisions). IMO MSC.1/Circ.1638 Interim Guidelines apply. Equivalent safety demonstration required.";
  } else if (autoLower.includes("degree 3")) {
    massDegree = "Degree 3 — Remotely controlled ship (no seafarers aboard). Shore-based operator maintains control. STCW and COLREGs applicability under review.";
  } else if (autoLower.includes("degree 2") || autoLower.includes("remote")) {
    massDegree = "Degree 2 — Remotely controlled ship (seafarers aboard for takeover). Dual control capability required.";
  } else if (autoLower.includes("shore-based") || autoLower.includes("shore based")) {
    massDegree = "Shore-based control center — Subject to IMO guidelines on remote monitoring, GMDSS requirements, and flag state ROC standards.";
  }

  // ── Applicable regulations ──
  const regulations: string[] = [];
  regulations.push("IMO MSC.1/Circ.1638 — Interim Guidelines for MASS Trials");
  regulations.push("IMO MASS Code (in development) — Mandatory framework for autonomous vessels");
  regulations.push("SOLAS Chapter V — Safety of Navigation (applies to all vessels >500 GT)");
  regulations.push("COLREGs 1972 — Convention on International Regulations for Preventing Collisions at Sea");
  regulations.push("STCW Convention — Standards of Training, Certification and Watchkeeping for Seafarers");
  regulations.push("ISM Code — International Safety Management for ship operations");

  if (jurLower.includes("imo") || jurLower.includes("international")) {
    regulations.push("MARPOL — Marine pollution prevention (AI for emissions monitoring)");
    regulations.push("ISPS Code — International Ship and Port Facility Security");
    regulations.push("MLC 2006 — Maritime Labour Convention (crew welfare in AI-augmented ops)");
  }
  if (jurLower.includes("eu") || jurLower.includes("emsa")) {
    regulations.push("EU Maritime Safety Directive 2009/18/EC — Accident investigation framework");
    regulations.push("EU MRV Regulation 2015/757 — Monitoring, Reporting, Verification of CO2 emissions");
    regulations.push("EMSA (European Maritime Safety Agency) — EU-level maritime AI oversight");
    regulations.push("EU AI Act — High-risk classification for safety-critical maritime AI");
    regulations.push("EU ETS Maritime — Emissions Trading System for shipping (from 2024)");
  }
  if (jurLower.includes("us") || jurLower.includes("uscg")) {
    regulations.push("33 CFR Subchapter N — USCG vessel inspection and certification");
    regulations.push("46 USC Chapter 35 — USCG authority over vessel safety and manning");
    regulations.push("USCG NVIC guidance on autonomous vessel operations");
    regulations.push("Jones Act (46 USC 55102) — Cabotage restrictions for US-flag vessels");
  }
  if (jurLower.includes("uk") || jurLower.includes("mca")) {
    regulations.push("UK Merchant Shipping Act 1995 — MCA authority over vessel safety");
    regulations.push("UK Maritime Autonomy Regulation Lab (MARLab) — Sandbox for MASS trials");
    regulations.push("UK Workboat Code / MGN guidance on autonomous vessel standards");
  }

  // ── Safety requirements ──
  const safety: string[] = [
    "SOLAS Chapter V Reg 19 — Carriage requirements for navigation systems (ECDIS, AIS, radar)",
    "COLREGs Rule 5 — Proper lookout must be maintained (AI equivalence demonstration needed)",
    "COLREGs Rule 7/8 — Risk of collision assessment and action to avoid (AI decision audit trail)",
    "Minimum safe manning document review for AI-augmented crew operations",
    "Emergency procedures for AI system failure (manual override and reversion plan)",
    "GMDSS compliance — Global Maritime Distress and Safety System communications maintained",
  ];

  if (riskLevel === "CRITICAL" || autoLower.includes("degree 3") || autoLower.includes("degree 4")) {
    safety.push("Equivalent safety demonstration per IMO MSC.1/Circ.1638 goal-based standards");
    safety.push("Remote Emergency Shutdown (RES) capability from shore-based control center");
    safety.push("Redundant communication links (VSAT + L-band + HF backup)");
    safety.push("Cyber-resilient navigation backup (independent INS, celestial nav, DR backup)");
  }

  // ── Compliance requirements ──
  const compliance: string[] = [
    "Flag state approval for MASS operations (pre-trial notification per IMO guidelines)",
    "Classification society (DNV, Lloyd's, BV, ABS) type approval for AI navigation systems",
    "ISM Code Document of Compliance (DOC) and Safety Management Certificate (SMC)",
    "ISPS Code Ship Security Plan (SSP) updated for AI/autonomous operations",
    "Port state control readiness — AI-related documentation for PSC inspections",
  ];

  if (fnLower.includes("navigation") || fnLower.includes("collision")) {
    compliance.push("IEC 61174 (ECDIS) and IEC 62065 (Track Control) performance standards");
    compliance.push("IHO S-100 framework compliance for electronic navigation data");
    compliance.push("Radar performance standards per IMO Resolution MSC.192(79)");
  }

  if (fnLower.includes("emissions") || fnLower.includes("environment")) {
    compliance.push("MARPOL Annex VI — SOx/NOx emission monitoring and EEDI/EEXI compliance");
    compliance.push("CII (Carbon Intensity Indicator) operational rating per IMO DCS");
    compliance.push("EU MRV/EU ETS Maritime reporting for CO2 emissions");
  }

  // ── Technical requirements ──
  const technical: string[] = [
    "Situational awareness sensor fusion (radar, AIS, ECDIS, camera, LIDAR, IR)",
    "COLREGs-compliant decision engine with auditable rule application",
    "Fail-safe to manual/shore control within 30 seconds of AI system failure",
    "Position, Navigation, and Timing (PNT) resilience — multi-GNSS with spoofing detection",
    "Weather routing AI with heavy weather avoidance and stability assessment",
    "Communication latency management for shore-based remote control (<250ms target)",
  ];

  if (autoLower.includes("degree 3") || autoLower.includes("degree 4")) {
    technical.push("Remote Operations Center (ROC) standards per flag state requirements");
    technical.push("Human-Machine Interface (HMI) for shore-based operators per ISO 16329");
    technical.push("Redundant power and propulsion control for autonomous operations");
  }

  // ── Cybersecurity requirements ──
  const cyber: string[] = [
    "IMO MSC-FAL.1/Circ.3/Rev.2 — Maritime Cyber Risk Management guidelines",
    "BIMCO/ICS Guidelines on Cyber Security Onboard Ships (2022 edition)",
    "Classification society cyber notation (DNV Cyber Secure, Lloyd's ShipRight)",
    "IEC 62443 — Industrial automation and control systems security (for OT systems)",
    "Network segmentation — IT/OT separation with maritime-grade firewalls",
    "GNSS spoofing and jamming detection and mitigation systems",
    "Secure software update mechanism for AI models (code signing, integrity checks)",
  ];

  if (riskLevel === "CRITICAL" || riskLevel === "HIGH") {
    cyber.push("Penetration testing of AI navigation and control systems (annual minimum)");
    cyber.push("Cyber incident response plan integrated with ship emergency procedures");
  }

  // ── Environmental obligations ──
  const environmental: string[] = [
    "MARPOL compliance monitoring — AI for discharge, emissions, and ballast water",
    "Ballast Water Management Convention — AI monitoring of treatment systems",
    "Underwater Radiated Noise (URN) management per IMO MEPC.1/Circ.833",
  ];

  if (fnLower.includes("emissions") || safeLower.includes("environmental")) {
    environmental.push("EU ETS Maritime compliance — CO2 reporting and allowance management");
    environmental.push("CII rating optimization through AI-driven voyage planning");
    environmental.push("EEDI/EEXI compliance verification for AI-recommended speed profiles");
    environmental.push("Arctic/Antarctic operations — Polar Code compliance for ice navigation AI");
  }

  // ── Remediation ──
  const remediation: string[] = [];
  if (riskLevel === "CRITICAL") {
    remediation.push("URGENT: Obtain flag state approval before ANY autonomous trials");
    remediation.push("Commission classification society type approval for AI systems");
    remediation.push("Conduct full safety case and hazard analysis (HAZID/HAZOP)");
    remediation.push("Establish Remote Operations Center meeting flag state ROC standards");
  } else if (riskLevel === "HIGH") {
    remediation.push("Submit MASS trial notification to flag state and coastal states");
    remediation.push("Update ISM Code safety management system for AI operations");
    remediation.push("Conduct cyber risk assessment per IMO MSC-FAL.1/Circ.3/Rev.2");
  }
  remediation.push("Implement AI decision audit trail for COLREGs compliance evidence");
  remediation.push("Train crew/operators on AI system capabilities and limitations");
  remediation.push("Establish incident reporting for AI-related near misses and failures");
  remediation.push("Monitor IMO MASS Code development for evolving requirements");

  let casaTier = "CASA Tier 1 — Startup ($5K-$25K/yr)";
  if (riskLevel === "CRITICAL") {
    casaTier = "CASA Tier 3 — Enterprise ($75K-$200K/yr) — Required for autonomous vessel AI";
  } else if (riskLevel === "HIGH") {
    casaTier = "CASA Tier 2 — Professional ($25K-$75K/yr) — Maritime safety compliance";
  }

  return {
    system_name: systemName,
    risk_classification: riskClassification,
    risk_level: riskLevel,
    imo_mass_degree: massDegree,
    applicable_regulations: regulations,
    safety_requirements: safety,
    compliance_requirements: compliance,
    technical_requirements: technical,
    cybersecurity_requirements: cyber,
    environmental_obligations: environmental,
    remediation,
    casa_tier: casaTier,
  };
}
