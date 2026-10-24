import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { query } from '../database/db.js';

export async function requireAdminAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = req.cookies?.lacarafa_session || bearerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Accès restreint. Veuillez vous connecter au tableau de bord.'
        }
      });
    }

    const decoded = jwt.verify(token, config.session.secret);

    // Verify admin is still active in database
    const rows = await query('SELECT id, email, full_name, role, is_active FROM admins WHERE id = ?', [decoded.id]);
    const admin = rows[0];

    if (!admin || !admin.is_active) {
      res.clearCookie('lacarafa_session');
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Compte administrateur inactif ou introuvable.'
        }
      });
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.clearCookie('lacarafa_session');
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_SESSION',
        message: 'Session expirée ou invalide. Veuillez vous reconnecter.'
      }
    });
  }
}
