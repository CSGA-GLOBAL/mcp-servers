/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csoai-healthcare-ai-mcp
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
import { handleHipaaAssessment } from "./tools/hipaa-assessment.js";
import { handleFdaAiAssessment } from "./tools/fda-ai-assessment.js";
import { handleClinicalAiSafety } from "./tools/clinical-ai-safety.js";
import { handleEuMdrCompliance } from "./tools/eu-mdr-compliance.js";

const server = new McpServer({
  name: "csoai-healthcare-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const HipaaShape = {
  system_name: z.string().describe("Name of the healthcare AI system"),
  system_description: z.string().describe("Description of the AI system and its role in healthcare delivery"),
  phi_data_types: z.string().describe("Types of PHI the system processes (e.g., diagnostic data, genomic data, medication records)"),
  deployment_environment: z.string().describe("Where the system is deployed (e.g., cloud, on-premise, hybrid)")
};

const FdaShape = {
  system_name: z.string().describe("Name of the AI medical device or SaMD"),
  intended_use: z.string().describe("Intended use statement for the AI system"),
  clinical_context: z.string().describe("Clinical context (e.g., diagnosis, treatment, screening, monitoring)"),
  ai_model_type: z.string().describe("Type of AI model (e.g., static, adaptive, continuous learning, reinforcement learning)")
};

const ClinicalSafetyShape = {
  system_name: z.string().describe("Name of the clinical AI system"),
  clinical_domain: z.string().describe("Clinical domain (e.g., radiology, pathology, cardiology, oncology, drug prescribing)"),
  patient_population: z.string().describe("Target patient population (e.g., adult, pediatric, geriatric, specific demographics)"),
  decision_autonomy: z.string().describe("Level of AI decision autonomy (e.g., advisory, decision support, autonomous, triage)")
};

const EuMdrShape = {
  system_name: z.string().describe("Name of the AI medical device"),
  device_description: z.string().describe("Description of the device including AI/ML components"),
  intended_purpose: z.string().describe("Intended purpose per MDR Article 2(12)"),
  risk_class: z.string().describe("Estimated risk class (Class I, IIa, IIb, III) or 'unknown' for classification assistance")
};

// ─── Tool 1: HIPAA AI Assessment ───
(server.tool as any)(
  "hipaa_ai_assessment",
  "Assess HIPAA compliance for AI systems processing Protected Health Information (PHI). Evaluates administrative, physical, and technical safeguards required for AI systems in healthcare settings.",
  HipaaShape,
  async (args: any) => {
    const result = handleHipaaAssessment(args.system_name, args.system_description, args.phi_data_types, args.deployment_environment);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Tool 2: FDA AI/ML Assessment ───
(server.tool as any)(
  "fda_ai_assessment",
  "Evaluate FDA regulatory requirements for AI/ML-based Software as a Medical Device (SaMD). Determines device classification, regulatory pathway, and compliance requirements per FDA AI/ML Action Plan.",
  FdaShape,
  async (args: any) => {
    const result = handleFdaAiAssessment(args.system_name, args.intended_use, args.clinical_context, args.ai_model_type);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Tool 3: Clinical AI Safety ───
(server.tool as any)(
  "clinical_ai_safety",
  "Comprehensive clinical AI safety assessment covering bias, validation, human oversight, and EU AI Act obligations for healthcare AI systems. Provides CASA tier recommendation.",
  ClinicalSafetyShape,
  async (args: any) => {
    const result = handleClinicalAiSafety(args.system_name, args.clinical_domain, args.patient_population, args.decision_autonomy);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Tool 4: EU MDR Compliance ───
(server.tool as any)(
  "eu_mdr_compliance",
  "Assess EU Medical Device Regulation (MDR 2017/745) compliance for AI-based medical devices. Determines MDR classification, conformity assessment route, and regulatory requirements.",
  EuMdrShape,
  async (args: any) => {
    const result = handleEuMdrCompliance(args.system_name, args.device_description, args.intended_purpose, args.risk_class);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ─── Resource 1: Healthcare AI Regulatory Landscape ───
server.resource(
  "healthcare://regulations/index",
  "Complete index of healthcare AI regulatory frameworks — HIPAA, FDA, EU MDR, EU AI Act, and international standards",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `CSOAI Healthcare AI Regulatory Landscape

UNITED STATES:
- HIPAA Privacy Rule & Security Rule (PHI protection for AI systems)
- FDA AI/ML-Based SaMD Action Plan (medical AI device regulation)
- FDA Good Machine Learning Practice (GMLP) principles
- 21st Century Cures Act (interoperability requirements)
- HHS AI Strategy & Executive Order 14110
- ONC Health IT Certification (if applicable)
- CMS AI Payment & Reimbursement Policies

EUROPEAN UNION:
- EU Medical Device Regulation (MDR 2017/745)
- EU In-Vitro Diagnostic Regulation (IVDR 2017/746)
- EU AI Act — Annex III Section 5: Healthcare AI as High-Risk
- EU General Data Protection Regulation (GDPR) — Health Data Processing
- European Health Data Space (EHDS) Regulation

INTERNATIONAL:
- ISO 14971 — Risk Management for Medical Devices
- IEC 62304 — Medical Device Software Lifecycle
- IEC 82304-1 — Health Software Product Safety
- ISO 13485 — Quality Management Systems
- IMDRF SaMD Framework (N41, N42, N43)
- WHO AI Ethics Guidance for Healthcare
- OECD AI Policy Observatory — Healthcare Sector

EMERGING:
- UK MHRA AI Medical Device Guidance
- Health Canada AI/ML SaMD Framework
- Japan PMDA AI Medical Device Guidelines
- Australia TGA AI Regulatory Framework
- Singapore HSA AI Medical Device Guidance

Use the tools in this server to assess compliance against these frameworks.`;
    return { contents: [{ uri: uri.href, text, mimeType: "text/plain" }] };
  }
);

// ─── Resource 2: Tools Guide ───
server.resource(
  "healthcare://tools/guide",
  "Guide to all Healthcare AI MCP Server tools and capabilities",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `CSOAI Healthcare AI MCP Server — Tool Guide

AVAILABLE TOOLS:

1. hipaa_ai_assessment
   Purpose: Assess HIPAA compliance for AI systems processing PHI
   Inputs: System name, description, PHI data types, deployment environment
   Output: HIPAA category, PHI risk level, required safeguards, gap analysis, remediation

2. fda_ai_assessment
   Purpose: FDA regulatory pathway assessment for AI medical devices (SaMD)
   Inputs: System name, intended use, clinical context, AI model type
   Output: Device classification, regulatory pathway, requirements, post-market obligations

3. clinical_ai_safety
   Purpose: Clinical safety assessment including bias, validation, and oversight
   Inputs: System name, clinical domain, patient population, decision autonomy level
   Output: Risk classification, safety concerns, bias assessment, validation requirements

4. eu_mdr_compliance
   Purpose: EU MDR compliance assessment for AI medical devices
   Inputs: System name, device description, intended purpose, risk class
   Output: MDR classification, conformity route, essential requirements, PMS obligations

WORKFLOW:
1. Run hipaa_ai_assessment → PHI protection requirements
2. Run fda_ai_assessment → FDA regulatory pathway
3. Run clinical_ai_safety → Clinical safety and bias risks
4. Run eu_mdr_compliance → EU market access requirements
5. Cross-reference with CSOAI governance server for CASA certification

RESOURCES:
- healthcare://regulations/index — Complete regulatory landscape
- healthcare://tools/guide — This guide`;
    return { contents: [{ uri: uri.href, text, mimeType: "text/plain" }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
