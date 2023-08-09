export interface Node {
    type: string;
    id: string;
    name?: string;
    incoming: any[];
    outgoing: any[];
}
