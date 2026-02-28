/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csoai-red-team-ops-mcp
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
import { handleredteamopsAssessment } from "./tools/red-team-ops-assessment.js";
import { handleredteamopsScan } from "./tools/red-team-ops-scan.js";

const server = new McpServer({
  name: "csoai-red-team-ops-mcp",
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

server.tool("red_team_ops_assessment", "Run Red Team Ops assessment against target", AssessmentShape, handleredteamopsAssessment);
server.tool("red_team_ops_scan", "Run Red Team Ops scan on target", ScanShape, handleredteamopsScan);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("csoai-red-team-ops-mcp running on stdio");
}

main().catch((error) => {
  console.error("Fatal:", error);
  process.exit(1);
});
