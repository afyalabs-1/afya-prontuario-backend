import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

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
}

export { AuthController };
