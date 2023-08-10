import { getType } from '../utils/get-type'

export function parseExtensions(node: any) {
    const nodeType = getType(node)
    const sections = node[nodeType]
    const extensions: any = {}

    if (!Array.isArray(sections)) {
        return sections
    }

    sections.forEach((section) => {
        const sectionName = getType(section)

        const nested = parseExtensions(section)
        if (typeof nested !== `object`) {
            extensions[sectionName] = nested
            return
        }

        extensions[sectionName] = {
            ...extensions[sectionName],
            ...nested,
        }
    })

    const target = node[`:@`]?.[`@_target`]
    const source = node[`:@`]?.[`@_source`]
    const name = node[`:@`]?.[`@_name`]
    const value = node[`:@`]?.[`@_value`]
    const key = node[`:@`]?.[`@_key`]

    if (target && source) {
        // iomapping
        return {
            [target]: source.substring(1),
            ...extensions,
        }
    }
    if (name && value) {
        // properties
        return {
            [name]: value,
            ...extensions,
        }
    }
    if (key && value) {
        // taskHeaders
        return {
            [key]: value,
            ...extensions,
        }
    }

    return {
        ...node[`:@`],
        ...extensions,
    }
}
