import { getCustomRepository, Like, Repository } from 'typeorm';
import { AppError } from '../error/AppError';
import { User } from '../models/user';
import { UserRepository } from '../repositories/UserRepository';

interface IUser {
  id?: string;
  role: string;
  userName: string;
  password: string;
  name: string;
}

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create({ role, userName, password, name }: IUser) {
    const userExists = await this.userRepository.findOne({
      userName,
    });

    if (userExists) {
      throw new AppError(
        403,
        'User Already Exists',
        'Error > UserService > Create',
      );
    }

    const user = this.userRepository.create({
      role,
      userName,
      password,
      name,
    });

    // import { Session } from '../models/auth/session';

    // @EntityRepository(Session)
    // class AuthRepository extends Repository<Session> {}

    // export { AuthRepository };

    await this.userRepository.save(user);

    return user;
  }

  async list(userName: IUser) {
    try {
      if (userName) {
        const user = await this.userRepository.find({
          where: { userName: Like(`%${userName}%`) },
        });
        return user;
      } else {
        const users = await this.userRepository.find();
        return users;
      }
    } catch {
      throw new AppError(404, 'not found', 'ERROR > UserService > List');
    }
  }
}

export { UserService };
