import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './types/express' 
import dotenv  from 'dotenv';
import router from './routes';

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api',router)

app.get('/', (req:Request, res:Response) => {
  res.send('Sustainability Idea Hub API is running 🚀');
});

export default app