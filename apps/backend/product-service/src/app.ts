import loggerMiddleware from '@/src/middlewares/logger-middleware';
import { RegisterRoutes } from '@/src/routes/v1/routes';
import express from 'express';

const app = express()

// Global Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Routes
RegisterRoutes(app);

export default app;