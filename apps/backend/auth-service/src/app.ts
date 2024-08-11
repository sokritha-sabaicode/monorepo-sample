import express from 'express';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '@/src/routes/v1/routes';
import fs from 'fs';
import path from 'path'
import { globalErrorHandler } from '@/src/middlewares/global-error';

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));

// ========================
// Initialize App Express
// ========================

const app = express();


// =======================
// Security Middlewares
// =======================
app.set("trust proxy", 1);


// ========================
// Global Middleware
// ========================
app.use(express.json({ limit: '50mb' }));



app.use((req, _res, next) => {
  console.log('Parsed body:', req.body);
  next();
});


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