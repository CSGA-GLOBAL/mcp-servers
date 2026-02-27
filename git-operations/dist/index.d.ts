export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function repo_status(params: { repo_path: string; include: string }): Promise<McpResult>;
  export function analyze_commits(params: { repo_path: string; range: string }): Promise<McpResult>;
  export function manage_branches(params: { action: string; branch_name: string }): Promise<McpResult>;
  export function resolve_conflicts(params: { repo_path: string; strategy: string }): Promise<McpResult>;
  export function generate_changelog(params: { repo_path: string; format: string }): Promise<McpResult>;
};
