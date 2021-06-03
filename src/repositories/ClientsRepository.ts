import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../models/client';

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {}

export { ClientRepository };
