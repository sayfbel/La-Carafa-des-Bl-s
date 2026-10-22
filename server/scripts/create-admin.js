import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const targetDb = process.env.DB_NAME || 'la_carafa_db';

async function createAdmin() {
  const args = process.argv.slice(2);
  const emailArg = args.find(a => a.startsWith('--email='))?.split('=')[1] || process.env.INITIAL_ADMIN_EMAIL || 'admin@lacarafadesbles.fr';
  const passwordArg = args.find(a => a.startsWith('--password='))?.split('=')[1] || process.env.INITIAL_ADMIN_PASSWORD || 'ArtisanBakery2026!Secure';
  const nameArg = args.find(a => a.startsWith('--name='))?.split('=')[1] || 'Maître Boulanger';

  console.log(`Provisioning administrator account for: ${emailArg}...`);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: targetDb,
    charset: 'utf8mb4'
  });

  try {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(passwordArg, saltRounds);

    await connection.query(`
      INSERT INTO admins (email, password_hash, full_name, role, is_active)
      VALUES (?, ?, ?, 'admin', TRUE)
      ON DUPLICATE KEY UPDATE
        password_hash = VALUES(password_hash),
        full_name = VALUES(full_name),
        is_active = TRUE;
    `, [emailArg, passwordHash, nameArg]);

    console.log(`✓ Administrator [${emailArg}] successfully provisioned.`);
    console.log(`  Role: admin | Status: active | Password hashed with bcrypt (cost: 12)`);
  } finally {
    await connection.end();
  }
}

createAdmin().catch((err) => {
  console.error('Failed to create admin:', err);
  process.exit(1);
});
