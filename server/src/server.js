//libraries
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

//other imports
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import conversationRouter from './routes/conversationRoutes.js';
import connectDB from './DB/connect.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import protectUser from './middlewares/authMiddleware.js';
import protectLimit from './middlewares/arcJetMiddlware.js';
//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/v1/auth', protectLimit, authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/conversations', conversationRouter);

// //to ready for development
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')));
  app.get('*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.send('working on backend');
});

app.get('/api/v1/test', protectLimit, (req, res) => {
  res.json('working');
});

// error handler
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4200;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startApp();
