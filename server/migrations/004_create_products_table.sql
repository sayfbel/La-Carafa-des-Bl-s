-- Migration 004: Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(160) NOT NULL UNIQUE,
    short_description VARCHAR(255) NULL,
    description TEXT NULL,
    price DECIMAL(6, 2) NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
    allergens VARCHAR(255) NULL,
    image_url VARCHAR(255) NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    meta_title VARCHAR(150) NULL,
    meta_description VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_products_category (category_id),
    INDEX idx_products_slug (slug),
    INDEX idx_products_published (is_published, is_available)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
