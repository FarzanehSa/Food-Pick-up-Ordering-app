const getItemById = (db, id) => {
  return db.query(`SELECT * FROM menu_items
  WHERE id = $1;`, [id]);
}

module.exports = { getItemById }

