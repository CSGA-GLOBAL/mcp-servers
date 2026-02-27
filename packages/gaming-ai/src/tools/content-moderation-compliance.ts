/**
 * content-moderation-compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface ContentModerationResult {
  system_name: string;
  risk_classification: string;
  risk_level: string;
  applicable_regulations: string[];
  content_safety_requirements: string[];
  minor_protection_obligations: string[];
  transparency_requirements: string[];
  appeal_process_requirements: string[];
  technical_requirements: string[];
  remediation: string[];
  casa_tier: string;
}

export function handleContentModerationCompliance(
  systemName: string,
  moderationType: string,
  contentTypes: string,
  userDemographics: string,
  jurisdiction: string
): ContentModerationResult {
  const modLower = moderationType.toLowerCase();
  const contentLower = contentTypes.toLowerCase();
  const demoLower = userDemographics.toLowerCase();
  const jurLower = jurisdiction.toLowerCase();

  // Risk classification
  let riskClassification = "Standard content moderation system";
  let riskLevel = "MEDIUM";

  const usesAI = modLower.includes("ai") || modLower.includes("automated") || modLower.includes("ml") || modLower.includes("machine learning") || modLower.includes("neural");
  const moderatesUGC = contentLower.includes("user generated") || contentLower.includes("ugc") || contentLower.includes("chat") || contentLower.includes("voice") || contentLower.includes("stream");
  const hasMinors = demoLower.includes("minor") || demoLower.includes("child") || demoLower.includes("teen") || demoLower.includes("under 18") || demoLower.includes("all ages") || demoLower.includes("mixed");
  const moderatesVoice = contentLower.includes("voice") || contentLower.includes("audio") || contentLower.includes("speech");
  const moderatesVideo = contentLower.includes("video") || contentLower.includes("stream") || contentLower.includes("camera");

  if (usesAI && hasMinors && (moderatesVoice || moderatesVideo)) {
    riskClassification = "HIGH RISK — AI moderation of audio/video content in minor-accessible environment";
    riskLevel = "CRITICAL";
  } else if (usesAI && hasMinors) {
    riskClassification = "HIGH RISK — AI content moderation in minor-accessible gaming environment";
    riskLevel = "HIGH";
  } else if (usesAI && moderatesUGC) {
    riskClassification = "ELEVATED RISK — AI-driven UGC moderation at scale";
    riskLevel = "HIGH";
  } else if (usesAI) {
    riskClassification = "MODERATE RISK — AI-assisted content moderation";
    riskLevel = "MEDIUM";
  } else {
    riskClassification = "STANDARD — Manual/rule-based content moderation";
    riskLevel = "LOW";
  }

  // Applicable regulations
  const regulations: string[] = [];

  if (jurLower.includes("eu") || jurLower.includes("europe")) {
    regulations.push("EU Digital Services Act (DSA) — Systemic platform obligations for content moderation");
    regulations.push("DSA Art. 14 — Terms of service must explain content moderation policies");
    regulations.push("DSA Art. 15 — Annual transparency reports on content moderation");
    regulations.push("DSA Art. 16-17 — Notice-and-action mechanisms and statement of reasons");
    regulations.push("DSA Art. 20 — Internal complaint-handling for moderation decisions");
    regulations.push("DSA Art. 40 — Data access for researchers on very large platforms");
    regulations.push("EU AI Act — Automated content moderation AI may require conformity assessment");
    regulations.push("GDPR — Processing of personal data in content moderation");
    if (hasMinors) {
      regulations.push("DSA Art. 28 — Enhanced minor protection obligations");
      regulations.push("EU Audiovisual Media Services Directive — Minor protection in video content");
    }
  }
  if (jurLower.includes("us") || jurLower.includes("united states")) {
    regulations.push("Section 230 CDA — Platform liability protections and limitations");
    regulations.push("FTC Act Section 5 — Deceptive practices in content moderation representations");
    regulations.push("COPPA — Children's Online Privacy Protection for under-13 data in moderation");
    regulations.push("State laws — California AB 587 (content moderation transparency), Texas HB 20, Florida SB 7072");
    if (moderatesVideo || moderatesVoice) {
      regulations.push("ECPA/Wiretap Act — Consent requirements for monitoring voice/video communications");
    }
  }
  if (jurLower.includes("uk")) {
    regulations.push("UK Online Safety Act 2023 — Duty of care for illegal and harmful content");
    regulations.push("UK Online Safety Act — Category 1 services: priority harmful content duties");
    regulations.push("Ofcom Online Safety Codes of Practice");
    if (hasMinors) {
      regulations.push("UK Age Appropriate Design Code (AADC) — Best interests of child users");
    }
  }
  if (jurLower.includes("australia")) {
    regulations.push("Australia Online Safety Act 2021 — eSafety Commissioner enforcement");
    regulations.push("Basic Online Safety Expectations (BOSE)");
  }
  if (jurLower.includes("china")) {
    regulations.push("China Cybersecurity Law — Content moderation and censorship obligations");
    regulations.push("China Algorithm Recommendation Regulation — Algorithmic transparency");
  }
  if (regulations.length === 0) {
    regulations.push("General platform terms of service obligations");
    regulations.push("Industry self-regulation (IGDA, platform-specific guidelines)");
  }

  // Content safety requirements
  const contentSafety: string[] = [
    "Implement multi-tier moderation: AI pre-screening + human review for edge cases",
    "Maintain and regularly update prohibited content taxonomy",
    "Real-time moderation for voice/text chat in multiplayer environments",
    "Content hash matching for known illegal content (CSAM, terrorism)"
  ];
  if (hasMinors) {
    contentSafety.push("CRITICAL: Enhanced moderation standards for minor-accessible content");
    contentSafety.push("Grooming detection — AI patterns for predatory communication toward minors");
    contentSafety.push("Profanity filtering with context-aware bypass prevention");
    contentSafety.push("Safe chat modes — pre-approved message options for youngest users");
  }
  if (moderatesVoice) {
    contentSafety.push("Voice moderation — real-time speech-to-text + toxicity detection");
    contentSafety.push("Voice recording consent and data retention compliance");
  }

  // Minor protection
  const minorProtection: string[] = [];
  if (hasMinors) {
    minorProtection.push("Age-appropriate content filtering based on verified age bracket");
    minorProtection.push("Social interaction restrictions for verified minors (friend requests, DMs)");
    minorProtection.push("Parental reporting dashboard for moderation actions involving their child");
    minorProtection.push("Mandatory CSAM detection and reporting to NCMEC (US) / equivalent authorities");
    minorProtection.push("Privacy-preserving minor identification (age estimation without biometric storage)");
    minorProtection.push("Designated minor safety team with specialist training");
  } else {
    minorProtection.push("Age verification to prevent minor access to unmoderated content");
    minorProtection.push("CSAM detection required regardless of target audience");
  }

  // Transparency
  const transparency: string[] = [
    "Publish content moderation policy in clear, accessible language",
    "Disclose use of AI/automated tools in content moderation decisions",
    "Publish regular transparency reports (volume, categories, outcomes, accuracy)"
  ];
  if (jurLower.includes("eu")) {
    transparency.push("DSA Art. 15 compliance — Annual transparency report to Digital Services Coordinator");
    transparency.push("DSA Art. 17 — Statement of reasons for each content moderation decision");
  }
  if (usesAI) {
    transparency.push("Disclose AI moderation accuracy rates (precision, recall, false positive rate)");
    transparency.push("Explain AI moderation methodology at a level understandable by average user");
  }

  // Appeal process
  const appeals: string[] = [
    "Provide clear appeal mechanism for all automated moderation decisions",
    "Human review available for appealed AI-driven decisions",
    "Timely resolution — respond to appeals within stated timeframe",
    "No retaliation for filing appeals (no shadow-banning appellants)"
  ];
  if (jurLower.includes("eu")) {
    appeals.push("DSA Art. 20 — Internal complaint-handling system mandatory");
    appeals.push("DSA Art. 21 — Out-of-court dispute settlement body access");
  }

  // Technical requirements
  const technical: string[] = [
    "Moderation decision logging with full audit trail",
    "Multi-language support for moderation in all supported game languages",
    "Context-aware moderation — distinguish competitive banter from genuine harassment",
    "Regular bias audits of AI moderation across demographics and languages"
  ];
  if (usesAI) {
    technical.push("Model versioning and rollback capability for moderation AI");
    technical.push("Continuous model evaluation against ground truth datasets");
    technical.push("Edge case escalation pipeline — AI confidence thresholds for human review");
    technical.push("Adversarial robustness testing — evasion attempts (l33t speak, Unicode abuse, etc.)");
  }

  // Remediation
  const remediation: string[] = [];
  if (riskLevel === "CRITICAL") {
    remediation.push("URGENT: Implement human-in-the-loop for all moderation decisions affecting minors");
    remediation.push("Commission independent audit of AI moderation accuracy and bias");
    remediation.push("Establish dedicated minor safety team with regulatory reporting protocols");
  } else if (riskLevel === "HIGH") {
    remediation.push("Implement DSA-compliant transparency reporting if operating in EU");
    remediation.push("Establish human review pipeline for high-impact moderation decisions");
    remediation.push("Conduct bias audit across language, demographic, and cultural contexts");
  }
  remediation.push("Maintain moderation decision audit log for regulatory inspection");
  remediation.push("Establish regular (quarterly) moderation accuracy review");
  remediation.push("Train moderation team on jurisdiction-specific legal requirements");

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
    risk_classification: riskClassification,
    risk_level: riskLevel,
    applicable_regulations: regulations,
    content_safety_requirements: contentSafety,
    minor_protection_obligations: minorProtection,
    transparency_requirements: transparency,
    appeal_process_requirements: appeals,
    technical_requirements: technical,
    remediation,
    casa_tier: casaTier
  };
}
