import { DatabaseService } from "../service/database.service";
import { Test } from "../entity/Test";

export class TestRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  public async getAll(): Promise<Test[]> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Test);
      return await repository.find();
    } catch (error) {
      console.log(`Error TestRepository.getAll(): ${error}`);
      throw error;
    }
  }

}