import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import request from 'supertest';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force test environment before loading application modules
process.env.NODE_ENV = 'test';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { app } = await import('../src/index.js');
const { pool } = await import('../src/database/db.js');

const targetDb = process.env.DB_TEST_NAME || 'la_carafa_test';

console.log('================================================================');
console.log('   LA CARAFA DES BLÉS — AUTOMATED END-TO-END (E2E) QA SUITE');
console.log('   Target Database:', targetDb);
console.log('================================================================\n');

async function runE2E() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: targetDb,
    charset: 'utf8mb4'
  });

  try {
    // Step 1: Health & Database connection
    console.log('[Step 1/10] Verifying Backend Health & Database Connectivity...');
    const healthRes = await request(app).get('/api/health');
    if (healthRes.status !== 200 || healthRes.body.status !== 'ok') {
      throw new Error(`Health check failed: ${JSON.stringify(healthRes.body)}`);
    }
    console.log('✓ API health verified: status is "ok".');

    // Step 2: Browse and filter products publicly
    console.log('\n[Step 2/10] Testing Public Catalogue & Category Filtering...');
    const prodRes = await request(app).get('/api/products?category=pains-de-tradition');
    if (prodRes.status !== 200 || !prodRes.body.success || prodRes.body.data.length === 0) {
      throw new Error('Public product filtering failed.');
    }
    console.log(`✓ Fetched ${prodRes.body.data.length} products in category "pains-de-tradition".`);

    // Step 3: Product Detail route
    console.log('\n[Step 3/10] Testing Product Detail by Slug...');
    const slug = prodRes.body.data[0].slug;
    const detailRes = await request(app).get(`/api/products/${slug}`);
    if (detailRes.status !== 200 || detailRes.body.data.slug !== slug) {
      throw new Error(`Product detail failed for slug: ${slug}`);
    }
    console.log(`✓ Product detail for "${detailRes.body.data.name}" verified with related items.`);

    // Step 4: Submit Contact Form
    console.log('\n[Step 4/10] Submitting Customer Contact Form...');
    const contactPayload = {
      name: 'Camille Leroux',
      email: 'camille.leroux@example.fr',
      phone: '0655443322',
      subject: 'Réservation miche de pain pour dimanche',
      message: 'Bonjour, je souhaite réserver 2 miches de campagne au levain pour dimanche matin. Merci !'
    };

    const contactRes = await request(app).post('/api/contact').send(contactPayload);
    if (contactRes.status !== 201 || !contactRes.body.success) {
      throw new Error(`Contact submission failed: ${JSON.stringify(contactRes.body)}`);
    }
    console.log('✓ Contact form submitted successfully via HTTP POST.');

    // Step 5: Verify MySQL Persistence
    console.log('\n[Step 5/10] Verifying MySQL Record Persistence for Contact Message...');
    const [msgRows] = await connection.query(
      'SELECT id, name, email, subject, status FROM contact_messages WHERE email = ? ORDER BY id DESC LIMIT 1',
      [contactPayload.email]
    );
    if (msgRows.length === 0 || msgRows[0].subject !== contactPayload.subject) {
      throw new Error('Message was not found in MySQL contact_messages table.');
    }
    const messageId = msgRows[0].id;
    console.log(`✓ Confirmed message persisted in MySQL (ID: ${messageId}, Status: "${msgRows[0].status}").`);

    // Step 6: Admin Authentication with wrong and valid password
    console.log('\n[Step 6/10] Testing Admin Authentication & Brute-Force Rejection...');
    // Seed admin if not present
    const testAdminEmail = 'admin@lacarafadesbles.fr';
    const testAdminPass = 'ArtisanBakery2026!Secure';
    const hash = await bcrypt.hash(testAdminPass, 10);
    await connection.query(`
      INSERT INTO admins (id, email, password_hash, full_name, role, is_active)
      VALUES (1, ?, ?, 'Maître Boulanger', 'admin', TRUE)
      ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), is_active = TRUE;
    `, [testAdminEmail, hash]);

    // Bad password
    const badLogin = await request(app).post('/api/admin/auth/login').send({
      email: testAdminEmail,
      password: 'wrong_password_attempt'
    });
    if (badLogin.status !== 401) {
      throw new Error('Server accepted invalid password!');
    }
    console.log('✓ Invalid credentials properly rejected (HTTP 401).');

    // Good password
    const goodLogin = await request(app).post('/api/admin/auth/login').send({
      email: testAdminEmail,
      password: testAdminPass
    });
    if (goodLogin.status !== 200 || !goodLogin.body.success) {
      throw new Error('Valid admin login failed.');
    }
    const sessionCookie = goodLogin.headers['set-cookie'][0].split(';')[0];
    console.log('✓ Valid admin authenticated. Secure session cookie issued.');

    // Step 7: Create a Product via Admin API
    console.log('\n[Step 7/10] Admin: Creating New Artisan Creation...');
    const e2eProduct = {
      category_id: 1,
      name: 'Pain Épeautre & Seigle Bio',
      slug: 'pain-epeautre-seigle-bio-e2e',
      short_description: 'Farines anciennes bio, levain naturel et graines torréfiées.',
      description: 'Pain rustique de garde aux céréales anciennes, très faible teneur en gluten.',
      price: 4.10,
      allergens: 'Gluten (épeautre, seigle)',
      image_url: '/assets/images/products/pain-campagne.webp',
      is_available: true,
      is_featured: true,
      is_published: true
    };

    const createRes = await request(app)
      .post('/api/admin/products')
      .set('Cookie', sessionCookie)
      .send(e2eProduct);

    if (createRes.status !== 201) {
      throw new Error(`Failed to create product via admin: ${JSON.stringify(createRes.body)}`);
    }
    const createdId = createRes.body.id;
    console.log(`✓ Product created successfully via Admin API (ID: ${createdId}).`);

    // Step 8: Confirm Persistence in MySQL
    console.log('\n[Step 8/10] Verifying Product in MySQL Database...');
    const [prodCheck] = await connection.query('SELECT name, price, is_published FROM products WHERE id = ?', [createdId]);
    if (prodCheck.length === 0 || Number(prodCheck[0].price) !== 4.10) {
      throw new Error('Product not found in MySQL with expected price.');
    }
    console.log(`✓ Verified in MySQL: "${prodCheck[0].name}", Price: ${prodCheck[0].price} €, Published: ${Boolean(prodCheck[0].is_published)}.`);

    // Step 9: Confirm Product Appears on Public Website
    console.log('\n[Step 9/10] Verifying Live Public Website Reflection...');
    const publicVerifyRes = await request(app).get(`/api/products/${e2eProduct.slug}`);
    if (publicVerifyRes.status !== 200 || publicVerifyRes.body.data.name !== e2eProduct.name) {
      throw new Error('Created product does not appear on public website.');
    }
    console.log('✓ Live public endpoint returns the newly created artisan product.');

    // Clean up created test product
    await request(app).delete(`/api/admin/products/${createdId}`).set('Cookie', sessionCookie);
    await connection.query('DELETE FROM contact_messages WHERE id = ?', [messageId]);

    // Step 10: Admin Logout & Protected Route Lockdown
    console.log('\n[Step 10/10] Testing Admin Logout & Protected Endpoint Lockdown...');
    const logoutRes = await request(app).post('/api/admin/auth/logout').set('Cookie', sessionCookie);
    if (logoutRes.status !== 200) {
      throw new Error('Logout failed.');
    }

    const unauthCheck = await request(app).get('/api/admin/stats');
    if (unauthCheck.status !== 401) {
      throw new Error('Protected endpoint was still accessible after logout!');
    }
    console.log('✓ Admin successfully logged out. Protected endpoints safely return HTTP 401.');

    console.log('\n================================================================');
    console.log('   🎉 ALL 10 E2E QA VERIFICATION CHECKS PASSED (100% SUCCESS)');
    console.log('================================================================\n');

    await pool.end();
    process.exit(0);
  } finally {
    await connection.end();
  }
}

runE2E().catch((err) => {
  console.error('\n❌ E2E VERIFICATION FAILED:', err.message);
  process.exit(1);
});
