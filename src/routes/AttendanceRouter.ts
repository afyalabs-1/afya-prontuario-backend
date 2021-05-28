import { response, Router } from 'express';
import { AttendanceController } from '../controllers/AttendanceController';

const attendanceRouter = Router();

const attendanceController = new AttendanceController();

attendanceRouter.post('/', attendanceController.create);

const get = async (req, res) => {
  res.json({ mensagem: 'OK!' });
};

attendanceRouter.get('/', get);

export { attendanceRouter };
