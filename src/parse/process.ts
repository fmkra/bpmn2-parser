import { Process, Node, Connector } from '../types'
import { getType } from '../utils/get-type'
import { addPointersToConnector, parseConnector } from './connector'
import { addPointerToNode, parseNode } from './node'

export function parseProcess(process: any, messageToNode?: Record<string, Node>): Process {
    const nodes: Node[] = []
    const connectors: Connector[] = []
    const startNodes: Node[] = []

    const nodeIdMap = new Map<string, Node>()
    const connectorIdMap = new Map<string, Connector>()

    for (const element of process.process) {
        const type = getType(element)
        if (type === 'sequenceFlow') {
            const parsedConnector = parseConnector(element)
            connectors.push(parsedConnector)
            connectorIdMap.set(parsedConnector.id, parsedConnector)
        } else if (type !== 'laneSet') {
            const parsedNode = parseNode(element, messageToNode)
            nodes.push(parsedNode)
            nodeIdMap.set(parsedNode.id, parsedNode)
            if (parsedNode.type == `startEvent`) {
                startNodes.push(parsedNode)
            }
        }
    }

    for (const connector of connectors) {
        addPointersToConnector(connector, nodeIdMap)
    }
    for (const node of nodes) {
        addPointerToNode(node, connectorIdMap)
    }

    return {
        id: process[`:@`][`@_id`],
        isExecutable: process[`:@`][`@_isExecutable`] === 'true',
        nodes,
        connectors,
        startNodes,
    }
}
