export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function run_assessment(params: { target: string; attack_type: string }): Promise<McpResult>;
  export function generate_adversarial(params: { target_type: string; technique: string }): Promise<McpResult>;
  export function assess_guardrails(params: { system_id: string; test_suite: string }): Promise<McpResult>;
  export function generate_report(params: { assessment_id: string; format: string }): Promise<McpResult>;
  export function track_findings(params: { action: string; severity: string }): Promise<McpResult>;
};
