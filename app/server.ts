import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import path from 'path';
import authRoutes from './routers/auth.route';
import lessonRoutes from './routers/lesson.route'

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;


const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error("MONGODB_URI is not defined in the .env file");
}
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/lesson', lessonRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});