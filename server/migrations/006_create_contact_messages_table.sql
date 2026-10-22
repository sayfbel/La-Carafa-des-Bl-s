-- Migration 006: Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL,
    phone VARCHAR(30) NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'archived') NOT NULL DEFAULT 'unread',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contact_status (status),
    INDEX idx_contact_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
