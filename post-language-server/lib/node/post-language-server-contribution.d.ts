import { BaseLanguageServerContribution, IConnection, LanguageServerStartOptions } from '@theia/languages/lib/node';
export declare class PoSTLanguageServerContribution extends BaseLanguageServerContribution {
    readonly id = "tempor";
    readonly name = "tempor DSL";
    start(clientConnection: IConnection, options: LanguageServerStartOptions): void;
    getPort(): number | undefined;
}
//# sourceMappingURL=post-language-server-contribution.d.ts.map