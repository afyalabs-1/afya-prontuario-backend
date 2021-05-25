import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../models/client';

@EntityRepository(Client)
class ClientsRepository extends Repository<Client> {}

export { ClientsRepository };
