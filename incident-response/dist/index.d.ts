export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function triage_incident(params: { incident_id: string; indicators: string }): Promise<McpResult>;
  export function investigate(params: { incident_id: string; scope: string }): Promise<McpResult>;
  export function contain_threat(params: { incident_id: string; action: string }): Promise<McpResult>;
  export function generate_timeline(params: { incident_id: string; format: string }): Promise<McpResult>;
  export function post_incident_review(params: { incident_id: string; template: string }): Promise<McpResult>;
};
