import { Request, Response } from 'express';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import { AttendancesService } from '../services/AttendancesService';

class AttendanceController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      serviceDate,
      serviceTime,
      value,
      client,
      specialists,
      status,
      details,
    } = request.body;

    // Checando se a data de agendamento é menor que a data atual
    const hourStart = startOfHour(parseISO(serviceDate));
    if (isBefore(hourStart, new Date())) {
      return response.status(400).json({ error: 'Date are not permitted' });
    }

    const attendancesService = new AttendancesService();

    const schedulingDate = new Date();

    const attendance = await attendancesService.create({
      schedulingDate,
      serviceDate,
      serviceTime,
      value,
      details,
      status,
      client,
      specialists,
    });

    if (attendance) {
      return response.status(201).json(attendance);
    } else {
      return response
        .status(401)
        .json({ messagem: 'ERROR when registering Attendance!' });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      serviceDate,
      serviceTime,
      value,
      client,
      specialists,
      status,
      details,
    } = request.body;

    // Checando se a data de agendamento é menor que a data atual
    const hourStart = startOfHour(parseISO(serviceDate));
    if (isBefore(hourStart, new Date())) {
      return response.status(400).json({ error: 'Date are not permitted' });
    }

    const attendanceService = new AttendancesService();
    const schedulingDate = new Date();

    try {
      const attendance = await attendanceService.update({
        id,
        schedulingDate,
        serviceDate,
        serviceTime,
        value,
        details,
        client,
        specialists,
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

  async listScheduling(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { schedulingDate } = request.body;

    const newDate = new Date(schedulingDate);

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.listScheduling(newDate);

      return response.json(attendance);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async listService(request: Request, response: Response): Promise<Response> {
    const { serviceDate } = request.body;

    const newDate = new Date(serviceDate);

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.listService(newDate);

      return response.json(attendance);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async listClient(request: Request, response: Response): Promise<Response> {
    const { clientId } = request.body;

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.listClient(clientId);

      return response.json(attendance);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async listSpecialist(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { specialistsId } = request.body;

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.listSpecialist(specialistsId);

      return response.json(attendance);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async listStatus(request: Request, response: Response): Promise<Response> {
    const { status } = request.body;

    const attendanceService = new AttendancesService();

    try {
      const attendance = await attendanceService.listStatus(
        status.toUpperCase(),
      );

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

  async listAll(request: Request, response: Response): Promise<Response> {
    const attendanceService = new AttendancesService();

    const attendance = await attendanceService.listAll();

    return response.json(attendance);
  }
}

export { AttendanceController };
