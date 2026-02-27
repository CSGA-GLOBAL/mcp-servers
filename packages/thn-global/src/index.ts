/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * thn-global-mcp
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


/**
 * THN Global MCP Server
 * Pharma AI IP engine for drug discovery and patent landscape analysis
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  PatentLandscapeInputSchema,
  DrugDiscoveryAIInputSchema,
  IPStrategyInputSchema,
  RegulatoryPathwayInputSchema,
  MarketIntelligenceInputSchema,
  CollaborationMatchInputSchema,
  validatePatentLandscapeInput,
  validateDrugDiscoveryAIInput,
  validateIPStrategyInput,
  validateRegulatoryPathwayInput,
  validateMarketIntelligenceInput,
  validateCollaborationMatchInput,
} from "./schemas.js";
import {
  patentLandscapeAnalysis,
  drugDiscoveryAI,
  ipStrategy,
  regulatoryPathway,
  marketIntelligence,
  collaborationMatch,
} from "./tools.js";

const server = new Server({
  name: "thn-global-mcp",
  version: "1.0.0",
}, {
  capabilities: { tools: {} },
});

// ============================================================================
// Tool Definitions
// ============================================================================

const TOOLS = [
  {
    name: "thn_patent_landscape",
    description:
      "Analyze patent landscape for drug discovery. Provides patent density mapping, key patent holders identification, white space opportunities, freedom-to-operate assessment, and competitive landscape analysis.",
    inputSchema: PatentLandscapeInputSchema,
  },
  {
    name: "thn_drug_discovery_ai",
    description:
      "AI-assisted drug discovery pipeline assessment. Evaluates pipeline feasibility, identifies competitive programs, estimates development timeline, determines regulatory pathway, and projects costs.",
    inputSchema: DrugDiscoveryAIInputSchema,
  },
  {
    name: "thn_ip_strategy",
    description:
      "Develop intellectual property strategy for biotech/pharma innovations. Provides IP strategy recommendations, patent filing priorities, defensive strategies, licensing opportunities, and cost projections.",
    inputSchema: IPStrategyInputSchema,
  },
  {
    name: "thn_regulatory_pathway",
    description:
      "Map regulatory pathway for drug approval. Determines FDA and EMA pathways, outlines required studies, provides timeline estimates, and identifies accelerated approval opportunities.",
    inputSchema: RegulatoryPathwayInputSchema,
  },
  {
    name: "thn_market_intelligence",
    description:
      "Pharma market intelligence and competitive analysis. Provides market sizing, key player analysis, pipeline intelligence, pricing trends, reimbursement landscape, and market access barriers.",
    inputSchema: MarketIntelligenceInputSchema,
  },
  {
    name: "thn_collaboration_match",
    description:
      "Match potential research collaborators and licensing partners. Identifies suitable partners, assesses technology and strategic fit, recommends deal structures, and references comparable transactions.",
    inputSchema: CollaborationMatchInputSchema,
  },
];

// ============================================================================
// Request Handlers
// ============================================================================

/**
 * Handle tool listing requests
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  };
});

/**
 * Handle tool execution requests
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: unknown;

    switch (name) {
      case "thn_patent_landscape": {
        const validatedInput = validatePatentLandscapeInput(args);
        result = await patentLandscapeAnalysis(validatedInput);
        break;
      }

      case "thn_drug_discovery_ai": {
        const validatedInput = validateDrugDiscoveryAIInput(args);
        result = await drugDiscoveryAI(validatedInput);
        break;
      }

      case "thn_ip_strategy": {
        const validatedInput = validateIPStrategyInput(args);
        result = await ipStrategy(validatedInput);
        break;
      }

      case "thn_regulatory_pathway": {
        const validatedInput = validateRegulatoryPathwayInput(args);
        result = await regulatoryPathway(validatedInput);
        break;
      }

      case "thn_market_intelligence": {
        const validatedInput = validateMarketIntelligenceInput(args);
        result = await marketIntelligence(validatedInput);
        break;
      }

      case "thn_collaboration_match": {
        const validatedInput = validateCollaborationMatchInput(args);
        result = await collaborationMatch(validatedInput);
        break;
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    // Return result as text content
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    // Handle validation and execution errors
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    return {
      content: [
        {
          type: "text",
          text: `Error executing tool '${name}': ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// ============================================================================
// Server Startup
// ============================================================================

/**
 * Start the MCP server
 */
async function main(): Promise<void> {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error("THN Global MCP Server started successfully");
    console.error(`Version: 1.0.0`);
    console.error(`Tools available: ${TOOLS.map((t) => t.name).join(", ")}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
