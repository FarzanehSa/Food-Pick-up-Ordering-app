$(document).ready(function() {

  $('[name=plus]').click(function() {
    // Find the counter element
    const counter = $(this).parent().find('[name=counter]');
    // Get the counter's text into a number variable
    let textToVal = counter.val(); //if val is empty, it returns its value
    // Add 1 to the number variable
    textToVal++
    // Update the counter element text
    counter.val(textToVal);
  });

  $('[name=minus]').click(function() {
    const counter = $(this).parent().find('[name=counter]');
    let textToVal = counter.val();
    if (textToVal > 0) {
    textToVal--
    counter.val(textToVal);
    }
  });
});
