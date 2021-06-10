import { Specialists } from './specialists';
import { Client } from './client';
import 'reflect-metadata';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base_entity';
import { IsOptional } from 'class-validator';

export class Status {
  static readonly SCHEDULED = 'SCHEDULED';
  static readonly ACCOMPLISHED = 'ACCOMPLISHED';
  static readonly CANCELED = 'CANCELED';
}

@Entity()
export class Attendance extends BaseEntity<Attendance> {
  @IsOptional({ always: false })
  @Column({ nullable: true })
  schedulingDate: Date;

  @IsOptional({ always: true })
  @Column({ nullable: true })
  serviceDate: Date;

  @IsOptional({ always: true })
  @Column({ nullable: true })
  serviceTime: Date;

  @Column({ nullable: true })
  value: string;

  @Column({ type: 'enum', enum: Status, nullable: true })
  status: Status;

  @ManyToOne(() => Client, client => client.id)
  client: Client[];

  @ManyToOne(() => Specialists, specialists => specialists.id)
  specialists: Specialists[];
}
