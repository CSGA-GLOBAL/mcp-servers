export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function navigate_page(params: { url: string; wait_until: string }): Promise<McpResult>;
  export function extract_content(params: { selector: string; extract_type: string }): Promise<McpResult>;
  export function generate_pdf(params: { url: string; options: string }): Promise<McpResult>;
  export function take_screenshot(params: { url: string; viewport: string }): Promise<McpResult>;
};
