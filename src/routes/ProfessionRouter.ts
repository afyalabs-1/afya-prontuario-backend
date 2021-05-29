import { Request, Response, Router } from 'express';
import { ProfessionController } from '../controllers/ProfessionController';
import { AppError } from '../error/AppError';

const professionRouter = Router();
const professionController = new ProfessionController();

professionRouter.get('/', professionController.listAll);
professionRouter.post('/', professionController.create);
professionRouter.post('/delete', professionController.delete);

export { professionRouter };