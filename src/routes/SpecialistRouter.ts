import { Request, Response, Router } from 'express';
import { SpecialistController } from '../controllers/SpecialistController'

const specialistRouter = Router();
const specialistController = new SpecialistController();

specialistRouter.get('/:id?', async (request: Request, response: Response) => {
    try { 
        // return response.json({ message: 'Afya Challenge - Specialist routes' });
        const specialists = await specialistController.list(request, response);
        return response.status(200).json(specialists);
    } catch (err) {
        console.log('err.message:>> ', err.message);
    }
})

export { specialistRouter };