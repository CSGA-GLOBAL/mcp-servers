/**
 * matchmaking-ai-assessment.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface MatchmakingResult {
  system_name: string;
  fairness_classification: string;
  risk_level: string;
  applicable_regulations: string[];
  fairness_concerns: string[];
  manipulation_risks: string[];
  data_protection_requirements: string[];
  transparency_requirements: string[];
  remediation: string[];
  casa_tier: string;
}

export function handleMatchmakingAiAssessment(
  systemName: string,
  matchmakingType: string,
  dataInputs: string,
  monetizationImpact: string,
  jurisdiction: string
): MatchmakingResult {
  const matchLower = matchmakingType.toLowerCase();
  const dataLower = dataInputs.toLowerCase();
  const monLower = monetizationImpact.toLowerCase();
  const jurLower = jurisdiction.toLowerCase();

  // Fairness classification
  let fairnessClassification = "Standard matchmaking — skill-based pairing";
  let riskLevel = "LOW";

  const usesELO = matchLower.includes("elo") || matchLower.includes("skill") || matchLower.includes("mmr") || matchLower.includes("rank");
  const usesEngagement = matchLower.includes("engagement") || matchLower.includes("retention") || matchLower.includes("eomm") || matchLower.includes("session");
  const affectsSpending = monLower.includes("spending") || monLower.includes("purchase") || monLower.includes("monetization") || monLower.includes("revenue");
  const usesPsychographic = dataLower.includes("behavior") || dataLower.includes("psycho") || dataLower.includes("personality") || dataLower.includes("emotion") || dataLower.includes("frustration");
  const usesBiometric = dataLower.includes("biometric") || dataLower.includes("facial") || dataLower.includes("voice") || dataLower.includes("heart rate");

  if (usesEngagement && affectsSpending) {
    fairnessClassification = "HIGH RISK — Engagement-optimized matchmaking with monetization impact (potential dark pattern)";
    riskLevel = "CRITICAL";
  } else if (usesEngagement) {
    fairnessClassification = "ELEVATED RISK — Engagement-optimized matchmaking (EOMM-style) may prioritize retention over fairness";
    riskLevel = "HIGH";
  } else if (affectsSpending) {
    fairnessClassification = "ELEVATED RISK — Matchmaking influences player spending behavior";
    riskLevel = "HIGH";
  } else if (usesPsychographic) {
    fairnessClassification = "MODERATE RISK — Psychographic profiling in matchmaking raises manipulation concerns";
    riskLevel = "MEDIUM";
  } else if (usesELO) {
    fairnessClassification = "STANDARD — Skill-based matchmaking (generally accepted practice)";
    riskLevel = "LOW";
  }

  if (usesBiometric) {
    riskLevel = riskLevel === "LOW" ? "HIGH" : "CRITICAL";
    fairnessClassification += " + BIOMETRIC DATA — Triggers additional regulatory obligations";
  }

  // Applicable regulations
  const regulations: string[] = [];

  if (jurLower.includes("eu") || jurLower.includes("europe")) {
    regulations.push("EU AI Act — AI-driven matchmaking may be classified as high-risk if affecting consumer behavior");
    regulations.push("EU Digital Services Act (DSA) Art. 25 — Dark pattern prohibition on online platforms");
    regulations.push("EU Unfair Commercial Practices Directive — Aggressive/misleading matchmaking manipulation");
    regulations.push("GDPR Art. 22 — Automated decision-making profiling rights");
    regulations.push("GDPR Art. 5(1)(a) — Lawfulness, fairness, transparency of processing");
    if (usesBiometric) {
      regulations.push("EU AI Act Art. 5 — Prohibited biometric practices may apply");
      regulations.push("GDPR Art. 9 — Special category (biometric) data processing restrictions");
    }
  }
  if (jurLower.includes("us") || jurLower.includes("united states")) {
    regulations.push("FTC Act Section 5 — Unfair or deceptive practices in matchmaking systems");
    regulations.push("FTC Dark Patterns Enforcement — Manipulative design in gaming contexts");
    regulations.push("COPPA — If minors profiled for matchmaking optimization");
    regulations.push("State consumer protection laws — CCPA/CPRA for data used in profiling");
    if (affectsSpending) {
      regulations.push("FTC Endorsement Guidelines — If matchmaking creates artificial advantage for paying players");
    }
  }
  if (jurLower.includes("uk")) {
    regulations.push("UK Online Safety Act 2023 — Platform safety obligations");
    regulations.push("UK GDPR — Data protection for player profiling");
    regulations.push("UK Consumer Rights Act 2015 — Fairness in digital services");
    regulations.push("UK Competition and Markets Authority — Dark patterns enforcement");
  }
  if (jurLower.includes("china")) {
    regulations.push("China Algorithm Recommendation Regulation (2022) — Algorithmic transparency requirements");
    regulations.push("China Personal Information Protection Law (PIPL) — Data processing for profiling");
  }
  if (regulations.length === 0) {
    regulations.push("General consumer protection laws apply");
    regulations.push("Industry self-regulation (IGDA, platform terms of service)");
  }

  // Fairness concerns
  const fairnessConcerns: string[] = [];
  if (usesEngagement) {
    fairnessConcerns.push("EOMM (Engagement Optimized Matchmaking) may deliberately create frustrating experiences to drive spending");
    fairnessConcerns.push("Win/loss manipulation undermines competitive integrity");
    fairnessConcerns.push("Players denied fair competition based on non-skill factors");
  }
  if (affectsSpending) {
    fairnessConcerns.push("Pay-to-win matchmaking creates unfair advantage for spending players");
    fairnessConcerns.push("Non-spending players may face artificially difficult opponents to incentivize purchases");
    fairnessConcerns.push("Dynamic difficulty adjustment tied to monetization is a deceptive practice");
  }
  if (usesPsychographic) {
    fairnessConcerns.push("Psychographic profiling may exploit vulnerable player psychological states");
    fairnessConcerns.push("Personality-based matching may create addictive gameplay loops");
  }
  if (fairnessConcerns.length === 0) {
    fairnessConcerns.push("Standard skill-based matchmaking generally meets fairness expectations");
    fairnessConcerns.push("Monitor for unintended bias in skill rating algorithms across demographics");
  }

  // Manipulation risks
  const manipulationRisks: string[] = [];
  if (riskLevel === "CRITICAL" || riskLevel === "HIGH") {
    manipulationRisks.push("Dark pattern classification risk under EU DSA and FTC enforcement");
    manipulationRisks.push("Addiction facilitation — matchmaking designed to maximize session time");
    manipulationRisks.push("Vulnerability exploitation — targeting players in losing streaks with purchase prompts");
    manipulationRisks.push("Deceptive fairness — presenting manipulated matches as skill-based");
  } else {
    manipulationRisks.push("Low manipulation risk for standard skill-based systems");
    manipulationRisks.push("Monitor for feature creep toward engagement-optimization");
  }

  // Data protection
  const dataProtection: string[] = [
    "Data minimization — collect only data necessary for matchmaking function",
    "Purpose limitation — matchmaking data must not be repurposed without consent",
    "Player right to access their matchmaking profile data",
    "Data retention limits — purge matchmaking telemetry per retention policy"
  ];
  if (usesPsychographic || usesBiometric) {
    dataProtection.push("DPIA (Data Protection Impact Assessment) required for psychographic/biometric profiling");
    dataProtection.push("Explicit consent required for processing sensitive behavioral/biometric data");
    dataProtection.push("Right to opt out of profiling-based matchmaking without service degradation");
  }

  // Transparency
  const transparency: string[] = [
    "Disclose that AI-driven matchmaking is used (not purely random or skill-based if not)",
    "Publish matchmaking methodology at a high level (skill factors, latency, etc.)",
    "Provide players access to their skill rating/MMR and factors affecting it"
  ];
  if (usesEngagement || affectsSpending) {
    transparency.push("CRITICAL: Disclose if matchmaking considers engagement metrics or spending behavior");
    transparency.push("Disclose if dynamic difficulty adjustment (DDA) is active");
    transparency.push("Regulatory expectation: players should know if match outcomes are influenced by non-skill factors");
  }

  // Remediation
  const remediation: string[] = [];
  if (riskLevel === "CRITICAL") {
    remediation.push("URGENT: Decouple matchmaking algorithm from monetization metrics immediately");
    remediation.push("Commission independent fairness audit of matchmaking system");
    remediation.push("Implement opt-out mechanism for engagement-optimized matchmaking");
    remediation.push("Conduct DPIA and update privacy notices to reflect actual data use");
  } else if (riskLevel === "HIGH") {
    remediation.push("Review matchmaking algorithm for monetization influence — document and remediate");
    remediation.push("Implement fairness metrics monitoring (win rate distribution, spending correlation)");
    remediation.push("Provide player-facing transparency about matchmaking factors");
  }
  remediation.push("Establish regular fairness audits with published methodology");
  remediation.push("Implement A/B testing ethics framework for matchmaking experiments");
  remediation.push("Create player feedback mechanism for matchmaking quality concerns");

  // CASA tier
  let casaTier = "CASA Tier 1 — Startup ($5K-$25K/yr)";
  if (riskLevel === "CRITICAL") {
    casaTier = "CASA Tier 3 — Enterprise ($75K-$200K/yr)";
  } else if (riskLevel === "HIGH") {
    casaTier = "CASA Tier 2 — Professional ($25K-$75K/yr)";
  } else if (riskLevel === "MEDIUM") {
    casaTier = "CASA Tier 2 — Professional ($25K-$75K/yr)";
  }

  return {
    system_name: systemName,
    fairness_classification: fairnessClassification,
    risk_level: riskLevel,
    applicable_regulations: regulations,
    fairness_concerns: fairnessConcerns,
    manipulation_risks: manipulationRisks,
    data_protection_requirements: dataProtection,
    transparency_requirements: transparency,
    remediation,
    casa_tier: casaTier
  };
}
