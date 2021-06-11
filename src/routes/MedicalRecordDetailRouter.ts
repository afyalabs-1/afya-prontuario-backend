import { Router } from 'express';
import { MedicalRecordDetailController } from '../controllers/MedicalRecordDetailController';
import authMiddleware from '../middlewares/AuthMiddleware';

const medicalRecordDetailRouter = Router();

const medicalRecordDetailController = new MedicalRecordDetailController();

medicalRecordDetailRouter.use(authMiddleware);

medicalRecordDetailRouter.post('/', medicalRecordDetailController.create);
medicalRecordDetailRouter.put('/:id', medicalRecordDetailController.update);
medicalRecordDetailRouter.delete('/:id', medicalRecordDetailController.delete);
medicalRecordDetailRouter.get(
  '/',
  medicalRecordDetailController.listMedicalRecord,
);

export { medicalRecordDetailRouter };
