import { UserRepository } from "../repository/user.repository";
import { ForbiddenError } from "../../infrastructure/errors";
import { User } from "../entity/User";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.getByEmail(email);
    } catch (error) {
      console.log(`Error UserService.getByEmail(): ${error}`);
      throw error;
    }
  }

  public async checkAccess(teamId: number, email: string): Promise<boolean> {
    try {
      if (process.env.IS_OFFLINE) {
        return true;
      }
      const user = await this.userRepository.getByEmail(email);
      console.log(`Check access: user ${JSON.stringify(user)}; email ${email}; teamId ${teamId}`);
      if (user && (user.type === 'admin' || user.teamId == teamId)) {
        return true;
      } else {
        throw new ForbiddenError();
      }
    } catch (error) {
      console.log(`Error UserService.checkAccess(): ${error}`);
      throw error;
    }
  }

  public async preTokenGeneration(event: any, context: any) {
    try {
      const user = await this.userRepository.getByEmail(event.request.userAttributes.email);
      event.response = { claimsOverrideDetails: { claimsToAddOrOverride: { role: user ? user.type : 'USER' } } };
      context.done(null, event);
    } catch (error) {
      context.fail(error);
    }
  }

}