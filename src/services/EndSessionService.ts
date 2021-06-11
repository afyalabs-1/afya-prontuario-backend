// import { getCustomRepository, Repository } from 'typeorm';
// import { AppError } from '../error/AppError';
// import { User } from '../models/user';
// import { UserRepository } from '../repositories/UserRepository';

// interface IUser {
//   id: string;
//   token: string;
//   status: string;
//   user: [];
// }

// class EndSessionService {
//   private userRepository: Repository<User>;

//   constructor() {
//     this.userRepository = getCustomRepository(UserRepository);
//   }

//   async finishSession({ id, token, status }: IUser) {
//     const user = await this.userRepository.findOne({ id });

//     user;

//     return logout;
//   }
// }

// export { EndSessionService };
