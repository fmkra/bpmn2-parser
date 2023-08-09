import { Process } from '../types';
export declare function parseDefinitions(definitions: any): {
    id: any;
    targetNamespace: any;
    exporter: any;
    exporterVersion: any;
    executionPlatform: any;
    executionPlatformVersion: any;
    messages: any[];
    processes: Process[];
};
