import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
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
}

export { ClientsController };
