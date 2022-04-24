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
    const userId = req.session.userId;
    console.log('🛗 user id: ', userId);      // 🚨🚨🚨
    if (!userId) {
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
        const accessLevel = data.rows[0].access_level;
        req.session.userId = req.body.id;
        req.session.accessLevel= accessLevel;
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
    req.session.userId = null;
    req.session.accessLevel = null;
    // res.send({});
  });

  return router;
};

