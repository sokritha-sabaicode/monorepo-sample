import { globalErrorHandler } from '@/src/middlewares/global-error';
import loggerMiddleware from '@/src/middlewares/logger-middleware';
import { RegisterRoutes } from '@/src/routes/v1/routes';
import express from 'express';

const app = express()

// ================================
// Security Middleware
// ================================

// ================================
// Global Middleware
// ================================
app.use(express.json());
app.use(loggerMiddleware);


// ================================
// Global Routes
// ================================
RegisterRoutes(app);

// ================================
// Global Error Handler
// ================================
app.use(globalErrorHandler);

export default app;