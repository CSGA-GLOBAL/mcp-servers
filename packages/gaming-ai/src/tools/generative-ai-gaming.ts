/**
 * generative-ai-gaming.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface GenerativeAiGamingResult {
  system_name: string;
  risk_classification: string;
  risk_level: string;
  applicable_regulations: string[];
  ip_copyright_risks: string[];
  content_safety_requirements: string[];
  player_data_concerns: string[];
  labeling_transparency: string[];
  technical_requirements: string[];
  remediation: string[];
  casa_tier: string;
}

export function handleGenerativeAiGaming(
  systemName: string,
  genAiFunction: string,
  trainingDataSources: string,
  outputTypes: string,
  jurisdiction: string
): GenerativeAiGamingResult {
  const funcLower = genAiFunction.toLowerCase();
  const dataLower = trainingDataSources.toLowerCase();
  const outputLower = outputTypes.toLowerCase();
  const jurLower = jurisdiction.toLowerCase();

  // Risk classification
  let riskClassification = "Standard generative AI use in gaming";
  let riskLevel = "MEDIUM";

  const generatesContent = funcLower.includes("content generation") || funcLower.includes("procedural") || funcLower.includes("level design") || funcLower.includes("world building");
  const generatesNPC = funcLower.includes("npc") || funcLower.includes("dialogue") || funcLower.includes("character") || funcLower.includes("companion") || funcLower.includes("conversational");
  const generatesArt = outputLower.includes("image") || outputLower.includes("art") || outputLower.includes("texture") || outputLower.includes("visual") || outputLower.includes("avatar");
  const generatesAudio = outputLower.includes("audio") || outputLower.includes("voice") || outputLower.includes("music") || outputLower.includes("sound");
  const usesPlayerData = dataLower.includes("player") || dataLower.includes("user") || dataLower.includes("behavioral") || dataLower.includes("gameplay");
  const usesScrapedData = dataLower.includes("scraped") || dataLower.includes("internet") || dataLower.includes("web") || dataLower.includes("public domain");
  const usesLicensedIP = dataLower.includes("licensed") || dataLower.includes("copyrighted") || dataLower.includes("third party") || dataLower.includes("franchise");
  const producesDeepfakes = funcLower.includes("deepfake") || funcLower.includes("face swap") || funcLower.includes("likeness") || funcLower.includes("celebrity");

  if (producesDeepfakes) {
    riskClassification = "CRITICAL RISK — Deepfake/likeness generation has severe legal exposure";
    riskLevel = "CRITICAL";
  } else if (generatesNPC && usesPlayerData) {
    riskClassification = "HIGH RISK — AI NPCs trained on player data raise profiling and manipulation concerns";
    riskLevel = "HIGH";
  } else if (generatesArt && usesScrapedData) {
    riskClassification = "HIGH RISK — AI-generated art from web-scraped data has IP/copyright exposure";
    riskLevel = "HIGH";
  } else if (generatesNPC) {
    riskClassification = "MODERATE RISK — Conversational AI NPCs require content safety guardrails";
    riskLevel = "MEDIUM";
  } else if (generatesContent) {
    riskClassification = "MODERATE RISK — Procedural generation with AI requires quality and safety controls";
    riskLevel = "MEDIUM";
  } else {
    riskClassification = "STANDARD — Limited-scope generative AI in gaming";
    riskLevel = "LOW";
  }

  // Applicable regulations
  const regulations: string[] = [];

  if (jurLower.includes("eu") || jurLower.includes("europe")) {
    regulations.push("EU AI Act Art. 50 — Transparency obligations for AI-generated content");
    regulations.push("EU AI Act Art. 50(2) — Deepfake labeling requirements");
    regulations.push("EU AI Act — General-purpose AI model obligations (if using foundation models)");
    regulations.push("EU Copyright Directive Art. 3-4 — Text and data mining exceptions and opt-outs");
    regulations.push("GDPR — Player data processing for AI training/personalization");
    regulations.push("EU Digital Services Act — AI-generated content on platforms");
    if (producesDeepfakes) {
      regulations.push("EU AI Act Art. 50(4) — MANDATORY deepfake disclosure obligation");
    }
  }
  if (jurLower.includes("us") || jurLower.includes("united states")) {
    regulations.push("US Copyright Office — AI-generated content copyrightability (Thaler v. Vidal, Zarya of the Dawn)");
    regulations.push("FTC — Deceptive practices if AI-generated content misrepresented as human-created");
    regulations.push("DMCA — Takedown obligations for IP-infringing generated content");
    regulations.push("State right of publicity laws — Using real person likenesses in AI generation");
    regulations.push("Section 230 — Platform liability considerations for AI-generated user content");
    if (producesDeepfakes) {
      regulations.push("California AB 602, AB 730 — Deepfake restrictions");
      regulations.push("Proposed federal DEEPFAKES Accountability Act");
      regulations.push("State right of publicity laws — Strict liability for unauthorized likeness use");
    }
  }
  if (jurLower.includes("uk")) {
    regulations.push("UK Copyright, Designs and Patents Act 1988 — AI-generated work provisions (s.9(3))");
    regulations.push("UK Online Safety Act — AI-generated harmful content obligations");
    regulations.push("UK GDPR — Data protection for AI training on player data");
  }
  if (jurLower.includes("china")) {
    regulations.push("China Deep Synthesis Regulations (2023) — AI-generated content registration and labeling");
    regulations.push("China Generative AI Measures (2023) — Service provider obligations");
  }
  if (jurLower.includes("japan")) {
    regulations.push("Japan Copyright Act Art. 30-4 — AI training data exception (broad)");
    regulations.push("Japan Cultural Affairs Agency — AI and copyright guidance");
  }
  if (regulations.length === 0) {
    regulations.push("General copyright and IP laws apply to AI-generated content");
    regulations.push("Consumer protection laws regarding AI content transparency");
  }

  // IP/Copyright risks
  const ipRisks: string[] = [];
  if (usesScrapedData) {
    ipRisks.push("CRITICAL: Web-scraped training data may include copyrighted works without license");
    ipRisks.push("Artist lawsuit exposure — ongoing litigation (Stability AI, Midjourney, etc.)");
    ipRisks.push("EU Copyright Directive Art. 4 opt-out — must honor rights holder TDM reservations");
    ipRisks.push("Output filtering required — prevent generation of substantially similar copyrighted works");
  }
  if (usesLicensedIP) {
    ipRisks.push("Verify AI training/generation is within scope of existing license agreements");
    ipRisks.push("Franchise IP protection — ensure generated content doesn't dilute or tarnish brand");
    ipRisks.push("Derivative work analysis — AI outputs may create unauthorized derivative works");
  }
  if (generatesArt) {
    ipRisks.push("AI-generated art may not be copyrightable (US Copyright Office position)");
    ipRisks.push("Style mimicry risk — generating art 'in the style of' specific artists raises legal questions");
  }
  if (generatesAudio) {
    ipRisks.push("Voice cloning restrictions — unauthorized voice likeness reproduction");
    ipRisks.push("Music generation — potential infringement of existing compositions");
  }
  if (ipRisks.length === 0) {
    ipRisks.push("Standard IP due diligence for training data provenance");
    ipRisks.push("Maintain training data documentation for regulatory compliance");
  }

  // Content safety
  const contentSafety: string[] = [
    "Implement output filtering for harmful, illegal, and inappropriate content",
    "NSFW content guardrails appropriate to game rating (ESRB/PEGI)",
    "Prevent generation of content depicting minors in harmful situations"
  ];
  if (generatesNPC) {
    contentSafety.push("NPC dialogue guardrails — prevent hate speech, harassment, inappropriate content");
    contentSafety.push("Conversational AI safety — prevent NPCs from providing harmful advice or instructions");
    contentSafety.push("Prompt injection protection — prevent players from manipulating NPC AI to bypass guardrails");
    contentSafety.push("NPC emotional manipulation guardrails — prevent parasocial relationship exploitation");
  }
  if (generatesArt) {
    contentSafety.push("Visual content filtering — prevent generation of illegal imagery");
    contentSafety.push("Real person detection — prevent unauthorized generation of real people's likenesses");
  }

  // Player data concerns
  const playerData: string[] = [];
  if (usesPlayerData) {
    playerData.push("DPIA required for using player behavioral data in AI training");
    playerData.push("Explicit consent for using gameplay data to train AI models");
    playerData.push("Purpose limitation — player data collected for gameplay must not be repurposed for AI training without consent");
    playerData.push("Right to opt out of AI training on personal gameplay data");
    playerData.push("Data anonymization requirements before use in model training");
    playerData.push("Cross-game data sharing restrictions — player data from one game used in another");
  } else {
    playerData.push("Standard data protection applies even without player data in training");
    playerData.push("Monitor for indirect player data capture through generated content interactions");
  }

  // Labeling and transparency
  const labeling: string[] = [
    "Disclose use of generative AI in game content creation (store page, EULA)",
    "Label AI-generated content as such where distinguishable from human-created content"
  ];
  if (jurLower.includes("eu")) {
    labeling.push("EU AI Act Art. 50 — Machine-readable AI content marking required");
    labeling.push("Watermarking recommended for AI-generated visual/audio assets");
  }
  if (producesDeepfakes) {
    labeling.push("MANDATORY: All synthetic media depicting real persons must be clearly labeled");
    labeling.push("Technical watermarking of all deepfake outputs (C2PA/provenance standards)");
  }
  if (generatesNPC) {
    labeling.push("Clearly indicate to players when they are interacting with AI-driven NPCs");
    labeling.push("Do not represent AI NPCs as human players or customer support agents without disclosure");
  }

  // Technical requirements
  const technical: string[] = [
    "Training data provenance documentation — maintain records of all training data sources",
    "Model versioning and reproducibility for regulatory audit",
    "Output quality controls — prevent degenerate, broken, or harmful generated content",
    "Content safety classifier on all generative outputs before player exposure"
  ];
  if (generatesNPC) {
    technical.push("Conversation logging for NPC interactions (safety audit trail)");
    technical.push("Rate limiting on NPC interactions to prevent abuse");
    technical.push("Fallback to scripted responses when AI confidence is low");
  }
  if (generatesArt || generatesAudio) {
    technical.push("IP similarity detection — compare outputs against known copyrighted works");
    technical.push("C2PA content provenance metadata embedding in generated assets");
  }

  // Remediation
  const remediation: string[] = [];
  if (riskLevel === "CRITICAL") {
    remediation.push("URGENT: Legal review of deepfake/likeness generation — obtain explicit rights or cease");
    remediation.push("Implement mandatory content labeling per EU AI Act Art. 50");
    remediation.push("Conduct comprehensive IP audit of all training data sources");
  } else if (riskLevel === "HIGH") {
    remediation.push("Conduct training data IP audit — verify rights for all scraped/collected data");
    remediation.push("Implement player data consent mechanism for AI training");
    remediation.push("Deploy output filtering for IP-infringing and harmful content");
  }
  remediation.push("Establish AI content governance committee with legal, creative, and safety representation");
  remediation.push("Regular red-teaming of generative AI outputs for safety and IP risks");
  remediation.push("Monitor evolving copyright law positions on AI-generated content");
  remediation.push("Maintain training data records for regulatory compliance (EU AI Act Art. 53)");

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
    ip_copyright_risks: ipRisks,
    content_safety_requirements: contentSafety,
    player_data_concerns: playerData,
    labeling_transparency: labeling,
    technical_requirements: technical,
    remediation,
    casa_tier: casaTier
  };
}
