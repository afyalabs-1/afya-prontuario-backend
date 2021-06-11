import { Client } from './client';
import { MedicalRecordDetail } from './medicalRecordDetail';
import 'reflect-metadata';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base_entity';
import { IsOptional } from 'class-validator';

@Entity()
export class MedicalRecord extends BaseEntity<MedicalRecord> {
  @IsOptional({ always: false })
  @Column({ nullable: true })
  openDate: Date;

  @ManyToOne(() => Client, client => client.id)
  client: Client[];

  @OneToMany(
    () => MedicalRecordDetail,
    medicalRecordDetail => medicalRecordDetail.medicalRecord,
  )
  medicalRecordDetail: MedicalRecordDetail[];
}
