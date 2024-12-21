import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();


//Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/', router);

app.use(globalErrorHandler);
app.use(notFound);




export default app;
