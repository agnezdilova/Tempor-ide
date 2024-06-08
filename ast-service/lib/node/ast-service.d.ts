/// <reference types="node" />
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { RawProcess, RawProcessFactory } from '@theia/process/lib/node/raw-process';
import * as cp from 'child_process';
import { Application } from 'express';
import * as rpc from 'vscode-jsonrpc';
import { IAstService } from './ast-service-protocol';
import { ILogger } from '@theia/core';
export declare class AstService implements IAstService, BackendApplicationContribution {
    private readonly processFactory;
    private readonly logger;
    private startedServer;
    private connection?;
    constructor(processFactory: RawProcessFactory, logger: ILogger);
    initialize(): void;
    private getPort;
    private startServer;
    private connect;
    protected spawnProcessAsync(command: string, args?: string[], options?: cp.SpawnOptions): Promise<RawProcess>;
    protected showError(data: string | Buffer): void;
    private waitUntilServerReady;
    protected onDidFailSpawnProcess(error: Error): void;
    getAST(fileUri: string): Promise<string>;
    createGetSerializedAstRequest(): rpc.RequestType<string, string, Error, void>;
    onStop(app?: Application): void;
    dispose(): void;
}
//# sourceMappingURL=ast-service.d.ts.map