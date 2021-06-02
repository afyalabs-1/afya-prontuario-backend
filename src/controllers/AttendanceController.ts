import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AttendanceRepository } from '../repositories/AttendancesRepository';

class AttendanceController {
  async create(request: Request, response: Response) {
    const { schedulingDate, serviceDate, serviceTime, value } = request.body;

    const attendanceRepository = getCustomRepository(AttendanceRepository);

    const attendance = attendanceRepository.create({
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
    });
    return await attendanceRepository.save(attendance);
  }

  async list(request: Request, response: Response) {
    const attendanceRepository = getCustomRepository(AttendanceRepository);
    const attendances = await attendanceRepository.find();

    return attendances;
  }
}

export { AttendanceController };
