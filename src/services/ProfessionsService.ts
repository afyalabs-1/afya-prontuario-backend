import { getCustomRepository, Repository, Like } from 'typeorm';
import { Profession } from '../models/profession';
import { ProfessionRepository } from '../repositories/ProfessionRepository';
import { AppError } from '../error/AppError';
import { Request, Response } from 'express';

interface IProfession {
  name: string;
}

class ProfessionService {
  private professionRepository: Repository<IProfession>;

  constructor() {
    this.professionRepository = getCustomRepository(ProfessionRepository);
  }

  async listAll(professionName: string) {
    let professionList = null;

    if (professionName) {
      professionList = await this.professionRepository.find({
        where: { name: Like(`%${professionName}%`) },
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
        'Error > ProfessionController > listAll()',
      );
    }
  }

  async create(name: string) {
    const profession = this.professionRepository.create({
      name,
    });

    const createdProfession = this.professionRepository.save(profession);

    if (createdProfession) {
      return createdProfession;
    } else {
      return new AppError(
        404,
        'Profession not found!',
        'Error > ProfessionController > create()',
      );
    }
  }

  async update(id: string, name: string) {
    return this.professionRepository.save({ name, id });
  }

  async delete(id: string) {
    const deletedProfession = this.professionRepository.delete(id);

    if (deletedProfession) {
      return deletedProfession;
    } else {
      return new AppError(
        404,
        'Profession not found!',
        'Error > ProfessionController > delete()',
      );
    }
  }
}

export { ProfessionService };
