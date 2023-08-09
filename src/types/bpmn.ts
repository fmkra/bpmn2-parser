import { Definitions } from './definitions'
import { XmlInfo } from './xml-info'

export interface Participant {
    id: string
    name: string
    processRef: string
}

export interface Collaboration {
    id: string
    children: {
        participant: Participant[]
    }
}

export interface BPMN {
    xml: XmlInfo
    definitions: Definitions
}
