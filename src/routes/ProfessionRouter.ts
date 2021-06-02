import { Request, Response, Router } from 'express';
import { ProfessionController } from '../controllers/ProfessionController';

const professionRouter = Router();
const professionController = new ProfessionController();

professionRouter.get('/', async (request, response) => {
    try {
        const profession = (request.query as any).name;
        const professionList = await professionController.list(profession);
        return response.status(200).json(professionList);
    } catch (err) {
        console.log('err.message:>> ', err.message);
    }
});

professionRouter.post('/', async (request: Request, response: Response) => {
    try {
        const name = (request.query as any).name;
        const professions = await professionController.create(name);
        return response.status(200).json(professions);
    } catch (err) {
        console.log('err.message:>> ', err.message);
    }
});

professionRouter.post('/delete', async (request: Request, response: Response) => {
    try {
        const id = (request.query as any).id; 
        const deletedProfession = await professionController.delete(id, response);
        return response.status(200).json(deletedProfession)
    } catch (err) {
        console.log('err.message:>> ', err);
    }
});

export { professionRouter };