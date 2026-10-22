-- Migration 001: Create schema_migrations table
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(100) NOT NULL PRIMARY KEY,
    applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
