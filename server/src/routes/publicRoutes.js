import { Router } from 'express';
import {
  getHealth,
  getCategories,
  getProducts,
  getProductBySlug,
  getHomepageContent,
  getPublicSettings,
  submitContactMessage
} from '../controllers/publicController.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.get('/health', getHealth);
router.get('/categories', getCategories);
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.get('/content/homepage', getHomepageContent);
router.get('/settings/public', getPublicSettings);
router.post('/contact', contactRateLimiter, submitContactMessage);

export default router;
