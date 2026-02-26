/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csoai-gaming-ai-mcp
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T05:59:00Z
 * Last Modified:   2026-02-26T05:59:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */


import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleLootBoxCompliance } from "./tools/loot-box-compliance.js";
import { handleMatchmakingAiAssessment } from "./tools/matchmaking-ai-assessment.js";
import { handleContentModerationCompliance } from "./tools/content-moderation-compliance.js";
import { handleGenerativeAiGaming } from "./tools/generative-ai-gaming.js";

const server = new McpServer({
  name: "csoai-gaming-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const LootBoxShape = {
  system_name: z.string().describe("Name of the gaming system or title"),
  mechanic_type: z.string().describe("Type of randomized mechanic (loot box, gacha, mystery box, card pack, battle pass random rewards)"),
  target_audience: z.string().describe("Target audience (all ages, teen, mature, children, E for Everyone, etc.)"),
  monetization_model: z.string().describe("Monetization model (real money purchase, virtual currency, trading/marketplace, free-to-play, subscription)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US, Belgium, Netherlands, UK, China, Japan, Australia, etc.)")
};

const MatchmakingShape = {
  system_name: z.string().describe("Name of the matchmaking system"),
  matchmaking_type: z.string().describe("Type of matchmaking (skill/ELO-based, engagement-optimized/EOMM, retention-based, session-based, hybrid)"),
  data_inputs: z.string().describe("Data inputs used (skill rating, play history, spending data, behavioral patterns, psychographic profiles, biometric)"),
  monetization_impact: z.string().describe("How matchmaking affects monetization (none, indirect spending influence, direct revenue optimization, pay-to-win pairing)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US, UK, China, etc.)")
};

const ContentModShape = {
  system_name: z.string().describe("Name of the content moderation system"),
  moderation_type: z.string().describe("Type of moderation (AI/automated, manual, hybrid, rule-based, ML-based)"),
  content_types: z.string().describe("Content types moderated (text chat, voice chat, UGC, video/streaming, images, user profiles)"),
  user_demographics: z.string().describe("User demographics (all ages, minors present, adults only, mixed, teen-focused)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US, UK, Australia, China, etc.)")
};

const GenAiShape = {
  system_name: z.string().describe("Name of the generative AI gaming system"),
  gen_ai_function: z.string().describe("AI function (NPC dialogue/companion, procedural content generation, art/texture generation, level design, voice synthesis, deepfake/likeness)"),
  training_data_sources: z.string().describe("Training data sources (player behavioral data, web-scraped, licensed IP, internal assets, public domain)"),
  output_types: z.string().describe("Output types (text/dialogue, images/art, audio/voice, 3D models, level geometry, mixed)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US, UK, China, Japan, etc.)")
};

// ─── Tool 1: Loot Box Compliance ───
(server.tool as any)(
  "loot_box_compliance",
  "Assess regulatory compliance for loot boxes, gacha, and randomized monetization mechanics in games. Covers Belgium/Netherlands gambling classification, COPPA, FTC, consumer protection, and minor safeguards.",
  LootBoxShape,
  async (args: any) => {
    const result = handleLootBoxCompliance(args.system_name, args.mechanic_type, args.target_audience, args.monetization_model, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Tool 2: Matchmaking AI Assessment ───
(server.tool as any)(
  "matchmaking_ai_assessment",
  "Assess fairness, manipulation risks, and regulatory compliance for AI-driven matchmaking systems. Covers EOMM, engagement optimization, dark patterns, EU DSA, FTC, and player data protection.",
  MatchmakingShape,
  async (args: any) => {
    const result = handleMatchmakingAiAssessment(args.system_name, args.matchmaking_type, args.data_inputs, args.monetization_impact, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Tool 3: Content Moderation Compliance ───
(server.tool as any)(
  "game_content_moderation",
  "Assess compliance for AI-based content moderation in gaming. Covers EU DSA obligations, UK Online Safety Act, minor protection, UGC moderation, voice/text chat monitoring, and appeal processes.",
  ContentModShape,
  async (args: any) => {
    const result = handleContentModerationCompliance(args.system_name, args.moderation_type, args.content_types, args.user_demographics, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Tool 4: Generative AI in Gaming ───
(server.tool as any)(
  "generative_ai_gaming",
  "Assess IP, copyright, safety, and regulatory compliance for generative AI in games. Covers AI NPCs, procedural generation, AI art/audio, training data rights, EU AI Act labeling, deepfake restrictions, and player data use.",
  GenAiShape,
  async (args: any) => {
    const result = handleGenerativeAiGaming(args.system_name, args.gen_ai_function, args.training_data_sources, args.output_types, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Resource 1: Gaming AI Regulatory Landscape ───
server.resource(
  "gaming://regulations/index",
  "Complete index of gaming and entertainment AI regulatory frameworks worldwide",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `CSOAI Gaming & Entertainment AI Regulatory Landscape

LOOT BOX & MONETIZATION:
- Belgium Gaming Commission — Loot boxes classified as gambling (2018)
- Netherlands Kansspelautoriteit — Transferable items = gambling
- UK Gambling Commission — Monitoring, DCMS review (2022)
- FTC — Industry commitment to odds disclosure (2019)
- China MIIT — Mandatory odds disclosure (2017)
- Japan — Kompu gacha banned (2012), JOGA self-regulation
- Australia Senate Report — Recommended gambling classification

CONTENT MODERATION:
- EU Digital Services Act (DSA) — Platform content obligations
- UK Online Safety Act 2023 — Duty of care
- Australia Online Safety Act 2021 — eSafety Commissioner
- US Section 230 CDA — Platform liability framework
- China Cybersecurity Law — Content obligations

AI & MATCHMAKING:
- EU AI Act — AI-driven matchmaking and personalization
- EU DSA Art. 25 — Dark pattern prohibition
- FTC Act Section 5 — Unfair/deceptive matchmaking
- GDPR Art. 22 — Automated decision-making rights

GENERATIVE AI IN GAMING:
- EU AI Act Art. 50 — AI content transparency/labeling
- EU Copyright Directive Art. 3-4 — TDM exceptions
- US Copyright Office — AI-generated content policy
- China Deep Synthesis Regulations (2023)
- China Generative AI Measures (2023)

MINOR PROTECTION:
- COPPA — Children under 13 (US)
- UK Age Appropriate Design Code (AADC)
- EU DSA Art. 28 — Enhanced minor protection
- ESRB, PEGI — Age rating disclosure systems
- China Anti-Addiction System — Minor gaming limits

INDUSTRY SELF-REGULATION:
- ESRB Loot Box Disclosure Requirements
- PEGI In-Game Purchase Labels
- IGDA Responsible Design Guidelines
- ISFE Player Protection Commitments
- Apple App Store / Google Play Store policies`;
    return { contents: [{ uri: uri.href, text, mimeType: "text/plain" }] };
  }
);

// ─── Resource 2: Tools Guide ───
server.resource(
  "gaming://tools/guide",
  "Guide to all Gaming AI MCP Server tools and capabilities",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `CSOAI Gaming & Entertainment AI MCP Server — Tool Guide

AVAILABLE TOOLS:

1. loot_box_compliance
   Purpose: Assess gambling classification and regulatory compliance for loot boxes, gacha, and randomized monetization
   Inputs: System name, mechanic type, target audience, monetization model, jurisdiction
   Output: Gambling classification, risk level, regulations, minor protection, disclosure requirements, remediation

2. matchmaking_ai_assessment
   Purpose: Assess fairness and manipulation risks for AI-driven matchmaking systems
   Inputs: System name, matchmaking type, data inputs, monetization impact, jurisdiction
   Output: Fairness classification, manipulation risks, data protection, transparency, remediation

3. game_content_moderation
   Purpose: Assess compliance for AI content moderation in gaming environments
   Inputs: System name, moderation type, content types, user demographics, jurisdiction
   Output: Risk classification, content safety, minor protection, transparency, appeal process, remediation

4. generative_ai_gaming
   Purpose: Assess IP, copyright, safety, and regulatory compliance for generative AI in games
   Inputs: System name, AI function, training data sources, output types, jurisdiction
   Output: Risk classification, IP risks, content safety, player data, labeling, remediation

WORKFLOW:
1. Run loot_box_compliance → Monetization risk assessment
2. Run matchmaking_ai_assessment → Fairness and dark pattern check
3. Run game_content_moderation → UGC and chat safety compliance
4. Run generative_ai_gaming → AI content creation risks
5. Cross-reference with CSOAI governance server for CASA certification

RESOURCES:
- gaming://regulations/index — Complete regulatory landscape
- gaming://tools/guide — This guide`;
    return { contents: [{ uri: uri.href, text, mimeType: "text/plain" }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
