// takes an object of userID, comment, pickup time and insert in orders table
// pass new row thats added to the promise
const addOrder = (db, orderInfoObject) => {
  const queryValue = [];
  queryValue.push(orderInfoObject.userId);
  queryValue.push(orderInfoObject.comment);
  queryValue.push(orderInfoObject.pickupTime);
  return db.query(`INSERT INTO orders (user_id, comment, requested_pickup_time )
  VALUES ($1, $2, $3)
  RETURNING *;`, queryValue).then(data => {
    return data.rows;
  });
};

module.exports = { addOrder };
