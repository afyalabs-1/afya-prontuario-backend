import 'reflect-metadata';
import { Column, Entity } from 'typeorm';
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

  @Column({ nullable: true })
  idClient: string;

  @Column({ nullable: true })
  idSpecialist: string;
}
