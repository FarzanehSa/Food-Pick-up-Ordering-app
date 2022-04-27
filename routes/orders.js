/*
* All routes for Orders are defined here
* Since this file is loaded in server.js into orders,
*   these routes are mounted onto /orders
*/

const express = require('express');
// const {  } = require('../db/queries/database');
const router  = express.Router();

module.exports = (db) => {
  // get orders/
  // Rendering orders.ejs
  router.get("/", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
    }
    res.render("orders", {user});
  });
  return router;
};

