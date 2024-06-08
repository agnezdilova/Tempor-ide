"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var dsm_wrapper_client_1 = require("./dsm-wrapper-client");
var dsm_wrapper_protocols_1 = require("../common/dsm-wrapper-protocols");
var browser_1 = require("@theia/core/lib/browser");
var core_1 = require("@theia/core");
var dsm_menu_contribution_1 = require("./dsm-menu-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(core_1.MenuContribution).to(dsm_menu_contribution_1.DSMMenuContribution).inSingletonScope();
    bind(dsm_wrapper_client_1.DSMWrapperClient).toSelf().inSingletonScope();
    bind(dsm_wrapper_protocols_1.IDSMWrapperServer).toDynamicValue(function (ctx) {
        var connection = ctx.container.get(browser_1.WebSocketConnectionProvider);
        var client = ctx.container.get(dsm_wrapper_client_1.DSMWrapperClient);
        return connection.createProxy(dsm_wrapper_protocols_1.dsmWrapperServicePath, client);
    }).inSingletonScope();
});
//# sourceMappingURL=dsm-wrapper-frontend-module.js.map