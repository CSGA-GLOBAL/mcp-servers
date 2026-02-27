#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * bmcc-cyber-mcp
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
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import {
  handleCourseCatalog,
  handleSkillAssessment,
  handleCareerPathway,
  handleCertificationPrep,
  handleLabExercise,
  handleWorkforceGap,
} from "./tools/index.js";

// Tool schemas with Zod validation
const CourseCatalogSchema = z.object({
  topic: z.string().optional().describe("Cybersecurity topic to search"),
  level: z
    .enum(["beginner", "intermediate", "advanced"])
    .optional()
    .describe("Course level"),
  focus_area: z
    .string()
    .optional()
    .describe(
      "Specific focus area (e.g., network_security, ethical_hacking, incident_response)"
    ),
});

const SkillAssessmentSchema = z.object({
  current_knowledge: z
    .array(z.string())
    .describe("Areas of current knowledge (e.g., networking, compliance)"),
  experience_years: z.number().min(0).describe("Years of IT/security experience"),
  certifications_held: z
    .array(z.string())
    .optional()
    .describe("Current certifications held"),
  career_goal: z
    .string()
    .describe("Target career role or specialization"),
});

const CareerPathwaySchema = z.object({
  current_role: z.string().describe("Current job role"),
  target_role: z.string().describe("Target job role"),
  experience: z.number().min(0).describe("Years of experience"),
  education_level: z
    .enum(["high_school", "associate", "bachelors", "masters"])
    .describe("Current education level"),
  preferred_specialization: z
    .string()
    .optional()
    .describe(
      "Preferred specialization (e.g., cloud_security, application_security)"
    ),
});

const CertificationPrepSchema = z.object({
  target_certification: z
    .enum([
      "CompTIA Security+",
      "CEH",
      "CISSP",
      "CSR5",
      "K.A.T.A. White Belt",
      "K.A.T.A. Yellow Belt",
      "K.A.T.A. Orange Belt",
      "K.A.T.A. Red Belt",
    ])
    .describe("Target certification"),
  current_level: z
    .string()
    .describe("Current level/experience with topic"),
});

const LabExerciseSchema = z.object({
  topic: z
    .string()
    .describe(
      "Lab topic (e.g., network_scanning, firewall_configuration, encryption)"
    ),
  difficulty_level: z
    .enum(["beginner", "intermediate", "advanced"])
    .describe("Difficulty level"),
  time_available: z.number().min(15).describe("Time available in minutes"),
  learning_objective: z
    .string()
    .describe("Specific learning objective for the lab"),
});

const WorkforceGapSchema = z.object({
  organization_size: z
    .enum(["startup", "small", "medium", "enterprise"])
    .describe("Organization size"),
  sector: z.string().describe("Industry sector"),
  current_team_skills: z
    .array(z.string())
    .describe("Current team skill areas"),
  region: z.string().optional().describe("Geographic region (e.g., EMEA, APAC)"),
});

// Tool definitions
const tools: Tool[] = [
  {
    name: "bmcc_course_catalog",
    description:
      "Browse the BMCC Cyber course catalog. Retrieve available courses with descriptions, prerequisites, duration, credits, and learning outcomes.",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "Cybersecurity topic to search (optional)",
        },
        level: {
          type: "string",
          enum: ["beginner", "intermediate", "advanced"],
          description: "Course level (optional)",
        },
        focus_area: {
          type: "string",
          description:
            "Specific focus area like network_security, ethical_hacking, incident_response (optional)",
        },
      },
    },
  },
  {
    name: "bmcc_skill_assessment",
    description:
      "Assess cybersecurity skill level and recommend learning path. Provides K.A.T.A. belt equivalent, recommended courses, and timeline to next certification.",
    inputSchema: {
      type: "object",
      properties: {
        current_knowledge: {
          type: "array",
          items: { type: "string" },
          description: "Areas of current knowledge",
        },
        experience_years: {
          type: "number",
          description: "Years of IT/security experience",
        },
        certifications_held: {
          type: "array",
          items: { type: "string" },
          description: "Current certifications held (optional)",
        },
        career_goal: {
          type: "string",
          description: "Target career role or specialization",
        },
      },
      required: ["current_knowledge", "experience_years", "career_goal"],
    },
  },
  {
    name: "bmcc_career_pathway",
    description:
      "Map cybersecurity career pathway with certifications, salary ranges, and job market data. Shows required BMCC courses and progression steps.",
    inputSchema: {
      type: "object",
      properties: {
        current_role: {
          type: "string",
          description: "Current job role",
        },
        target_role: {
          type: "string",
          description: "Target job role",
        },
        experience: {
          type: "number",
          description: "Years of experience",
        },
        education_level: {
          type: "string",
          enum: ["high_school", "associate", "bachelors", "masters"],
          description: "Current education level",
        },
        preferred_specialization: {
          type: "string",
          description: "Preferred specialization like cloud_security (optional)",
        },
      },
      required: ["current_role", "target_role", "experience", "education_level"],
    },
  },
  {
    name: "bmcc_certification_prep",
    description:
      "Get certification preparation guide with study plan, practice resources, exam format, and BMCC course alignment.",
    inputSchema: {
      type: "object",
      properties: {
        target_certification: {
          type: "string",
          enum: [
            "CompTIA Security+",
            "CEH",
            "CISSP",
            "CSR5",
            "K.A.T.A. White Belt",
            "K.A.T.A. Yellow Belt",
            "K.A.T.A. Orange Belt",
            "K.A.T.A. Red Belt",
          ],
          description: "Target certification",
        },
        current_level: {
          type: "string",
          description: "Current level or experience with the topic",
        },
      },
      required: ["target_certification", "current_level"],
    },
  },
  {
    name: "bmcc_lab_exercise",
    description:
      "Generate cybersecurity lab exercises with scenario, setup requirements, step-by-step instructions, and assessment criteria.",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "Lab topic like network_scanning, firewall_configuration",
        },
        difficulty_level: {
          type: "string",
          enum: ["beginner", "intermediate", "advanced"],
          description: "Difficulty level",
        },
        time_available: {
          type: "number",
          description: "Time available in minutes (minimum 15)",
        },
        learning_objective: {
          type: "string",
          description: "Specific learning objective for the lab",
        },
      },
      required: [
        "topic",
        "difficulty_level",
        "time_available",
        "learning_objective",
      ],
    },
  },
  {
    name: "bmcc_workforce_gap",
    description:
      "Analyze cybersecurity workforce gaps in organizations. Identifies critical skill shortages and recommends BMCC training investment.",
    inputSchema: {
      type: "object",
      properties: {
        organization_size: {
          type: "string",
          enum: ["startup", "small", "medium", "enterprise"],
          description: "Organization size",
        },
        sector: {
          type: "string",
          description: "Industry sector",
        },
        current_team_skills: {
          type: "array",
          items: { type: "string" },
          description: "Current team skill areas",
        },
        region: {
          type: "string",
          description: "Geographic region like EMEA, APAC (optional)",
        },
      },
      required: ["organization_size", "sector", "current_team_skills"],
    },
  },
];

// Main server setup
const server = new Server(
  {
    name: "bmcc-cyber-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { params } = request;
  const name = params.name;
  const args = params.arguments || {};

  try {
    switch (name) {
      case "bmcc_course_catalog": {
        const validated = CourseCatalogSchema.parse(args);
        const result = await handleCourseCatalog(validated);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      case "bmcc_skill_assessment": {
        const validated = SkillAssessmentSchema.parse(args);
        const result = await handleSkillAssessment(validated);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      case "bmcc_career_pathway": {
        const validated = CareerPathwaySchema.parse(args);
        const result = await handleCareerPathway(validated);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      case "bmcc_certification_prep": {
        const validated = CertificationPrepSchema.parse(args);
        const result = await handleCertificationPrep(validated);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      case "bmcc_lab_exercise": {
        const validated = LabExerciseSchema.parse(args);
        const result = await handleLabExercise(validated);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      case "bmcc_workforce_gap": {
        const validated = WorkforceGapSchema.parse(args);
        const result = await handleWorkforceGap(validated);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

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
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool ${name}: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("BMCC Cyber MCP Server started successfully");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
