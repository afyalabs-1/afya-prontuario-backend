// import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base_entity';

// export class UserStatus {
// 	static readonly UNCONFIRMED_EMAIL = "UNCONFIRMED_EMAIL";
//   static readonly APPROVAL_PENDING = "APPROVAL_PENDING";
// 	static readonly ACTIVE = "ACTIVE";
// }

export class Gender {
  static readonly MALE = 'MALE';

  static readonly FEMALE = 'FEMALE';

  static readonly OTHER = 'OTHER';
}

@Entity()
export class Client<Client> {
  @IsString({ always: true })
  @Length(14, 14, { always: true })
  @Column({ type: 'varchar', length: 14, nullable: false, unique: true })
  cpf: string;

  @IsString({ always: true })
  @Length(3, 150, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @IsEmail({}, { always: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @IsOptional({ always: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false })
  cellPhone: string;

  // @Type(() => UserAddress)
  // @ManyToOne(type => UserAddress, userAddress => userAddress.user)
  // address: UserAddress[];

  @IsOptional({ always: true })
  @IsISO8601({ strict: true })
  @Column({ nullable: true })
  birthDate: Date;

  @IsOptional({ always: true })
  @IsEnum(Gender, { always: true })
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @IsOptional({ always: true })
  @IsUrl({}, { always: true })
  @Column()
  profilePictureUrl?: string;
}
