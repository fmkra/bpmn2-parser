import { Connector, Node } from '../types';
export declare function parseNode(node: any): Node;
export declare function addPointerToNode(node: Node, map: Map<string, Connector>): void;
