/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * csoai-financial-ai-mcp
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
import { handleCreditScoringCompliance } from "./tools/credit-scoring-compliance.js";
import { handleAlgoTradingCompliance } from "./tools/algo-trading-compliance.js";
import { handleAmlKycCompliance } from "./tools/aml-kyc-compliance.js";

const server = new McpServer({
  name: "csoai-financial-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const CreditScoringShape = {
  system_name: z.string().describe("Name of the credit scoring AI system"),
  model_description: z.string().describe("Description of the AI model and its role in credit decisions"),
  data_inputs: z.string().describe("Data inputs used by the model (e.g., traditional credit data, alternative data)"),
  jurisdiction: z.string().describe("Operating jurisdiction (US, EU, UK, or specific countries)")
};

const AlgoTradingShape = {
  system_name: z.string().describe("Name of the algorithmic trading system"),
  trading_strategy: z.string().describe("Trading strategy type (e.g., market making, statistical arbitrage, HFT, momentum)"),
  asset_classes: z.string().describe("Asset classes traded (equities, fixed income, derivatives, crypto, FX)"),
  jurisdiction: z.string().describe("Operating jurisdiction (US, EU, UK, or specific countries)")
};

const AmlKycShape = {
  system_name: z.string().describe("Name of the AML/KYC AI system"),
  system_description: z.string().describe("Description of the AI system and its AML/KYC functions"),
  transaction_types: z.string().describe("Types of transactions monitored (wire transfers, ACH, card payments, crypto)"),
  jurisdiction: z.string().describe("Operating jurisdiction (US, EU, UK, or specific countries)")
};

(server.tool as any)(
  "credit_scoring_compliance",
  "Assess regulatory compliance for AI-based credit scoring and lending systems. Covers ECOA, FCRA, EU AI Act, GDPR Article 22, fairness, explainability, and adverse action requirements.",
  CreditScoringShape,
  async (args: any) => {
    const result = handleCreditScoringCompliance(args.system_name, args.model_description, args.data_inputs, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

(server.tool as any)(
  "algo_trading_compliance",
  "Assess regulatory compliance for AI-driven algorithmic and high-frequency trading systems. Covers MiFID II, SEC/CFTC, market manipulation controls, and stress testing requirements.",
  AlgoTradingShape,
  async (args: any) => {
    const result = handleAlgoTradingCompliance(args.system_name, args.trading_strategy, args.asset_classes, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

(server.tool as any)(
  "aml_kyc_compliance",
  "Assess regulatory compliance for AI-based Anti-Money Laundering (AML) and Know Your Customer (KYC) systems. Covers BSA, FATF, EU AMLD, transaction monitoring, and sanctions screening.",
  AmlKycShape,
  async (args: any) => {
    const result = handleAmlKycCompliance(args.system_name, args.system_description, args.transaction_types, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.resource(
  "finance://regulations/index",
  "Complete index of financial services AI regulatory frameworks",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `CSOAI Financial Services AI Regulatory Landscape

CREDIT & LENDING:
- ECOA, FCRA, CRA, Dodd-Frank 1071
- EU AI Act Annex III 5(b), GDPR Article 22
- EBA Guidelines on Loan Origination

TRADING & MARKETS:
- MiFID II / MiFIR, SEC Regulation SCI
- CFTC Regulation AT, FINRA Rules
- Market Abuse Regulation (MAR)

AML/CFT:
- BSA/USA PATRIOT Act, FinCEN, FATF
- EU AMLD6, Wolfsberg Group
- OFAC Sanctions Compliance

PRUDENTIAL:
- Basel III/IV, CRD V/CRR II
- DORA (Digital Operational Resilience Act)
- Operational Risk Management for AI

CROSS-CUTTING:
- EU AI Act Financial Sector Provisions
- FSB AI/ML in Financial Services
- IOSCO AI/ML Principles`;
    return { contents: [{ uri: uri.href, text, mimeType: "text/plain" }] };
  }
);

server.resource(
  "finance://tools/guide",
  "Guide to Financial AI MCP Server tools",
  { mimeType: "text/plain" },
  async (uri: any) => {
    const text = `Financial AI MCP Server — Tool Guide

1. credit_scoring_compliance — AI credit scoring regulatory assessment
2. algo_trading_compliance — Algorithmic trading compliance assessment
3. aml_kyc_compliance — AML/KYC AI system compliance assessment

RESOURCES:
- finance://regulations/index — Regulatory landscape
- finance://tools/guide — This guide`;
    return { contents: [{ uri: uri.href, text, mimeType: "text/plain" }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
