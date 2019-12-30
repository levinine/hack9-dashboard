import { DatabaseService } from "../service/database.service";
import { TestToTestExecution } from "../entity/TestToTestExecution";

export class TestToTestExecutionRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }


  public async getByExecutionId(executionId: number): Promise<TestToTestExecution> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(TestToTestExecution);
      return await repository.findOneOrFail({ where: { executionId } });
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


