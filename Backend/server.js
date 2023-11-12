import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.HOST, () => {
    console.log(`app listening at http://localhost:${process.env.HOST}`);
});