"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var language_client_contribution_1 = require("@theia/languages/lib/browser/language-client-contribution");
var textmate_1 = require("@theia/monaco/lib/browser/textmate");
var language_contribution_1 = require("./language-contribution");
var post_grammar_contribution_1 = require("./post-grammar-contribution");
var inversify_1 = require("inversify");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(language_client_contribution_1.LanguageClientContribution).to(language_contribution_1.PoSTClientContribution);
    bind(textmate_1.LanguageGrammarDefinitionContribution).to(post_grammar_contribution_1.PoSTGrammarContribution);
});
//# sourceMappingURL=language-server-frontend-module.js.map