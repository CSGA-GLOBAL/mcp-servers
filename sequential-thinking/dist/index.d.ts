export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function analyze_problem(params: { problem: string; approach: string }): Promise<McpResult>;
  export function chain_of_thought(params: { prompt: string; steps: string }): Promise<McpResult>;
  export function evaluate_reasoning(params: { reasoning: string; criteria: string }): Promise<McpResult>;
  export function synthesize_conclusions(params: { chains: string; method: string }): Promise<McpResult>;
};
