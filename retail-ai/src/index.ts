/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/retail-ai
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
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleRetailAiCompliance } from "./tools/retail-ai-compliance.js";

const server = new McpServer({
  name: "csoai-retail-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const RetailAiComplianceShape = {
  system_name: z.string().describe("Name of the retail AI system"),
  ai_function: z.string().describe("Function (dynamic pricing, recommendation, customer segmentation, checkout-free, inventory, visual search)"),
  personalization_type: z.string().describe("Personalization (individual pricing, product ranking, targeted ads, loyalty optimization)"),
  data_collection: z.string().describe("Data collected (purchase history, browsing, location, facial recognition, biometric)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US, UK, etc.)"),
};

// ─── Tool 1: retail_ai_compliance ───
(server.tool as any)(
  "retail_ai_compliance",
  "Assess regulatory compliance for AI in retail. Covers pricing algorithms, personalization, surveillance, and consumer data protection.",
  RetailAiComplianceShape,
  async (args: any) => {
    const result = handleRetailAiCompliance(args.system_name, args.ai_function, args.personalization_type, args.data_collection, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
