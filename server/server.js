import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
const app = express();
import authRouter from './routes/authRoutes.js'
app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/v1/auth',authRouter)

const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
