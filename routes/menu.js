/*
* All routes for Menu are defined here
* Since this file is loaded in server.js into menu,
*   these routes are mounted onto /menu
*/

const express = require('express');
const { getAllMenuItems, getItemById } = require('../db/queries/database');
const router  = express.Router();

module.exports = (db) => {
  // get menu/
  // Rendering menu.ejs with data from DB, menu_item table
  router.get("/", (req, res) => {
    getAllMenuItems(db)
      .then(data => {
        menuItems = data.rows
        res.render("menu", { menuItems });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // menu/:id
  // rendering page related to requested id
  router.get("/:id", (req, res) => {
    const curId = req.params.id;
    getItemById(db, curId)
      .then(data => {
        menuItem = data.rows[0];
        res.render("menu-item",{menuItem});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

