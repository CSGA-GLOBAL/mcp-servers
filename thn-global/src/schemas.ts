/**
 * THN Global MCP Server Schemas
 * Zod validation schemas for all tools
 */

import { z } from "zod";

// ============================================================================
// Patent Landscape Analysis Schemas
// ============================================================================

// Zod validation schema
const PatentLandscapeZodSchema = z.object({
  therapeutic_area: z
    .string()
    .min(1)
    .describe("Therapeutic area (e.g., oncology, immunology, cardiovascular)"),
  molecule_type: z
    .enum(["small_molecule", "biologic", "antibody", "protein", "rna", "other"])
    .describe("Type of molecule being analyzed"),
  target_pathway: z
    .string()
    .min(1)
    .describe("Target biological pathway or mechanism"),
  date_range: z
    .object({
      start_year: z.number().int().min(1980).max(2100),
      end_year: z.number().int().min(1980).max(2100),
    })
    .describe("Date range for patent search"),
});

// JSON Schema for MCP tool definition
export const PatentLandscapeInputSchema = {
  type: "object",
  properties: {
    therapeutic_area: {
      type: "string",
      description: "Therapeutic area (e.g., oncology, immunology, cardiovascular)",
    },
    molecule_type: {
      type: "string",
      enum: ["small_molecule", "biologic", "antibody", "protein", "rna", "other"],
      description: "Type of molecule being analyzed",
    },
    target_pathway: {
      type: "string",
      description: "Target biological pathway or mechanism",
    },
    date_range: {
      type: "object",
      properties: {
        start_year: {
          type: "number",
          description: "Start year",
        },
        end_year: {
          type: "number",
          description: "End year",
        },
      },
      required: ["start_year", "end_year"],
    },
  },
  required: ["therapeutic_area", "molecule_type", "target_pathway", "date_range"],
};

export type PatentLandscapeInput = z.infer<typeof PatentLandscapeZodSchema>;

// Export Zod validator for server-side validation
export const validatePatentLandscapeInput = PatentLandscapeZodSchema.parse;

// ============================================================================
// Drug Discovery AI Schemas
// ============================================================================

const DrugDiscoveryAIZodSchema = z.object({
  target_disease: z.string().min(1).describe("Target disease indication"),
  approach: z
    .enum(["small_molecule", "biologics", "gene_therapy", "cell_therapy"])
    .describe("Development approach"),
  development_stage: z
    .enum([
      "discovery",
      "preclinical",
      "phase_1",
      "phase_2",
      "phase_3",
      "nda_stage",
    ])
    .describe("Current development stage"),
  budget_range: z
    .object({
      min_usd_millions: z.number().positive(),
      max_usd_millions: z.number().positive(),
    })
    .describe("Available budget range"),
});

export const DrugDiscoveryAIInputSchema = {
  type: "object",
  properties: {
    target_disease: {
      type: "string",
      description: "Target disease indication",
    },
    approach: {
      type: "string",
      enum: ["small_molecule", "biologics", "gene_therapy", "cell_therapy"],
      description: "Development approach",
    },
    development_stage: {
      type: "string",
      enum: ["discovery", "preclinical", "phase_1", "phase_2", "phase_3", "nda_stage"],
      description: "Current development stage",
    },
    budget_range: {
      type: "object",
      properties: {
        min_usd_millions: {
          type: "number",
          description: "Minimum budget in millions USD",
        },
        max_usd_millions: {
          type: "number",
          description: "Maximum budget in millions USD",
        },
      },
      required: ["min_usd_millions", "max_usd_millions"],
    },
  },
  required: ["target_disease", "approach", "development_stage", "budget_range"],
};

export type DrugDiscoveryAIInput = z.infer<typeof DrugDiscoveryAIZodSchema>;
export const validateDrugDiscoveryAIInput = DrugDiscoveryAIZodSchema.parse;

// ============================================================================
// IP Strategy Schemas
// ============================================================================

const IPStrategyZodSchema = z.object({
  innovation_type: z
    .enum([
      "composition_of_matter",
      "method_of_use",
      "device",
      "formulation",
      "manufacturing_process",
      "combination_therapy",
    ])
    .describe("Type of innovation to protect"),
  jurisdiction: z
    .array(z.enum(["US", "EU", "JP", "CN", "AU", "CA", "IN", "BR"]))
    .min(1)
    .describe("Target jurisdictions for IP protection"),
  existing_patents: z
    .array(z.string())
    .optional()
    .describe("Existing patent numbers to analyze"),
  competitive_landscape: z
    .string()
    .optional()
    .describe("Brief description of competitive landscape"),
});

export const IPStrategyInputSchema = {
  type: "object",
  properties: {
    innovation_type: {
      type: "string",
      enum: [
        "composition_of_matter",
        "method_of_use",
        "device",
        "formulation",
        "manufacturing_process",
        "combination_therapy",
      ],
      description: "Type of innovation to protect",
    },
    jurisdiction: {
      type: "array",
      items: {
        type: "string",
        enum: ["US", "EU", "JP", "CN", "AU", "CA", "IN", "BR"],
      },
      description: "Target jurisdictions for IP protection",
    },
    existing_patents: {
      type: "array",
      items: { type: "string" },
      description: "Existing patent numbers to analyze",
    },
    competitive_landscape: {
      type: "string",
      description: "Brief description of competitive landscape",
    },
  },
  required: ["innovation_type", "jurisdiction"],
};

export type IPStrategyInput = z.infer<typeof IPStrategyZodSchema>;
export const validateIPStrategyInput = IPStrategyZodSchema.parse;

// ============================================================================
// Regulatory Pathway Schemas
// ============================================================================

const RegulatoryPathwayZodSchema = z.object({
  drug_type: z
    .enum(["small_molecule", "biologic", "device", "combination"])
    .describe("Type of drug/therapeutic"),
  therapeutic_area: z
    .enum([
      "oncology",
      "cardiovascular",
      "immunology",
      "neurology",
      "infectious_disease",
      "rare_disease",
      "metabolic",
    ])
    .describe("Therapeutic area"),
  target_market: z
    .array(z.enum(["US", "EU", "JP", "CN", "CA", "AU"]))
    .min(1)
    .describe("Target regulatory markets"),
  development_phase: z
    .enum([
      "discovery",
      "preclinical",
      "phase_1",
      "phase_2",
      "phase_3",
      "nda_stage",
    ])
    .describe("Current development phase"),
});

export const RegulatoryPathwayInputSchema = {
  type: "object",
  properties: {
    drug_type: {
      type: "string",
      enum: ["small_molecule", "biologic", "device", "combination"],
      description: "Type of drug/therapeutic",
    },
    therapeutic_area: {
      type: "string",
      enum: [
        "oncology",
        "cardiovascular",
        "immunology",
        "neurology",
        "infectious_disease",
        "rare_disease",
        "metabolic",
      ],
      description: "Therapeutic area",
    },
    target_market: {
      type: "array",
      items: {
        type: "string",
        enum: ["US", "EU", "JP", "CN", "CA", "AU"],
      },
      description: "Target regulatory markets",
    },
    development_phase: {
      type: "string",
      enum: ["discovery", "preclinical", "phase_1", "phase_2", "phase_3", "nda_stage"],
      description: "Current development phase",
    },
  },
  required: ["drug_type", "therapeutic_area", "target_market", "development_phase"],
};

export type RegulatoryPathwayInput = z.infer<
  typeof RegulatoryPathwayZodSchema
>;
export const validateRegulatoryPathwayInput = RegulatoryPathwayZodSchema.parse;

// ============================================================================
// Market Intelligence Schemas
// ============================================================================

const MarketIntelligenceZodSchema = z.object({
  therapeutic_area: z.string().min(1).describe("Therapeutic area"),
  geography: z
    .array(z.enum(["North_America", "Europe", "Asia_Pacific", "Global"]))
    .min(1)
    .describe("Geographic regions"),
  time_horizon: z
    .enum(["1yr", "3yr", "5yr", "10yr"])
    .describe("Market projection time horizon"),
});

export const MarketIntelligenceInputSchema = {
  type: "object",
  properties: {
    therapeutic_area: {
      type: "string",
      description: "Therapeutic area",
    },
    geography: {
      type: "array",
      items: {
        type: "string",
        enum: ["North_America", "Europe", "Asia_Pacific", "Global"],
      },
      description: "Geographic regions",
    },
    time_horizon: {
      type: "string",
      enum: ["1yr", "3yr", "5yr", "10yr"],
      description: "Market projection time horizon",
    },
  },
  required: ["therapeutic_area", "geography", "time_horizon"],
};

export type MarketIntelligenceInput = z.infer<
  typeof MarketIntelligenceZodSchema
>;
export const validateMarketIntelligenceInput = MarketIntelligenceZodSchema.parse;

// ============================================================================
// Collaboration Match Schemas
// ============================================================================

const CollaborationMatchZodSchema = z.object({
  technology_area: z.string().min(1).describe("Technology area"),
  partnership_type: z
    .enum(["licensing", "co-development", "acquisition", "joint_venture", "research_collaboration"])
    .describe("Type of partnership sought"),
  stage: z
    .enum([
      "discovery",
      "preclinical",
      "phase_1",
      "phase_2",
      "phase_3",
      "commercial",
    ])
    .describe("Development stage"),
  geographic_preference: z
    .array(z.enum(["North_America", "Europe", "Asia_Pacific", "Global"]))
    .min(1)
    .describe("Geographic preference for partners"),
});

export const CollaborationMatchInputSchema = {
  type: "object",
  properties: {
    technology_area: {
      type: "string",
      description: "Technology area",
    },
    partnership_type: {
      type: "string",
      enum: ["licensing", "co-development", "acquisition", "joint_venture", "research_collaboration"],
      description: "Type of partnership sought",
    },
    stage: {
      type: "string",
      enum: ["discovery", "preclinical", "phase_1", "phase_2", "phase_3", "commercial"],
      description: "Development stage",
    },
    geographic_preference: {
      type: "array",
      items: {
        type: "string",
        enum: ["North_America", "Europe", "Asia_Pacific", "Global"],
      },
      description: "Geographic preference for partners",
    },
  },
  required: ["technology_area", "partnership_type", "stage", "geographic_preference"],
};

export type CollaborationMatchInput = z.infer<
  typeof CollaborationMatchZodSchema
>;
export const validateCollaborationMatchInput = CollaborationMatchZodSchema.parse;
