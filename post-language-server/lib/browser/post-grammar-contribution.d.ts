/// <reference types="@typefox/monaco-editor-core/monaco" />
import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
export declare class PoSTGrammarContribution implements LanguageGrammarDefinitionContribution {
    readonly scopeName = "source.tempor";
    readonly scopeNameST = "source.st";
    registerTextmateLanguage(registry: TextmateRegistry): void;
    protected configuration: monaco.languages.LanguageConfiguration;
}
//# sourceMappingURL=post-grammar-contribution.d.ts.map