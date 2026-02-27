/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * digital-human-library-mcp
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
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { mentorMatch } from "./tools/mentor-match.js";
import { curriculumAlign } from "./tools/curriculum-align.js";
import { impactReport } from "./tools/impact-report.js";
import { sessionPlan } from "./tools/session-plan.js";
import { programDesign } from "./tools/program-design.js";
import { careerExplorer } from "./tools/career-explorer.js";

import {
  MentorMatchInputSchema,
  CurriculumAlignInputSchema,
  ImpactReportInputSchema,
  SessionPlanInputSchema,
  ProgramDesignInputSchema,
  CareerExplorerInputSchema,
} from "./types.js";

// ============================================================================
// SERVER INITIALIZATION
// ============================================================================

const server = new Server(
  {
    name: "digital-human-library-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============================================================================
// TOOL DEFINITIONS
// ============================================================================

const tools: Tool[] = [
  {
    name: "dhl_mentor_match",
    description:
      "Match students and classes with industry mentors based on grade level, subject area, learning objectives, location, and session type. Returns matched mentors with expertise profiles, availability, session format recommendations, and curriculum alignment insights.",
    inputSchema: {
      type: "object",
      properties: {
        grade_level: {
          type: "string",
          enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          description: "Student grade level (K-12)",
        },
        subject_area: {
          type: "string",
          enum: [
            "Mathematics",
            "Science",
            "Technology",
            "Engineering",
            "Business",
            "Environmental",
            "Healthcare",
            "Agriculture",
            "Arts",
            "Language Arts",
            "Social Studies",
            "Computer Science",
            "Entrepreneurship",
            "Communications",
          ],
          description: "Subject area for mentoring",
        },
        learning_objectives: {
          type: "array",
          items: { type: "string" },
          description: "Specific learning objectives to achieve",
        },
        location: {
          type: "string",
          enum: [
            "Northeast",
            "Southeast",
            "Midwest",
            "Southwest",
            "West",
            "Pacific",
            "British Columbia",
            "Alberta",
            "Saskatchewan",
            "Manitoba",
            "Ontario",
            "Quebec",
            "Atlantic",
          ],
          description: "Geographic region or province/state",
        },
        session_type: {
          type: "string",
          enum: ["virtual", "in_person", "hybrid"],
          description: "Preferred session format",
        },
      },
      required: [
        "grade_level",
        "subject_area",
        "learning_objectives",
        "location",
        "session_type",
      ],
    },
  },
  {
    name: "dhl_curriculum_align",
    description:
      "Align mentoring sessions with curriculum standards and learning outcomes. Returns aligned standards, cross-curricular connections, assessment rubrics, and pre/post session activities.",
    inputSchema: {
      type: "object",
      properties: {
        province_or_state: {
          type: "string",
          description:
            "Province or state for curriculum standards (e.g., 'Ontario', 'California', 'Massachusetts')",
        },
        grade_level: {
          type: "string",
          enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          description: "Grade level for curriculum alignment",
        },
        subject: {
          type: "string",
          enum: [
            "Mathematics",
            "Science",
            "Technology",
            "Engineering",
            "Business",
            "Environmental",
            "Healthcare",
            "Agriculture",
            "Arts",
            "Language Arts",
            "Social Studies",
            "Computer Science",
            "Entrepreneurship",
            "Communications",
          ],
          description: "Subject area",
        },
        learning_outcomes: {
          type: "array",
          items: { type: "string" },
          description: "Desired learning outcomes",
        },
        duration: {
          type: "number",
          description: "Session duration in minutes (30-480)",
        },
      },
      required: [
        "province_or_state",
        "grade_level",
        "subject",
        "learning_outcomes",
        "duration",
      ],
    },
  },
  {
    name: "dhl_impact_report",
    description:
      "Generate comprehensive mentoring impact and engagement reports for schools. Returns student engagement metrics, learning outcome improvements, satisfaction scores, mentor effectiveness ratings, and program ROI.",
    inputSchema: {
      type: "object",
      properties: {
        school_id: {
          type: "string",
          description: "Unique identifier for the school",
        },
        date_range: {
          type: "object",
          properties: {
            start_date: {
              type: "string",
              format: "date-time",
              description: "Report start date (ISO 8601 format)",
            },
            end_date: {
              type: "string",
              format: "date-time",
              description: "Report end date (ISO 8601 format)",
            },
          },
          required: ["start_date", "end_date"],
        },
        metrics_requested: {
          type: "string",
          enum: ["engagement", "outcomes", "satisfaction", "all"],
          description: "Type of metrics to include in report",
        },
      },
      required: ["school_id", "date_range", "metrics_requested"],
    },
  },
  {
    name: "dhl_session_plan",
    description:
      "Create structured mentoring session plans with discussion prompts, activities, and follow-up assignments. Customized by mentor expertise, student grade level, and session duration.",
    inputSchema: {
      type: "object",
      properties: {
        mentor_expertise: {
          type: "string",
          enum: [
            "Mathematics",
            "Science",
            "Technology",
            "Engineering",
            "Business",
            "Environmental",
            "Healthcare",
            "Agriculture",
            "Arts",
            "Language Arts",
            "Social Studies",
            "Computer Science",
            "Entrepreneurship",
            "Communications",
          ],
          description: "Mentor's area of expertise",
        },
        student_grade: {
          type: "string",
          enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          description: "Student grade level",
        },
        topic: {
          type: "string",
          description: "Specific topic for the session",
        },
        duration: {
          type: "number",
          description: "Session duration in minutes (30-480)",
        },
        group_size: {
          type: "number",
          description: "Number of students in the group (1-50)",
        },
      },
      required: [
        "mentor_expertise",
        "student_grade",
        "topic",
        "duration",
        "group_size",
      ],
    },
  },
  {
    name: "dhl_program_design",
    description:
      "Design custom mentoring programs for schools and districts. Returns complete program structure, mentor recruitment plans, schedules, assessment frameworks, and success metrics.",
    inputSchema: {
      type: "object",
      properties: {
        school_type: {
          type: "string",
          enum: [
            "Elementary",
            "Middle School",
            "High School",
            "K-8",
            "K-12",
            "Alternative",
            "Charter",
            "Virtual",
          ],
          description: "Type of school",
        },
        student_population: {
          type: "number",
          description: "Total number of students in school/district",
        },
        budget: {
          type: "number",
          description: "Total program budget in dollars",
        },
        duration: {
          type: "string",
          enum: ["semester", "year", "multi-year"],
          description: "Program duration",
        },
        focus_areas: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "Mathematics",
              "Science",
              "Technology",
              "Engineering",
              "Business",
              "Environmental",
              "Healthcare",
              "Agriculture",
              "Arts",
              "Language Arts",
              "Social Studies",
              "Computer Science",
              "Entrepreneurship",
              "Communications",
            ],
          },
          description: "Primary subject areas for mentoring",
        },
        goals: {
          type: "array",
          items: { type: "string" },
          description: "Program goals and objectives",
        },
      },
      required: [
        "school_type",
        "student_population",
        "budget",
        "duration",
        "focus_areas",
        "goals",
      ],
    },
  },
  {
    name: "dhl_career_explorer",
    description:
      "Career exploration tool for K-12 students. Returns career pathway suggestions, day-in-the-life descriptions, education requirements, salary ranges, available mentors, and industry growth trends.",
    inputSchema: {
      type: "object",
      properties: {
        student_interests: {
          type: "array",
          items: { type: "string" },
          description: "Student interests and passions",
        },
        grade_level: {
          type: "string",
          enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          description: "Student grade level",
        },
        preferred_industries: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "Technology",
              "Finance",
              "Healthcare",
              "Engineering",
              "Environmental",
              "Education",
              "Media",
              "Manufacturing",
              "Renewable Energy",
              "Architecture",
              "Agriculture",
              "Business",
              "Law",
              "Government",
              "Non-profit",
            ],
          },
          description: "Industries of interest",
        },
        skills: {
          type: "array",
          items: { type: "string" },
          description: "Existing or desired skills (optional)",
        },
      },
      required: ["student_interests", "grade_level", "preferred_industries"],
    },
  },
];

// ============================================================================
// TOOL HANDLERS
// ============================================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Validate and process each tool
    switch (name) {
      case "dhl_mentor_match": {
        const input = MentorMatchInputSchema.parse(args);
        const result = await mentorMatch(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "dhl_curriculum_align": {
        const input = CurriculumAlignInputSchema.parse(args);
        const result = await curriculumAlign(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "dhl_impact_report": {
        const input = ImpactReportInputSchema.parse(args);
        const result = await impactReport(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "dhl_session_plan": {
        const input = SessionPlanInputSchema.parse(args);
        const result = await sessionPlan(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "dhl_program_design": {
        const input = ProgramDesignInputSchema.parse(args);
        const result = await programDesign(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "dhl_career_explorer": {
        const input = CareerExplorerInputSchema.parse(args);
        const result = await careerExplorer(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
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
      error instanceof Error ? error.message : String(error);
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

// ============================================================================
// SERVER START
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Digital Human Library MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
