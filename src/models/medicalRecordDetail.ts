import { Specialists } from './specialists';
import { Attendance } from './attendance';
import { MedicalRecord } from './medicalRecord';

import 'reflect-metadata';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base_entity';
import { IsOptional } from 'class-validator';

@Entity()
export class MedicalRecordDetail extends BaseEntity<MedicalRecordDetail> {
  @IsOptional({ always: false })
  @Column({ nullable: true })
  dateTime: Date;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Specialists, specialists => specialists.id)
  specialists: Specialists[];

  @ManyToOne(() => Attendance, attendance => attendance.id)
  attendance: Attendance[];

  @ManyToOne(() => MedicalRecord, medicalRecord => medicalRecord.id)
  medicalRecord: MedicalRecord[];
}
