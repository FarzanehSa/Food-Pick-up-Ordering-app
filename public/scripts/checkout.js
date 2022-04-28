$(document).ready(function () {

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

  // update cart number base on cart cookie
  const updateCartNum = cart => {
    if (cart) {
      const updateNum = Object.keys(cart).length;
      mainCartQty.val(updateNum);
    }
  };

  // takes object and key, and delete that key form object
  const deleteFromCart = (cart, id) => {
    if (cart[id]) {
      delete cart[id];
    }
    return cart;
  }

  // This function calculates the total price of one item based on ordered quantity
  const checkoutTotal = function () {
    let total = 0;
    Object.keys(cart).map(item => {
      total += (Number(cart[item].price)) * parseInt(cart[item].qty);
    });
    total = total / 100;
    $('#total-checkout').html(`$ ${total}`);
  };



  // // set these variables when page loaded
  const mainCartQty = $('#main-cart-qty');
  $("#cart-button").css("visibility","hidden");


  // Read the carts cookie outside checkoutTotal function
  // We need it outside the function otherwise the cookie wont be deleted on button click
  let cart = readCookie('cart');

  checkoutTotal();

  $('.delete-button').click(function () {
    // Will delete the whole item from orders page
    const itemCounter = $(this).closest('.price-on-right');
    itemCounter.remove();

    // Modify new checkout money sum after deletion
    // delete from cart, set cookie, update cart number, reload page
    const id = $(this).attr("id")
    cart = readCookie('cart');
    deleteFromCart(cart, id);
    bakeCookie('cart', cart);
    updateCartNum(cart);
    checkoutTotal();
    location.reload();
  });

    $('.checkout-plus-qty').click(function () {
    // Find the counter element & update qty
    const singleItemQty = $(this).parent().find('.checkout-item-qty');
    let singleItemQtyVal = singleItemQty.val();
    singleItemQtyVal++;

    // find id and update cart, cookie & reload page
    singleItemQty.val(singleItemQtyVal);
    const itemId = $(this).closest('.price-on-right').find('.order-row').attr('name');
    updateQtyInCartAtcheckout(cart, itemId, singleItemQtyVal)
    bakeCookie('cart',cart)
    location.reload();
  });

  $('.checkout-minus-qty').click(function () {
    // Find the counter element & update qty
    const singleItemQty = $(this).parent().find('.checkout-item-qty');
    let singleItemQtyVal = singleItemQty.val();
    if (singleItemQtyVal > 1) {
      singleItemQtyVal--;
      singleItemQty.val(singleItemQtyVal);
    }
    // find id and update cart, cookie & reload page
    singleItemQty.val(singleItemQtyVal);
    const itemId = $(this).closest('.price-on-right').find('.order-row').attr('name');
    updateQtyInCartAtcheckout(cart, itemId, singleItemQtyVal)
    bakeCookie('cart',cart)
    location.reload();
  });
});
