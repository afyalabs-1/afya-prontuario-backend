import { Request, Response, Router } from 'express';
import { ProfessionController } from '../controllers/ProfessionController'
import { ProfessionRepository } from '../repositories/ProfessionRepository';

const professionRouter = Router();
const professionController = new ProfessionController();


professionRouter.get('/profession-list', async (request: Request, response: Response) => {
    try {
        const profession = (request.query as any).profession;
        const professionList = await professionController.list(profession);
        return response.status(200).json(professionList);
    } catch (err) {
        console.log('err.message:>> ', err.message);
    }
})
