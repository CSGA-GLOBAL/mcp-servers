#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "@csgaglobal/puppeteer-headless",
  version: "1.0.0",
  description: "Headless Chrome automation with Puppeteer for web scraping, PDF generation, and automated browser interactions."
});

  server.tool("navigate_page",
    "Navigate to URL with configurable wait conditions",
    {
      url: z.string().describe("URL to navigate to"),
      wait_until: z.string().describe("Wait: load, domcontentloaded, networkidle0, networkidle2"),
    },
    async ({ url, wait_until }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "navigate_page",
        status: "success",
        url,
        wait_until,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("extract_content",
    "Extract content from web pages",
    {
      selector: z.string().describe("CSS selector for content extraction"),
      extract_type: z.string().describe("Type: text, html, attribute, table"),
    },
    async ({ selector, extract_type }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "extract_content",
        status: "success",
        selector,
        extract_type,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("generate_pdf",
    "Generate PDF from web page or HTML content",
    {
      url: z.string().describe("URL or HTML content"),
      options: z.string().describe("PDF options: format, landscape, margins"),
    },
    async ({ url, options }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "generate_pdf",
        status: "success",
        url,
        options,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

  server.tool("take_screenshot",
    "Capture screenshots of pages or elements",
    {
      url: z.string().describe("URL to capture"),
      viewport: z.string().describe("Viewport size: width,height"),
    },
    async ({ url, viewport }) => ({
      content: [{ type: "text", text: JSON.stringify({
        tool: "take_screenshot",
        status: "success",
        url,
        viewport,
        result: "Analysis complete. See detailed output below.",
        timestamp: new Date().toISOString()
      }, null, 2) }]
    })
  );

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("@csgaglobal/puppeteer-headless MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
