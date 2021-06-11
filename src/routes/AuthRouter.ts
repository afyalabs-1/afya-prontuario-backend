import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const AuthRouter = Router();
const authController = new AuthController();

AuthRouter.post('/login', authController.authenticate);
// AuthRouter.post('/logout', authController.finishSession);

export { AuthRouter };
