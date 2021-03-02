import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import expressConfig from './config/server/express';
import { router as moviesRoute } from './routes/movies';
import { router as usersRoute } from './routes/users';
import { router as loginRoute } from './routes/login';
import serverConfig from './config/server/server';
import mongoDbConnection from './config/db/connection';
// middlewares
import errorHandlingMiddleware from './middlewares/errorHandling.middleware';

const app = express();
const server = require('http').createServer(app);

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig(app, mongoose, server, config).startServer();

// DB configuration and connection create
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 10000,
  keepAlive: 120,
  connectTimeoutMS: 1000
}).connectToMongo();

// routes for each endpoint
app.use('/api/v1/movies', moviesRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/login', loginRoute);

// error handling middleware
app.use(errorHandlingMiddleware);

// Expose app
export default app;
