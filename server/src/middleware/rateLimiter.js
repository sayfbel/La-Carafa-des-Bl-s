import rateLimit from 'express-rate-limit';

// Rate limit for admin authentication: 10 attempts per 15 minutes
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.'
    }
  }
});

// Rate limit for public contact form submissions: 5 submissions per 10 minutes
export const contactRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Trop de messages envoyés récemment. Veuillez patienter quelques minutes.'
    }
  }
});
