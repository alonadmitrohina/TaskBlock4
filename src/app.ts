import express from 'express';
import cors from 'cors';
import awardsRouter from './awards/awards.router';
//import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/awards', awardsRouter);
//app.use(errorHandler);

export default app;