/*
* All routes for my-orders are defined here
* Since this file is loaded in server.js into my-orders,
*   these routes are mounted onto /my-orders
*/

const express = require('express');
const router = express.Router();

const { getOrderByUser } = require('../db/queries/orders/03-getOrdersByUser');

// Use an object to group the order items by order id
const groupOrders = function (orders) {
  let result = {};
  for (const order of orders) {
    // Use order id as key to group all the orders
    // if order id doesn't exist, create it
    if (!result[order.id]) {
      result[order.id] = {
        order_time: order.order_time,
        id: order.id,
        items: [],
        status: order.status_name,
        total: 0,
      };
    }
    result[order.id].items.push(order);
    result[order.id].total += (order.price / 100) * order.qty;
  }
  // convert object of object to array of object
  return Object.values(result).reverse();
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user;
    if (!user) {
      res.render("login");
      return;
    }
    if (user.access_level === 1) {
      res.redirect("/orders/new-orders");
      return;
    }
    getOrderByUser(db, user)
      .then(data => {
        const items = data.rows;
        res.render('my-orders', { user, orders: groupOrders(items) });
        return;
      });
  });
  return router;
};
