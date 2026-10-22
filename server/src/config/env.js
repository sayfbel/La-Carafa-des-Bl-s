import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.NODE_ENV === 'test' ? (process.env.DB_TEST_NAME || 'la_carafa_test') : (process.env.DB_NAME || 'la_carafa_db'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  },
  session: {
    secret: process.env.SESSION_SECRET || 'dev-secret-la-carafa-2026',
    cookieSecure: process.env.COOKIE_SECURE === 'true'
  },
  logLevel: process.env.LOG_LEVEL || 'info',
  upload: {
    directory: process.env.UPLOAD_DIRECTORY || './uploads',
    maxSizeMb: Number(process.env.MAX_UPLOAD_SIZE_MB) || 5
  }
};
