/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csoai-secure-comms-mcp
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
import { handlesecurecommsAssessment } from "./tools/secure-comms-assessment.js";
import { handlesecurecommsScan } from "./tools/secure-comms-scan.js";

const server = new McpServer({
  name: "csoai-secure-comms-mcp",
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

server.tool("secure_comms_assessment", "Run Secure Comms assessment against target", AssessmentShape, handlesecurecommsAssessment);
server.tool("secure_comms_scan", "Run Secure Comms scan on target", ScanShape, handlesecurecommsScan);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("csoai-secure-comms-mcp running on stdio");
}

main().catch((error) => {
  console.error("Fatal:", error);
  process.exit(1);
});
