import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables if not already loaded
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const isTest = process.env.NODE_ENV === 'test';
const dbName = isTest ? (process.env.DB_TEST_NAME || 'la_carafa_test') : (process.env.DB_NAME || 'la_carafa_db');

const isRemoteDb = process.env.DB_SSL === 'true' || 
  (process.env.DB_HOST && !process.env.DB_HOST.includes('127.0.0.1') && !process.env.DB_HOST.includes('localhost'));

export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: dbName,
  ssl: isRemoteDb ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  timezone: '+00:00'
});

export async function query(sql, params = []) {
  const [results] = await pool.execute(sql, params);
  return results;
}

export async function getClient() {
  return await pool.getConnection();
}

export async function checkConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 as is_alive');
    return rows[0]?.is_alive === 1;
  } catch (error) {
    console.error('Database connection check failed:', error.message);
    return false;
  }
}
