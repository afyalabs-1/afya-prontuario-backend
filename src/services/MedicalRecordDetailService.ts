import { getCustomRepository, Repository } from 'typeorm';
import { MedicalRecordDetail } from './../models/medicalRecordDetail';
import { Attendance } from './../models/attendance';
import { Specialists } from './../models/specialists';
import { MedicalRecord } from './../models/medicalRecord';

import { MedicalRecordDetailRepository } from '../repositories/MedicalRecordDetailRepository';
import { AttendanceRepository } from '../repositories/AttendancesRepository';
import { SpecialistRepository } from '../repositories/SpecialistRepository';
import { MedicalRecordRepository } from '../repositories/MedicalRecordRepository';

import { AppError } from '../error/AppError';

interface IMedicalRecordDetail {
  id?: string;
  dateTime: Date;
  description: string;
  specialists: [];
  attendance: [];
  medicalRecord: [];
}

class MedicalRecordDetailService {
  private medicalRecordDetailRepository: Repository<MedicalRecordDetail>;
  private attendanceRepository: Repository<Attendance>;
  private specialistRepository: Repository<Specialists>;
  private medicalRecordRepository: Repository<MedicalRecord>;

  constructor() {
    this.medicalRecordDetailRepository = getCustomRepository(
      MedicalRecordDetailRepository,
    );
    this.attendanceRepository = getCustomRepository(AttendanceRepository);
    this.specialistRepository = getCustomRepository(SpecialistRepository);
    this.medicalRecordRepository = getCustomRepository(MedicalRecordRepository);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create({
    dateTime,
    description,
    specialists,
    attendance,
    medicalRecord,
  }: IMedicalRecordDetail) {
    const medicalRecordDetailExists =
      await this.medicalRecordDetailRepository.findOne({
        dateTime,
        description,
        specialists,
        attendance,
        medicalRecord,
      });

    if (medicalRecordDetailExists) {
      return medicalRecordDetailExists;
    } else {
      const medicalRecordDetail =
        await this.medicalRecordDetailRepository.create({
          dateTime,
          description,
          specialists,
          attendance,
          medicalRecord,
        });

      await this.medicalRecordDetailRepository.save(medicalRecordDetail);

      return medicalRecordDetail;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update({
    id,
    dateTime,
    description,
    specialists,
    attendance,
    medicalRecord,
  }: IMedicalRecordDetail) {
    const medicalRecordDetail =
      await this.medicalRecordDetailRepository.findOne({
        id,
      });

    if (!medicalRecordDetail) {
      throw new AppError(404, 'Medical Record Detail Not Found!', 'Not Found!');
    } else {
      medicalRecordDetail.description = description;
      medicalRecordDetail.specialists = specialists;
      medicalRecordDetail.attendance = attendance;
      medicalRecordDetail.medicalRecord = medicalRecord;
      medicalRecordDetail.dateTime = dateTime;

      await this.medicalRecordDetailRepository.save(medicalRecordDetail);

      const medicalRecordDetailNow =
        await this.medicalRecordDetailRepository.findOne({
          id,
        });

      return medicalRecordDetailNow;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async delete(id: string) {
    const medicalRecordDetail =
      await this.medicalRecordDetailRepository.findOne({
        id,
      });

    await this.medicalRecordDetailRepository.delete({ id });

    return medicalRecordDetail;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async listMedicalRecord(id: []) {
    const medicalRecordDetail = await this.medicalRecordDetailRepository.find({
      medicalRecord: id,
    });

    return medicalRecordDetail;
  }
}

export { MedicalRecordDetailService };
