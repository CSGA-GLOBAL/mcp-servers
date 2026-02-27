export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function run_audit(params: { framework: string; scope: string }): Promise<McpResult>;
  export function check_controls(params: { control_id: string; evidence_type: string }): Promise<McpResult>;
  export function gap_analysis(params: { framework: string; current_state: string }): Promise<McpResult>;
  export function generate_evidence(params: { control_id: string; period: string }): Promise<McpResult>;
  export function track_remediation(params: { status: string; priority: string }): Promise<McpResult>;
};
