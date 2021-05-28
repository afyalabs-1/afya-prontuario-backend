import { Router } from 'express';
import { AttendanceController } from '../controllers/AttendanceController';

const attendanceRouter = Router();

const attendanceController = new AttendanceController();

attendanceRouter.post('/', attendanceController.create);
attendanceRouter.get('/', attendanceController.listAll);

export { attendanceRouter };
