/*
* All routes for Users are defined here
* Since this file is loaded in server.js into api/users,
*   these routes are mounted onto /users
* See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
*/

const express = require('express');
// const { getUserById } = require('../db/queries/database');
const router  = express.Router();

module.exports = (db) => {
  // get/users
  // Check cookies, if it's not set render login page
  // Otherwise redirect to menu page
  router.get("/", (req, res) => {
    // const userId = req.session.userId;
    // console.log('🛗 user id: ', userId);      // 🚨🚨🚨
    // if (!userId) {
    //   res.render("login");
    //   return;
    // }
    res.render("menu");
  });



  return router;
};

