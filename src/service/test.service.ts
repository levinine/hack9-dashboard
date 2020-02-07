import { TestRepository } from "../repository/test.repository";
import { Test } from "../entity/Test";

export class TestService {
  private testRepository: TestRepository;

  constructor(testRepository: TestRepository) {
    this.testRepository = testRepository;
  }

  public async getAll(): Promise<Test[]> {
    try {
      return await this.testRepository.getAll();
    } catch (error) {
      console.log(`Error TestService.getAll(): ${error}`);
      throw error;
    }
  }

}