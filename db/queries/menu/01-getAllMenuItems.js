const getAllMenuItems = (db) => {
  return db.query(`SELECT * FROM menu_items
  ORDER BY category_id, id;`)
}

module.exports = { getAllMenuItems };

