export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function list_servers(params: { filter: string; details: string }): Promise<McpResult>;
  export function route_request(params: { tool_name: string; strategy: string }): Promise<McpResult>;
  export function manage_connections(params: { action: string; server_id: string }): Promise<McpResult>;
  export function aggregate_tools(params: { filter: string; format: string }): Promise<McpResult>;
};
