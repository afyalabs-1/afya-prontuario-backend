import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';

class ProfessionController {
    professionRepository: object;

    constructor () {
        this.professionRepository = getCustomRepository(ProfessionRepository);
    }
    
    async read (request: Request, response: Request): Promise<Request> {
        return this.professionRepository.read();
    }

    async create (request: Request, response: Response): Promise<Response> {
        const { name } = request.body;
        const professionAlreadyExists = await this.professionRepository.findOneFromName({ where:(name) });

        if (professionAlreadyExists) {
            return response.status(400).json({message: 'Profession already exists!'})
        } else {
            const addProfession = this.professionRepository.create({
                name: name
            });

            await this.professionRepository.save(addProfession);
            return response.status(200).json({ message: 'Profession created.' });
        }
    }

    async update (request: Request, response: Response): Promise<Response> {
        const { id, name } = request.body;
        const professionAlreadyExists = await this.professionRepository.findOneFromId({ where:(id) });

        if (professionAlreadyExists) {
            return response.status(400).json({message: 'Profession already exists!'});
        } else {
            await this.professionRepository.update(id, name);
            return response.status(200).json({ message: 'Profession updated.' });
        }
    }

    async delete (request: Request, response: Response): Promise<Response> {
        const { id } = request.body;
        const professionAlreadyExists = await this.professionRepository.findOneFromId({ where:(id) });

        if (professionAlreadyExists) {
            return response.status(400).json({ message: 'Profession already exists!' });
        } else {
            await this.professionRepository.delete(id);
            return response.status(200).json({ message: 'Profession excluded.' });
        }
    }
}

export { ProfessionController };