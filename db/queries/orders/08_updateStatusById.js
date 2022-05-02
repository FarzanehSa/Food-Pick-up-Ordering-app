const updateStatusById = (db, statusId, orderId) => {
  return db.query(`
  UPDATE orders
  SET status_id = $1
  WHERE id = $2
  RETURNING *;`, [statusId, orderId])
}

module.exports = { updateStatusById };

