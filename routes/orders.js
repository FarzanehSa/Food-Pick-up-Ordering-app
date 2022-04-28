/*
* All routes for Orders are defined here
* Since this file is loaded in server.js into orders,
*   these routes are mounted onto /orders
*/

const express = require('express');
const { addOrder } = require('../db/queries/orders/01-addOrder');
const { addOrderItem } = require('../db/queries/orders/02-addOrderItems');
const router  = express.Router();


// ❌❌ Move this function to another helper file
// create an object with 3 keys (userId, comment & pickupTime)
const createOrderInfoObject = function(userObject, detailObject) {
  // if customer select "as soon as possible" for pickup, we add, 15 mins to NOW time.
  const curTime = new Date(); // take NOW time!
  let pickupTime;
  if (detailObject.pickupTime === 'later') {
    pickupTime = detailObject.setPickupTime;
  } else {
    // add 15 minutes;
    const minutesToAdd = 15;
    const futureTime = new Date(curTime.getTime() + minutesToAdd*60000);
    // just take 8 first character of string which is hh:mm:ss
    pickupTime = futureTime.toTimeString().slice(0,8);
  }
  // build order info object
  const order = {
    userId: userObject.id,
    comment: detailObject.comment,
    pickupTime
  }
  // console.log('👀 order',order);  // 🚨🚨🚨
  return order;
}

module.exports = (db) => {
  // get orders/
  // Rendering orders.ejs
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
      // console.log("khaled", JSON.parse(req.cookies.cart))  // 🚨🚨🚨
      res.render("orders", {user, cart});
    } else {
      res.redirect("/menu");
    }
  });

  router.post("/", (req, res) => {
    const user = req.session.user;
    const cart = JSON.parse(req.cookies.cart)
    const detail = req.body;
    // console.log('❎ post order - user:',user);           // 🚨🚨🚨
    // console.log('❎ post order - cart:',cart);           // 🚨🚨🚨
    // console.log('❎ post order - req-body:',detail);     // 🚨🚨🚨

    // create an object to pass to query
    const orderInfo = createOrderInfoObject(user, detail);

    // first insert into orders tabel
    addOrder(db, orderInfo)
    .then(data => {
      console.log('✅ order added to DB');                                  // 🚨🚨🚨
      // console.log('❕return after add row to orders table: ',data); // 🚨🚨🚨
      const orderId = data[0].id;
      return orderId;
    })
    .then(orderId => {
      // create a list of promises for adding items to order_items table
      const addItemPromise = [];
      for (const item in cart) {
        addItemPromise.push(addOrderItem(db, orderId, cart[item]));
      }
      Promise.all(addItemPromise)
      .then ( data => {
        console.log('✅ All items added to DB');                // 🚨🚨🚨
        // delete cart cookie, cause order received server-side
        res.clearCookie('cart');
        res.redirect("/menu");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });
  return router;
};



