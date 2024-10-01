import '@/src/utils/sentry'

import express from 'express';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '@/src/routes/v1/routes';
import fs from 'fs';
import path from 'path'
import { globalErrorHandler } from '@/src/middewares/global-error';
import cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';

// Dynamically load swagger.json & Initialize Sentry
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));

// ========================
// Initialize App Express
// ========================
const app = express();

// ========================
// Security Middleware
// ========================
app.use(cookieParser())

// ========================
// Global Middleware
// ========================
app.use(express.json())


// ========================
// Global API V1
// ========================
RegisterRoutes(app)

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================
Sentry.setupExpressErrorHandler(app);
app.use(globalErrorHandler)

export default app;