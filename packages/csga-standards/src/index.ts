/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csga-standards-mcp
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


import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

import {
  StandardsLookupInputSchema,
  KataAssessmentInputSchema,
  ThreatIntelInputSchema,
  IncidentResponseInputSchema,
  TrainingPathwayInputSchema,
  ComplianceCheckInputSchema,
} from "./types.js";

import {
  lookupStandard,
  searchStandards,
  getFrameworksCatalog,
  getStandardsByFocusArea,
  getAllStandards,
} from "./standards.js";

import { assessKataBelt } from "./kata.js";
import { getThreatIntelligence, searchThreats, getThreatsBySector } from "./threats.js";
import {
  getIncidentResponse,
  getIncidentEscalationPath,
} from "./incident.js";
import { getTrainingPathway } from "./training.js";
import { performComplianceCheck } from "./compliance.js";

// Create and configure the server
const server = new Server(
  {
    name: "csga-standards-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
const tools: Tool[] = [
  {
    name: "csga_standards_lookup",
    description:
      "Look up cybersecurity standards and frameworks. Returns detailed information about standards such as NIST CSF, ISO 27001, CIS Controls, and more.",
    inputSchema: {
      type: "object",
      properties: {
        standard: {
          type: "string",
          enum: [
            "CSR5",
            "NIST_CSF",
            "ISO_27001",
            "CIS_CONTROLS",
            "MITRE_ATTACK",
            "OWASP",
            "PCI_DSS",
            "HIPAA",
            "SOC_2",
          ],
          description: "Specific standard to look up",
        },
        query: {
          type: "string",
          description:
            "Search query for standards (e.g., 'access control', 'incident response')",
        },
        focus_area: {
          type: "string",
          enum: [
            "governance",
            "asset_management",
            "access_control",
            "detection_response",
            "recovery",
            "awareness_training",
          ],
          description: "Focus area for standards recommendations",
        },
      },
    },
  },
  {
    name: "csga_kata_assessment",
    description:
      "Perform K.A.T.A.™ 8-belt cyber defense assessment. Evaluates organizational cybersecurity maturity across 8 levels: White (Awareness) through Black (Leadership).",
    inputSchema: {
      type: "object",
      properties: {
        organization_description: {
          type: "string",
          description: "Description of your organization's security posture",
        },
        current_controls: {
          type: "array",
          items: { type: "string" },
          description:
            "List of currently implemented security controls (e.g., 'MFA', 'SIEM', 'EDR')",
        },
        employees_trained: {
          type: "number",
          description:
            "Number of employees who have received security training",
        },
        incident_history: {
          type: "string",
          description:
            "Brief description of past security incidents (e.g., 'None', 'Few minor incidents', 'Multiple significant breaches')",
        },
        budget_allocation: {
          type: "string",
          enum: ["Limited", "Moderate", "Substantial"],
          description: "Annual security budget allocation level",
        },
      },
      required: ["organization_description", "current_controls"],
    },
  },
  {
    name: "csga_threat_intel",
    description:
      "Get cybersecurity threat intelligence lookup. Access information about current threats, ransomware families, APT groups, CVEs, and sector-specific threats.",
    inputSchema: {
      type: "object",
      properties: {
        sector: {
          type: "string",
          enum: [
            "Finance",
            "Healthcare",
            "Energy",
            "Manufacturing",
            "Technology",
            "Government",
            "Retail",
            "Education",
            "Other",
          ],
          description: "Industry sector to focus on",
        },
        threat_type: {
          type: "string",
          enum: [
            "Ransomware",
            "APT",
            "Insider_Threat",
            "DDoS",
            "Zero_Day",
            "Phishing",
            "Supply_Chain",
            "Cloud_Threat",
          ],
          description: "Type of threat to investigate",
        },
        cve_id: {
          type: "string",
          description: "Specific CVE ID to look up (e.g., 'CVE-2024-1234')",
        },
        query: {
          type: "string",
          description: "Free-text search query for threats",
        },
      },
    },
  },
  {
    name: "csga_incident_response",
    description:
      "Get cyber incident response procedures. Provides step-by-step procedures for handling different types of security incidents.",
    inputSchema: {
      type: "object",
      properties: {
        incident_type: {
          type: "string",
          enum: [
            "Ransomware",
            "Data_Breach",
            "System_Compromise",
            "DDoS",
            "Insider_Threat",
            "Supply_Chain",
            "Malware",
            "Other",
          ],
          description: "Type of security incident",
        },
        severity: {
          type: "string",
          enum: ["Critical", "High", "Medium", "Low"],
          description: "Incident severity level",
        },
        affected_systems: {
          type: "array",
          items: { type: "string" },
          description:
            "List of affected systems (e.g., 'Web servers', 'Database servers', 'Workstations')",
        },
        affected_records: {
          type: "number",
          description:
            "Number of records affected (if data breach)",
        },
        internal_systems_only: {
          type: "boolean",
          description:
            "Whether incident is limited to internal systems only",
        },
      },
      required: ["incident_type", "severity", "affected_systems"],
    },
  },
  {
    name: "csga_training_pathway",
    description:
      "Get recommended cybersecurity training pathway. Recommends courses, certifications, and timeline based on goals and current level.",
    inputSchema: {
      type: "object",
      properties: {
        current_level: {
          type: "string",
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
          description: "Current cybersecurity skill level",
        },
        goal: {
          type: "string",
          enum: [
            "Security_Awareness",
            "System_Administrator",
            "Security_Analyst",
            "Penetration_Tester",
            "CISO",
            "Incident_Response",
            "Cloud_Security",
            "DevSecOps",
          ],
          description: "Career or skill development goal",
        },
        sector: {
          type: "string",
          description:
            "Industry sector for role-specific training recommendations",
        },
        budget_usd: {
          type: "number",
          description: "Budget available for training in USD",
        },
        learning_preference: {
          type: "string",
          enum: [
            "Self_Paced",
            "Instructor_Led",
            "Hybrid",
            "Hands_On_Lab",
          ],
          description: "Preferred learning delivery method",
        },
      },
      required: ["current_level", "goal"],
    },
  },
  {
    name: "csga_compliance_check",
    description:
      "Quick compliance check against major frameworks. Evaluates compliance status with NIST, ISO 27001, HIPAA, PCI-DSS, SOC 2, GDPR, and more.",
    inputSchema: {
      type: "object",
      properties: {
        organization_type: {
          type: "string",
          enum: [
            "Financial",
            "Healthcare",
            "Technology",
            "Retail",
            "Manufacturing",
            "Government",
            "Education",
            "Other",
          ],
          description: "Type of organization",
        },
        size: {
          type: "string",
          enum: ["Small", "Medium", "Enterprise"],
          description: "Organization size",
        },
        current_controls: {
          type: "array",
          items: { type: "string" },
          description:
            "List of currently implemented security controls",
        },
        geographic_scope: {
          type: "array",
          items: { type: "string" },
          description:
            "Geographic regions of operation (impacts GDPR, regional laws, etc.)",
        },
      },
      required: ["organization_type", "current_controls"],
    },
  },
];

// Register tools with server
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    if (name === "csga_standards_lookup") {
      const input = StandardsLookupInputSchema.parse(args);

      if (input.standard) {
        const standard = lookupStandard(input.standard);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(standard, null, 2),
            },
          ],
        };
      }

      if (input.query) {
        const results = searchStandards(input.query);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      if (input.focus_area) {
        const results = getStandardsByFocusArea(input.focus_area);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      // Default: return all standards and frameworks
      const all = getAllStandards();
      const frameworks = getFrameworksCatalog();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { standards: all, frameworks },
              null,
              2
            ),
          },
        ],
      };
    }

    if (name === "csga_kata_assessment") {
      const input = KataAssessmentInputSchema.parse(args);
      const result = assessKataBelt(input);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    if (name === "csga_threat_intel") {
      const input = ThreatIntelInputSchema.parse(args);

      if (input.query) {
        const results = searchThreats(input.query);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      if (input.sector) {
        const results = getThreatsBySector(input.sector);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      const result = getThreatIntelligence(input);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    if (name === "csga_incident_response") {
      const input = IncidentResponseInputSchema.parse(args);
      const procedure = getIncidentResponse(input);
      const escalation = getIncidentEscalationPath(input.severity);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { procedure, escalation_path: escalation },
              null,
              2
            ),
          },
        ],
      };
    }

    if (name === "csga_training_pathway") {
      const input = TrainingPathwayInputSchema.parse(args);
      const pathway = getTrainingPathway(input);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(pathway, null, 2),
          },
        ],
      };
    }

    if (name === "csga_compliance_check") {
      const input = ComplianceCheckInputSchema.parse(args);
      const result = performComplianceCheck(input);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Unknown tool: ${name}`,
        },
      ],
      isError: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${message}`,
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
  console.error("CSGA Standards MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
