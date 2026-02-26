/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * quantranet-pqc-mcp
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


import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Import tool implementations
import { assessPQCReadiness } from './tools/assessment.js';
import { performCryptoAudit, generateDetailedAuditReport } from './tools/audit.js';
import { generateMigrationPlan } from './tools/migration.js';
import { modelQuantumThreat, generateThreatAssessmentSummary } from './tools/threat.js';
import { checkPQCCompliance, generateComplianceReport } from './tools/compliance.js';
import { recommendPQCAlgorithms, generateAlgorithmSelectionGuide } from './tools/algorithms.js';

// Import types
import {
  PQCAssessmentInputSchema,
  CryptoAuditInputSchema,
  MigrationPlanInputSchema,
  ThreatModelInputSchema,
  ComplianceCheckInputSchema,
  AlgorithmRecommendationInputSchema,
} from './types.js';

// Tool definitions
const tools: Tool[] = [
  {
    name: 'quantranet_pqc_assess',
    description:
      'Post-Quantum Cryptography (PQC) readiness assessment. Evaluates an organization\'s current cryptographic posture against quantum computing threats and provides NIST PQC migration recommendations with timeline and cost estimates.',
    inputSchema: {
      type: 'object',
      properties: {
        organizationName: {
          type: 'string',
          description: 'Name of the organization being assessed',
        },
        cryptoAlgorithmsInUse: {
          type: 'array',
          items: { type: 'string' },
          description:
            'List of cryptographic algorithms currently in use (e.g., RSA-2048, ECDSA-256, AES-256)',
        },
        sector: {
          type: 'string',
          enum: [
            'finance',
            'healthcare',
            'defense',
            'energy',
            'telecommunications',
            'government',
            'technology',
            'manufacturing',
            'education',
            'other',
          ],
          description: 'Industry sector of the organization',
        },
        dataSensitivityLevel: {
          type: 'string',
          enum: ['low', 'medium', 'high', 'critical'],
          description:
            'Highest sensitivity level of data handled by the organization',
        },
        organizationSize: {
          type: 'string',
          enum: ['small', 'medium', 'large', 'enterprise'],
          description:
            'Size of organization (optional - defaults to medium)',
        },
        currentInvestmentInCrypto: {
          type: 'number',
          description:
            'Current annual investment in cryptographic infrastructure in USD (optional)',
        },
      },
      required: [
        'organizationName',
        'cryptoAlgorithmsInUse',
        'sector',
        'dataSensitivityLevel',
      ],
    },
  },
  {
    name: 'quantranet_crypto_audit',
    description:
      'Comprehensive cryptographic algorithm audit. Analyzes current crypto implementations for quantum vulnerabilities, assigns threat levels, and ranks migration priorities.',
    inputSchema: {
      type: 'object',
      properties: {
        algorithms: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Algorithm name (e.g., RSA-2048, ECDSA-384)',
              },
              keySize: {
                type: 'number',
                description: 'Key size in bits',
              },
              protocol: {
                type: 'string',
                description: 'Protocol using this algorithm (e.g., TLS 1.3)',
              },
              usageContext: {
                type: 'string',
                description: 'Where the algorithm is used (e.g., key exchange)',
              },
            },
            required: ['name', 'keySize'],
          },
          description: 'List of algorithms to audit',
        },
        detailedAnalysis: {
          type: 'boolean',
          description: 'Provide detailed analysis report (optional - defaults to false)',
        },
      },
      required: ['algorithms'],
    },
  },
  {
    name: 'quantranet_migration_plan',
    description:
      'Generates a phased PQC migration roadmap including hybrid cryptography approach, resource requirements, and compliance timelines for NIST, White House, CNSA 2.0, and EU regulations.',
    inputSchema: {
      type: 'object',
      properties: {
        organizationSize: {
          type: 'string',
          enum: ['small', 'medium', 'large', 'enterprise'],
          description: 'Size of the organization',
        },
        sector: {
          type: 'string',
          enum: [
            'finance',
            'healthcare',
            'defense',
            'energy',
            'telecommunications',
            'government',
            'technology',
            'manufacturing',
            'education',
            'other',
          ],
          description: 'Industry sector',
        },
        cryptoInventory: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of current cryptographic systems',
        },
        complianceRequirements: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['NIST', 'White House', 'CNSA', 'EU_CRA'],
          },
          description:
            'Compliance frameworks to consider (optional)',
        },
        budget: {
          type: 'number',
          description:
            'Available budget in USD (optional)',
        },
        timeline: {
          type: 'string',
          enum: ['urgent', 'high', 'medium', 'flexible'],
          description:
            'Migration timeline preference (optional - defaults to medium)',
        },
      },
      required: ['organizationSize', 'sector', 'cryptoInventory'],
    },
  },
  {
    name: 'quantranet_threat_model',
    description:
      'Quantum threat modeling for specific data types. Assesses "Harvest Now, Decrypt Later" risk and provides countermeasures based on data sensitivity and storage duration.',
    inputSchema: {
      type: 'object',
      properties: {
        dataType: {
          type: 'string',
          description:
            'Type of data to be protected (e.g., financial_records, health_records)',
        },
        storageDuration: {
          type: 'string',
          enum: ['short_term', 'medium_term', 'long_term', 'indefinite'],
          description: 'How long the data will be stored in encrypted form',
        },
        adversaryCapability: {
          type: 'string',
          enum: ['theoretical', 'advanced', 'state_level'],
          description:
            'Estimated capability of potential adversaries',
        },
        includeRiskAssessment: {
          type: 'boolean',
          description:
            'Include detailed risk assessment (optional - defaults to true)',
        },
      },
      required: ['dataType', 'storageDuration', 'adversaryCapability'],
    },
  },
  {
    name: 'quantranet_compliance_check',
    description:
      'Compliance verification against NIST SP 800-208, White House OMB M-23-02, CNSA 2.0, and EU Cyber Resilience Act. Returns compliance status and required actions.',
    inputSchema: {
      type: 'object',
      properties: {
        sector: {
          type: 'string',
          enum: [
            'finance',
            'healthcare',
            'defense',
            'energy',
            'telecommunications',
            'government',
            'technology',
            'manufacturing',
            'education',
            'other',
          ],
          description: 'Industry sector',
        },
        jurisdiction: {
          type: 'string',
          enum: ['US', 'EU', 'UK', 'APAC', 'CANADA', 'GLOBAL'],
          description: 'Geographic jurisdiction',
        },
        currentImplementations: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Current cryptographic implementations (optional)',
        },
      },
      required: ['sector', 'jurisdiction'],
    },
  },
  {
    name: 'quantranet_algorithm_recommend',
    description:
      'Recommends NIST-approved PQC algorithms based on use case, performance requirements, and platform constraints. Includes implementation libraries and performance benchmarks.',
    inputSchema: {
      type: 'object',
      properties: {
        useCase: {
          type: 'string',
          enum: ['key_exchange', 'digital_signature', 'encryption'],
          description: 'The cryptographic use case',
        },
        performanceRequirements: {
          type: 'string',
          enum: ['low_latency', 'balanced', 'maximum_security'],
          description:
            'Performance priority (optional - defaults to balanced)',
        },
        platformConstraints: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['embedded', 'mobile', 'server', 'iot'],
          },
          description:
            'Target deployment platforms (optional)',
        },
        quantumSecurityLevel: {
          type: 'string',
          enum: ['128_bit', '192_bit', '256_bit'],
          description:
            'Target quantum security level (optional)',
        },
      },
      required: ['useCase'],
    },
  },
];

// Initialize MCP Server
const server = new Server(
  {
    name: 'quantranet-pqc-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handler for listing tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

// Handler for calling tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case 'quantranet_pqc_assess': {
        const input = PQCAssessmentInputSchema.parse(args);
        result = assessPQCReadiness(input);
        break;
      }

      case 'quantranet_crypto_audit': {
        const input = CryptoAuditInputSchema.parse(args);
        const auditResult = performCryptoAudit(input);
        // Return detailed report if requested
        if (args && typeof args === 'object' && 'detailedAnalysis' in args && args.detailedAnalysis) {
          result = {
            ...auditResult,
            detailedReport: generateDetailedAuditReport(auditResult),
          };
        } else {
          result = auditResult;
        }
        break;
      }

      case 'quantranet_migration_plan': {
        const input = MigrationPlanInputSchema.parse(args);
        result = generateMigrationPlan(input);
        break;
      }

      case 'quantranet_threat_model': {
        const input = ThreatModelInputSchema.parse(args);
        const threatResult = modelQuantumThreat(input);
        // Always include threat assessment summary
        result = {
          ...threatResult,
          threatAssessmentSummary: generateThreatAssessmentSummary(threatResult),
        };
        break;
      }

      case 'quantranet_compliance_check': {
        const input = ComplianceCheckInputSchema.parse(args);
        const complianceResult = checkPQCCompliance(input);
        // Include formatted report
        result = {
          ...complianceResult,
          complianceReport: generateComplianceReport(complianceResult),
        };
        break;
      }

      case 'quantranet_algorithm_recommend': {
        const input = AlgorithmRecommendationInputSchema.parse(args);
        const recommendations = recommendPQCAlgorithms(input);
        // Include selection guide
        result = {
          ...recommendations,
          selectionGuide: generateAlgorithmSelectionGuide(recommendations),
        };
        break;
      }

      default:
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Unknown tool: ${name}`,
            },
          ],
        };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Error processing tool ${name}: ${errorMessage}`,
        },
      ],
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('QuantraNet PQC MCP Server started successfully');
}

main().catch(console.error);
