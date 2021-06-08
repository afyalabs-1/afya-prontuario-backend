import { Router } from 'express';

import { AddressRouter } from './routes/AddressRouter';
import { ClientRouter } from './routes/ClientRouter';
import { attendanceRouter } from './routes/AttendanceRouter';
import { professionRouter } from './routes/ProfessionRouter';
// import { specialistRouter } from './routes/SpecialistRouter';
// import { AuthRouter } from './routes/AuthRouter';
import { UserRouter } from './routes/UserRouter';

const router = Router();

router.get('/', (request, response) => {
  return response.json({
    message: `Afya Challenge - Team 1 - Port - ${process.env.API_PORT}`,
  });
});

// router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/attendances', attendanceRouter);
router.use('/clients', ClientRouter);
router.use('/address', AddressRouter);
router.use('/professions', professionRouter);
// router.use('/specialists', specialistRouter);

export { router };
