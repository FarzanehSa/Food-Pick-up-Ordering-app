const getUserById = (db, id) => {
  return db.query(`SELECT access_level FROM users WHERE id = $1;`, [id])

}
 module.exports = { getUserById }

