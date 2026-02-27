/**
 * charter-lookup.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";
import { getCharterArticle, listCharterArticles } from "../resources/charter.js";

export const CharterLookupSchema = z.object({
  article_number: z
    .number()
    .int()
    .describe("Charter article number (1-52)")
});

export interface CharterLookupResult {
  success: boolean;
  error?: string;
  data?: {
    number: number;
    title: string;
    content: string;
    keyPrinciples: string[];
    totalArticles?: number;
  };
}

export async function handleCharterLookup(
  articleNumber: number
): Promise<CharterLookupResult> {
  try {
    // Validate article number
    if (!Number.isInteger(articleNumber) || articleNumber < 1 || articleNumber > 52) {
      return {
        success: false,
        error: `Invalid article number: ${articleNumber}. Must be between 1 and 52.`
      };
    }

    const article = getCharterArticle(articleNumber);

    if (!article) {
      return {
        success: false,
        error: `Charter article not found: Article ${articleNumber}`
      };
    }

    return {
      success: true,
      data: {
        number: article.number,
        title: article.title,
        content: article.content,
        keyPrinciples: article.keyPrinciples,
        totalArticles: 52
      }
    };
  } catch (error) {
    return {
      success: false,
      error: `Error looking up charter article: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

export function getCharterSummary(): { total: number; articles: Array<{ number: number; title: string }> } {
  const articles = listCharterArticles();
  return {
    total: articles.length,
    articles: articles.map(num => {
      const article = getCharterArticle(num);
      return {
        number: num,
        title: article?.title || "Unknown"
      };
    })
  };
}
