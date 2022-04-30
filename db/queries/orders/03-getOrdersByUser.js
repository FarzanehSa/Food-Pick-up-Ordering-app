// takes orderId and item object and add that to order-items table
const getOrderByUser = (db, user) => {
  return db.query(`
  SELECT orders.id, orders.order_time, order_items.qty, menu_items.name, menu_items.price, orders_status.status
  FROM orders
  LEFT JOIN order_items ON orders.id = order_items.order_Id
  LEFT JOIN orders_status ON  orders.id = orders_status.order_id
  LEFT JOIN menu_items ON order_items.menu_item_id = menu_items.id
  WHERE orders.user_id = $1;`, [user.id])
};

// AND orders_status.status = 1

module.exports = { getOrderByUser };
