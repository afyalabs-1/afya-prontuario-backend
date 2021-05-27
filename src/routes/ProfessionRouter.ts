import { Request, Response, Router } from 'express';
import { ProfessionController } from '../controllers/ProfessionController'

const professionRouter = Router();
const professionController = new ProfessionController();

professionRouter.get('/:id?', async (request: Request, response: Response) => {
    try {
        const professions = await professionController.list(request, response);
        return response.status(200).json(professions);
    } catch (err) {
        console.log('err.message:>> ', err.message);
    }
});

professionRouter.get('/')

export { professionRouter };