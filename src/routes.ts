import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

import { AddressRouter } from './routes/AddressRouter';
import { ClientRouter } from './routes/ClientRouter';
import { attendanceRouter } from './routes/AttendanceRouter';
import { professionRouter } from './routes/ProfessionRouter';
import { specialistRouter } from './routes/SpecialistRouter';
import { AuthRouter } from './routes/AuthRouter';
import { UserRouter } from './routes/UserRouter';
import { medicalRecordDetailRouter } from './routes/MedicalRecordDetailRouter';

const router = Router();

router.get('/', (request, response) => {
  return response.json({
    message: `Afya Challenge - Team 1 - Port - ${process.env.API_PORT}`,
  });
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/attendances', attendanceRouter);
router.use('/clients', ClientRouter);
router.use('/address', AddressRouter);
router.use('/professions', professionRouter);
router.use('/specialists', specialistRouter);
router.use('/medicalrecord', medicalRecordDetailRouter);

export { router };
