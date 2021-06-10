import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const UserRouter = Router();
const userController = new UserController();

UserRouter.post('/', userController.create);
UserRouter.get('/', userController.list);

export { UserRouter };
