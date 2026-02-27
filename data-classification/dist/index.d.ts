export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function classify_data(params: { source: string; scheme: string }): Promise<McpResult>;
  export function scan_pii(params: { source: string; jurisdictions: string }): Promise<McpResult>;
  export function apply_labels(params: { asset_id: string; label: string }): Promise<McpResult>;
  export function audit_classification(params: { scope: string; report_type: string }): Promise<McpResult>;
};
