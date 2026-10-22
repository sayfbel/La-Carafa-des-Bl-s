import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../database/db.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

// Helper to record audit log
async function recordAudit(adminId, action, entityType, entityId, metadata = null) {
  try {
    await query(`
      INSERT INTO admin_audit_logs (admin_id, action, entity_type, entity_id, metadata)
      VALUES (?, ?, ?, ?, ?)
    `, [adminId, action, entityType, String(entityId || ''), metadata ? JSON.stringify(metadata) : null]);
  } catch (err) {
    logger.error('Failed to write audit log:', err);
  }
}

// 1. Auth: Login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Email et mot de passe requis.' }
      });
    }

    const rows = await query('SELECT * FROM admins WHERE email = ?', [email.trim().toLowerCase()]);
    const admin = rows[0];

    // Constant-time like flow to prevent timing attacks
    const passwordMatch = admin ? await bcrypt.compare(password, admin.password_hash) : false;

    if (!admin || !passwordMatch || !admin.is_active) {
      return res.status(401).json({
        success: false,
        error: { code: 'AUTHENTICATION_FAILED', message: 'Identifiants incorrects ou compte inactif.' }
      });
    }

    // Update last login
    await query('UPDATE admins SET last_login_at = NOW() WHERE id = ?', [admin.id]);

    // Sign JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      config.session.secret,
      { expiresIn: '12h' }
    );

    // Set secure HTTP-only cookie
    res.cookie('lacarafa_session', token, {
      httpOnly: true,
      secure: config.session.cookieSecure,
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000
    });

    await recordAudit(admin.id, 'AUTH_LOGIN', 'admin', admin.id, { email: admin.email });

    res.json({
      success: true,
      message: 'Connexion réussie.',
      admin: {
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role
      }
    });
  } catch (err) {
    next(err);
  }
}

// 2. Auth: Logout
export async function logout(req, res, next) {
  try {
    if (req.admin) {
      await recordAudit(req.admin.id, 'AUTH_LOGOUT', 'admin', req.admin.id);
    }
    res.clearCookie('lacarafa_session', {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.session.cookieSecure
    });
    res.json({ success: true, message: 'Déconnexion effectuée avec succès.' });
  } catch (err) {
    next(err);
  }
}

// 3. Auth: Current Admin
export async function getCurrentAdmin(req, res) {
  res.json({
    success: true,
    admin: {
      id: req.admin.id,
      email: req.admin.email,
      full_name: req.admin.full_name,
      role: req.admin.role
    }
  });
}

// 4. Stats Overview
export async function getDashboardStats(req, res, next) {
  try {
    const totalProdRows = await query('SELECT COUNT(*) AS total_products FROM products');
    const pubProdRows = await query('SELECT COUNT(*) AS published_products FROM products WHERE is_published = TRUE');
    const catRows = await query('SELECT COUNT(*) AS total_categories FROM categories WHERE is_active = TRUE');
    const msgRows = await query('SELECT COUNT(*) AS unread_messages FROM contact_messages WHERE status = "unread"');

    const total_products = totalProdRows[0]?.total_products || 0;
    const published_products = pubProdRows[0]?.published_products || 0;
    const total_categories = catRows[0]?.total_categories || 0;
    const unread_messages = msgRows[0]?.unread_messages || 0;

    const recentLogs = await query(`
      SELECT l.id, l.action, l.entity_type, l.entity_id, l.created_at, a.full_name AS admin_name
      FROM admin_audit_logs l
      LEFT JOIN admins a ON l.admin_id = a.id
      ORDER BY l.created_at DESC
      LIMIT 6
    `);

    res.json({
      success: true,
      data: {
        stats: {
          totalProducts: total_products,
          publishedProducts: published_products,
          draftProducts: total_products - published_products,
          totalCategories: total_categories,
          unreadMessages: unread_messages
        },
        recentLogs
      }
    });
  } catch (err) {
    next(err);
  }
}

// 5. Products Management
export async function getAllProductsAdmin(req, res, next) {
  try {
    const products = await query(`
      SELECT 
        p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const {
      category_id, name, slug, short_description, description,
      price, allergens, image_url, is_available, is_featured, is_published
    } = req.body;

    if (!category_id || !name || !slug) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Nom, catégorie et identifiant (slug) sont requis.' }
      });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    const result = await query(`
      INSERT INTO products (
        category_id, name, slug, short_description, description,
        price, allergens, image_url, is_available, is_featured, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      category_id, name.trim(), cleanSlug, short_description?.trim() || null,
      description?.trim() || null, price ? Number(price) : null,
      allergens?.trim() || null, image_url || null,
      is_available !== false, is_featured === true, is_published !== false
    ]);

    await recordAudit(req.admin.id, 'PRODUCT_CREATE', 'product', result.insertId, { name, slug: cleanSlug });

    res.status(201).json({ success: true, id: result.insertId, message: 'Produit créé avec succès.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE_SLUG', message: 'Un produit avec cet identifiant (slug) existe déjà.' }
      });
    }
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const {
      category_id, name, slug, short_description, description,
      price, allergens, image_url, is_available, is_featured, is_published
    } = req.body;

    const cleanSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-') : null;

    await query(`
      UPDATE products SET
        category_id = COALESCE(?, category_id),
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        short_description = COALESCE(?, short_description),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        allergens = COALESCE(?, allergens),
        image_url = COALESCE(?, image_url),
        is_available = COALESCE(?, is_available),
        is_featured = COALESCE(?, is_featured),
        is_published = COALESCE(?, is_published)
      WHERE id = ?
    `, [
      category_id !== undefined ? category_id : null,
      name !== undefined ? name.trim() : null,
      cleanSlug,
      short_description !== undefined ? short_description.trim() : null,
      description !== undefined ? description.trim() : null,
      price !== undefined ? (price ? Number(price) : null) : null,
      allergens !== undefined ? (allergens ? allergens.trim() : null) : null,
      image_url !== undefined ? image_url : null,
      is_available !== undefined ? is_available : null,
      is_featured !== undefined ? is_featured : null,
      is_published !== undefined ? is_published : null,
      id
    ]);

    await recordAudit(req.admin.id, 'PRODUCT_UPDATE', 'product', id, { name });

    res.json({ success: true, message: 'Produit mis à jour avec succès.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE_SLUG', message: 'Un produit avec ce slug existe déjà.' }
      });
    }
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM products WHERE id = ?', [id]);
    await recordAudit(req.admin.id, 'PRODUCT_DELETE', 'product', id);
    res.json({ success: true, message: 'Produit supprimé avec succès.' });
  } catch (err) {
    next(err);
  }
}

// 6. Categories Management
export async function getAllCategoriesAdmin(req, res, next) {
  try {
    const categories = await query(`
      SELECT c.*, COUNT(p.id) AS products_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.id
      ORDER BY c.display_order ASC, c.name ASC
    `);
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req, res, next) {
  try {
    const { name, slug, description, display_order, is_active } = req.body;
    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Nom et slug de catégorie requis.' }
      });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const result = await query(`
      INSERT INTO categories (name, slug, description, display_order, is_active)
      VALUES (?, ?, ?, ?, ?)
    `, [name.trim(), cleanSlug, description?.trim() || null, Number(display_order) || 0, is_active !== false]);

    await recordAudit(req.admin.id, 'CATEGORY_CREATE', 'category', result.insertId, { name });
    res.status(201).json({ success: true, id: result.insertId, message: 'Catégorie créée avec succès.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE_SLUG', message: 'Cette catégorie existe déjà.' }
      });
    }
    next(err);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, slug, description, display_order, is_active } = req.body;

    const cleanSlug = slug?.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    await query(`
      UPDATE categories SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description),
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `, [name?.trim(), cleanSlug, description?.trim(), display_order, is_active, id]);

    await recordAudit(req.admin.id, 'CATEGORY_UPDATE', 'category', id, { name });
    res.json({ success: true, message: 'Catégorie mise à jour.' });
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;

    // Check if category has products
    const [[{ product_count }]] = await query('SELECT COUNT(*) AS product_count FROM products WHERE category_id = ?', [id]);
    if (product_count > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'CATEGORY_IN_USE',
          message: `Impossible de supprimer cette catégorie car ${product_count} produit(s) y sont rattachés. Déplacez ou supprimez ces produits d'abord.`
        }
      });
    }

    await query('DELETE FROM categories WHERE id = ?', [id]);
    await recordAudit(req.admin.id, 'CATEGORY_DELETE', 'category', id);
    res.json({ success: true, message: 'Catégorie supprimée avec succès.' });
  } catch (err) {
    next(err);
  }
}

// 7. Site Content & Settings
export async function getAllSettings(req, res, next) {
  try {
    const rows = await query('SELECT setting_key, setting_value, updated_at FROM site_settings');
    const settings = Object.fromEntries(rows.map(r => [r.setting_key, r.setting_value]));
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req, res, next) {
  try {
    const settings = req.body;
    for (const [key, val] of Object.entries(settings)) {
      await query(`
        INSERT INTO site_settings (setting_key, setting_value)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);
      `, [key, String(val)]);
    }

    await recordAudit(req.admin.id, 'SETTINGS_UPDATE', 'settings', null, { keys: Object.keys(settings) });
    res.json({ success: true, message: 'Paramètres et contenus sauvegardés avec succès.' });
  } catch (err) {
    next(err);
  }
}

// 8. Messages Management
export async function getAllMessages(req, res, next) {
  try {
    const messages = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
}

export async function updateMessageStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, error: { message: 'Statut invalide.' } });
    }

    await query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
    await recordAudit(req.admin.id, 'MESSAGE_STATUS', 'contact_message', id, { status });
    res.json({ success: true, message: 'Statut du message actualisé.' });
  } catch (err) {
    next(err);
  }
}

export async function deleteMessage(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM contact_messages WHERE id = ?', [id]);
    await recordAudit(req.admin.id, 'MESSAGE_DELETE', 'contact_message', id);
    res.json({ success: true, message: 'Message supprimé.' });
  } catch (err) {
    next(err);
  }
}

// 9. Audit Logs
export async function getAuditLogs(req, res, next) {
  try {
    const logs = await query(`
      SELECT l.*, a.full_name AS admin_name, a.email AS admin_email
      FROM admin_audit_logs l
      LEFT JOIN admins a ON l.admin_id = a.id
      ORDER BY l.created_at DESC
      LIMIT 100
    `);
    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
}
