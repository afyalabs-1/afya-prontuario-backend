import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';

const ClientRouter = Router();

const clientController = new ClientController();

ClientRouter.post('/', clientController.create);
ClientRouter.get('/', clientController.list);
ClientRouter.put('/:id', clientController.update);
ClientRouter.delete('/:id', clientController.delete);

export { ClientRouter };
