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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var dsm_wrapper_protocols_1 = require("../common/dsm-wrapper-protocols");
var uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
var DSMMenuContribution = /** @class */ (function () {
    function DSMMenuContribution() {
    }
    DSMMenuContribution.prototype.registerMenus = function (menus) {
        return __awaiter(this, void 0, void 0, function () {
            var menuPath, configs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        menuPath = ["navigator-context-menu", "dynamic-sub-menu", "dsm-sub-group"];
                        // register sub menu to show our DSM menu actions
                        menus.registerSubmenu(menuPath, "DSM");
                        return [4 /*yield*/, this.dsmWrapperServer.scanDSMs()];
                    case 1:
                        configs = _a.sent();
                        configs.forEach(function (config) {
                            var command = {
                                id: config,
                                label: config
                            };
                            var cmdHandler = new uri_command_handler_1.UriAwareCommandHandler(_this.selectionService, {
                                execute: function (uri) {
                                    _this.dsmWrapperServer.runDSM(command.id, uri.map(function (uri) { return uri.toString(); }));
                                },
                                isEnabled: function (uri) { return uri.every((function (value) { return value.toString().endsWith('post'); })); },
                                isVisible: function (uri) { return uri.every((function (value) { return value.toString().endsWith('post'); })); }
                            }, { multi: true });
                            _this.commands.registerCommand(command, cmdHandler);
                            menus.registerMenuAction(menuPath, { commandId: command.id });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(common_1.CommandRegistry),
        __metadata("design:type", common_1.CommandRegistry)
    ], DSMMenuContribution.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(dsm_wrapper_protocols_1.IDSMWrapperServer),
        __metadata("design:type", Object)
    ], DSMMenuContribution.prototype, "dsmWrapperServer", void 0);
    __decorate([
        inversify_1.inject(common_1.SelectionService),
        __metadata("design:type", common_1.SelectionService)
    ], DSMMenuContribution.prototype, "selectionService", void 0);
    DSMMenuContribution = __decorate([
        inversify_1.injectable()
    ], DSMMenuContribution);
    return DSMMenuContribution;
}());
exports.DSMMenuContribution = DSMMenuContribution;
//# sourceMappingURL=dsm-menu-contribution.js.map