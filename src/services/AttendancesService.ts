import { getCustomRepository, Repository } from 'typeorm';
import { Attendance } from './../models/attendance';
import { AttendanceRepository } from '../repositories/AttendancesRepository';

interface IAttendance {
  schedulingDate: Date;
  serviceDate: Date;
  serviceTime: Date;
  value: string;
  id?: string;
  idClient: string;
  idSpecialist: string;
  status: string;
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
    idClient,
    idSpecialist,
    status,
  }: IAttendance) {
    const attendanceExists = await this.attendanceRepository.findOne({
      schedulingDate,
      serviceTime,
      serviceDate,
      idClient,
      idSpecialist,
    });

    if (attendanceExists) {
      return attendanceExists;
    }

    const attendance = this.attendanceRepository.create({
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
      idClient,
      idSpecialist,
      status,
    });

    await this.attendanceRepository.save(attendance);

    return attendance;
  }

  async listAll() {
    const attendances = await this.attendanceRepository.find();
    return attendances;
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
    idClient,
    idSpecialist,
    status,
  }: IAttendance) {
    const attendance = await this.attendanceRepository.findOne({
      id,
    });

    if (!attendance) {
      throw new Error('ERROR: Attendance not found!');
    }

    attendance.schedulingDate = schedulingDate;
    attendance.serviceTime = serviceTime;
    attendance.serviceDate = serviceDate;
    attendance.value = value;
    attendance.idClient = idClient;
    attendance.idSpecialist = idSpecialist;
    attendance.status = status;

    await this.attendanceRepository.save(attendance);

    const attendanceNow = await this.attendanceRepository.findOne({
      id,
    });

    return attendanceNow;
  }

  async updateStatus(id: string, status: string) {
    const attendance = await this.attendanceRepository.findOne({
      id,
    });

    if (!attendance) {
      throw new Error('Attendance not found!');
    }

    if (status === null || status === ' ' || status === undefined) {
      throw new Error('The Status is mandatory!');
    }

    attendance.status = status;

    await this.attendanceRepository.save(attendance);

    const attendanceNow = await this.attendanceRepository.findOne({
      id,
    });

    return attendanceNow;
  }

  async delete(id: string) {
    const attendance = await this.attendanceRepository.findOne({
      id,
    });

    if (!attendance) {
      throw new Error('Attendance not found!');
    }

    this.attendanceRepository.delete({ id });

    return attendance;
  }
}

export { AttendancesService };
