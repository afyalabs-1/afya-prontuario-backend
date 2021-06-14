import { getCustomRepository, Repository } from 'typeorm';
import { Attendance } from './../models/attendance';
import { Client } from './../models/client';
import { Specialists } from './../models/specialists';
import { MedicalRecord } from './../models/medicalRecord';

import { AttendanceRepository } from '../repositories/AttendancesRepository';
import { ClientRepository } from '../repositories/ClientsRepository';
import { SpecialistRepository } from '../repositories/SpecialistRepository';
import { MedicalRecordRepository } from '../repositories/MedicalRecordRepository';

import { AppError } from '../error/AppError';

interface IAttendance {
  id?: string;
  schedulingDate: Date;
  serviceDate: Date;
  serviceTime: Date;
  value: string;
  details: string;
  client: [];
  specialists: [];
  status: string;
}

class AttendancesService {
  private attendanceRepository: Repository<Attendance>;
  private clientRepository: Repository<Client>;
  private specialistRepository: Repository<Specialists>;
  private medicalRecordRepository: Repository<MedicalRecord>;

  constructor() {
    this.attendanceRepository = getCustomRepository(AttendanceRepository);
    this.clientRepository = getCustomRepository(ClientRepository);
    this.specialistRepository = getCustomRepository(SpecialistRepository);
    this.medicalRecordRepository = getCustomRepository(MedicalRecordRepository);
  }

  // Validando Cliente e Especialista
  async relationIsValid(identify: string, relation: string) {
    if (relation.toUpperCase() === 'CLIENT') {
      const clientId = identify;

      const exists = await this.clientRepository.findOne({
        where: { id: clientId },
      });
      return exists;
    } else if (relation.toUpperCase() === 'SPECIALIST') {
      const specialistId = identify;
      const exists = await this.specialistRepository.findOne({
        where: { id: specialistId },
      });
      return exists;
    }
  }

  async create({
    schedulingDate,
    serviceDate,
    serviceTime,
    value,
    details,
    client,
    specialists,
    status,
  }: IAttendance) {
    const attendanceExists = await this.attendanceRepository.findOne({
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
      client,
      specialists,
      status,
    });

    if (attendanceExists) {
      return attendanceExists;
    }

    // Verificando se o Cliente é valido!
    const clientId = client.toString();
    const clientExists = await this.relationIsValid(clientId, 'CLIENT');

    // Verificando se o Especialista é valido!
    const specialistId = specialists.toString();
    const specialistExists = await this.relationIsValid(
      specialistId,
      'SPECIALIST',
    );

    if (!clientExists) {
      throw new AppError(404, 'Client Not Found', 'Client Not Found!');
    } else if (!specialistExists) {
      throw new AppError(404, 'Specialist Not Found', 'Specialist Not Found!');
    } else {
      const attendance = this.attendanceRepository.create({
        schedulingDate,
        serviceDate,
        serviceTime,
        value,
        details,
        client,
        specialists,
        status,
      });

      await this.attendanceRepository.save(attendance);

      return attendance;
    }
  }

  async listScheduling(schedulingDate: Date) {
    const attendance = await this.attendanceRepository.find({
      schedulingDate,
    });

    return attendance;
  }

  async listService(serviceDate: Date) {
    const attendance = await this.attendanceRepository.find({
      serviceDate,
    });

    return attendance;
  }

  async listClient(clientId: []) {
    const attendance = await this.attendanceRepository.find({
      client: clientId,
    });

    return attendance;
  }

  async listSpecialist(specialistsId: []) {
    const attendance = await this.attendanceRepository.find({
      specialists: specialistsId,
    });

    return attendance;
  }

  async listStatus(status: string) {
    const attendance = await this.attendanceRepository.find({
      status,
    });

    return attendance;
  }

  async listId(id: string) {
    const attendance = await this.attendanceRepository.findOne({
      id,
    });

    if (!attendance) {
      throw new Error('Attendance not found!');
    }

    return attendance;
  }

  async update({
    id,
    schedulingDate,
    serviceDate,
    serviceTime,
    value,
    details,
    status,
    client,
    specialists,
  }: IAttendance) {
    const attendance = await this.attendanceRepository.findOne({
      id,
    });

    if (!attendance) {
      throw new AppError(404, 'Attendance Not Found', 'Attendance Not Found!');
    } else {
      // Verificando se o Cliente é valido!
      const clientId = client.toString();

      const clientExists = await this.relationIsValid(clientId, 'CLIENT');

      // Verificando se o Especialista é valido!
      const specialistId = specialists.toString();
      const specialistExists = await this.relationIsValid(
        specialistId,
        'SPECIALIST',
      );

      if (!clientExists) {
        throw new AppError(404, 'Client Not Found', 'Client Not Found!');
      } else if (!specialistExists) {
        throw new AppError(
          404,
          'Specialist Not Found',
          'Specialist Not Found!',
        );
      } else {
        attendance.schedulingDate = schedulingDate;
        attendance.serviceTime = serviceTime;
        attendance.serviceDate = serviceDate;
        attendance.value = value;
        attendance.specialists = specialists;
        attendance.client = client;
        attendance.details = details;
        attendance.status = status.toUpperCase();

        await this.attendanceRepository.save(attendance);

        const attendanceNow = await this.attendanceRepository.findOne({
          id,
        });

        return attendanceNow;
      }
    }
  }

  async delete(id: string) {
    const attendance = await this.attendanceRepository.findOne({
      id,
    });

    if (!attendance) {
      throw new Error('Attendance not found!');
    }

    await this.attendanceRepository.delete({ id });

    return attendance;
  }

  async listAll() {
    const attendance = await this.attendanceRepository.find({
      relations: ['client', 'specialists'],
    });

    return attendance;
  }
}

export { AttendancesService };
