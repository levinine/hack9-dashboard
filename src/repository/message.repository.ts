import { DatabaseService } from "../service/database.service";
import { Message } from "../entity/Message";
import { MessageResponse } from "../dto/message-response.dto";

export class MessageRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }


  public async create(message: any): Promise<any> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Message);
      return await repository.save(message);
    } catch (error) {
      console.log(`Error MessageRepository.create(): ${error}`);
      throw error;
    }
  }

  public async delete(messageId: number): Promise<any> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Message);
      return await repository.delete(messageId);
    } catch (error) {
      console.log(`Error MessageRepository.delete(): ${error}`);
      throw error;
    }
  }


  public async findByCountry(country: string): Promise<MessageResponse[]> {
    try {
      const connection = await this.databaseService.getConnection();
      const repository = await connection.getRepository(Message);
      return await repository
        .query('SELECT m.id, m.title, m.content, m.country, m.is_global AS isGlobal, u.name AS createdBy\
        FROM message m \
        LEFT JOIN user u ON u.id = m.user_id \
        WHERE m.is_global = true OR m.country = ?', [country]);
    } catch (error) {
      console.log(`Error MessageRepository.findByCountry(): ${error}`);
      throw error;
    }
  }


}