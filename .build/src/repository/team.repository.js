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
var Team_1 = require("../entity/Team");
var User_1 = require("../entity/User");
var TeamRepository = /** @class */ (function () {
    function TeamRepository(databaseService) {
        this.databaseService = databaseService;
    }
    TeamRepository.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, repository, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.databaseService.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(Team_1.Team)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository
                                .query('SELECT t.id AS id, t.name AS name, t.score AS score, status, GROUP_CONCAT(u.email SEPARATOR ",") AS members \
          FROM team t \
          LEFT JOIN user u ON t.id = u.team_id \
          GROUP BY t.id, status \
          ORDER BY t.score DESC, t.id ASC')];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.log("Error TeamRepository.getAll(): " + error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TeamRepository.prototype.updateStatus = function (teamId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, repository, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.databaseService.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(Team_1.Team)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.update({ id: teamId }, { status: status })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_2 = _a.sent();
                        console.log("Error TeamRepository.updateStatus(): " + error_2);
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TeamRepository.prototype.getApiUrl = function (teamId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, repository, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.databaseService.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(Team_1.Team)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.findOneOrFail(teamId, { select: ["apiUrl"] })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_3 = _a.sent();
                        console.log("Error TeamRepository.getApiUrl(): " + error_3);
                        throw error_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TeamRepository.prototype.updateApiUrl = function (teamId, apiUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, repository, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.databaseService.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(Team_1.Team)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.update({ id: teamId }, { apiUrl: apiUrl })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_4 = _a.sent();
                        console.log("Error TeamRepository.updateApiUrl(): " + error_4);
                        throw error_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TeamRepository.prototype.clearScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, repository, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.databaseService.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(Team_1.Team)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.createQueryBuilder()
                                .update(Team_1.Team)
                                .set({
                                score: function () { return "'score_diversity' + 'score_costs'"; }
                            })
                                .execute()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_5 = _a.sent();
                        console.log("Error TeamRepository.clearScore(): " + error_5);
                        throw error_5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TeamRepository.prototype.updateScore = function (teamId, score) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, repository, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.databaseService.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(Team_1.Team)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.query("UPDATE team SET score = ? + score_diversity + score_costs WHERE id = ?", [score, teamId])];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_6 = _a.sent();
                        console.log("Error TeamRepository.updateScore(): " + error_6);
                        throw error_6;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TeamRepository.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, repository, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.databaseService.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(Team_1.Team)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.createQueryBuilder('team')
                                .select(['id', 'name', 'score', 'status'])
                                .leftJoin(User_1.User, 'user')
                                .where('user.email = :email', { email: email })
                                .groupBy('team.id, team.status')
                                .orderBy('team.score', 'DESC')
                                .addOrderBy('team.id', 'ASC')
                                .getMany()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_7 = _a.sent();
                        console.log("Error TeamRepository.getAll(): " + error_7);
                        throw error_7;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TeamRepository;
}());
exports.TeamRepository = TeamRepository;
//# sourceMappingURL=team.repository.js.map