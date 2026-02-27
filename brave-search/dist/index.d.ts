export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function web_search(params: { query: string; count: string }): Promise<McpResult>;
  export function news_search(params: { query: string; freshness: string }): Promise<McpResult>;
  export function summarize_results(params: { query: string; depth: string }): Promise<McpResult>;
};
