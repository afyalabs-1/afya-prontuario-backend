import { Request, Response } from 'express';
import { AttendancesService } from '../services/AttendancesService';

/* interface IAttendance {
  schedulingDate: Date;
  serviceDate: Date;
  serviceTime: Date;
  value: string;
  id: string;
}
*/
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

  async listAll(request: Request, response: Response): Promise<Response> {
    const attendancesService = new AttendancesService();

    const attendances = await attendancesService.listAll();

    return response.json(attendances);
  }
}

export { AttendanceController };
