import { DatabaseService } from "../service/database.service";
import { User } from "../entity/User";

export class UserRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  public async getByEmail(email: string): Promise<User> {
    try {
      if (process.env.IS_OFFLINE) {
        return {
          id: 1,
          email: '',
          name: '',
          type: 'admin',
          teamId: 0,
          country: 'Serbia'
        }
      }
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(User);
      return await repository.findOneOrFail({ where: [{ email }] });
    } catch (error) {
      console.log(`Error UserRepository.getByEmail(): ${error}`);
      throw error;
    }
  }
}