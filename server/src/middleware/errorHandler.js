import { logger } from '../utils/logger.js';
import { config } from '../config/env.js';

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Ressource non trouvée : ${req.method} ${req.originalUrl}`
    }
  });
}

export function globalErrorHandler(err, req, res, next) {
  logger.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, err);

  const status = err.status || err.statusCode || 500;
  const isDev = config.env === 'development';

  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: status === 500 && !isDev
        ? 'Une erreur interne est survenue sur le serveur.'
        : err.message || 'Erreur inattendue.',
      ...(isDev && { stack: err.stack })
    }
  });
}
