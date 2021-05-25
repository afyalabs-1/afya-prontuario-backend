import { Router } from 'express';
import { addressRouter } from './routes/addres.Router';
import { clientRouter } from './routes/clientsRouter';

const router = Router();

router.get('/', (request, response) => {
  return response.json({ message: 'Afya Challenge - Team 1' });
});
router.use('/clients', clientRouter);
router.use('/address', addressRouter);

export { router };
