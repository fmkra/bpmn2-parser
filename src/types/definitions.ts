import { Process } from './process'
import { Node } from './node'

export interface Definitions {
    id: string
    targetNamespace: string
    exporter: string
    exporterVersion: string
    executionPlatform: string
    executionPlatformVersion: string
    messages: Record<string, Node>
    processes: Process[]
}
