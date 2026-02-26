/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csoai-employment-ai-mcp
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
import { handleHiringAiCompliance } from "./tools/hiring-ai-compliance.js";
import { handleWorkplaceSurveillance } from "./tools/workplace-surveillance.js";

const server = new McpServer({
  name: "csoai-employment-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const HiringShape = {
  system_name: z.string().describe("Name of the hiring AI system"),
  ai_function: z.string().describe("AI function (resume screening, video interview analysis, candidate ranking, skills assessment)"),
  data_inputs: z.string().describe("Data inputs used (resumes, video, assessments, social media, etc.)"),
  jurisdiction: z.string().describe("Operating jurisdiction (US/NYC, EU, UK, etc.)")
};

const SurveillanceShape = {
  system_name: z.string().describe("Name of the workplace monitoring system"),
  monitoring_type: z.string().describe("Type of monitoring (productivity, email, keystrokes, video, emotion, location)"),
  data_collected: z.string().describe("Data collected about employees"),
  jurisdiction: z.string().describe("Operating jurisdiction")
};

(server.tool as any)(
  "hiring_ai_compliance",
  "Assess regulatory compliance for AI-based hiring, recruitment, and selection systems. Covers NYC Local Law 144, EEOC guidance, EU AI Act employment provisions, bias auditing, and candidate rights.",
  HiringShape,
  async (args: any) => {
    const result = handleHiringAiCompliance(args.system_name, args.ai_function, args.data_inputs, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

(server.tool as any)(
  "workplace_surveillance_compliance",
  "Assess compliance for AI-based workplace monitoring and surveillance systems. Covers EU AI Act prohibitions, employee rights, proportionality, and Platform Workers Directive.",
  SurveillanceShape,
  async (args: any) => {
    const result = handleWorkplaceSurveillance(args.system_name, args.monitoring_type, args.data_collected, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.resource(
  "employment://regulations/index",
  "Complete index of employment AI regulatory frameworks",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `CSOAI Employment AI Regulatory Landscape

EU AI ACT:
- Annex III 4(a): HIGH RISK — AI for recruitment and selection
- Annex III 4(b): HIGH RISK — AI affecting work relationship terms
- Article 5(1)(f): PROHIBITED — Emotion recognition in workplace

US FEDERAL:
- Title VII — Disparate impact from AI hiring tools
- ADA — AI accommodation requirements
- ADEA — Age discrimination in AI hiring
- EEOC AI Guidance (2023) — Technical assistance on AI

US STATE/LOCAL:
- NYC Local Law 144 — AEDT bias audit requirement
- Illinois AI Video Interview Act
- Colorado SB 21-169
- California FEHA

EU:
- Platform Workers Directive (2024)
- GDPR Article 22 & Article 88
- Employment Equality Directive 2000/78/EC`;
    return { contents: [{ uri: uri.href, text, mimeType: "text/plain" }] };
  }
);

server.resource(
  "employment://tools/guide",
  "Guide to Employment AI MCP Server tools",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `Employment AI MCP Server — Tool Guide

1. hiring_ai_compliance — Hiring AI bias audit and regulatory compliance
2. workplace_surveillance_compliance — Workplace monitoring compliance

RESOURCES:
- employment://regulations/index — Regulatory landscape
- employment://tools/guide — This guide`;
    return { contents: [{ uri: uri.href, text, mimeType: "text/plain" }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
