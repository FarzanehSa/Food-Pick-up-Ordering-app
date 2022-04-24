-- Drop and recreate orders table

DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  order_time TIME NOT NULL DEFAULT current_timestamp,
  comment TEXT,
  requested_pickup_time TIME DEFAULT '00:30:00'
);
