export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function list_issues(params: { project: string; filter: string }): Promise<McpResult>;
  export function get_issue_details(params: { issue_id: string; include: string }): Promise<McpResult>;
  export function monitor_performance(params: { project: string; metric: string }): Promise<McpResult>;
  export function manage_alerts(params: { project: string; action: string }): Promise<McpResult>;
};
