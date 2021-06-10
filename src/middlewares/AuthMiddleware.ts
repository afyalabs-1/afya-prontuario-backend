import { NextFunction, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import authConfig from '../config/auth';
import { AppError } from '../error/AppError';

// interface ITokenPayload {
//   iat: number;
//   exp: number;
//   sub: string;
// }

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      401,
      'Wrong password or user name',
      'Error > AuthMiddleware > Authenticate > missing authorization',
    );
  }

  const [, token] = authHeader.split(' ');

  try {
    const data = jwt.verify(token, authConfig.jwt.secret as Secret);

    // const { sub } = data as ITokenPayload;

    // request.user = {
    //   id: sub,
    // };

    return next();
  } catch {
    throw new AppError(
      401,
      'Wrong password or user name',
      'Error > AuthMiddleware > Authenticate > Invalid JWT Token',
    );
  }
}
