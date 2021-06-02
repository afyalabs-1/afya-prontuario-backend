import { getCustomRepository, Like, Repository } from 'typeorm';
import { Address } from './../models/address';
import { AddressRepository } from '../repositories/AddressRepository';
import { AppError } from '../error/AppError';

interface IAddress {
  id?: string;
  kind: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
  client: string;
}

class AddressService {
  private addressRepository: Repository<Address>;

  constructor() {
    this.addressRepository = getCustomRepository(AddressRepository);
  }

  async create({
    kind,
    street,
    number,
    complement,
    district,
    city,
    state,
    postalCode,
    client,
  }: IAddress) {
    const address = this.addressRepository.create({
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

    await this.addressRepository.save(address);

    return address;
  }

  async list(client: IAddress) {
    try {
      if (client) {
        const address = await this.addressRepository.find({
          where: { client: Like(`%${client}%`) },
          relations: ['client'],
        });
        return address;
      } else {
        const address = await this.addressRepository.find({
          relations: ['client'],
        });
        return address;
      }
    } catch {
      throw new AppError(404, 'not found', 'ERROR > AddressService > List');
    }
  }

  async update({
    id,
    kind,
    street,
    number,
    complement,
    district,
    city,
    state,
    postalCode,
    clientID,
  }: IAddress) {
    const updateAddress = await this.addressRepository.findOne({ id });

    if (!updateAddress) {
      throw new AppError(
        404,
        'Client Not Found',
        'ERROR > AddressService > Update',
      );
    } else {
      updateAddress.kind = kind;
      updateAddress.street = street;
      updateAddress.number = number;
      updateAddress.complement = complement;
      updateAddress.district = district;
      updateAddress.city = city;
      updateAddress.state = state;
      updateAddress.postalCode = postalCode;

      await this.addressRepository.save(updateAddress);

      const address = await this.addressRepository.findOne({
        id,
      });

      return address;
    }
  }

  async delete(id: string) {
    const deleteAddress = await this.addressRepository.findOne({ id });

    if (!deleteAddress) {
      throw new AppError(
        404,
        'Client Not Found',
        'Error > ClientService > delete',
      );
    }
    // deleteClient.updatedDate = new Date();
    await this.addressRepository.delete({ id });
    console.log('Address deleted', id);
  }
}

export { AddressService };
