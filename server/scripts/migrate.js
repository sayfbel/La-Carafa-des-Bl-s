import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const isTest = process.env.NODE_ENV === 'test';
const targetDb = isTest ? (process.env.DB_TEST_NAME || 'la_carafa_test') : (process.env.DB_NAME || 'la_carafa_db');

console.log(`Starting migrations for database: [${targetDb}]...`);

async function runMigrations() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
    charset: 'utf8mb4'
  });

  try {
    // Ensure database exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${targetDb}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.query(`USE \`${targetDb}\``);

    // Ensure schema_migrations table exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(100) NOT NULL PRIMARY KEY,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Fetch applied migrations
    const [appliedRows] = await connection.query('SELECT version FROM schema_migrations');
    const appliedSet = new Set(appliedRows.map((r) => r.version));

    // Read migrations directory
    const migrationsDir = path.resolve(__dirname, '../migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    let appliedCount = 0;

    for (const file of files) {
      if (!appliedSet.has(file)) {
        console.log(`Applying migration: ${file}...`);
        const filePath = path.join(migrationsDir, file);
        const sqlContent = fs.readFileSync(filePath, 'utf8');

        // Execute migration within transaction if possible
        await connection.beginTransaction();
        try {
          await connection.query(sqlContent);
          await connection.query('INSERT INTO schema_migrations (version) VALUES (?)', [file]);
          await connection.commit();
          appliedCount++;
          console.log(`✓ Migration ${file} applied successfully.`);
        } catch (err) {
          await connection.rollback();
          console.error(`✗ Error applying migration ${file}:`, err.message);
          throw err;
        }
      } else {
        console.log(`- Migration ${file} already applied.`);
      }
    }

    console.log(`Migration process completed. ${appliedCount} new migration(s) applied.`);
  } finally {
    await connection.end();
  }
}

runMigrations().catch((err) => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
