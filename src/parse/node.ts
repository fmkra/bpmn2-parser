import { Connector, Node } from '../types'
import { getType } from '../utils/get-type'
import { parseExtensions } from './extensions'

export function parseNode(node: any): Node {
    const type = getType(node)
    const incoming: string[] = []
    const outgoing: string[] = []

    for (const element of node[type]) {
        const elementType = getType(element)
        if (elementType === 'incoming') {
            incoming.push(element[elementType][0][`#text`])
        } else if (elementType === 'outgoing') {
            outgoing.push(element[elementType][0][`#text`])
        } else if (elementType === 'extensionElements') {
            // console.log(element[elementType])
            console.log(JSON.stringify(parseExtensions(element), null, 4))
            console.log(JSON.stringify(element, null, 4))
        }
    }

    return {
        type,
        id: node[`:@`][`@_id`],
        name: node[`:@`][`@_name`],
        // temporary store only ids
        // will be overwritten in parse/process.ts
        incoming: incoming as any,
        outgoing: outgoing as any,
    }
}

export function addPointerToNode(node: Node, map: Map<string, Connector>) {
    for (const i in node.incoming) {
        const connector = map.get(node.incoming[i] as any)
        if (!connector) {
            throw new Error(`Node ${node.id} has invalid incoming connector`)
        }
        node.incoming[i] = connector
    }
    for (const i in node.outgoing) {
        const connector = map.get(node.outgoing[i] as any)
        if (!connector) {
            throw new Error(`Node ${node.id} has invalid outgoing connector`)
        }
        node.outgoing[i] = connector
    }
}
