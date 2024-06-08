"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var DSMWrapperClient = /** @class */ (function () {
    function DSMWrapperClient(messageService) {
        this.messageService = messageService;
    }
    DSMWrapperClient.prototype.onDSMLaunched = function (dsmName) {
        this.messageService.info(dsmName + " has been launched");
    };
    DSMWrapperClient.prototype.onFailedToLaunchDSM = function (dsmName, reason) {
        this.messageService.error("Failed to launch " + dsmName + ": " + reason);
    };
    DSMWrapperClient.prototype.onDSMResultReceived = function (dsmName, result) {
        this.messageService.info(dsmName + " finished working: " + result);
    };
    DSMWrapperClient = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(core_1.MessageService)),
        __metadata("design:paramtypes", [core_1.MessageService])
    ], DSMWrapperClient);
    return DSMWrapperClient;
}());
exports.DSMWrapperClient = DSMWrapperClient;
//# sourceMappingURL=dsm-wrapper-client.js.map