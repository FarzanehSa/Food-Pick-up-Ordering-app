# Food Pickup Ordering App

## Project Description

A food ordering experience for a taco restaurant. Customers can visit the website, check the variety of items on the menu, select one or more dishes and order for pickup. Upon ordering, messages will be sent to the customer showing them the status of the order.

## Languages Used

* HTML, SASS, jQuery and AJAX on the front-end.
* Node, Express, EJS and PSQL on the server side/back-end.

## Developers Team

1. ["Khaled Alkhatib"](https://github.com/Khaled91Alkhatib),
2. ["Farzaneh Sadegh"](https://github.com/FarzanehSa).

## Screenshots

!["Menu page"](https://github.com/Khaled91Alkhatib/Food-Pick-up-Ordering-app/blob/feat/general-css/screenshots/Menu%20page.png?raw=true)
!["Checkout page"](https://github.com/Khaled91Alkhatib/Food-Pick-up-Ordering-app/blob/feat/general-css/screenshots/Checkout%20page.png?raw=true)
!["Customer's view - Orders' page"](https://github.com/Khaled91Alkhatib/Food-Pick-up-Ordering-app/blob/feat/general-css/screenshots/Customer's%20view%20-%20Orders%20page.png?raw=true)
!["Owner's view - placed orders' page"](https://github.com/Khaled91Alkhatib/Food-Pick-up-Ordering-app/blob/feat/general-css/screenshots/Owner's%20view%20-%20placed%20orders'%20page.png?raw=true)
!["Owner's view - accepted orders' page"](https://github.com/Khaled91Alkhatib/Food-Pick-up-Ordering-app/blob/feat/general-css/screenshots/Owner's%20view%20-%20accepted%20orders'%20page.png?raw=true)
!["SMS's the customer recieves"](https://github.com/Khaled91Alkhatib/Food-Pick-up-Ordering-app/blob/feat/general-css/screenshots/SMS:s%20the%20customer%20recieves%20.png?raw=true)

## Getting Started

1. Create the .env by using .env.example as a reference: cp .env.example .env
2. Update the .env file with your correct local information:
  (username: labber; 
  password: labber; 
  database: midterm)
3. Install dependencies: `npm install`
4. Fix to binaries for sass: npm rebuild node-sass
5. Reset database: `npm run db:reset` (check the db folder to see what gets created and seeded in the SDB)
6. Run the server: `npm run local` (note: nodemon is used, so you should not have to restart your server)
7. Visit http://localhost:8080/

## Dependencies 

* Node
* NPM
* PG 
* Express
* Chalk
* Cookie Parser
* Cookie Session
* Dotenv
* EJS
* Morgan
* SASS
* Twilio

## Dev Dependency

* Nodeman
