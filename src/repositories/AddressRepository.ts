import { EntityRepository, Repository } from 'typeorm';
import { Address } from '../models/address';

@EntityRepository(Address)
class AddressRepository extends Repository<Address> {}

export { AddressRepository };
