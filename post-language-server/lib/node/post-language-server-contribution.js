"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("@theia/languages/lib/node");
var inversify_1 = require("inversify");
var path = require("path");
var net = require("net");
var server_1 = require("vscode-ws-jsonrpc/lib/server");
var common_1 = require("../common");
var PoSTLanguageServerContribution = /** @class */ (function (_super) {
    __extends(PoSTLanguageServerContribution, _super);
    function PoSTLanguageServerContribution() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = common_1.POST_LANGUAGE_SERVER_ID;
        _this.name = common_1.POST_LANGUAGE_SERVER_NAME;
        return _this;
    }
    PoSTLanguageServerContribution.prototype.start = function (clientConnection, options) {
        var socketPort = this.getPort();
        if (socketPort) {
            var socket_1 = new net.Socket();
            var serverConnection = server_1.createSocketConnection(socket_1, socket_1, function () {
                socket_1.destroy();
            });
            this.forward(clientConnection, serverConnection);
            socket_1.connect(socketPort);
        }
        else {
            console.log('No port available');
            var jar = path.resolve(path.join(__dirname, '..', '..', 'build', common_1.POST_LANGUAGE_SERVER_JAR_NAME));
            var command = 'java';
            var args = [
                '-jar',
                jar
            ];
            var serverConnection = this.createProcessStreamConnection(command, args);
            this.forward(clientConnection, serverConnection);
        }
    };
    PoSTLanguageServerContribution.prototype.getPort = function () {
        var parameter = '--POST_LSP=';
        var arg = process.argv.filter(function (arg) { return arg.startsWith(parameter); })[0];
        if (!arg) {
            return undefined;
        }
        else {
            return Number.parseInt(arg.substring(parameter.length), 10);
        }
    };
    PoSTLanguageServerContribution = __decorate([
        inversify_1.injectable()
    ], PoSTLanguageServerContribution);
    return PoSTLanguageServerContribution;
}(node_1.BaseLanguageServerContribution));
exports.PoSTLanguageServerContribution = PoSTLanguageServerContribution;
//# sourceMappingURL=post-language-server-contribution.js.map