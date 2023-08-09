import { Node } from '../types'
import { getType } from '../utils/get-type'

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
        }
    }

    return {
        type,
        id: node[`:@`][`@_id`],
        name: node[`:@`][`@_name`],
        incoming: incoming,
        outgoing: outgoing,
    }
}
