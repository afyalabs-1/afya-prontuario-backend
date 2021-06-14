import { Request, Response } from 'express';
import { SpecialistService } from '../services/SpecialistService';
import { AppError } from '../error/AppError';

class SpecialistController {
  async listAll(request: Request, response: Response) {
    try {
      const specialistName = (request.body as any).name;
      const specialistService = new SpecialistService();
      const specialists = await specialistService.listAll(specialistName);

      if (specialists) {
        return response.send(specialists);
      } else {
        return new AppError(
          404,
          'Specialist not found!',
          'Success > SpecialistController > listAll()',
        );
      }
    } catch (error) {
      throw new AppError(
        500,
        'Internal Server Error',
        'Error > SpecialistController > listAll()',
      );
    }
  }

  async create(request: Request, response: Response) {
    try {
      const {
        id,
        crm,
        name,
        phoneNumber,
        cellPhone,
        email,
        profession,
        profilePictureUrl,
      } = request.body;

      const specialistService = new SpecialistService();
      const createdSpecialist = await specialistService.create({
        id,
        crm,
        name,
        phoneNumber,
        cellPhone,
        email,
        profession,
        profilePictureUrl,
      });

      if (createdSpecialist) {
        return response.send(createdSpecialist);
      }
    } catch (error) {
      throw new AppError(
        500,
        'Internal Server Error',
        'Error > SpecialistController > listAll()',
      );
    }
  }

  async update(request: Request, response: Response) {
    try {
      const {
        id,
        crm,
        name,
        phoneNumber,
        cellPhone,
        email,
        profession,
        profilePictureUrl,
      } = request.body;

      const specialistService = new SpecialistService();
      const updatedSpecialist = await specialistService.update({
        id,
        crm,
        name,
        phoneNumber,
        cellPhone,
        email,
        profession,
        profilePictureUrl,
      });

      if (updatedSpecialist) {
        return response.json({
          statusCode: 200,
          message: 'Specialist updated!',
          log: 'Success > SpecialistController > update()',
        });
      } else {
        return new AppError(
          404,
          'Profession not found!',
          'Error > ProfessionController > create()',
        );
      }
    } catch (error) {
      throw new AppError(
        500,
        'Specialist not updated!',
        'Error > SpecialistController > delete',
      );
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.body;
      const specialistService = new SpecialistService();
      const deletedService = await specialistService.delete(id);

      if (deletedService) {
        return response.json({
          statusCode: 201,
          message: `Specialist deleted!`,
          log: 'Success > SpecialistController > create',
        });
      } else {
        return new AppError(
          404,
          'Specialist not found!',
          'Error > SpecialistService > delete()',
        );
      }
    } catch (err) {
      throw new AppError(
        500,
        'Specialist not found!',
        'Error > SpecialistController > delete',
      );
    }
  }
}

export { SpecialistController };
