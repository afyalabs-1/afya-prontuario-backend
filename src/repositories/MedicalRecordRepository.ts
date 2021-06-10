import { MedicalRecord } from './../models/medicalRecord';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MedicalRecord)
class MedicalRecordRepository extends Repository<MedicalRecord> {}

export { MedicalRecordRepository };
