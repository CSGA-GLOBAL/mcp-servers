export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function deploy_project(params: { project_path: string; environment: string }): Promise<McpResult>;
  export function list_deployments(params: { project_id: string; filter: string }): Promise<McpResult>;
  export function manage_domains(params: { action: string; domain: string }): Promise<McpResult>;
  export function manage_env_vars(params: { project_id: string; action: string }): Promise<McpResult>;
  export function get_logs(params: { deployment_id: string; type: string }): Promise<McpResult>;
};
