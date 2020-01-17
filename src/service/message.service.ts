import { MessageRepository } from "../repository/message.repository";
import { Message } from "../entity/Message";
import { UserRepository } from "../repository/user.repository";
import { MessageResponse } from "../dto/message-response.dto";

export class MessageService {
  private messageRepository: MessageRepository;
  private userRepository: UserRepository;


  constructor(messageRepository: MessageRepository, userRepository: UserRepository
  ) {
    this.messageRepository = messageRepository;
    this.userRepository = userRepository;
  }

  public async create(message: Message, email: string): Promise<any> {
    try {
      const user = await this.userRepository.getByEmail(email);
      message.userId = user.id;
      await this.messageRepository.create(message);
      return message;
    } catch (error) {
      console.log(`Error MessageService.create(): ${error}`);
      throw error;
    }
  }

  public async delete(messageId: number): Promise<any> {
    try {
      return await this.messageRepository.delete(messageId);
    } catch (error) {
      console.log(`Error MessageService.delete(): ${error}`);
      throw error;
    }
  }

  public async findAllForUser(email: string): Promise<MessageResponse[]> {
    try {
      const user = await this.userRepository.getByEmail(email);
      return await this.messageRepository.findByCountry(user.country);
    } catch (error) {
      console.log(`Error MessageService.findAllForUser(): ${error}`);
      throw error;
    }
  }

}