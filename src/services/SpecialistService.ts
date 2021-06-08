import { getCustomRepository, Repository, Like } from 'typeorm';
import { Specialists } from '../models/specialists';
import { Profession } from '../models/profession';
import { SpecialistRepository } from '../repositories/SpecialistRepository';
import { AppError } from '../error/AppError';
import { Request, Response } from 'express';

interface ISpecialist {
  id: string;
  record: string;
  name: string;
  phoneNumber: string;
  cellPhone: string;
  email: string;
  profession: Profession;
}

class SpecialistService {
  private specialistRepository: Repository<ISpecialist>;

  constructor() {
    this.specialistRepository = getCustomRepository(SpecialistRepository);
  }

  async listAll(specialistName: string) {
    let specialistList = null;

    if (specialistName) {
      specialistList = await this.specialistRepository.find({
        where: { name: Like(`%${specialistName}%`) },
      });
    } else {
      specialistList = await this.specialistRepository.find();
    }

    if (specialistList) {
      return specialistList;
    } else {
      return new AppError(
        404,
        'Specialist not found!',
        'Error > SpecialistService > listAll()',
      );
    }
  }

  async create({
    id,
    record,
    name,
    phoneNumber,
    cellPhone,
    email,
    profession,
  }: ISpecialist) {
    const specialist = this.specialistRepository.create({
      record,
      name,
      phoneNumber,
      cellPhone,
      email,
      profession,
    });

    const createdSpecialist = this.specialistRepository.save(specialist);

    if (createdSpecialist) {
      return createdSpecialist;
    } else {
      return new AppError(
        404,
        'Profession not found!',
        'Error > ProfessionController > create()',
      );
    }
  }

  async update({
    id,
    record,
    name,
    phoneNumber,
    cellPhone,
    email,
    profession,
  }: ISpecialist) {
    return this.specialistRepository.save({
      id,
      record,
      name,
      phoneNumber,
      cellPhone,
      email,
      profession,
    });
  }

  async delete(id: string) {
    const deletedSpecialist = this.specialistRepository.delete(id);

    if (deletedSpecialist) {
      return deletedSpecialist;
    } else {
      return '';
    }
  }
}

export { SpecialistService };
