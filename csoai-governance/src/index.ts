/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csoai-governance-mcp
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


import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  handleCrosswalkLookup
} from "./tools/crosswalk-lookup.js";
import {
  handleCharterLookup,
  getCharterSummary
} from "./tools/charter-lookup.js";
import {
  handleCasaAssessment
} from "./tools/casa-assess.js";
import {
  handleSectorCompliance
} from "./tools/sector-compliance.js";
import {
  handleRiskAssessment
} from "./tools/risk-assessment.js";
import {
  handleIncidentResponse
} from "./tools/incident-response.js";

const server = new McpServer({
  name: "csoai-governance-mcp",
  version: "1.0.0"
});

// Define schemas inline to avoid circular dependencies
const CrosswalkLookupShape = {
  crosswalk_id: z
    .string()
    .describe("Crosswalk identifier (e.g., CW-01, CW-02, ..., CW-25)")
};

const CharterLookupShape = {
  article_number: z
    .number()
    .int()
    .describe("Charter article number (1-52)")
};

const CasaAssessmentShape = {
  system_name: z.string().describe("Name of the AI system being assessed"),
  system_description: z
    .string()
    .describe("Detailed description of the AI system, its purpose, and deployment context"),
  deployment_context: z
    .string()
    .describe("Where and how the system is deployed (e.g., healthcare, financial services, social media)")
};

const SectorComplianceShape = {
  sector: z
    .enum([
      "healthcare",
      "financial",
      "military",
      "education",
      "employment",
      "criminal_justice",
      "transportation",
      "social_media"
    ])
    .describe("Industry sector for compliance assessment"),
  system_description: z
    .string()
    .describe("Description of the AI system and its use in the sector")
};

const RiskAssessmentShape = {
  system_name: z.string().describe("Name of the AI system"),
  system_description: z
    .string()
    .describe("Detailed description of the AI system and its purpose"),
  scope_and_impact: z
    .string()
    .describe("Scope of deployment and potential impact (e.g., healthcare, employment, criminal justice)")
};

const IncidentResponseShape = {
  incident_name: z.string().describe("Name or title of the incident"),
  incident_description: z
    .string()
    .describe("Detailed description of the incident"),
  severity_assessment: z
    .enum(["Critical", "High", "Medium", "Low"])
    .describe("Initial severity assessment of the incident")
};

// Tool 1: Crosswalk Lookup
(server.tool as any)(
  "crosswalk_lookup",
  "Look up any of 25 international AI governance framework crosswalks covering EU AI Act, ISO 42001, NIST AI RMF, OECD, UNESCO, IEEE, OWASP Agentic AI, OWASP MCP Top 10, and many others. Returns framework details, CASA mappings, compliance gaps, and recommended actions.",
  CrosswalkLookupShape,
  async (args: any) => {
    const result = await handleCrosswalkLookup(args.crosswalk_id);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

// Tool 2: Charter Lookup
(server.tool as any)(
  "charter_lookup",
  "Look up any of the 52 Partnership Charter articles covering governance, accountability, safety testing, human oversight, transparency, privacy, and responsible AI practices. Returns article content and key principles.",
  CharterLookupShape,
  async (args: any) => {
    const result = await handleCharterLookup(args.article_number);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

// Tool 3: CASA Assessment
(server.tool as any)(
  "casa_assessment",
  "Run the CASA 4-tier AI certification assessment (Tier 1: Self-Assessment, Tier 2: Third-Party Audit, Tier 3: Continuous Monitoring, Tier 4: Byzantine Council Review). Provide system description and context to receive recommended tier, compliance score, applicable crosswalks, identified gaps, and certification pathway.",
  CasaAssessmentShape,
  async (args: any) => {
    const result = await handleCasaAssessment(
      args.system_name,
      args.system_description,
      args.deployment_context
    );
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

// Tool 4: Sector Compliance
(server.tool as any)(
  "sector_compliance",
  "Perform sector-specific AI compliance assessment for 8 sectors: healthcare, financial, military, education, employment, criminal justice, transportation, and social media. Returns compliance requirements, regulatory frameworks, key risks, and compliance checklist.",
  SectorComplianceShape,
  async (args: any) => {
    const result = await handleSectorCompliance(
      args.sector,
      args.system_description
    );
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

// Tool 5: Risk Assessment
(server.tool as any)(
  "risk_assessment",
  "Classify AI system risk per EU AI Act categories (Unacceptable, High, Limited, Minimal). Analyzes system description and scope to identify risks, required measures, and compliance implications.",
  RiskAssessmentShape,
  async (args: any) => {
    const result = await handleRiskAssessment(
      args.system_name,
      args.system_description,
      args.scope_and_impact
    );
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

// Tool 6: Incident Response
(server.tool as any)(
  "incident_response",
  "AI incident response protocol with severity classification (Critical, High, Medium, Low) and comprehensive response procedures. Returns immediate actions, investigation steps, notification requirements, remediation pathway, and preventive measures.",
  IncidentResponseShape,
  async (args: any) => {
    const result = await handleIncidentResponse(
      args.incident_name,
      args.incident_description,
      args.severity_assessment
    );
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

// Resource 1: Crosswalks Summary
server.resource(
  "csoai://crosswalks/index",
  "Index of all 25 CSOAI International AI Framework Crosswalks",
  { mimeType: "text/plain" },
  async (uri: any) => {
    // Lazy import to avoid blocking compilation
    const { listCrosswalkIds } = await import("./resources/crosswalks.js");
    const crosswalkIds = listCrosswalkIds();
    const text = `CSOAI International AI Framework Crosswalks

This resource provides access to 25 comprehensive crosswalk mappings covering major international AI governance frameworks:

${crosswalkIds.map(id => `- ${id}`).join("\n")}

These crosswalks map each framework to CASA certification tiers, identify compliance gaps, and provide recommended actions for achieving compliance with multiple international standards.

Use the crosswalk_lookup tool to retrieve detailed information about any specific framework.`;
    return {
      contents: [
        {
          uri: uri.href,
          text: text,
          mimeType: "text/plain"
        }
      ]
    };
  }
);

// Resource 2: Charter Summary
server.resource(
  "csoai://charter/index",
  "Index of 52 CSOAI Partnership Charter Articles on Responsible AI Development",
  { mimeType: "text/plain" },
  async (uri: any) => {
    // Lazy import to avoid blocking compilation
    const { getCharterSummary: getChartSummary2 } = await import("./tools/charter-lookup.js");
    const summary = getChartSummary2();
    const text = `CSOAI Partnership Charter

The Partnership Charter establishes 52 principles for the safe development and deployment of advanced artificial intelligence systems.

ARTICLE CATEGORIES:

Governance & Accountability (Articles 1-7)
- Purpose and scope
- AI systems of concern definition
- Governance and accountability structures
- Risk assessment and management
- Safety testing and evaluation
- Human oversight and control
- Transparency and explainability

Data & Algorithmic Integrity (Articles 8-12)
- Data governance and quality
- Fairness and non-discrimination
- Security and robustness
- Privacy protection
- Environmental and energy efficiency

Stakeholder & Community (Articles 13-18)
- Stakeholder engagement
- Incident reporting and response
- Documentation and auditability
- Continuous monitoring and evaluation
- Model updates and deprovisioning
- Supply chain security

Risk & Security (Articles 19-25)
- Dual-use and misuse prevention
- Beneficial outcome alignment
- Access control and authentication
- Intellectual property and attribution
- Capacity building and education
- International cooperation
- Research and innovation in safety

Operational Excellence (Articles 26-40)
- Algorithmic transparency
- Vulnerability disclosure
- Performance benchmarking
- Model card and documentation standards
- Regulatory compliance
- User rights and remedies
- Demographic parity and representation
- Autonomous decision-making limits
- Adversarial robustness
- Interpretability research
- Model governance and versioning
- Third-party auditing
- Training process transparency
- Bias mitigation techniques
- Anomaly detection and monitoring

Advanced Practices (Articles 41-52)
- Red teaming and adversarial testing
- Harm mitigation strategies
- Explainability by default
- Downstream impact assessment
- Long-term safety research
- Capability assessment and disclosure
- Change management and rollback procedures
- Stakeholder feedback integration
- Certification and compliance verification
- Continuous improvement and adaptation
- Knowledge sharing and community learning
- Commitment to this Charter

Use the charter_lookup tool to retrieve full details about any specific article.`;
    return {
      contents: [
        {
          uri: uri.href,
          text: text,
          mimeType: "text/plain"
        }
      ]
    };
  }
);

// Resource 3: Tool Guide
server.resource(
  "csoai://tools/guide",
  "Complete guide to CSOAI MCP Server tools and capabilities",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `CSOAI AI Governance MCP Server - Tool Guide

AVAILABLE TOOLS:

1. crosswalk_lookup
   Purpose: Look up any of 25 international AI framework crosswalks
   Input: Crosswalk ID (CW-01 through CW-25)
   Output: Framework name, version, jurisdiction, key requirements, CASA mappings,
           compliance gaps, recommended actions
   Use Case: Map your AI system against international standards

2. charter_lookup
   Purpose: Look up any of 52 Partnership Charter articles
   Input: Article number (1-52)
   Output: Article title, content, key principles
   Use Case: Understand specific governance principles

3. casa_assessment
   Purpose: Run 4-tier certification assessment
   Inputs: System name, description, deployment context
   Output: Recommended tier, compliance score, applicable crosswalks,
           gaps, certification pathway
   Use Case: Determine certification level and roadmap

4. sector_compliance
   Purpose: Check compliance for specific sectors
   Inputs: Sector (healthcare, financial, military, education, employment,
           criminal_justice, transportation, social_media), system description
   Output: Requirements, frameworks, risks, mitigations, compliance checklist
   Use Case: Ensure sector-specific regulatory compliance

5. risk_assessment
   Purpose: Classify risk per EU AI Act categories
   Inputs: System name, description, scope and impact
   Output: Risk category, score, identified risks, required measures,
           implications, residual risk
   Use Case: Understand compliance obligations and governance requirements

6. incident_response
   Purpose: Generate incident response protocol
   Inputs: Incident name, description, severity assessment
   Output: Refined severity, immediate actions, investigation steps,
           notification requirements, remediation pathway, preventive measures
   Use Case: Respond to AI system incidents effectively

WORKFLOW EXAMPLES:

Example 1: Assess a Medical AI System
1. Use risk_assessment for a healthcare AI diagnostic tool
   → Likely returns "High" risk category
2. Use sector_compliance with "healthcare" sector
   → See HIPAA, FDA, clinical validation requirements
3. Use casa_assessment
   → Determine CASA tier (likely Tier 2-3)
4. Use crosswalk_lookup for CW-19 (ISO/IEC 23894)
   → Get risk management framework alignment

Example 2: Evaluate LLM Safety
1. Use risk_assessment for large language model
2. Use crosswalk_lookup for CW-21 (NIST AI 600-1 GenAI)
3. Use crosswalk_lookup for CW-25 (OWASP LLM Top 10)
4. Use crosswalk_lookup for CW-22 (OWASP MCP Top 10)

Example 3: Respond to AI Incident
1. Use incident_response to generate response plan
2. Use charter_lookup for relevant principles (Articles 4, 14)
3. Use casa_assessment after incident resolution
4. Review preventive measures from incident_response

RESOURCES:

- csoai://crosswalks/index: Full list of all 25 crosswalks
- csoai://charter/index: Guide to all 52 charter articles
- csoai://tools/guide: This guide

INTEGRATION WITH AI TOOLS:

This MCP server integrates with:
- ChatGPT (via MCP plugin)
- Claude (via MCP protocol)
- Gemini (via MCP protocol)
- Cursor (via MCP protocol)
- VS Code (via MCP extension)
- Any MCP-compatible client

BEST PRACTICES:

1. Start with risk_assessment to understand the scope
2. Use sector_compliance for industry-specific requirements
3. Reference relevant crosswalks for framework alignment
4. Use casa_assessment to determine certification pathway
5. Consult charter_lookup for governance implementation details
6. Have incident_response ready for deployment`;
    return {
      contents: [
        {
          uri: uri.href,
          text: text,
          mimeType: "text/plain"
        }
      ]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
