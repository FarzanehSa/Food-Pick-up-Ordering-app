/*
* All routes for Users are defined here
* Since this file is loaded in server.js into api/users,
*   these routes are mounted onto /users
* See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
*/

const express = require('express');
const { getUserById } = require('../db/queries/database');
const router  = express.Router();

module.exports = (db) => {
  // get/users
  // Check cookies, if it's not set render login page
  // Otherwise redirect to menu page
  router.get("/", (req, res) => {
    const user = req.session.user;
    console.log('🛗 user : ', user);      // 🚨🚨🚨
    if (!user) {
      res.render("login");
      return;
    }
    res.redirect("/menu");
  });

  // post/users
  // Set cookies with Id & access level
  // Redirect to menu page
  router.post('/', (req, res) => {
    console.log('🛗 req.body: ',req.body)       // 🚨🚨🚨
    curUserId = req.body.id;
    getUserById(db, curUserId)
      .then(data => {
        const user = data.rows[0];
        req.session.user= user;
        req.session.userId = user.id;
        req.session.accessLevel= user.access_level;
        console.log('🛗 cookei ', req.session)   // 🚨🚨🚨
        res.redirect("/menu");
        return;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // 🛑 NOT COMPLETE
  router.post('/logout', (req, res) => {
    req.session.user = null;
    req.session.userId = null;
    req.session.accessLevel = null;
    res.redirect("/users");
  });

  return router;
};

