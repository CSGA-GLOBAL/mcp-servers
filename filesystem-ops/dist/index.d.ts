export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function list_directory(params: { path: string; recursive: string }): Promise<McpResult>;
  export function search_files(params: { path: string; pattern: string }): Promise<McpResult>;
  export function file_info(params: { path: string; checksum: string }): Promise<McpResult>;
  export function bulk_operations(params: { operation: string; source_pattern: string }): Promise<McpResult>;
};
