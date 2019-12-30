"use strict";
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
var error_handler_1 = require("../infrastructure/error-handler");
var response_handler_1 = require("../infrastructure/response-handler");
var execution_status_1 = require("./enum/execution-status");
var get_email_1 = require("../infrastructure/get-email");
var service_factory_1 = require("../infrastructure/service-factory");
var userService = service_factory_1.getUserService();
var teamService = service_factory_1.getTeamService();
var testExecutionService = service_factory_1.getTestExecutionService();
var getResults = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                context.callbackWaitsForEmptyEventLoop = false;
                return [4 /*yield*/, teamService.getAll()];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response_handler_1.responseHandler(response)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, error_handler_1.errorHandler(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getResults = getResults;
var getLatestExecution = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var email, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                context.callbackWaitsForEmptyEventLoop = false;
                email = get_email_1.getEmail(event);
                return [4 /*yield*/, userService.checkAccess(event.pathParameters.teamId, email)];
            case 1:
                _a.sent();
                return [4 /*yield*/, testExecutionService.getLatestExecution(event.pathParameters.teamId)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response_handler_1.responseHandler(response)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, error_handler_1.errorHandler(error_2)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLatestExecution = getLatestExecution;
var getApiUrl = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                context.callbackWaitsForEmptyEventLoop = false;
                return [4 /*yield*/, teamService.getApiUrl(event.pathParameters.teamId)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response_handler_1.responseHandler(response)];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, error_handler_1.errorHandler(error_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getApiUrl = getApiUrl;
var putApiUrl = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var email, response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                context.callbackWaitsForEmptyEventLoop = false;
                email = get_email_1.getEmail(event);
                return [4 /*yield*/, userService.checkAccess(event.pathParameters.teamId, email)];
            case 1:
                _a.sent();
                return [4 /*yield*/, teamService.updateApiUrl(event.pathParameters.teamId, JSON.parse(event.body).apiUrl)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response_handler_1.responseHandler(response)];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, error_handler_1.errorHandler(error_4)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.putApiUrl = putApiUrl;
var postTestRequest = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var email, response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                context.callbackWaitsForEmptyEventLoop = false;
                email = get_email_1.getEmail(event);
                return [4 /*yield*/, userService.checkAccess(event.pathParameters.teamId, email)];
            case 1:
                _a.sent();
                return [4 /*yield*/, testExecutionService.createFromTeam(event.pathParameters.teamId)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, teamService.updateStatus(event.pathParameters.teamId, execution_status_1.ExecutionStatus.SCHEDULED)];
            case 3:
                _a.sent();
                return [2 /*return*/, response_handler_1.responseHandler(response)];
            case 4:
                error_5 = _a.sent();
                return [2 /*return*/, error_handler_1.errorHandler(error_5)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postTestRequest = postTestRequest;
var getTestRequest = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var cloudProvider, region, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                context.callbackWaitsForEmptyEventLoop = false;
                cloudProvider = event.queryStringParameters && event.queryStringParameters.cloudProvider || process.env.DEFAULT_PROVIDER;
                region = event.queryStringParameters && event.queryStringParameters.region || process.env.DEFAULT_REGION;
                return [4 /*yield*/, testExecutionService.acquire(cloudProvider, region)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response_handler_1.responseHandler(response)];
            case 2:
                error_6 = _a.sent();
                return [2 /*return*/, error_handler_1.errorHandler(error_6)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTestRequest = getTestRequest;
var postTestResults = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, testExecution, response, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                body = JSON.parse(event.body);
                return [4 /*yield*/, testExecutionService.postTestResults(body.id, body.data)];
            case 1:
                _a.sent();
                return [4 /*yield*/, testExecutionService.getByCode(body.id)];
            case 2:
                testExecution = _a.sent();
                return [4 /*yield*/, teamService.updateStatus(testExecution.teamId, execution_status_1.ExecutionStatus.READY)];
            case 3:
                response = _a.sent();
                console.log("Save test execution results. Code " + body.id + ". Results: " + body.data);
                return [2 /*return*/, response_handler_1.responseHandler(response)];
            case 4:
                error_7 = _a.sent();
                return [2 /*return*/, error_handler_1.errorHandler(error_7)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postTestResults = postTestResults;
var preTokenGeneration = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                context.callbackWaitsForEmptyEventLoop = false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userService.getByEmail(event.request.userAttributes.email)];
            case 2:
                user = _a.sent();
                event.response = { claimsOverrideDetails: { claimsToAddOrOverride: { role: user ? user.type : 'USER' } } };
                context.done(null, event);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                context.fail(error_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.preTokenGeneration = preTokenGeneration;
var calculateScores = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, testExecutionService.calculateScores()];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response_handler_1.responseHandler(response)];
            case 2:
                error_9 = _a.sent();
                return [2 /*return*/, error_handler_1.errorHandler(error_9)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.calculateScores = calculateScores;
//# sourceMappingURL=handler.js.map