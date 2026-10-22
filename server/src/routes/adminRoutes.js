import { Router } from 'express';
import {
  login,
  logout,
  getCurrentAdmin,
  getDashboardStats,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllSettings,
  updateSettings,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
  getAuditLogs
} from '../controllers/adminController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public auth endpoints
router.post('/auth/login', loginRateLimiter, login);
router.post('/auth/logout', logout);

// Protected admin endpoints
router.use(requireAdminAuth);

router.get('/auth/me', getCurrentAdmin);
router.get('/stats', getDashboardStats);

// Products
router.get('/products', getAllProductsAdmin);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Categories
router.get('/categories', getAllCategoriesAdmin);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Settings & Site Content
router.get('/settings', getAllSettings);
router.put('/settings', updateSettings);

// Messages
router.get('/messages', getAllMessages);
router.put('/messages/:id/status', updateMessageStatus);
router.delete('/messages/:id', deleteMessage);

// Audit Logs
router.get('/audit-logs', getAuditLogs);

export default router;
