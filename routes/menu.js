/*
* All routes for Menu are defined here
* Since this file is loaded in server.js into menu,
*   these routes are mounted onto /menu
*/

const express = require('express');
const { getAllMenuItems, getItemById } = require('../db/queries/database');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('🛗 req.body: ',req.body)       // 🚨🚨🚨
    getAllMenuItems(db)
      .then(data => {
        console.log(data.rows)
        menuItems = data.rows
        res.render("menu",{menuItems});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    console.log('🛗 req.body: ',req.body)       // 🚨🚨🚨
    const curId = req.params.id;
    getItemById(db, curId)
      .then(data => {
        menuItem = data.rows[0];
        // res.render("menu",{menuItem});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  return router;
};

