export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function transform_json(params: { input: string; mapping: string }): Promise<McpResult>;
  export function validate_schema(params: { data: string; schema: string }): Promise<McpResult>;
  export function query_json(params: { data: string; query: string }): Promise<McpResult>;
  export function convert_format(params: { input: string; from_format: string }): Promise<McpResult>;
};
