export interface Node {
    type: string
    id: string
    name?: string
    incoming: any[] // TODO: add connectors
    outgoing: any[] // TODO: add connectors
}
