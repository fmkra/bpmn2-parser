import { Process, Node, Definitions } from '../types'
import { getType } from '../utils/get-type'
import parseMessage from './message'
import { parseProcess } from './process'

export function parseDefinitions(definitions: any): Definitions {
    const meta = definitions[`:@`]

    const messages: any[] = [] // TODO: add Message type
    const processes: Process[] = []
    const messageToNode: Record<string, Node> = {}
    const parsedMessages: Record<string, Node> = {}

    for (const definition of definitions.definitions) {
        const type = getType(definition)
        switch (type) {
            case 'message':
                messages.push(definition)
                break
            case 'process':
                processes.push(parseProcess(definition, messageToNode))
                break
        }
    }

    for (const msg of messages) {
        const [key, val] = parseMessage(msg, messageToNode)
        if (val) parsedMessages[key] = val
    }

    return {
        id: meta[`@_id`],
        targetNamespace: meta[`@_targetNamespace`],
        exporter: meta[`@_exporter`],
        exporterVersion: meta[`@_exporterVersion`],
        executionPlatform: meta[`@_executionPlatform`],
        executionPlatformVersion: meta[`@_executionPlatformVersion`],
        messages: parsedMessages,
        processes: processes,
    }
}
