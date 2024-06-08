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
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var http = require("http");
var raw_process_1 = require("@theia/process/lib/node/raw-process");
var rpc = require("vscode-jsonrpc");
var path = require("path");
var glob = require("glob");
var net = require("net");
var server_1 = require("vscode-ws-jsonrpc/lib/server");
var ast_service_protocol_1 = require("ast-service/lib/node/ast-service-protocol");
var DSMWrapperServer = /** @class */ (function () {
    function DSMWrapperServer(astService, processFactory, logger) {
        this.astService = astService;
        this.processFactory = processFactory;
        this.logger = logger;
        this.started = false;
    }
    DSMWrapperServer.prototype.initialize = function () {
        var _this = this;
        this.logger.info('[DSM manager] Initialization').then(function () { });
        if (!this.started) {
            this.startManager().then(function () { return _this.connect(); });
        }
        else {
            this.connect();
        }
    };
    DSMWrapperServer.prototype.setClient = function (client) {
        this.logger.info('Set client');
    };
    DSMWrapperServer.prototype.scanDSMs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise((function (resolve, _) {
                        if (_this.connection) {
                            _this.resolveDSMs(resolve);
                        }
                        else {
                            setTimeout(function () { return _this.resolveDSMs(resolve); }, 2000);
                        }
                    }))];
            });
        });
    };
    DSMWrapperServer.prototype.resolveDSMs = function (resolve) {
        var _this = this;
        this.getRequest('alive-modules').then(function (result) {
            var _a;
            var DSMs = [];
            var content = JSON.parse(result)['content'];
            (_a = content['modules']) === null || _a === void 0 ? void 0 : _a.forEach(function (module) { return DSMs.push(module['name']); });
            resolve(DSMs);
        }).catch(function (_) {
            _this.resolveDSMs(resolve);
        });
    };
    DSMWrapperServer.prototype.runDSM = function (id, uri, serializedParameters) {
        var _this = this;
        return new Promise((function (resolve, reject) {
            if (_this.connection) {
                _this.astService.getAST(uri[0]).then(function (ast) {
                    var nameOffset = uri[0].lastIndexOf('/');
                    var fileName = uri[0].substring(nameOffset + 1);
                    var body = {
                        id: id,
                        root: uri[0].substring(7, nameOffset),
                        fileName: fileName.substring(0, fileName.lastIndexOf('.')),
                        ast: ast
                    };
                    _this.postRequest('run/' + id, JSON.stringify(body)).then(function (result) {
                        resolve();
                    });
                });
            }
            else {
                reject(new Error('No connection to AST wrapper server'));
            }
        }));
    };
    DSMWrapperServer.prototype.onStop = function (app) {
        this.dispose();
    };
    DSMWrapperServer.prototype.dispose = function () {
        if (this.connection) {
            this.connection.dispose();
        }
    };
    DSMWrapperServer.prototype.startManager = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stuffPath, jarPaths, amJsonPaths, jarPath, amJsonPath, command, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stuffPath = path.resolve(__dirname, '..', '..', 'build');
                        jarPaths = glob.sync('**/manager.jar', { cwd: stuffPath });
                        if (jarPaths.length === 0) {
                            throw new Error('The DSM manager launcher was not found.');
                        }
                        amJsonPaths = glob.sync('**/available-modules.json', { cwd: stuffPath });
                        if (amJsonPaths.length === 0) {
                            throw new Error('The available-modules.json file was not found.');
                        }
                        jarPath = path.resolve(stuffPath, jarPaths[0]);
                        amJsonPath = path.resolve(stuffPath, amJsonPaths[0]);
                        this.managerPort = this.getPort();
                        command = 'java';
                        args = [];
                        args.push('-jar', jarPath);
                        args.push('-amj', amJsonPath, '-sam', '-p', this.managerPort);
                        return [4 /*yield*/, this.logger.info('[DSM manager] Spawning launch process with command ' + command + ' and arguments ' + args)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.spawnProcessAsync(command, args)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.logger.info('[DSM manager] Spawned launch process')];
                    case 3:
                        _a.sent();
                        this.started = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    DSMWrapperServer.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var port, socket, connection;
            var _this = this;
            return __generator(this, function (_a) {
                port = this.managerPort;
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
    DSMWrapperServer.prototype.getPort = function () {
        var stuffPath = path.resolve(__dirname, '..', '..', 'build');
        var mpPaths = glob.sync('**/manager.properties', { cwd: stuffPath });
        if (mpPaths.length === 0) {
            throw new Error('The manager.properties file was not found.');
        }
        var mpPath = path.resolve(stuffPath, mpPaths[0]);
        var propertiesReader = require('properties-reader');
        var properties = propertiesReader(mpPath);
        return properties.get('port');
    };
    DSMWrapperServer.prototype.spawnProcessAsync = function (command, args, options) {
        var _this = this;
        var rawProcess = this.processFactory({ command: command, args: args, options: options });
        // rawProcess.outputStream.on('data', this.showInfo.bind(this));
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
    // private showInfo(data: string | Buffer) {
    //     this.logger.info(data.toString()).then(() => { });
    // }
    DSMWrapperServer.prototype.showError = function (data) {
        this.logger.error(data.toString()).then(function () { });
    };
    DSMWrapperServer.prototype.onDidFailSpawnProcess = function (error) {
        this.logger.error('[DSM manager] Failed to spawn process: ' + error.message).then(function () { });
    };
    DSMWrapperServer.prototype.getRequest = function (command, body) {
        var request = {
            host: '127.0.0.1',
            port: this.managerPort,
            path: '/' + command,
            method: 'GET'
        };
        return this.sendRequest(request, body);
    };
    DSMWrapperServer.prototype.postRequest = function (command, body) {
        var request = {
            host: '127.0.0.1',
            port: this.managerPort,
            path: '/' + command,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return this.sendRequest(request, body);
    };
    DSMWrapperServer.prototype.sendRequest = function (options, body) {
        return new Promise((function (resolve, reject) {
            var request = http.request(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    resolve(data);
                });
                res.on('error', function (error) {
                    reject(error);
                });
            });
            request.setTimeout(2000);
            request.on('error', function (e) {
                reject(e);
            });
            if (body != undefined) {
                request.write(body);
            }
            request.end();
        }));
    };
    DSMWrapperServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(ast_service_protocol_1.IAstService)),
        __param(1, inversify_1.inject(raw_process_1.RawProcessFactory)),
        __param(2, inversify_1.inject(core_1.ILogger)),
        __metadata("design:paramtypes", [Object, Function, Object])
    ], DSMWrapperServer);
    return DSMWrapperServer;
}());
exports.DSMWrapperServer = DSMWrapperServer;
//# sourceMappingURL=dsm-wrapper-server.js.map