/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/maritime-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
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
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleMaritimeAiCompliance } from "./tools/maritime-ai-compliance.js";

const server = new McpServer({
  name: "csoai-maritime-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const MaritimeAiComplianceShape = {
  system_name: z.string().describe("Name of maritime AI system"),
  ai_function: z.string().describe("Function (autonomous vessel/MASS, port optimization, navigation, emissions monitoring, maritime security)"),
  vessel_autonomy: z.string().describe("Autonomy degree (IMO degree 1-4, remote operated, fully autonomous, shore-based)"),
  safety_scope: z.string().describe("Safety scope (navigation, collision avoidance, crew safety, cargo, environmental)"),
  jurisdiction: z.string().describe("Operating jurisdiction (IMO, EU/EMSA, US/USCG, UK/MCA, flag state)"),
};

// ─── Tool 1: maritime_ai_compliance ───
(server.tool as any)(
  "maritime_ai_compliance",
  "Assess compliance for AI in maritime systems. Covers MASS autonomy, port management, safety, emissions, and security monitoring.",
  MaritimeAiComplianceShape,
  async (args: any) => {
    const result = handleMaritimeAiCompliance(args.system_name, args.ai_function, args.vessel_autonomy, args.safety_scope, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
