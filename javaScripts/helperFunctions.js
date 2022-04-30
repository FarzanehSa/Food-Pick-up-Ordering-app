const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const OrderReceivedAlert = () => {
  client.messages
    .create({
       body: 'A customer placed a new order.',
       from: process.env.TWILIO_PHONE_NUMBER,
       to: process.env.MY_PHONE_NUMBER
     })
    .then(message => console.log(message.sid));
}

// create an object with 3 keys (userId, comment & pickupTime)
const createOrderInfoObject = function(userObject, detailObject) {
  // if customer select "as soon as possible" for pickup, we add, 15 mins to NOW time.
  const curTime = new Date(); // take NOW time!
  let pickupTime;
  if (detailObject.pickupTime === 'later') {
    pickupTime = detailObject.setPickupTime;
  } else {
    // add 15 minutes;
    const minutesToAdd = 15;
    const futureTime = new Date(curTime.getTime() + minutesToAdd*60000);
    // just take 8 first character of string which is hh:mm:ss
    pickupTime = futureTime.toTimeString().slice(0,8);
  }
  // build order info object
  const order = {
    userId: userObject.id,
    comment: detailObject.comment,
    pickupTime
  }
  // console.log('👀 order',order);  // 🚨🚨🚨
  return order;
}

const getAllItemsIdInCategory = function(categories, menuItems) {
  let categoryItems = {};
  for (const cat of categories) {
    categoryItems[cat.id] = []
    for (const item of menuItems) {
      if (cat.id === item.category_id) {
        categoryItems[cat.id].push(item.id)
      }
    }
  }
  return categoryItems;
}

  module.exports = { OrderReceivedAlert, createOrderInfoObject, getAllItemsIdInCategory };

