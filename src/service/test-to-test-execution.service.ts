import { TestToTestExecutionRepository } from "../repository/test-to-test-execution.repository";
import { ExecutionDetailsResponse } from "../dto/execution-details-response.dto";

export class TestToTestExecutionService {
  private testToTestExecutionRepository: TestToTestExecutionRepository;

  constructor(
    testToTestExecutionRepository: TestToTestExecutionRepository
  ) {
    this.testToTestExecutionRepository = testToTestExecutionRepository;
  }

  public async getLatestByTeamId(teamId: number): Promise<ExecutionDetailsResponse[]> {
    try {
      return await this.testToTestExecutionRepository.getLatestByTeamId(teamId);
    } catch (error) {
      console.log(`Error TestExecutionRepository.getByCode(): ${error}`);
      throw error;
    }
  }

}