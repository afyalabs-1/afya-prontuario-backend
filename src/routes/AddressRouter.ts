import { Router } from 'express';
import { AddressController } from '../controllers/AddressController';
import authMiddleware from '../middlewares/AuthMiddleware';

const AddressRouter = Router();
const addressController = new AddressController();

AddressRouter.use(authMiddleware);

AddressRouter.post('/', addressController.create);
AddressRouter.get('/', addressController.list);
AddressRouter.put('/:id', addressController.update);
AddressRouter.delete('/:id', addressController.delete);

export { AddressRouter };
