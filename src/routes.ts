import { Router } from 'express';
import { AddressRouter } from './routes/AddressRouter';
import { ClientRouter } from './routes/ClientRouter';

const router = Router();

router.get('/', (request, response) => {
  return response.json({ message: 'Afya Challenge - Team 1' });
});
router.use('/clients', ClientRouter);
router.use('/address', AddressRouter);

export { router };
