import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.route.js";
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user.route.js";
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, //alow frontend to send cookies
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
