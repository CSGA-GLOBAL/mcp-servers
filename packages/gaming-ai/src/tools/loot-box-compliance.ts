/**
 * loot-box-compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface LootBoxResult {
  system_name: string;
  gambling_classification: string;
  risk_level: string;
  applicable_regulations: string[];
  minor_protection_requirements: string[];
  disclosure_requirements: string[];
  technical_requirements: string[];
  enforcement_risks: string[];
  remediation: string[];
  casa_tier: string;
}

export function handleLootBoxCompliance(
  systemName: string,
  mechanicType: string,
  targetAudience: string,
  monetizationModel: string,
  jurisdiction: string
): LootBoxResult {
  const mechLower = mechanicType.toLowerCase();
  const audLower = targetAudience.toLowerCase();
  const monLower = monetizationModel.toLowerCase();
  const jurLower = jurisdiction.toLowerCase();

  // Gambling classification assessment
  let gamblingClassification = "Not classified as gambling under current framework";
  let riskLevel = "MEDIUM";

  const hasRealMoney = monLower.includes("real money") || monLower.includes("paid") || monLower.includes("purchase");
  const hasRandomOutcome = mechLower.includes("random") || mechLower.includes("loot box") || mechLower.includes("gacha") || mechLower.includes("mystery");
  const hasTrading = monLower.includes("trading") || monLower.includes("marketplace") || monLower.includes("secondary market") || monLower.includes("cash out");
  const targetsMinors = audLower.includes("child") || audLower.includes("minor") || audLower.includes("teen") || audLower.includes("under 18") || audLower.includes("all ages") || audLower.includes("e for everyone");

  if (hasRealMoney && hasRandomOutcome && hasTrading) {
    gamblingClassification = "HIGH RISK — Likely classified as gambling (real money + random outcome + cash-out mechanism)";
    riskLevel = "CRITICAL";
  } else if (hasRealMoney && hasRandomOutcome) {
    gamblingClassification = "ELEVATED RISK — Potential gambling classification (real money + random outcome)";
    riskLevel = "HIGH";
  } else if (hasRandomOutcome && targetsMinors) {
    gamblingClassification = "ELEVATED RISK — Randomized mechanics targeting minors (regulatory scrutiny increasing)";
    riskLevel = "HIGH";
  } else if (hasRandomOutcome) {
    gamblingClassification = "MODERATE RISK — Randomized mechanics present (monitor regulatory developments)";
    riskLevel = "MEDIUM";
  } else {
    riskLevel = "LOW";
  }

  // Jurisdiction-specific regulations
  const regulations: string[] = [];

  if (jurLower.includes("belgium") || jurLower.includes("eu") || jurLower.includes("europe")) {
    regulations.push("Belgium Gaming Commission — Loot boxes classified as gambling (2018 ruling)");
    regulations.push("Belgium Criminal Code Art. 4 — Operating gambling without license: up to €800K fine + imprisonment");
  }
  if (jurLower.includes("netherlands") || jurLower.includes("eu") || jurLower.includes("europe")) {
    regulations.push("Netherlands Kansspelautoriteit (KSA) — Loot boxes may constitute gambling if items transferable");
    regulations.push("Netherlands Betting and Gaming Act (Wet op de kansspelen) — License required for games of chance");
  }
  if (jurLower.includes("eu") || jurLower.includes("europe")) {
    regulations.push("EU Digital Services Act (DSA) — Platform obligations for online gaming content");
    regulations.push("EU Consumer Rights Directive 2011/83/EU — Transparency in digital purchases");
    regulations.push("EU AI Act — AI-driven dynamic pricing/personalization in gaming may be high-risk");
    regulations.push("EU Unfair Commercial Practices Directive 2005/29/EC — Misleading/aggressive practices");
  }
  if (jurLower.includes("uk") || jurLower.includes("united kingdom") || jurLower.includes("britain")) {
    regulations.push("UK Gambling Act 2005 — Gambling Commission oversight");
    regulations.push("UK DCMS Loot Box Review (2022) — Government monitoring, potential future regulation");
    regulations.push("UK Online Safety Act 2023 — Child safety obligations for gaming platforms");
  }
  if (jurLower.includes("us") || jurLower.includes("united states") || jurLower.includes("america")) {
    regulations.push("FTC Act Section 5 — Unfair or deceptive acts in loot box mechanics");
    regulations.push("COPPA — Children's Online Privacy Protection Act (under-13 data collection)");
    regulations.push("State gambling laws — Varies by state; Hawaii, Minnesota proposed loot box bills");
    regulations.push("FTC Enforcement (2019) — Industry commitment to disclose loot box odds");
  }
  if (jurLower.includes("australia")) {
    regulations.push("Australian Senate Report (2018) — Recommended loot boxes be regulated as gambling");
    regulations.push("Interactive Gambling Act 2001 — Potential applicability to loot boxes");
  }
  if (jurLower.includes("japan")) {
    regulations.push("Japan Consumer Affairs Agency — Complete gacha (kompu gacha) banned since 2012");
    regulations.push("JOGA (Japan Online Game Association) — Industry self-regulation guidelines");
  }
  if (jurLower.includes("china")) {
    regulations.push("China MIIT Regulations — Must disclose all loot box odds (mandatory since 2017)");
    regulations.push("China Anti-Addiction System — Minors limited to 3 hours/week gaming");
    regulations.push("China Virtual Currency Regulations — Restrictions on virtual item trading");
  }
  if (regulations.length === 0) {
    regulations.push("General consumer protection laws apply");
    regulations.push("Industry self-regulation (ESRB, PEGI rating disclosures)");
  }

  // Minor protection
  const minorProtection: string[] = [];
  if (targetsMinors) {
    minorProtection.push("CRITICAL: Implement robust age verification before any paid randomized content");
    minorProtection.push("COPPA compliance required for under-13 users — verifiable parental consent");
    minorProtection.push("Parental spending controls mandatory — configurable spending limits");
    minorProtection.push("No targeted advertising of paid loot boxes to identified minors");
    minorProtection.push("Clear, age-appropriate disclosure of randomized nature of purchases");
    minorProtection.push("Cooling-off period recommended for minor purchases");
  } else {
    minorProtection.push("Age-gate verification to prevent minor access to paid randomized mechanics");
    minorProtection.push("Parental control integration recommended even for adult-targeted games");
    minorProtection.push("Monitor for actual minor usage regardless of target audience designation");
  }

  // Disclosure requirements
  const disclosures: string[] = [
    "Disclose individual item drop rates/probabilities before purchase",
    "Display total cost transparency — no hidden fees or currency obfuscation",
    "Clearly distinguish between cosmetic and gameplay-affecting items",
    "Provide purchase history and spending summary accessible to users"
  ];
  if (hasRealMoney) {
    disclosures.push("Real-money transaction disclosures per applicable consumer protection law");
    disclosures.push("Refund policy must be clearly stated before first purchase");
  }
  if (hasTrading) {
    disclosures.push("Secondary market risks disclosure required");
    disclosures.push("Item value volatility warnings for tradeable items");
  }

  // Technical requirements
  const technical: string[] = [
    "Implement verified random number generation (provably fair systems recommended)",
    "Server-side probability enforcement — no client-side manipulation",
    "Anti-fraud and anti-bot protections for marketplace systems",
    "Spending limit controls — daily/weekly/monthly caps configurable by user"
  ];
  if (targetsMinors) {
    technical.push("Age verification integration (identity verification for purchases)");
    technical.push("Parental dashboard with spending alerts and approval workflows");
  }
  if (hasTrading) {
    technical.push("AML/KYC integration for secondary market transactions above thresholds");
    technical.push("Trade monitoring for market manipulation detection");
  }

  // Enforcement risks
  const enforcement: string[] = [];
  if (riskLevel === "CRITICAL") {
    enforcement.push("CRITICAL: Belgium/Netherlands may issue gambling violation fines (€100K-€800K+)");
    enforcement.push("Potential criminal liability for operators in strict gambling jurisdictions");
    enforcement.push("Class action exposure from consumer protection violations");
    enforcement.push("Platform delisting risk (Apple/Google policy violations)");
  } else if (riskLevel === "HIGH") {
    enforcement.push("Regulatory investigation risk in EU jurisdictions with active enforcement");
    enforcement.push("FTC enforcement action risk for deceptive practices targeting minors");
    enforcement.push("Reputational damage from advocacy group campaigns");
    enforcement.push("ESRB/PEGI rating escalation risk affecting market access");
  } else {
    enforcement.push("Monitor evolving regulatory landscape — multiple jurisdictions considering new rules");
    enforcement.push("Industry self-regulation compliance recommended to preempt legislation");
  }

  // Remediation
  const remediation: string[] = [
    "Publish complete probability tables for all randomized mechanics",
    "Implement spending caps with opt-in removal for verified adults",
    "Conduct annual responsible design audit per IGDA/ISFE guidelines"
  ];
  if (riskLevel === "CRITICAL" || riskLevel === "HIGH") {
    remediation.unshift("URGENT: Obtain legal opinion on gambling classification in each operating jurisdiction");
    remediation.push("Consider removing cash-out/trading mechanisms to reduce gambling classification risk");
    remediation.push("Engage with gambling regulators proactively before enforcement action");
  }
  if (targetsMinors) {
    remediation.push("Commission independent child safety impact assessment");
    remediation.push("Implement COPPA-compliant data practices with annual third-party audit");
  }

  // CASA tier
  let casaTier = "CASA Tier 2 — Professional ($25K-$75K/yr)";
  if (riskLevel === "CRITICAL") {
    casaTier = "CASA Tier 3 — Enterprise ($75K-$200K/yr)";
  } else if (riskLevel === "LOW") {
    casaTier = "CASA Tier 1 — Startup ($5K-$25K/yr)";
  }

  return {
    system_name: systemName,
    gambling_classification: gamblingClassification,
    risk_level: riskLevel,
    applicable_regulations: regulations,
    minor_protection_requirements: minorProtection,
    disclosure_requirements: disclosures,
    technical_requirements: technical,
    enforcement_risks: enforcement,
    remediation,
    casa_tier: casaTier
  };
}
