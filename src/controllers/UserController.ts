import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { role, userName, password, name } = request.body;

    const userService = new UserService();

    const user = await userService.create({
      role,
      userName,
      password,
      name,
    });

    if (user) {
      return response.status(201).json(user);
    } else {
      return response
        .status(404)
        .json({ message: 'ERROR when create a User!' });
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    const userName = (request.query as any).userName;
    const userService = new UserService();
    const user = await userService.list(userName);
    return response.json(user);
  }
}

export { UserController };
