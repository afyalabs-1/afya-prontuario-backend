import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base_entity';
import { MedicalRecord } from './medicalRecord';

@Entity()
export class MedicalFile extends BaseEntity<MedicalFile> {
  @OneToMany(() => MedicalRecord, medicalRecord => medicalRecord.id)
  medicalRecords: MedicalRecord[];
}
