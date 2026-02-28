/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csoai-dsrb-defence-mcp
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * Build Timestamp: 2026-02-28T12:30:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handledsrbdefenceAssessment } from "./tools/dsrb-defence-assessment.js";
import { handledsrbdefenceScan } from "./tools/dsrb-defence-scan.js";

const server = new McpServer({
  name: "csoai-dsrb-defence-mcp",
  version: "1.0.0"
});

const AssessmentShape = {
  target: z.string().describe("Target system, asset, or scope to assess"),
  context: z.string().describe("Operational context and environment details"),
  scope: z.string().describe("Assessment scope (full, targeted, quick)").default("full"),
  framework: z.string().describe("Compliance framework to use").optional()
};

const ScanShape = {
  target: z.string().describe("Target system, network, or asset to scan"),
  depth: z.string().describe("Scan depth (surface, standard, deep)").default("standard"),
  output_format: z.string().describe("Output format (summary, detailed, json)").default("detailed")
};

server.tool("dsrb_defence_assessment", "Run DSRB Defence assessment against target", AssessmentShape, handledsrbdefenceAssessment);
server.tool("dsrb_defence_scan", "Run DSRB Defence scan on target", ScanShape, handledsrbdefenceScan);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("csoai-dsrb-defence-mcp running on stdio");
}

main().catch((error) => {
  console.error("Fatal:", error);
  process.exit(1);
});
