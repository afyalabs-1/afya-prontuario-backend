import { getCustomRepository, Like, Repository } from 'typeorm';
import { Client } from './../models/client';
import { ClientRepository } from '../repositories/ClientsRepository';
import { AppError } from '../error/AppError';

interface IClient {
  id?: string;
  cpf: string;
  name: string;
  email: string;
  phoneNumber: string;
  cellPhone: string;
  birthDate: Date;
  gender: string;
  bloodType: string;
  profilePictureUrl: string;
}

class ClientService {
  private clientRepository: Repository<Client>;

  constructor() {
    this.clientRepository = getCustomRepository(ClientRepository);
  }

  async create({
    cpf,
    name,
    email,
    phoneNumber,
    cellPhone,
    birthDate,
    gender,
    bloodType,
    profilePictureUrl,
  }: IClient) {
    const clientExists = await this.clientRepository.findOne({
      cpf,
    });

    if (clientExists) {
      throw new AppError(
        403,
        'Client Already Exists',
        'ERROR > ClientsService > Create',
      );
    }

    const client = this.clientRepository.create({
      cpf,
      name,
      email,
      phoneNumber,
      cellPhone,
      birthDate,
      gender,
      bloodType,
      profilePictureUrl,
    });

    await this.clientRepository.save(client);

    return client;
  }

  async list(cpf: IClient) {
    try {
      if (cpf) {
        const clients = await this.clientRepository.find({
          where: { cpf: Like(`%${cpf}%`) },
          relations: ['addresses'],
        });
        return clients;
      } else {
        const clients = await this.clientRepository.find({
          relations: ['addresses'],
        });
        return clients;
      }
    } catch {
      throw new AppError(404, 'not found', 'ERROR > ClientService > List');
    }
  }

  async update({
    id,
    cpf,
    name,
    email,
    phoneNumber,
    cellPhone,
    birthDate,
    gender,
    bloodType,
    profilePictureUrl,
  }: IClient) {
    const updateClient = await this.clientRepository.findOne({
      id,
    });

    if (!updateClient) {
      throw new AppError(
        404,
        'Client Not Found',
        'ERROR > ClientsService > Update',
      );
    } else {
      updateClient.cpf = cpf;
      updateClient.name = name;
      updateClient.email = email;
      updateClient.phoneNumber = phoneNumber;
      updateClient.cellPhone = cellPhone;
      updateClient.birthDate = birthDate;
      updateClient.gender = gender;
      updateClient.bloodType = bloodType;
      updateClient.profilePictureUrl = profilePictureUrl;

      await this.clientRepository.save(updateClient);

      const client = await this.clientRepository.findOne({
        id,
      });

      return client;
    }
  }

  async delete(id: string) {
    const deleteClient = await this.clientRepository.findOne({ id });

    if (!deleteClient) {
      throw new AppError(
        404,
        'Client Not Found',
        'Error > ClientService > delete',
      );
    }
    // deleteClient.updatedDate = new Date();
    await this.clientRepository.delete({ id });
    console.log('Client deleted', id);
  }
}

export { ClientService };
