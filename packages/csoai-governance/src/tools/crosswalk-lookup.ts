/**
 * crosswalk-lookup.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";
import { getCrosswalk, listCrosswalkIds } from "../resources/crosswalks.js";

export const CrosswalkLookupSchema = z.object({
  crosswalk_id: z
    .string()
    .describe("Crosswalk identifier (e.g., CW-01, CW-02, ..., CW-25)")
});

export interface CrosswalkLookupResult {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    name: string;
    version: string;
    jurisdiction: string;
    keyRequirements: string[];
    casaMappings: string[];
    complianceGaps: string[];
    recommendedActions: string[];
    availableCrosswalkIds?: string[];
  };
}

export async function handleCrosswalkLookup(
  crosswalkId: string
): Promise<CrosswalkLookupResult> {
  try {
    // Normalize the ID
    const normalizedId = crosswalkId.toUpperCase();

    // Check if ID is valid format
    if (!/^CW-\d{2}$/.test(normalizedId)) {
      return {
        success: false,
        error: `Invalid crosswalk ID format: ${crosswalkId}. Expected format: CW-01 through CW-25`
      };
    }

    const crosswalk = getCrosswalk(normalizedId);

    if (!crosswalk) {
      return {
        success: false,
        error: `Crosswalk not found: ${normalizedId}`
      };
    }

    return {
      success: true,
      data: {
        id: crosswalk.id,
        name: crosswalk.name,
        version: crosswalk.version,
        jurisdiction: crosswalk.jurisdiction,
        keyRequirements: crosswalk.keyRequirements,
        casaMappings: crosswalk.casaMappings,
        complianceGaps: crosswalk.complianceGaps,
        recommendedActions: crosswalk.recommendedActions
      }
    };
  } catch (error) {
    return {
      success: false,
      error: `Error looking up crosswalk: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
