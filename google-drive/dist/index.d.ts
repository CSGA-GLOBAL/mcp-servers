export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function list_files(params: { folder_id: string; query: string }): Promise<McpResult>;
  export function manage_files(params: { action: string; file_id: string }): Promise<McpResult>;
  export function manage_permissions(params: { file_id: string; action: string }): Promise<McpResult>;
  export function search_content(params: { query: string; file_type: string }): Promise<McpResult>;
};
