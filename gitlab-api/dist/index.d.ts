export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function manage_projects(params: { project_id: string; action: string }): Promise<McpResult>;
  export function manage_pipelines(params: { project_id: string; action: string }): Promise<McpResult>;
  export function manage_merge_requests(params: { project_id: string; action: string }): Promise<McpResult>;
  export function manage_registry(params: { project_id: string; action: string }): Promise<McpResult>;
};
