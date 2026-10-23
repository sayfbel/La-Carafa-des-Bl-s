import { query } from '../database/db.js';
import { logger } from '../utils/logger.js';

export async function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'La Carafa des Blés API',
    timestamp: new Date().toISOString()
  });
}

export async function getCategories(req, res, next) {
  try {
    const categories = await query(`
      SELECT id, name, slug, description, display_order
      FROM categories
      WHERE is_active = TRUE
      ORDER BY display_order ASC, name ASC
    `);
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}

export async function getProducts(req, res, next) {
  try {
    const { category, search, featured } = req.query;

    let sql = `
      SELECT 
        p.id, p.name, p.slug, p.short_description, p.description,
        p.price, p.currency, p.allergens, p.image_url,
        p.is_available, p.is_featured,
        c.id AS category_id, c.name AS category_name, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_published = TRUE
    `;
    const params = [];

    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (p.name LIKE ? OR p.short_description LIKE ? OR p.description LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (featured === 'true') {
      sql += ' AND p.is_featured = TRUE';
    }

    sql += ' ORDER BY c.display_order ASC, p.name ASC';

    const products = await query(sql, params);
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
}

export async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const rows = await query(`
      SELECT 
        p.id, p.name, p.slug, p.short_description, p.description,
        p.price, p.currency, p.allergens, p.image_url,
        p.is_available, p.is_featured, p.meta_title, p.meta_description,
        c.id AS category_id, c.name AS category_name, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ? AND p.is_published = TRUE
    `, [slug]);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        error: { code: 'PRODUCT_NOT_FOUND', message: 'Produit introuvable.' }
      });
    }

    // Also fetch related products in the same category
    const product = rows[0];
    const related = await query(`
      SELECT id, name, slug, short_description, price, currency, image_url, is_available
      FROM products
      WHERE category_id = ? AND id != ? AND is_published = TRUE
      LIMIT 3
    `, [product.category_id, product.id]);

    res.json({ success: true, data: { ...product, related } });
  } catch (err) {
    next(err);
  }
}

export async function getHomepageContent(req, res, next) {
  try {
    const rows = await query('SELECT setting_key, setting_value FROM site_settings');
    const settings = Object.fromEntries(rows.map(r => [r.setting_key, r.setting_value]));

    // Fetch featured products for the 3 main categories
    const categories = await query(`
      SELECT id, name, slug, description, display_order
      FROM categories
      WHERE is_active = TRUE
      ORDER BY display_order ASC
    `);

    res.json({
      success: true,
      data: {
        settings,
        categories
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getPublicSettings(req, res, next) {
  try {
    const rows = await query(`
      SELECT setting_key, setting_value 
      FROM site_settings 
      WHERE setting_key IN (
        'business_name', 'business_address', 'business_phone', 
        'business_phone_verified', 'business_email', 'google_maps_url',
        'opening_hours_note', 'story_signature',
        'store_status_mode', 'store_status_custom_message'
      )
    `);
    const settings = Object.fromEntries(rows.map(r => [r.setting_key, r.setting_value]));
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
}

export async function submitContactMessage(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Veuillez remplir tous les champs obligatoires (nom, email, objet, message).' }
      });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedSubject = String(subject).trim();
    const trimmedMessage = String(message).trim();
    const trimmedPhone = phone ? String(phone).trim() : null;

    if (trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Le nom ne doit pas dépasser 100 caractères.' }
      });
    }

    if (trimmedEmail.length > 150) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: "L'adresse email ne doit pas dépasser 150 caractères." }
      });
    }

    if (trimmedPhone && trimmedPhone.length > 25) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Le numéro de téléphone ne doit pas dépasser 25 caractères.' }
      });
    }

    if (trimmedSubject.length > 150) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: "L'objet ne doit pas dépasser 150 caractères." }
      });
    }

    if (trimmedMessage.length < 5 || trimmedMessage.length > 3000) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Le message doit contenir entre 5 et 3 000 caractères.' }
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_EMAIL', message: 'Veuillez renseigner une adresse email valide.' }
      });
    }

    const result = await query(`
      INSERT INTO contact_messages (name, email, phone, subject, message, status)
      VALUES (?, ?, ?, ?, ?, 'unread')
    `, [trimmedName, trimmedEmail, trimmedPhone, trimmedSubject, trimmedMessage]);

    logger.info(`New contact message received from ${email} (ID: ${result.insertId})`);

    res.status(201).json({
      success: true,
      message: 'Votre message a été transmis avec succès à notre équipe artisanale. Nous vous répondrons dans les meilleurs délais.'
    });
  } catch (err) {
    next(err);
  }
}
