import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('Sustainability Idea Hub API is running 🚀');
});
export default app;
