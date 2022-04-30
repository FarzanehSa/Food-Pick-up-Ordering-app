const getCategories = (db) => {
  return db.query(`SELECT * FROM categories
  ORDER BY id;`)
}

module.exports = { getCategories };

