import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';

class ProfessionController {

    async list(request: Request, response: Response) {
        const professionRepository = getCustomRepository(ProfessionRepository);

        if (request.params.id) {
            return professionRepository.find({ id: request.params.id });
        } else {
            return professionRepository.find();
        }
    }
}

export { ProfessionController };