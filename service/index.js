import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

import userRoutes from './routes/user.js';
import itemRoutes from './routes/item.js';
import newRoutes from './routes/new.js';
import postRoutes from './routes/post.js';
import replyRoutes from './routes/reply.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const mongodbSecret = defineSecret("MONGODB");
const secretKey = defineSecret("SECRETKEY");

// Управление на MongoDB връзката за Serverless среда
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Свързване с базата данни преди обработка на заявка
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/news', newRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/replies', replyRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message
  });
});

// Експортиране на функцията за Firebase Cloud Functions
export const api = onRequest(
  { secrets: [mongodbSecret, secretKey] },
  app
);
