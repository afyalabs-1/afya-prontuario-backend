import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { IsBrPostalCode } from '../_common/is_br_postal';
import { IsBrState } from '../_common/is_br_state';
import { BaseEntity } from './base_entity';
import { Client } from './client';

export class AddressKind {
  static readonly HOME = 'HOME';
  static readonly BUSINESS = 'BUSINESS';
}

@Entity('address')
export class Address extends BaseEntity<Address> {
  @IsEnum(AddressKind, { always: true })
  @Column({ type: 'enum', enum: AddressKind, default: AddressKind.HOME })
  kind: AddressKind;

  @IsString({ always: true })
  @Length(0, 255, { always: true })
  @Column({ nullable: false })
  street: string;

  @IsString({ always: true })
  @Length(0, 60, { always: true })
  @Column({ nullable: false })
  number: string;

  @IsOptional({ always: true })
  @IsString({ always: true })
  @Length(0, 60, { always: true })
  @Column({ nullable: true })
  complement: string;

  @IsString({ always: true })
  @Length(0, 60, { always: true })
  @Column({ nullable: false })
  district: string;

  @IsString({ always: true })
  @Length(0, 25, { always: true })
  @Column({ nullable: false })
  city: string;

  @IsBrState({ always: true })
  @Column({ nullable: false })
  state: string;

  @IsBrPostalCode({ always: true })
  @Column({ nullable: false })
  postalCode: string;

  @OneToMany(type => Client, client => client.address, { onDelete: 'CASCADE' })
  @JoinColumn()
  client: Client;
}
