const getUserById = (db, id) => {
  return db.query(`SELECT access_level FROM users WHERE id = $1;`, [id]);
}

const getUserName = (db) => {
  return db.query(`SELECT name FROM users WHERE id = $1;`, [id])
}

const getAllMenuItems = (db) => {
  return db.query(`SELECT * FROM menu_items`)
}

const getItemById = (db, id) => {
  return db.query(`SELECT * FROM menu_items WHERE id = $1;`, [id]);
}

module.exports = { getUserById, getAllMenuItems, getUserName, getItemById }

