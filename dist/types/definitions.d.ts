import { Process } from './process';
export interface Definitions {
    id: string;
    targetNamespace: string;
    exporter: string;
    exporterVersion: string;
    executionPlatform: string;
    executionPlatformVersion: string;
    messages: any[];
    processes: Process[];
}
