import { Node } from './node';
export interface Process {
    id: string;
    isExecutable: boolean;
    nodes: Node[];
}
