import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';

class ClientController {
  async create(request: Request, response: Response): Promise<Response> {
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

    const clientService = new ClientService();

    const client = await clientService.create({
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

    if (client) {
      return response.status(201).json(client);
    } else {
      return response
        .status(404)
        .json({ message: 'ERROR when create a Client!' });
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    const cpf = (request.query as any).cpf;
    // const cpf = request.query.cpf;
    const clientService = new ClientService();
    const client = await clientService.list(cpf);
    return response.json(client);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
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

    const clientService = new ClientService();
    try {
      const client = await clientService.update({
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
      });

      if (client) {
        return response.status(204).json(client);
      } else {
        return response
          .status(501)
          .json({ message: 'ERROR Could not update Client!' });
      }
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const clientService = new ClientService();
    try {
      const client = await clientService.delete(id);

      return response.json(client);
    } catch (error) {
      return response.status(501).json({
        message: error.message,
      });
    }
  }
}

export { ClientController };
