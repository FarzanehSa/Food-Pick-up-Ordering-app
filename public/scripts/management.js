$(document).ready(function () {

  let selectedOrder;
  // at the loading page - warning msg showed up and submin buttons deactived
  $('#warning-m').text('* Select an order!').slideDown();
  $('#pending-orders-page').find(':input[type=submit]').prop('disabled', true);

  // when one checkbox (order selector) changed position
  $('input[type="checkbox"]').on('change', function() {
    // 1. remove check from any other checkbox
    $('input[type="checkbox"]').not(this).prop('checked', false);
    // 2. change to checked:
    if($(this).is(':checked')) {
      selectedOrder = $(this).val();             // checkbox value is order-id
      $('#selected-order').val(selectedOrder);   // copy order-id in output box
      $('#hid-acc-id').val(selectedOrder);       // copy order-id in hidden input for accept form
      $('#hid-rej-id').val(selectedOrder);       // copy order-id in hidden input for reject form
      $('#hid-ready-id').val(selectedOrder);       // copy order-id in hidden input for ready form

      // active submit buttons
      $('#pending-orders-page').find(':input[type=submit]').prop('disabled', false);
      // warning msg removed
      $('#warning-m').text('* Select an order!').slideUp();
    } else {  // change to uncheck
      selectedOrder = null;                     // null will copy on output & hidden inputs
      $('#selected-order').val(selectedOrder);
      $('#hid-acc-id').val(null);
      $('#hid-rej-id').val(null);
      $('#hid-ready-id').val(null);
      // deactive submit buttons
      $('#pending-orders-page').find(':input[type=submit]').prop('disabled', true);
      // warning msg popup
      $('#warning-m').text('* Select an order!').slideDown();
    }
  });
});
