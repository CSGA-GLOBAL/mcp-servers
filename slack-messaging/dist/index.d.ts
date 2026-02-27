export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function send_message(params: { channel: string; message: string }): Promise<McpResult>;
  export function manage_channels(params: { action: string; channel: string }): Promise<McpResult>;
  export function search_messages(params: { query: string; filters: string }): Promise<McpResult>;
  export function manage_workflows(params: { action: string; workflow_id: string }): Promise<McpResult>;
};
