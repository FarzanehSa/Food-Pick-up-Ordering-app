/*
* All routes for Orders are defined here
* Since this file is loaded in server.js into orders,
*   these routes are mounted onto /orders
*/

const express = require('express');
const { addOrder } = require('../db/queries/orders/01-addOrder');
const { addOrderItem } = require('../db/queries/orders/02-addOrderItems');
const { getAllOrderedItemsByStatus } = require('../db/queries/orders/05_getAllOrderedItemsByStatus');
const { getAllOrdersByStatus } = require('../db/queries/orders//06-getAllOrdersByStatus');
const { ordersTotalByStatus } = require('../db/queries/orders/07_ordersTotalByStatus');
const { updateStatusById } = require('../db/queries/orders/08_updateStatusById');
const { getUserById } = require('../db/queries/orders/09_getUserById');
const { orderReceivedAlert, createOrderInfoObject, sendOrderDecision } = require('../javaScripts/helperFunctions.js');
const router  = express.Router();

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
        // send owner message.
        orderReceivedAlert();
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


  router.get("/new-orders", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
      return;
    }
    getAllOrderedItemsByStatus(db, 0)
    .then(data => {
      const itemsInOrder = data.rows;
      getAllOrdersByStatus(db, 0)
      .then(data => {
        const pendingOrders = data.rows
        ordersTotalByStatus(db, 0)
        .then(data => {
          const totalList = data.rows
          // console.log('⏱', itemsInOrder);    // 🚨🚨🚨
          // console.log('⏱', pendingOrders);   // 🚨🚨🚨

          // change the format of totalList so we can use it with orderId as key!
          let ordersTotal = {}
          for (const row of totalList) {
            ordersTotal[row.id] = row.total;
          }

          // console.log('⏱', ordersTotal);     // 🚨🚨🚨
          res.render("new-orders", { itemsInOrder, pendingOrders, ordersTotal,  user});
        })
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.post("/new-orders", (req, res) => {
    const decision = req.body;
    let orderId;
    let statusId;
    let text = "Your order accepted!"
    if (decision.accept) {
      orderId = decision.accept;
      if (decision.replyText !== '') text = decision.replyText;
      statusId = 1;
      // console.log('😍',orderId, text)
    } else if (decision.reject) {
      orderId = decision.reject;
      statusId = 3;
      text = "Sorry, We can't accept your order today."
      // console.log('😡',orderId);
    }
    updateStatusById(db, statusId, orderId)
    .then(data => {
      console.log('✅ DB updated.');
    })
    .then(data => {
      getUserById(db, orderId)
      .then(data => {
        const customer = data.rows[0].name;
        console.log('🤪',customer);
        sendOrderDecision(customer, text);
        res.redirect("/orders/new-orders");
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/in-progress-orders", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
      return;
    }
    getAllOrderedItemsByStatus(db, 1)
    .then(data => {
      const itemsInOrder = data.rows;
      getAllOrdersByStatus(db, 1)
      .then(data => {
        const inProgressOrders = data.rows
        ordersTotalByStatus(db, 1)
        .then(data => {
          const totalList = data.rows

          // change the format of totalList so we can use it with orderId as key!
          let ordersTotal = {}
          for (const row of totalList) {
            ordersTotal[row.id] = row.total;
          }

          res.render("in-progress-orders", { itemsInOrder, inProgressOrders, ordersTotal,  user});
        })
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.post("/in-progress-orders", (req, res) => {
    const orderId = req.body.ready;
    const statusId = 2;
    updateStatusById(db, statusId, orderId)
    .then(data => {
      console.log('✅ DB updated.');
    })
    .then(data => {
      getUserById(db, orderId)
      .then(data => {
        const customer = data.rows[0].name;
        const text = "Your order is ready for pickup.";
        console.log('🤪',customer);
        sendOrderDecision(customer, text);
        res.redirect("/orders/in-progress-orders");
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};


