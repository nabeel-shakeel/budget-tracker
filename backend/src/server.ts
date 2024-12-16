import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from './config/db';
import {
  authRouter,
  expenseRouter,
  adminRouter,
  profileRouter,
} from './routes';

// Load environment variables
dotenv.config();

const app = express();

// express middlewares
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/admin', adminRouter);
app.use('/api/profile', profileRouter);

app.get('/health', (_, res) => {
  res.status(200).send('OK');
});

// global error handler
app.use((err: Error, _req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    mongoose.connection.close();
    process.exit(0);
  });
});

export default app;
