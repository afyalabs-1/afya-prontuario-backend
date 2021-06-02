import { Request, Response, Router } from 'express';
import { SpecialistController } from '../controllers/SpecialistController'

const specialistRouter = Router();
const specialistController = new SpecialistController();

specialistRouter.get('/', async (request: Request, response: Response) => {
    try {
        const specialist = (request.query as any).name;
        const specialistList = await specialistController.list(specialist);
        return response.status(200).json(specialistList);
    } catch (err) {
        console.log('err.message:>> ', err.message);
    }
});

specialistRouter.post('/', async (request: Request, response: Response) => {
    try {
        const createSpecialist = await specialistController.create(request, response);
        return response.status(200).json(createSpecialist);
    } catch (err) {
        console.log('err.message:>> ', err.message);
    }
});

export { specialistRouter };