import { Router } from 'express';
import { ProfessionController } from '../controllers/ProfessionController';

const professionRouter = Router();
const professionController = new ProfessionController();

professionRouter.get('/', professionController.listAll);
professionRouter.post('/', professionController.create);
professionRouter.post('/update', professionController.update);
professionRouter.post('/delete', professionController.delete);

export { professionRouter };