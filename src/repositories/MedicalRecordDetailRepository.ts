import { MedicalRecordDetail } from './../models/medicalRecordDetail';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MedicalRecordDetail)
class MedicalRecordDetailRepository extends Repository<MedicalRecordDetail> {}

export { MedicalRecordDetailRepository };
