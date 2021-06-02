import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Address } from '../models/address';

const addressRouter = Router();

addressRouter.post('/', async (request, response) => {
  try {
    const addressRepository = getRepository(Address);
    const newAddress = await addressRepository.save(request.body);
    return response.status(201).json(newAddress);
  } catch (err) {
    console.log('err.message :>> ', err.message);
  }
});

export { addressRouter };
