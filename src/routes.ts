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
import { medicalRecordRouter } from './routes/MedicalRecordRouter';

const router = Router();

router.get('/', (request, response) => {
  return response.json({
    message: `Afya Challenge - Team 1 - O Time que a Afya Gama`,
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
router.use('/medicalrecorddetail', medicalRecordDetailRouter);
router.use('/medicalrecord', medicalRecordRouter);

export { router };
