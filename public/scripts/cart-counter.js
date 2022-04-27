$(document).ready(function() {

  // Set Cookie
  // takes name of cookie & value as object
  const bakeCookie = (name, value) => {
    const cookie = [name, '=', JSON.stringify(value)].join('');
    document.cookie = cookie;
  };

  // takes name of cookie
  // return cookie's value as object
  const readCookie = name => {
    let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
   };

  // takes name of cookie
  // set the expires parameter to a past date
  const deleteCookie = (name) => {
    if (readCookie(name)) {
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

  // check if item had been added to the card before
  // takes card as object & id (object key)
  // return true or false
  const findInCard = (card, id) => {
    const itemIds = Object.keys(card);
    return itemIds.includes(id);
  };

  // update quantity of specific item in card
  const updateQtyInCard = (card, id, newQty) => {
    preQty = card[id].qty;
    card[id].qty = Number(preQty) + Number(newQty);
  };

  // update card number base on card cookie
  const updateCardNum = card => {
    if (card) {
      const updateNum = Object.keys(card).length;
      mainCartQty.val(updateNum);
    }
  };

  // set these variables when page loaded
  const mainCartQty = $('#main-cart-qty');
  let card = readCookie('card');

  console.log('🛒',card);       // 🚨🚨🚨

  // update card number when page loaded
  updateCardNum(card);          // ✅

  $('.plus-qty-item').click(function() {
    // Find the counter element
    const singleItemQty = $(this).parent().find('.single-item-qty');
    // Get the counter's text into a number variable
    let singleItemQtyVal = singleItemQty.val(); //if val is empty, it returns its value
    // Add 1 to the number variable
    singleItemQtyVal++
    // Update the counter element text
    singleItemQty.val(singleItemQtyVal);
  });

  $('.minus-qty-item').click(function() {
    const singleItemQty = $(this).parent().find('.single-item-qty');
    let singleItemQtyVal = singleItemQty.val();
    if (singleItemQtyVal > 0) {
      singleItemQtyVal--
      singleItemQty.val(singleItemQtyVal);
    }
  });


  // by click on "add to card" , set card cookie and update card icon number
  $('.add-to-cart').click(function() {
    const singleItemQty = $(this).parent().find('.single-item-qty');
    let singleItemQtyVal = singleItemQty.val();

    // we need to add to card cookie just if item qty has value
    if (singleItemQtyVal> 0) {
      // set back qty to be zero.
      singleItemQty.val(0);

      // find all item info
      const itemId = $(this).closest('.for-cookie-item').attr('name');
      const itemPrice = $(this).closest('.for-cookie-item').find('.for-cookie-price').attr('name');
      const itemName = $(this).closest('.for-cookie-item').find('.for-cookie-name').text();
      const itemImg = $(this).closest('.for-cookie-item').find('.for-cookie-img').attr('src');

      // read card cookie (obj) and save in card value.
      // card = readCookie('card')

      // if there is no card data, set it as empty object
      if (!card) {
        card = {};
      }

      // check if item had been added to cart before if yes, just update it's qty.
      // otherwise add whole item info as an object in card variable,
      // set itemId for it's object key
      if (findInCard(card, itemId)) {
        updateQtyInCard(card, itemId, singleItemQtyVal);
      } else {
        card[itemId] = {
          id: itemId,
          price: itemPrice,
          qty: singleItemQtyVal,
          name: itemName,
          image: itemImg
        }
      }
      // set card cookie with card value
      bakeCookie('card',card);
      // update card number
      updateCardNum(card);
    }
    console.log('🍪',document.cookie);   // 🚨🚨🚨
  });

  // NOT COMPLETE (Need to modify once we have several items in checkout)
  $('.delete-button').click(function() {
    const itemCounter = $(this).parents().find('.price-on-right');
    itemCounter.remove();
  });
});
