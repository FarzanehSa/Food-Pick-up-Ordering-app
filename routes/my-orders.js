/*
* All routes for my-orders are defined here
* Since this file is loaded in server.js into my-orders,
*   these routes are mounted onto /my-orders
*/

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user;
    res.render("my-orders", { user });
  });
  return router;
};
