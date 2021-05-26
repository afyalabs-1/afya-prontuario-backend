import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';

class ProfessionController {

    async list(profession: string) {
        const professionRepository = getCustomRepository(ProfessionRepository);
        let professionList = null;
        return "lista de profissões";
        /* if (profession) {
            professionList = await professionRepository.find({
                where: { name: Like(`%${profession}%`) }
            });
        } else {
            professionList = await professionRepository.find({

            });
        } */
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