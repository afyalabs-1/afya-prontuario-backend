import { Request, Response } from 'express';
import { AttendancesService } from '../services/AttendancesService';

class AttendanceController {
  async create(request: Request, response: Response): Promise<Response> {
    const { schedulingDate, serviceDate, serviceTime, value } = request.body;

    const attendancesService = new AttendancesService();

    const attendance = await attendancesService.create({
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
    });

    if (attendance) {
      return response.status(201).json(attendance);
    } else {
      return response
        .status(404)
        .json({ messagem: 'ERROR when registering Attendance!' });
    }
  }
}

export { AttendanceController };
