import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base_entity';
import { Client } from './client';

export class AddressKind {
  static readonly HOME = 'HOME';
  static readonly BUSINESS = 'BUSINESS';
}

export class BRStates {
  static readonly AC = 'AC';
  static readonly AL = 'AL';
  static readonly AM = 'AM';
  static readonly AP = 'AP';
  static readonly BA = 'BA';
  static readonly CE = 'CE';
  static readonly DF = 'DF';
  static readonly ES = 'ES';
  static readonly GO = 'GO';
  static readonly MA = 'MA';
  static readonly MG = 'MG';
  static readonly MS = 'MS';
  static readonly MT = 'MT';
  static readonly PA = 'PA';
  static readonly PB = 'PB';
  static readonly PE = 'PE';
  static readonly PI = 'PI';
  static readonly PR = 'PR';
  static readonly RJ = 'RJ';
  static readonly RN = 'RN';
  static readonly RO = 'RO';
  static readonly RR = 'RR';
  static readonly RS = 'RS';
  static readonly SC = 'SC';
  static readonly SE = 'SE';
  static readonly SP = 'SP';
  static readonly TO = 'TO';
}

@Entity('address')
export class Address extends BaseEntity<Address> {
  @IsEnum(AddressKind, { always: true })
  @Column({ type: 'enum', enum: AddressKind, default: AddressKind.HOME })
  kind: AddressKind;

  @IsString({ always: true })
  @Length(0, 255, { always: true })
  @Column({ type: 'varchar', nullable: false })
  street: string;

  @IsString({ always: true })
  @Length(0, 60, { always: true })
  @Column({ type: 'varchar', nullable: false })
  number: string;

  @IsOptional({ always: true })
  @IsString({ always: true })
  @MaxLength(60, { always: true })
  @Column({ type: 'varchar', nullable: true })
  complement: string;

  @IsString({ always: true })
  @Length(0, 60, { always: true })
  @Column({ type: 'varchar', nullable: false })
  district: string;

  @IsString({ always: true })
  @Length(0, 25, { always: true })
  @Column({ type: 'varchar', nullable: false })
  city: string;

  @IsEnum(BRStates, { always: true })
  @Column({ type: 'enum', enum: BRStates, default: BRStates.AC })
  state: BRStates;

  @IsString({ always: true })
  @Length(8, 8, { always: true })
  @Column({ type: 'varchar', nullable: false })
  postalCode: string;

  @ManyToOne(type => Client, client => client.addresses, {
    cascade: true,
    eager: true,
  })
  clients: Client[];

  @ManyToOne(type => Client, client => client.addresses, {
    cascade: true,
    eager: true,
  })
  specialists: Client[];
}
