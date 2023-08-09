import { XMLParser } from 'fast-xml-parser'

export function parse(content: string) {
    const sections: any[] = new XMLParser({
        allowBooleanAttributes: true,
        ignoreAttributes: false,
        preserveOrder: true,
        removeNSPrefix: true,
        trimValues: true,
    }).parse(content)

    console.log(sections)
}
