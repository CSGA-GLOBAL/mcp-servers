export interface McpResult {
  content: Array<{ type: string; text: string }>;
}

export declare const server: {
  export function convert_time(params: { time: string; from_zone: string }): Promise<McpResult>;
  export function find_meeting_time(params: { participants: string; duration: string }): Promise<McpResult>;
  export function list_zones(params: { filter: string; format: string }): Promise<McpResult>;
};
