import { Router } from 'express';
import { AddressController } from '../controllers/AddressController';

const AddressRouter = Router();
const addressController = new AddressController();

AddressRouter.post('/', addressController.create);
AddressRouter.get('/', addressController.list);
AddressRouter.put('/:id', addressController.update);
AddressRouter.delete('/:id', addressController.delete);

export { AddressRouter };
