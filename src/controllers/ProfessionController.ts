import { getCustomRepository } from 'typeorm';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';

class ProfessionController {
    professionRepository: object;

    constructor () {
        this.professionRepository = getCustomRepository(ProfessionRepository);
    }
    
    async read () {
        return await this.professionRepository.read();
    }

    async create (name: string) {
        const professionAlreadyExists = await this.professionRepository.findOneFromName({ name });

        if (professionAlreadyExists) {
            throw new AppError(400, 'Profession already exists!', 'Error > ProfessionController > professionAlreadyExists');
        } else {
            const addProfession = this.professionRepository.create({
                name: name
            });

            return await this.professionRepository.save(addProfession);
        }
    }

    async update (id: string, name: string) {
        const professionAlreadyExists = await this.professionRepository.findOneFromId({ id });

        if (professionAlreadyExists) {
            throw new AppError(400, 'Profession already exists!', 'Error > ProfessionController > professionAlreadyExists');
        } else {
            return await this.professionRepository.update(id, name);
        }
    }

    async delete (id: string) {
        const professionAlreadyExists = await this.professionRepository.findOneFromId({ id });

        if (professionAlreadyExists) {
            throw new AppError(400, 'Profession already exists!', 'Error > ProfessionController > professionAlreadyExists');
        } else {
            return await this.professionRepository.delete(id);
        }
    }
}