// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use(cookieParser());

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");
const widgetsRoutes = require("./routes/widgets");
const myOrdersRoutes = require("./routes/my-orders.js");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/my-orders", myOrdersRoutes(db))
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.redirect("/users");
});

// ⚪️ this matches all routes and all methods- centralized error handler
app.use((req, res) => {
  const user = req.session.user;
  if (!user) {
    res.render("login");
    return;
  }
  res.redirect("/users");
});

app.listen(PORT, () => {
  console.log(`Food pickup ordering app listening on port ${PORT}`);
});

