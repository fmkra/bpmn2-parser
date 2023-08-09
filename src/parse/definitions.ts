import { Definitions, Process } from '../types'
import { getType } from '../utils/get-type'
import { parseProcess } from './process'

export function parseDefinitions(definitions: any) {
    const meta = definitions[`:@`]

    const messages: any[] = [] // TODO: add Message type
    const processes: Process[] = []

    for (const definition of definitions.definitions) {
        const type = getType(definition)
        switch (type) {
            case 'message':
                messages.push(definition)
                break
            case 'process':
                processes.push(parseProcess(definition))
                break
        }
    }

    return {
        id: meta[`@_id`],
        targetNamespace: meta[`@_targetNamespace`],
        exporter: meta[`@_exporter`],
        exporterVersion: meta[`@_exporterVersion`],
        executionPlatform: meta[`@_executionPlatform`],
        executionPlatformVersion: meta[`@_executionPlatformVersion`],
        messages: messages,
        processes: processes,
    }
}
