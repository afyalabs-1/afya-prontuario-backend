import { Request, Response, Router } from 'express';
import { ClientsController } from '../controllers/ClientsController';

const clientRouter = Router();
const clientController = new ClientsController();

clientRouter.post('/', async (request: Request, response: Response) => {
  try {
    const addClient = await clientController.create(request, response);
    return response.status(201).json(addClient);
  } catch (err) {
    console.log('err.message:>> ', err.message);
  }
});

export { clientRouter };
