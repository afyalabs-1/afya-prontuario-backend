import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import authMiddleware from '../middlewares/AuthMiddleware';

const AuthRouter = Router();
const authController = new AuthController();

AuthRouter.post('/login', authController.authenticate);

export { AuthRouter };
