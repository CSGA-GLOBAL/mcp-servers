export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function manage_issues(params: { action: string; team: string }): Promise<McpResult>;
  export function manage_projects(params: { action: string; project_id: string }): Promise<McpResult>;
  export function search_issues(params: { query: string; filters: string }): Promise<McpResult>;
  export function analytics(params: { team: string; metric: string }): Promise<McpResult>;
};
