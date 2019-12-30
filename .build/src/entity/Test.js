"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var TestToTestExecution_1 = require("./TestToTestExecution");
var Test = /** @class */ (function () {
    function Test() {
    }
    Test_1 = Test;
    var Test_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Test.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', unique: true, length: 150, nullable: false }),
        typeorm_1.Index('test_name_UNIQUE', { unique: true })
    ], Test.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'integer' })
    ], Test.prototype, "weight", void 0);
    __decorate([
        typeorm_1.Column({ type: 'smallint', name: 'is_score_descrete' })
    ], Test.prototype, "isScoreDescrete", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 150 })
    ], Test.prototype, "endpoint", void 0);
    __decorate([
        typeorm_1.Column({ type: 'smallint', name: 'is_score_ascending' })
    ], Test.prototype, "isScoreAscending", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Test_1; }),
        typeorm_1.JoinColumn()
    ], Test.prototype, "dependsOn", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return TestToTestExecution_1.TestToTestExecution; }, function (testToTestExecution) { return testToTestExecution.test; })
    ], Test.prototype, "testToTestExecutions", void 0);
    Test = Test_1 = __decorate([
        typeorm_1.Entity()
    ], Test);
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=Test.js.map