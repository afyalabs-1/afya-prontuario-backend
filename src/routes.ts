import { Router } from 'express';
import { attendanceRouter } from './routes/AttendanceRouter';
import { professionRouter } from './routes/ProfessionRouter';
import { specialistRouter } from './routes/SpecialistRouter';

const router = Router();

router.get('/', (request, response) => {
  return response.json({ message: 'Afya Challenge - Team 1' });
});

router.use('/professions', professionRouter);
router.use('/specialists', specialistRouter);
router.use('/attendances', attendanceRouter);

export { router };
