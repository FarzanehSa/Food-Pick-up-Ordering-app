/*
* All routes for Orders are defined here
* Since this file is loaded in server.js into orders,
*   these routes are mounted onto /orders
*/

const express = require('express');
const { addOrder } = require('../db/queries/orders/01-addOrder');
const { addOrderItem } = require('../db/queries/orders/02-addOrderItems');
// For GET new-orders & in-progress-orders
const { getAllOrderedItemsByStatus } = require('../db/queries/orders/05_getAllOrderedItemsByStatus');
const { getAllOrdersByStatus } = require('../db/queries/orders//06-getAllOrdersByStatus');
const { ordersTotalByStatus } = require('../db/queries/orders/07_ordersTotalByStatus');
// For POST new-orders & in-progress-orders
const { updateStatusById } = require('../db/queries/orders/08_updateStatusById');
const { getUserById } = require('../db/queries/orders/09_getUserById');
// For filter orders
const { getOrderDetailById } = require('../db/queries/filter-orders/01-getOrderDetailById');
const { getStatusNames } = require('../db/queries/filter-orders/02-getStatusNames');
const { getOrdersDetail } = require('../db/queries/filter-orders/03-getOrdersDetail');
//  Helper functions
const { orderReceivedAlert, createOrderInfoObject, sendOrderDecision } = require('../javaScripts/helperFunctions.js');

const router  = express.Router();

module.exports = (db) => {
  // get orders/
  // Rendering orders.ejs
  router.get("/", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
      return;
    }
    if (user.access_level === 1) {
      res.redirect("/orders/new-orders");
      return;
    }
    if (req.cookies.cart) {
      const cart = JSON.parse(req.cookies.cart)
      // If cart is empty won't go to orders page!
      if (Object.keys(cart).length === 0) {
        res.redirect("/menu");
        return;
      }
      // console.log("khaled", JSON.parse(req.cookies.cart))  // 🚨🚨🚨
      res.render("orders", {user, cart});
      return;
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
        return;
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

// ---------------------- PENDING ORDERS --------------------------------------

  router.get("/new-orders", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
      return;
    }
    if (user.access_level !== 1) {
      res.redirect("/menu");
      return;
    }

    const f1 = getAllOrderedItemsByStatus(db, 0);
    const f2 = getAllOrdersByStatus(db, 0);
    const f3 = ordersTotalByStatus(db, 0);
    Promise.all ([f1, f2, f3])
    .then(([r1, r2, r3]) => {
      const itemsInOrder = r1.rows;
      const pendingOrders = r2.rows;
      const totalList = r3.rows
      // change the format of totalList so we can use it with orderId as key!
      let ordersTotal = {}
      for (const row of totalList) {
        ordersTotal[row.id] = row.total;
      }
      res.render("new-orders", { itemsInOrder, pendingOrders, ordersTotal,  user});
      return;
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
    } else if (decision.reject) {
      orderId = decision.reject;
      statusId = 3;
      text = "Sorry, We can't accept your order today."
    }
    updateStatusById(db, statusId, orderId)
    .then(data => {
      console.log('✅ DB updated.');
      return getUserById(db, orderId);
    })
    .then(data => {
      const customer = data.rows[0].name;
      sendOrderDecision(customer, text);
      res.redirect("/orders/new-orders");
      return;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

// ---------------------- IN PROGRESS ORDERS --------------------------------------

  router.get("/in-progress-orders", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
      return;
    }
    if (user.access_level !== 1) {
      res.redirect("/menu");
      return;
    }

    const f1 = getAllOrderedItemsByStatus(db, 1);
    const f2 = getAllOrdersByStatus(db, 1);
    const f3 = ordersTotalByStatus(db, 1);
    Promise.all ([f1, f2, f3])
    .then(([r1, r2, r3]) => {
      const itemsInOrder = r1.rows;
      const inProgressOrders = r2.rows;
      const totalList = r3.rows
      // change the format of totalList so we can use it with orderId as key!
      let ordersTotal = {}
      for (const row of totalList) {
        ordersTotal[row.id] = row.total;
      }
      res.render("in-progress-orders", { itemsInOrder, inProgressOrders, ordersTotal,  user});
      return;
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
      return getUserById(db, orderId);
    })
    .then(data => {
      const customer = data.rows[0].name;
      const text = "Your order is ready for pickup.";
      sendOrderDecision(customer, text);
      res.redirect("/orders/in-progress-orders");
      return;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

// ---------------------- IN FILTER ORDERS --------------------------------------

  router.get("/filter-orders", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
      return;
    }
    if (user.access_level !== 1) {
      res.redirect("/menu");
      return;
    }

    const options = {};

    const f1 = getOrdersDetail(db, {});
    const f2 = getStatusNames(db);
    Promise.all ([f1,f2])
    .then(([r1,r2]) => {
      const orders = r1.rows;
      const status = r2.rows;
      res.render("filter-orders", { orders, status,options, user});
      return;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.post("/filter-orders", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
      return;
    }
    if (user.access_level !== 1) {
      res.redirect("/menu");
      return;
    }
    const x = req.body;
    const options = {
      userId: Number(req.body.userId),
      status: req.body.status,
      orderDate: req.body.orderDate
    }

    const f1 = getOrdersDetail(db, options);
    const f2 = getStatusNames(db);
    Promise.all ([f1,f2])
    .then(([r1,r2]) => {
      const orders = r1.rows;
      const status = r2.rows;
      res.render("filter-orders", { orders, status,options, user});
      return;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // using ajax to bring the details form
  router.get("/filter-orders/:id", (req, res) => {
    const curId = req.params.id;
    getOrderDetailById(db, curId)
    .then(data => {
      const curOrder = data.rows;
      res.json(curOrder)
      return;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

 return router;
};
