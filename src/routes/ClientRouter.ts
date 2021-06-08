import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';
import authMiddleware from '../middlewares/AuthMiddleware';

const ClientRouter = Router();
const clientController = new ClientController();

ClientRouter.use(authMiddleware);

ClientRouter.post('/', clientController.create);
ClientRouter.get('/', clientController.list);
ClientRouter.put('/:id', clientController.update);
ClientRouter.delete('/:id', clientController.delete);

export { ClientRouter };
