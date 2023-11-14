import express, {urlencoded} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from './routes/user/userRoute.js';
import { authRouter } from './routes/auth/authRoute.js';
import { carRouter } from './routes/car/carRoute.js';
import { serviceRouter } from './routes/service/serviceRoute.js';
import { openHoursRouter } from './routes/open_hours/openHoursRoute.js';
import { testimonialRouter } from './routes/testimonial/testimonialRouter.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://inventoryapp.vercel.app"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));

app.use('/api/users', authRouter);
app.use('/api/users', userRouter);
app.use('/api/cars', carRouter);
app.use('/api/services', serviceRouter);
app.use('/api/open-hours', openHoursRouter);
app.use('/api/testimonials', testimonialRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.HOST, () => {
    console.log(`app listening at http://localhost:${process.env.HOST}`);
});