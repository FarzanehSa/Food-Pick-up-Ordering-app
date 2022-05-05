const getOrdersDetail = (db, options) => {

  let queryParams = [];
  let queryString = `
    SELECT orders.id AS order_id, to_char(order_time,'YYYY-MM-DD') AS date ,
    users.id as customer_id, users.name as customer_name,
    SUM ( menu_items.price * order_items.qty ) AS total ,
    orders_status.name as status
    FROM orders
    JOIN order_items ON orders.id = order_items.order_id
    JOIN users ON  orders.user_id = users.id
    JOIN menu_items ON menu_items.id = order_items.menu_item_id
    JOIN orders_status ON orders_status.id = orders.status_id`;

  const whereStatment = [`WHERE`,`AND`];
  let index = 0;

  if (options.userId) {
    queryParams.push(`${(options.userId)}`);
    queryString += `\nWHERE users.id = $${queryParams.length}`;
    index = 1;
  }

  if (options.status) {
    queryParams.push(`${(options.status)}`);
    queryString += `\n${whereStatment[index]} orders_status.name = $${queryParams.length}`;
    index = 1;
  }

  if (options.orderDate) {
    queryParams.push(`${(options.orderDate)}`);
    queryString += `\n${whereStatment[index]} order_time = $${queryParams.length}`;
    index = 1;
  }

  queryString += `\n
  GROUP BY orders.id, users.id, orders_status.name
  ORDER BY orders.id DESC;`;

  return db.query(queryString, queryParams);
};

module.exports = { getOrdersDetail };
