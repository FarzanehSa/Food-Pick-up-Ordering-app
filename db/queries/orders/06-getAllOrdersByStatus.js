const getAllOrdersByStatus = (db, statusId) => {
  return db.query(`SELECT orders.id AS order_id,
  to_char(order_time,'YYYY-MM-DD') AS order_time, comment,
  to_char(requested_pickup_time,'HH24:MI') AS pickup_time, users.name as customer_name,
  orders_status.name as status, orders_status.id as status_id
  FROM orders
  JOIN users ON  orders.user_id = users.id
  JOIN orders_status ON orders_status.id = orders.status_id
  WHERE orders_status.id = $1
  ORDER BY orders.id;`, [statusId])
}

module.exports = { getAllOrdersByStatus };

