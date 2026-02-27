export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function assess_compliance(params: { system_name: string; framework: string }): Promise<McpResult>;
  export function generate_audit_trail(params: { system_id: string; date_range: string }): Promise<McpResult>;
  export function evaluate_risk(params: { system_name: string; risk_category: string }): Promise<McpResult>;
  export function enforce_policy(params: { policy_id: string; scope: string }): Promise<McpResult>;
  export function generate_report(params: { report_type: string; format: string }): Promise<McpResult>;
};
