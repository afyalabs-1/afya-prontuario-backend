import 'reflect-metadata';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base_entity';
import { IsISO8601, IsOptional } from 'class-validator';

@Entity()
export class Attendance extends BaseEntity<Attendance> {
  // @Column({ nullable: true })
  // id: string;

  @IsOptional({ always: false })
  @IsISO8601({ strict: true })
  @Column({ nullable: true })
  schedulingDate: Date;

  @IsOptional({ always: true })
  @IsISO8601({ strict: true })
  @Column({ nullable: true })
  serviceDate: Date;

  @IsOptional({ always: true })
  @IsISO8601({ strict: true })
  @Column({ nullable: true })
  serviceTime: Date;

  @Column({ nullable: true })
  value: string;
}
