export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function store_memory(params: { content: string; tags: string }): Promise<McpResult>;
  export function recall_memory(params: { query: string; context: string }): Promise<McpResult>;
  export function manage_entities(params: { action: string; entity_type: string }): Promise<McpResult>;
  export function query_graph(params: { pattern: string; depth: string }): Promise<McpResult>;
};
