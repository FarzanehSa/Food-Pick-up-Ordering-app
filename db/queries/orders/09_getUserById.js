const getUserById = (db, orderId) => {
  return db.query(`
  SELECT users.name as name
  FROM orders
  JOIN users ON  orders.user_id = users.id
  WHERE orders.id = $1
  ;`, [orderId])
}

module.exports = { getUserById };

