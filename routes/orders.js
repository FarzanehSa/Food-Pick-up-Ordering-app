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
  // 👀❕⭕️
  router.get("/", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
    }
    if (req.cookies.cart) {
      const cart = JSON.parse(req.cookies.cart)
      // If cart is empty won't go to orders page!
      if (Object.keys(cart).length === 0) {
        res.redirect("/menu");
      }
      // console.log("khaled", JSON.parse(req.cookies.cart))
      res.render("orders", {user, cart});
    }
  });

  router.post("/", (req, res) => {
    const user = req.session.user;
    console.log('❎ post order - user:',user);
    const cart = JSON.parse(req.cookies.cart)
    console.log('❎ post order - cart:',cart);
    const detail = req.body;
    console.log('❎ post order - req-body:',detail);

    // delete cart cookie, cause order received server-side
    res.clearCookie('cart');
    res.redirect("/menu");
  });
  return router;
};

