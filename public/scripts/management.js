$(document).ready(function () {

  let selectedOrder;
  $('#warning-m').text('* Select an order!').slideDown();
  $('#pending-orders-page').find(':input[type=submit]').prop('disabled', true);

  $('input[type="checkbox"]').on('change', function() {
    $('input[type="checkbox"]').not(this).prop('checked', false);
    if($(this).is(':checked')) {
      selectedOrder = $(this).val()
      $('#selected-order').val(selectedOrder)
      $('#hid-acc-id').val(selectedOrder)
      $('#hid-rej-id').val(selectedOrder)
      $('#pending-orders-page').find(':input[type=submit]').prop('disabled', false);
      $('#warning-m').text('* Select an order!').slideUp();
    } else {
      selectedOrder = null
      $('#selected-order').val(selectedOrder)
      $('#hid-acc-id').val(null)
      $('#hid-rej-id').val(null)
      $('#pending-orders-page').find(':input[type=submit]').prop('disabled', true);
      $('#pending-orders-page').find(':input[type=submit]').unbind("hover");;
      $('#warning-m').text('* Select an order!').slideDown();
    }
  });
});
