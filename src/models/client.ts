import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Address } from './address';
import { BaseEntity } from './base_entity';

export class Gender {
  static readonly MALE = 'MALE';
  static readonly FEMALE = 'FEMALE';
  static readonly OTHER = 'OTHER';
}

export class BloodTypes {
  static readonly A_POSITIVE = 'A_POSITIVE';
  static readonly A_NEGATIVE = 'A_NEGATIVE';
  static readonly B_POSITIVE = 'B_POSITIVE';
  static readonly B_NEGATIVE = 'B_NEGATIVE';
  static readonly O_POSITIVE = 'O_POSITIVE';
  static readonly O_NEGATIVE = 'O_NEGATIVE';
  static readonly AB_POSITIVE = 'AB_POSITIVE';
  static readonly AB_NEGATIVE = 'AB_NEGATIVE';
}

@Entity('clients')
export class Client extends BaseEntity<Client> {
  @IsString({ always: true })
  @Length(14, 14, { always: true })
  @Column({ type: 'varchar', length: 14, nullable: false, unique: true })
  cpf: string;

  @IsString({ always: true })
  @Length(3, 150, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @IsEmail({}, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 15, nullable: false })
  phoneNumber: string;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 15, nullable: false })
  cellPhone: string;

  @Type(() => Address)
  @ManyToOne(type => Address, address => address.client)
  address: Address[];

  @IsISO8601({ strict: true })
  @Column({ nullable: true })
  birthDate: Date;

  @IsEnum(Gender, { always: true })
  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  @IsEnum(BloodTypes, { always: true })
  @Column({ type: 'enum', enum: BloodTypes, nullable: false })
  bloodType: BloodTypes;

  @IsOptional({ always: true })
  @IsUrl({}, { always: true })
  @Column()
  profilePictureUrl?: string;
}
