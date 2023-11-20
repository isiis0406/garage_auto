import express, {urlencoded} from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from './routes/user/userRoute.js';
import { authRouter } from './routes/auth/authRoute.js';
import { carRouter } from './routes/car/carRoute.js';
import { serviceRouter } from './routes/service/serviceRoute.js';
import { openHoursRouter } from './routes/open_hours/openHoursRoute.js';
import { testimonialRouter } from './routes/testimonial/testimonialRouter.js';
import { messageRouter } from './routes/message/messageRouter.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", process.env.FRONTEND_URL],
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
app.use('/api/messages', messageRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.HOST, () => {
    console.log(`app listening at http://localhost:${process.env.HOST}`);
});