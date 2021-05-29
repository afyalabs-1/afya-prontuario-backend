import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';

class ProfessionController {
    async listAll(request: Request, response: Response): Promise<Response> {
        try {
            

        } catch (error) {
            throw new AppError(
                500,
                'Profession not found!',
                'Error > ProfessionController > create'
            );
        }
            
    }

    async create(request: Request, response: Response) {
        try {
            const professionRepository = getCustomRepository(ProfessionRepository);
return response.json({data: request.body})
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
            }
        } catch (err) {
            throw new AppError(
                500,
                'Profession not found!',
                'Error > ProfessionController > delete'
            );
        }
        
    }

    async delete(id: string) {
        try {
            const professionRepository = getCustomRepository(ProfessionRepository);
            const professionDelete = professionRepository.find({ where: { id }, withDeleted: true });
            if (professionDelete) {
                return new AppError(
                    200,
                    'Profession is deleted!',
                    'Success > ProfessionController > delete'
                )
            }
        } catch (err) {
            throw new AppError(
                500,
                'Profession not found!',
                'Error > ProfessionController > delete'
            );
        }
    }
}

export { ProfessionController };