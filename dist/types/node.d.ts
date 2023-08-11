import { Connector } from './connector';
export interface Node {
    type: string;
    id: string;
    name?: string;
    incoming: Connector[];
    outgoing: Connector[];
    extensions?: any;
}
