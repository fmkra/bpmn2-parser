import { Node } from './node'
import { Connector } from './connector'

export interface Process {
    id: string
    isExecutable: boolean
    nodes: Node[]
    startNodes: Node[]
    connectors: Connector[]
}
