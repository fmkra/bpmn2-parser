import { Connector, Node } from '../types';
export declare function parseNode(node: any, messageToNode?: Record<string, Node>): Node;
export declare function addPointerToNode(node: Node, map: Map<string, Connector>): void;
