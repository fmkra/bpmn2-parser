import { Node } from '../types';
export type ParseMessageResult = [string, Node | undefined];
export default function parseMessage(message: any, messageToNode: Record<string, Node>): ParseMessageResult;
