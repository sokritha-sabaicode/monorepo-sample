import { globalErrorHandler } from '@/src/middlewares/global-error';
import loggerMiddleware from '@/src/middlewares/logger-middleware';
import { RegisterRoutes } from '@/src/routes/v1/routes';
import express from 'express';
import fs from 'fs';
import path from 'path'
import swaggerUi from "swagger-ui-express";


// Dynamically load swagger.json & Initialize Sentry
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));


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

// ========================
// API Documentations
// ========================
app.use("/jobs-api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// ================================
// Global Error Handler
// ================================
app.use(globalErrorHandler);

export default app;