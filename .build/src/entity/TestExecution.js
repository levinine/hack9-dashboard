"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Team_1 = require("./Team");
var TestToTestExecution_1 = require("./TestToTestExecution");
var TestExecution = /** @class */ (function () {
    function TestExecution() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], TestExecution.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: ['scheduled', 'running', 'finished'], nullable: false, default: 'scheduled' }),
        typeorm_1.Index('status_IX')
    ], TestExecution.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', name: 'api_url', length: 255, default: null })
    ], TestExecution.prototype, "apiUrl", void 0);
    __decorate([
        typeorm_1.Column({ type: 'decimal', scale: 3, nullable: false, default: 0.000 })
    ], TestExecution.prototype, "score", void 0);
    __decorate([
        typeorm_1.Column({ type: 'longtext', default: null })
    ], TestExecution.prototype, "results", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', name: 'cloud_provider', enum: ['aws', 'azure', 'gcp'], default: 'aws' })
    ], TestExecution.prototype, "cloudProvider", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 15, default: null })
    ], TestExecution.prototype, "region", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 40, default: null }),
        typeorm_1.Index('test_execution_code_IDX', { unique: true })
    ], TestExecution.prototype, "code", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Team_1.Team; }, function (team) { return team.testExecutions; }),
        typeorm_1.JoinColumn({
            name: 'team_id',
        })
    ], TestExecution.prototype, "team", void 0);
    __decorate([
        typeorm_1.Column({ type: 'integer', name: 'team_id' })
    ], TestExecution.prototype, "teamId", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return TestToTestExecution_1.TestToTestExecution; }, function (testToTestExecution) { return testToTestExecution.testExecution; })
    ], TestExecution.prototype, "testToTestExecutions", void 0);
    TestExecution = __decorate([
        typeorm_1.Entity({ name: 'test_execution' })
    ], TestExecution);
    return TestExecution;
}());
exports.TestExecution = TestExecution;
//# sourceMappingURL=TestExecution.js.map