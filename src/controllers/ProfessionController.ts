import { Request, Response } from 'express';
import { ProfessionService } from '../services/ProfessionsService';
import { AppError } from '../error/AppError';

class ProfessionController {
  async listAll(request: Request, response: Response) {
    try {
      var professionName = (request.query as any).name
      var professionService = new ProfessionService();
      var professions = await professionService.listAll(professionName); 
      
      if (professions) {
        return response.json({
          statusCode: 200,
          professions: professions
        });
      } else {
        return new AppError(
          404,
          'Profession not found! ',
          'Success > ProfessionController > listAll'
        );
      }
    } catch (error) {
      throw new AppError(
        500,
        'Profession not found!',
        'Error > ProfessionController > listAll'
      );
    }
  }

  async create(request: Request, response: Response) {
    try {
      var { name } = request.body;
      var professionService = new ProfessionService();
      var createdProfession = await professionService.create(name);

      if (createdProfession) {
        return response.send(createdProfession);
      }
    } catch (err) {
      throw new AppError(
        500,
        'Profession not created!',
        'Error > ProfessionController > create()'
      );
    }
  }

  async update(request: Request, response: Response) {
    try {
      var { id, name } = request.body;
      var professionService = new ProfessionService();
      var updatedProfession = await professionService.update(id, name);

      if (updatedProfession) {
        return response.json({
          statusCode: 200,
          message: 'Profession updated!',
          log: 'Success > ProfessionController > update()'
        });
      }
    } catch (error) {
      throw new AppError(
        500,
        'Profession not updated!',
        'Error > ProfessionController > delete'
      );
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.body;
      const professionService = new ProfessionService();
      const deleteProfession = await professionService.delete(id);

      if (deleteProfession) {
        return response.json({
          statusCode: 201,
          message: `Profession deleted!`,
          log: 'Success > ProfessionController > create'
        });
      }
    } catch(err) {
      throw new AppError(
        500,
        'Profession not found!',
        'Error > ProfessionController > delete'
      );
    }
  }
}

export { ProfessionController };