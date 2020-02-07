import { DatabaseService } from "../service/database.service";
import { TestExecution } from "../entity/TestExecution";
import { UpdateResult } from "typeorm";
import { ExecutionStatus } from "../enum/execution-status";
import { LatestExecutionResponse } from "../dto/latest-execution-response.dto";

export class TestExecutionRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  public async createFromTeam(teamId: number): Promise<TestExecution> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestExecution);
      return await repository
        .query('INSERT INTO test_execution (api_url, team_id, cloud_provider, region) \
			SELECT api_url, id, cloud_provider, region FROM team WHERE id = ?', [teamId])
    } catch (error) {
      console.log(`Error TestExecutionRepository.createFromTeam(): ${error}`);
      throw error;
    }
  }

  public async getByCloudProviderRegionAndStatus(cloudProvider: string, region: string): Promise<TestExecution | undefined> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestExecution);
      return await repository.findOne({ where: [{ cloudProvider, region, status: ExecutionStatus.SCHEDULED }], order: { id: 'ASC' } });
    } catch (error) {
      console.log(`Error TestExecutionRepository.getByCloudProviderRegionAndStatus(): ${error}`);
      throw error;
    }
  }


  public async updateStatusAndCode(testExecutionId: number, code: string): Promise<UpdateResult> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestExecution);
      return await repository.update({ id: testExecutionId, status: ExecutionStatus.SCHEDULED }, { status: ExecutionStatus.RUNNING, code });
    } catch (error) {
      console.log(`Error TestExecutionRepository.updateStatusAndCode(): ${error}`);
      throw error;
    }
  }

  public async getByCode(code: string): Promise<TestExecution> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestExecution);
      return await repository.findOneOrFail({ where: { code } });
    } catch (error) {
      console.log(`Error TestExecutionRepository.getByCode(): ${error}`);
      throw error;
    }
  }

  public async updateResultsByCode(code: string, results: string): Promise<UpdateResult> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestExecution);
      return await repository.update({ code }, { status: ExecutionStatus.FINISHED, results });
    } catch (error) {
      console.log(`Error TestExecutionRepository.updateResultsByCode(): ${error}`);
      throw error;
    }
  }


  public async getLatestExecutionsForTeams(): Promise<TestExecution[]> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestExecution);
      return await repository
        .query(
          `SELECT id, team_id AS teamId, results FROM test_execution WHERE id IN (SELECT MAX(id) AS id FROM test_execution WHERE status = 'finished' GROUP BY team_id)`
        );
    } catch (error) {
      console.log(`Error TestExecutionRepository.getLatestExecutionsForTeams(): ${error}`);
      throw error;
    }
  }

  public async getLatestExecution(teamId: number): Promise<LatestExecutionResponse> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestExecution);
      return await repository
        .query(
          `SELECT results FROM test_execution WHERE team_id = ? AND id IN (SELECT MAX(id) AS id FROM test_execution WHERE status = 'finished' GROUP BY team_id)`,
          [teamId]);
    } catch (error) {
      console.log(`Error TestExecutionRepository.getLatestExecution(): ${error}`);
      throw error;
    }
  }

  public async getScheduledExecutions(): Promise<TestExecution[]> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestExecution);
      return await repository
        .query(`SELECT id, team_id AS teamId FROM test_execution WHERE id IN (SELECT MAX(id) AS id FROM test_execution WHERE status = 'scheduled' GROUP BY team_id) ORDER BY id`);
    } catch (error) {
      console.log(`Error TestExecutionRepository.getLatestExecution(): ${error}`);
      throw error;
    }
  }
}

