export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function search_docs(params: { query: string; library: string }): Promise<McpResult>;
  export function get_context(params: { topic: string; version: string }): Promise<McpResult>;
  export function cross_reference(params: { concept: string; sources: string }): Promise<McpResult>;
};
