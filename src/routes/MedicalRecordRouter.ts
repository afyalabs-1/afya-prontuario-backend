import { Router } from 'express';
import { MedicalRecordController } from '../controllers/MedicalRecordController';
import authMiddleware from '../middlewares/AuthMiddleware';

const medicalRecordRouter = Router();

const medicalRecordController = new MedicalRecordController();

medicalRecordRouter.use(authMiddleware);

medicalRecordRouter.post('/', medicalRecordController.create);
medicalRecordRouter.delete('/:id', medicalRecordController.delete);
medicalRecordRouter.get('/', medicalRecordController.listMedicalRecord);

export { medicalRecordRouter };
