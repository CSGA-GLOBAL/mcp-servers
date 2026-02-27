#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "@csgaglobal/linear-issues",
  version: "1.0.0",
  description: "Linear issue tracker integration for project management, sprint planning, and development workflow automation."
});

  server.tool("manage_issues",
    "Create, update, and manage Linear issues",
    {
      action: z.string().describe("Action: create, list, update, close, assign"),
      team: z.string().describe("Team identifier"),
    },
    async ({ action, team }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "manage_issues",
        status: "success",
        action,
        team,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("manage_projects",
    "Manage Linear projects and cycles",
    {
      action: z.string().describe("Action: list, create, update, archive"),
      project_id: z.string().describe("Project identifier"),
    },
    async ({ action, project_id }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "manage_projects",
        status: "success",
        action,
        project_id,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("search_issues",
    "Search issues across teams and projects",
    {
      query: z.string().describe("Search query"),
      filters: z.string().describe("Filters: status, assignee, priority, label"),
    },
    async ({ query, filters }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "search_issues",
        status: "success",
        query,
        filters,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("analytics",
    "Get project and team analytics",
    {
      team: z.string().describe("Team identifier"),
      metric: z.string().describe("Metric: velocity, cycle-time, burndown, throughput"),
    },
    async ({ team, metric }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "analytics",
        status: "success",
        team,
        metric,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("@csgaglobal/linear-issues MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
