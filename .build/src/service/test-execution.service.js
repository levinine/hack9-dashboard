"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var execution_status_1 = require("../enum/execution-status");
var TestExecutionService = /** @class */ (function () {
    function TestExecutionService(testExecutionRepository, teamRepository, testRepository, testToTestExecutionRepository) {
        this.testExecutionRepository = testExecutionRepository;
        this.teamRepository = teamRepository;
        this.testRepository = testRepository;
        this.testToTestExecutionRepository = testToTestExecutionRepository;
    }
    TestExecutionService.prototype.getByCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.testExecutionRepository.getByCode(code)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error TestExecutionRepository.getByCode(): " + error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestExecutionService.prototype.acquire = function (cloudProvider, region) {
        return __awaiter(this, void 0, void 0, function () {
            var testExecution, code, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.testExecutionRepository.getByCloudProviderRegionAndStatus(cloudProvider, region)];
                    case 1:
                        testExecution = _a.sent();
                        code = crypto.randomBytes(20).toString('hex');
                        console.log("updating test_execution to running with code " + code);
                        return [4 /*yield*/, this.testExecutionRepository.updateStatusAndCode(testExecution.id, code)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.teamRepository.updateStatus(testExecution.teamId, execution_status_1.ExecutionStatus.RUNNING)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                id: code,
                                url: testExecution.apiUrl
                            }];
                    case 4:
                        error_2 = _a.sent();
                        console.log("Error TestExecutionService.acquire(): " + error_2);
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TestExecutionService.prototype.getLatestExecution = function (teamId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.testExecutionRepository.getLatestExecution(teamId)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        console.log("Error TestExecutionService.getLatestExecution(): " + error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestExecutionService.prototype.postTestRequest = function (teamId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.testExecutionRepository.createFromTeam(teamId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.teamRepository.updateStatus(teamId, execution_status_1.ExecutionStatus.SCHEDULED)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_4 = _a.sent();
                        console.log("Error TestExecutionService.getLatestExecution(): " + error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TestExecutionService.prototype.createFromTeam = function (teamId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.testExecutionRepository.createFromTeam(teamId)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        console.log("Error TestExecutionRepository.createFromTeam(): " + error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestExecutionService.prototype.postTestResults = function (testExecutionCode, results) {
        return __awaiter(this, void 0, void 0, function () {
            var testExecution, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.testExecutionRepository.updateResultsByCode(testExecutionCode, results)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.testExecutionRepository.getByCode(testExecutionCode)];
                    case 2:
                        testExecution = _a.sent();
                        console.log("Save test execution results. Code " + testExecutionCode + ". Results: " + results);
                        return [4 /*yield*/, this.teamRepository.updateStatus(testExecution.teamId, execution_status_1.ExecutionStatus.READY)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_6 = _a.sent();
                        console.log("Error TestExecutionService.getLatestExecution(): " + error_6);
                        throw error_6;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TestExecutionService.prototype.calculateScores = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tests, testsWithDescreteResults_1, testsWithContinuousResults_1, latestTestExecutionsForTeams, teamResults_1, error_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.testRepository.getAll()];
                    case 1:
                        tests = _a.sent();
                        if (!tests)
                            return [2 /*return*/];
                        testsWithDescreteResults_1 = [];
                        testsWithContinuousResults_1 = [];
                        tests.forEach(function (test) {
                            test.isScoreDescrete ? testsWithDescreteResults_1.push(test) : testsWithContinuousResults_1.push(__assign(__assign({}, test), { minScore: 100000, maxScore: 0 }));
                        });
                        return [4 /*yield*/, this.testExecutionRepository.getLatestExecutionsForTeams()];
                    case 2:
                        latestTestExecutionsForTeams = _a.sent();
                        if (!latestTestExecutionsForTeams)
                            return [2 /*return*/];
                        teamResults_1 = {};
                        //iterate through test results for teams to find min and max score for continuous tests and parse results
                        latestTestExecutionsForTeams.forEach(function (latestTestExecutionForTeam) {
                            var result = JSON.parse(latestTestExecutionForTeam.results);
                            if (!result)
                                return;
                            _this.findMinAndMaxForTestsWithContinuousResults(result, testsWithContinuousResults_1);
                            teamResults_1[latestTestExecutionForTeam.teamId] = result;
                        });
                        //await this.teamRepository.clearScore();
                        //iterate through test results for teams again to calculate the score
                        latestTestExecutionsForTeams.forEach(function (latestTestExecutionForTeam) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        //calculate scores
                                        this.calculateScoreWithDescreteResults(teamResults_1[latestTestExecutionForTeam.teamId], testsWithDescreteResults_1);
                                        this.calculateScoreWithContinuousResults(teamResults_1[latestTestExecutionForTeam.teamId], testsWithContinuousResults_1);
                                        latestTestExecutionForTeam.score = testsWithDescreteResults_1.concat(testsWithContinuousResults_1)
                                            .reduce(function (total, test) { return total + (teamResults_1[latestTestExecutionForTeam.teamId][test.name] ?
                                            teamResults_1[latestTestExecutionForTeam.teamId][test.name].score : 0); }, 0);
                                        return [4 /*yield*/, this.teamRepository.updateScore(latestTestExecutionForTeam.teamId, latestTestExecutionForTeam.score)];
                                    case 1:
                                        _a.sent();
                                        __spreadArrays(testsWithDescreteResults_1, testsWithContinuousResults_1).forEach(function (test) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!teamResults_1[latestTestExecutionForTeam.teamId][test.name])
                                                            return [2 /*return*/];
                                                        return [4 /*yield*/, this.testToTestExecutionRepository.create({
                                                                testId: test.id,
                                                                testExecutionId: latestTestExecutionForTeam.id,
                                                                score: teamResults_1[latestTestExecutionForTeam.teamId][test.name].score
                                                            })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        console.log("Error TestExecutionService.calculateScores(): " + error_7);
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //PRIVATE METHODS
    TestExecutionService.prototype.calculateScoreWithDescreteResults = function (result, tests) {
        tests.forEach(function (test) {
            var testForTeam = result[test.name];
            if (!testForTeam)
                return;
            delete testForTeam.output;
            testForTeam.testId = test.id;
            if (testForTeam.success) {
                testForTeam.score *= test.weight;
            }
            else {
                testForTeam.score = 0;
            }
        });
    };
    TestExecutionService.prototype.findMinAndMaxForTestsWithContinuousResults = function (result, tests) {
        tests.forEach(function (test) {
            try {
                //find result of specific test for team
                var testForTeam = result[test.name];
                delete testForTeam.output;
                testForTeam.testId = test.id;
                if (testForTeam.success) {
                    if (testForTeam.score === 0) {
                        testForTeam.success = false;
                    }
                    else {
                        test.maxScore = testForTeam.score > test.maxScore ? testForTeam.score : test.maxScore;
                        test.minScore = testForTeam.score < test.minScore ? testForTeam.score : test.minScore;
                    }
                }
                else {
                    testForTeam.score = 0;
                }
            }
            catch (error) {
                console.log('error parsing score from load test', error);
                throw error;
            }
        });
    };
    TestExecutionService.prototype.calculateScoreWithContinuousResults = function (result, tests) {
        try {
            tests.forEach(function (test) {
                var testForTeam = result[test.name];
                if (!testForTeam)
                    return;
                testForTeam.testId = test.id;
                var bestResult;
                var worstResult;
                if (test.isScoreAscending) {
                    bestResult = test.maxScore;
                    worstResult = test.minScore;
                }
                else {
                    bestResult = test.minScore;
                    worstResult = test.maxScore;
                }
                if (testForTeam.success) {
                    testForTeam.score = test.weight * Math.abs(worstResult - testForTeam.score) / Math.abs(worstResult - bestResult);
                }
                else {
                    testForTeam.score = 0;
                }
            });
        }
        catch (error) {
            throw error;
        }
    };
    return TestExecutionService;
}());
exports.TestExecutionService = TestExecutionService;
//# sourceMappingURL=test-execution.service.js.map