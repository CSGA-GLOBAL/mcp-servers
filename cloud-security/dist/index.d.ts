export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function scan_posture(params: { provider: string; framework: string }): Promise<McpResult>;
  export function detect_threats(params: { scope: string; timeframe: string }): Promise<McpResult>;
  export function audit_permissions(params: { provider: string; check_type: string }): Promise<McpResult>;
  export function check_encryption(params: { resource_type: string; provider: string }): Promise<McpResult>;
  export function generate_compliance_report(params: { framework: string; format: string }): Promise<McpResult>;
};
