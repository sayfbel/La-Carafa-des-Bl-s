-- Migration 005: Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
    setting_value LONGTEXT NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
