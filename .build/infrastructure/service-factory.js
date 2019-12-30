"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_service_1 = require("../src/service/database.service");
var user_repository_1 = require("../src/repository/user.repository");
var team_repository_1 = require("../src/repository/team.repository");
var test_execution_repository_1 = require("../src/repository/test-execution.repository");
var test_to_test_execution_repository_1 = require("../src/repository/test-to-test-execution.repository");
var test_repository_1 = require("../src/repository/test.repository");
var user_service_1 = require("../src/service/user.service");
var team_service_1 = require("../src/service/team.service");
var test_execution_service_1 = require("../src/service/test-execution.service");
var databaseService = new database_service_1.DatabaseService();
var userRepository = new user_repository_1.UserRepository(databaseService);
var teamRepository = new team_repository_1.TeamRepository(databaseService);
var testExecutionRepository = new test_execution_repository_1.TestExecutionRepository(databaseService);
var testToTestExecutionRepository = new test_to_test_execution_repository_1.TestToTestExecutionRepository(databaseService);
var testRepository = new test_repository_1.TestRepository(databaseService);
var userService = new user_service_1.UserService(userRepository);
var teamService = new team_service_1.TeamService(teamRepository);
var testExecutionService = new test_execution_service_1.TestExecutionService(testExecutionRepository, teamRepository, testRepository, testToTestExecutionRepository);
var getUserService = function () {
    return userService;
};
exports.getUserService = getUserService;
var getTeamService = function () {
    return teamService;
};
exports.getTeamService = getTeamService;
var getTestExecutionService = function () {
    return testExecutionService;
};
exports.getTestExecutionService = getTestExecutionService;
//# sourceMappingURL=service-factory.js.map