"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var TestExecution_1 = require("./TestExecution");
var Team = /** @class */ (function () {
    function Team() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Team.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', unique: true, length: 150, nullable: false }),
        typeorm_1.Index('name_UNIQUE', { unique: true })
    ], Team.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', name: 'api_url', length: 255, default: null })
    ], Team.prototype, "apiUrl", void 0);
    __decorate([
        typeorm_1.Column({ type: 'decimal', precision: 10, scale: 3, nullable: false, default: 0.000 })
    ], Team.prototype, "score", void 0);
    __decorate([
        typeorm_1.Column({ name: 'score_diversity', type: 'decimal', precision: 10, scale: 3, nullable: false, default: 0.000 })
    ], Team.prototype, "scoreDiversity", void 0);
    __decorate([
        typeorm_1.Column({ name: 'score_costs', type: 'decimal', precision: 10, scale: 3, nullable: false, default: 0.000 })
    ], Team.prototype, "scoreCosts", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', name: 'cloud_provider', enum: ['aws', 'azure', 'gcp'], nullable: false })
    ], Team.prototype, "cloudProvider", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100, nullable: false })
    ], Team.prototype, "region", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: ['ready', 'scheduled', 'running'], nullable: false, default: 'ready' })
    ], Team.prototype, "status", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return User_1.User; }, function (user) { return user.team; })
    ], Team.prototype, "users", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return TestExecution_1.TestExecution; }, function (testExecution) { return testExecution.team; })
    ], Team.prototype, "testExecutions", void 0);
    Team = __decorate([
        typeorm_1.Entity()
    ], Team);
    return Team;
}());
exports.Team = Team;
//# sourceMappingURL=Team.js.map