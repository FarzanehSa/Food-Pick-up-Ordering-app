const getAllOrdersDetails = (db) => {
  return db.query(`SELECT orders.id AS order_id, order_time, comment, requested_pickup_time AS pickup_time, users.name as customer_name,
  menu_items.name as item, menu_items.price as price, order_items.qty AS qty , orders_status.name as status, menu_items.id as item_id, orders_status.id as status_id FROM orders
   JOIN order_items ON orders.id = order_items.order_id
 JOIN users ON  orders.user_id = users.id
 JOIN menu_items ON menu_items.id = order_items.menu_item_id
 JOIN orders_status ON orders_status.id = orders.status_id
   ORDER BY orders.order_time DESC, orders.id;`)
}

module.exports = { getAllOrdersDetails };

