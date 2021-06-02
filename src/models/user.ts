import {
  Entity,
  Column,
  OneToMany,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsString, Length, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base_entity';
// import { Session } from '../auth/session.entity';

// const { CREATE, UPDATE } = CrudValidationGroups;

export class UserRole {
  static readonly USER = 'USER';
  static readonly ADMINISTRATOR = 'ADMINISTRATOR';
}

export class UserStatus {
  static readonly UNCONFIRMED_EMAIL = 'UNCONFIRMED_EMAIL';
  static readonly APPROVAL_PENDING = 'APPROVAL_PENDING';
  static readonly ACTIVE = 'ACTIVE';
}

@Entity('user')
@Index('IDX_EMAIL_UNIQUE', ['email'], { unique: true })
@Index('IDX_EMAILCONFIRMATIONCODE_UNIQUE', ['emailConfirmationCode'], {
  unique: true,
})
@Index('IDX_PASSWORDRESETCODE_UNIQUE', ['passwordResetCode'], { unique: true })
export class User extends BaseEntity<User> {
  // @IsOptional({ groups: [UPDATE] })
  @IsEnum(UserRole, { always: true })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @IsOptional({ always: true })
  @IsEnum(UserStatus, { always: true })
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  // @IsOptional({ groups: [UPDATE] })
  @IsEmail({}, { always: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @IsOptional({ always: true })
  @Length(6, 255, { always: true })
  @Column({ length: 60, nullable: true })
  password: string;

  currentPassword: string; // for validation when changing passwords

  // @IsOptional({ groups: [UPDATE] })
  @IsString({ always: true })
  @Length(3, 150, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  emailConfirmationCode: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordResetCode: string | null;

  // @OneToMany(type => Session, session => session.user)
  // sessions: Session[];

  // @OneToMany(type => UserDevice, device => device.user)
  // devices: UserDevice[];

  @Exclude()
  currentToken: string; // used for logout

  @Exclude()
  playerId?: string; // used for app login

  async validatePassword(password: string): Promise<boolean> {
    if (await bcrypt.compare(password, this.password)) {
      return true;
    }

    return false;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (
      this.password &&
      (!this.password.startsWith('$2b$12$') || this.password.length !== 60)
    ) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
