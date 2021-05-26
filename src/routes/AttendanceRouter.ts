import { Request, Response, Router } from 'express';
import { AttendanceController } from '../controllers/AttendanceController';

const attendanceRouter = Router();
const attendanceController = new AttendanceController();

attendanceRouter.post('/', async (request: Request, response: Response) => {
  try {
    const attendance = await attendanceController.create(request, response);
    return response.status(201).json(attendance);
  } catch (err) {
    console.log('err.message:>> ', err.message);
  }
});
/*
attendanceRouter.get('/', async (request, response) => {
  try {
    const client = (request.query as any).name;
    const clientsList = await attendanceController.list(client);
    return response.status(200).json(clientsList);
  } catch (err) {
    console.log('err.message:>> ', err.message);
  }
});
*/
export { attendanceRouter };
