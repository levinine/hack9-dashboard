import { TeamRepository } from "../repository/team.repository";
import { ApiUrlResponse } from "../dto/api-url-response.dto";
import { ResultsResponse } from "../dto/results-response.dto";

export class TeamService {
  private teamRepository: TeamRepository;

  constructor(teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  public async getApiUrl(teamId: number): Promise<ApiUrlResponse> {
    try {
      const response = await this.teamRepository.getApiUrl(teamId);
      return { apiUrl: response ? response.apiUrl : '' };
    } catch (error) {
      console.log(`Error TeamService.getApiUrl(): ${error}`);
      throw error;
    }
  }

  public async updateApiUrl(teamId: number, apiUrl: string): Promise<ApiUrlResponse> {
    try {
      await this.teamRepository.updateApiUrl(teamId, apiUrl);
      return { apiUrl };
    } catch (error) {
      console.log(`Error TeamService.updateApiUrl(): ${error}`);
      throw error;
    }
  }

  public async getAll(): Promise<ResultsResponse[]> {
    try {
      return await this.teamRepository.getAll();
    } catch (error) {
      console.log(`Error TeamService.getAll(): ${error}`);
      throw error;
    }
  }

  public async updateStatus(teamId: number, status: string): Promise<any> {
    try {
      return await this.teamRepository.updateStatus(teamId, status);
    } catch (error) {
      console.log(`Error TeamService.updateStatus(): ${error}`);
      throw error;
    }
  }

}