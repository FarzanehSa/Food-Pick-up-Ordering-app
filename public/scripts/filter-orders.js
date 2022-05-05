const createItemRow = (item) => {
  const $item = $(`
    <div class="row-detail-data">
      <div class="item-name">
        <span>${ item.item }</span>
      </div>
      <div class="item-price">
        <span>$${ item.price / 100}</span>
      </div>
      <div class="item-qty">
        <span>${ item.qty }</span>
      </div>
    </div>
    <hr/>
  `);
  return $item;
}

const createOrder = function(order, id) {
  const $detailContainer = $(`#detailContainer${id}`);

  $detailContainer.empty();

  const $header = $(`
    <div class="row-detail-data">
      <div class="item-name">
        <span>Item</span>
      </div>
      <div class="item-price">
        <span>Price Per Item</span>
      </div>
      <div class="item-qty">
        <span>Qty</span>
      </div>
    </div>
  `);

  $detailContainer.append($header);
  order.forEach(item => {
    const $item = createItemRow(item);
    $detailContainer.append($item);
  });
};


$(document).ready(function () {
  // click on details button :
  $('.order-details').click(function(event) {

    const alreadyOpen = $(this).hasClass('close-details');
    const curId = $(this).val();
    const $detailContainer = $(`#detailContainer${curId}`);


    if (!alreadyOpen) {
      event.preventDefault();
      this.blur(); // Manually remove focus from clicked link.
      // get id that's saved in buttons value.
      $(this).addClass('close-details');
      $detailContainer.addClass('full');

      // send ajax req and get order details
      $.ajax({
        url: `/orders/filter-orders/${curId}`,
        method: 'GET',
        success: (data) => {
          createOrder(data, curId);
        }
      })
    } else {
      // check if details is already open close it by empty detailsContainer
      this.blur();
      $(this).removeClass('close-details');
      $detailContainer.empty();
      $detailContainer.removeClass('full');
    }
  })
});
