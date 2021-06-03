import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { SpecialistRepository } from '../repositories/SpecialistRepository';
import { AppError } from '../error/AppError';

class SpecialistController {
    async list(specialist: string) {
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
        } else {
            throw new AppError(
                500,
                'Specialist not found!',
                'Error > SpecialistController > List'
            );
        }
    }
    
    async create(request: Request, response: Response) { //return response.json({message: 'No controller: \n'+request.query.name});
        const {
            record, 
            name, 
            phoneNumber, 
            cellPhone, 
            email, 
            professionId
        } = request.query;

        // response.json({message: request.query});
        const specialistRepository = getCustomRepository(SpecialistRepository);

        const createSpecialist = specialistRepository.create({
            record: record,
            name: name,
            phoneNumber: phoneNumber,
            cellPhone: cellPhone,
            email: email,
            professionId: professionId
        });

        return specialistRepository.save(createSpecialist);
    }
}

export { SpecialistController };