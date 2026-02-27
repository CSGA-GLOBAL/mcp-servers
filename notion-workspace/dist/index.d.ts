export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function manage_pages(params: { action: string; page_id: string }): Promise<McpResult>;
  export function query_database(params: { database_id: string; filter: string }): Promise<McpResult>;
  export function manage_blocks(params: { page_id: string; action: string }): Promise<McpResult>;
  export function search_workspace(params: { query: string; filter: string }): Promise<McpResult>;
};
