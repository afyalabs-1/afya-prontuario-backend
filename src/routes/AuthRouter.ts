import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
// import authMiddleware from '../middlewares/AuthMiddleware';

const AuthRouter = Router();
const authController = new AuthController();

AuthRouter.post('/login', authController.authenticate);
// AuthRouter.get('/login', authMiddleware.index);
// AuthRouter.post('/logout', authController.endSession);

export { AuthRouter };
