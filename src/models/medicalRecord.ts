import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base_entity';
import { MedicalFile } from './medicalFile';
// import { Consult } from './consult'

@Entity()
export class MedicalRecord extends BaseEntity<MedicalRecord> {
  @IsString({ always: true })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => MedicalFile, medicalFile => medicalFile.id)
  medicalFile: MedicalFile;

  //TODO: Quando criarmos a entidade Atendimento (Consult) descomentar esse trecho.
  // @OneToOne(() => consult, consult) => consult.id)
  // consult : consult;
}
