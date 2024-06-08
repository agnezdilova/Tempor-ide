"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var ast_service_1 = require("./ast-service");
var node_1 = require("@theia/core/lib/node");
var ast_service_protocol_1 = require("./ast-service-protocol");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(ast_service_1.AstService).toSelf().inSingletonScope();
    bind(ast_service_protocol_1.IAstService).toService(ast_service_1.AstService);
    bind(node_1.BackendApplicationContribution).toService(ast_service_1.AstService);
});
//# sourceMappingURL=ast-service-backend-module.js.map