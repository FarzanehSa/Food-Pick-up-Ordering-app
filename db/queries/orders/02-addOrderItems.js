// takes orderId and item object and add that to order-items table
const addOrderItem = (db, orderId, item) => {
  const queryValue = [];
  queryValue.push(orderId);
  queryValue.push(item.id);
  queryValue.push(item.qty);
  return db.query(`INSERT INTO order_items (order_id, menu_item_id, qty )
  VALUES ($1, $2, $3);`, queryValue)
};

module.exports = { addOrderItem };
