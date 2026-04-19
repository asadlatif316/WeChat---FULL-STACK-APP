//libraries
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { body, validationResult } from 'express-validator';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

//other imports
import authRouter from './routes/authRoutes.js';
import connectDB from './DB/connect.js';
import { StatusCodes } from 'http-status-codes';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(errorHandlerMiddleware);
//routes
app.use('/api/v1/auth', authRouter);

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

app.post(
  '/api/v1/test',
  [body('name').notEmpty().withMessage('name is required')],
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const errorMessage = error.array().map((error) => error.msg);
      return res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
    }
    next();
  },
  (req, res) => {
    const { name } = req.body;
    res.json({ msg: `hello ${name}` });
  },
);
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
