export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function evaluate_policy(params: { resource: string; policy_set: string }): Promise<McpResult>;
  export function manage_policies(params: { action: string; policy_id: string }): Promise<McpResult>;
  export function audit_enforcement(params: { scope: string; period: string }): Promise<McpResult>;
  export function generate_policy(params: { description: string; format: string }): Promise<McpResult>;
};
