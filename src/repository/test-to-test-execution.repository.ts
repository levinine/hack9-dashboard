import { DatabaseService } from "../service/database.service";
import { TestToTestExecution } from "../entity/TestToTestExecution";
import { ExecutionDetailsResponse } from "../dto/execution-details-response.dto";

export class TestToTestExecutionRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  public async getLatestByTeamId(teamId: number): Promise<ExecutionDetailsResponse[]> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestToTestExecution);
      return await repository.query(
        `SELECT tte.test_id AS testId, tte.output AS output, tte.score AS score, t.name AS testName
        FROM test_to_test_execution tte
        LEFT JOIN test_execution te ON tte.test_execution_id = te.id
        LEFT JOIN test t ON tte.test_id = t.id
        WHERE te.id IN 
        (SELECT MAX(id) AS id FROM test_execution WHERE team_id = ? AND status = 'finished' GROUP BY team_id)`
      , [teamId]);
    } catch (error) {
      console.log(`Error TestToTestExecutionRepository.getByCode(): ${error}`);
      throw error;
    }
  }

  public async create(data): Promise<TestToTestExecution[]> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestToTestExecution);
      return await repository.save(data);
    } catch (error) {
      console.log(`Error TestToTestExecutionRepository.updateResultsByCode(): ${error}`);
      throw error;
    }
  }
}


