export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function analyze_csv(params: { file_path: string; analysis_type: string }): Promise<McpResult>;
  export function transform_data(params: { file_path: string; operations: string }): Promise<McpResult>;
  export function detect_patterns(params: { file_path: string; method: string }): Promise<McpResult>;
  export function generate_chart(params: { file_path: string; chart_type: string }): Promise<McpResult>;
  export function query_data(params: { file_path: string; query: string }): Promise<McpResult>;
};
