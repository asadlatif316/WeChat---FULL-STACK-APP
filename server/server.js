import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
