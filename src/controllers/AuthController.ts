import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
// import { EndSessionService } from '../services/EndSessionService';

class AuthController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    const { userName, password } = request.body;
    const authService = new AuthService();
    const session = await authService.authenticate({
      userName,
      password,
    });
    return response.json({ session });
  }

  // async finishSession(request: Request, response: Response): Promise<Response> {
  //   const { id, token, status } = request.body;
  //   const endSessionService = new EndSessionService();
  //   const session = await endSessionService.finishSession({
  //     id,
  //     token,
  //     status,
  //   });
  //   return response.json({ session });
  // }
}

export { AuthController };
