/**
 * Importing the npm packages.
 */
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import debug from 'debug';

/**
 * Importing the environmental variables from file.
 */
dotenv.config({ debug: true });

/**
 * Importing user defined modules.
 */
import routes from './routes/index.route';

/**
 * Setting up the contant variables.
 */
const app = express();
const port: number = Number(process.env.PORT) || 8080;
const db: string = process.env.DB || 'mongodb://localhost/shadow-blog';
const logger: debug.Debugger = debug('server');
const mongoOption: mongoose.ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };

/**
 * Setting up the listeners and connections.
 */
mongoose.connect(db, mongoOption);
app.listen(port, () => logger(`server listening in port ${port}`));
mongoose.connection.on('connected', () => logger(`DB connected to ${db}`));
mongoose.connection.on('error', (err: mongoose.Error) => logger(err));

/**
 * Setting up the middlewares.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Setting up the routes.
 */
app.use('/', routes);
