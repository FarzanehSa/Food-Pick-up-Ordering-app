const getUserById = (db, id) => {
  return db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
}

const getUserName = (db, id) => {
  return db.query(`SELECT access_level FROM users WHERE id = $1;`, [id]);
}

module.exports = { getUserById, getUserName, }

