import { Request, Response, Router } from 'express';
//import { ProfessionController } from '../controllers/ProfessionController'

const professionRouter = Router();
//const professionController = new ProfessionController();

professionRouter.get('/', async (request: Request, response: Response) => {
    try { 
         return response.json({ message: 'Afya Challenge - Profession routes' });
        const profession = (request.query as any).profession;
        const professionList = await professionController.list(profession, response);
        return response.status(200).json(professionList);
    } catch (err) {
        console.log('err.message:>> ', err.message);
    }
})

export { professionRouter };