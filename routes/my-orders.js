/*
* All routes for my-orders are defined here
* Since this file is loaded in server.js into my-orders,
*   these routes are mounted onto /my-orders
*/

const express = require('express');
const router = express.Router();

const { getOrderByUser } = require('../db/queries/orders/03-getOrdersByUser');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user;
    getOrderByUser(db, user)
    .then(data => {
      const orders = data.rows;
      // console.log(orders)
      res.render('my-orders', {user, orders});
    });
  });
  return router;
};
