import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { IsString, IsEnum } from 'class-validator';
import { Exclude } from 'class-transformer';
import { nanoid } from 'nanoid/async';

import { BaseEntity } from '../base_entity';

import { User } from '../user';

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  LOGOUT = 'LOGOUT',
}

@Entity()
export class Session extends BaseEntity<Session> {
  @IsString()
  @Column({ length: 36 })
  @Index('IDX_TOKEN', { unique: true })
  token: string;

  @ManyToOne(type => User, user => user.sessions, { onDelete: 'CASCADE' })
  user: User;

  @Exclude()
  @IsString()
  @Column({ length: 255, nullable: true })
  ipAddress: string;

  @Exclude()
  @IsString()
  @Column({ length: 1023, nullable: true })
  userAgent: string;

  @IsEnum(SessionStatus)
  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.ACTIVE })
  status: SessionStatus;

  async generateToken() {
    this.token = await nanoid(32);

    return this.token;
  }
}
