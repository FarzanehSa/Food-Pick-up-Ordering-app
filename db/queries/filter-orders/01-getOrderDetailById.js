const getOrderDetailById = (db, orderId) => {
  return db.query(`
  SELECT menu_items.name as item, menu_items.price as price,
  order_items.qty AS qty, menu_items.id as item_id
  FROM orders
  JOIN order_items ON orders.id = order_items.order_id
  JOIN menu_items ON menu_items.id = order_items.menu_item_id
  WHERE orders.id = $1
  ORDER BY menu_items.id;`, [orderId])
}

module.exports = { getOrderDetailById };
