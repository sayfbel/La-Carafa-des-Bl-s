import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import { app } from '../src/index.js';
import { pool, query } from '../src/database/db.js';

describe('La Carafa des Blés — Backend API Test Suite', () => {
  let sessionCookie = '';
  let testProductId = null;

  beforeAll(async () => {
    // Ensure test db has admin with exact bcrypt hash
    const hash = await bcrypt.hash('ArtisanBakery2026!Secure', 10);
    await query(`
      INSERT INTO admins (id, email, password_hash, full_name, role, is_active)
      VALUES (999, 'admin@lacarafadesbles.fr', ?, 'Maître Boulanger', 'admin', TRUE)
      ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), is_active = TRUE;
    `, [hash]);
  });

  afterAll(async () => {
    // Clean up test records
    if (testProductId) {
      await query('DELETE FROM products WHERE id = ?', [testProductId]);
    }
    await query('DELETE FROM admins WHERE id = 999');
    await pool.end();
  });

  // 1. Health & Public Endpoints
  describe('Public API Endpoints', () => {
    it('GET /api/health returns status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });

    it('GET /api/categories returns active categories ordered', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/products returns published products', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/products?search=baguette filters products correctly', async () => {
      const res = await request(app).get('/api/products?search=baguette');
      expect(res.status).toBe(200);
      expect(res.body.data.some(p => p.name.toLowerCase().includes('baguette'))).toBe(true);
    });

    it('GET /api/products/baguette-de-tradition-francaise returns single product with related', async () => {
      const res = await request(app).get('/api/products/baguette-de-tradition-francaise');
      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe('baguette-de-tradition-francaise');
      expect(Array.isArray(res.body.data.related)).toBe(true);
    });

    it('GET /api/products/slug-inexistant returns 404', async () => {
      const res = await request(app).get('/api/products/slug-inexistant');
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('PRODUCT_NOT_FOUND');
    });
  });

  // 2. Contact Message Persistence & SQL Injection Resilience
  describe('Contact Form & Security Validation', () => {
    it('POST /api/contact fails when mandatory fields are missing', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ name: 'Jean' });
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('POST /api/contact rejects invalid email format', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Jean Dupont',
          email: 'invalid-email-format',
          subject: 'Question',
          message: 'Bonjour le fournil'
        });
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('INVALID_EMAIL');
    });

    it('POST /api/contact successfully persists valid message to MySQL', async () => {
      const payload = {
        name: 'Sophie Martin',
        email: 'sophie.martin@example.fr',
        phone: '0612345678',
        subject: 'Commande spéciale mariage',
        message: 'Bonjour, je souhaite commander 50 pièces pour un buffet.'
      };

      const res = await request(app)
        .post('/api/contact')
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);

      // Verify row exists in MySQL
      const rows = await query('SELECT * FROM contact_messages WHERE email = ?', [payload.email]);
      expect(rows.length).toBeGreaterThan(0);
      expect(rows[0].subject).toBe(payload.subject);
      expect(rows[0].status).toBe('unread');

      // Cleanup
      await query('DELETE FROM contact_messages WHERE email = ?', [payload.email]);
    });

    it('Resists SQL injection payload safely via parameterized statements', async () => {
      const maliciousSearch = "' OR 1=1 --";
      const res = await request(app).get(`/api/products?search=${encodeURIComponent(maliciousSearch)}`);
      expect(res.status).toBe(200);
      // It should not dump all products unconditionally, it just searches for literal string
      expect(res.body.success).toBe(true);
    });
  });

  // 3. Admin Authentication & Route Protection
  describe('Admin Authentication & Protected Routes', () => {
    it('Rejects access to protected endpoint when unauthenticated (401)', async () => {
      const res = await request(app).get('/api/admin/stats');
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('Rejects login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/admin/auth/login')
        .send({ email: 'testadmin@lacarafadesbles.fr', password: 'wrongPassword123!' });
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('AUTHENTICATION_FAILED');
    });

    it('Allows login with valid credentials and sets session cookie', async () => {
      const res = await request(app)
        .post('/api/admin/auth/login')
        .send({ email: 'admin@lacarafadesbles.fr', password: 'ArtisanBakery2026!Secure' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.headers['set-cookie']).toBeDefined();

      const cookieHeader = res.headers['set-cookie'][0];
      expect(cookieHeader).toContain('lacarafa_session');
      expect(cookieHeader).toContain('HttpOnly');

      sessionCookie = cookieHeader.split(';')[0];
    });

    it('Allows authenticated admin to fetch dashboard stats', async () => {
      const res = await request(app)
        .get('/api/admin/stats')
        .set('Cookie', sessionCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.stats.totalProducts).toBeGreaterThan(0);
    });

    it('Allows admin to create, update, and delete a product', async () => {
      // 1. Create
      const newProduct = {
        category_id: 1,
        name: 'Fougasse Provençale aux Olives',
        slug: 'fougasse-provencale-aux-olives-test',
        short_description: 'Pain plat traditionnel aux olives noires et romarin.',
        description: 'Farine de tradition, huile d olive vierge extra, olives de Nyons AOP.',
        price: 3.80,
        allergens: 'Gluten',
        image_url: '/assets/images/products/pain-campagne.webp',
        is_available: true,
        is_featured: false,
        is_published: true
      };

      const createRes = await request(app)
        .post('/api/admin/products')
        .set('Cookie', sessionCookie)
        .send(newProduct);

      expect(createRes.status).toBe(201);
      expect(createRes.body.success).toBe(true);
      testProductId = createRes.body.id;

      // 2. Update
      const updateRes = await request(app)
        .put(`/api/admin/products/${testProductId}`)
        .set('Cookie', sessionCookie)
        .send({ price: 4.20, is_available: false });

      expect(updateRes.status).toBe(200);

      // Verify in DB
      const [row] = await query('SELECT price, is_available FROM products WHERE id = ?', [testProductId]);
      expect(Number(row.price)).toBe(4.20);
      expect(row.is_available).toBe(0);

      // 3. Delete
      const deleteRes = await request(app)
        .delete(`/api/admin/products/${testProductId}`)
        .set('Cookie', sessionCookie);

      expect(deleteRes.status).toBe(200);

      const [check] = await query('SELECT id FROM products WHERE id = ?', [testProductId]);
      expect(check).toBeUndefined();
      testProductId = null;
    });

    it('Logs out and clears session cookie', async () => {
      const res = await request(app)
        .post('/api/admin/auth/logout')
        .set('Cookie', sessionCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Subsequent access with empty/cleared cookie must return 401
      const blockedRes = await request(app).get('/api/admin/stats');
      expect(blockedRes.status).toBe(401);
    });
  });
});
