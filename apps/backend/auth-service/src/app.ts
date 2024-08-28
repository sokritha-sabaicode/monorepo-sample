import express from 'express';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '@/src/routes/v1/routes';
import fs from 'fs';
import path from 'path'
import { globalErrorHandler } from '@/src/middlewares/global-error';
import cookieParser from 'cookie-parser';

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));

// ========================
// Initialize App Express
// ========================
const app = express();


// =======================
// Security Middlewares
// =======================
app.use(cookieParser())


// ========================
// Commons Middleware
// ========================
app.use(express.json());


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
app.use(globalErrorHandler)

export default app;