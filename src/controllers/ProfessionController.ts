import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';

class ProfessionController {

    async list(request: Request, response: Response) {
        // return { message: "lista de profissões" }
        const professionRepository = getCustomRepository(ProfessionRepository);
        return professionRepository.find();
    }
}

export { ProfessionController };