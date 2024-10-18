import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import userRoutes from './routes/user.js';
import itemRoutes from './routes/item.js';
import newRoutes from './routes/new.js';
import postRoutes from './routes/post.js';
import replyRoutes from './routes/reply.js';
import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log("Connected to MongoDB")
        }).catch(err => { throw err })
}

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/news', newRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/replies', replyRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(8800, () => {
    connect();
    console.log("Connected to Server");
});