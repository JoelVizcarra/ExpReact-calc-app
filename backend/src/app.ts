require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { AppDataSource } from './utils/data-source';
import AppError from './utils/appError';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import operationRouter from './routes/operation.routes';
import recordRouter from './routes/record.routes';
import validateEnv from './utils/validateEnv';
import swaggerUi from 'swagger-ui-express';

AppDataSource.initialize()
  .then(async () => {
    validateEnv();

    const app = express();

    app.use(express.json({ limit: '10kb' }));
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
    app.use(express.static('public'));
    app.use(cookieParser());

    app.use(
      cors({
        origin: config.get<string>('origin'),
        credentials: true,
      })
    );

    app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.yaml',
        },
      })
    );

    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/operations', operationRouter);
    app.use('/api/v1/records', recordRouter);

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || 'error';
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    const port = config.get<number>('port');
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
