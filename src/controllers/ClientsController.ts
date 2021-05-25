import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { AppError } from '../error/AppError';
import { ClientsRepository } from '../repositories/ClientsRepository';

class ClientsController {
  async create(request: Request, response: Response) {
    const {
      cpf,
      name,
      email,
      phoneNumber,
      cellPhone,
      birthDate,
      gender,
      bloodType,
      profilePictureUrl,
    } = request.body;

    const clientsRepository = getCustomRepository(ClientsRepository);

    const addClient = clientsRepository.create({
      cpf: cpf,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      cellPhone: cellPhone,
      birthDate: birthDate,
      gender: gender,
      bloodType: bloodType,
      profilePictureUrl: profilePictureUrl,
    });

    return await clientsRepository.save(addClient);
  }

  async list(client: string) {
    const clientsRepository = getCustomRepository(ClientsRepository);
    let clientsList = null;

    if (client) {
      clientsList = await clientsRepository.find({
        where: { name: Like(`%${client}%`) },
        // relations: ['address'],
      });
    } else {
      clientsList = await clientsRepository.find();
      // clientsList = await clientsRepository.find({ relations: ['address'] });
    }

    if (!clientsList) {
      throw new AppError(
        500,
        'Client not found!',
        'Error > ClientsController > List',
      );
    } else {
      return clientsList;
    }
  }
}

export { ClientsController };
