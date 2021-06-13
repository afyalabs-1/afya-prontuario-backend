import { Profession } from './profession';
import { IsEmail, IsOptional, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base_entity';
import { Attendance } from './attendance';
import { MedicalRecordDetail } from './medicalRecordDetail';
import { Address } from './address';

@Entity('specialists')
export class Specialists extends BaseEntity<Specialists> {
  @Length(1, 50, { always: true })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  crm: string;

  @Length(1, 150, { always: true })
  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @IsOptional({ always: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false })
  cellPhone: string;

  @IsEmail({}, { always: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ManyToOne(() => Profession, profession => profession.specialist)
  profession: Profession;

  @OneToMany(() => Attendance, attendance => attendance.specialists)
  attendance: Attendance[];

  @OneToMany(
    () => MedicalRecordDetail,
    medicalRecordDetail => medicalRecordDetail.specialists,
  )
  medicalRecordDetail: MedicalRecordDetail[];

  @OneToMany(type => Address, address => address.specialists, {
    eager: true,
  })
  addresses: Address[];
}
