DROP DATABASE IF EXISTS	clothes_store;
CREATE DATABASE clothes_store;

USE clothes_store;

CREATE TABLE product(
  id INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  provider_id VARCHAR(50) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  model VARCHAR(100),
  brand VARCHAR(50) NOT NULL,
  size VARCHAR(5) NOT NULL,
  color VARCHAR(50) NOT NULL,
  price BIGINT UNSIGNED NOT NULL,
  stock INT UNSIGNED NOT NULL,
  availability ENUM('available', 'unavailable'),
  PRIMARY KEY (id)
);

INSERT INTO product(provider_id, `type`, model, brand, size, color, price, stock, availability) VALUE
  ('Caliope', 'Shoe', 'Air Jordan', 'Nike', '40', 'Black & White', 135, 650, 'available'),
  ('Fibras y Telas S.A.S', 'Shirt', 'Sports', 'Rebook', 's', 'Grey', 16, 200, 'unavailable');