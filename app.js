import express from 'express';
import cors from 'cors';
import mainRoutes from './routes/mainRoutes.js';
import connectDB from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/partner-portal", mainRoutes);

export default (req, res) => {
  app(req, res);
};
