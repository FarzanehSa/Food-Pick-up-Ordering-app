/*
* All routes for Menu are defined here
* Since this file is loaded in server.js into menu,
*   these routes are mounted onto /menu
*/

const express = require('express');
const { cookie } = require('express/lib/response');
const { getAllMenuItems } = require('../db/queries/menu/01-getAllMenuItems');
const { getItemById } = require('../db/queries/menu/02-getItemById');
const { getCategories } = require('../db/queries/menu/03-getCategories');
const { getAllItemsIdInCategory } = require('../javaScripts/helperFunctions.js');
const router  = express.Router();

module.exports = (db) => {
  // get menu/
  // Rendering menu.ejs with data from DB, menu_item table
  router.get("/", (req, res) => {
    const user = req.session.user;
    // console.log('🆘',req.cookies);
    if (!user)  {
      res.redirect("/users");
      return;
    }
    if (user.access_level === 1) {
      res.redirect("/orders/new-orders");
      return;
    }
    getCategories(db)
      .then(data => {
        const categories = data.rows;
        return categories;
      })
      .then (categories => {
        getAllMenuItems(db)
        .then(data => {
          const menuItems = data.rows;
          // list of all items in one category
          const categoryItems = getAllItemsIdInCategory(categories, menuItems)
          res.render("menu", { categoryItems, menuItems, categories, user});
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
      });;
  });

  // menu/:id
  // rendering page related to requested id
  router.get("/:id", (req, res) => {
    const user = req.session.user;
    if (!user)  {
      res.redirect("/users");
      return;
    }
    if (user.access_level === 1) {
      res.redirect("/orders/new-orders");
      return;
    }
    const curId = req.params.id;
    getItemById(db, curId)
      .then(data => {
        menuItem = data.rows[0];
        res.render("menu-item",{ menuItem, user });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
