import express from 'express';
import { globalErrorHandler } from '@/src/middlewares/global-error';
import applyProxy from '@/src/middlewares/proxy';
import cookieParser from 'cookie-parser';
import { authenticateToken, authorizeRole, routeConfigMiddleware } from '@/src/middlewares/auth';
import cors from 'cors';
import corsOptions from '@/src/middlewares/cors';


// ========================
// Initialize App Express
// ========================
const app = express();


// ========================
// Security Middleware
// ========================
app.use(cors(corsOptions));
app.use(cookieParser())


// ========================
// Auth Middleware
// ========================
app.use(routeConfigMiddleware);
app.use(authenticateToken);
app.use(authorizeRole)


// =======================
// Proxy Routes
// =======================
applyProxy(app);


// ========================
// ERROR Handler
// ========================
app.use(globalErrorHandler)

export default app;