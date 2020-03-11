// Imports
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import usuarioRouter from './routes/usuario.routes';
import loginRouter from './routes/login.routes';
import { handlingErrors } from './errors/error-handler';
import config from './config/app';

// Initializations
const app = express();

// Setting Variable
app.set('port', config.server.PORT);


// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/usuarios', usuarioRouter);
app.use('/login', loginRouter);

// Handler ERROR
app.use(handlingErrors);

// Exports
export default app;
