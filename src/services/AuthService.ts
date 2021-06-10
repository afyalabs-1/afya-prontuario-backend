import { getCustomRepository, Repository } from 'typeorm';
import { AppError } from '../error/AppError';
import { User } from '../models/user';
import { UserRepository } from '../repositories/UserRepository';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

interface IUser {
  userName: string;
  password: string;
}

interface IResponse {
  token: string;
  status: string;
  userName: string;
}

class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async authenticate({ userName, password }: IUser): Promise<IResponse> {
    const user = await this.userRepository.findOne({
      where: { userName: `${userName}` },
    });

    if (!user) {
      throw new AppError(
        401,
        'User does not Exist or Authorized',
        'Error > AuthService > Authenticate > user exists',
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError(
        401,
        'Wrong password or user name',
        'Error > AuthService > Authenticate > validate password',
      );
    }

    const token = jwt.sign({ id: user.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    const status = 'ACTIVE';

    const activeSession = { userName, status, token };

    return activeSession;
  }
}

export { AuthService };
