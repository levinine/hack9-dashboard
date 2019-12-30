import { TestExecutionRepository } from "../repository/test-execution.repository";
import * as crypto from "crypto";
import { TestExecution } from "../entity/TestExecution";
import { TeamRepository } from "../repository/team.repository";
import { ExecutionStatus } from "../enum/execution-status";
import { TestRepository } from "../repository/test.repository";
import { TestToTestExecutionRepository } from "../repository/test-to-test-execution.repository";
import { TestToTestExecution } from "../entity/TestToTestExecution";
import { TestRequestResponse } from "../dto/test-request-response.dto";
import { LatestExecutionResponse } from "../dto/latest-execution-response.dto";
import { UpdateResult } from "typeorm";

export class TestExecutionService {
  private testExecutionRepository: TestExecutionRepository;
  private teamRepository: TeamRepository;
  private testRepository: TestRepository;
  private testToTestExecutionRepository: TestToTestExecutionRepository;

  constructor(
    testExecutionRepository: TestExecutionRepository,
    teamRepository: TeamRepository,
    testRepository: TestRepository,
    testToTestExecutionRepository: TestToTestExecutionRepository
  ) {
    this.testExecutionRepository = testExecutionRepository;
    this.teamRepository = teamRepository;
    this.testRepository = testRepository;
    this.testToTestExecutionRepository = testToTestExecutionRepository;
  }

  public async getByCode(code: string): Promise<TestExecution> {
    try {
      return await this.testExecutionRepository.getByCode(code);
    } catch (error) {
      console.log(`Error TestExecutionRepository.getByCode(): ${error}`);
      throw error;
    }
  }

  public async acquire(cloudProvider: string, region: string): Promise<TestRequestResponse> {
    try {
      const testExecution = await this.testExecutionRepository.getByCloudProviderRegionAndStatus(cloudProvider, region);
      const code = crypto.randomBytes(20).toString('hex');
      console.log(`updating test_execution to running with code ${code}`);
      await this.testExecutionRepository.updateStatusAndCode(testExecution.id, code);
      await this.teamRepository.updateStatus(testExecution.teamId, ExecutionStatus.RUNNING);

      return {
        id: code,
        url: testExecution.apiUrl
      }
    } catch (error) {
      console.log(`Error TestExecutionService.acquire(): ${error}`);
      throw error;
    }
  }

  public async getLatestExecution(teamId: number): Promise<LatestExecutionResponse> {
    try {
      return await this.testExecutionRepository.getLatestExecution(teamId);
    } catch (error) {
      console.log(`Error TestExecutionService.getLatestExecution(): ${error}`);
      throw error;
    }
  }

  public async postTestRequest(teamId: number): Promise<UpdateResult> {
    try {
      await this.testExecutionRepository.createFromTeam(teamId);
      return await this.teamRepository.updateStatus(teamId, ExecutionStatus.SCHEDULED);
    } catch (error) {
      console.log(`Error TestExecutionService.getLatestExecution(): ${error}`);
      throw error;
    }
  }

  public async createFromTeam(teamId: number): Promise<TestExecution> {
    try {
      return await this.testExecutionRepository.createFromTeam(teamId);
    } catch (error) {
      console.log(`Error TestExecutionRepository.createFromTeam(): ${error}`);
      throw error;
    }
  }

  public async postTestResults(testExecutionCode: string, results: string): Promise<UpdateResult> {
    try {
      await this.testExecutionRepository.updateResultsByCode(testExecutionCode, results);
      const testExecution = await this.testExecutionRepository.getByCode(testExecutionCode);
      console.log(`Save test execution results. Code ${testExecutionCode}. Results: ${results}`);

      return await this.teamRepository.updateStatus(testExecution.teamId, ExecutionStatus.READY);
    } catch (error) {
      console.log(`Error TestExecutionService.getLatestExecution(): ${error}`);
      throw error;
    }
  }

  public async calculateScores() {
    try {
      //get all tests
      const tests = await this.testRepository.getAll();
      if (!tests) return;

      //separate tests where results are "working"/"not working" from tests where results are range of values
      const testsWithDescreteResults: any[] = [];
      const testsWithContinuousResults: any[] = [];
      tests.forEach(test => {
        test.isScoreDescrete ? testsWithDescreteResults.push(test) : testsWithContinuousResults.push({ ...test, minScore: 100000, maxScore: 0 });
      })

      //get teams with their latest test results
      const latestTestExecutionsForTeams = await this.testExecutionRepository.getLatestExecutionsForTeams();
      if (!latestTestExecutionsForTeams) return;

      //results for team with parsed results
      let teamResults: any = {};

      //iterate through test results for teams to find min and max score for continuous tests and parse results
      latestTestExecutionsForTeams.forEach(latestTestExecutionForTeam => {
        let result = JSON.parse(latestTestExecutionForTeam.results);
        if (!result) return;
        this.findMinAndMaxForTestsWithContinuousResults(result, testsWithContinuousResults);
        teamResults[latestTestExecutionForTeam.teamId] = result;
      });
      //await this.teamRepository.clearScore();

      //iterate through test results for teams again to calculate the score
      latestTestExecutionsForTeams.forEach(async (latestTestExecutionForTeam) => {
        //calculate scores
        this.calculateScoreWithDescreteResults(teamResults[latestTestExecutionForTeam.teamId], testsWithDescreteResults);
        this.calculateScoreWithContinuousResults(teamResults[latestTestExecutionForTeam.teamId], testsWithContinuousResults);
        latestTestExecutionForTeam.score = testsWithDescreteResults.concat(testsWithContinuousResults)
          .reduce((total, test) => total + (teamResults[latestTestExecutionForTeam.teamId][test.name] ?
           teamResults[latestTestExecutionForTeam.teamId][test.name].score : 0), 0);

        await this.teamRepository.updateScore(latestTestExecutionForTeam.teamId, latestTestExecutionForTeam.score);

        [...testsWithDescreteResults, ...testsWithContinuousResults].forEach( async (test) => {
          if (!teamResults[latestTestExecutionForTeam.teamId][test.name]) return;     
            await this.testToTestExecutionRepository.create({
            testId: test.id,
            testExecutionId: latestTestExecutionForTeam.id,
            score: teamResults[latestTestExecutionForTeam.teamId][test.name].score
          });
        });
      });
    } catch (error) {
      console.log(`Error TestExecutionService.calculateScores(): ${error}`);
      throw error;
    }
  }


  //PRIVATE METHODS

  private calculateScoreWithDescreteResults(result: any, tests: any[]) {
    tests.forEach(test => {
      const testForTeam = result[test.name];
      if (!testForTeam) return;
      delete testForTeam.output;
      testForTeam.testId = test.id;
      if (testForTeam.success) {
        testForTeam.score *= test.weight;
      } else {
        testForTeam.score = 0;
      }
    })
  }

  private findMinAndMaxForTestsWithContinuousResults(result: any, tests: any[]) {
    tests.forEach(test => {
      try {
        //find result of specific test for team
        const testForTeam = result[test.name];
        delete testForTeam.output;
        testForTeam.testId = test.id;

        if (testForTeam.success) {
          if (testForTeam.score === 0) {
            testForTeam.success = false;
          } else {
            test.maxScore = testForTeam.score > test.maxScore ? testForTeam.score : test.maxScore;
            test.minScore = testForTeam.score < test.minScore ? testForTeam.score : test.minScore;
          }
        } else {
          testForTeam.score = 0;
        }
      } catch (error) {
        console.log('error parsing score from load test', error);
        throw error;
      }
    });
  }

  private calculateScoreWithContinuousResults(result: any, tests: any[]) {
    try {
      tests.forEach(test => {
        const testForTeam = result[test.name];
        if (!testForTeam) return;
        testForTeam.testId = test.id;
        let bestResult;
        let worstResult;
        if (test.isScoreAscending) {
          bestResult = test.maxScore;
          worstResult = test.minScore;
        } else {
          bestResult = test.minScore;
          worstResult = test.maxScore;
        }

        if (testForTeam.success) {
          testForTeam.score = test.weight * Math.abs(worstResult - testForTeam.score) / Math.abs(worstResult - bestResult);
        } else {
          testForTeam.score = 0;
        }
      });
    } catch (error) {
      throw error;
    }
  }
}