import { EntityRepository, Repository, QueryRunner } from 'typeorm';
import { Profession } from '../models/profession';

@EntityRepository(Profession)
class ProfessionRepository extends Repository<Profession> {
    public async read(): Promise<Profession[]> {
        return ["teste read"];
    }

    async create() {
        return await "Profissão criada";
    }

    async update() {

    }

    async delete() {

    }
}

export { ProfessionRepository }