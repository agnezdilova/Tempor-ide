import { JsonRpcServer } from '@theia/core/lib/common/messaging';
export declare const postTheiaRoot = "/home/vlad/post_ide/";
export declare const dsmWrapperServicePath = "/services/dsmWrapper";
export declare const IDSMWrapperServer: unique symbol;
export interface IDSMWrapperServer extends JsonRpcServer<IDSMWrapperClient> {
    scanDSMs(): Promise<string[]>;
    runDSM(id: string, uri: string[], serializedParameters?: string): Promise<void>;
}
export interface IDSMWrapperClient {
    onDSMLaunched(dsmName: string): void;
    onFailedToLaunchDSM(dsmName: string, reason: any): void;
    onDSMResultReceived(dsmName: string, result: string): void;
}
export interface DSMConfiguration {
    id: string;
    name: string;
    parameters: Object;
}
//# sourceMappingURL=dsm-wrapper-protocols.d.ts.map