import { Router } from 'express';
import { ProfessionController } from '../controllers/ProfessionController';
import authMiddleware from '../middlewares/AuthMiddleware';

const professionRouter = Router();
const professionController = new ProfessionController();

professionRouter.use(authMiddleware);

professionRouter.get('/', professionController.listAll);
professionRouter.post('/', professionController.create);
professionRouter.post('/update', professionController.update);
professionRouter.post('/delete', professionController.delete);

export { professionRouter };