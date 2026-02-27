export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function fetch_url(params: { url: string; method: string }): Promise<McpResult>;
  export function test_api(params: { url: string; expected_status: string }): Promise<McpResult>;
  export function monitor_endpoint(params: { url: string; interval: string }): Promise<McpResult>;
};
