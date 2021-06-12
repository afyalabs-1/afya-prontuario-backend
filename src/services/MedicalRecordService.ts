import { getCustomRepository, Repository } from 'typeorm';
import { MedicalRecord } from './../models/medicalRecord';

import { MedicalRecordRepository } from '../repositories/MedicalRecordRepository';

interface IMedicalRecord {
  id?: string;
  openDate: Date;
  client: [];
}

class MedicalRecordService {
  private medicalRecordRepository: Repository<MedicalRecord>;

  constructor() {
    this.medicalRecordRepository = getCustomRepository(MedicalRecordRepository);
  }

  async create({ client }: IMedicalRecord) {
    // Verifico se o Cliente já tem Prontuario
    const medicalRecordExists = await this.medicalRecordRepository.findOne({
      where: { client: client },
    });

    if (!medicalRecordExists) {
      const openDate = new Date();

      const medicalRecord = this.medicalRecordRepository.create({
        client,
        openDate,
      });

      await this.medicalRecordRepository.save(medicalRecord);

      return medicalRecord;
    } else {
      return medicalRecordExists;
    }
  }

  async delete(id: string) {
    const medicalRecord = await this.medicalRecordRepository.findOne({
      id,
    });

    await this.medicalRecordRepository.delete({ id });

    return medicalRecord;
  }

  async listMedicalRecord(id: string) {
    const medicalRecord = await this.medicalRecordRepository.find({
      id,
    });

    return medicalRecord;
  }
}

export { MedicalRecordService };
