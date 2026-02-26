import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const CrosswalkLookupShape = {
  crosswalk_id: z.string()
};

const server = new McpServer({
  name: "test",
  version: "1.0.0"
});

server.tool(
  "test",
  "Test",
  CrosswalkLookupShape,
  async (args: any) => {
    return { content: [{ type: "text", text: "test" }] };
  }
);

console.log("OK");
