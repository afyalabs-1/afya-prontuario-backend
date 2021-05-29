import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { SpecialistRepository } from '../repositories/SpecialistRepository';
import { AppError } from '../error/AppError';

class SpecialistController {
    async list(specialist: string) {
        try {
            const specialistRepository = getCustomRepository(SpecialistRepository);
            let specialistList = null;
            
            if (specialist) {
                specialistList = await specialistRepository.find({
                    where: { name: Like(`%${specialist}%`) }
                });
            } else {
                specialistList = await specialistRepository.find();
            }

            if (specialistList) {
                return specialistList;
            }
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
            const {
                record, 
                name, 
                phoneNumber, 
                cellPhone, 
                email, 
                professionId
            } = request.query;

            const specialistRepository = getCustomRepository(SpecialistRepository);

            const createSpecialist = specialistRepository.create({
                record: record,
                name: name,
                phoneNumber: phoneNumber,
                cellPhone: cellPhone,
                email: email,
                professionId: professionId
            });

            let createdSpecialist = specialistRepository.save(createSpecialist);

            if (createdSpecialist) {
                return new AppError(
                    201,
                    'Profession created!',
                    'Success > ProfessionController > create'
                );
            }
        } catch (error) {
            throw new AppError(
                500,
                'Profession not found!',
                'Error > ProfessionController > create'
            );
        }
    }
}

export { SpecialistController };