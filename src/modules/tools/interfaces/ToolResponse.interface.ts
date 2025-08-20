export interface ToolResponse {
    id: number;
    name: string;
    sku: string;
    quantity: string;
    description: string;
    last_modify: Date;
    last_modify_formatted?: string;
}
