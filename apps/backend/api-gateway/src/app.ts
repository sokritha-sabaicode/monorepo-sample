import express, { Request, Response } from 'express';
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
console.log('corsOptions:::', corsOptions)
app.use(cors(corsOptions));
app.use(cookieParser())

// ========================
// Gateway Health
// ========================
app.get('/gateway-health', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'OK'
  })
})


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