CREATE TABLE IF NOT EXISTS rsvp_confirmations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contact VARCHAR(255) NOT NULL DEFAULT '',
  note TEXT NULL,
  ip VARCHAR(45) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS rsvp_guests (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  confirmation_id INT UNSIGNED NOT NULL,
  name VARCHAR(180) NOT NULL,
  PRIMARY KEY (id),
  KEY confirmation_id (confirmation_id),
  CONSTRAINT rsvp_guests_confirmation
    FOREIGN KEY (confirmation_id) REFERENCES rsvp_confirmations (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
