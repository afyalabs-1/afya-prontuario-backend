import { Router } from 'express';
import { attendanceRouter } from './routes/AttendanceRouter';

const router = Router();

router.get('/', (request, response) => {
  return response.json({ message: 'Afya Challenge - Team 1' });
});

router.use('./attendances', attendanceRouter);

export { router };
