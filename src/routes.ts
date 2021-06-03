import { Router } from 'express';

import { AddressRouter } from './routes/AddressRouter';
import { ClientRouter } from './routes/ClientRouter';
import { attendanceRouter } from './routes/AttendanceRouter';
import { professionRouter } from './routes/ProfessionRouter';
import { specialistRouter } from './routes/SpecialistRouter';

const router = Router();

router.get('/', (request, response) => {
  return response.json({ message: 'Afya Challenge - Team 1' });
});

<<<<<<< HEAD
router.use('/attendances', attendanceRouter);
=======
router.use('/clients', ClientRouter);
router.use('/address', AddressRouter);
router.use('./attendances', attendanceRouter);
router.use('/professions', professionRouter);
router.use('/specialists', specialistRouter);
>>>>>>> origin/development

export { router };
