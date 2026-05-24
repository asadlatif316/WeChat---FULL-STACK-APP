//libraries
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
const __dirname = dirname(fileURLToPath(import.meta.url));

//other imports
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import conversationRouter from './routes/conversationRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import connectDB from './DB/connect.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import protectUser from './middlewares/authMiddleware.js';
import protectLimit from './middlewares/arcJetMiddlware.js';
import { app, server } from './lib/socket.js';

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/v1/auth', protectLimit, authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/conversations', conversationRouter);
app.use('/api/v1/message', messageRouter);

// //to ready for development
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')));
  app.get('*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'dist', 'index.html'));
  });
}
// error handler
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')));
  app.get('*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 4200;

let MONGO_URL;

if (process.env.NODE_ENV === 'production') {
  MONGO_URL = process.env.MONGO_URL_PRO;
} else {
  MONGO_URL = process.env.MONGO_URL_DEV;
}

const startApp = async () => {
  try {
    await connectDB(MONGO_URL);
    server.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

startApp();
