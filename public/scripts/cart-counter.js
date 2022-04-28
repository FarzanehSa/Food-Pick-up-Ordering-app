$(document).ready(function () {
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
});
