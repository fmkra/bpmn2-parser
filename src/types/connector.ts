import { Node } from './node'

export interface Connector {
    id: string
    source: Node
    target: Node
}
