import { IDSMWrapperClient } from "../common/dsm-wrapper-protocols";
import { MessageService } from "@theia/core";
export declare class DSMWrapperClient implements IDSMWrapperClient {
    private readonly messageService;
    constructor(messageService: MessageService);
    onDSMLaunched(dsmName: string): void;
    onFailedToLaunchDSM(dsmName: string, reason: any): void;
    onDSMResultReceived(dsmName: string, result: string): void;
}
//# sourceMappingURL=dsm-wrapper-client.d.ts.map