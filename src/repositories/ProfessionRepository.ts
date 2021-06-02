import { EntityRepository, Repository } from 'typeorm';
import { Profession } from '../models/profession';

@EntityRepository(Profession)
class ProfessionRepository extends Repository<Profession> {}

export { ProfessionRepository };