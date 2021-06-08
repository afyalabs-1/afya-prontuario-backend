import { Router } from 'express';
import { AttendanceController } from '../controllers/AttendanceController';

const attendanceRouter = Router();

const attendanceController = new AttendanceController();

attendanceRouter.post('/', attendanceController.create);

attendanceRouter.get('/', attendanceController.listAll);
attendanceRouter.get('/scheduling/', attendanceController.listScheduling);
attendanceRouter.get('/service/', attendanceController.listService);
attendanceRouter.get('/client/', attendanceController.listClient);
attendanceRouter.get('/specialist/', attendanceController.listSpecialist);
attendanceRouter.get('/status/', attendanceController.listStatus);
attendanceRouter.get('/:id', attendanceController.listId);

attendanceRouter.put('/:id', attendanceController.update);
attendanceRouter.put('/', attendanceController.updateStatus);

attendanceRouter.delete('/:id', attendanceController.delete);

export { attendanceRouter };
