import { Node } from '../types'

export type ParseMessageResult = [string, Node | undefined] // key, value

export default function parseMessage(message: any, messageToNode: Record<string, Node>): ParseMessageResult {
    console.log(message[`:@`])
    // for (const msg in message[`:@`]) {
    // result[msg[`@_name`]] = messageToNode[msg[`@_id`]]
    // }
    const key = message[`:@`][`@_name`]
    const val = messageToNode[message[`:@`][`@_id`]]
    return [key, val]
}
