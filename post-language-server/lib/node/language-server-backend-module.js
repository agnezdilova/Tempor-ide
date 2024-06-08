"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var node_1 = require("@theia/languages/lib/node");
var post_language_server_contribution_1 = require("./post-language-server-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(node_1.LanguageServerContribution).to(post_language_server_contribution_1.PoSTLanguageServerContribution).inSingletonScope;
});
//# sourceMappingURL=language-server-backend-module.js.map