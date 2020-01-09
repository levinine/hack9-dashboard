import { DatabaseService } from "../src/service/database.service";
import { UserRepository } from "../src/repository/user.repository";
import { TeamRepository } from "../src/repository/team.repository";
import { TestExecutionRepository } from "../src/repository/test-execution.repository";
import { TestToTestExecutionRepository } from "../src/repository/test-to-test-execution.repository";
import { TestRepository } from "../src/repository/test.repository";
import { UserService } from "../src/service/user.service";
import { TeamService } from "../src/service/team.service";
import { TestExecutionService } from "../src/service/test-execution.service";

const databaseService = new DatabaseService();
const userRepository = new UserRepository(databaseService);
const teamRepository = new TeamRepository(databaseService);
const testExecutionRepository = new TestExecutionRepository(databaseService);
const testToTestExecutionRepository = new TestToTestExecutionRepository(databaseService);
const testRepository = new TestRepository(databaseService);

const userService = new UserService(userRepository);
const teamService = new TeamService(teamRepository);
const testExecutionService = new TestExecutionService(testExecutionRepository, teamRepository, testRepository, testToTestExecutionRepository);

const services = {
  user: userService,
  team: teamService,
  testExecution: testExecutionService
}

const ServiceFactory = {
  get: name => services[name]
}

export { ServiceFactory }