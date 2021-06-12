import { Router } from 'express';
import { SpecialistController } from '../controllers/SpecialistController';
import authMiddleware from '../middlewares/AuthMiddleware';

const specialistRouter = Router();
const specialistController = new SpecialistController();

specialistRouter.use(authMiddleware);

specialistRouter.get('/', specialistController.listAll);
specialistRouter.post('/', specialistController.create);
specialistRouter.put('/', specialistController.update);
specialistRouter.delete('/', specialistController.delete);

export { specialistRouter };