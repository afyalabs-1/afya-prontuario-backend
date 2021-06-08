import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { router } from './routes';
import { AppError } from './error/AppError';

const app = express();

// app.use(cors({
//   origin: ['URL PROD']
// }));
app.use(cors());
app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      console.log(
        '>',
        err.log,
        'status code:',
        err.statusCode,
        'message:',
        err.message,
      );
      return response.status(err.statusCode).json({ message: err.message });
    }

    console.log('>', err.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  },
);

export default app;
