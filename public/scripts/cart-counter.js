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

  // update cart number base on cart cookie
  const updateCartNum = cart => {
    if (cart) {
      const updateNum = Object.keys(cart).length;
      mainCartQty.val(updateNum);
    }
  };

  // set these variables when page loaded
  const mainCartQty = $('#main-cart-qty');
  let cart = readCookie('cart');

  console.log('🛒', cart);       // 🚨🚨🚨

  // update cart number when page loaded
  updateCartNum(cart);          // ✅

  $('.plus-qty-item').click(function () {
    // Find the counter element
    const singleItemQty = $(this).parent().find('.single-item-qty');
    // Get the counter's text into a number variable
    let singleItemQtyVal = singleItemQty.val(); //if val is empty, it returns its value
    // Add 1 to the number variable
    singleItemQtyVal++;
    // Update the counter element text
    singleItemQty.val(singleItemQtyVal);
  });

  $('.minus-qty-item').click(function () {
    const singleItemQty = $(this).parent().find('.single-item-qty');
    let singleItemQtyVal = singleItemQty.val();
    if (singleItemQtyVal > 0) {
      singleItemQtyVal--;
      singleItemQty.val(singleItemQtyVal);
    }
  });


  // by click on "add to cart" , set cart cookie and update cart icon number
  $('.add-to-cart').click(function () {
    const singleItemQty = $(this).parent().find('.single-item-qty');
    let singleItemQtyVal = singleItemQty.val();

    // we need to add to cart cookie just if item qty has value
    if (singleItemQtyVal > 0) {
      // set back qty to be zero.
      singleItemQty.val(0);

      // find all item info
      const itemId = $(this).closest('.for-cookie-item').attr('name');
      const itemPrice = $(this).closest('.for-cookie-item').find('.for-cookie-price').attr('name');
      const itemName = $(this).closest('.for-cookie-item').find('.for-cookie-name').text();
      const itemImg = $(this).closest('.for-cookie-item').find('.for-cookie-img').attr('src');

      // read cart cookie (obj) and save in cart value.
      // cart = readCookie('cart')

      // if there is no cart data, set it as empty object
      if (!cart) {
        cart = {};
      }

      // check if item had been added to cart before if yes, just update it's qty.
      // otherwise add whole item info as an object in cart variable,
      // set itemId for it's object key
      if (findInCart(cart, itemId)) {
        updateQtyInCart(cart, itemId, singleItemQtyVal);
      } else {
        cart[itemId] = {
          id: itemId,
          price: itemPrice,
          qty: singleItemQtyVal,
          name: itemName,
          image: itemImg,
        };
      }
      // set cart cookie with cart value
      bakeCookie('cart', cart);
      // update cart number
      updateCartNum(cart);
    }
    // checkoutTotal();
    console.log('🍪', document.cookie);   // 🚨🚨🚨
  });

  let isHidden = true;
  $('.contact').click(function () {
    const contactInfo = $(this).parent().find('.phone-email');
    if(isHidden) {
      contactInfo.css('visibility', 'visible');
    } else {
      contactInfo.css('visibility', 'hidden');
    }
    isHidden = !isHidden;
  });

  $('.location').click(function () {
    window.location.href = 'https://www.google.com/maps/place/CF+Toronto+Eaton+Centre/@43.6544382,-79.3828881,17z/data=!3m2!4b1!5s0x882b31b95f52582d:0x20b5c47effb49f3d!4m5!3m4!1s0x882b34cb510746bd:0x8b89147b8cbbc837!8m2!3d43.6544382!4d-79.3806994';
  });
});
