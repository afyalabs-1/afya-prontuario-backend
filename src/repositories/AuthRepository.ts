import { EntityRepository, Repository } from 'typeorm';
import { Session } from '../models/auth/session';

@EntityRepository(Session)
class AuthRepository extends Repository<Session> {}

export { AuthRepository };
