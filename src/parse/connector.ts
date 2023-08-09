import { Connector, Node } from '../types'

export function parseConnector(connector: any): Connector {
    return {
        id: connector[`:@`][`@_id`],
        source: connector[`:@`][`@_sourceRef`],
        target: connector[`:@`][`@_targetRef`],
    }
}

export function addPointersToConnector(connector: Connector, map: Map<string, Node>) {
    const sourceNode = map.get(connector.source as any)
    const targetNode = map.get(connector.target as any)
    if (!sourceNode || !targetNode) {
        throw new Error(`Connector ${connector.id} has invalid source or target`)
    }
    connector.source = sourceNode
    connector.target = targetNode
}
