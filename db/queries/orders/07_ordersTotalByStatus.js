const ordersTotalByStatus = (db, statusId) => {
  return db.query(`
  SELECT orders.id, SUM (menu_items.price * order_items.qty) As total
  FROM orders
  JOIN order_items ON orders.id = order_items.order_id
  JOIN menu_items ON menu_items.id = order_items.menu_item_id
  JOIN orders_status ON orders_status.id = orders.status_id
  WHERE orders_status.id = $1
  Group by orders.id
  ORDER BY orders.id DESC;`,[statusId])
}

module.exports = { ordersTotalByStatus };

