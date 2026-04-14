//libraries
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
const app = express();
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname);


//other imports
import authRouter from './routes/authRoutes.js'


//routes
app.use('/api/v1/auth',authRouter)



// //to ready for development
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')))
  app.get('*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../client','dist','index.html'))
  })
}


app.get('/', (req, res) => {
  res.send('working on backend');
});
const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
