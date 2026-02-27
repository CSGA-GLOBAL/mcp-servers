export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function encrypt_message(params: { message: string; algorithm: string }): Promise<McpResult>;
  export function decrypt_message(params: { ciphertext: string; key_id: string }): Promise<McpResult>;
  export function manage_keys(params: { action: string; key_type: string }): Promise<McpResult>;
  export function verify_integrity(params: { message: string; signature: string }): Promise<McpResult>;
};
