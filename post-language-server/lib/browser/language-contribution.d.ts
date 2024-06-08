import { Workspace, Languages, LanguageClientFactory, BaseLanguageClientContribution } from '@theia/languages/lib/browser';
export declare class PoSTClientContribution extends BaseLanguageClientContribution {
    protected readonly workspace: Workspace;
    protected readonly languages: Languages;
    protected readonly languageClientFactory: LanguageClientFactory;
    readonly id = "tempor";
    readonly name = "tempor DSL";
    constructor(workspace: Workspace, languages: Languages, languageClientFactory: LanguageClientFactory);
    protected get globPatterns(): string[];
    protected get documentSelector(): string[];
}
//# sourceMappingURL=language-contribution.d.ts.map