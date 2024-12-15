import express from 'express';
import cors from 'cors';
import mainRoutes from './routes/mainRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

connectDB();

server.use("/api/partner-portal", mainRoutes);

export default server;
