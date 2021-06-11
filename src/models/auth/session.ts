import { Exclude } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base_entity';
import { User } from '../user';

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  LOGOUT = 'LOGOUT',
}

@Entity()
export class Session extends BaseEntity<Session> {
  @ManyToOne(type => User, user => user.sessions, { onDelete: 'CASCADE' })
  user: User;

  @IsString()
  @Column({ type: 'varchar' })
  token: string;

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
}
