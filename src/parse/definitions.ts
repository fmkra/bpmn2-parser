import { Definitions } from '../types'
import { getType } from '../utils/get-type'

export function parseDefinitions(definitions: any): Definitions {
    const meta = definitions[`:@`]

    const messages = []

    for (const definition of definitions.definitions) {
        const type = getType(definition)
        switch (type) {
            case 'message':
                messages.push(definition)
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
        messages: meta[`@_message`],
        processes: meta[`@_process`],
    }
}
