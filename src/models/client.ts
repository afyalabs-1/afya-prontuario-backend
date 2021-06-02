import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
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

@Entity('client')
export class Client extends BaseEntity<Client> {
  @IsString({ always: true })
  @MaxLength(11, { always: true })
  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  cpf: string;

  @IsString({ always: true })
  @Length(3, 150, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @IsString({ always: true })
  @IsEmail({}, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @IsString({ always: true })
  @Length(10, 10, { always: false })
  @Column({ type: 'varchar', length: 15, nullable: true })
  phoneNumber: string;

  @IsString({ always: true })
  @Length(10, 11, { always: true })
  @Column({ type: 'varchar', length: 15, nullable: false })
  cellPhone: string;

  @ManyToMany(type => Address)
  address: Address[];

  @IsISO8601({ strict: true })
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @IsEnum(Gender, { always: true })
  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  @IsEnum(BloodTypes, { always: true })
  @Column({ type: 'enum', enum: BloodTypes, nullable: false })
  bloodType: BloodTypes;

  @IsOptional({ always: true })
  @IsUrl({}, { always: true })
  @Column({ type: 'varchar', nullable: true })
  profilePictureUrl?: string;
}
