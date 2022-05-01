const getAllOrderedItemsByStatus = (db, statusId) => {
  return db.query(`
  SELECT orders.id AS order_id,
  menu_items.name as item, menu_items.price as price, order_items.qty AS qty,
  menu_items.id as item_id, orders_status.id as status_id
  FROM orders
  JOIN order_items ON orders.id = order_items.order_id
  JOIN menu_items ON menu_items.id = order_items.menu_item_id
  JOIN orders_status ON orders_status.id = orders.status_id
  WHERE orders_status.id = $1
  ORDER BY orders.id;`, [statusId])
}

module.exports = { getAllOrderedItemsByStatus };

