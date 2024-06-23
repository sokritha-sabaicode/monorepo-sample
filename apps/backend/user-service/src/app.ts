import express from 'express';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from '@/src/docs/swagger.json'
import { RegisterRoutes } from '@/src/routes/v1/routes';

const app = express();

// ========================
// Global API V1
// ========================
RegisterRoutes(app)

// ========================
// API Documentations
// ========================
app.use("/user-api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;