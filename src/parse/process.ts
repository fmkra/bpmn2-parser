import { Process, Node } from '../types'
import { getType } from '../utils/get-type'
import { parseNode } from './node'

export function parseProcess(process: any): Process {
    const nodes: Node[] = []

    for (const node of process.process) {
        const type = getType(node)
        if (type === 'sequenceFlow') {
        } else if (type !== 'laneSet') {
            nodes.push(parseNode(node))
        }
    }

    return {
        id: process[`:@`][`@_id`],
        isExecutable: process[`:@`][`@_isExecutable`] === 'true',
        nodes,
    }
}
