$(document).ready(function () {

  // Set these variables when page loaded
  const mainCartQty = $('#main-cart-qty');
  $("#cart-button").css("visibility","hidden")

  // Read the carts cookie outside checkoutTotal function
  // We need it outside the function otherwise the cookie wont be deleted on button click
  let cart = readCookie('cart');

  checkoutTotal(cart);

  // update cart number base on cart cookie
  const updateCartNum = (cart) => {
    if (cart) {
      const updateNum = Object.keys(cart).length;
      mainCartQty.val(updateNum);
      // update itemRows as well
      $('#total-items').html(`${updateNum}`)
    }
  };

  // set minimum valid time in Select-Time to be 11:00:00 or NOW
  const now = new Date();
  if (now.toTimeString() > '11:00:00') {
    const min = now.toTimeString().slice(0, 8);
    $('#select-time').attr({'min': `${min}`});
  }

  // Next 2 events handler are for set time of pickup!
  $('#later').click(() => {
    if($('#later').is(':checked'))
    {
      $(".radio-s").css("display","none")
      $(".time-p").css("display","block")
      $('#select-time').prop('required',true);
    }
  });

  $('#now').click(() => {
    if($('#now').is(':checked'))
    {
      $(".time-p").css("display","none")
      $(".radio-s").css("display","inline-block")
      $('#select-time').prop('required',false);
    }
  });

  $('.delete-button').click(function () {
    // Will delete the whole item from orders page
    const itemCounter = $(this).closest('.row-list');
    itemCounter.remove();

    // Modify new checkout money sum after deletion
    // delete from cart, set cookie, update cart number, reload page
    const id = $(this).attr("id")
    cart = readCookie('cart');
    deleteFromCart(cart, id);
    bakeCookie('cart', cart);
    updateCartNum(cart);
    checkoutTotal(cart);
    if (mainCartQty.val() == 0) {
      location.reload();
    }
  });

    $('.checkout-plus-qty').click(function () {
    // Find the counter element & update qty
    const singleItemQty = $(this).closest('.checkout-counter').find('.checkout-item-qty');
    let singleItemQtyVal = singleItemQty.val();
    singleItemQtyVal++;

    // find id and update cart, cookie & reload page
    singleItemQty.val(singleItemQtyVal);
    const itemId = $(this).closest('.price-on-right').find('.order-row').attr('name');
    updateQtyInCartAtcheckout(cart, itemId, singleItemQtyVal);
    // calculate and update item total price for that row
    const newTotalPrice = calculateItemTotal(cart[itemId].price, cart[itemId].qty);
    $(this).closest('.price-on-right').find('.total-price').html(`$${newTotalPrice}`);
    bakeCookie('cart',cart);
    checkoutTotal(cart);
  });

  $('.checkout-minus-qty').click(function () {
    // Find the counter element & update qty
    const singleItemQty = $(this).closest('.checkout-counter').find('.checkout-item-qty');
    let singleItemQtyVal = singleItemQty.val();
    if (singleItemQtyVal > 1) {
      singleItemQtyVal--;
      singleItemQty.val(singleItemQtyVal);
    }
    // find id and update cart, cookie & reload page
    singleItemQty.val(singleItemQtyVal);
    const itemId = $(this).closest('.price-on-right').find('.order-row').attr('name');
    updateQtyInCartAtcheckout(cart, itemId, singleItemQtyVal);
    const newTotalPrice = calculateItemTotal(cart[itemId].price, cart[itemId].qty);
    $(this).closest('.price-on-right').find('.total-price').html(`$${newTotalPrice}`);
    bakeCookie('cart',cart);
    checkoutTotal(cart);
  });
});
