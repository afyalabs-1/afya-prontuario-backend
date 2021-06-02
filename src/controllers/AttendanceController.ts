import { Request, Response } from 'express';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import { AttendancesService } from '../services/AttendancesService';

class AttendanceController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
      idClient,
      idSpecialist,
      status,
    } = request.body;

    // Checando se a data de agendamento é menor que a data atual
    const hourStart = startOfHour(parseISO(serviceDate));
    if (isBefore(hourStart, new Date())) {
      return response.status(400).json({ error: 'Date are not permitted' });
    }

    const attendancesService = new AttendancesService();

    const attendance = await attendancesService.create({
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
      idClient,
      idSpecialist,
      status,
    });

    if (attendance) {
      return response.status(201).json(attendance);
    } else {
      return response
        .status(401)
        .json({ messagem: 'ERROR when registering Attendance!' });
    }
  }

  async listAll(request: Request, response: Response): Promise<Response> {
    const { schedulingDate, serviceDate, idClient, idSpecialist, status } =
      request.body;

    const attendancesService = new AttendancesService();

    const attendances = await attendancesService.listAll({
      schedulingDate,
      serviceDate,
      idClient,
      idSpecialist,
      status,
    });

    return response.json(attendances);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
      idClient,
      idSpecialist,
      status,
    } = request.body;

    // Checando se a data de agendamento é menor que a data atual
    const hourStart = startOfHour(parseISO(serviceDate));
    if (isBefore(hourStart, new Date())) {
      return response.status(400).json({ error: 'Date are not permitted' });
    }

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.update({
        id,
        schedulingDate,
        serviceDate,
        serviceTime,
        value,
        idClient,
        idSpecialist,
        status,
      });

      if (attendance) {
        return response.status(200).json(attendance);
      } else {
        return response.status(404).json({
          message: 'ERROR when updating Attendance!',
        });
      }
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async updateStatus(request: Request, response: Response): Promise<Response> {
    const { id, status } = request.body;

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.updateStatus(id, status);

      return response.json(attendance);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async listId(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.listId(id);

      return response.json(attendance);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.delete(id);

      return response.json(attendance);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { AttendanceController };
