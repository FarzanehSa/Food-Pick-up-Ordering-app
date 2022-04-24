/*
* All routes for Users are defined here
* Since this file is loaded in server.js into api/users,
*   these routes are mounted onto /users
* See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
*/

const express = require('express');
const { getAllMenuItems } = require('../db/queries/database');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('🛗 req.body: ',req.body)       // 🚨🚨🚨
    getAllMenuItems(db)
      .then(data => {
        console.log(data.rows)
        menuItems = data.rows
        res.render("menu",{menuItems});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    // res.render("menu");
  });

  return router;
};

