export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function execute_query(params: { query: string; database: string }): Promise<McpResult>;
  export function manage_schema(params: { action: string; target: string }): Promise<McpResult>;
  export function monitor_performance(params: { metric: string; threshold: string }): Promise<McpResult>;
  export function manage_backups(params: { action: string; database: string }): Promise<McpResult>;
};
