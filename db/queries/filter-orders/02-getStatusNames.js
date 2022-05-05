const getStatusNames = (db) => {
  return db.query(`SELECT name
  FROM orders_status
  ORDER BY id;`)
};

module.exports = { getStatusNames };
