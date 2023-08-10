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

    let nodeValues = node[`:@`]

    if (nodeType === `input`) {
        const key = nodeValues[`@_target`]
        const value = JSON.parse(nodeValues[`@_source`].substring(1))

        nodeValues = {
            [key]: value,
        }
    }

    return {
        ...nodeValues,
        ...extensions,
    }
}
