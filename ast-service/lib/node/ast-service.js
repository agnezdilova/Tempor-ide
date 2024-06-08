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
var raw_process_1 = require("@theia/process/lib/node/raw-process");
var glob = require("glob");
var inversify_1 = require("inversify");
var net = require("net");
var path = require("path");
var rpc = require("vscode-jsonrpc");
var server_1 = require("vscode-ws-jsonrpc/lib/server");
var core_1 = require("@theia/core");
var DEFAULT_PORT = 8023;
var AstService = /** @class */ (function () {
    function AstService(processFactory, logger) {
        this.processFactory = processFactory;
        this.logger = logger;
        this.startedServer = false;
    }
    AstService.prototype.initialize = function () {
        var _this = this;
        var port = this.getPort();
        if (!port) {
            port = DEFAULT_PORT;
        }
        if (!this.startedServer) {
            this.startServer(port).then(function () { return _this.connect(port); });
        }
        else {
            this.connect(port);
        }
    };
    AstService.prototype.getPort = function () {
        var arg = process.argv.filter(function (arg) { return arg.startsWith('--AST_SERVICE_PORT='); })[0];
        if (!arg) {
            return undefined;
        }
        else {
            return Number.parseInt(arg.substring('--AST_SERVICE_PORT='.length), 10);
        }
    };
    AstService.prototype.startServer = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var serverPath, jarPaths, jarPath, command, args, process;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serverPath = path.resolve(__dirname, '..', '..', 'build');
                        jarPaths = glob.sync('**/su.nsk.iae.post.astwrapper-1.0.jar', { cwd: serverPath });
                        if (jarPaths.length === 0) {
                            throw new Error('The AST Wrapper server launcher is not found.');
                        }
                        jarPath = path.resolve(serverPath, jarPaths[0]);
                        command = 'java';
                        args = [];
                        args.push('-jar', jarPath);
                        args.push('-host', 'localhost', '-port', DEFAULT_PORT.toString());
                        this.logger.info('[AST Service] Spawn Process with command ' + command + ' and arguments ' + args);
                        return [4 /*yield*/, this.spawnProcessAsync(command, args)];
                    case 1:
                        process = _a.sent();
                        this.logger.info('[AST Service] Spawned process, waiting for server to be ready');
                        return [4 /*yield*/, this.waitUntilServerReady(process)];
                    case 2:
                        _a.sent();
                        this.logger.info('[AST Service] Server communicated to be ready');
                        this.startedServer = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    AstService.prototype.connect = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var socket, connection;
            var _this = this;
            return __generator(this, function (_a) {
                socket = new net.Socket();
                connection = server_1.createSocketConnection(socket, socket, function () {
                    _this.logger.info('[AST Service] Socket connection disposed');
                    socket.destroy();
                });
                socket.connect(port);
                this.connection = rpc.createMessageConnection(connection.reader, connection.writer);
                this.connection.listen();
                return [2 /*return*/];
            });
        });
    };
    AstService.prototype.spawnProcessAsync = function (command, args, options) {
        var _this = this;
        var rawProcess = this.processFactory({ command: command, args: args, options: options });
        rawProcess.errorStream.on('data', this.showError.bind(this));
        return new Promise(function (resolve, reject) {
            rawProcess.onError(function (error) {
                _this.onDidFailSpawnProcess(error);
                if (error.code === 'ENOENT') {
                    var guess = command.split(/\s+/).shift();
                    if (guess) {
                        reject(new Error("Failed to spawn " + guess + "\nPerhaps it is not on the PATH."));
                        return;
                    }
                }
                reject(error);
            });
            process.nextTick(function () { return resolve(rawProcess); });
        });
    };
    AstService.prototype.showError = function (data) {
        this.logger.error(data.toString());
    };
    AstService.prototype.waitUntilServerReady = function (process) {
        var _this = this;
        return new Promise(function (resolve) {
            return process.outputStream.on('data', function (data) {
                var message = String.fromCharCode.apply(null, data);
                _this.logger.info('[AST Service] Server output: ' + message);
                if (message.includes('Ready')) {
                    return resolve(data);
                }
            });
        });
    };
    AstService.prototype.onDidFailSpawnProcess = function (error) {
        this.logger.error('[AST Service] Fail to spawn process: ' + error.message);
    };
    AstService.prototype.getAST = function (fileUri) {
        var _this = this;
        return new Promise((function (resolve, reject) {
            if (_this.connection) {
                _this.connection.sendRequest(_this.createGetSerializedAstRequest(), fileUri)
                    .then(function (res) { return resolve(res); }, function (rej) { return reject(rej); });
            }
            else {
                reject(new Error('No connection to AST wrapper server'));
            }
        }));
    };
    AstService.prototype.createGetSerializedAstRequest = function () {
        return new rpc.RequestType('getSerializedAST');
    };
    AstService.prototype.onStop = function (app) {
        this.dispose();
    };
    AstService.prototype.dispose = function () {
        if (this.connection) {
            this.connection.dispose();
        }
    };
    AstService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(raw_process_1.RawProcessFactory)),
        __param(1, inversify_1.inject(core_1.ILogger)),
        __metadata("design:paramtypes", [Function, Object])
    ], AstService);
    return AstService;
}());
exports.AstService = AstService;
//# sourceMappingURL=ast-service.js.map