// Set Cookie
// takes name of cookie & value as object
const bakeCookie = (name, value) => {
  // Add ';path=/' to make the cookie is shared amongst all urls
  const cookie = [name, '=', JSON.stringify(value), ';path=/'].join('');
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
};

// check if item had been added to the cart before
// takes cart as object & id (object key)
// return true or false
const findInCart = (cart, id) => {
  const itemIds = Object.keys(cart);
  return itemIds.includes(id);
};

// update quantity of specific item in cart
const updateQtyInCart = (cart, id, newQty) => {
  preQty = cart[id].qty;
  cart[id].qty = Number(preQty) + Number(newQty);
};

// in checkout page qty will be over-ride
const updateQtyInCartAtcheckout = (cart, id, newQty) => {
  cart[id].qty = Number(newQty);
};

// takes object and key, and delete that key form object
const deleteFromCart = (cart, id) => {
  if (cart[id]) {
    delete cart[id];
  }
  return cart;
};

// This function calculates the total price of one item based on ordered quantity
const checkoutTotal = function (cart) {
  let total = 0;
  Object.keys(cart).map(item => {
    total += (Number(cart[item].price)) * parseInt(cart[item].qty);
  });
  total = total / 100;
  $('#total-checkout').html(`$${total}`);
};

// calculate total price
const calculateItemTotal = (price, qty) => {
  return ((price / 100) * qty).toFixed(2);
};

// close and open each category.
const categoryDropdown = function(catList, catId) {
  if (catList.first().is(":hidden")) {
    $(`.dropdown-content${catId}`).slideDown("slow")
    $(`.dropdown-content${catId}`).css('display', 'flex');
    $(`.dropdown${catId}`).find(".cat-arrow-up").css('display', 'block');
    $(`.dropdown${catId}`).find(".cat-arrow-down").css('display', 'none');
    $(`.dropdown${catId}`).css('color', 'whitesmoke');
  } else {
    // $(`.dropdown-content${catId}`).hide();
    $(`.dropdown-content${catId}`).slideUp("slow");
    $(`.dropdown${catId}`).find(".cat-arrow-up").css('display', 'none');
    $(`.dropdown${catId}`).find(".cat-arrow-down").css('display', 'block');
    $(`.dropdown${catId}`).css('color', 'whitesmoke');
    $(`.dropdown${catId}`).css('color', 'gold');
  }
}
