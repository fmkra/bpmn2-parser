import { XMLParser } from 'fast-xml-parser'
import { BpmnParsingError } from '../error'
import { parseDefinitions } from './definitions'
import { BPMN, XmlInfo } from '../types'

export function parseBpmn(content: string): BPMN {
    const sections: any[] = new XMLParser({
        allowBooleanAttributes: true,
        ignoreAttributes: false,
        preserveOrder: true,
        removeNSPrefix: true,
        trimValues: true,
    }).parse(content)

    const xml = sections[0][`:@`]

    const definitions = sections[1]
    if (!('definitions' in definitions)) {
        throw new BpmnParsingError(`No definitions found`)
    }

    return {
        xml: {
            version: xml['@_version'],
            encoding: xml['@_encoding'],
        } as XmlInfo,
        definitions: parseDefinitions(definitions),
    }
}
