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
  clients: [];
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
    clients,
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
      clients,
    });

    await this.addressRepository.save(address);

    return address;
  }

  async list(clients: IAddress) {
    try {
      if (clients) {
        const address = await this.addressRepository.find({
          where: { clients: Like(`%${clients}%`) },
          relations: ['clients'],
        });
        return address;
      } else {
        const address = await this.addressRepository.find({
          relations: ['clients'],
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
    clients,
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
