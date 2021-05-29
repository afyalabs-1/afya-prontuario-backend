import { Request, Response, Router } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';

class ProfessionController {

    async list(profession: string) {
        const professionRepository = getCustomRepository(ProfessionRepository);
        let professionList = null;

        if (profession) {
            professionList = await professionRepository.find({
                where: { name: Like(`%${profession}%`) }
            });
        } else {
            professionList = await professionRepository.find();
        }

        if (!professionList) {
            throw new AppError(
                404,
                'Profession not found!',
                'Error > ProfessionController > List'
            );
        } else {
            return professionList;
        }
    }

    async create(name: string) {
        const professionRepository = getCustomRepository(ProfessionRepository);

        const createProfession = professionRepository.create({
            name: name
        });

        let professionCreated = professionRepository.save(createProfession);

        if (professionCreated) {
            return new AppError(
                201,
                'Profession created!',
                'Success > ProfessionController > create'
            );
        } else {
            throw new AppError(
                500,
                'Profession not found!',
                'Error > ProfessionController > create'
            );
        }
    }

    async delete(id: string, response: Response) {
        try {
            const professionRepository = getCustomRepository(ProfessionRepository);
            const professionDelete = professionRepository.delete(id);
            if (professionDelete) {
                return new AppError(
                    200,
                    'Profession is deleted!',
                    'Success > ProfessionController > delete'
                )
            }
        } catch (error) {
            throw new AppError(
                500,
                'Profession not found!',
                'Error > ProfessionController > delete'
            );
        }
    }
}

export { ProfessionController };