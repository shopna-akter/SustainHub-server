/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api',router)
app.use(globalErrorHandler)

// eslint-disable-next-line no-unused-vars
app.get('/', (req:Request, res:Response) => {
  res.send('Sustainability Idea Hub API is running 🚀');
});

export default app