const getUserById = (db, id) => {
  return db.query(`SELECT access_level FROM users WHERE id = $1;`, [id]);
}

const getUserName = (db) => {
  return db.query(`SELECT name FROM users WHERE id = $1;`, [id])
}

const getAllMenuItems = (db) => {
  return db.query(`SELECT * FROM menu_items`)
}

module.exports = { getUserById, getAllMenuItems, getUserName }

