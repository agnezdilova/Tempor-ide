import { BackendApplicationContribution } from '@theia/core/lib/node';
import { Application } from 'express';
import { ILogger } from '@theia/core';
import { IDSMWrapperClient, IDSMWrapperServer } from '../common/dsm-wrapper-protocols';
import { RawProcessFactory } from '@theia/process/lib/node/raw-process';
import { IAstService } from 'ast-service/lib/node/ast-service-protocol';
export declare class DSMWrapperServer implements IDSMWrapperServer, BackendApplicationContribution {
    private readonly astService;
    private readonly processFactory;
    private readonly logger;
    private managerPort;
    private started;
    private connection?;
    constructor(astService: IAstService, processFactory: RawProcessFactory, logger: ILogger);
    initialize(): void;
    setClient(client: IDSMWrapperClient): void;
    scanDSMs(): Promise<string[]>;
    private resolveDSMs;
    runDSM(id: string, uri: string[], serializedParameters?: string): Promise<void>;
    onStop(app?: Application): void;
    dispose(): void;
    private startManager;
    private connect;
    private getPort;
    private spawnProcessAsync;
    private showError;
    private onDidFailSpawnProcess;
    private getRequest;
    private postRequest;
    private sendRequest;
}
//# sourceMappingURL=dsm-wrapper-server.d.ts.map