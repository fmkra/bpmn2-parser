import { Connector, Node } from '../types';
export declare function parseConnector(connector: any): Connector;
export declare function addPointersToConnector(connector: Connector, map: Map<string, Node>): void;
