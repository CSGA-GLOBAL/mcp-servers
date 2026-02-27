export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function assess_dsrb_compliance(params: { system_id: string; standard: string }): Promise<McpResult>;
  export function evaluate_interoperability(params: { system_id: string; partners: string }): Promise<McpResult>;
  export function classify_system(params: { system_id: string; framework: string }): Promise<McpResult>;
  export function generate_assurance_case(params: { system_id: string; template: string }): Promise<McpResult>;
  export function audit_supply_chain(params: { system_id: string; depth: string }): Promise<McpResult>;
};
