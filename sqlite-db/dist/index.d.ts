export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function execute_query(params: { database_path: string; query: string }): Promise<McpResult>;
  export function manage_schema(params: { database_path: string; action: string }): Promise<McpResult>;
  export function import_data(params: { database_path: string; source: string }): Promise<McpResult>;
  export function export_data(params: { database_path: string; format: string }): Promise<McpResult>;
  export function analyze_database(params: { database_path: string; analysis: string }): Promise<McpResult>;
};
