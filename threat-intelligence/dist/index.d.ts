export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function lookup_ioc(params: { indicator: string; type: string }): Promise<McpResult>;
  export function analyze_threat(params: { threat_id: string; framework: string }): Promise<McpResult>;
  export function aggregate_feeds(params: { feeds: string; filter: string }): Promise<McpResult>;
  export function generate_report(params: { scope: string; format: string }): Promise<McpResult>;
  export function hunt_threats(params: { hypothesis: string; data_source: string }): Promise<McpResult>;
};
