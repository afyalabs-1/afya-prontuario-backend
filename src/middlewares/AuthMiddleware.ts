// import { NextFunction, Response } from 'express';
// import jwt from 'jsonwebtoken';

// export default function authMiddleware(
//   request: Request,
//   response: Response,
//   next: NextFunction,
// ) {
//   const { authotization } = request.headers;

//   if (!authotization) {
//     return response.status(401);
//   }

//   const token = authotization.replace('Bearer', '').trim();

//   try {
//     const data = jwt.verify(token, 'secret');
//     console.log('🚀 ~ file: AuthMiddleware.ts ~ line 19 ~ data', data);
//   } catch {
//     return response.status(401);
//   }
// }
