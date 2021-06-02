import { Request, Response } from 'express';
import { AddressService } from '../services/AddressService';

class AddressController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      kind,
      street,
      number,
      complement,
      district,
      city,
      state,
      postalCode,
      client,
    } = request.body;

    const addressService = new AddressService();

    const address = await addressService.create({
      kind,
      street,
      number,
      complement,
      district,
      city,
      state,
      postalCode,
      client,
    });

    if (address) {
      return response.status(201).json(address);
    } else {
      return response
        .status(404)
        .json({ message: 'ERROR Could not create address!' });
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    const street = (request.query as any).street;
    // const cpf = request.query.cpf;
    const addressService = new AddressService();
    const address = await addressService.list(street);
    return response.json(address);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      kind,
      street,
      number,
      complement,
      district,
      city,
      state,
      postalCode,
      client,
    } = request.body;

    const addressService = new AddressService();
    try {
      const address = await addressService.update({
        id,
        kind,
        street,
        number,
        complement,
        district,
        city,
        state,
        postalCode,
        client,
      });

      if (address) {
        return response.status(204).json(address);
      } else {
        return response
          .status(501)
          .json({ message: 'ERROR Could not update Address!' });
      }
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const addressService = new AddressService();
    try {
      const address = await addressService.delete(id);

      return response.json(address);
    } catch (error) {
      return response.status(501).json({
        message: error.message,
      });
    }
  }
}

export { AddressController };
