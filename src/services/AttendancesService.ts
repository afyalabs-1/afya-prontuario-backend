import { Request, Response } from 'express';
import { getCustomRepository, Repository } from 'typeorm';
import { Attendance } from './../models/attendance';
import { AttendanceRepository } from '../repositories/AttendancesRepository';

interface IAttendance {
  schedulingDate: Date;
  serviceDate: Date;
  serviceTime: Date;
  value: string;
  id?: string;
}

class AttendancesService {
  private attendanceRepository: Repository<Attendance>;

  constructor() {
    this.attendanceRepository = getCustomRepository(AttendanceRepository);
  }

  async create({
    schedulingDate,
    serviceDate,
    serviceTime,
    value,
  }: IAttendance) {
    const attendanceExists = await this.attendanceRepository.findOne({
      schedulingDate,
      serviceTime,
      serviceDate,
    });

    if (attendanceExists) {
      return attendanceExists;
    }

    const attendance = this.attendanceRepository.create({
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
    });

    await this.attendanceRepository.save(attendance);

    return attendance;
  }

  async listAll() {
    const attendances = await this.attendanceRepository.find();
    return attendances;
  }
}

export { AttendancesService };
