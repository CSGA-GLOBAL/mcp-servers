/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * terranova-defence-mcp
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
 * Build Timestamp: 2026-02-26T05:59:00Z
 * Last Modified:   2026-02-26T05:59:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */


import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import {
  handlePQCEncrypt,
  handleNDAACompliance,
  handleCBRNAIAssess,
  handleThreatAssess,
  handleSupplyChainAudit,
  handleZeroTrustAssess,
} from "./tools/index.js";

const server = new Server({
  name: "terranova-defence-mcp",
  version: "1.0.0",
}, {
  capabilities: { tools: {} },
});

// Define all available tools
const tools: Tool[] = [
  {
    name: "terranova_pqc_encrypt",
    description:
      "Post-quantum cryptography encryption recommendation engine. Provides algorithm recommendations based on data classification level, use case, current algorithms, and deployment platform. Aligned with CNSA 2.0 and NIST Post-Quantum Cryptography standards.",
    inputSchema: {
      type: "object" as const,
      properties: {
        data_classification: {
          type: "string",
          enum: ["UNCLASSIFIED", "CUI", "SECRET", "TOP_SECRET"],
          description:
            "Data classification level (UNCLASSIFIED/CUI/SECRET/TOP_SECRET)",
        },
        use_case: {
          type: "string",
          description:
            "Primary use case (e.g., key exchange, digital signatures, hybrid encryption, blockchain)",
        },
        current_algorithms: {
          type: "string",
          description:
            "Current cryptographic algorithms in use (e.g., RSA-2048, ECDSA, SHA-256)",
        },
        platform: {
          type: "string",
          description:
            "Target deployment platform (e.g., cloud, on-premises, edge, IoT, blockchain)",
        },
      },
      required: [
        "data_classification",
        "use_case",
        "current_algorithms",
        "platform",
      ],
    },
  },
  {
    name: "terranova_ndaa_compliance",
    description:
      "NDAA Section 889 and defence procurement compliance assessment. Identifies prohibited components, evaluates supply chain compliance with NDAA requirements, and assesses CMMC readiness.",
    inputSchema: {
      type: "object" as const,
      properties: {
        organization_type: {
          type: "string",
          enum: ["contractor", "subcontractor", "vendor", "system_integrator"],
          description: "Type of defence organization",
        },
        supply_chain_components: {
          type: "array",
          items: { type: "string" },
          description:
            "List of supply chain components and their suppliers (e.g., 'Telecom: Huawei', 'Hardware: ZTE')",
        },
        country_of_origin_list: {
          type: "array",
          items: { type: "string" },
          description: "Countries of origin for components and materials",
        },
        contract_type: {
          type: "string",
          enum: ["DoD_contract", "Federal_contract", "Commercial"],
          description: "Type of government contract",
        },
      },
      required: [
        "organization_type",
        "supply_chain_components",
        "country_of_origin_list",
        "contract_type",
      ],
    },
  },
  {
    name: "terranova_cbrn_ai_assess",
    description:
      "CBRN (Chemical, Biological, Radiological, Nuclear) AI governance assessment. Evaluates dual-use risks, export control requirements (EAR/ITAR), and required safeguards for AI systems in sensitive domains.",
    inputSchema: {
      type: "object" as const,
      properties: {
        ai_system_description: {
          type: "string",
          description:
            "Description of the AI system (capabilities, algorithms, training data)",
        },
        cbrn_domain: {
          type: "string",
          enum: ["chemical", "biological", "radiological", "nuclear", "general"],
          description: "CBRN domain applicability",
        },
        deployment_context: {
          type: "string",
          description:
            "Deployment context (e.g., domestic, export, research, commercial)",
        },
      },
      required: ["ai_system_description", "cbrn_domain", "deployment_context"],
    },
  },
  {
    name: "terranova_threat_assess",
    description:
      "Defence cyber threat assessment. Analyzes threat landscape for defence organizations, identifies relevant APT groups, prioritizes attack vectors, and recommends defensive measures.",
    inputSchema: {
      type: "object" as const,
      properties: {
        organization_type: {
          type: "string",
          enum: [
            "military",
            "intelligence",
            "contractor",
            "government_agency",
            "critical_infrastructure",
          ],
          description: "Type of defence organization",
        },
        assets: {
          type: "array",
          items: { type: "string" },
          description:
            "Critical assets to protect (e.g., 'command_and_control', 'weapons_systems', 'personnel_records')",
        },
        adversary_profile: {
          type: "string",
          description:
            "Suspected adversary profile (e.g., nation-state, competitor, insider threat)",
        },
        sector: {
          type: "string",
          description:
            "Defence sector (e.g., aerospace, maritime, cyber, intelligence)",
        },
      },
      required: [
        "organization_type",
        "assets",
        "adversary_profile",
        "sector",
      ],
    },
  },
  {
    name: "terranova_supply_chain_audit",
    description:
      "Defence supply chain security audit. Evaluates vendor security, component provenance, jurisdictional risks, and compliance with Five Eyes and ITAR/EAR requirements.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vendor_list: {
          type: "array",
          items: { type: "string" },
          description: "List of vendors and suppliers",
        },
        component_types: {
          type: "array",
          items: { type: "string" },
          description:
            "Types of components supplied (e.g., semiconductors, software, subsystems)",
        },
        jurisdictions: {
          type: "array",
          items: { type: "string" },
          description: "Jurisdictions of vendors and manufacturing locations",
        },
      },
      required: ["vendor_list", "component_types", "jurisdictions"],
    },
  },
  {
    name: "terranova_zero_trust_assess",
    description:
      "Zero Trust Architecture assessment for defence organizations. Evaluates current architecture against NIST 800-207 and DoD ZTRA standards, identifies compliance gaps, and provides migration roadmap.",
    inputSchema: {
      type: "object" as const,
      properties: {
        current_architecture: {
          type: "string",
          description:
            "Description of current network architecture and security model",
        },
        network_segments: {
          type: "array",
          items: { type: "string" },
          description:
            "Current network segments and trust boundaries (e.g., 'DMZ', 'internal', 'classified')",
        },
        identity_management: {
          type: "string",
          description:
            "Current identity and access management system (e.g., Active Directory, PKI, multi-factor authentication)",
        },
        data_flows: {
          type: "string",
          description: "Description of critical data flows and assets",
        },
      },
      required: [
        "current_architecture",
        "network_segments",
        "identity_management",
        "data_flows",
      ],
    },
  },
];

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "terranova_pqc_encrypt":
        return await handlePQCEncrypt(args);
      case "terranova_ndaa_compliance":
        return await handleNDAACompliance(args);
      case "terranova_cbrn_ai_assess":
        return await handleCBRNAIAssess(args);
      case "terranova_threat_assess":
        return await handleThreatAssess(args);
      case "terranova_supply_chain_audit":
        return await handleSupplyChainAudit(args);
      case "terranova_zero_trust_assess":
        return await handleZeroTrustAssess(args);
      default:
        return {
          content: [
            {
              type: "text",
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
