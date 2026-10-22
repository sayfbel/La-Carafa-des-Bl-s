-- Migration 007: Create admin_audit_logs table
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50) NULL,
    metadata JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL,
    INDEX idx_audit_admin (admin_id),
    INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
