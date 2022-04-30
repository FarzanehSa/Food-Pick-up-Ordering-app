const getAllOrderDetails = (db) => {
  return db.query(`SELECT orders.*, order_items.* FROM orders
  JOIN order_items ON orders.id = order_items.order_id
  ORDER BY orders.order_time DESC, orders.id;`)
}

module.exports = { getAllOrderDetails };

