-- Drop and recreate orders_status table
-- status  pending: 0 / preparing: 1 / ready: 2

DROP TABLE IF EXISTS orders_status CASCADE;

CREATE TABLE orders_status (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status SMALLINT NOT NULL 0
);
