import { Router } from 'express';
import { ProfessionController } from '../controllers/ProfessionController'

const router = Router();

router.get('/read-profissao', ProfessionController.read);
router.get('/create-profissao', ProfessionController.create);
router.get('/update-profissao', ProfessionController.update);
router.get('/delete-profissao', ProfessionController.delete);

export { router };

