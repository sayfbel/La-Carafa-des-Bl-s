import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { config } from './config/env.js';
import { logger } from './utils/logger.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';
import { checkConnection } from './database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false // Disabled in dev for local Vite proxy
}));

// CORS Configuration
app.use(cors({
  origin: config.clientOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body & Cookie Parsers
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cookieParser());

// Static Uploads & Public Assets (Stored in server/uploads)
const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Request Logger (Development & Debug)
if (config.env !== 'test') {
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// Mount API Routes
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Error Handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start Server (only if not imported by test runner)
if (process.env.NODE_ENV !== 'test') {
  const PORT = config.port;
  app.listen(PORT, async () => {
    logger.info(`La Carafa des Blés server running on port ${PORT} [${config.env}]`);
    const dbOk = await checkConnection();
    if (dbOk) {
      logger.info(`MySQL database [${config.db.name}] successfully connected.`);
    } else {
      logger.warn(`Warning: Could not connect to MySQL database [${config.db.name}]. Ensure MySQL is running.`);
    }
  });
}
