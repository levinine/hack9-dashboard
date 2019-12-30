"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Test_1 = require("./Test");
var TestExecution_1 = require("./TestExecution");
var TestToTestExecution = /** @class */ (function () {
    function TestToTestExecution() {
    }
    __decorate([
        typeorm_1.PrimaryColumn('integer')
    ], TestToTestExecution.prototype, "testId", void 0);
    __decorate([
        typeorm_1.PrimaryColumn('integer')
    ], TestToTestExecution.prototype, "testExecutionId", void 0);
    __decorate([
        typeorm_1.Column('integer')
    ], TestToTestExecution.prototype, "score", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Test_1.Test; }, function (test) { return test.testToTestExecutions; })
    ], TestToTestExecution.prototype, "test", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return TestExecution_1.TestExecution; }, function (testExecution) { return testExecution.testToTestExecutions; })
    ], TestToTestExecution.prototype, "testExecution", void 0);
    TestToTestExecution = __decorate([
        typeorm_1.Entity({ name: 'test_to_test_execution' })
    ], TestToTestExecution);
    return TestToTestExecution;
}());
exports.TestToTestExecution = TestToTestExecution;
//# sourceMappingURL=TestToTestExecution.js.map