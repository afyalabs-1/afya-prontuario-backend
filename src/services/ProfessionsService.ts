import { getCustomRepository, Repository, Like } from 'typeorm';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';

interface IProfession {
  name: string;
}

class ProfessionService {
  private professionRepository: Repository<IProfession>;

  constructor() {
    this.professionRepository = getCustomRepository(ProfessionRepository);
  }

  async listAll(professionName: string) {
    var professionList = null;
    
    if (professionName) {
      professionList = await this.professionRepository.find({
        where: { name: Like(`%${professionName}%`)}
      });
    } else {
      professionList = await this.professionRepository.find();
    }
    
    if (professionList) {
      return professionList;
    } else {
      return new AppError(
        404,
        'Profession not found!',
        'Error > ProfessionController > listAll()'
      );
    }
  }

  async create(name: string) {
    var profession = this.professionRepository.create({
      name
    });

    let createdProfession = this.professionRepository.save(profession);

    if (createdProfession) {
      return createdProfession;
    } else {
      return new AppError(
        404,
        'Profession not found!',
        'Error > ProfessionController > create()'
      );
    }
  }

  async update(id: string, name: string) {
    return this.professionRepository.save({ name, id });
  }

  async delete(id: string) {
    let deletedProfession = this.professionRepository.delete(id);

    if (deletedProfession) {
      return deletedProfession;
    } else {
      return new AppError(
        404,
        'Profession not found!',
        'Error > ProfessionController > delete()'
      );
    }
  }
}

export { ProfessionService };
