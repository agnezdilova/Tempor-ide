"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var messaging_1 = require("@theia/core/lib/common/messaging");
var node_1 = require("@theia/core/lib/node");
var dsm_wrapper_server_1 = require("./dsm-wrapper-server");
var dsm_wrapper_protocols_1 = require("../common/dsm-wrapper-protocols");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(dsm_wrapper_server_1.DSMWrapperServer).toSelf().inSingletonScope();
    bind(node_1.BackendApplicationContribution).toService(dsm_wrapper_server_1.DSMWrapperServer);
    bind(messaging_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new messaging_1.JsonRpcConnectionHandler(dsm_wrapper_protocols_1.dsmWrapperServicePath, function (client) {
            var dsmWrapperServer = ctx.container.get(dsm_wrapper_server_1.DSMWrapperServer);
            dsmWrapperServer.setClient(client);
            return dsmWrapperServer;
        });
    }).inSingletonScope();
});
//# sourceMappingURL=dsm-wrapper-backend-module.js.map