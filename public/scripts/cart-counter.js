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
  });

  $('.add-to-cart').click(function() {
    const itemId = $(this).closest('.food-item').attr('name');
    console.log('id: ',itemId);
    const singleItemQty = $(this).parent().find('.single-item-qty');
    let singleItemQtyVal = singleItemQty.val();
    console.log('Qty: ',singleItemQtyVal);
    const mainCartQty = $('#main-cart-qty')
    let mainCartQtyVal = mainCartQty.val()
    if (singleItemQtyVal> 0) {
      singleItemQty.val(0)
      mainCartQtyVal ++
      mainCartQty.val(mainCartQtyVal)
    }
  });
});
