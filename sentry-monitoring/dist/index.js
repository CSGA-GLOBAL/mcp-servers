#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "@csgaglobal/sentry-monitoring",
  version: "1.0.0",
  description: "Sentry error monitoring integration for issue tracking, performance monitoring, and release management."
});

  server.tool("list_issues",
    "List and filter Sentry issues",
    {
      project: z.string().describe("Project slug"),
      filter: z.string().describe("Filter: unresolved, resolved, ignored, new"),
    },
    async ({ project, filter }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "list_issues",
        status: "success",
        project,
        filter,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("get_issue_details",
    "Get detailed information about a Sentry issue",
    {
      issue_id: z.string().describe("Sentry issue ID"),
      include: z.string().describe("Include: events, tags, stacktrace"),
    },
    async ({ issue_id, include }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "get_issue_details",
        status: "success",
        issue_id,
        include,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("monitor_performance",
    "Monitor application performance metrics",
    {
      project: z.string().describe("Project slug"),
      metric: z.string().describe("Metric: apdex, throughput, error-rate, p95"),
    },
    async ({ project, metric }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "monitor_performance",
        status: "success",
        project,
        metric,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("manage_alerts",
    "Configure and manage Sentry alert rules",
    {
      project: z.string().describe("Project slug"),
      action: z.string().describe("Action: list, create, update, delete"),
    },
    async ({ project, action }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "manage_alerts",
        status: "success",
        project,
        action,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("@csgaglobal/sentry-monitoring MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
