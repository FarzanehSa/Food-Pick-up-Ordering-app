$(document).ready(function() {

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
    // console.log(document.cookie);
  });

  $('.add-to-cart').click(function() {
    const singleItemQty = $(this).parent().find('.single-item-qty');
    let singleItemQtyVal = singleItemQty.val();
    console.log('Qty: ',singleItemQtyVal);
    if (singleItemQtyVal> 0) {
      const mainCartQty = $('#main-cart-qty')
      let mainCartQtyVal = mainCartQty.val()
      singleItemQty.val(0)
      mainCartQtyVal ++
      mainCartQty.val(mainCartQtyVal)

      // const itemId = $(this).closest('.food-item').attr('name');
      // const itemPrice = $(this).siblings('.item-price').attr('name');
      // const itemName = $(this).siblings('.item-name').children().text();
      // const itemImg = $(this).parent().siblings().children().find('.iImg').attr('src');

      // const x =  {
      //   id: itemId,
      //   name: itemName,
      //   pricd: itemPrice,
      //   qty: singleItemQtyVal,
      //   image: itemImg
      // }

      // document.cookie = x

    }
  });

  // NOT COMPLETE (Need to modify once we have several items in checkout)
  $('.delete-button').click(function() {
    const itemCounter = $(this).parents().find('.price-on-right');
    itemCounter.remove();
  });
});
