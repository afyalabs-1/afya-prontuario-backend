import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SpecialistRepository } from '../repositories/SpecialistRepository';
import { AppError } from '../error/AppError';

class SpecialistController {
    async list(request: Request, response: Response) {
        const specialistRepository = getCustomRepository(SpecialistRepository);

        if (request.params.id) {
            return specialistRepository.find({ id: request.params.id });
        } else {
            return specialistRepository.find();
        }
    }
}

export { SpecialistController };