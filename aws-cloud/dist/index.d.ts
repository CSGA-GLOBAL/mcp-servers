export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function list_resources(params: { service: string; region: string }): Promise<McpResult>;
  export function analyze_costs(params: { period: string; group_by: string }): Promise<McpResult>;
  export function check_security(params: { scope: string; severity: string }): Promise<McpResult>;
  export function manage_iam(params: { action: string; principal: string }): Promise<McpResult>;
  export function monitor_health(params: { service: string; metric: string }): Promise<McpResult>;
};
