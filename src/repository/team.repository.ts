import { DatabaseService } from "../service/database.service";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { UpdateResult } from "typeorm";
import { GetResultsResponse } from "../dto/get-results-response.dto";

export class TeamRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  public async getAll(): Promise<GetResultsResponse[]> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Team);

      return await repository
        .query('SELECT t.id AS id, t.name AS name, t.score AS score, status, GROUP_CONCAT(u.email SEPARATOR ",") AS members \
          FROM team t \
          LEFT JOIN user u ON t.id = u.team_id \
          GROUP BY t.id, status \
          ORDER BY t.score DESC, t.id ASC');
    } catch (error) {
      console.log(`Error TeamRepository.getAll(): ${error}`);
      throw error;
    }
  }

  public async updateStatus(teamId: number, status: string): Promise<UpdateResult> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Team);
      return await repository.update({ id: teamId }, { status });
    } catch (error) {
      console.log(`Error TeamRepository.updateStatus(): ${error}`);
      throw error;
    }
  }

  public async getApiUrl(teamId: number): Promise<Team | undefined> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Team);
      return await repository.findOne(teamId, { select: ["apiUrl"] });
    } catch (error) {
      console.log(`Error TeamRepository.getApiUrl(): ${error}`);
      throw error;
    }
  }

  public async updateApiUrl(teamId: number, apiUrl: string): Promise<UpdateResult> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Team);
      return await repository.update({ id: teamId }, { apiUrl });
    } catch (error) {
      console.log(`Error TeamRepository.updateApiUrl(): ${error}`);
      throw error;
    }
  }

  public async clearScore(): Promise<UpdateResult> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Team);
      return await repository.query(`UPDATE team SET score = ? + score_diversity + score_costs`);
    } catch (error) {
      console.log(`Error TeamRepository.clearScore(): ${error}`);
      throw error;
    }
  }

  public async updateScore(teamId: number, score: number): Promise<UpdateResult> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Team);
      return await repository.query(`UPDATE team SET score = ? + score_diversity + score_costs WHERE id = ?`, [score, teamId]);
    } catch (error) {
      console.log(`Error TeamRepository.updateScore(): ${error}`);
      throw error;
    }
  }


  public async findByEmail(email: string): Promise<Team[]> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Team);
      return await repository.createQueryBuilder('team')
        .select(['id', 'name', 'score', 'status'])
        .leftJoin(User, 'user')
        .where('user.email = :email', { email })
        .groupBy('team.id, team.status')
        .orderBy('team.score', 'DESC')
        .addOrderBy('team.id', 'ASC')
        .getMany();
    } catch (error) {
      console.log(`Error TeamRepository.getAll(): ${error}`);
      throw error;
    }
  }


}