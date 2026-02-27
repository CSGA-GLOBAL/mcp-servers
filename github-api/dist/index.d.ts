export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function manage_issues(params: { repo: string; action: string }): Promise<McpResult>;
  export function manage_prs(params: { repo: string; action: string }): Promise<McpResult>;
  export function repo_analytics(params: { repo: string; metric: string }): Promise<McpResult>;
  export function manage_actions(params: { repo: string; action: string }): Promise<McpResult>;
  export function search_code(params: { query: string; scope: string }): Promise<McpResult>;
};
