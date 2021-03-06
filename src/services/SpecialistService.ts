import { getCustomRepository, Like, Repository } from 'typeorm';
import { AppError } from '../error/AppError';
import { Profession } from '../models/profession';
import { SpecialistRepository } from '../repositories/SpecialistRepository';

interface ISpecialist {
  id: string;
  crm: string;
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
    crm,
    name,
    phoneNumber,
    cellPhone,
    email,
    profession,
  }: ISpecialist) {
    const specialist = this.specialistRepository.create({
      crm,
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
    crm,
    name,
    phoneNumber,
    cellPhone,
    email,
    profession,
  }: ISpecialist) {
    return this.specialistRepository.save({
      id,
      crm,
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
