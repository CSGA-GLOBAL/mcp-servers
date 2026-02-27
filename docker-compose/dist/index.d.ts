export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function manage_services(params: { action: string; service: string }): Promise<McpResult>;
  export function validate_config(params: { file_path: string; check_type: string }): Promise<McpResult>;
  export function monitor_health(params: { service: string; metric: string }): Promise<McpResult>;
  export function manage_volumes(params: { action: string; volume_name: string }): Promise<McpResult>;
};
