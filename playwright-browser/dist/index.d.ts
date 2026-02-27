export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function navigate(params: { url: string; wait_for: string }): Promise<McpResult>;
  export function interact(params: { selector: string; action: string }): Promise<McpResult>;
  export function screenshot(params: { selector: string; format: string }): Promise<McpResult>;
  export function evaluate(params: { script: string; args: string }): Promise<McpResult>;
  export function run_test(params: { steps: string; assertions: string }): Promise<McpResult>;
};
